
var app = app || {};

/**
 * Custom implementation of a publish/subscribe design pattern
 */
app.events = (function() {

    "use strict";

    /**
     * Event manager Object containing currently observed topics
     */
    function EventManager() {
        this.observedTopics = {};
    }

    /**
     * A publish event. Applies the arguments to all relevant and subscribing callbacks (listeners)
     * @param {string} topic name
     * @param {array} args arguments that need to be passed to all subscribers
     */
    EventManager.prototype.publish = function(topic, args){

        if(!this.observedTopics[topic]) {
            return;
        }

        for(var i= 0, len = this.observedTopics[topic].length; i < len; i++) {
            this.observedTopics[topic][i].apply(this, args || []);
        }
    };

    /**
     * A subscribe event. Every listener subscribes for a specific topic with his callback method
     * @param {string} topic name
     * @param {function} callback function of a subscriber
     */
    EventManager.prototype.subscribe = function(topic, callback){

        if(!this.observedTopics[topic]){
            this.observedTopics[topic] = [];
        }
        this.observedTopics[topic].push(callback);
        return [topic, callback];
    };

    /**
     * Unsubscribe from a given topic
     * @param {string} topic name
     * @param {function} callback function of a subscriber that needs to be removed
     */
    EventManager.prototype.unsubscribe = function(topic, callback){

        if(!this.observedTopics[topic]) {
            return false;
        }
        for(var i= 0, len = this.observedTopics[topic].length; i < len; i++) {
            if(this.observedTopics[topic][i] == callback){
                this.observedTopics[topic].splice(i, 1);
            }
        }
    };

    var EManager = new EventManager();

    /** Public API */
    return {
        publish : function(topic, args){
            return EManager.publish(topic, args);
        },
        subscribe : function(topic, callback){
            return EManager.subscribe(topic, callback);
        },
        unsubscribe : function(topic, callback){
            return EManager.unsubscribe(topic, callback);
        }
    };

})();

