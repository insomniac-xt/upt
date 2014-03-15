/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'WebNotifications';

	app[appName] = app.BaseTest.extend({

		defaults: {
			title: appName,
			completed: false,
            permissionRequired: true
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
                        simpleManagement: true
                    }
                },
                Firefox: {
                    desktop: {
                        all:{
                            strictPolicy: true,
                            simpleManagement: true
                        }
                    },
                    mobile: {
                        all:{
                            strictPolicy: false,
                            simpleManagement: false
                        }
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
			this.runSimpleTest(window.Notification || Modernizr.notification);
		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
