var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MMETR0M1';
var params = '';
var loginSessionInfo = '';
function mainStart(){
	params = navigation.parameters;
	if(device.osName != 'iOS'){
		loginSessionInfo = JSON.parse(getAlopexSession('loginSession'));
	}else{
		loginSessionInfo = JSON.parse(getAlopexCookie('loginCookie'));
	}
	
	//params = param;
	//console.log();
	
	setEventListner();
	
	settingLoading();
	$('.imgloading').show();	
	
	doPage();
}

function setEventListner(){
	$('#btn_last_save').click(function(){
//		navigateGo('MMNPG0M0');
		navigateBackToNaviGo('MMNPG0M0');
	});
	
	
	$('#btn_back').click(function(){
		//$a.back();
		navigateGo('MMETR0M0');
	});
	
	$('#btn_home').click(function(){
		navigateBackToNaviGo('MMNPG0M0');
	});
	
};

function doPage(){
	$('.topLogoDiv').html(getTitleBp());
	
	//===========================================
	var mainParam = '';
	if(device.osName != 'iOS'){
		mainParam = getAlopexSession('mainParam');
	}else{
		mainParam = getAlopexCookie('mainParamCookie');
	}
	var param = JSON.parse(mainParam);
	
	logf('mainParam::'+mainParam);
	setDefault();
	httpSend("getMrSelfOrderInfo", param, pageSetting, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
	//===========================================
}

function pageSetting(cb){
//	var cb = JSON.parse(me2Pr);
//	var pr = params;
	logf(params);
	var now = new Date();
	
	/*
	var useGS = Number(cb.custReadingresult)-Number(cb.lsmthMesureValue);
//	useGS = -150;
	if(useGS < 0){
		useGS = Number(make6Length(cb.custReadingresult))-Number(cb.lsmthMesureValue);
	}
	*/
	var useGS = cb.currUsage *1;
	
	//console.log('3');
	
//		for(var i=0;i<cb.list.userInfoResult.length;i++){
//			if(cb.list.userInfoResult[i].CANO == params.list.userInfoResult[0].ca){
	var me01Str = '';
	if(cb.list.userInfoResult != null){
		var meNo = cb.list.userInfoResult[0].CANO;
		$('.meNo').html(meNo);
		var meInDT = cb.list.userInfoResult[0].meResult;
		logf('meInDT::'+meInDT);
		$('.meInDT').html(meInDT);
		logf(cb.list);

		// 다수 ca 고객의 경우, 선택된 ca에 따른 주소 표기
		var meAddr = loginSessionInfo.list.bpCaList[0].addr;
		for(var i=0; i < loginSessionInfo.list.bpCaList.length; i++){
			if(loginSessionInfo.list.bpCaList[i].ca==meNo){
				meAddr = loginSessionInfo.list.bpCaList[i].addr;
			}
		}
		// --
		
		//var me01Str = '<ul>'+
		me01Str = '<ul>'+
		'	<li><strong>고객명</strong> '+ascUserNM(cb.list.userInfoResult[0].BUS_PART_NAME)+'</li>'+
		'	<li><strong>고객주소</strong>'+meAddr+'</li>';
		me01Str += '	<li><strong>등록기간</strong> '+toMEDate(cb.s_adatsoll1,cb.e_adatsoll1)+'</li>'+
		'	<li><strong>계량기번호</strong> '+cb.gasMrnrNo+'</li>'+
		'	<li><strong>전월지침</strong> '+cb.lsmthMesureValue+'㎥</li>'+
//				'</ul>'+
//				'<ul>'+
		'	<li><strong>당월지침</strong> <span>'+cb.custReadingresult+'</span><span class="col_gray">㎥</span></li>'+
		'</ul>';
	}else{
		me01Str += '<ul><li><strong>등록기간</strong> '+toMEDate(cb.s_adatsoll1,cb.e_adatsoll1)+'</li>'+
		'	<li><strong>계량기번호</strong> '+cb.gasMrnrNo+'</li>'+
		'	<li><strong>전월지침</strong> '+cb.lsmthMesureValue+'㎥</li>'+
//				'</ul>'+
//				'<ul>'+
		'	<li><strong>당월지침</strong> <span>'+cb.custReadingresult+'</span><span class="col_gray">㎥</span></li>'+
		'</ul>';
	}
//				'</ul>'+
//				'<ul>'+
	me01Str += '<ul>';
	if(cb.custReadingresult != ""){
		
		me01Str += '	<li><strong>'+(now.getMonth()+1)+'월 사용량</strong> <span class="col_red">'+useGS+'</span><span class="col_gray">㎥</span></li>'+
		//				'</ul>'+
		//				'<ul>'+
		'	<li class="none"><strong style="width:200px">사용량 전년도 비교</strong> <br />'+
		'		<div class="clear pt10 pb10">'+
		'			<div id="chart_pie" style="height: 90px;"></div>'+
		'		</div>'+
		'	</li>';
		//				'	<li class="none tac pt10"><button class="Button red2 big" id="btn_back">다시입력</button><button class="Button red big" id="btn_last_save">확인</button></li>'+
	}
		me01Str += '	<li class="none tac pt10"><button class="Button red2 big" id="btn_back">수정하기</button><button class="Button red" id="btn_home">입력완료</button></li>';
		'</ul>';
	
	
		$('.infoBox').html(me01Str);
				
				
				
//			}
//		}
	
	addBPCAList();
	setEventListner();
	completLoad();

	drawGrapbar(cb,cb,useGS);
	
}

function make6Length(lmv){
	var lmvStr = '1';
	if(lmv.length < 5){
		lmvStr = '1';
		for(var i=0;i<(5-lmv.length);i++){
			lmvStr += '0';
			if(i==((5-lmv.length)-1)){
				lmvStr += lmv;
			}
		}
		return lmvStr;
	}
}

function drawGrapbar(pr, mp, useGS){
	var prDT = chgDate6And8to4(pr.prvyyBudat);
	//var prVL = '';
	var prVL = pr.prvyyUsgQty;
	var nowDT = chgDate6And8to4(mp.adatsoll1);
	//var nowVL = pr.chk;
	var gp;
	if(prVL == ''){
		// 전년도 값 없음
		gp = [{
        	name: nowDT,
        	data:[useGS]
        }];
	}else{
		gp = [{
        	name: nowDT,
        	data:[useGS]
        }, {
        	name: prDT,
        	data:[Number(prVL.substring(0,prVL.indexOf('.')))]
        }];
	}
	
//	gp = [{
//		name: '15.06',
//		data:[100]
//	}, {
//		name: '14.06',
//		data:[120]
//	}];
	
	 $('#chart_pie').highcharts({
		 	credits: {
				enabled: false
			},
	        chart: {
	            type: 'bar',
	            zoomType: 'none'
	        },
	        legend : {
	        	enabled : false
	        },
	        exporting: {							// export 막기
	        	contextButton: {
	        		enabled : false
	        	},
	        	enabled : false
	        },
	        title: {
	            text:''								// title 없애기
	        },
	        xAxis: {
	        	categories: ['사용량'],
	        	labels : {
	        		enabled : false
	        	},
	        	title : '',
	        	gridLineWidth: 0,
	        	lineWidth: 0,
	        	minorTickWidth: 0,
	        	minorGridLineWidth: 0
	        },
	        yAxis: {
	        	min: 0,
	        //	tickPixelInterval : 200,
	        	labels : {
	        		enabled : false
	        	},
	        	title : '',
	        	//gridLineWidth: 0
	        },
	        plotOptions: {
	            series: {
	            	//stacking: 'percent'
	            	//pointWidth : 20
	            	//lineWidth: 10
	            },
	            bar : {
	            	dataLabels : {
	            		enabled : true,
	            		padding : 0,
	            		align: 'right',
	            		style : {
	            			"fontSize" : "11px"
	            		},
	            	//	verticalAlign : 'bottom',
	            		//overflow : 'none',
	            		format : '\'{series.name} [ {y}㎥ ]'
	            	}
	            //	,borderWidth: 2
	           // 	,borderColor: 'black'
	            //	,pointPadding : 0.1
	            }
	        },
	        series: gp
	    });
}

function addBPCAList(){
	/*
	 	<li class="key_num"><a href="javascript:void(0);">12345678</a><span class="input input_no">미입력</span></li>
		<li class="num"><a href="javascript:void(0);">12345677</a><span class="input input_date">03.07</span></li>
		<li class="num"><a href="javascript:void(0);">12345677</a><span class="input input_date">03.05</span></li>
		<li class="closed_num">12345677<span class="input input_closed">마감</span></li>
		<li class="num"><a href="javascript:void(0);">12345677</a><span class="input input_date">03.05</span></li>
	*/
	var mainParam = '';
	if(device.osName != 'iOS'){
		mainParam = getAlopexSession('mainParam');
	}else{
		mainParam = getAlopexCookie('mainParamCookie');
	}
 	var param = JSON.parse(mainParam);
//	console.log('444',param);
	var pr = {'list' : [{'bpCaList' : [param]}]};
//	console.log(pr);
//	console.log(JSON.stringify(pr));
//	console.log('2222');
	var endME = getAlopexSession('endME');
	httpSend("getMrSelfOrderBpCaInfo", pr, function(cb){
//		console.log('3333');
//		console.log('2222',cb);
		var popListStr = '';
		$.each(cb.list.bpCaMeResultList, function(i,el){
//			console.log(el);
			popListStr += '<li class="key_num"><a href="javascript:void(0);">'+Number(el.ca)+'</a><span class="input '+(el.meResult?'input_date':'input_no')+'">'+el.meResult+'</span></li>';
//			if(cb.list.bpCaMeResultList[])	{
				var popStr = '<h3>납입자번호</h3>'+
				'<span class="col_red">'+Number(el.ca)+'</span>'+
				'<span class="input input_date">'+(el.meResult==""?(endME=='false'?'미입력':'입력완료'):el.meResult)+'</span>';
				if(cb.list.bpCaMeResultList.length > 1) popStr += '<p class="small btn_input_num plusBTN"><button id="button_input_num">납입자번호 선택하기</button></p>';
				$('.box_type1').html(popStr);
//			}
    	});
		$('.popList').html(popListStr);
		completLoad();
	}, function(errorCode, errorMessage){
//		console.log('3333444');
		if (errorCode == "9999") {
			loge('error :: 9999 :: addBPCAList');
		} else {
			loge('error :: other :: addBPCAList');
		}
	});
}

$a.page(function(){	
    this.init = function(id,param){
    	logf('page on');
    };
});