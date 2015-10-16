(function(){
var app = angular.module('myreddit', ['ionic']);

app.controller('RedditCtrl', function($scope){
    $scope.stories = [
        {
            title: "First sory"
        },
        {
            title: "Second story"
        }
    ];

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

}());
