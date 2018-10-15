var Haack = (function() {
  // NodeList foreach Polyfill
  if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
          thisArg = thisArg || window
          for (var i = 0; i < this.length; i++) {
              callback.call(thisArg, this[i], i, this)
          }
      }
  }

  // Haack namespace object.
  return {
      ready: function(init) {
        if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
      		window.setTimeout(init)
        }
        else {
          var completed = function() {
            document.removeEventListener("DOMContentLoaded", completed)
          	window.removeEventListener("load", completed)
            init()
          }
          document.addEventListener("DOMContentLoaded", completed)
          window.addEventListener("load", completed)
        }
      },
      get: function(elementId) {
        var element = document.getElementById(elementId)
        if (element)
          return element
        var elements = document.getElementsByClassName(elementId)
        if (elements && elements.length > 0)
          return elements[0]
        return null
      }
  };
})();
