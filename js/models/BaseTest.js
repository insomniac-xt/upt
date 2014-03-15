/*global Backbone */
var app = app || {};

/**
 * Wrap the BaseTest to prevent any namespace collisions and create a protected class
 * @requires jQuery, underscore, Backbone
 * */
(function () {
	'use strict';

	app.BaseTest = Backbone.Model.extend({

		defaults: {
			title: 'BaseTest',
			completed: false
		},

        riskEstimator: null,

        /*** ONLY DEFAULT BEHAVIOUR IS TESTED! */
        supported: false,
        management: false,
        strictPolicy: false,
        riskLevel: 'GREY',
        platform: 'desktop',

        userAgentFallback: {
            strictPolicy: false,
            simpleManagement: false
        },

        /**
         * data object containing all relevant data for current API
         * */
        data: {
            spheres: {
                direct: ['PRIVATE', 'SOCIAL']
            },

            /**
             * Defines standard user agent behaviour for any version
             * */
            userAgentsApiDetails : {
                BROWSERNAME: {
                    desktop: {
                        all: {
                            strictPolicy: true,
                            simpleManagement: true
                        },
                        '25': {
                            strictPolicy: true,
                            simpleManagement: true
                        },
                        '30': {
                            strictPolicy: true,
                            simpleManagement: true
                        }
                    },
                    mobile: {
                        strictPolicy: false,
                        simpleManagement: false
                    }
                }
            }
        },

        currentPoints: 0,
        basePoints: 0,

        /**
         * Initialize with a reference to RiskEstimator, @see app.riskEstimator
         * @param {object} options contains {object} RiskEstimator
         */
        initialize: function(options) {
            this.riskEstimator = options.riskEstimator || app.riskEstimator;
        },

        /**
         * The main run method of a test and will be overridden in each test individually.
         */
		run: function () {
            this.supported = false;
            this.management = false;
            this.strictPolicy = false;
            this.riskLevel = 'GREY';
            this.defaults.completed = false;
			console.log('Base test running');
		},

        /**
         * A simple test with a condition whether the test was successful or not. After calculating
         * points for this API, publishes (informs) all listeners about it and passes all relevant data
         * to listeners.
         * @param {boolean} statement true, if the test was successful, ergo API is supported
         */
        runSimpleTest: function(statement){
            if(statement) {
                this.evaluateAPITest();
            }
            /* Trigger manually a view update */
            this.trigger('change');
            app.events.publish('testEnded', [this.defaults.title, this.currentPoints, this.supported, this.riskData, this.basePoints]);
        },

        /**
         * Determine which user agent object is relevant
         * @param {string} userAgentName user agent name
         * @param {string} userAgentPlatform user agent platform
         * @param {string} userAgentVersion user agent version
         * @return {object} user agent object
         */
        getMatchingVersionData: function(userAgentName, userAgentPlatform, userAgentVersion){

            /* Get user agent data from own data object */
            var userAgentData = this.data.userAgentsApiDetails[userAgentName];
            /* Unknown or undefined user agent – use fallback */
            if(!userAgentData) {
                return this.userAgentFallback;
            }

            /* Get platform specific data or fallback */
            var platform = userAgentData[userAgentPlatform];
            if(!platform) {
                return userAgentData['any'] || this.userAgentFallback;
            } else {
                userAgentData = platform;
            }

            /* Set a matching user agent version or latest */
            var matchingVersion = userAgentVersion == 'unknown' ? 9999 : userAgentVersion;

            var lastLeastKey = 0;

            /* Pin down the matching user agent specific data from data object */
            for(var key in userAgentData){
                if (userAgentData.hasOwnProperty(key)) {
                    key = parseFloat(key);
                    if(!isNaN(key) && matchingVersion <= key && (!lastLeastKey || key < lastLeastKey)){
                        lastLeastKey = key;
                    }
                }
            }
            if(lastLeastKey >= matchingVersion) {
                matchingVersion = lastLeastKey;
            }

            /* If all fails – we need more data! until then, let's use the default */
            return userAgentData[matchingVersion] || userAgentData['all'];

        },

        /**
         * Evaluate the test. Set all relevant properties and data for further processing by the view and UPTModel.
         */

        evaluateAPITest: function(){

            var userAgentData = this.getMatchingVersionData(app.userAgent.name, app.userAgent.platform, app.userAgent.version);

            this.supported = true;
            this.strictPolicy = userAgentData.strictPolicy || false;
            this.management = userAgentData.simpleManagement || false;

            this.basePoints = this.riskEstimator.getBaseScoreForApi(this.data);
            this.riskData = this.riskEstimator.getRiskScore(this.data, userAgentData);

            this.riskLevel = this.riskData.riskData.directColor || this.riskData.riskData.color;
            this.currentPoints += this.riskData.totalScore;
        }

	});
})();
