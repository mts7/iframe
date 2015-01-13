/**
 * Get the contents of the specified iframe
 * @param selector Object|String jQuery object or selector string
 * @returns string
 * @author Mike Rodarte
 */
function getIframeContents(selector) {
    var $iframe = null;
    if (typeof selector == 'string' && selector.length > 0) {
        $iframe = $(selector);
    } else if (typeof selector == 'object') {
        $iframe = selector;
    } else {
        // this only accepts a string or object, so return an empty string if parameters are invalid
        return '';
    }

    return $($($iframe.contents()[0].body).contents().find('body').context).html();
}
