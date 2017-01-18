/* Simple Calculator Controller */

	var app = angular.module("SimpleCalculator", []);
	
	app.controller("CalculatorController",
	function CalculatorController($scope) {
		$scope.inputValue = "0";
		$scope.recall = "";
		$scope.computed = false;
		$scope.result = 0;
		$scope.operation = "Add";
 		$scope.buffer = 0;
		
		$scope.onClickClear = function() {
			$scope.inputValue = "0";
			$scope.recall = "";
			$scope.result = 0;
			$scope.operation = "Add";
			$scope.buffer = 0;
		};		
		
		$scope.onClickTotal = function() {			
			switch($scope.operation) {
				case "Add" :
					$scope.result += parseFloat($scope.inputValue);
					break;
				case "Subtract" :
					$scope.result -= parseFloat($scope.inputValue);
					break;
				case "Multiply" :
					$scope.result *= parseFloat($scope.inputValue);
					break;
				case "Divide" :
					$scope.result /= parseFloat($scope.inputValue);
					break;
			}
			
			$scope.inputValue = $scope.result;
		};

		$scope.onClickSquareRoot = function() {
			$scope.inputValue = Math.sqrt(parseFloat($scope.inputValue));
			$scope.recall += "sqrt(" + $scope.inputValue + " ) ";
		};

		$scope.onClickPow = function() {
			if($scope.buffer == 0){
				$scope.buffer = $scope.inputValue
			} else {
				$scope.inputValue = Math.pow($scope.buffer, $scope.inputValue);
				$scope.recall += "pow(" + $scope.buffer + "," +$scope.inputValue + " ) ";
				$scope.buffer == 0
			}
		};
		
		$scope.onClickTextDisplay = function(str) {
			var tempStr = $scope.inputValue;
			
			if($scope.computed == true) {
				tempStr = "";
			}
			
			if("Negative" == str) {
				if($scope.inputValue != "0")
					tempStr = tempStr.charAt(0) != "-" ? tempStr = "-" + tempStr : tempStr = tempStr.substring(1);				
			} else {
				if($scope.inputValue != "0")
					tempStr += str;
				else
					tempStr = str;
			}
						
			$scope.inputValue = filterNumeric(tempStr);
			$scope.computed = false;
		};
		
		$scope.onClickOperation = function(mode) {
			if($scope.inputValue != "0") {				
				switch(mode) {
					case "Add" :
							$scope.recall += $scope.inputValue + " + ";														
						break;
					case "Subtract" :
							$scope.recall += $scope.inputValue + " - ";							
						break;
					case "Multiply" :
							$scope.recall += $scope.inputValue + " * ";
						break;
					case "Divide" :
							$scope.recall += $scope.inputValue + " / ";
						break;
				};
				$scope.onClickTotal();
				$scope.operation = mode;
				$scope.computed = true;
			}	
		};
		
		$scope.onKeyPress = function(event) {
			var temp = $scope.inputValue;
			switch(event.keyCode) {
				case 42 : $scope.onClickOperation("Multiply");
							break;
				case 43 : $scope.onClickOperation("Add");
							break;
				case 45 : $scope.onClickOperation("Subtract");
							break;
				case 47 : $scope.onClickOperation("Divide");
							break;
				case 13 : $scope.onClickTotal();
							break;
							
			}					
		};		
	});
	
	app.directive('numeric', function () {
		return {
			require: '?ngModel',
			link: function (scope, element, attrs, modelCtrl) {
				modelCtrl.$parsers.push(function (inputValue) {
					var tempStr = filterNumeric(inputValue)
					modelCtrl.$setViewValue(tempStr);
					modelCtrl.$render();					
				});
			}
		}
    });
	
	function filterNumeric(inputValue) {
		if (inputValue == undefined || angular.isUndefined(inputValue)) {
			inputValue = '';
		}
		var tempStr = inputValue.replace(/[^0-9.-]/g, '');
		var regex = new RegExp(/^(-)?[0-9]+[.]?[0-9]*$/);
		if(!regex.test(tempStr)){
			var index = tempStr.lastIndexOf('.');
			if(index > -1)
				tempStr = tempStr.substr(0, index); 
		}
		
		return tempStr;
	};
	
	