/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

/**
 * Wrap the UPTViewController to prevent namespace collisions.
 * @requires jQuery, underscore, Backbone
 * */
(function ($) {
	'use strict';

    /**
     * UPTViewController Class responsible for the wrapping view. This controller also appends
     * each test to DOM and displays data aggregated from all tests
     */
	app.UPTView = Backbone.View.extend({

        /* Private variables */
		el: '#main',
        $points: '#totalPoints',
        $bestPossibleScore: '#bestPossibleScore',
        $testResults: '#testResults',
        totalPoints : 0,
        testResults: {},
        testResultsData: {},
        //testsCount : 0,
        testsProcessedCount : 0,

        uaDataTemplate: _.template($('#uaData-template').html()),

        /**
         * Initialize. Update the view if model changes. Also react to global events, such as
         * 1. a test is finished and 2. process a test
         */
		initialize: function () {

            var self = this;

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'allTestsFinished', this.submitResults);

            this.$points = $(this.$points);
            this.$bestPossibleScore = $(this.$bestPossibleScore);
            this.$testResults = $(this.$testResults);

            /* Inform the model @see app.UPTModel, that a test has finished */
            app.events.subscribe('testEnded', function(testName, points, supported, riskData, basePoints){
                self.model.testEnded(testName, points, supported, riskData, basePoints);
            });

            app.events.subscribe('processTest', function(model){
                self.addTest(model);
            });

            /* Display user agent data */
            $('#userAgentData').append(this.uaDataTemplate({
                name: app.userAgent.name,
                version: app.userAgent.version,
                platform: app.userAgent.platform}));

		},

        /**
         * Re-render the view and display current total points
         */
		render: function (finalState) {

            this.$points.html(this.model.getTotalPoints());
            this.$points[0].className = this.getPointsColor(this.model.bestPossibleScore, this.model.getTotalPoints());
            this.$bestPossibleScore.html(this.model.bestPossibleScore);



            //console.log(this.model.bestPossibleScore)
		},


        getPointsColor: function(bestScore, currentScore){
            var score = currentScore * 100 / bestScore;
            if(score < 110) {
                return 'green';
            }
            if(score < 125) {
                return 'yellow';
            }
            if(score < 150) {
                return 'orange';
            }
            if(score >= 150) {
                return 'red';
            }
        },

        /**
         * TODO: Sorting funcationality
         */
        sortResults: function(filter){

            if(filter === 'highest') {

                /*var blubb = [];

                _.each(this.testResultsData, function(val){
                    blubb.push(val);
                    //val = _(val).sortBy(function(obj) { return parseInt(obj.totalScore, 10) });
                });
                console.log(blubb);
                blubb = _(blubb).sortBy(function(obj) {
                    console.log(obj)
                    return parseInt(obj.totalScore, 10)
                });
                console.log(blubb)
                //this.$testResults.find(); */

                var allTestViews = this.$testResults.find('div.view');
            }
        },

        /**
         * Get the results first and submit them to the backend
         */
        submitResults: function(){

            var self = this;
            var results = this.serializeResults(self.getCompletedTests());

            $.ajax({
                url: app.BACKEND_DATA_SUBMIT_URI,
                type: 'POST',
                data: results
            }).done(function(response){
                    // TODO: react to backend?
                    console.log(response);
            }).fail(function(response){
                console.warn('Failed to submit Data to Server: ');
                console.log(response);
            });
        },

        /**
         * Serialize results from JSON to string
         */
        serializeResults: function(completedTests) {

            return {
                os_system : app.userAgent.OS,
                browsername : app.userAgent.name,
                version : app.userAgent.version,
                points : this.model.getTotalPoints(),
                results : JSON.stringify(completedTests)
            };
        },

        getCompletedTests: function(){
            return this.model.testsCompleted;
        },

        /**
         * Create a new TestView for a given model and append the view to DOM.
         * @param {object} model Model object of the test
         */
        addTest: function(model){

            var view = new app.BaseTestView({model: new model({riskEstimator: app.riskEstimator})});
            this.$testResults.append(view.$el);
        }
	});

})(jQuery);

