---
title: Tags
permalink: /tags/
include_nav: false
---

<script>
  Haack.ready(() => {
    let title = document.getElementsByClassName('post-title')
    if (title) {
      title[0].style.display = 'none'
    }
    let tag = window.location.hash
    if(tag) {
        let tagElement = document.getElementById(tag.substring(1))
        if (tagElement) {
        tagElement.style.display = 'block'
        }
    }
  })
</script>

<style>
  .tag {display: none;}
</style>

{% assign tags = site.tags %}

{% for tag in tags %}
  {% assign tagname = tag | first | slugify %}
<div id="{{ tagname }}" class="tag">
  <span>Tagged with</span>
  <h2>{{ tagname }}</h2>
  {% assign pages = tag[1] %}
  <ul>
  {% for page in pages %}
    <li>
      <h3>{{ page.title }}</h3>
      <div>
        {{ page.excerpt }}
      </div>
    </li>
  {% endfor %}
  </ul>
</div>
{% endfor %}