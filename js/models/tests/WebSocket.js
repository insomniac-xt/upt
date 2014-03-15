/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'Websocket';

    app[appName] = app.BaseTest.extend({

        defaults: {
            title: appName,
            completed: false,
            permissionRequired: false
        },

        data: {
            spheres: {
                direct: ['SOCIAL', 'ENV']
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
                        strictPolicy: true,
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
                        strictPolicy: true,
                        simpleManagement: false
                    }
                }
            }
        },

		run: function () {

            this.runSimpleTest(Modernizr.websockets);

		}
	});

    app.events.publish('processTest', [app[appName]]);

})();

