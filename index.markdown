---
layout: home
---

<section class="o-section  o-section--home  o-section--header  t-section  t-section--header">

  <div class="c-home__container">

    <h1>
      Weather-Helm
    </h1>

    <img srcset="/assets/images/home/flags.png 300w,
                 /assets/images/home/flags.png 600w,
                 /assets/images/home/flags.png 1000w,
                 /assets/images/home/flags.png 2000w"
          sizes="(min-width: 760px) 14rem,
                 (min-width: 1200px) 100%,
                 11rem"
          src="/assets/images/home/flags.png"
          alt="Go Blue">
    
    {%- assign default_paths = site.pages | map: "path" -%}
    {%- assign page_paths = site.header_pages | default: default_paths -%}
    {%- assign titles_size = site.pages | map: 'title' | join: '' | size -%}
    {%- if titles_size > 0 -%}
      <nav class="site-nav">    
        <div class="trigger">
          {%- for path in page_paths -%}
            {%- assign my_page = site.pages | where: "path", path | first -%}
            {%- if my_page.title and my_page.title != site.title -%}
            <a class="page-link" href="{{ my_page.url | relative_url }}">{{ my_page.title | escape }}</a>
            {%- endif -%}
          {%- endfor -%}
        </div>
      </nav>
    {%- endif -%}

  </div><!-- /c-home__container -->

</section><!-- /o-section -->