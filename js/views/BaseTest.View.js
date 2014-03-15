/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	app.BaseTestView = Backbone.View.extend({

		tagName:  'li',
        className: 'testView',

		template: _.template($('#item-template').html()),

        /* TODO: Add user interaction later */
		events: {

		},

        /**
         * Initialize. Update the view if model changes.
         * Call the run method on the model so the actual test is executed
         */
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
            this.model.run();
		},

		/** Re-render. Inject all needed data into the template */
		render: function () {
            this.$el.addClass(this.model.supported ? this.model.riskLevel : 'inactive');
			this.$el.html(this.template({
                title: this.model.defaults.title,
                riskLevel: this.model.riskLevel,
                basePoints: this.model.basePoints,
                yourPoints: this.model.currentPoints,
                supported: this.model.supported,
                strictPolicy: this.model.strictPolicy,
                management: this.model.management}));
			return this;
		}
	});
})(jQuery);
