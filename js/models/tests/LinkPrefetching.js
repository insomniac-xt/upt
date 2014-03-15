/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'LinkPrefetching';

	app[appName] = app.BaseTest.extend({
		defaults: {
			title: appName,
			completed: false
		},

        data: {
            spheres: {
                direct: ['SOCIAL'],
                indirect: []
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

        /** This test is executed asynchronously. The index. html includes prefetch links and this method
         *  checks after one second if the cookie exists or not. */
		run: function () {
            var self = this;
            window.setTimeout(function(){
                self.runSimpleTest(document.cookie.indexOf('upt_link_prefetch') >= 0);
            }, 1000);

		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
