/* global hljs, $, console */
/* jshint browser: true */

!function(){
    var Saga = {

        /* 
         *  Switch this to true if all the dependencies are already loaded,
         *  for example via a bundeld js file.
         */

        scriptsPresent: false,

        initialize: function(){
            // Get url for blog (in case site is run under a sub-domain)
            this.siteurl = $('#site-url').attr('href');
            this.$main = $('#main');

            this.highlightCode();
            this.responsiveVideos();
            this.gallery();
            this.fullWidthImages();
            this.lightBox();
            this.stickyFooter();
            this.initializeFeed();
            this.initializePostNavigation();
        },

        highlightCode: function(){
            if($('code').length === 0){
                return;
            }

            this.getScript('/assets/js/helper/highlight.min.js')
            .then(function() { 
                hljs.initHighlightingOnLoad();
            });
        },

        responsiveVideos: function(){
            this.getScript('/assets/js/helper/jquery.fitvids.js').then($.proxy(function() { 
                this.$main.fitVids();
            }, this));
        },

        gallery: function(){
            if( $('p a:not(:only-child) img').closest('p').length === 0 
                && $('p img:not(:only-child)').closest('p').length !== 0){
                return;
            }

            this.getScript('/assets/js/helper/imagesloaded.pkgd.min.js').then(function() {
                $('p a:not(:only-child) img').closest('p').addClass('gallery');
                $('p img:not(:only-child)').closest('p').addClass('gallery');
                $('.gallery').imagesLoaded($.proxy(this.onGallery, this));
                $(window).resize($.proxy(this.onGallery, this));
            });
        },

        onGallery: function(){
            this.getScript('/assets/js/helper/gallery.min.js').then(function() { // Load in script for gallery
                    var size = 0;
                    if ($(window).height() > $(window).width()){
                        size = $(window).height();
                    } else {
                        size = $(window).width();
                    }
                    if (size < 210){
                        size = 210;
                    }
                    $('.gallery').removeWhitespace().collagePlus({
                            'targetHeight': size/5
                    });
                });
        },

        fullWidthImages: function(){
            if(!this.$main.hasClass('content')){
                return;
            }

            this.getScript('/assets/js/helper/imagesloaded.pkgd.min.js')
            .then($.proxy(function() {
                this.$main.imagesLoaded($.proxy(this.onFullWidthImages, this));
                $(window).resize($.proxy(this.onFullWidthImages, this));
            }, this));
        },

        onFullWidthImages: function(){
            $("img[src$='#full']:only-child").each(function() {
                var $t = $(this);
                $t.addClass('full-loaded');
                $t.closest('p').css('min-height', $t.height());
                $t.closest('p').addClass('full-image-container');
            });
        },

        lightBox: function(){
            if(!this.$main.hasClass('content')){
                return;
            }

            this.getScripts([
                '/assets/js/helper/jquery.fluidbox.min.js',
                '/assets/js/helper/imagesloaded.pkgd.min.js'
            ]).then($.proxy(function(){
                this.$main.imagesLoaded(this.onLightBox.bind(this));
            }, this));
        },

        onLightBox: function(){
            $('.content a').filter(function() {
                return $(this).attr('href').match(/\.(jpeg|jpg|png|gif)/i);
            }).fluidbox({
                closeTrigger: [
                    { selector: '#fluidbox-overlay', event: 'click'         },
                    { selector: 'window',            event: 'resize scroll' }
                ]
            });
        },

        stickyFooter: function(){
            var resize = $.proxy(function(){
                this.$main.css('min-height', 
                    $(window).height() - $('#header').height() - $('#footer').height()
                );
            }, this);

            $(window).load(resize);
            $(window).resize(resize);
        },

        initializeFeed: function(){
            if(!this.$main.hasClass('archive')){
                return;
            }

            this.getScripts([
                '/assets/js/helper/masonry.pkgd.min.js',
                '/assets/js/helper/imagesloaded.pkgd.min.js'
            ]).then($.proxy(function(){
                this.$main.imagesLoaded($.proxy(this.feed, this));
            }, this));
        },

        feed: function(){
            this.$masonry = $('.feed').masonry({
                columnWidth: '.post:not(.featured)',
                itemSelector: '.post',
                gutter: 20
            });

            $('.post').each(function(){
                $(this).css('opacity', '1.0');
            });
            $('#loadmore').each(function(){
                $(this).css('opacity', '1.0');
            });
        },

        initializePostNavigation: function(){
            if(!this.$main.hasClass('archive')){
                return;
            }

            // The number of the next page to load (/page/x/).
            this.numbers = $('.page-number').text().match(/[-+]?[0-9]*\.?[0-9]+/g);
            this.pageNum = parseInt(this.numbers[0], 10);
            // The maximum number of pages the current query can return.
            this.max = parseInt(this.numbers[1], 10);
            // The link of the next page of posts.
            this.nextLink = $('.older-posts').attr('href');
            /**
             * Replace the traditional navigation with our own,
             * but only if there is at least one page of new posts to load.
             */
            if(this.pageNum < this.max) {
                // Insert the 'More Posts' link.
                var html = [
                    "<div id='loadmore' style='opacity: 0;'>",
                    "<a class='btn'>Load more <i class='fa fa-plus-circle'></i></a>",
                    "</div>"
                ];

                $('#feed').append(html.join(''));

                // Remove the traditional navigation.
                $('.pagination').remove();
            } else {
                $('.pagination').remove();
            }

            $('#loadmore a').on('click', $.proxy(this.loadMorePosts, this));
        },

        loadMorePosts: function(event){
            var $masonry = this.$masonry;

            event.preventDefault();

            // Are there more posts to load?
            if(this.pageNum < this.max) {

                // Show that we're working.
                $(this).html("<i class='fa fa-spinner fa-spin'></i>");

                // Grab data from next page
                $.get(this.nextLink, function(data){ 
                    // Append all posts to #content
                    var posts = $(data).find('.post');
                    $.each(posts,function(){
                        $(this).css('opacity', 0);
                    });
                    $masonry.append(posts);
                    // Change nextLink to next page
                    $('#feed').imagesLoaded(function(){
                        this.pageNum++;
                        this.nextLink = this.nextLink.substring(0, this.nextLink.indexOf('page/'));
                        this.nextLink += 'page/'+(this.pageNum+1);

                        // Remove button if last page else move the button to end of #content
                        if(this.pageNum < this.max) {
                            $('#loadmore').insertAfter($('#feed .post:last'));
                            $('#loadmore a').html("Load more <i class='fa fa-plus-circle'></i>");
                        } else {
                            $('#loadmore').remove();
                        }
                        $masonry.masonry('appended', posts);
                    });
                });
            } else {
                $('#loadmore').remove();
            }   
        },

        loadedScripts: {},

        getScripts: function(scripts){
            var promise = $.Deferred();
            var loader = $.proxy(function(){
                if(scripts.length > 0){
                    var path = scripts.shift();

                    if(path in this.loadedScripts){
                        loader();
                    } else {
                        $.getScript(this.siteurl + path)
                        .then($.proxy(function(){
                            this.loadedScripts[path] = true;
                            loader();
                        }, this))
                        .fail(function(err){
                            if(err){
                                promise.rejectWith(err);
                            } else {
                                promise.reject();
                            }
                        });
                    }
                } else {
                    promise.resolve();
                }
            }, this);

            if(this.scriptsPresent){
                promise.resolve();
            } else {
                loader();
            }
            
            return promise;
        },

        getScript: function(path){
            return this.getScripts([path]);
        }
    };

    $($.proxy(Saga.initialize, Saga));
}();