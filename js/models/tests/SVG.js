/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'SVG';

	app[appName] = app.BaseTest.extend({
		defaults: {
			title: appName,
			completed: false
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
                            simpleManagement: false
                        }
                    },
                    mobile: {
                        all: {
                            strictPolicy: true,
                            simpleManagement: false
                        }
                    }
                },
                Firefox: {
                    desktop: {
                        all: {
                            strictPolicy: false,
                            simpleManagement: false
                        }
                    },
                    mobile: {
                        all: {
                            strictPolicy: true,
                            simpleManagement: false
                        }
                    }
                },
                Safari: {
                    desktop: {
                        all: {
                            strictPolicy: false,
                            simpleManagement: false
                        }
                    },
                    mobile: {
                        all: {
                            strictPolicy: true,
                            simpleManagement: false
                        }
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

			this.runSimpleTest(Modernizr.svg);
		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
