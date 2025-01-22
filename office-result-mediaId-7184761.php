<div id="search-results" class="page page--full-width program-listing" data-t4-ajax-group="courseSearch" role="main">
  <article class="listing-page">
    <section class="su-listing">
      <?php if (!empty($results)) : ?>
        <?php foreach ($results as $item) : ?>
          <article class="listing--item department--item global-padding--5x">
            <div class="grid-container">
              <div class="grid-x grid-margin-x">
                <div class="cell medium-8 medium-offset-1 text-margin-reset">
                  <h3 class="h4 funderline"><a href="<?php echo $item['url']; ?>" title="Visit <?php echo $item['officeName']; ?>"><?php echo $item['officeName']; ?></a></h3>
                  <div class="global-spacing--2x">
                    <p><?php echo $item['generalDescription']; ?></p>
                  </div>
                  <?php if (!empty($item['schoolsColleges'])): ?>
                    <div class="global-spacing--2x tags tags__links">
                      <h4 class="tags__heading show-for-sr">School or College:</h4>
                      <ul>
                        <?php tags_list($item['schoolsColleges'], $office_department_link, 'schoolsColleges', '|'); ?>
                      </ul>
                    </div>
                  <?php endif; ?>
                </div>
                <div class="cell medium-3">
                  <?php if($item['phone'] || $item['email'] || $item['location'] || $item['openingHours']): ?>
                    <ul class="icon-list">
                      <?php if($item['phone']):?>
                        <li>
                          <span class="icon-list__icon fas fa-phone" aria-hidden="true"></span>
                          <span class="icon-list__content"><a href="tel:<?php echo $item['phone']; ?>" title="Call: <?php echo $item['officeName']; ?>"><?php echo $item['phone']; ?></a></span>
                        </li>
                      <?php endif; ?>
                      <?php if($item['email']):?>
                        <li>
                          <span class="icon-list__icon fas fa-envelope" aria-hidden="true"></span>
                          <span class="icon-list__content">
                            <a href="mailto:<?php echo $item['email']; ?>" title="Email: <?php echo $item['officeName']; ?>"><?php echo $item['email']; ?></a>
                          </span>
                        </li>
                      <?php endif; ?>
                      <?php if($item['location']): ?>
                        <li>
                          <span class="icon-list__icon fas fa-map-marker-alt" aria-hidden="true"></span>
                          <span class="icon-list__content"><?php echo $item['location']; ?></span>
                        </li>
                      <?php endif; ?>
                      <?php if($item['openingHours']): ?>
                        <li>
                          <span class="icon-list__icon fas fa-clock" aria-hidden="true"></span>
                          <span class="icon-list__content"><?php echo $item['openingHours']; ?></span>
                        </li>
                      <?php endif; ?>
                    </ul>
                  <?php endif; ?>
                </div>
              </div>
            </div>
          </article>
        <?php endforeach; ?>
        <div class="pagination-box">
          <div class="pagination-pages">
            <?php if(isset($paginationArray)): ?>
              <nav aria-label="pagination" class="pagination" data-t4-ajax-link="normal" data-t4-scroll="true">
                <?php 
                foreach ($paginationArray as $paginationItem) : 
                  if ($paginationItem['current']) : ?>
                    <span class="currentpage" aria-current="page"><?php echo html_entity_decode($paginationItem['text']); ?></span>
                  <?php else : ?>
                    <a href="<?php echo $paginationItem['href']; ?>" 
                      class="<?php echo $paginationItem['class']; ?>" 
                      title="<?php echo is_numeric($paginationItem['text']) ? 'Page ' . $paginationItem['text'] : html_entity_decode($paginationItem['text']); ?>">
                      <?php echo html_entity_decode($paginationItem['text']); ?>
                    </a>
                  <?php endif;
                endforeach; ?>
              </nav>
            <?php endif; ?>
          </div>
        </div>
      <?php else : ?>
        <p style="text-align: center; padding-top: 30px; font-weight: bold;">No Results Found</p>
      <?php endif; ?>
    </section>
  </article>
</div>
