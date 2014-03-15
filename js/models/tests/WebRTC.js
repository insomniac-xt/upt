/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'WebRTC';

	app[appName] = app.BaseTest.extend({

		defaults: {
			title: appName,
			completed: false,
            permissionRequired: true
		},

        data: {
            spheres: {
                direct: ['SOCIAL', 'ENV'],
                indirect: ['INTIMATE', 'PRIVATE']
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

        /** Current version of Modernizr does not support WebRTC yet. We extend Modernizr with this new test. */
        addFeatureDetect: function(){

            if(typeof Modernizr.peerconnectiond === "undefined") {
                Modernizr.addTest('peerconnection', !!Modernizr.prefixed('RTCPeerConnection', window));
            }
        },

		run: function () {

            this.addFeatureDetect();
            this.runSimpleTest(Modernizr.peerconnection);

		}
	});

    app.events.publish('processTest', [app[appName]]);

})();
