var app = angular.module('securityproj', []);

app.controller('MainCtrl', [
'$scope',
'$http',
function($scope,$http){
  	$scope.sendIp = function(){
  		if(!$scope.ipsub) { return; }
  		loadstart();
		console.log("scan!");
  		var ipaddr = {'ip': $scope.ipsub };
  		$http.post('/scanip', {'ip': $scope.ipsub }).success(function(data){
  			/* Redirect page to home page. */
  			console.log("Scanip.");
  			var cmpresult = data.cmpresult;
// 			showcmp(cmpresult)
  			console.log("Scan succeed! " + cmpresult);
  		});
  		$scope.ipsub = '';
	};
}]);

app.controller('ScheduleCtrl', [
'$scope',
'$http',
function($scope,$http){

    $scope.scandata = "New";

    $scope.scheduleScan = function(){
        if(!$scope.ipaddr && !$scope.min && !$scope.hr && !$scope.day) { return; }
        var param = {
          'ipsub': $scope.ipaddr+"/"+$scope.sub, 
          'hr': $scope.hr,
          'min': $scope.min,
          'day': $scope.day 
        };
        $http.post('schedule/schedulescan', param).success(function(data){
          console.log(data);
        });
        $scope.ipaddr = '';
        $scope.sub = '';
        $scope.hr = '';
        $scope.min = '';
        $scope.day = '';
    };
    $scope.showScan = function(){
        $http.post('schedule/showscan').success(function(data){
            $scope.scandatas=data;
            console.log(data);
        });
    };
    $scope.cancelScan = function(){
        $http.post('schedule/cancelscan').success(function(data){
              $scope.scandata=data;
        });
    };
}]);

app.controller('AggscanCtrl', [
'$scope',
'aggscaning',
'$http',
function($scope,aggscaning,$http){
    $scope.aggressiveScan = function(){
        if(!$scope.ipsubnet) { return; }
        $http.post('schedule/aggscan', ipsubnet).success(function(data){
          console.log(data);
        });
        $scope.ipsubnet = '';
    };
}]);