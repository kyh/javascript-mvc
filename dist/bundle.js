(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./model":2,"./views":3}],2:[function(require,module,exports){
var Model = {
  selectedCat: null,
  cats: [
    {
      name: 'Meow',
      img: 'cat1',
      count: 0
    }, {
      name: 'Whiskers',
      img: 'cat2',
      count: 0
    }, {
      name: 'Fluffy',
      img: 'cat3',
      count: 0
    }, {
      name: 'Purr',
      img: 'cat4',
      count: 0
    }
  ]
};

module.exports = Model;
},{}],3:[function(require,module,exports){
var Controller;

var ListView = {
  init: function(){
    Controller = require('./controller');
    var cats = Controller.getAllCats();
    var catListElement = document.querySelector('#cat-list');

    cats.forEach(function(cat, index){
      var wrapper = _createElement(cat);
      catListElement.appendChild(wrapper);
      var name = wrapper.querySelector('.name');

      name.addEventListener('click', function(){
        _selectCat(catListElement.children, wrapper, index);
      });

      if (index === 0) {
        _selectCat(catListElement.children, wrapper, index);
      }
    });

    function _selectCat(catList, selectedCatElement, selectedCatIndex){
      for (var i = 0; i < catList.length; i++) {
        catList[i].classList.remove('selected-cat');
      }
      Controller.selectCat(selectedCatIndex);
      selectedCatElement.classList.add('selected-cat');
    }

    function _createElement(currentCat){
      var wrapper = document.createElement('div');
      wrapper.innerHTML = '<h4 class="name">'+currentCat.name+'</h4>';
      return wrapper;
    }
  }
};

var SelectedView = {
  imageElement: document.querySelector('#selected-cat'),
  countElement: document.querySelector('span.count'),

  init: function(){
    SelectedView.imageElement.addEventListener('click', _catClicked);
    SelectedView.render();

    function _catClicked(){
      Controller.addCount();
      SelectedView.renderCountSelection();
    }
  },

  renderCatSelection: function(){
    var catImage = Controller.getSelectedCat().img;
    SelectedView.imageElement.src = 'img/'+ catImage + '.jpg';
  },

  renderCountSelection: function(){
    var catCount = Controller.getSelectedCat().count;
    SelectedView.countElement.innerHTML = catCount;
  },

  render: function(){
    SelectedView.renderCatSelection();
    SelectedView.renderCountSelection();
  }
};

module.exports = {
  SelectedView: SelectedView,
  ListView: ListView
};
},{"./controller":1}],4:[function(require,module,exports){
var Controller = require('./controller');

Controller.init();
},{"./controller":1}]},{},[4]);
