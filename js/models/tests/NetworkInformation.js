/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'NetworkInformation';

	app[appName] = app.BaseTest.extend({
		defaults: {
			title: appName,
			completed: false
		},

        data: {
            spheres: {
                direct: ['ENV'],
                indirect: []
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

            this.runSimpleTest(Modernizr.connection || Modernizr.prefixed('connection',navigator));

		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
