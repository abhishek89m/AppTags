/**
 * @file Main App - File with ko binding
 * @author Abhishek Mukherjee
 */

var ko = require('knockout');
var appViewModel = require('./app.viewmodel.js');

// Registering app view as a component
ko.components.register('app-view', appViewModel);

// Using ko bind for initiating
ko.applyBindings({});