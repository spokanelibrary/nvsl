/*
 *
 *  SPL HIP NoveList Display Customizations
 *
 *  @author: Sean Girard | sgirard@spokanelibrary.org
 *
 */

function splInitNoveList(nvslFeaturesLoaded) {

  // Customize your NoveList display here
  var splNvslConfig = {
                        // custom container defined in fullnonmarcbib.xsl 
                        tabContainer: '#spl-api'
                        // override headings
                      , featureLabel: {
                          similarauthors: 'Similar Authors'
                        , similarseries: 'Similar Series'
                        , similartitles: 'Similar Titles' 
                        // , seriesinfo: 'Books in This Series'
                        , relatedcontent: 'Awards and Articles'
                        , eresourcerecommendation: 'eResources'
                        // , lexileinfo: 'Reading Level'
                        // , goodreads: 'Reader Ratings and Reviews'
                        }
                      // do not define a section pulled into a sidebar as default!
                      , defaultTab: 'goodreads' // goodreads is a safe bet here (likely to have content)
                      // helper text
                      , message: {
                          scrollDown: 'Please scroll down to see item availability.'
                        , hide: 'Hide &darr;'
                      }
                      // whether to show the hidden sidebar elements if no content
                      , showSidebarOnEmpty: false
                      // rearrange this object to change tab order
                      , featureOrder: {
                          similartitles: true
                        , similarauthors: true
                        , similarseries: true
                        , goodreads: true
                        , seriesinfo: true
                        , eresourcerecommendation: true
                        , relatedcontent: true
                        , lexileinfo: true
                      }
                      // make it match
                      , colorScheme: {
                          tabColor: 'rgb(0,50,75)'
                        , tabColorHover: '#000'
                        , tabBackground: 'rgb(150,200,100)'
                        
                        , tabKeyline: 'rgb(50,75,100)'
                        
                        , tabActiveColor: '#fff'
                        , tabActiveBackground: 'rgb(50,75,100)' 

                        , toggleBackground: '#ececec'
                        , toggleKeyline: 'rgb(50,75,100))'

                        , sectionHeaderColor: 'rgb(50,75,100)'
                        , sectionHeaderKeyline: '#ccc'
                        , sectionHeaderBackground: 'none'

                        , introMessageColor: '#666'
                      }
      
  };

  // Element positioning. Change this if you like.
  var splNvslStyleSheet = {
                          nvslHeader: { 
                              color: splNvslConfig.colorScheme.sectionHeaderColor
                            , backgroundColor: splNvslConfig.colorScheme.sectionHeaderBackground
                            , borderTop: '1px solid '+splNvslConfig.colorScheme.sectionHeaderKeyline
                            , borderBottom: '1px solid '+splNvslConfig.colorScheme.sectionHeaderKeyline
                            , textAlign: 'center'
                            , fontSize: '16px'
                            , padding: '4px 0'
                            , marginTop: '10px'
                            , fontWeight: 'bold'
                        }
                        , nvslSidebarTable: {
                              fontSize: '13px'
                        }
                        , nvslSectionToggle: {
                              backgroundColor: splNvslConfig.colorScheme.toggleBackground
                            , borderColor: splNvslConfig.colorScheme.toggleKeyline
                            , borderWidth: '1px'
                            , borderStyle: 'solid'
                            , borderRadius: '4px'
                            , padding: '2px 3px'
                            , fontWeight: 'normal'
                        }
                        , nvslIntro: {
                              color: splNvslConfig.colorScheme.introMessageColor
                            , marginBottom: '6px'
                            , fontSize: '13px'
                        }
                        , nvslTabs: {
                              borderBottom: '2px solid '+splNvslConfig.colorScheme.tabKeyline
                        }
                        , nvslHide: {
                              float: 'right'
                            , padding: '0 6px'
                        }
                        , nvslTab: { 
                              backgroundColor: splNvslConfig.colorScheme.tabBackground 
                            , borderColor: splNvslConfig.colorScheme.tabKeyline
                            , borderWidth: '2px 2px 0 2px'
                            , borderStyle: 'solid'
                            , borderRadius: '4px 4px 0 0'
                            , padding: '0 6px'
                            , marginRight: '4px'
                            , fontSize: '14px'
                        }
                        , nvslTabAnchor: {
                              color: splNvslConfig.colorScheme.tabColor
                        }
                        , nvslTabAnchorHover: {
                              color: splNvslConfig.colorScheme.tabColorHover
                        }
                        , nvslTabActive: { 
                              backgroundColor: splNvslConfig.colorScheme.tabActiveBackground
                        }
                        , nvslTabActiveAnchor: {
                              color: splNvslConfig.colorScheme.tabActiveColor
                        }
                        , nvslTabActiveAnchorHover: {
                              color: splNvslConfig.colorScheme.tabActiveColor
                        }
  };

  // YOU SHOULD NOT NEED TO MODIFY ANYTHING BELOW THIS POINT

  // Bail out if no data
  if ( !novSelect || !nvslFeaturesLoaded ) { return; }
  // Namespace to '$' the jQuery object loaded by Ebsco  
  // (if you're ok w/ an older version, otherwise load yer own)
  if ( $nsjq && !$ ) { var $ = $nsjq; }

  var $splNvslContainer = $(splNvslConfig.tabContainer);
  //var $splNvslContainers = $('div').find("[data-novelist-novelistselect]");

  // Apply full style sheet
  splNvslConfig.styleSheet = splNvslStyleSheet;

  // Ok, Go!
  splNvslParseFeatures();

  function splNvslApplyStyles() {
    var styles = splNvslConfig.styleSheet;

    $('#spl-nvsl-tabs').css(styles.nvslTabs);
    $('#spl-nvsl-hide a').css(styles.nvslHide);
    $('#spl-nvsl-intro').css(styles.nvslIntro);
    
    $('.spl-nvsl-tab').css(styles.nvslTab);
    $('.spl-nvsl-header').css(styles.nvslHeader); 

    $('.NovSectionToggle').css(styles.nvslSectionToggle);

    $('table', '.spl-nvsl-sidebar').css(styles.nvslSidebarTable);

    splNvslApplyDynamicStyles();
  }; // splNvslApplyStyles()

  // Since we're keeping css in js addClass/removeClass are not sufficient for tabbing
  function splNvslApplyDynamicStyles() {
    var styles = splNvslConfig.styleSheet;

    $('.spl-nvsl-tab').css(styles.nvslTab);
    $('.spl-nvsl-tab a').css(styles.nvslTabAnchor);
    $('.spl-nvsl-tab a').hover(function() {
      $(this).css(styles.nvslTabAnchorHover);
    }, function() {
      $(this).css(styles.nvslTabAnchor);
    });

    $('.spl-nvsl-tab-active').css(styles.nvslTabActive);
    $('.spl-nvsl-tab-active a').css(styles.nvslTabActiveAnchor);
    $('.spl-nvsl-tab-active a').hover(function() {
      $(this).css(styles.nvslTabActiveAnchorHover);
    }, function() {
      $(this).css(styles.nvslTabActiveAnchor);
    });

  }; // splNvslApplyDynamicStyles()

  function splNvslHandleEvents() {
    // Note: as of 17 Jan 2013 Ebsco is loading jQuery 1.5.1 
    // which doesn't support delegated events using .on() so instead use .live()
    
    $('a', '#spl-nvsl-tabs').live('click', function(e) {
      e.preventDefault();
      
      $('.spl-nvsl-panel').hide();
      $('.spl-nvsl-tab').removeClass('spl-nvsl-tab-active');
      $(this).closest('span').addClass('spl-nvsl-tab-active');

      $($(this).data('tab-pane-selector')).show();
      $('#spl-nvsl-hide').show();

      splNvslApplyDynamicStyles();
    });

    $('a', '#spl-nvsl-hide').live('click', function(e) {
      e.preventDefault();

      $('.spl-nvsl-panel').hide();
      $('#spl-nvsl-hide').hide();
    });

  }; // splNvslHandleEvents()

  function splNvslParseFeatures() {
    splNvslHandleEvents();

    var splNvsl = splNvslGetFeatures();

    var splNvslHeader = '';
    splNvslHeader += '<div id="spl-nvsl-intro" class="spl-nvsl-loaded" style="display:none;">';
    splNvslHeader += '<span id="spl-nvsl-scroll"">'+splNvslConfig.message.scrollDown+'</span>';
    splNvslHeader += '</div>';

    splNvslHeader += '<div id="spl-nvsl-tabs" class="spl-nvsl-loaded" style="display:none;"></div>';

    splNvslHeader += '<span id="spl-nvsl-hide" class="spl-nvsl-loaded" style="display:none;">';
    splNvslHeader += '<a href="#">'+splNvslConfig.message.hide+'</a>';
    splNvslHeader += '</span>';
    

    $splNvslContainer.append(splNvslHeader);

    $.each(splNvsl, function(k, feature) {

      if ( feature ) {
        var featureLabel = feature.feature_label;
        if ( splNvslConfig.featureLabel[feature.feature_type] ) {
          featureLabel = splNvslConfig.featureLabel[feature.feature_type];
        }

        // .Loaded signals this feature is loaded in a custom div (I think)
        if ( feature.section.Loaded ) {
          var $element = $(feature.display.PH);
          if ( $element ) {    
            // Simpler to just recreate a header for placed elements
            $('.NovSectionHeader', $element).remove();

            $($element).prepend('<div class="spl-nvsl-header">'+featureLabel+'</div>');

          } 
        } else {
          var $element = $(feature.section.Class);
          if ( $element ) {
            // Tabs are sufficient headers here
            $('.NovSectionHeader', $element).remove();
            $element.addClass('spl-nvsl-panel');
            $element.hide();
          }

          var $tab = '';
          $tab += '<span class="spl-nvsl-tab" id="spl-nvsl-tab-'+feature.feature_type+'">';
          $tab += '<a href="#" data-tab-pane-selector='+feature.section.Class+'>';
          $tab += featureLabel;
          $tab += '</a>';
          $tab += '</span>';

          $('#spl-nvsl-tabs').append($tab);

          if ( feature.feature_type == splNvslConfig.defaultTab ) {
            $('#spl-nvsl-tab-'+feature.feature_type).addClass('spl-nvsl-tab-active');
            $(feature.section.Class).show();
          }
          
        }

        // Ebsco *really* wants us to display this Goodreads blurb
        // I don't see why we can't put it someplace more user-friendly though
        if ( 'goodreads' == feature.feature_type ) {
          var $goodreadsDescription = $('.NovSectionBody>div:first-child', $element);
          $element.append('<small>'+$goodreadsDescription.html()+'</small>');
          $goodreadsDescription.remove();
        }

      }
      

    });

    // Only show tabs if we have panels
    if (  $('.spl-nvsl-tab').length > 0 ) { 
      $('.spl-nvsl-loaded').show();
    } else {
      if ( splNvslConfig.showSidebarOnEmpty ) {
        // optionally replace hidden sidebar elements (see config)
        $('.spl-sidebar-hidden').show();
      }
    }

    // Apply styles after content is loaded
    splNvslApplyStyles();
  }; // splNvslParseFeatures()

  function splNvslGetFeatures() {
    var features = {};
    // This routine just gathers available nvsl info
    // there is probably a better way to get at it
    $.each(nvslFeaturesLoaded, function(j,feature) {
      // Class name
      $.each(NovDisplaySections, function(k,section) {
        // consider switching to regex if using unicode chars
        if(section.Name.toLowerCase() == feature.feature_type.toLowerCase()){
          feature.section = section;
          // associate an ID with each section, excluding groups (must be a better way?)
          $.each(NovDisplayPH, function(i, display) {
            if ( section.Name == display.NestedSections[0] 
                  && 1 == display.NestedSections.length ) {
              feature.display = display;
            }
          });
        }
      });
      // Tack each feature onto our detection object
      features[feature.feature_type] = feature;
    });
    
    // Now create an ordered object
    var ordered = {};
    $.each(splNvslConfig.featureOrder, function(name) {
      ordered[name] = features[name];
    });

    return ordered;
  }; // splNvslGetFeatures()

}; // splInitNoveList()

  