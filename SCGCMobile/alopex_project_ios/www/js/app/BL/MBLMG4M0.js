/***
 * date : 2015-05-19
 * pg : jys
 * note : 
 * 1. 내용 입력
 */

document.addEventListener('alopexready', mainStart);

nowPGCode = 'MBLMG4M0';
var ss = '';
var params = '';
var currentCa = '';
var pinId = '';

var gPaiedList;

var vOrderName;
var vOrderNumber;
var vAmount;
var vGoodName;
var vPhoneNo;
var vCardCode;
var vBPCode;
var vConnectURL;
var ispParams = '';
var vExpYear = '2049';
var vExpMon = '12';


function mainStart(){
	setEventListner();
	
	//ios IPS 결제요청
	ispParams = alopexController.parameters;
	
	logf('gclee MBLMG4M0 ###########################################1');
	
	if(ispParams == 'undefined' || ispParams == ''){
		logf('gclee MBLMG4M0 ###########################################2');
        	doPage();
		
	}else{
        
        ispParams = '';
		goRequestISPPayIOS();
		
	}
	

}

function goRequestISPPayIOS(){
	//gclee card
	var paymentListCookie = getAlopexCookie('paymentList');
	if(paymentListCookie == 'undefined'){
		return;
	}

	logf('gclee MBLMG4M0 ###########################################2');
	
	var paymentCookieLists = JSON.parse(paymentListCookie);
	var vtAmount = getAlopexCookie('tAmount');
	var vInstallment = getAlopexCookie('vInstallment');
	var vTERM_ID = getAlopexCookie('TERM_ID');
	
  	//showProgressBarMsg('정보를 처리중입니다.');
	
	var tISP_TID = getAlopexCookie('ISP_TID');
	
	var param = {
				"certiGubun" : 'I',	
				"RGUBUN" : '03',
				"CANO" : JSON.parse(getAlopexCookie('MainBPCA')).ca,
				"expyear" : vExpYear,
				"expmon" : vExpMon,
				"installment" : vInstallment,
				"amount" : vtAmount,
				"expdt" :  vExpYear.substring(2) + vExpMon,
				"clientIp" : '',
				"termID" : vTERM_ID,
				"TID" : tISP_TID
	};
	
	logf('gclee goRequestISPPay MBLMG3M0 ' + JSON.stringify(param));
	
	var param2 = JSON.parse(JSON.stringify(param));
	param2.list = [{'payList' : []}];
	
	for(var i=0;i<paymentCookieLists.length;i++){
		
		param2.list[0].payList[i] = {
				"BP_ADDRESS" : paymentCookieLists[0].BP_ADDRESS,	
				"NAME_LAST" : paymentCookieLists[0].NAME_LAST,
				"DATA_TOTAL" : paymentCookieLists[0].DATA_TOTAL,
				"TOTAL_AMOUNT" : paymentCookieLists[0].TOTAL_AMOUNT,
				"TOTAL_CARD_AM" : paymentCookieLists[0].TOTAL_CARD_AM,
				"BUKRS" : paymentCookieLists[0].BUKRS,
				"BUTXT" : paymentCookieLists[0].BUTXT,
				"STCD2" : paymentCookieLists[0].STCD2,
				"COM_ADDRESS" : paymentCookieLists[0].COM_ADDRESS,
				"TEL_NUMBER" : paymentCookieLists[0].TEL_NUMBER,
				"LDO_CODE" : paymentCookieLists[0].LDO_CODE,
				"SEQ" : paymentCookieLists[0].SEQ,
				"GPART" : paymentCookieLists[0].GPART,
				"VKONT" : paymentCookieLists[0].DVKONT,
				"OPBEL" : paymentCookieLists[0].OPBEL,
				"FAEDN" : paymentCookieLists[0].FAEDN,
				"STATUS" : paymentCookieLists[0].STATUS,
				"BETRW" : paymentCookieLists[0].BETRW,
				"BETRZ" : paymentCookieLists[0].BETRZ,
				"CDSNG" : paymentCookieLists[0].CDSNG,
				"CCINS" : paymentCookieLists[0].CCINS,
				"CCDNO" : paymentCookieLists[0].CCDNO,
				"CSI_DATE" : paymentCookieLists[0].CSI_DATE,
				"CSI_TIME" : paymentCookieLists[0].CSI_TIME,
				"CSINO" : paymentCookieLists[0].CSINO,
				"CUHYY" : paymentCookieLists[0].CUHYY,
				"CUHMM" : paymentCookieLists[0].CUHMM,
				"ALLO_MONTH" : paymentCookieLists[0].ALLO_MONTH,
				"VAN_TR" : paymentCookieLists[0].VAN_TR
		};
		
	}

	logf('gclee goRequestISPPay  param2 MBLMG4M0 ' + JSON.stringify(param2));
	
	httpSend("putPayList", param2, function(cb2){

		//hideProgressBar();
		
		if(cb2.resultYn == 'Y'){
			
			notiPop('확인','ISP 결제가 완료되었습니다.',true,false,null);
			setCookieKill('paymentList');
			setCookieKill('tAmount');
			setCookieKill('vInstallment');
			
		}else{
			notiPop('확인','ISP 결제가 실패했습니다.',true,false,null);
			setCookieKill('paymentList');
			setCookieKill('tAmount');
			setCookieKill('vInstallment');
			navigateBackToNaviGo('MBLMG3M0');
		}
             
             doPage();
		
	}, function(errorCode, errorMessage){
		//hideProgressBar();
             
             doPage();
		
		if (errorCode == "9999") {
			loge('error :: 9999 :: hsUsrCommit');
			alert('처리에 실패했습니다.\n다시 요청바랍니다.');
		} else {
			loge('error :: other :: hsUsrCommit');
			alert('처리에 실패했습니다.\n다시 요청바랍니다.');
		}
	});

};

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
	
};

