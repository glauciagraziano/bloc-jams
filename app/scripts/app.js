 //require('./landing');
 //require('./album');
 //require('./collection');
 //require('./profile');
 
 angular.module('BlocJams', []).controller('Landing.controller', ['$scope', function($scope) {
   
   $scope.siteName = "Bloc Jams";
   
   $scope.subText = "Turn the music up!";
   
   $scope.subTextClicked = function() {
     $scope.subText += '!';
   };
   
   $scope.siteNameClicked = function() {
     $scope.albumURLs = [
     '/images/album-placeholders/album-1.jpg',
     '/images/album-placeholders/album-2.jpg',
     '/images/album-placeholders/album-3.jpg',
     '/images/album-placeholders/album-4.jpg',
     '/images/album-placeholders/album-5.jpg',
     '/images/album-placeholders/album-6.jpg',
     '/images/album-placeholders/album-7.jpg',
     '/images/album-placeholders/album-8.jpg',
     '/images/album-placeholders/album-9.jpg',
   ];
     function shuffle(albumURLs){ //v1.0
       for(var j, x, i = albumURLs.length; i; j = Math.floor(Math.random() * i), x = albumURLs[--i], albumURLs[i] = albumURLs[j], albumURLs[j] = x);
      return albumURLs;
      };

     shuffle([1,2,3]);
     
   };  
 }]);