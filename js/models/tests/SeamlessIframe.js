/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'SeamlessIframe';

	app[appName] = app.BaseTest.extend({
		defaults: {
			title: appName,
			completed: false
		},

        data: {
            spheres: {
                direct: [],
                indirect: ['SOCIAL', 'PRIVATE']
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

            this.runSimpleTest(Modernizr.seamless);

            // TODO: history polluting

		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
