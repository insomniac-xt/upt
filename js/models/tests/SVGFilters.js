/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'SVGFilters';

	app[appName] = app.BaseTest.extend({
		defaults: {
			title: appName,
			completed: false,
            permissionRequired: true
		},

        riskLevel: 'ORANGE',
        vendorSpecific: {
            Chrome: {
                strictPolicy: false,
                management: false
            },
            Firefox: {
                strictPolicy: false,
                management: false
            },
            other: {
                strictPolicy: false,
                management: false
            }
        },

		run: function () {

			this.runSimpleTest(Modernizr.svgfilters);
		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
