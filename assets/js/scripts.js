/* eslint-env: jQuery */
/* exported Saga */

let Saga = (() => {
    let nav = document.querySelector('#dropdown-menu--toggle');
    let toggleMenu = (selector) => {
        let element = document.querySelector(selector);
        element.setAttribute('data-state', element.getAttribute('data-state') === 'closed' ? 'open' : 'closed');
    };

    nav.onclick = (e) => {
        toggleMenu('#dropdown-menu', 'closed', 'open');
        e.preventDefault();
        e.stopPropagation();
    };

    document.onclick = () => {
        let element = document.querySelector('#dropdown-menu');
        element.setAttribute('data-state', 'closed');
    };
})();