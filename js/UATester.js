/*global $ */
/*jshint unused:false */
var app = app || {};


/**
 * Bootstrap Function which executes automatically.
 * Initializes the @see app.riskEstimator and adds Tests
 * to DOM
 * @requires underscore
 * @requires jQuery
 * @requires Backbone
 */
(function () {
	'use strict';

    /* Prevent jQuery from cache busting our scripts */
    $.ajaxPrefilter('script', function(options) {
        options.cache = true;
    });

    /* Initialize the RiskEstimator with estimator configuration */
    app.riskEstimator.init(app.estimatorConfiguration);

    /**
     * Subscribes to a 'processTests' publish event. Initializes a UPTModel with a collection
     * of Tests and passes it to a UPTView instance. Afterwards injects all test scripts
     * into DOM.
     * @param {array} allTests all test names
     */
    app.events.subscribe('processTests', function(allTests){

        app.instance = new app.UPTView({model: new app.UPTModel({allTests: allTests})});

        /* iterate through the array and inject each element (script name) */
        _.each(allTests, function(val){
            app.utils.insertScript(val)
        });
    });

	// kick things off by processing tests
    app.events.publish('processTests', [app.allTests]);

})();
