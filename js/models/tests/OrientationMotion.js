/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'OrientationMotion';

	app[appName] = app.BaseTest.extend({

		defaults: {
			title: appName,
			completed: false,
            permissionRequired: true
		},

        data: {
            spheres: {
                direct: ['ENV'],
                indirect: ['SOCIAL']
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

            this.runSimpleTest(Modernizr.deviceorientation || Modernizr.devicemotion);

		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
