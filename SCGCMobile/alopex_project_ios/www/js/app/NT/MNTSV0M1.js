var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MNTSV0M1';
var params = '';
var svNo = '';
var ss = '';

function mainStart(){
	settingLoading();
	$('.imgloading').show();
	
	doPage();
}

function doPage(){
	$('.topLogoDiv').html(getTitleBp());
	//box_poll
	var bp = getMainBP();
	var pn = getAlopexCookie('uPhone');
	var ss2 = bp.substring(0,1)+"000";
//	var ss2 = 'B000';
	var param = {
		"cgcSe" : ss2,
		"phoneNum" : pn
	};
	httpSend("getSurveyList", param, function(Mcb){
		console.log(Mcb);
		/*
		 <h2>도시가스 서비스 이용 행태 조사</h2>
				<div class="inner">
					<p class="date">설문조사 기간 : 2015-06-01 ~ 2015-06-31</p>
					<p>도시가스 서비스 중 주로 이용하는 기능과 요금 결제 방식에 대한 설문 조사 입니다.</p>
				</div>
				<p class="btn"><a href="#" class="Button red big">설문 참여</a></p>
		 */
		console.log(Mcb.list.surveyList.length);
		if(Mcb.list.surveyList.length == undefined){
			completLoad();
			setDefault();
		}else{
			var str = '';
			for(var i=0;i<Mcb.list.surveyList.length;i++){
				/*
				 * QUSTNR_CO
				 * RESPOND_AT
				 */
				str += '<div class="box_poll"><h2>'+Mcb.list.surveyList[i].QUSTNR_SJ+'</h2>';
				str += '<div class="inner">';
				str += '	<p class="date">설문조사 기간 : '+Mcb.list.surveyList[i].QUSTNR_BGNDE+' ~ '+Mcb.list.surveyList[i].QUSTNR_ENDDE+'</p>';
				str += '	<p>'+Mcb.list.surveyList[i].QUSTNR_CN+'(총 '+Mcb.list.surveyList[i].QUSTNR_CO+'문항)</p>';
				str += '</div>';
				str += '<p class="btn">';
				//RESPOND_AT
				if(Mcb.list.surveyList[i].RESPOND_AT == 'N'){
					str += '<a href="javascript:void(0);" class="Button red big goSv"><input type="hidden" value="'+Mcb.list.surveyList[i].QESTNR_ID+'"/>설문 참여</a>';
				}else{
					str += '<a href="javascript:void(0);" class="Button red2 big"><input type="hidden" value="'+Mcb.list.surveyList[i].QESTNR_ID+'"/>작성 완료</a>';
				}
				str += '</p></div>';
			}
			$('.content').html(str);
			
			$('.goSv').click(function(e){
				var param = {
					pageId : 'MNTSV0M2',
					parameters : {
						svrNo : e.currentTarget.childNodes[0].value
					},
					autoDismiss: false
				};
				navigation.navigate(param);
			});
			completLoad();
			setDefault();
			
		}
		
	}, function(errorCode, errorMessage){
		completLoad();
		setDefault();
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
	
//	completLoad();
//	setDefault();
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});
