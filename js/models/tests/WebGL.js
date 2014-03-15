/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'WebGL';

	app[appName] = app.BaseTest.extend({

		defaults: {
			title: appName,
			completed: false,
            permissionRequired: true
		},

        data: {
            spheres: {
                direct: [],
                indirect: ['PRIVATE']
            },

            userAgentsApiDetails : {
                Chrome: {
                    any: {
                        strictPolicy: true,
                        simpleManagement: false
                    }
                },
                Firefox: {
                    any: {
                        strictPolicy: true,
                        simpleManagement: false
                    }
                },
                Safari: {
                    any: {
                        strictPolicy: true,
                        simpleManagement: false
                    }
                },
                MSIE: {
                    any: {
                        strictPolicy: true,
                        simpleManagement: false
                    }
                }
            }
        },

		run: function () {

            this.runSimpleTest(Modernizr.webgl);

		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
