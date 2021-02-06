console.log('👋 This message is being logged by "renderer.js", included via webpack');

// Import Bootstrap and scss
import 'bootstrap';
import './scss/app.scss';

// Import js files
import './js/custom.js';
import './js/openpgp.js';

// FONTAWESOME
import "@fortawesome/fontawesome-free/js/all";
FontAwesome.config.mutateApproach = 'sync'

// Initialize Stimulus and controllers
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
