/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'CustomContentHandler';

	app[appName] = app.BaseTest.extend({
		defaults: {
			title: appName,
			completed: false
		},

        data: {
            spheres: {
                direct: ['PRIVATE', 'SOCIAL'],
                indirect: []
            },

            userAgentsApiDetails : {
                Chrome: {
                    any: {
                        strictPolicy: true,
                        simpleManagement: true
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

        /** Current version of Modernizr does not support WebRTC yet. We extend Modernizr with this new test. */
        addFeatureDetect: function(){

            if(typeof Modernizr.customcontenthandler === "undefined") {
                Modernizr.addTest("customcontenthandler",function(){return!!navigator.registerContentHandler})
            }

        },

		run: function () {

            this.addFeatureDetect();

            this.runSimpleTest(Modernizr.customcontenthandler);
		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