function refrash(){
	navigateGo('MBLMG4M0');//MBLMG4M0
}

//gclee card - ing
function popCardResult(ss){
	
	//1:취소(처음위치), 2:결제성공(결제목록화면이동), 3:결제실패(결제실패하였습니다. 다시 시도하십시요! alert)
	
	logf('popCardResult param = ' + ss);
	
	if(ss == '1'){
		//1:취소(처음위치)
		refrash();
		
	}else if(ss == '2'){
		//2:결제성공
		navigateBackToNaviGo('MBLMG4M0');
		
	}else if(ss == '3'){
		//3:결제실패
		//alert
		refrash();
		
		popPayFail = $('.confirm_payFail').bPopup({
			opacity : 0.6,
			speed : 300,
		});	
		 
	}    
}

function goMenuBLMG02(){
	
	//결제취소
	var pCardCode = '';
	
	logf(gPaiedList);
	logf(gPaiedList.list.resultList);
	
	logf('gclee MBLMG4M0 goMenuBLMG02 수납내역 : ' + gPaiedList.list.resultList);
	
	//여러 수납 선택건 확인
	//check select
	var checkCount = 0;
	var tempStr;
	var i=0;
	
	checkCount = $('[name=chkc0]:checked').length;
	
	logf('gclee MBLMG4M0 goMenuBLMG02 checked count : ' + checkCount);
	
	if( checkCount < 1){
		notiPop('확인','결제취소대상을 선택해 주십시요.',true,false,null);
		return;
	}
	
	if( checkCount > 1){
		notiPop('확인','결제취소 대상은 한건만 가능합니다. ',true,false,null);
		return;
	}
	
	var isNoOld = false;
	
	var tempIndex = 0;
	var paymentList = new Array();
	
	var s1 = $('[name=chkc0]:checked')[0].value;
	paymentList.push(gPaiedList.list.resultList[s1]);
	
	pCardCode = gPaiedList.list.resultList[s1].CCINS;
	pCardCode = getRealCardCodeTest(pCardCode);
	var vPayType = getPayType(pCardCode);
	
	vConnectURL = getCardPayURL(pCardCode);

	var chkBPCA = getMainBPCA();
	var useBPCA = JSON.parse(chkBPCA);
	vBPCode = useBPCA.regiogroup;
	vBPCode = vBPCode.substring(0, 1) + "000";

	logf("vBPCode : " + vBPCode);

	vAmount = gPaiedList.list.resultList[s1].BETRZ;
	vGoodName = gPaiedList.list.resultList[s1].BUTXT;
	vPhoneNo = getAlopexCookie('uPhone');
	
	if( vPayType == 'MPI'){
	
		var option = {
			"ordername" : "",
			"ordernumber" : "",
			"amount" : vAmount,
			"goodname" : vGoodName, // bpname
			"phoneno" : vPhoneNo,
			"cardCode" : pCardCode,
			"BPCode" : vBPCode,
			"connectURL" : vConnectURL,
			"CANO" : JSON.parse(getAlopexCookie('MainBPCA')).ca,
			"TERM_ID" : gPaiedList.list.cardStoreInfoList[s1].TERM_ID,
			"installment" : gPaiedList.list.cardStoreInfoList[s1].ALLO_MONTH,
			"RGUBUN" : "07",
			"payListCount" : paymentList.length
		};

		logf("vPhoneNo : " + vPhoneNo);
		logf("vOrderName : " + vOrderName);
		logf("vOrderNumber : " + vOrderNumber);
		logf("vAmount : " + vAmount);
		logf("vGoodName : " + vGoodName);
		logf("vCardCode : " + vCardCode);
		logf("vBPCode : " + vBPCode);
		logf("vConnectURL : " + vConnectURL);

		logf("paymentList : " + JSON.stringify(paymentList));

		if (device.osName != 'iOS') {
			jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON
					.stringify(option), JSON.stringify(paymentList),
					"popCardResult", "refrash");
		} else {
			jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON
					.stringify(option), JSON.stringify(paymentList),
					"popCardResult");
		}    
	}else{ //ISP
		
		//gclee card
		logf('gclee MBLMG4M0 ISP 결제취소 : ' + JSON.stringify(paymentList));

	  	showProgressBarMsg('정보를 처리중입니다.');
		
	  	var param = {
					"certiGubun" : 'I',	
					"RGUBUN" : '07',
					"CANO" : JSON.parse(getAlopexCookie('MainBPCA')).ca,
					"expyear" : gPaiedList.list.cardStoreInfoList[s1].CUHYY,
					"expmon" : gPaiedList.list.cardStoreInfoList[s1].CUHMM,
					"installment" : gPaiedList.list.cardStoreInfoList[s1].ALLO_MONTH,
					"amount" : vAmount,
					"clientIp" : '',
					"termID" : gPaiedList.list.cardStoreInfoList[s1].TERM_ID
		};
		
		//gclee login token
		logf('gclee goMenuBLMG02 MBLMG4M0 ' + JSON.stringify(param));
		
		var param2 = JSON.parse(JSON.stringify(param));
		param2.list = [{'payList' : []}];
		
		//도기가스앱에서 결제하지 않은 건은 결제 하실 수 없습니다. 
		//도시가스 APP에서 결제하신 내역만 취소가 가능합니다. 
		 if( paymentList[0].VAN_TR == ''){
			 hideProgressBar();
			 notiPop('확인','도시가스 APP에서 결제하신 내역만 취소가 가능합니다.',true,false,null);
			 return;
		 }
			 
		for(var i=0;i<paymentList.length;i++){
			
			param2.list[0].payList[i] = {
					"BP_ADDRESS" : paymentList[0].BP_ADDRESS,	
					"NAME_LAST" : paymentList[0].NAME_LAST,
					"DATA_TOTAL" : paymentList[0].DATA_TOTAL,
					"TOTAL_AMOUNT" : paymentList[0].TOTAL_AMOUNT,
					"TOTAL_CARD_AM" : paymentList[0].TOTAL_CARD_AM,
					"BUKRS" : paymentList[0].BUKRS,
					"BUTXT" : paymentList[0].BUTXT,
					"STCD2" : paymentList[0].STCD2,
					"COM_ADDRESS" : paymentList[0].COM_ADDRESS,
					"TEL_NUMBER" : paymentList[0].TEL_NUMBER,
					"LDO_CODE" : paymentList[0].LDO_CODE,
					"SEQ" : paymentList[0].SEQ,
					"GPART" : paymentList[0].GPART,
					"VKONT" : paymentList[0].DVKONT,
					"OPBEL" : paymentList[0].OPBEL,
					"FAEDN" : paymentList[0].FAEDN,
					"STATUS" : paymentList[0].STATUS,
					"BETRW" : paymentList[0].BETRW,
					"BETRZ" : paymentList[0].BETRZ,
					"CDSNG" : paymentList[0].CDSNG,
					"CCINS" : paymentList[0].CCINS,
					"CCDNO" : paymentList[0].CCDNO,
					"CSI_DATE" : paymentList[0].CSI_DATE,
					"CSI_TIME" : paymentList[0].CSI_TIME,
					"CSINO" : paymentList[0].CSINO,
					"CUHYY" : paymentList[0].CUHYY,
					"CUHMM" : paymentList[0].CUHMM,
					"ALLO_MONTH" : paymentList[0].ALLO_MONTH,
					"VAN_TR" : paymentList[0].VAN_TR
			};
			
		}
	
		httpSend("putPayList", param2, function(cb2){

//			getCheckAccCodeSms
//			if(Mcb.isSuccess == 'true'){
//				
//			}
			
			hideProgressBar();
			
			if(cb2.resultYn == 'N'){
				
				notiPop('확인','ISP 결체취소가 실패했습니다.',true,false,null);
				return;
				
			}

			notiPop('확인','결제취소 완료되었습니다. .',true,false,null);
			//navigateBackToNaviGo('MBLMG4M0');
			doPage();
			
			
		}, function(errorCode, errorMessage){
			
			hideProgressBar();
			
			if (errorCode == "9999") {
				loge('error :: 9999 :: hsUsrCommit');
				alert('처리에 실패했습니다.\n다시 요청바랍니다.');
			} else {
				loge('error :: other :: hsUsrCommit');
				alert('처리에 실패했습니다.\n다시 요청바랍니다.');
			}
		});

	}
	
};

