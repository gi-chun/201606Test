/***
 * date : 2015-05-19
 * pg : jys
 * note : 
 * 1. 내용 입력
 */

document.addEventListener('alopexready', mainStart);

nowPGCode = 'MBLMG0M0';
var ss = '';
var params = '';
var currentCa = '';
var pinId = '';
function mainStart(){
	setEventListner();
	
	doPage();
}

function setEventListner(){    	
//	var $p1 = $('.pop_input_num'),
//    $p2 = $('.pop_input_save');
//    // i = 0;
//
//      $('body').on('click', '.small', function(e) {
//          e.preventDefault();
//          var popup = $(this).hasClass('btn_input_num','btn_save') ? $p1 : $p2,
////              content = $('.content'),
//              self = $(this);
//          popup.bPopup(self.data('bpopup') || {});
//      });
      
	// gclee bill 청구서 보기전 암호입력 구현취소됨, 아래 삭제해도 무관
//	$('#closeBtnExit').click(function() {
//		popBillCerti.close();
//	});

	$('#closeBtnExitSave').click(function() {
		popBillCertiSave.close();
		navigateBackToNaviGo('MMNPG0M0');
	});
	
	$('#closeBtnExitPer').click(function() {
		popBillCerti.close();
		navigateBackToNaviGo('MMNPG0M0');
		
	});
	
	$('#closeBtnExitCom').click(function() {
		popBillCerti.close();
		navigateBackToNaviGo('MMNPG0M0');
	});
	
	$('#bill_Certi_save_rego').click(function() {
		popBillCerti.close();
		
		popBillCertiSave = $('.bill_certi_save').bPopup({
			opacity : 0.6,
			speed : 300,
		});
		
	});
	
	// 청구서 인증번호 저장클릭 후 처리
	$('#bill_certi_save_ok').click(function() {
		
		fSaveCerti();
		
	});

	// 청구서 인증 확인클릭 후 처리
	$('#bill_perCerti_ok').click(function() {
		
		fCerti();
		
	});
	
	$('#bill_comCerti_ok').click(function() {
		
		fCerti();
		
	});
	
	// 청구서 인증번호 다시 저장 클릭
	$('#bill_perCerti_save_rego').click(function() {
		
		popBillCerti.close();
		
		popBillCertiSave = $('.bill_certi_save').bPopup({
			opacity : 0.6,
			speed : 300,
		});
		
	});
	
	$('#bill_comCerti_save_rego').click(function() {
		
		popBillCerti.close();
		
		popBillCertiSave = $('.bill_certi_save').bPopup({
			opacity : 0.6,
			speed : 300,
		});
		
	});
	//gclee bill end
    
      
};

function goMenuBLMG02(){
	navigateBackToNaviGo('MBLMG1M0');
};

function onScreenBack(){
	doPage();	
}

function doPage(){
	if(device.osName != 'iOS'){
		params = JSON.parse(getAlopexSession('loginSession'));
	}else{
		params = JSON.parse(getAlopexCookie('loginCookie'));
		//gclee login
//		params = JSON.parse(getAlopexSession('loginSession'));
	}
	var chkBPCA = getMainBPCA();
	if(chkBPCA == 'undefined'){
		currentCa = Number(params.list.bpCaList[0].ca);
	}else{
		var useBPCA = JSON.parse(chkBPCA);
		currentCa = Number(useBPCA.ca);
	}
	
	//gclee push
	$('.topLogoDiv').html(getTitleBp());
	
	
	logf('jysjys',params);
	
	viewBillList();
	
	//gclee bill ###################################################################################################
	//gclee 청구서 보기전 암호입력 구현삭제됨, 아래내용 주석처리
	/*var vIsPerson;
	vIsPerson = true;
	
	var vBillPerCertiNo = getAlopexCookie('billPerCertiNo');
	var vBillComCertiNo = getAlopexCookie('billComCertiNo');
	
	$('#bill_perCerti_save_rego').hide();
	$('#bill_comCerti_save_rego').hide();
	
	if(vBillPerCertiNo == 'undefined' && vBillComCertiNo == 'undefined'){
		
		popBillCertiSave = $('.bill_certi_save').bPopup({
			opacity : 0.6,
			speed : 300,
		});
		
	}else{
		
		if(vBillPerCertiNo.length > 0){
			//개인고객
			vIsPerson = true;
		}else{
			//기업고객
			vIsPerson = false;
		}
		
		if(vIsPerson){
			
			popBillCerti = $('.bill_perCerti').bPopup({
				opacity : 0.6,
				speed : 300,
			});
			
		}else{
			
			popBillCerti = $('.bill_comCerti').bPopup({
				opacity : 0.6,
				speed : 300,
			});
			
		}
	}*/

	//gclee bill end ###################################################################################################
	
}

