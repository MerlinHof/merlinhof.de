// Global variables over ALL JS files
var windows = new Array();
var windowHeight = new Array();
var windowWidth = new Array();
var windowX = new Array();
var windowY = new Array();
var fullscreen = new Array();
var windowVisible = new Array();
var elements = new Array();
var dockApps = new Array();
var dockAppsPos = [];
var dockAppsNam = [];
var currentMousePosition = [];

const dockHeight = 80;
const fontSize = 1.5;
var prevHoverI;
var clickedElementID;
var prevClickedElementID;
var animout;

// Center options
const CENTER = 0.01874201;
const CENTEROVER = function(val) {
  return Math.round(val) + 0.01874202;
}

// maintain after fullscreen
var originalWindowX = new Array();
var originalWindowY = new Array();
var originalWindowHeight = new Array();
var originalWindowWidth = new Array();

var focusHierachy = new Array();
var smartInvert = false;

var textInputFocus;
var cursorPosition = 0;
var cursorVisible;
var inputtext = new Array();
var isSingleline = [];

var seekbarProgress = [];
var seekbarIsCurrentlyDragged = false;
var prevSeek;

var cursorOn = true;
var skipNextBlink = false;

var hintWidth = 300;
var hintX;
var hintY;

var windowCalled = [];
for (var i = 0; i < 100; i++) {
    windowCalled.push(false);
}

const frameCount = 15;
var browserIsInFullscreen = true;
var checkboxstate = [];

const versionCode = 0.87;
const versionName = 'Beta';
const lastUpdateDate = '29.03.2020';
const changelog = `
- Improved UI and UX##
- Added highlighting system##
- New text cursor##
- Improved API's##
- ...
`;

var fileLocator = {
    "root": {
        "system": {
            "test1": {
                "insidetest": {

                }
            }
        },

        "user": {
            "pictures": {
                "001.png": "loc",
                "002.png": "loc",
                "003.png": "loc",
                "004.png": "loc",

                "005.png": "loc",
                "006.png": "loc",
                "007.png": "loc",
                "008.png": "loc",
                "009.png": "loc"
            },
            "videos": {
                "vid": "loc",
                "002.mp4": "loc",
                "trump.mp4": "loc"
            },
            "documents": {
                "manual.doc": "This is the manual for intentOS####In intentOS, many unseful apps are preinstalled. For example Finder to manage your files or graphs to draw functions.",
                "info.doc": "Hey, my name is Merlin Hof and I created intentOS!",
                "corona.doc": "Stay at home!"
            },
            "music": {
                "001.mp3": "loc",
                "002.mp3": "loc",
                "003.mp3": "loc"
            },
            "desktop": {
                "file1.lel": "loc",
                "file2.lol": "loc",
                "geilx.lel": "loc",
                "nice.png": "loc",
                "wtf02.png": "loc",
                "deineMudda.png": "loc",
                "daaamn.xyz": "loc",
                "urlaub.fol": "loc",
                "apple.png": "loc"

            }
        },

        "library": {
            "documents": {

            }
        },

        "programs": {
            "finder": {

            }
        }
    }
};


// console.trace('%c This traces an function', 'color: orange; font-weight: bold;');
