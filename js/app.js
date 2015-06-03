(function(){

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

  var ListView = {
    init: function(){
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

  Controller.init();

})();