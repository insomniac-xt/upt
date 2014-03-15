var app = app || {};
app.utils = {};

/**
 * Utility object to inject scripts into the DOM.
 * @requires jQuery
 * @param {string} scriptName name of the script to be injected
 */
app.utils.insertScript = function (scriptName) {

    var s = document.createElement("script");
    s.src = app.JS_BASE_URI + scriptName + '.js';
    $("head").append(s);
};
