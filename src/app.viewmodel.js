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
  vm.tagsList = ko.observableArray(getTagsListFromCache());
  vm.showModal = ko.observable(false);

  vm.showEditModal = function () {
    if (vm.tagsList().length) {
      var tagLabelList = [];
      for (var index = 0; index < vm.tagsList().length; index++) {
        var tagLabel = vm.tagsList()[index].tagLabel;
        tagLabelList.push(tagLabel);
      }
      vm.allTagsText(tagLabelList.join(','));
      vm.showModal(true);
    }
  };

  vm.addTagsFromText = function () {
    setTagsFromText(vm.tagsTextArea);
  };

  vm.saveTagsFromText = function () {
    setTagsFromText(vm.allTagsText, true);
    vm.showModal(false);
  };

  vm.deleteTag = function (tagIndex) {
    return function () {
      var tagLabel = vm.tagsList()[tagIndex()].tagLabel;
      if (confirm("Do you want to delete the tag with label '" + tagLabel + "'")) {
        vm.tagsList.splice(tagIndex(), 1);
      }
    }
  };

  vm.tagsList.subscribe(function (newTagsList) {
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem("tagsList", JSON.stringify(vm.tagsList()));
    } else {
      console.info("Unable to save tags in localstorage as the browser doesn't support it");
    }
  });

  function getTagsListFromCache() {
    var tagsList = [];
    if (typeof (Storage) !== "undefined") {
      tagsList = localStorage.getItem("tagsList") ? JSON.parse(localStorage.getItem("tagsList")) : [];
    } else {
      console.info("Unable to save tags in localstorage as the browser doesn't support it");
    }
    return tagsList;
  }

  function setTagsFromText(tagsText, resetArray) {
    var tagsArray = tagsText().split(/[,\n;\r]/g);
    tagsText('');

    if (resetArray) {
      vm.tagsList.removeAll();
    }

    for (var index = 0; index < tagsArray.length; index++) {

      var tag = parseInt(tagsArray[index].trim());
      var filteredTagList = [];

      if (tag !== '' && !isNaN(tag)) {

        filteredTagList = ko.utils.arrayFilter(vm.tagsList(), function (tagO) {
          return tagO.tagLabel == tag;
        });

        // Pushing only if tag is unique.
        if (filteredTagList.length === 0) {
          vm.tagsList.push({
            tagLabel: tag,
            tagColor: tag >= 0 ? 'redTag' : 'blueTag'
          });
        }
      }
    }
  }
}

module.exports = {
  viewModel: appViewModel,
  template: appViewTemplate
};