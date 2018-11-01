/**
 * @file App ViewModel - File that exports App ViewModel and template
 * @author Abhishek Mukherjee
 */

$ = jQuery = require('jquery');

var ko = require('knockout'),
  appViewTemplate = require('./app.view.html');

function appViewModel() {
  var vm = this;

  vm.tagsTextArea = ko.observable("");
  vm.allTagsText = ko.observable("");
  vm.tagsList = ko.observableArray([]);
  vm.showModal = ko.observable(false);

  vm.showEditModel = function () {
    var tagLabelList = [];
    for (var index = 0; index < vm.tagsList().length; index++) {
      var tagLabel = vm.tagsList()[index].tagLabel;
      tagLabelList.push(tagLabel);
    }
    vm.allTagsText(tagLabelList.join(','));
    vm.showModal(true);
  };

  vm.addTagsFromText = function () {
    setTagsFromText(vm.tagsTextArea);
  };

  vm.saveTagsFromText = function () {
    if (vm.tagsList().length) {
      setTagsFromText(vm.allTagsText, true);
    }
    vm.showModal(false);
  };

  function setTagsFromText(tagsText, resetArray) {
    var tagsArray = tagsText().split(/[,\n;\r]/g);
    tagsText('');

    if (resetArray) {
      vm.tagsList.removeAll();
    }

    for (var index = 0; index < tagsArray.length; index++) {
      var tag = parseInt(tagsArray[index].trim());
      if (tag !== '' && !isNaN(tag)) {
        vm.tagsList.push({
          tagLabel: tag,
          tagColor: tag >= 0 ? 'redTag' : 'blueTag',
          deleteTag: function (tagIndex) {
            return function () {
              var tagLabel = vm.tagsList()[tagIndex()].tagLabel;
              if (confirm("Do you want to delete the tag with label '" + tagLabel + "'")) {
                vm.tagsList.splice(tagIndex(), 1);
              }
            }
          }
        });
      }
    }
  }
}

module.exports = {
  viewModel: appViewModel,
  template: appViewTemplate
};