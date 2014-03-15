
var app = app || {};

/**
 * RiskEstimator Class
 * @requires underscore as a helper for array sorting and iteration
 * @returns {object} global API
 */
app.riskEstimator = (function() {

    "use strict";

    /**
     * RiskEstimator Constructor
     * @param {object} config configuration
     */
    var RiskEstimator = function(config) {

        this.config = config;

        /**
         * Determines given attackers (primary or secondary) interest in the given sphere
         * @param {string} attacker attacker name, e.g. IG for Information Gatherer
         * @param {string} sphere name, e.g. PRIVATE
         * @returns {number} attackers interest factor, e.g. 0.5 - attacker is not present
         *          in this sphere, 0.5 - secondary interest, 1 - primary interest
         */
        this.attackerInterestFactorInSphere = function(attacker, sphere) {

            if(!this.config.attackers[attacker]) {
                console.warn('Unknown Attacker '+ attacker);
                return 0;
            }

            var primaryInterest =  _.contains(this.config.attackers[attacker].primarySpheres, sphere);
            var secondaryInterest =  _.contains(this.config.attackers[attacker].secondarySpheres, sphere);

            if(primaryInterest) {
                return this.config.attackerInterestFactor.primary;
            }

            if(secondaryInterest) {
                return this.config.attackerInterestFactor.secondary;
            }

            return 0;
        };

        /**
         * Returns default factors for strict policy and management
         * @param {object} userAgent contains current user agent's strict policy and management values
         * @returns {object} factors for strict policy and management for given user agent
         *
         */
        this.getUserAgentFactors = function(userAgent) {

            /* If no user agent given, use default values */
            if(!userAgent){
                userAgent = this.config.userAgentDefaults;
            }

            return {
                factorPolicy: userAgent.strictPolicy ? 0 : this.config.scoreFactors.strictPolicy,
                factorManagement: userAgent.simpleManagement ? 0 : this.config.scoreFactors.simpleManagement
            }

        };

        /**
         * Calculates the risk score for a given sphere and factors
         * @param {string} sphere name, e.g. PRIVATE
         * @param {number} factorPolicy factor for strict policy, e.g. 0 or 0.5
         * @param {number} factorManagement factor for management, e.g. 0 or 0.25
         * @returns {number} total score
         */
        this.getRiskScoreForAPiInSphere = function(sphere, factorPolicy, factorManagement) {

            var scoreForSphere = this.config.baseRisks[sphere].score;
            return scoreForSphere + (scoreForSphere * factorPolicy) + (scoreForSphere * factorManagement);
        };

        /**
         * Determines which attackers are present in the given sphere
         * @param {array} spheres a list of spheres, e.g. ['PRIVATE', 'SOCIAL']
         * @returns {array} an array containing all interested attackers
         */
        this.getInterestedAttackersForSpheres = function(spheres) {

            var attackers = [];

            for(var i = 0; i < spheres.length; i++) {
                /* For each attacker, check if current sphere is present in his primary or secondary interests */
                _.each(this.config.attackers, function(val, key) {
                    if(_.contains(val.primarySpheres, spheres[i]) || _.contains(val.secondarySpheres, spheres[i])) {
                        attackers.push(key);
                    }
                });
            }

            return _.uniq(attackers);
        };

        /**
         * Calculates the highest risk sphere from given spheres and returns the corresponding object representing sphere data
         * @param {array} spheres a list of spheres, e.g. ['PRIVATE', 'SOCIAL']
         * @returns {object} contains the correct sphere object @see app.estimatorConfiguration.baseRisks
         */
        this.getHighestRisk = function(spheres) {

            var sphere = null;
            var highestRiskData = null;

            /* Determine the sphere with the highest risk score */
            for(var i = 0; i < spheres.length; i++) {
                sphere = this.config.baseRisks[spheres[i]];
                if(!highestRiskData || sphere.score > highestRiskData.score){
                    highestRiskData = this.config.baseRisks[spheres[i]];
                }
            }

            return _.extend({}, highestRiskData);

        };


        /**
         * Calculates the the total risk score for a given sphere considering the user agent factors
         * @param {object} data contains sphere data @see BaseTest.data
         * @param {object} userAgentFactors user agent factors, {boolean} strictPolicy and {boolean} management
         * @returns {object} total score and risk data, score and color
         */
        this.totalRiskScoreForSphere = function(data, userAgentFactors) {

            userAgentFactors = this.getUserAgentFactors(userAgentFactors);
            var directScore = 0;
            var inDirectScore = 0;
            var highestBaseRisk = null;

            /* Calculate score and highest risk in directly affected spheres */
            if(data.spheres.direct && data.spheres.direct.length) {
                directScore = this.getRiskScore(data.spheres.direct, userAgentFactors);
                highestBaseRisk = this.getHighestRisk(data.spheres.direct);
            }

            /* Calculate score and highest risk in indirectly affected spheres */
            if(data.spheres.indirect && data.spheres.indirect.length) {
                inDirectScore = this.getRiskScore(data.spheres.indirect, userAgentFactors);
                /* Object is empty, if no direct sphere is affected, set the color to default color
                 * and use the highest risk of indirect */
                if(!highestBaseRisk) {
                    highestBaseRisk = this.getHighestRisk(data.spheres.indirect);
                    highestBaseRisk.directColor = this.config.defaultColor;
                }
            }

            return {
                        totalScore: Math.round(directScore * this.config.scoreFactors.directRisk + inDirectScore * this.config.scoreFactors.indirectRisk),
                        riskData: highestBaseRisk
                   }
        };

        /**
         * Calculates the the total risk score for given spheres considering the user agent factors
         * @param {array} spheres contains sphere names
         * @param {object} userAgentFactors user agent factors, factors are calculated: 0 || 0.25 || 0.5
         * @returns {number} total score
         */
        this.getRiskScore = function(spheres, userAgentFactors) {

            var score = 0;
            var interests = null;

            /* For each affected sphere, do following steps */
            for(var i = 0; i < spheres.length; i++) {
                /* Determine which attackers are interested in these spheres */
                interests = this.getInterestedAttackersForSpheres(spheres);
                /* For each interested attacker in this sphere, do following steps */
                for(var j = 0; j < interests.length; j++) {
                    /* Calculate the risk score for this sphere considering user agent factors and multiply it with attackers
                     * primary/secondary interest factor
                     * */
                    score += this.getRiskScoreForAPiInSphere( spheres[i], userAgentFactors.factorPolicy, userAgentFactors.factorManagement ) *
                             this.attackerInterestFactorInSphere(interests[j], spheres[i]);
                }
            }

            return score;
        };

        /**
         * Calculates the the total risk score for a given API under ideal conditions
         * @param {object} data API relevant data @see BaseTest.data
         * @returns {object} total score and risk data, score and color
         */
        this.getBaseRiskScoreForApi = function(data) {

            var factors = {
                strictPolicy : true,
                simpleManagement : true
            };

            return this.totalRiskScoreForSphere(data, factors);
        }

    };

    var riskEstimator = null;


    /** Public API */
    return {
        init: function(config){
            riskEstimator = new RiskEstimator(config);
        },
        getRiskScore: function(data, userAgentData){
            return riskEstimator.totalRiskScoreForSphere(data, userAgentData);
        },
        getBaseScoreForApi: function(data){
            return riskEstimator.getBaseRiskScoreForApi(data).totalScore;
        }
    };

})();
