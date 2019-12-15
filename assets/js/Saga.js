/* exported Saga */

let Saga = (() => {
    'use strict';
    let fitVids = () => {
        const players = [
            'iframe[src*="youtube.com"]',
            'iframe[src*="soundcloud.com"]',
            'iframe[src*="codepen.com"]',
            'iframe[src*="vimeo.com"]'
        ];

        let videos = document.querySelectorAll(players.join(','));

        if (videos.length) {

            for (let i = 0; i < videos.length; i += 1) {

                let video = videos[i];
                let width = video.getAttribute('width');
                let height = video.getAttribute('height');
                let aspectRatio = height / width;
                let parentDiv = video.parentNode;

                parentDiv.classList.add('responsive-video');
                parentDiv.style.paddingBottom = aspectRatio * 100 + '%';

                video.removeAttribute('height');
                video.removeAttribute('width');
            }
        }
    };

    let ghostGallery = () => {
        const images = document.querySelectorAll('.kg-gallery-image img');
        images.forEach(function (image) {
            let container = image.closest('.kg-gallery-image');
            let width = image.attributes.width.value;
            let height = image.attributes.height.value;
            let ratio = width / height;
            container.style.flex = ratio + ' 1 0%';
        });
    };

    fitVids();
    ghostGallery();
})();