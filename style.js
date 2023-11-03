/*
 Constants
 */
const OCTOCORN_LOGO_URL = "https://raw.githubusercontent.com/Alex-Octocorn/logo/main/octocorn_logo.svg"
const STYLESHEET_URL = "https://raw.githubusercontent.com/Alex-Octocorn/logo/main/style.css"
const LINUX_BUTTONS_URL = "https://raw.githubusercontent.com/Alex-Octocorn/logo/main/linuxButtons.svg"

/*
HTML elements
*/
const head = document.querySelector('head');
const octocornLogo = document.createElement('div');
const linuxButtons = document.createElement('div');


/**
 * Adds CSS to the page and add classes to the elements
 */
function injectCss() {
    const customCss = document.createElement('style');
    customCss.type = 'text/css';
    fetch(STYLESHEET_URL)
        .then(css => css.text())
        .then((css) => {
                customCss.appendChild(document.createTextNode(css));
                head.appendChild(customCss);
            }
        )
    octocornLogo.classList.add('bottom-left-logo');
    linuxButtons.classList.add('linux-buttons');
}

/**
 * Fetches the Linux buttons SVG and adds it to the page
 */
function addLinuxButtons() {
    fetch(LINUX_BUTTONS_URL)
        .then(linuxButtonsSvg => linuxButtonsSvg.text())
        .then((linuxButtonsSvg) => {
                linuxButtons.innerHTML = linuxButtonsSvg;
            }
        )
}

/**
 * Adds favicon to the page
 */
function addFavIcon() {
    const favIcon = document.createElement('link');
    favIcon.type = 'image/x-icon';
    favIcon.rel = 'shortcut icon';
    favIcon.href = OCTOCORN_LOGO_URL;
    head.appendChild(favIcon);
}

/**
 * Adds background-image class to the each slide
 */
function appendBackgroundClassToSlides() {
    const backgrounds = document.getElementsByClassName('slide-background-content');

    for (let i = 0; i < backgrounds.length; i++) {
        backgrounds[i].classList.add('background-image');
    }
}

/**
 * Changes the default PDF background color to match the style
 */
function appendStyleAndLogosToPdfSlides() {
    const backgrounds = document.getElementsByClassName('pdf-page');

    for (let i = 0; i < backgrounds.length; i++) {
        backgrounds[i].style.backgroundColor = 'var(--r-background-color)';
        backgrounds[i].appendChild(octocornLogo.cloneNode(true));
        backgrounds[i].appendChild(linuxButtons.cloneNode(true));
    }
}

/**
 * Adds icons to the page
 */
function appendLogos() {
    const application = document.querySelector('[role="application"]');
    application.appendChild(octocornLogo);
    application.appendChild(linuxButtons);
}

addLinuxButtons();
/**
 * Main function
 * We need to wait for the page to load before we can interact with it
 * The LinuxButton needs to be added to the page before we can append it to the PDF slides
 */
setTimeout(() => {
    injectCss();
    addFavIcon();
    appendBackgroundClassToSlides();
    appendStyleAndLogosToPdfSlides();
    appendLogos();
}, 1000)

