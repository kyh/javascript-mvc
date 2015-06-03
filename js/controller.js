var Model = require('./model');
var ListView = require('./views').ListView;
var SelectedView = require('./views').SelectedView;

var Controller = {
  getSelectedCat: function() {
    return Model.selectedCat;
  },

  getAllCats: function(){
    return Model.cats;
  },

  selectCat: function(index){
    Model.selectedCat = Model.cats[index];
    SelectedView.render();
  },

  addCount: function(){
    Model.selectedCat.count++;
    SelectedView.renderCountSelection();
  },

  init: function(){
    ListView.init();
    SelectedView.init();
  }
};

module.exports = Controller;