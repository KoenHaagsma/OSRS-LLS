/**
 * @param  {element} parent
 * @param  {string} html
 * @param  {string} position
 */

function renderElementAndClean(parent, html, position) {
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
    parent.insertAdjacentHTML(position, html);
}

/**
 * @param  {element} parent
 * @param  {string} html
 * @param  {string} position
 */

function renderElement(parent, html, position) {
    parent.insertAdjacentHTML(position, html);
}

/**
 * @param  {element} parent
 */

function cleanElement(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}

export { renderElementAndClean, renderElement, cleanElement };
