(function(){
var app = angular.module('myreddit', ['ionic', 'angularMoment']);

app.controller('RedditCtrl', function($scope, $http){
    $scope.stories = [];

    function loadStories(params, callback){
        $http.get('https://www.reddit.com/r/Android/new/.json', {params:params})
            .success(function(response){
                var stories = [];
                angular.forEach(response.data.children, function(child){
                    stories.push(child.data);
                });
                // $scope.$broadcast('scroll.infiniteScrollComplete');
                callback(stories);
            });
    }

    $scope.loadOlderStories = function(){
        var params = {};
        if ($scope.stories.length > 0){
            params.after = $scope.stories[$scope.stories.length - 1].name;
        }
        loadStories(params, function(olderStories){
            $scope.stories = $scope.stories.concat(olderStories);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.loadNewerStories = function(){
        var params = {"before": $scope.stories[0].name};
        loadStories(params, function(newerStories){
            $scope.stories = newerStories.concat($scope.stories);
            $scope.$broadcast('scroll.refreshComplete');

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
