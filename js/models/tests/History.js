/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'History';

	app[appName] = app.BaseTest.extend({
		defaults: {
			title: appName,
			completed: false,
            permissionRequired: false
		},

        data: {
            spheres: {
                direct: [],
                indirect: ['SOCIAL', 'PRIVATE']
            },

            userAgentsApiDetails : {
                Chrome: {
                    any: {
                        strictPolicy: false,
                        simpleManagement: false
                    }
                },
                Firefox: {
                    any: {
                        strictPolicy: false,
                        simpleManagement: false
                    }
                },
                Safari: {
                    any: {
                        strictPolicy: false,
                        simpleManagement: false
                    }
                },
                MSIE: {
                    any: {
                        strictPolicy: false,
                        simpleManagement: false
                    }
                }
            }
        },

		run: function () {

            this.runSimpleTest(Modernizr.history);
		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
