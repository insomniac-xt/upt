/*global Backbone */
var app = app || {};

(function () {
	'use strict';

    var appName = 'GeoLocation';

    app[appName] = app.BaseTest.extend({

        defaults: {
            title: appName,
            completed: false,
            permissionRequired: false
        },

        data: {
            spheres: {
                direct: ['SOCIAL'],
                indirect: ['PRIVATE']
            },

            userAgentsApiDetails : {
                Chrome: {
                    desktop: {
                        all: {
                            strictPolicy: false,
                            simpleManagement: true
                        }

                    },
                    mobile: {
                        all:{
                            strictPolicy: false,
                            simpleManagement: false
                        }
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
                    desktop: {
                        all: {
                            strictPolicy: true,
                            simpleManagement: true
                        }

                    },
                    mobile: {
                        all: {
                            strictPolicy: false,
                            simpleManagement: false
                        }
                    }
                },
                MSIE: {
                    desktop: {
                        all:{
                            strictPolicy: false,
                            simpleManagement: true
                        }
                    },
                    mobile: {
                        all:{
                            strictPolicy: false,
                            simpleManagement: false
                        }
                    }
                }
            }
        },

		run: function () {

            this.runSimpleTest(Modernizr.geolocation);

		}

	});

    app.events.publish('processTest', [app[appName]]);

})();
