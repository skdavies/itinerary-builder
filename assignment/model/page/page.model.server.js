module.exports = function () {

  var api = {
    createPage: createPage,
    findAllPagesForWebsite: findAllPagesForWebsite,
    findPageById: findPageById,
    updatePage: updatePage,
    deletePage: deletePage,
    reorderWidgets: reorderWidgets
  };

  var mongoose = require('mongoose');
  mongoose.Promise = require('q').Promise;

  var PageSchema = require('./page.schema.server')();
  var PageModel = mongoose.model('PageModel', PageSchema);

  return api;

  function createPage(websiteId, page) {
    page._website = websiteId;
    return PageModel.create(page);
  }

  function findAllPagesForWebsite(websiteId) {
    return PageModel.find({ _website: websiteId });
  }

  function findPageById(pageId) {
    return PageModel.findById(pageId).populate('widgets');
  }

  function updatePage(pageId, page) {
    return PageModel.findOneAndUpdate({ _id: pageId }, { $set: page });
  }

  function deletePage(pageId) {
    return PageModel.findOneAndRemove({ _id: pageId });
  }

  function reorderWidgets(pageId, start, end) {
    return PageModel.findById(pageId).then(function (page) {
      page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
      page.markModified('widgets');
      page.save();
    });
  }
};