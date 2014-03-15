/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'FileReader';

    app[appName] = app.BaseTest.extend({

        defaults: {
            title: appName,
            completed: false,
            permissionRequired: true
        },

        data: {
            spheres: {
                direct: ['INTIMATE', 'PRIVATE', 'SOCIAL']
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

            this.runSimpleTest(Modernizr.filereader);

        }

	});

    app.events.publish('processTest', [app[appName]]);

})();
