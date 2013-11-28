//new collection in MongoDB
listCategories = new Meteor.Collection("Categories");

if (Meteor.isClient) {
  /*Template.hello.greeting = function () {
    return "Welcome..";
  };

  /*Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });*/

  Template.categories.listCategories = function() {
    return listCategories.find({},{sort: {Category:1}});
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
