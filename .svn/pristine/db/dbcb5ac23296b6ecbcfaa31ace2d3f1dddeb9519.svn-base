/**
 * 푸시 한 건 수동발송 테스트 프로그램 
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
var acc = [{'bp':'15511606','ca':'16423445','DOC_HEADER_OPBEL':'220007530578','pushid':'df2d6906ccf20ba4261fb31d2e5376864ff3405314dbbcc670c8a9c778853b76','device_id':'01063681312','deviceType':'I'}];
/*
var acc = [{'pn':'01081266399','bp':'15766513','ca':'15360327'},
           {'pn':'01072291691','bp':'15766910','ca':'15361277'},
           {'pn':'01023897014','bp':'15766330','ca':'15360022'},
           {'pn':'01024387271','bp':'16520235','ca':'17131295'},
           {'pn':'01020558123','bp':'15767102','ca':'15361727'},
           {'pn':'01096782409','bp':'18367404','ca':'18602952'},
           {'pn':'01088989092','bp':'15296235','ca':'16227550'},
           {'pn':'01033798756','bp':'18381226','ca':'18612885'},
           {'pn':'01048480064','bp':'18304090','ca':'18534959'},
           {'pn':'01049304135','bp':'15296169','ca':'16227485'}];
*/

//var accRT = [8002];
var accRT = [acc.length];

function init(){
//	runPGM(acc[k]);
//	k = k+1;
	var paramSS = {
			"alert":"푸시 테스트",
			"appIdentifier":"com.alopex.android.template",
			"userId":"admin",
			"deviceType":"A",
			"recvCheck":"Y",
			"deviceQuery":"",
			"pageId":"pushstart",
			"parameters":"{\"MESSAGENO\":\"225\",\"TITLE\":\"test\",\"msgSeq\":\"225\"}",
			"title":"청구서발행안내",
			"useAlert":"false",
			"list":[{
						"pushList":
										[{
											"pushId":"APA91bESlSaQmzNaIrwyQ29uZNhd8U9alFaOLsnxpmrM4NFIOztp5yOP13YcHQ3dyD0vZ2hiFlzO-WwWXTIbe5ijOP_oZcFRCpW81akynOYc6bgwgrMufqK4M9ufdXZCgfhrOAQsYMmv",
											"deviceId":"01050312325"
											}]
						}]
			};
	
	pushSend("pushSend", paramSS, function(cb){
		console.log(cb);
		console.log('update ok');
		//accRT[k-1] = {'pn':um.deviceId,'result':'true','resultMSG':cb.list.bpCaList[0].retMsg,'resultCA':um.ca};
		//runMainGo();
	}, function(errorCode, errorMessage){
		//accRT[k-1] = {'pn':um.deviceId,'result':'false'};
		//runMainGo();
		console.log('update error');
	});
}

function runPGM(um){
	var paramSS = {
	"alert":um.ca + " 9월 청구서가 발행되었습니다.",
	"appIdentifier":"com.alopex.android.template",
	"userId":"admin",
	"deviceType":um.deviceType,
	"recvCheck":"Y",
	"deviceQuery":"",
	"pageId":"pushstart",
	"parameters":"{\"PUSH_TYPE\":\"E\",\"BP\":\""+um.bp+"\",\"CA\":\""+um.ca+"\",\"DOC_HEADER_OPBEL\":\""+um.DOC_HEADER_OPBEL+"\"}",
	"title":"청구서발행안내",
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
		console.log('#####################################################################################################['+k+']############ next ['+acc[k].device_id+']');
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