function getRealCardCodeTest(pCardCode){
	
// 01 비씨
// 02 국민
// 03 외환
// 04 삼성
// 05 신한
// 08 현대
//	09	롯데
//	11	한미
//	12	수협
//	13	신세계
//	14	우리(구 평화)
//	15	농협
//	16	제주
//	17	광주
//	18	전북
//	20	롯데
//	23	주택(구 동남)
//	24	11	하나SK
//	25	해외
//	26	7	씨티(한미)
//	27	월드패스카드
//	28	신보람
//	29	SK-OkCashBag
//	30	SK리더스
//	42	LG-telecom
//	47	KTF-coupon
//	59	사이버카드
//	99	부산비씨  오전 11:36
	
	if( pCardCode == '01'){
		return '0100';
	}else if(pCardCode == '02'){
		return '0204';
	}else if(pCardCode == '03'){
		return '1';
	}else if(pCardCode == '04'){
		return '2';
	}else if(pCardCode == '05'){
		return '6';
	}else if(pCardCode == '08'){
		return '4';
	}else if(pCardCode == '09'){
		return '5';
	}else if(pCardCode == '11'){
		return '7';
	}else if(pCardCode == '12'){
		return '1800';
	}else if(pCardCode == '13'){
		return '0100';  //신세계? 
	}else if(pCardCode == '14'){
		return '0100';
	}else if(pCardCode == '15'){
		return '14';
	}else if(pCardCode == '16'){
		return '0100';
	}else if(pCardCode == '17'){
		return '1500';
	}else if(pCardCode == '18'){
		return '1600';
	}else if(pCardCode == '20'){
		return '5';
	}else if(pCardCode == '23'){
		return '0100';
	}else if(pCardCode == '24'){
		return '11';
	}else if(pCardCode == '25'){
		return '0100';
	}else if(pCardCode == '26'){
		return '7';
	}else if(pCardCode == '27'){
		return '0100';
	}else if(pCardCode == '28'){
		return '0100';
	}else if(pCardCode == '29'){
		return '0100';
	}else if(pCardCode == '30'){
		return '0100';
	}else if(pCardCode == '42'){
		return '0100';
	}else if(pCardCode == '47'){
		return '0100';
	}else if(pCardCode == '59'){
		return '0100';
	}
}

