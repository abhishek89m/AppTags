/**
 * @file App ViewModel - File that exports App ViewModel and template
 * @author Abhishek Mukherjee
 */

$ = jQuery = require('jquery');

var ko = require('knockout'),
  appViewTemplate = require('./app.view.html');

function appViewModel(data) {
  this.name = data.name;
}

appViewModel.prototype.something = function () {
  console.log('You invoked something() on the viewmodel.');
};

module.exports = {
  viewModel: appViewModel,
  template: appViewTemplate
};