/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// TODO Collection
	// ---------------

	var Tests = Backbone.Collection.extend({

		model: app.BaseTest,

        url: '/master-thesis/v2/php/getResults.php',

		completed: function () {
			return this.filter(function (tests) {
				return tests.get('completed');
			});
		},


		remaining: function () {
			return this.without.apply(this, this.completed());
		},


		nextOrder: function () {
			if (!this.length) {
				return 1;
			}
			return this.last().get('order') + 1;
		},


		comparator: function (test) {
			return test.get('order');
		}
	});

    app.PreviousTestResults = new Tests();
})();