function onScreenBack(){
	navigateGo('MBLMG0M2');
//	doPage();	
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
	
	viewPaidList();
}

function viewPaidList(){
	
	var box_type1Str = '<h3>납입자번호</h3>'+
	'<span class="col_red">'+currentCa+'</span>';
	
	$('.box_type1').html(box_type1Str);
	$('.showPlus').hide();
		
	//gclee card 2
	var mbp = getMainBP();
	logf('gclee setting mbp: ' + JSON.stringify(mbp));
	var pMbp = mbp.substring(0,1) + '000';
	logf('gclee substring mbp: ' + JSON.stringify(pMbp));
	
	var param = {
			"COMPCD" : pMbp,	
			"GUBUN" : '06',
			"CANO" : String(Number(currentCa))
	};
	
//	var param = {
//			"COMPCD" : 'B000',	
//			"GUBUN" : '06',
//			"CANO" : '15979102' //test
////			"CANO" : String(Number(params.list.bpCaList[0].ca))
//	};
//	
	logf('gclee MBLMG3M0 ' + JSON.stringify(param));
	
	setDefault();
	
	httpSend("getPayList", param, function(cb){
		gPaiedList = cb;
		logf(cb);
	
		if(cb.list.resultList == undefined){
			
			var caList = '<p class="pb10">  당일 수납 내역이 없습니다.</p>';
			$('.box_CaList').html(caList);
			
		}else{
			
			var caList = '<p class="pb10">  취소는 한 건씩만 가능합니다.</p>';

			//'<p><strong>승인일</strong><span class="bold"><label for="chkc'+i+'" class="af-checkbox-text">'+toDateAddDot(cb.list.resultList[i].CSI_DATE)+'</label></span><span class="check"><input class="Checkbox" name="chkc0" value="'+i+'" checked="checked" id="chkc'+i+'" data-type="checkbox" data-classinit="true" type="checkbox" data-converted="true"></span></p>'+
			for(var i=0;i< cb.list.resultList.length;i++){
				caList += '<div class="bill">'+
				'<input type="hidden" value="'+' '+','+' '+'"/>'+
				'<p><strong>승인일</strong><span class="bold"><label for="chkc'+i+'" class="af-checkbox-text">'+toDateAddDot(cb.list.resultList[i].CSI_DATE)+'</label></span><span class="check"><input class="Checkbox" name="chkc0" value="'+i+'" id="chkc'+i+'" data-type="checkbox" data-classinit="true" type="checkbox" data-converted="true"></span></p>'+
				'<p><strong>고객명</strong><span class="txt">'+ascUserNM(cb.list.resultList[i].NAME_LAST)+'&nbsp;</span></p>'+
				'<p><strong>수납금액</strong><span class="txt">'+chgNumberToMoney(cb.list.resultList[i].BETRZ)+'원'+'&nbsp;</span></p>'+
				'</div>';
			}
			
			$('.box_CaList').html(caList);
			
			$('input.Checkbox').click(function(e){
				$('input.Checkbox').each(function(i){
					this.checked = false;
				})
				this.checked = true;
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



$a.page(function(){
	
    this.init = function(id,param){
    	logf('page on');
    };
   
});