//gclee bill
function fSaveCerti() {
	
//	perCertiNo
//	perCertiNoRe
//	comCertiNo
//	comCertiNoRe
	
	var vIsPerson;
	var vPerCertiSaveNo = $('#perCertiSaveNo').val();
	var vPerCertiNoRe = $('#perCertiNoRe').val();
	var vComCertiSaveNo = $('#comCertiSaveNo').val();
	var vComCertiNoRe = $('#comCertiNoRe').val();
	
	$('#bill_perCerti_save_rego').hide();
	$('#bill_comCerti_save_rego').hide();
	
	// gcee bill test
	
	if( vPerCertiSaveNo.length > 0 && vComCertiSaveNo > 0){
		$('#erroDescSave').text("개인고객 또는 기업고객 둘중 하나만 입력해 주십시요.");
		$('#perCertiSaveNo').val('');
		$('#perCertiNoRe').val('');
		$('#comCertiSaveNo').val('');
		$('#comCertiNoRe').val('');
		
		return;
	}
	
	vIsPerson = true;
	if( vPerCertiSaveNo.length > 0 ){
		vIsPerson = true;
	}else{
		vIsPerson = false;
	}
	
	if(vIsPerson){
		
		if (vPerCertiSaveNo.length < 6) {
			$('#erroDescSave').text("생년월일 6자리 숫자를 정확히 입력해주세요.");
			
		} else if (vPerCertiSaveNo != vPerCertiNoRe) {

			$('#erroDescSave').text("입력하신 내용이 일치하지 않습니다.");
		
		} else {
			// alert(billCertiNo);
			setAlopexCookie('billPerCertiNo', vPerCertiSaveNo);
			setAlopexCookie('billComCertiNo', '');

			popBillCerti = $('.bill_perCerti').bPopup({
				opacity : 0.6,
				speed : 300,
			});
			
//			notiPop('인증번호 등록 성공', '인증번호가 저장되었습니다.',false, false, {
//						list : [ {
//							type : 2,
//							id : 'pViewBillOk',
//							name : '인증번호 입력 계속'
//						} ]
//					});
//
//			$('.pViewBillOk').click(function() {
//				notiPopID.close();
//
//				popBillCerti = $('.bill_perCerti').bPopup({
//					opacity : 0.6,
//					speed : 300,
//				});
//			});
			
			popBillCertiSave.close();
		}
		
	}else{
		
		if (vComCertiSaveNo.length < 10) {
			$('#erroDescSave').text("사업자번호 10자리 숫자를 정확히 입력해주세요.");
			
		} else if (vComCertiSaveNo != vComCertiNoRe) {

			$('#erroDescSave').text("입력하신 내용이 일치하지 않습니다.");

		} else {
			// alert(billCertiNo);
			setAlopexCookie('billComCertiNo', vComCertiSaveNo);
			setAlopexCookie('billPerCertiNo', '');

			popBillCertiSave.close();
			
			popBillCerti = $('.bill_comCerti').bPopup({
				opacity : 0.6,
				speed : 300,
			});
			
//			notiPop('인증번호 등록 성공', '인증번호가 저장되었습니다.',false, false, {
//						list : [ {
//							type : 2,
//							id : 'pViewBillOk',
//							name : '인증번호 입력 계속'
//						} ]
//			});
//
//			$('.pViewBillOk').click(function(){
//				notiPopID.close();
//
//				
//				popBillCerti = $('.bill_comCerti').bPopup({
//					opacity : 0.6,
//					speed : 300,
//				});
//			});
			
			
		}
	}
	
}


