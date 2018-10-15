---
title: Archives
permalink: /archives/
include_nav: true
---

<div class="archives" itemscope itemtype="http://schema.org/Blog">
{% for post in site.posts %}
{% if post.layout == 'post' %}
	{% include archive_post.html %}
{% endif %}
{% endfor %}
  </ul>
</div>