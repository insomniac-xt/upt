var app = app || {};

/**
 * UserAgent Class to determine the browser.
 * User agent string isn't so reliable and should be generally used for feature detection.
 * @author Selim Achmerzaev
 */
app.userAgent = (function() {

    "use strict";

    /** BrowserDetect initially created by quirksmode.org and extended in this object */
    var BrowserDetect = {

        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "unknown";
            this.OS = this.searchString(this.dataOS) || "other";
            this.platform = this.platforms[this.OS] || "other";
        },

        searchString: function (data) {
            for (var i=0; i < data.length; i++) {
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1) {
                        return data[i].identity;
                    }
                }
                else if (dataProp) {
                    return data[i].identity;
                }

            }
        },

        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) {
                return;
            }
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        },

        /* Known browsers with their respective names and how to determine the Version string */
        dataBrowser: [
            {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            {
                prop: window.opera,
                identity: "Opera",
                versionSearch: "Version"
            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "MSIE",
                versionSearch: "MSIE"
            },{
                string: navigator.userAgent,
                subString: "Trident",
                identity: "MSIE",
                versionSearch: " rv"
            },
            {
                string: navigator.userAgent,
                subString: "Android",
                identity: "Android"
            }
        ],

        dataOS : [
            {
                string: navigator.platform,
                subString: "Win",
                identity: "Windows"
            },
            {
                string: navigator.userAgent,
                subString: "iPhone",
                identity: "iPhone"
            },
            {
                string: navigator.userAgent,
                subString: "iPad",
                identity: "iOS"
            },
            {
                string: navigator.platform,
                subString: "Mac",
                identity: "Mac"
            },
            {
                string: navigator.userAgent,
                subString: "Android",
                identity: "Android"
            },
            {
                string: navigator.platform,
                subString: "Linux",
                identity: "Linux"
            }
        ],

        platforms: {
            Windows: 'desktop',
            Linux: 'desktop',
            Mac: 'desktop',
            Android: 'mobile',
            iOS: 'mobile'
        }

    };

    BrowserDetect.init();

    /** UserAgent Object,
     * created and cached for all feature requests
     * */
    var userAgent = {
        name: BrowserDetect.browser,
        version: BrowserDetect.version,
        OS: BrowserDetect.OS,
        platform: BrowserDetect.platform
    };


    /** Public API */
    return {
        getUserAgent: function(){
            return userAgent;
        },
        name: userAgent.name,
        version: userAgent.version,
        OS: userAgent.OS,
        platform: userAgent.platform
    };

})();

