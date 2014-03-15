/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'AutoComplete';

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
                    any: {
                        strictPolicy: false,
                        simpleManagement: true
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

                },
                Safari: {
                    any: {
                        strictPolicy: true,
                        simpleManagement: true
                    }
                },
                MSIE: {
                    any: {
                        strictPolicy: true,
                        simpleManagement: true
                    }
                }
            }
        },


        run: function () {

            this.runSimpleTest(Modernizr.input.autocomplete);

		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
