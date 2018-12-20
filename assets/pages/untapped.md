---
title: "Untagged posts"
permalink: /untagged/
---

<ul>
{% for post in site.posts %}
  {% assign tags = post.tags %}
    {% if tags.size == 0 %}
  <li>
    <div><a href="{{ post.url }}">{{ post.title }}</a></div>
    <ul>
      <li>tags.size: {{ tags.size }}</li>
    </ul>
  </li>
    {% endif %}
{% endfor %}
</ul>