function fCerti() {
	
var vIsPerson;
vIsPerson = true;

var vBillPerCertiNo = getAlopexCookie('billPerCertiNo');
var vBillComCertiNo = getAlopexCookie('billComCertiNo');

	
if(vBillPerCertiNo.length > 0){
	//개인고객
	vIsPerson = true;
}else{
	//기업고객
	vIsPerson = false;
}
	
var certiNo = '';
var saveCertiNo = '';

if(vIsPerson){
	
	certiNo = $('#perCertiNo').val();
	saveCertiNo = getAlopexCookie('billPerCertiNo');
	
}else{
	
	certiNo = $('#comCertiNo').val();
	saveCertiNo = getAlopexCookie('billComCertiNo');
}
	
if (certiNo.length < 1) {
	$('#erroDescPer').text("입력하신 내용이 일치하지 않습니다. 다시 입력 해 주세요.");
	$('#erroDescCom').text("입력하신 내용이 일치하지 않습니다. 다시 입력 해 주세요.");

} else if (saveCertiNo != certiNo) {
		
	$('#erroDescPer').text("입력하신 내용이 일치하지 않습니다. 다시 입력 해 주세요.");
	$('#erroDescCom').text("입력하신 내용이 일치하지 않습니다. 다시 입력 해 주세요.");
	
	$('#bill_perCerti_save_rego').show();
	$('#bill_comCerti_save_rego').show();
	
} else {
	
	popBillCerti.close();

	notiPop('청구서보기 인증 성공', '청구서보기 인증되었습니다.', false,
			false, {
				list : [ {
					name : '청구서보기 계속',
					id : 'pViewBill',
					type : ''
				} ]
			});
	// 청구서보기 인증 및 청구서보기 페이지 이어 하기
	$('.pViewBill').click(function() {

				notiPopID.close();

				// //////////////////////////////
				if (billNo == '') {
					navigateBackToNaviGo('MBLMG0M0');
				} else {
					var rtMsg = {
						'bp' : bp,
						'ca' : ca,
						'DOC_HEADER_OPBEL' : billNo,
						'isCertiPass' : '1'            //gclee bill isCertiPass is 1  pass pass
					};
					// navigateGo('MBLMG0M2',rtMsg);
					navigateBackToNaviParamGo(
							'MBLMG0M2', rtMsg);
				}
				// //////////////////////////////

			});

}
	
}
//gclee bill end

function viewBillList(){
	var buymInfo = getBuym(currentCa);
	var box_type1Str = '<h3>납입자번호</h3>'+
	'<span class="col_red">'+currentCa+'</span>';
	if(Number(buymInfo.betrw) > 0) box_type1Str += '<span class="input input_no">미납</span>';
	if(params.list.bpCaList.length > 1) box_type1Str += '<p class="small btn_input_num showPlus"><button id="button_input_num">납입자번호 선택하기</button></p>';
	$('.box_type1').html(box_type1Str);
	//$('.topBoxCaList').html(Number(currentCa));

	
	if(params.list.bpCaList.length < 2){
		$('.showPlus').hide();
	}else{
		var popCaListStr = '';
    	for(var i=0;i<params.list.bpCaList.length;i++){
    	//	var buymInfo = getBuym(cb.list.billResultList[i].CANO);
    		popCaListStr += '<li class="'+(currentCa == Number(params.list.bpCaList[i].ca)?'key_':'')+'num goBillInfo"><input type="hidden" value="'+params.list.bpCaList[i].regiogroup+','+params.list.bpCaList[i].bp+','+params.list.bpCaList[i].ca+','+params.list.bpCaList[i].sernr+','+params.list.bpCaList[i].anlage+'"/><a href="javascript:void(0);">'+Number(params.list.bpCaList[i].ca)+'</a>';
    		if(Number(params.list.bpCaList[i].betrw) > 0) popCaListStr += '<span class="input long input_no">미납</span>';
    		popCaListStr += '</li>';
    	}
    	$('.popCaList').html(popCaListStr);
	}
	
	$('.showPlus').click(function(){
		//console.log('1111');
		pinId = $('.pop_input_num').bPopup({
			opacity: 0.6,
			speed: 300,
		});
	});
	
	$('.goBillInfo').click(function(event){
		var s1 = jQuery(event.currentTarget);
//		var s2 = s1.children('a')[0].text;
		//ss = s1;
		var Str1 = s1.children('input')[0].value;
		var Str2 = Str1.split(',');
		var Str3 = {
				bp : Str2[1],
				ca : Str2[2],
				sernr : Str2[3],
				anlage : Str2[4],
				regiogroup : Str2[0]
		};
		currentCa = Number(Str2[2]);
		setAlopexSession('SessionBP',Str2[0]);
		setAlopexSession('SessionBPCA',JSON.stringify(Str3));
		putGlobalPreference('selectedBp', Str2[0]);
		putGlobalPreference('selectedBpCa', JSON.stringify(Str3));
		
		viewBillList();
		pinId.close();
	});

	viewBillInfo();
}

