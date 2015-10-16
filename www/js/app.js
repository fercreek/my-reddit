(function(){
var app = angular.module('myreddit', ['ionic', 'angularMoment']);

app.controller('RedditCtrl', function($scope, $http){
    $scope.stories = [

    ];
    $scope.loadOlderStories = function(){
        var params = {};
        if ($scope.stories.length > 0){
            params['after'] = $scope.stories[$scope.stories.length - 1].name;
        }
        $http.get('https://www.reddit.com/r/Android/new/.json', {params:params})
            .success(function(response){
                angular.forEach(response.data.children, function(child){
                    $scope.stories.push(child.data);
                });
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    };
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
