/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'MediaCapture';

	app[appName] = app.BaseTest.extend({

		defaults: {
			title: appName,
			completed: false,
            permissionRequired: true
		},

        data: {
            spheres: {
                direct: ['INTIMATE', 'PRIVATE']
            },

            userAgentsApiDetails : {
                Chrome: {
                    desktop: {
                        all: {
                            strictPolicy: false,
                            simpleManagement: true
                        }

                    },
                    mobile: {
                        all:{
                            strictPolicy: true,
                            simpleManagement: false
                        }
                    }
                },
                Firefox: {
                    desktop: {
                        all: {
                            strictPolicy: true,
                            simpleManagement: true
                        }

                    },
                    mobile: {
                        all: {
                            strictPolicy: true,
                            simpleManagement: false
                        }
                    }
                }
            }
        },

		run: function () {

            this.runSimpleTest(Modernizr.getusermedia);

		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
