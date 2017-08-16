var app = angular.module('securityproj', []);
var serverurl = "http://dpev899.innovate.ibm.com:7000";


app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);


app.controller('MainCtrl', [
'$scope',
'$http',
function($scope,$http){
  	$scope.sendIp = function(){
  		if(!$scope.ipsub) { return; }
  		loadstart();
		console.log("scan!");
  		var ipaddr = {'ip': $scope.ipsub };
  		$http.post(serverurl+'/scanip', {'ip': $scope.ipsub }).success(function(data){
  			/* Redirect page to home page. */
  			console.log("Scanip.");
  			var cmpresult = data.cmpresult;
// 			showcmp(cmpresult)
  			console.log("Scan succeed! " + cmpresult);
  		});
  		$scope.ipsub = '';
	};
}]);

app.controller('MapCtrl', [
'$scope',
'$http',
function($scope,$http){
    $scope.sendIpadd = function(){
    $scope.ipsubnet="9.66.64.0/23";
      console.log("we are here...");
      window.location = 'http://dpev899.innovate.ibm.com:7000/scan';
//       loadstart();
      console.log("scan!");
      var ipaddr = {'ip': $scope.ipsubnet };
      console.log(ipaddr);
      $http.post(serverurl+'/scanip', {'ip': $scope.ipsubnet }).success(function(data){
          /* Redirect page to home page. */
          console.log("Scanip.");
          var cmpresult = data.cmpresult;
          // showcmp(cmpresult)
          console.log("Scan succeed! " + cmpresult);
      });
    };
}]);

app.controller('ScheduleCtrl', [
'$scope',
'$http',
function($scope,$http){

    var selectedKeys = [];
    $scope.scandata = "New";

    $scope.scheduleScan = function(){
        if(!$scope.ipaddr && !$scope.min && !$scope.hr && !$scope.day && !$scope.scanid) { return; }
        var param = {
          'ipsub': $scope.ipaddr+"/"+$scope.sub, 
          'hr': $scope.hr,
          'min': $scope.min,
          'day': $scope.day,
          'scanid': $scope.scanid
        };
        $http.post(serverurl+'/schedule/schedulescan', param).success(function(data){
          console.log(data);
        });
        $scope.ipaddr = '';
        $scope.sub = '';
        $scope.hr = '';
        $scope.min = '';
        $scope.day = '';
        $scope.scanid = ''; 
    };

    $scope.showScan = function(){
        $http.post(serverurl+'/schedule/showscan').success(function(data){
            $scope.scandatas = [];
            angular.forEach(data, function(eachValue, key){
              var list = eachValue.split(' ');
              var key = list[list.length-1]; //find the key from each value string
              var stringToDisplay = eachValue;
              var isChecked = false;
              var newObj = {"key": key, "stringToDisplay": stringToDisplay, "isChecked": isChecked};
              $scope.scandatas.push(newObj);
              })
            console.log(data);
        });
    };

    $scope.checkboxChanged = function(scandata) {
      if (scandata.isChecked == true){
        selectedKeys.push(scandata.key);
      }
      else{
        angular.forEach(selectedKeys, function(eachKey, index){
          if (eachKey == scandata.key){
            selectedKeys.splice(index,1);
          }
        });
      }
      return;
    };

    $scope.cancelScan = function(){
        angular.forEach(selectedKeys, function(eachKey){
            var rmid = {
              'scanidrm': eachKey
            }
            $http.post(serverurl+'/schedule/cancelscan', rmid).success(function(data){
                angular.forEach($scope.scandatas, function(eachData, index){
                  if(rmid.scanidrm == eachData.key){
                        $scope.scandatas.splice(index,1);
                  }
                });
            });
        });    
    };
}]);

app.controller('AggscanCtrl', [
'$scope',
'$http', '$location',
function($scope,$http,$location){
    $scope.aggresults = "";
    $scope.aggressiveScan = function(){
        $scope.scans = [];
		    //var ip = window.location.search.substring(1);
		    var ip = document.getElementById("popip").innerHTML;
        console.log("angular: " + ip);
        if(!ip) { return; }
        var ipsub1 = {'ips': ip};
        $http.post(serverurl+'/aggs/aggscan', ipsub1).success(function(data){
            $scope.aggresults=data;
            $("#btnact").show();
			$('#btnemail').show();
            console.log(data);
        });
    };
}]);