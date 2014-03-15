/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'FullScreen';

	app[appName] = app.BaseTest.extend({
		defaults: {
			title: appName,
			completed: false,
            permissionRequired: true
		},

        data: {
            spheres: {
                direct: [],
                indirect: ['PRIVATE', 'SOCIAL']
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
                        all: {
                            strictPolicy: false,
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
                        strictPolicy: true,
                        simpleManagement: false
                    }
                }
            }
        },

		run: function () {

			this.runSimpleTest(Modernizr.fullscreen);
		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
