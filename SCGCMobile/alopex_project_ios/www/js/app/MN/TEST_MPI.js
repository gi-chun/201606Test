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
	
//	loge('@@@@@@@@ 11 \n');
	$("#Visa3d").submit();
//	loge('@@@@@@@@ 22 \n');
	
	
	
	$('.startBT').click(function(){
		pn = $('#pn').val();
		//var pnC = $('#pn').val();
		var numC = $('#num').val();
		bStart = new Date().getTime();
		MaxC = numC;
		
		$( "#Visa3d" ).submit();
//		chkLogin();
		//var bEnd = new Date().getTime();
		//alert($('#pn').val()+'::'+$('#num').val());
	});
		
}

function resizeFrame( gobj )
{
    var innerBody = gobj.contentWindow.document.body;
    var innerHeight = innerBody.scrollHeight + (innerBody.offsetHeight - innerBody.clientHeight);
    var innerWidth = innerBody.scrollWidth + (innerBody.offsetWidth - innerBody.clientWidth);
    /*
    gobj.style.height = innerHeight;
    gobj.style.width = innerWidth;
    */
    gobj.style.height = "540px" ;
    
    if(document.Visa3d.cardcode.value == "1" || document.Visa3d.cardcode.value == "2" || document.Visa3d.cardcode.value == "6")
        gobj.style.width = "320px";
    else if(document.Visa3d.cardcode.value == "7" || document.Visa3d.cardcode.value == "11")
        gobj.style.width = "320px";
    else if(document.Visa3d.cardcode.value == "9")
        gobj.style.width = "430px";
    else if(document.Visa3d.cardcode.value == "4")
        gobj.style.width = "360px";
    else if(document.Visa3d.cardcode.value == "5")
        gobj.style.width = "370px";

    //스크롤 옵션은 활성화 하세요.
    //폰종류에 따라 화면 사이즈가 변경될수 있습니다.
    //안드로이드 2.1 버젼에서는 block을 사용하면 안된다. 그냥 ""로 해야한다.

    document.getElementById("MPIFRAME").scrolling="YES";
    document.getElementById("MPIFRAME").style.display="";
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