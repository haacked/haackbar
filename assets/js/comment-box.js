Haack.ready(function() {
  let form = Haack.get('comment-form')

  if (form) {
    // Set up any content editors
    document.querySelectorAll('div[contenteditable].plaintext').forEach(function(editor) {
      // Set up the content editable div
      try {
          editor.contentEditable="PLAINTEXT-ONLY";
      } catch(e) {
          // Firefox hack to prevent rich text from being pasted.
          editor.contentEditable="true"
          editor.addEventListener("paste", function(e) {
            e.preventDefault();
            if (e.clipboardData && e.clipboardData.getData) {
              var text = e.clipboardData.getData("text/plain").replace(/(?:\r\n|\r|\n)/g, '<br />')
              document.execCommand("insertHTML", false, text)
            } else if (window.clipboardData && window.clipboardData.getData) {
              var text = window.clipboardData.getData("Text")
              insertTextAtCursor(text)
            }
          })
      }

      var targetHiddenInput = Haack.get(editor.dataset.target)
      if (targetHiddenInput) {
        editor.oninput = (e) => {
          targetHiddenInput.value = e.target.innerText
          targetHiddenInput.onchange()
        }
      }
    })

    // Set up other stuff
    var emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+$/
    var avatarPreview = Haack.get('avatar-preview')
    avatarPreview.onerror = (e) => { tryLoad(e.target, 1) }

    function changeAvatar() {
      let image = avatarPreview
      image.possible = buildPossibleAvatars(Haack.get('identity').value)
      image.currentIndex = 0
      tryLoad(image)
    }

    function tryLoad(image, increment) {
      if (increment) {
        image.currentIndex += increment
      }

      if (image.currentIndex < image.possible.length) {
        image.src = image.possible[image.currentIndex]
      }
      else {
        image.onerror = null
        image.src = image.dataset.fallbacksrc;
      }
    }

    function buildPossibleAvatars(identity) {
      let possibleAvatars = []

      if (identity.match(emailRegex)) {
        possibleAvatars.push('https://secure.gravatar.com/avatar/' + md5(identity) + '?s=80&d=identicon&r=pg')
      } else {
        possibleAvatars.push('https://github.com/' + identity + '.png')
        possibleAvatars.push('https://avatars.io/twitter/' + identity + '/medium')
      }

      return possibleAvatars
    }

    Haack.get('identity').onchange = () => {
      changeAvatar()
    }

    function storeUser(name, identity) {
      window.localStorage.name = name;
      window.localStorage.identity = identity;
    }

    function retrieveUser(nameInput, identityInput, rememberCheckbox) {
      var rememberMe = false
      if (window.localStorage.name) {
        nameInput.value = window.localStorage.name;
        rememberMe = true
      }
      if (window.localStorage.identity) {
        identityInput.value = window.localStorage.identity;
        rememberMe = true
      }
      if (rememberMe) {
        rememberCheckbox.checked = true
      }
    }

    function validateFields(status, button) {
      var requiredFields = form.querySelectorAll('[data-required]')
      let missing = Array.from(requiredFields).filter(el => el.value === '').map(el => el.name)
      if (missing.length > 0) {
        button.innerText = button.dataset.label
        button.classList.remove('confirm-button');
        status.classList.remove('confirm-status')
        status.innerText = 'Some required fields are missing - (' + missing.join(', ') + ')'
        requiredFields.forEach(field => {
          field.onchange = () => {
            validateFields(status, button)
          }
        })
        return false
      }

      status.innerText = ''
      return true
    }

    Haack.get('comment-button').onclick = (e) => {
      let button = e.target
      if (!button.dataset.label) {
        button.dataset.label = button.innerText;
      }
      let status = Haack.get('comment-status')
      status.innerText = ''

      if (!validateFields(status, button)) {
        return
      }

      // Confirmation
      if (button.innerText != 'Confirm comment') {
        button.innerText = 'Confirm comment'
        button.title = 'Click the button again to confirm the comment'
        button.classList.add('confirm-button')
        status.innerText = "Please click the button again to confirm your comment"
        status.classList.add('confirm-status')
        return
      }
      let name = Haack.get('name')
      let identity = Haack.get('identity')

      if (Haack.get('remember').checked) {
        storeUser(name.value, identity.value)
      }
      else {
        storeUser('', '')
      }
      Haack.get('avatar-input').value = avatarPreview.src

      button.disabled = true
      button.innerText = 'Posting...'
      identity.value = ""
      form.action = form.dataset.action
      form.submit()
    }

    // Load values from Local Storage.
    retrieveUser(Haack.get('name'), Haack.get('identity'), Haack.get('remember'))
    changeAvatar() // initial load of avatar
  }
})
