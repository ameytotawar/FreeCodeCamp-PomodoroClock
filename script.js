var app = angular.module('MyApp', [])
        app.controller('MyController', function ($scope, $interval, $filter) {
            //Initiate the Timer object.
            $scope.callTimer = undefined;
            $scope.seslen = 25;
            $scope.brlen = 5;
            $scope.sesname = "session";
            $scope.seconds = $scope.seslen*60;
            $scope.timeLeft = $filter('date')(new Date(1970, 0, 1).setSeconds($scope.seconds), 'HH:mm:ss');
          $scope.originalTime = $scope.seslen*60;
          
            $scope.ammount = 0;
          
            var runTimer = false;

                //Initialize the Timer to run every 1000 milliseconds i.e. one second.
                function Timer () {
                    //Display the current time.
                  $scope.seconds -= 1;
                  //var denom = 60 * $scope.originalTime;
      $scope.ammount = Math.round(100 - (($scope.seconds / $scope.originalTime) * 100));
                    var time = $filter('date')(new Date(1970, 0, 1).setSeconds($scope.seconds), 'HH:mm:ss');
                    if($scope.seconds === 0)
                      {
                        if($scope.sesname == "session")
                        {
                          $scope.seconds = $scope.brlen*60;
                          $scope.sesname = "break";
                          $scope.originalTime = $scope.brlen*60;
                        }
                        else
                        {
                          $scope.seconds = $scope.seslen*60;
                          $scope.sesname = "session";
                          $scope.originalTime = $scope.seslen*60;
                        }  
                      }
                        $scope.timeLeft = time;
                };

 
            //Timer stop function.
            $scope.toggleTimer = function () {
 
                //Cancel the Timer.
                if (angular.isDefined($scope.callTimer)) {
                    $interval.cancel($scope.callTimer);
                    $scope.callTimer = undefined;
                }
                else
                  {
                    $scope.callTimer = $interval(Timer,1000);
                  }
            };
          
            $scope.chngbrlen = function(length) {
              if(!angular.isDefined($scope.callTimer)) {
              $scope.brlen += length;
              if($scope.brlen < 1)
                $scope.brlen = 1;
              if($scope.sesname == "break") {
                $scope.seconds = $scope.brlen*60;
                $scope.originalTime = $scope.brlen*60;
                $scope.timeLeft = $filter('date')(new Date(1970, 0, 1).setSeconds($scope.seconds), 'HH:mm:ss');
              }
              }
            };
          
            $scope.chngseslen = function(length) {
              if(!angular.isDefined($scope.callTimer)) {
              $scope.seslen += length;
              if($scope.seslen < 1)
                $scope.seslen = 1;
              if($scope.sesname == "session") {
              $scope.seconds = $scope.seslen*60;
              $scope.originalTime = $scope.seslen*60;
              $scope.timeLeft = $filter('date')(new Date(1970, 0, 1).setSeconds($scope.seconds), 'HH:mm:ss');
              }
              }
            };
                    
          // $('.pie').each(function(pie) {
          //   var p = parseFloat(pie.textContent);
          //   pie.style.animationDelay = '-' + p + 's';
          // });  
          //Timer();
        });

app.directive('pctComplete', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      value: '=',
      sname: '=',
      timel: '=',
      method: '&'
    },
    template: ' <div class="c100 p{{value}} big blue">\
                      <span class="outside text-center" ng-click="method()">\
                      <span class="sml">{{sname}}</span>\
                      <br />\
                      <span class="sml">{{timel}}</span>\
                      </span>\
                      <div class="slice">\
                        <div class="bar"></div>\
                        <div class="fill"></div>\
                      </div>\
                    </div>'
  };
});