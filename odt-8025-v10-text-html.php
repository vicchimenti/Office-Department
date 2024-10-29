<div class="hero--basic global-padding--15x">
  <div class="grid-container">

    <div class="grid-x grid-margin-x">



      <div class="cell medium-8">
        <div class="hero--basic__text hero--profile__text text-margin-reset">
          <h1><t4 type="content" name="Office/Dept Name" output="normal" modifiers="striptags,htmlentities" /></h1>

          <div class="tags tags__links">
            <h2 class="tags__heading show-for-sr">Profile Type:</h2>
            <ul>
                <?php tags_list('<t4 type="content" name="Type of Office/Dept" output="normal" display_field="value" delimiter="|" />','<t4 type="navigation" name="Office and Departments Home Link" id="998" />','typeOfOffice', '|'); ?>
            </ul>
          </div>

          <div class="wysiwyg">
            <p><t4 type="content" name="General Description" output="normal" modifiers="striptags,htmlentities" /></p>
          </div>

          <div class="global-spacing--3x<t4 type="content" name="Hide Breadcrumbs" output="selective-output" format=" sr-only" />">
            <t4 type="navigation" name="Breadcrumbs" id="955" />
          </div>

        </div>
      </div>


      <aside class="cell medium-4">
        <t4 type="content" name="Office/Dept Image" output="selective-output" process-format="true" format="<figure class=&quot;aspect-ratio-frame&quot; style=&quot;--aspect-ratio: 22/36&quot;>
          <img loading=&quot;eager&quot; src=&quot;<t4 type=&quot;content&quot; name=&quot;Office/Dept Image&quot; output=&quot;normal&quot; formatter=&quot;v10/image/pxl-crop&quot; cdn=&quot;true&quot; pxl-filter-id=&quot;57&quot; />&quot; srcset=&quot;
                      <t4 type=&quot;content&quot; name=&quot;Office/Dept Image&quot; output=&quot;normal&quot; formatter=&quot;v10/image/pxl-crop&quot; cdn=&quot;true&quot; pxl-filter-id=&quot;57&quot; /> 360w,
                      <t4 type=&quot;content&quot; name=&quot;Office/Dept Image&quot; output=&quot;normal&quot; formatter=&quot;v10/image/pxl-crop&quot; cdn=&quot;true&quot; pxl-filter-id=&quot;58&quot; /> 728w&quot;
            sizes=&quot;(min-width: 1280px) 360px, (min-width: 780px) 29.17vw, calc(100vw - 40px)&quot; alt=&quot;placeholder&quot;>
        </figure>" formatter="path/*" />


        <div class="office-detail--contact">
          <div class="eyebrow" id="office-title">Contact Information</div>



          <ul class="icon-list" id="office-list">


            <t4 type="content" name="Phone" output="selective-output" process-format="true" format="<li>
              <span class=&quot;icon-list__icon fas fa-phone&quot; aria-hidden=&quot;true&quot;></span>
              <span class=&quot;icon-list__content&quot;><a href='tel:<t4 type=&quot;content&quot; name=&quot;Phone&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; />'><t4 type=&quot;content&quot; name=&quot;Phone&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; /></a></span>
            </li>" />


            <t4 type="content" name="Email" output="selective-output" process-format="true" format="<li>
              <span class=&quot;icon-list__icon fas fa-envelope&quot; aria-hidden=&quot;true&quot;></span>
              <span class=&quot;icon-list__content&quot;><a href='mailto:<t4 type=&quot;content&quot; name=&quot;Email&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; />'><t4 type=&quot;content&quot; name=&quot;Email&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; /></a></span>
            </li>" />


            <t4 type="content" name="Location" output="selective-output" process-format="true" format="<li>
              <span class=&quot;icon-list__icon fas fa-map-marker-alt&quot; aria-hidden=&quot;true&quot;></span>
              <span class=&quot;icon-list__content&quot;><t4 type=&quot;content&quot; name=&quot;Location&quot; output=&quot;normal&quot; modifiers=&quot;nl2br&quot; /></span>
            </li>" />


            <t4 type="content" name="Opening Hours" output="selective-output" process-format="true" format="<li>
              <span class=&quot;icon-list__icon fas fa-clock&quot; aria-hidden=&quot;true&quot;></span>
              <span class=&quot;icon-list__content&quot;><t4 type=&quot;content&quot; name=&quot;Opening Hours&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; /></span>
            </li>" />
          </ul>
          <div class="eyebrow" id="connect">Connect</div>
          <ul class="icon-list social-media btn-row" id="social-media-icons">

            <t4 type="content" name="TikTok URL" output="selective-output" process-format="true" format="<li>
                <a href=&quot;<t4 type=&quot;content&quot; name=&quot;TikTok URL&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; />&quot; target=&quot;_blank&quot; aria-label=&quot;Tiktok opens in a new window&quot;>
                  <span class=&quot;show-for-sr&quot;>Tiktok</span>
                  <span class=&quot;fa-brands fa-tiktok&quot; aria-hidden=&quot;true&quot;></span>
                </a>
              </li>" />
            <t4 type="content" name="Twitter/X URL" output="selective-output" process-format="true" format="<li>
              <a href=&quot;<t4 type=&quot;content&quot; name=&quot;Twitter/X URL&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; />&quot; target=&quot;_blank&quot; aria-label=&quot;Twitter opens in a new window&quot;>
                <span class=&quot;show-for-sr&quot;>Twitter</span>
                <span class=&quot;fa-brands fa-square-x-twitter&quot; aria-hidden=&quot;true&quot;></span>
              </a>
            </li>" />
            <t4 type="content" name="YouTube URL" output="selective-output" process-format="true" format=" <li>
              <a href=&quot;<t4 type=&quot;content&quot; name=&quot;YouTube URL&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; />&quot; target=&quot;_blank&quot; aria-label=&quot;YouTube opens in a new window&quot;>
                <span class=&quot;show-for-sr&quot;>YouTube</span>
                <span class=&quot;fa-brands fa-square-youtube&quot; aria-hidden=&quot;true&quot;></span>
              </a>
            </li>" />
            <t4 type="content" name="LinkedIn URL" output="selective-output" process-format="true" format="<li>
              <a href=&quot;<t4 type=&quot;content&quot; name=&quot;LinkedIn URL&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; />&quot; target=&quot;_blank&quot; aria-label=&quot;LinkedIn opens in a new window&quot;>
                <span class=&quot;show-for-sr&quot;>LinkedIn</span>
                <span class=&quot;fa-brands fa-linkedin&quot; aria-hidden=&quot;true&quot;></span>
              </a>
            </li>" />
            <t4 type="content" name="Instagram URL" output="selective-output" process-format="true" format="<li>
              <a href=&quot;<t4 type=&quot;content&quot; name=&quot;Instagram URL&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; />&quot; target=&quot;_blank&quot; aria-label=&quot;Instagram opens in a new window&quot;>
                <span class=&quot;show-for-sr&quot;>Instagram</span>
                <span class=&quot;fa-brands fa-square-instagram&quot; aria-hidden=&quot;true&quot;></span>
              </a>
            </li>" />
            <t4 type="content" name="Facebook URL" output="selective-output" process-format="true" format="<li>
              <a href=&quot;<t4 type=&quot;content&quot; name=&quot;Facebook URL&quot; output=&quot;normal&quot; modifiers=&quot;striptags,htmlentities&quot; />&quot; target=&quot;_blank&quot; aria-label=&quot;Facebook opens in a new window&quot;>
                <span class=&quot;show-for-sr&quot;>Facebook</span>
                <span class=&quot;fa-brands fa-square-facebook&quot; aria-hidden=&quot;true&quot;></span>
              </a>
            </li>" />

          </ul>
        </div>
      </aside>

    </div>
  </div>
</div>