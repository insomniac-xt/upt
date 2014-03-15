


var app = app || {};

app.BASEURI = 'http://localhost/';
app.JS_BASE_URI = app.BASEURI + 'js/models/tests/';
app.BACKEND_DATA_SUBMIT_URI = app.BASEURI + 'php/submitResult.php';


app.estimatorConfiguration = {

    baseRisks : {

        INTIMATE: {
            score: 16,
            color: 'RED'
        },
        PRIVATE: {
            score: 8,
            color: 'ORANGE'
        },
        SOCIAL: {
            score: 4,
            color: 'YELLOW'
        },
        ENV: {
            score: 2,
            color: 'GREY'
        }
    },

    defaultColor: 'GREY',

    scoreFactors : {
        strictPolicy: 0.5,
        simpleManagement: 0.25,
        directRisk: 1,
        indirectRisk: 0.5
    },

    attackerInterestFactor : {
        primary: 1,
        secondary: 0.5
    },

    attackers : {

        IND: {
            primarySpheres: ['PRIVATE'],
            secondarySpheres: ['INTIMATE']
        },
        IG: {
            primarySpheres: ['PRIVATE'],
            secondarySpheres: ['SOCIAL']
        },
        NSA: {
            primarySpheres: ['PRIVATE', 'SOCIAL', 'ENV'],
            secondarySpheres: ['INTIMATE']
        }
    },

    userAgentDefaults: {
        strictPolicy: false,
        simpleManagement: false
    }

};

/** List of all tests, which need to be executed */
app.allTests = [
    'GeoLocation','WebStorage', 'IndexedDB', 'MediaCapture', 'WebRTC', 'CORS', 'Webmessages', 'FileReader',
    'FilesystemWriter', 'AppCache', 'WebSocket', 'History','WebNotifications','OrientationMotion', 'Battery', 'NavigationTiming',
    'NetworkInformation', 'FullScreen', 'DragAndDrop', 'requestAnimationFrame','PageVisibility', 'Proximity', 'SVG',
    'WebWorker', 'CustomContentHandler', 'CustomProtocolHandler', 'WebCryptography', 'SeamlessIframe', 'AutoComplete', 'LinkPrefetching', 'WebGL'
];