function viewBillInfo(){
	//gclee login token
	var param = {
//			"bp" : '14641452',	"ca" : '15527726'
			"bp" : String(Number(params.list.bpCaList[0].bp)),	
			"ca" : String(Number(params.list.bpCaList[0].ca)),
			"token" : getAlopexCookie('loginToken')
	};
//	var param = {
////			"bp" : '14641452',	"ca" : '15527726'
//			"bp" : String(Number(params.list.bpCaList[0].bp)),	
//			"ca" : String(Number(params.list.bpCaList[0].ca))
//	};
	
	//gclee login token
	logf('gclee MBLMG0M0 ' + JSON.stringify(param));
	
	var param2 = JSON.parse(JSON.stringify(param));
	param2.list = [{'bpCaList' : []}];
	for(var i=0;i<params.list.bpCaList.length;i++){
		if(i==0){
			param2.mbtlnum = getAlopexCookie('uPhone');
		}
		param2.list[0].bpCaList[i] = {
				"bp" : String(Number(params.list.bpCaList[i].bp)),	
				"ca" : String(Number(params.list.bpCaList[i].ca))
		};
		if(Number(params.list.bpCaList[i].ca) == currentCa){
			param2.bp = String(Number(params.list.bpCaList[i].bp));
			param2.ca = String(Number(params.list.bpCaList[i].ca));
		}
	}
	logf(param2);
	setDefault();
	
	
	httpSend("getBillList", param2, function(cb){
		logf(cb);
		logf(cb.list.billResultList);
		
		//gclee login token
//		if(cb.isTokenTrue == 'false'){
//			notiPop('확인','비정상 접근입니다. <br />초기화면으로 이동하겠습니다.',true,false,null);
//			navigateGo('MACHP0M0');
//			return;
//		}
		//gclee login token end
		
		if(cb.list.billResultList == undefined){
			//console.log('################################################');
			var contStr = '<li class="view_cont">청구 내역이 없습니다.</li>';
			$('.boxList').html(contStr);
		}else{
			var contStr = '';
			for(var i=0;i<cb.list.billResultList.length;i++){
				var buymInfo = getBuym(cb.list.billResultList[i].CANO);
				contStr += '<li class="view_cont">'+
				'	<a href="javascript:void(0);" class="view_cont_Detail">'+
				'<input type="hidden" value="'+cb.list.billResultList[i].DOC_HEADER_OPBEL+'"/>'+
				'		<div>'+
				'			<p class="form_title">'+cb.list.billResultList[i].BUDAT_YEAR+'년 '+cb.list.billResultList[i].BUDAT_MONTH+'월 청구서</p>'+
				'			<p class="form_view px0">'+chkBillNo(cb.list.billResultList[i].DOC_HEADER_OPBEL)+'</p>'+
				'		</div>'+
				'		<div class="pt10">';
				if(i==0) contStr += '			<p class="form_closed">'+(Number(buymInfo.betrw) > 0?'<span class="bg_green">미납</span>':'')+' 납부마감일 <span class="col_red">'+cb.list.billResultList[i].FAEDN+'</span></p>';
				contStr += '			<p class="form_price">'+cb.list.billResultList[i].ZBTRANS_99+'원</p>'+
				'		</div>'+
				'	</a>';
				if(i==0){
					if(device.osName != 'iOS'){
						params = JSON.parse(getAlopexSession('loginSession'));
					}else{
						params = JSON.parse(getAlopexCookie('loginCookie'));
						//gclee login
//						params = JSON.parse(getAlopexSession('loginSession'));
					}
					var chkBPCA = getMainBPCA();
					if(chkBPCA == 'undefined'){
						currentCa = Number(params.list.bpCaList[0].ca);
					}else{
						var useBPCA = JSON.parse(chkBPCA);
						currentCa = Number(useBPCA.ca);
					}
					var buymInfo = getBuym(currentCa);
					if(Number(buymInfo.betrw) > 0){
						contStr += '	<p class="tac pt10"><a href="javascript:goMenuBLMG02();" class="Button red2 big" >납부하기</a></p>';
					}else{
						contStr += '	<p class="tac pt10"><a href="javascript:void(0);" class="Button red2 big" >납부완료</a></p>';
					}
				}
				contStr += '</li>';
			}
			$('.boxList').html(contStr);
			$('.view_cont_Detail').click(function(th){
				//ss = th;
				//gclee bill
				logf(th.currentTarget.childNodes[0].value);
				var param = {
						bp : param2.bp,
						ca : param2.ca,
						DOC_HEADER_OPBEL : th.currentTarget.childNodes[0].value
//						'isCertiPass' : '1'
				};
//				navigateGo('MBLMG0M2',param);
				navigateBackToNaviParamGo('MBLMG0M2',param);
				
				//gclee bill end
				
		    });
		};
		
	}, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
}

function getBuym(ca){
	try{
		for(var i=0;i<params.list.bpCaList.length;i++){
			if(Number(params.list.bpCaList[i].ca) == Number(ca)){
				var rt = {
						'buym' : params.list.bpCaList[i].buym,
						'betrw' : params.list.bpCaList[i].betrw
				};
				
				return rt;
			}
		}
		var rt = {
				'buym' : '',
				'betrw' : '0'
		};
		return rt;
	}catch(e){
		var rt = {
				'buym' : '',
				'betrw' : '0'
		};
		return rt;
	};
}

$a.page(function(){
	
    this.init = function(id,param){
    	logf('page on');
    };
   
});