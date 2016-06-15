/**
 * 로그인 성공 횟수 시간 테스트 (로그인 속도 이슈로 인한)
 */

document.addEventListener('alopexready', init);
nowPGCode = 'MMNST0M0';
var pn = '01035649276';
var chkTime = 0;
var countC = 1;
var MaxC = 0;
var bStart = '';

function init(){
	$('#pn').val(pn);
	
	$('.startBT').click(function(){
		pn = $('#pn').val();
		//var pnC = $('#pn').val();
		var numC = $('#num').val();
		bStart = new Date().getTime();
		MaxC = numC;
		chkLogin();
		//var bEnd = new Date().getTime();
		//alert($('#pn').val()+'::'+$('#num').val());
	});
}

function chkLogin(){
	if(countC <= MaxC ){
		var nStart = new Date().getTime();
		var param = {
			"phoneNum" : pn, "gubun" : "10"
		};

		httpSend("getAccInfo", param, function(cb){
			var nEnd = new Date().getTime();
			var nDiff = ((nEnd - nStart) /1000);
			$('#reTB').append('<tr><td>'+(countC)+'차</td><td>'+nDiff+'초</td></tr>');		
		//	console.log('#############'+countC+'차 #############'+cb);
			countC = countC +1;
			chkLogin();
		}, function(errorCode, errorMessage){
			var nEnd = new Date().getTime();
			var nDiff = ((nEnd - nStart) /1000);
			$('#reTB').append('<tr style="background-color:red"><td>'+(countC)+'차</td><td>'+nDiff+'초</td></tr>');
		//	console.log('#############'+countC+'차 ############# error');
			countC = countC +1;
			chkLogin();
		});
	}else{
		var bEnd = new Date().getTime();
		var bDiff = ((bEnd - bStart) /1000);
		$('#reTB').append('<tr style="background-color:#ccc"><td>종료</td><td>'+bDiff+'초</td></tr>');
		countC = 1;
		MaxC = 0;
	}
}