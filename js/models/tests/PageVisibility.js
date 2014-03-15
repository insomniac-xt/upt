/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'PageVisibility';

	app[appName] = app.BaseTest.extend({
		defaults: {
			title: appName,
			completed: false
		},

        data: {
            spheres: {
                direct: ['ENV'],
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

        /** Current version of Modernizr does not support WebRTC yet. We extend Modernizr with this new test. */
        addFeatureDetect: function(){

            if(typeof Modernizr.pagevisibility === 'undefined') {
                Modernizr.addTest('pagevisibility', !!Modernizr.prefixed('hidden', document, false));
            }
        },

		run: function () {

            this.addFeatureDetect();
			this.runSimpleTest(Modernizr.pagevisibility);
		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
