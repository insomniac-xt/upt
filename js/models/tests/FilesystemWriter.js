/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'FilesystemWriter';

    app[appName] = app.BaseTest.extend({

        defaults: {
            title: appName,
            completed: false,
            permissionRequired: true
        },

        data: {
            spheres: {
                direct: ['SOCIAL'],
                indirect: ['PRIVATE']
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

            this.runSimpleTest(Modernizr.filesystem);


		}


	});

    app.events.publish('processTest', [app[appName]]);

})();
