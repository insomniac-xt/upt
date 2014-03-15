/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'DragAndDrop';

	app[appName] = app.BaseTest.extend({

		defaults: {
			title: appName,
			completed: false,
            permissionRequired: true
		},

        data: {
            name: 'drag',

            spheres: {
                direct: ['PRIVATE', 'SOCIAL'],
                indirect: []
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
                        strictPolicy: false,
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

			this.runSimpleTest(Modernizr.draganddrop);
		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
