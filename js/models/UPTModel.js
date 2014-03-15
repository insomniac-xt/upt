/*global Backbone */
var app = app || {};

/**
 * Wrap the UPTModel to prevent namespace collisions.
 * @requires jQuery, underscore, Backbone
 * */
(function () {
	'use strict';

    /**
     * UPTModel Class which monitors all test results and informs the main view (UPTViewController)
     * when tests are finished
     */
	app.UPTModel = Backbone.Model.extend({

		defaults: {
			title: 'UPTModel'
		},

        testsCompleted: {},
        previousResults: {},

        allTests: [],
        testResultsData: {},

        numberOfTests: 0,
        numberOfSupportedTests: 0,
        testsProcessedCount: 0,

        testsSummary: {},

        /**
         * Sum the total points for each test executed
         */
        sumPoints: function(){
            var self = this;

            this.totalPoints = 0;
            _.each(this.testResultsData, function(val){
                self.totalPoints +=  val.totalScore;
            });

            /* Trigger the change event manually and not on model attribute change!
             * Yes, this is intended. */
            this.trigger('change');
            if(this.allTestsFinished()) {
                this.trigger('allTestsFinished');
            }
        },

        /**
         * Initialize with a list of tests
         * @param {object} options contains {array} allTests with a list of all tests
         */
        initialize: function(options){

            this.set('allTests', options.allTests);
            this.allTests = options.allTests;
            this.numberOfTests = options.allTests.length;
        },

        /**
         * A test has finished. Store the results and calculate current total score.
         */
        testEnded: function(testName, points, supported, riskData) {

            this.testsProcessedCount++;

            /* Include only tests that actually were supported and ignore data from unsupported APIs */
            if(riskData) {
                this.testResultsData[testName] = riskData;
                this.numberOfSupportedTests++;
            }

            /* All tests that completed */
            this.testsCompleted[testName] = {
                supported: supported,
                points: points
            };

            this.sumPoints();
        },

        allTestsFinished: function(){
            return this.testsProcessedCount >= this.numberOfTests;
        },

        getTotalPoints: function(){
            return this.totalPoints;
        }

	});
})();
