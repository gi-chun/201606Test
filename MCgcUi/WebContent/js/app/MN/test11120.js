/**
 * 푸시 수동 발송 테스트 프로그램 
 */

var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', init);
	alopexreadyRun = false;
}

nowPGCode = 'MMNST0M0';
var cb = '';
var pnLog = "";

var k = 0;
var acc = [
           {'device_id':'01024183828','bp':'19138994','ca':'19236178','pushid':'APA91bFWAjxctx0BF6yroM9rjJxJBg_WF1btcs9uAdXQsVTHd06arpe2XVSeHztaYlaSIpEsLn8lULwQVvBi1oJzerml5jew9DHqpZLUD3iDC_PUpT3M5c6Xz3vRs9aQVzid34q7z8s4','DOC_HEADER_OPBEL':'240006654688','deviceType':'A'},
];

/*
샘플 {'device_id':'01020004893','bp':'16562576','ca':'17170381','pushid':'APA91bEHeYCN29M-QLtIi4a1E_CIT2EM3Q-eRzAVjQHsokeEp_Ts7bZ0QVP7Yq-n-jGmUoNTxuba-wsf6jL6UTorn5zrAudN2sYpgiA2-UFMaOgZxFxXoAIO5b91qsMxy0KOwcHQhQxV','DOC_HEADER_OPBEL':'231006557441','deviceType':'A'}
*/

//var accRT = [8002];
var accRT = [acc.length];

function init(){
	runPGM(acc[k]);
	k = k+1;
//	var paramSS = {
//			"alert":"9월 청구서가 발행되었습니다.",
//			"appIdentifier":"com.alopex.android.template",
//			"userId":"admin",
//			"deviceType":"A",
//			"recvCheck":"Y",
//			"deviceQuery":"",
//			"pageId":"pushstart",
//			"parameters":"{\"PUSH_TYPE\":\"E\",\"BP\":\"11897284\",\"CA\":\"11889387\",\"DOC_HEADER_OPBEL\":\"217007134950\"}",
//			"title":"청구서발행안내",
//			"useAlert":"false",
//			"list":[{
//						"pushList":
//										[{
//											"pushId":"APA91bESlSaQmzNaIrwyQ29uZNhd8U9alFaOLsnxpmrM4NFIOztp5yOP13YcHQ3dyD0vZ2hiFlzO-WwWXTIbe5ijOP_oZcFRCpW81akynOYc6bgwgrMufqK4M9ufdXZCgfhrOAQsYMmv",
//											"deviceId":"01041822595"
//											}]
//						}]
//			};
//	
//	pushSend("pushSend", paramSS, function(cb){
//		console.log(cb);
//		console.log('update ok');
//		//accRT[k-1] = {'pn':um.deviceId,'result':'true','resultMSG':cb.list.bpCaList[0].retMsg,'resultCA':um.ca};
//		//runMainGo();
//	}, function(errorCode, errorMessage){
//		//accRT[k-1] = {'pn':um.deviceId,'result':'false'};
//		//runMainGo();
//		console.log('update error');
//	});
}

function runPGM(um){
	
	var paramSS = {
	"alert":"1월1일부터 1월2일까지",
	"appIdentifier":"com.alopex.android.template",
	"userId":"admin",
	"deviceType":um.deviceType,
	"recvCheck":"Y",
	"deviceQuery":"",
	"pageId":"pushstart",
	"parameters":"{\"PUSH_TYPE\":\"D\",\"BP\":\""+um.bp+"\",\"CA\":\""+um.ca+"\",\"DOC_HEADER_OPBEL\":\""+um.DOC_HEADER_OPBEL+"\"}",
	"title":"자가검침기간안내",
	"useAlert":"false",
	"list":[{
				"pushList":
								[{
									"pushId":""+um.pushid+"",
									"deviceId":""+um.device_id+""
									}]
				}]
	};
	
	pushSend("pushSend", paramSS, function(cb){
		console.log(cb);
		console.log('update ok');
		accRT[k-1] = {'pn':um.device_id,'result':'true','resultCA':um.ca};
		runMainGo();
	}, function(errorCode, errorMessage){
		accRT[k-1] = {'pn':um.device_id,'result':'false'};
		runMainGo();
		console.log('update error');
	});
	
}


function runMainGo(){ // 결과

	if(k < acc.length){
		console.log('##################################################################################################################[ '+k+' ]#### next ['+acc[k].device_id+']');
		runPGM(acc[k]);
		k = k+1;
		
	}else{
		console.log('######################################################################################### end complate ################################################################');
		var ctn1 = 0;
		var ctn2 = 0;
		for(var ss = 0;ss<accRT.length;ss++){
			if(accRT[ss].result == 'false'){
				ctn2 = ctn2 + 1;
			}else{
				ctn1 = ctn1 + 1;
			}
		}
		alert('종료\n\n############\n총건수['+accRT.length+']\n\n###########\n성공['+ctn1+']\n\n###########\n실패['+ctn2+']');
	}
}