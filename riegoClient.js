//new collections in MongoDB
listCategories = new Meteor.Collection("ListCategories");
items = new Meteor.Collection("listItems");


if (Meteor.isClient) {
  Template.categories.listCategories = function() {
    return listCategories.find({},{sort: {Category:1}});
  };

  Session.set('adding_category', false);
  Template.categories.newCat = function(){
    return Session.equals('adding_category', true);
  };

  Template.categories.events({
    'click #btnDelete': function (e, t){
        alert('at this point, this element must be deleted' + e + '  --   ' + t);
    },
    'click #btnAdd': function (e, t){
        Session.set('adding_category', true); 
        Meteor.flush();
        focusText(t.find("#txtAddCategory"));
    },
    'keyup #txtAddCategory': function(e, t){
      if(e.which == 13){
        var catVal = String(e.target.value || "");
        if(catVal){
          listCategories.insert({Category:catVal});
          Session.set('adding_category', false);          
        }
      }
    },
    'focusout #txtAddCategory': function(e, t){
      Session.set('adding_category', false);
    }

  });

  function focusText(i){
    i.focus();
    i.select();
  };

  Template.favorite.items = function(){
      if(Session.equals('current_favorite', null)){
        return null;
      }else{
        var cats = favorite.findOne({_id_Session.get('current_favorite')});
        if(cats&&cats.items){
          for(var i = 0; i<cats.items.length; i++){
            var d = cats.items[i]; 
            d.Lendee = d.LentTo ? d.LentTo : "free"; 
            d.LendClass = d.LentTo ? "label-important" : "label-success";
          }
        }
        return cats.items;
      };
    };
  };


}