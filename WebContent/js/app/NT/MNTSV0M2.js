var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MNTSV0M2';
var params = '';
var maxServCnt = 1;
var localCB = '';

function mainStart(){
	params = navigation.parameters;
	settingLoading();
	$('.imgloading').show();

	doPage();
}


function doPage(){
	$('.topLogoDiv').html(getTitleBp());

	var param = {
		"qestnrId" : params.svrNo
	};

	httpSend("getSurveyInfo", param, function(Mcb){	
		localCB = Mcb;
//		$('.noti_title').html(Mcb.sj);
//		$('.noti_dt').html(Mcb.rgs_de);
//		$('.noti_cont').html(addImgSrc(Mcb.cn));
		//
		var str = '';
		maxServCnt = Mcb.list.qestList.length;
		for(var i=0;i<Mcb.list.qestList.length;i++){
			var typeStr = Mcb.list.qestList[i].QESTN_TY=='A'?"(보기중 하나만 선택)":Mcb.list.qestList[i].QESTN_TY=='B'?"(다수 선택 가능)":"";
			str += '<div class="box_poll qlist'+(i+1)+'"><h2>'+Mcb.qustnrSj+'<span class="paging_poll">'+Mcb.list.qestList[i].QEST_NO+'/'+Mcb.qustnrCo+'</span></h2>';
			str += '<div class="inner">';
			str += '	<div class="paging">';
			str += '		<span style="width:'+(Number(Mcb.list.qestList[i].QEST_NO)/Number(Mcb.qustnrCo)*100)+'%">총 '+Mcb.qustnrCo+'개 설문조사 중 '+Mcb.list.qestList[i].QEST_NO+'번째 질문</span>';
			str += '	</div>';
			str += '	<div class="question">';
			str += '		<span class="num">'+Mcb.list.qestList[i].QEST_NO+'</span>';
			str += '		<p>'+Mcb.list.qestList[i].QESTN_SJ+typeStr+'</p>';
//			console.log(Mcb.list.qestList[i].QESTN_TY);
			str += '	</div>';
			//QUSTNR_QESITM_ID
			if(Mcb.list.qestList[i].QESTN_TY == "A"){
				str += '	<ul>';
				for(var j=0;j<Mcb.list.choiseitmList.length;j++){
					if(Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID == Mcb.list.qestList[i].QEST_NO){
						if(Mcb.list.choiseitmList[j].ETC_ANSWER_AT == 'Y'){
							str += '		<li><label for="ra'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'_'+j+'"><input type="radio" id="ra'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'_'+j+'" name="ra'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'" value="'+Mcb.list.choiseitmList[j].QUSTNR_IEM_ID+'" isEx="true" class="Radio" />기타</label> <input type="text" id="ex'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'_'+j+'" name="ex'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'" value="" class="input_txt" title="기타 내용 입력" maxlength="48"/></li>';
						}else{
							str += '		<li><label for="ra'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'_'+j+'"><input type="radio" id="ra'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'_'+j+'" name="ra'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'" value="'+Mcb.list.choiseitmList[j].QUSTNR_IEM_ID+'" isEx="false" class="Radio" />'+Mcb.list.choiseitmList[j].IEM_CN+'</label></li>';	
						}						
					}
				}
				str += '	</ul>';
			}else if(Mcb.list.qestList[i].QESTN_TY == "B"){
				str += '	<ul>';
				for(var j=0;j<Mcb.list.choiseitmList.length;j++){
					if(Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID == Mcb.list.qestList[i].QEST_NO){
						if(Mcb.list.choiseitmList[j].ETC_ANSWER_AT == 'Y'){
							str += '		<li><label for="chk'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'_'+j+'"><input type="checkbox" id="chk'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'_'+j+'" name="chk'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'" class="Checkbox" value="'+Mcb.list.choiseitmList[j].QUSTNR_IEM_ID+'" isEx="true" />기타</label> <input type="text" id="ex'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'_'+j+'" name="ex'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'" value="" class="input_txt" title="기타 내용 입력"  maxlength="48"/></li>';
						}else{
							str += '		<li><label for="chk'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'_'+j+'"><input type="checkbox" id="chk'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'_'+j+'" name="chk'+Mcb.list.choiseitmList[j].QUSTNR_QESITM_ID+'" class="Checkbox" value="'+Mcb.list.choiseitmList[j].QUSTNR_IEM_ID+'" isEx="false" />'+Mcb.list.choiseitmList[j].IEM_CN+'</label></li>';
						}
					}
				}
				str += '	</ul>';
			}else{
				str += '	<textarea id="text'+Mcb.list.qestList[i].QEST_NO+'" name="text'+Mcb.list.qestList[i].QEST_NO+'" value="" class="input_txt textarea" title="내용 입력" style="width:85%;" maxlength="248"></textarea></li>';
			}
			str += '</div>';
			str += '<p class="btn"><input type="hidden" value="'+Mcb.list.qestList[i].QEST_NO+'"/>';
			if(Mcb.list.qestList[i].QEST_NO != '1')	str += '<a href="javascript:void(0);" class="Button red2 big beforeQ">이전</a>';
			str += '<span id="pop_end_poll"><a href="javascript:void(0);" class="Button red2 big exitQ">설문 중단</a></span>';
			if(Mcb.list.qestList[i].QEST_NO != String(Mcb.list.qestList.length)){
				str += '<a href="javascript:void(0);" class="Button red2 big nextQ">다음</a>';
			}else{
				str += '<a href="javascript:void(0);" class="Button red2 big compQ">제출</a>';
			}
			str += '</p></div>';
		}
		
//		str += '<div class="content">';
		str += '	<div class="box_poll exitPop dispNone">';
		str += '		<h2>'+Mcb.qustnrSj+'<span class="paging_poll">'+Mcb.qustnrCo+'/'+Mcb.qustnrCo+'</span></h2>';
		str += '		<div class="inner">';
		str += '			<div class="question tac">';
		str += '				<p>설문 종료</p>';
		str += '			</div>';
		str += '			<p class="bg_poll_end">설문에 참여해 주셔서 <br />감사합니다.</p>';
		str += '			<p class="tac">보내주신 의견은 보다 편리한 도시가스 서비스를 <br />만드는데 적극 반영하도록 하겠습니다.</p>';
		str += '		</div>';
		str += '		<p class="btn"><a href="javascript:void(0);" class="Button red2 big lastExitBtn">목록보기</a></p>';
		str += '	</div>';
//		str += '</div>';
		//
		$('.content').html(str);
		
		$('.beforeQ').click(function(e){
			beforeQ(e.currentTarget.parentElement.children[0].value);
		});

		$('.exitQ').click(function(e){
			notiPop('설문중단','설문을 중단하시면, 이전에 입력하신 <br />답변 내용은 모두 삭제 됩니다.',true,false,{
				list : [{
					type : '',
					id : 'pCancelOK',
					name : '확인'
				},{
					type : 2,
					id : 'pCancelNO',
					name : '취소'
				}]
			});
			
			$('.pCancelOK').click(function(e){
				console.log(e);
				navigateGo('MNTSV0M1');
			});
			
			$('.pCancelNO').click(function(e){
				notiPopID.close();
			});
		});

		$('.nextQ').click(function(e){
			//검증
			var chkVal = e.currentTarget.parentElement.children[0].value;
			console.log(chkVal);
			if(localCB.list.qestList[Number(chkVal)-1].QESTN_TY=='B'){
				if($('[name = chk'+chkVal+']:checked').length > 0){
					var nextFlag = true;
					var ss2 = $('[name = chk'+chkVal+']:checked').length;
					console.log(ss2);
					for(var k=0;k<ss2;k++){
						var ss4 = jQuery($('[name = chk'+chkVal+']:checked'));
						var ss3 = jQuery(ss4[k]);
						if(ss3.attr('isex') == "true"){
							if($('#ex'+ss3.attr('id').substring(3)).val() == ""){
								nextFlag = false;
							}
						}
					}
					
					if(nextFlag){
						nextQ(chkVal);
					}else{
						notiPop('확인','기타 답변을 선택하신 경우<br/>내용을 입력 해 주세요.',true,false,null);
					}
				}else{
					notiPop('확인','현재 문항에 답변을 입력 해야<br/>다음으로 진행이 가능합니다.',true,false,null);
				}
			}else if(localCB.list.qestList[Number(chkVal)-1].QESTN_TY=='A'){
				if($('[name = ra'+chkVal+']:checked').length > 0){
					if($('[name = ra'+chkVal+']:checked').attr('isex') == "true"){
						var ss2 =$('[name = ra'+chkVal+']:checked').attr('id').substring(2);
						if($('#ex'+ss2).val() == ""){
							notiPop('확인','기타 답변을 선택하신 경우<br/>내용을 입력 해 주세요.',true,false,null);
						}else{
							nextQ(chkVal);
						}
					}else{
						nextQ(chkVal);
					}
				}else{
					notiPop('확인','현재 문항에 답변을 입력 해야<br/>다음으로 진행이 가능합니다.',true,false,null);
				}
			}else{
				
			}
		});
		//compQ
		$('.compQ').click(function(e){
			
			var lc = '';
			if(device.osName != 'iOS'){
				lc = JSON.parse(getAlopexSession('loginSession'));
			}else{
				lc = JSON.parse(getAlopexCookie('loginCookie'));
				//gclee login
//				lc = JSON.parse(getAlopexCookie('loginSession'));
			}
			var BPCA = JSON.parse(getAlopexCookie('MainBPCA'));
			var bp = getMainBP();
			console.log(lc);
			console.log(BPCA);
			var aCgc = bp.substring(0,1)+"000";
//			var aCgc = 'B000';
			var aLsc = BPCA.regiogroup;
			var aBp = BPCA.bp;
			var aCa = BPCA.ca;
			var aAddr = '';
			for(var i=0;i<lc.list.bpCaList.length;i++){
				if(lc.list.bpCaList[i].ca == BPCA.ca){
					aAddr = lc.list.bpCaList[i].addr;
				}
			}
			
			//answerList
			var paramCommit = { "list" : [{ "answerList": []}] };
			//ss =paramCommit;
			var pn = getAlopexCookie('uPhone');
			var arrNo = 0;
			for(var i=0;i<maxServCnt;i++){
				var qustnrIemId = '';		//선택 항목 키 - 주관식일 경우 : 0
				var etcAnswerCn = '';		//기타 답변 내용
				var sbjctAnswerCn = '';		//주관식 답변 내용
				if(localCB.list.qestList[i].QESTN_TY=='B'){				// 다수선택
					console.log(arrNo);
					console.log("1[chk"+(i+1)+","+localCB.list.qestList[i].QESTN_TY+"]");
					ss = $('[name = chk'+(i+1)+']:checked');
					for(var j=0;j<ss.length;j++){
						qustnrIemId = ss[j].value;
						if(jQuery(ss[j]).attr('isex') == "true"){
							etcAnswerCn = $('[name = ex'+(i+1)+']').val();
						}
						sbjctAnswerCn = '';
						
						paramCommit.list[0].answerList[arrNo] = {
							"qestnrId" : params.svrNo,
							"qustnrQesitmId" : localCB.list.qestList[i].QUSTNR_QESITM_ID,
				    		"respondId" : pn, 
				    		"qustnrIemId" : qustnrIemId,
				    		"etcAnswerCn" : etcAnswerCn,
				    		"sbjctAnswerCn" : sbjctAnswerCn,
				    		"respondCgc" : aCgc,
				    		"respondLsc" : aLsc,
				    		"respondBp" : aBp,
				    		"respondCa" : aCa,
				    		"respondAddr" : aAddr
						};
						arrNo = arrNo +1;
					}
				}else if(localCB.list.qestList[i].QESTN_TY=='A'){		// 택1
					console.log(arrNo);
					console.log("2[ra"+(i+1)+","+localCB.list.qestList[i].QESTN_TY+"]");
					qustnrIemId = $('[name = ra'+(i+1)+']:checked').val();
					if($('[name = ra'+(i+1)+']:checked').attr('isex') == "true"){
						etcAnswerCn = $('[name = ex'+(i+1)+']').val();
					}
					sbjctAnswerCn = '';
					paramCommit.list[0].answerList[arrNo] = {
						"qestnrId" : params.svrNo,
						"qustnrQesitmId" : localCB.list.qestList[i].QUSTNR_QESITM_ID,
			    		"respondId" : pn, 
			    		"qustnrIemId" : qustnrIemId,
			    		"etcAnswerCn" : etcAnswerCn,
			    		"sbjctAnswerCn" : sbjctAnswerCn,
			    		"respondCgc" : aCgc,
			    		"respondLsc" : aLsc,
			    		"respondBp" : aBp,
			    		"respondCa" : aCa,
			    		"respondAddr" : aAddr
					};
					arrNo = arrNo +1;
				}else{	// C : 주관식
					console.log(arrNo);
					console.log("3[text"+(i+1)+","+localCB.list.qestList[i].QESTN_TY+"]");
					qustnrIemId = '0';
					etcAnswerCn = '';
					sbjctAnswerCn = $('[name = text'+(i+1)+']').val();
					paramCommit.list[0].answerList[arrNo] = {
						"qestnrId" : params.svrNo,
						"qustnrQesitmId" : localCB.list.qestList[i].QUSTNR_QESITM_ID,
			    		"respondId" : pn, 
			    		"qustnrIemId" : qustnrIemId,
			    		"etcAnswerCn" : etcAnswerCn,
			    		"sbjctAnswerCn" : sbjctAnswerCn,
			    		"respondCgc" : aCgc,
			    		"respondLsc" : aLsc,
			    		"respondBp" : aBp, 
			    		"respondCa" : aCa,
			    		"respondAddr" : aAddr
					};
					arrNo = arrNo +1;
				}
			}
			console.log(paramCommit);
			//putSurveyInfo
			httpSend("putSurveyInfo", paramCommit, function(Mcb){
//				alert('save');
//				console.log(Mcb);
				for(var i=0;i<maxServCnt;i++){
					$('.qlist'+(i+1)).hide();
				};
				$('.exitPop').show();
			}, function(errorCode, errorMessage){
				//completLoad();
				//setDefault();
				if (errorCode == "9999") {
					loge('error :: 9999 :: main');
				} else {
					loge('error :: other :: main');
				}
			});
		});
		
		$('.lastExitBtn').click(function(){
			navigateGo('MNTSV0M1');
		});
		
		console.log(Mcb);
		completLoad();
		showQ(1);
		setDefault();
	}, function(errorCode, errorMessage){
		completLoad();
		setDefault();
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
}

function showQ(no){
	// 초기화
	for(var i=0;i<maxServCnt;i++){
		$('.qlist'+(i+1)).hide();
	};
	$('.qlist'+no).show();
}

function nextQ(no){
	// 검증
	showQ(Number(no)+1);
}

function beforeQ(no){
	// 초기화
	showQ(Number(no)-1);
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});
