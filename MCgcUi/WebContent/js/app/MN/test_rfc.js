/**
 * 송달구분 10 로그인 트래픽 테스트
 */

var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', init);
	alopexreadyRun = false;
}

nowPGCode = 'MMNST0M0';

var index = 0;
var callbackIndex = 0;
var loopCount = 1;
function init(){
	runPGM();
}

function runPGM(){
	var param1 = {
		"phoneNum" : '01028394001', "gubun" : "10"
	};
	var param2 = {
			"phoneNum" : '01021283659', "gubun" : "10"
		};
	var param3 = {
			"phoneNum" : '01090425127', "gubun" : "10"
		};
	var param4 = {
			"phoneNum" : '01092553966', "gubun" : "10"
		};
	var param5 = {
			"phoneNum" : '01020043999', "gubun" : "10"
		};
	
	console.log('######################## '+index);
	
	if(index%5==0){
		httpSend("getAccInfo", param1, function(cb){
			console.log(cb);
			callbackIndex++;
			console.log('getAccInfo success ## '+callbackIndex);
		}, function(errorCode, errorMessage){
			callbackIndex++;
			console.log('getAccInfo error ## '+callbackIndex);
		});
	}else if(index%5==1){
		httpSend("getAccInfo", param2, function(cb){
			console.log(cb);
			callbackIndex++;
			console.log('getAccInfo success ## '+callbackIndex);
		}, function(errorCode, errorMessage){
			callbackIndex++;
			console.log('getAccInfo error ## '+callbackIndex);
		});
	}else if(index%5==2){
		httpSend("getAccInfo", param3, function(cb){
			console.log(cb);
			callbackIndex++;
			console.log('getAccInfo success ## '+callbackIndex);
		}, function(errorCode, errorMessage){
			callbackIndex++;
			console.log('getAccInfo error ## '+callbackIndex);
		});
	}else if(index%5==3){
		httpSend("getAccInfo", param4, function(cb){
			console.log(cb);
			callbackIndex++;
			console.log('getAccInfo success ## '+callbackIndex);
		}, function(errorCode, errorMessage){
			callbackIndex++;
			console.log('getAccInfo error ## '+callbackIndex);
		});
	}else if(index%5==4){
		httpSend("getAccInfo", param5, function(cb){
			console.log(cb);
			callbackIndex++;
			console.log('getAccInfo success ## '+callbackIndex);
		}, function(errorCode, errorMessage){
			callbackIndex++;
			console.log('getAccInfo error ## '+callbackIndex);
		});
	}
	
	

	
	
	setTimeout(function() {
		index++;
		if(loopCount>index){
			runPGM();
		}else{
			console.log('getAccInfo end ########################');
		}
	}, 1000);
	
}
