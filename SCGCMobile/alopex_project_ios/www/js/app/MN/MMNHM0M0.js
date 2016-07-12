/***
 * date : 2015-05-19
 * pg : jys
 * note : 
 * 1. 내용 입력
 */

var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MMNHM0M0';
var ss = '';
var params = '';
var nowGRGno = '0';
function mainStart(){
	params = navigation.parameters;
	//params = param;
	
	setEventListner();
	$('.topLogoDiv').html(getTitleBp());
	
	//setDefault();
	settingLoading();
	$('.imgloading').show();
//	
	doPage();
}

function setEventListner(){

};

function doPage(opbelNo){
	var param = '';

	$('.topLogoDiv').html(getTitleBp());
	saveBillNo(params.DOC_HEADER_OPBEL);
	param = {
			"doc_header_opbel" : params.DOC_HEADER_OPBEL,
//				"bp" : '14641452',	"ca" : '15527726'
			"bp" : String(Number(params.bp)),	
			"ca" : String(Number(params.ca))
	};

	httpSend("getHotMessageInfo", param, function(cb){
		console.log(cb);
		//console.log(cb.list.hotMsgList[0].HOT_MESSAGE_01);
		var str = "";
		//contText
		if(cb.list.hotMsgList == undefined){
			str = "알림 내역이 없습니다.";
		}else{
			for(var i=1;i<22;i++){
				if(i>1) str += "<br/>";
				str += eval('cb.list.hotMsgList[0].HOT_MESSAGE_'+(i>9?String(i):"0"+i));
				
//				//디자인 포기(2015-07-13)
//				//if(i>1) 
//				var testTxt = trim(eval('cb.list.hotMsgList[0].HOT_MESSAGE_'+(i>9?String(i):"0"+i)));
//				var chkTxt01 = testTxt.substring(0,1);
//				var chkTxt02 = testTxt.substring(0,2);
//				if(chkTxt01 == "▶" || chkTxt01 == "-" || chkTxt01 == "*" || chkTxt01 == "(" || chkTxt01 == "○" || chkTxt01 == "☞" || chkTxt01 == "ⓐ" || chkTxt01 == "ⓑ" || chkTxt01 == "ⓒ" || chkTxt01 == "ⓓ" || chkTxt02 == "1)" || chkTxt02 == "2)" || chkTxt02 == "3)" || chkTxt02 == "4)"){
////					console.log("11::"+eval('cb.list.hotMsgList[0].HOT_MESSAGE_'+(i>9?String(i):"0"+i)));
//					if(i > 1) str += "<br/>";
//					if(chkTxt01 == "(" || chkTxt01 == "-" || chkTxt02 == "1)" || chkTxt02 == "2)" || chkTxt02 == "3)" || chkTxt02 == "4)" || chkTxt01 == "ⓐ" || chkTxt01 == "ⓑ" || chkTxt01 == "ⓒ" || chkTxt01 == "ⓓ" ) str += "&nbsp;"; 
////					if(chkTxt == "▶"){
//					str += eval('cb.list.hotMsgList[0].HOT_MESSAGE_'+(i>9?String(i):"0"+i));
////					}else{}
//				}else{
////					console.log("22::"+eval('cb.list.hotMsgList[0].HOT_MESSAGE_'+(i>9?String(i):"0"+i)));
////					console.log("22::["+chkTxt01+"]");
////					console.log("22::["+chkTxt02+"]");
//					str += eval('cb.list.hotMsgList[0].HOT_MESSAGE_'+(i>9?String(i):"0"+i));
//				}
			}
		}
		$('.contText').html(str);
    	
    	//##################################################################
    	completLoad();
    	setDefault();
    	//##################################################################    	
	}, function(errorCode, errorMessage){
		$('.contText').html("해당 내용이 없습니다.");
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    	
    	//params = navigation.parameters;
    };
});