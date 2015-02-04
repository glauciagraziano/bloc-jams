 //require('./landing');
 //require('./album');
 //require('./collection');
 //require('./profile');

// Example album.
 var albumPicasso = {
   name: 'The Colors',
   artist: 'Pablo Picasso',
   label: 'Cubism',
   year: '1881',
   albumArtUrl: '/images/album-placeholder.png',
 
   songs: [
     { name: 'Blue', length: '4:26', audioUrl: '/music/placeholders/blue'  },
     { name: 'Green', length: '3:14', audioUrl: '/music/placeholders/green' },
     { name: 'Red', length: '5:01', audioUrl: '/music/placeholders/red' },
     { name: 'Pink', length: '3:21', audioUrl: '/music/placeholders/pink'},
     { name: 'Magenta', length: '2:15', audioUrl: '/music/placeholders/magenta'}
     ]
 };
 
 
 blocJams = angular.module('BlocJams', ['ui.router']);

 blocJams.config(function($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise("/player_bar");
   
   $stateProvider
     .state('player_bar', {
       url: '/player_bar', 
       templateUrl: '/templates/player_bar.html'
     })
 })

 blocJams.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode(true);
 
   $stateProvider.state('landing', {
     url: '/',
     controller: 'Landing.controller',
     templateUrl: '/templates/landing.html'
   });
   $stateProvider.state('collection', {
     url: '/collection',
     controller: 'Collection.controller',
     templateUrl: '/templates/collection.html'
   });
     $stateProvider.state('album', {
     url: '/album',
     templateUrl: '/templates/album.html',
     controller: 'Album.controller'
   });
   
 }]);
 
 // This is a cleaner way to call the controller than crowding it on the module definition.

 blocJams.controller('ConsoleLogger', ['$scope', '$log', function($scope, $log) {
  $scope.$log = $log;
  $scope.message = 'Hello World!';
}]);

 blocJams.controller('Landing.controller', ['$scope', function($scope) {
   
   $scope.subText = "Turn the music up!";
   
   $scope.subTextClicked = function() {
     $scope.subText += '!';
   };
   
   $scope.siteName = "Bloc Jams";
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
 
 blocJams.controller('Collection.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
  $scope.albums = [];
   for (var i = 0; i < 33; i++) {
     $scope.albums.push(angular.copy(albumPicasso));
   }
   $scope.playAlbum = function(album) {
     SongPlayer.setSong(album, album.songs[0]); // Targets first song in the array.
   }
}]);

 blocJams.controller('Album.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
   $scope.album = angular.copy(albumPicasso);
   
   var hoveredSong = null;
 
   $scope.onHoverSong = function(song) {
     hoveredSong = song;
   };
 
   $scope.offHoverSong = function(song) {
     hoveredSong = null;
   };
   $scope.getSongState = function(song) {
     if (song === SongPlayer.currentSong && SongPlayer.playing) {
       return 'playing';
     }
     else if (song === hoveredSong) {
       return 'hovered';
     }
     return 'default';
   };
   
    $scope.playSong = function(song) {
      SongPlayer.setSong($scope.album, song);
    };
 
    $scope.pauseSong = function(song) {
      SongPlayer.pause();
    };
   
 }]);

 blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
   $scope.songPlayer = SongPlayer;
 }]);

 blocJams.service('SongPlayer', function() {
   var currentSoundFile = null;
   var trackIndex = function (album, song) {
     return album.songs.indexOf(song);
  };
  
  return {
    currentSong: null,
    currentAlbum: null,
    playing: false,
    
    play: function() {
      this.playing = true;
      currentSoundFile.play();
    },
    pause: function() {
      this.playing = false;
      currentSoundFile.pause();
    },
    next: function() {
      var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
      currentTrackIndex++;
      if (currentTrackIndex >= this.currentAlbum.songs.length) {
        //currentTrackIndex = 0;
        currentSong = null;
        currentSong.playing = false;
      }
      var song = this.currentAlbum.songs[currentTrackIndex];
      this.setSong(this.currentAlbum, song);
      //this.currentSong = this.currentAlbum.songs[currentTrackIndex];
    },
    previous: function() {
      var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);
      currentTrackIndex--;
      if (currentTrackIndex < 0) {
        //currentTrackIndex = this.currentAlbum.songs.length - 1;
        currentSong = null;
        currentSong.playing = false;
      }
      var song = this.currentAlbum.songs[currentTrackIndex];
      this.setSong(this.currentAlbum, song);
      //this.currentSong = his.currentAlbum.songs[currentTrackIndex];
    },
    setSong: function(album, song) {
      if (currentSoundFile) {
        currentSoundFile.stop();
      }
      this.currentAlbum = album;
      this.currentSong = song;
      currentSoundFile = new buzz.sound(song.audioUrl, {
        formats: [ "mp3" ],
        preload: true
      });
      
      this.play();
    }
  };
});
blocJams.directive('slider', function(){
  
   var updateSeekPercentage = function($seekBar, event) {
     var barWidth = $seekBar.width();
     var offsetX =  event.pageX - $seekBar.offset().left;
 
     var offsetXPercent = (offsetX  / $seekBar.width()) * 100;
     offsetXPercent = Math.max(0, offsetXPercent);
     offsetXPercent = Math.min(100, offsetXPercent);
 
     var percentageString = offsetXPercent + '%';
     $seekBar.find('.fill').width(percentageString);
     $seekBar.find('.thumb').css({left: percentageString});
   }
  return {
    templateUrl: '/templates/directives/slider.html',
    replace: true,
    restrict: 'E',
    link: function(scope, element, attributes) {
 
      var $seekBar = $(element);
 
      $seekBar.click(function(event) {
        updateSeekPercentage($seekBar, event);
      });
 
      $seekBar.find('.thumb').mousedown(function(event){
        $seekBar.addClass('no-animate');
 
        $(document).bind('mousemove.thumb', function(event){
          updateSeekPercentage($seekBar, event);
        });
 
        //cleanup
        $(document).bind('mouseup.thumb', function(){
          $seekBar.removeClass('no-animate');
          $(document).unbind('mousemove.thumb');
          $(document).unbind('mouseup.thumb');
        });
 
      });
    }
  };
});