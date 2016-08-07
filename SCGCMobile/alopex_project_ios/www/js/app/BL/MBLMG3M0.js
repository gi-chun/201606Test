/***
 * date : 2015-05-19
 * pg : jys
 * note : 
 * 1. 내용 입력
 */

document.addEventListener('alopexready', mainStart);

nowPGCode = 'MBLMG3M0';
var ss = '';
var params = '';
var currentCa = '';
var pinId = '';
var gUnpaiedList;

var vOrderName;
var vOrderNumber;
var vAmount;
var vGoodName;
var vPhoneNo;
var vCardCode;
var vBPCode;
var vConnectURL;
var vInstallment;

var pCardCode;
var tAmount = 0;
var paymentList = new Array();
var ISP_TID = '';

function mainStart(){
	
	settingLoading();
	$('.imgloading').show();
	
	setEventListner();
	
	doPage();
}

function setEventListner(){    	

	$('#cardSelect').change(function(){
		
		var tCardCode = $("#cardSelect option:selected").val();
		tCardCode = getRealCardCodeTest(tCardCode);
		var tPayType = getPayType(tCardCode);
				
		if( tPayType == 'MPI'){
			$('#label_Tcode').hide();
			$('#select_box3').hide();
		}else{
			$('#label_Tcode').show();
			$('#select_box3').show();
		}
        
    });

};

//gclee card - ing
function popCardResult(ss){
	
	//1:취소(처음위치), 2:결제성공(결제목록화면이동), 3:결제실패(결제실패하였습니다. 다시 시도하십시요! alert)
	
	logf('popCardResult param = ' + ss);
	
	if(ss == '1'){
		//1:취소(처음위치)
		
	}else if(ss == '2'){
		//2:결제성공
		navigateBackToNaviGo('MBLMG4M0');
		
	}else if(ss == '3'){
		//3:결제실패
		//alert
		
		popPayFail = $('.confirm_payFail').bPopup({
			opacity : 0.6,
			speed : 300,
		});	
		 
	}else if(ss == '4'){
		//4:카드승인완료 후 결제요청
		goRequestISPPay();
	}        
}

function goRequestISPPay(){
	//gclee card
	logf(gUnpaiedList);
	logf(gUnpaiedList.list.resultList);
	logf('gclee MBLMG3M0 goRequestISPPay 결제요청 : ' + gUnpaiedList.list.resultList);

//     logf("vPhoneNo : "+vPhoneNo);
//     logf("vOrderName : "+vOrderName);
//     logf("vOrderNumber : "+vOrderNumber);
//     logf("vAmount : "+vAmount);
//     logf("vGoodName : "+vGoodName);
//     logf("vBPCode : "+vBPCode);
//     logf("vConnectURL : "+vConnectURL);
  	showProgressBarMsg('정보를 처리중입니다.');
	
  	var vExpYear = '2049';
	var vExpMon = '12';
	
	var param = {
				"certiGubun" : 'I',	
				"RGUBUN" : '03',
				"CANO" : JSON.parse(getAlopexCookie('MainBPCA')).ca,
				"expyear" : vExpYear,
				"expmon" : vExpMon,
				"installment" : vInstallment,
				"amount" : tAmount,
				"expdt" :  vExpYear.substring(2) + vExpMon,
				"clientIp" : '',
				"termID" : paymentList[0].TERM_ID,
				"TID" : ISP_TID
	};
	
	//gclee login token
	logf('gclee goRequestISPPay MBLMG3M0 ' + JSON.stringify(param));
	
	var param2 = JSON.parse(JSON.stringify(param));
	param2.list = [{'payList' : []}];
	
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
				"VKONT" : paymentList[0].VKONT,
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

	httpSend("putPayList", param, function(cb2){

//		getCheckAccCodeSms
//		if(Mcb.isSuccess == 'true'){
//			
//		}
		if(cb2.resultYn == 'Y'){
			
			notiPop('확인','ISP 결제가 완료되었습니다.',true,false,null);
			navigateBackToNaviGo('MBLMG4M0');
			
		}else{
			notiPop('확인','ISP 결제가 실패했습니다.',true,false,null);
			
		}
		
	}, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: hsUsrCommit');
			alert('처리에 실패했습니다.\n다시 요청바랍니다.');
		} else {
			loge('error :: other :: hsUsrCommit');
			alert('처리에 실패했습니다.\n다시 요청바랍니다.');
		}
	});

};

function getRealCardCode(pCardCode){
	
	var rCardCode = '';
	var tCardCode = '';
	for(var ii=0;ii<gUnpaiedList.list.cardStoreInfoList.length;ii++){
		//rCardCode = '<option value="'+cb.list.cardStoreInfoList[ii].CARDCOMPCD+'">'+cb.list.cardStoreInfoList[ii].CARDCOMNAME+'</option>';
		tCardCode = cb.list.cardStoreInfoList[ii].CARDCOMPCD; //서버에서 내려주는 real card code 설정
		if( pCardCode == tCardCode){
			rCardCode = cb.list.cardStoreInfoList[ii].CARDCOMPCD;
			logf('gclee MBLMG3M0 getRealCardCode pCardCode : ' + pCardCode + ' rCardCode : ' + rCardCode);
			return rCardCode;
		}
	}
}

function getRealCardCodeTest(pCardCode){
	
//	01	비씨
//	02	국민
//	03	외환
//	04	삼성
//	05	신한
//	08	현대
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

function goTestISPPaied(){
	goRequestISPPay();
}

function goMenuBLMG02(){
	//gclee card
	pCardCode = $("#cardSelect option:selected").val();
	
	logf(gUnpaiedList);
	logf(gUnpaiedList.list.resultList);
	
	logf('gclee MBLMG3M0 goMenuBLMG02 미수납내역 : ' + gUnpaiedList.list.resultList);
	
	//여러 미수납 선택건 확인
	//check select
	var checkCount = 0;
	var tempStr;
	var i=0;
	
	checkCount = $('[name=chkc0]:checked').length;
	
	logf('gclee MBLMG3M0 goMenuBLMG02 checked count : ' + checkCount);
	
	if( checkCount < 1){
		notiPop('확인','결제대상을 선택해 주십시요.',true,false,null);
		return;
	}
		
	var isNoOld = false;
	
//	if($("input:checkbox[id=check0]").is(":checked")==false){
//		isNoOld = true;
//	}
	
	var tempIndex = 0;
	var tempCuIndex = 0;
	//var paymentList = new Array();
	tAmount = 0;
	for(var i=0;i<$('[name=chkc0]:checked').length;i++){
		
		var s1 = $('[name=chkc0]:checked')[i].value;
		logf('gclee MBLMG3M0 goMenuBLMG02 s1: ' + s1);
		
		tempCuIndex = s1;
		
		if((tempCuIndex-tempIndex) > 1){
			isNoOld = true;
			break;
		}
		paymentList.push(gUnpaiedList.list.resultList[s1]);
		
		tAmount += parseInt(gUnpaiedList.list.resultList[s1].BETRW);
		tempIndex = tempCuIndex;
	}
	
	logf('gclee MBLMG3M0 isNoOld  : ' + isNoOld);
	
	if(isNoOld){
		notiPop('확인','과거건 부터 결제해 주십시요.',true,false,null);
		return;
	}
	
	  pCardCode = getRealCardCodeTest(pCardCode);
	  vConnectURL = getCardPayURL(pCardCode);

	  var chkBPCA = getMainBPCA();
	  var useBPCA = JSON.parse(chkBPCA);
	  vBPCode = useBPCA.regiogroup;
	  vBPCode = vBPCode.substring(0, 1) + "000";
	  
	  logf("vBPCode : "+vBPCode);
	 
	  vGoodName = gUnpaiedList.list.resultList[0].BUTXT;
	  vPhoneNo = getAlopexCookie('uPhone');
     
	  vAmount = tAmount;
	  
	 //MPI or ISP 분리
	  var vPayType = getPayType(pCardCode);
	  vInstallment = $("#installment option:selected").val();
		
	if( vPayType == 'MPI'){
		
		var option = {
	    	     "ordername" : "",
	    	     "ordernumber" : "",
	    	     "amount" : vAmount,
	    	     "goodname" : vGoodName, //bpname
	    	     "phoneno" : vPhoneNo,
	    	     "cardCode" : pCardCode,
	    	     "BPCode" : vBPCode,
	    	     "connectURL" : vConnectURL,
	    	     "CANO" : JSON.parse(getAlopexCookie('MainBPCA')).ca,
	    	     "TERM_ID" : gUnpaiedList.list.cardStoreInfoList[0].TERM_ID,
	    	     "installment" : vInstallment,
	    	     "RGUBUN" : "03",
	    	     "payListCount" : paymentList.length
	    	     };

	     logf("vPhoneNo : "+vPhoneNo);
	     logf("vOrderName : "+vOrderName);
	     logf("vOrderNumber : "+vOrderNumber);
	     logf("vAmount : "+vAmount);
	     logf("vGoodName : "+vGoodName);
	     logf("vBPCode : "+vBPCode);
	     logf("vConnectURL : "+vConnectURL);
	     logf("vInstallment : "+vInstallment);
	     
	     //gclee card 임시 결제완료, 결제실패, 이전
	     //잠시 주석
	     if(device.osName != 'iOS'){
	   	  jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON.stringify(option), JSON.stringify(paymentList), "popCardResult", "refrash");
	     }else{
	   	  jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON.stringify(option), JSON.stringify(paymentList), "popCardResult"); 
	     }    
			
	}else{ //ISP
		
		var Now = new Date();
		var NowTime = Now.getFullYear()+"";
		NowTime += NowTime.substring(2);
		NowTime += Now.getMonth() + 1 ;
		NowTime += Now.getDate();
		NowTime += Now.getHours();
		NowTime += Now.getMinutes();
		NowTime += Now.getSeconds();
		
		//M1111_16072609337_00001
		
		ISP_TID = 'M'+gUnpaiedList.list.resultList[0].DVKONT+'_'+NowTime+'_'+'00001';
		 
		showProgressBarMsg('정보를 처리중입니다.');
		  
		setAlopexCookie('ISP_TID',ISP_TID);
		
		//gclee card -K0024 - A0029
		//realform.KVP_PGID.value = "K0024";
		//ISP인경우 HpNum(전화번호), Tcode(통신사) 필수, Tcode 결제시 입력하면 추가예정
		//skt,ktf,lgt
		var param = {
				"PgId" : 'K0024',
				"GoodName" : vGoodName,
				"Price" : vAmount+"",
				"Currency" : 'WON',
				"NoInt" : '0',
				"Noint_Inf" : vInstallment,
				"TID" : ISP_TID,
				"CardCode" : pCardCode,
				"LoginGubun" : '',
				"ReturnUrl" : '',
				"WAPUrl" : '',
				"HpNum" : vPhoneNo,
				"MerchantNo" : '',
				"Tcode" : 'skt',
				"IpAddr" : '',
				"CancelUrl" : ''
				
		};
		
		logf('gclee getIspCertResult MBLMG3M0 ' + param);
	//	
		httpSend("getIspCertResult", param, function(cb2){
			
			hideProgressBar();
			
			if((cb2.ResultCode == '10001000')==false){
				notiPop('확인','ISP 카드승인 요청이 실패했습니다.',true,false,null);
				return;
			}
	
			if (device.osName == 'Android') {
				
				var gdnvUrl = '';
				var gdnvId = '';
				if (device.osName == 'Android') {
					gdnvUrl = 'http://mobile.vpay.co.kr/jsp/MISP/andown.jsp';
					gdnvId = 'kvp.jjy.MispAndroid320';
				} else {
					gdnvUrl = 'http://itunes.apple.com/kr/app/id369125087?mt=8';
					gdnvId = 'ispmobile://?TID='+ISP_TID;
				}
				
				//call ISP APP
				application.hasApp(gdnvId,function(rt) {
					hideProgressBar();
					if (rt) {
//						application.startApplication(gdnvId);
						if (device.osName == 'Android') {
							jsniCaller.invoke("CallSchemeUrl.call", "ispmobile://?TID="+ISP_TID);
						} else {
							gdnvUrl = 'http://itunes.apple.com/kr/app/id369125087?mt=8';
							gdnvId = 'ispmobile://?TID='+ISP_TID;
						}
					} else {
						notiPop(
								'안내',
								'결제를 위한 ISP앱이 설치되어있지 않습니다.<br/>설치 화면으로 이동하시겠습니까?',
								true,
								false,
								{
									list : [
											{
												type : '',
												id : 'pCancelOK',
												name : 'Store 이동'
											},
											{
												type : '0',
												id : 'pCancelNO',
												name : '닫기'
											} ]
								});

						$('.pCancelOK')
								.click(
										function() {
											// url 연결
											application.startWebBrowser(gdnvUrl);
										});

						$('.pCancelNO').click(
								function() {
									notiPopID.close();
								});
					}
				});
				
			}else{
				//iOS
				var option = {
					      "schemeUrl" : 'ispmobile://?TID='+ISP_TID
				};
					      
			   jsniCaller.invoke("PaymentJSNI.callISPApp", JSON.stringify(option), "popCardResult");
			}
			
			//gclee ISP 임시 결제요청 수동호출
			//goRequestISPPay();
			
		}, function(errorCode, errorMessage){
			if (errorCode == "9999") {
				loge('error :: 9999 :: hsUsrCommit');
				alert('처리에 실패했습니다.\n다시 요청바랍니다.');
			} else {
				loge('error :: other :: hsUsrCommit');
				alert('처리에 실패했습니다.\n다시 요청바랍니다.');
			}
		});
		
		
	}
     
     //gclee card - ing - 테스트시 사용
//     popCardResult('2'); //1:취소, 2:결제성공, 3:결제실패
     
//     refrash();
     
     
};

function onScreenBack(){
	doPage();	
}

function doPage(){
	//gclee card ing
	if(device.osName != 'iOS'){
		params = JSON.parse(getAlopexSession('loginSession'));
	}else{
		params = JSON.parse(getAlopexCookie('loginCookie'));
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

	viewUnpaidList();
}

function refrash(){
	navigateGo('MBLMG4M0');//MBLMG4M0
}

function viewUnpaidList(){
	
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
			"GUBUN" : '04',
			"CANO" : String(Number(currentCa))
	};
	
//	var param = {
//			"COMPCD" : 'B000',	
//			"GUBUN" : '04',
//			"CANO" : '15979102' //test
////			"CANO" : String(Number(params.list.bpCaList[0].ca))
//	};
	
	logf('gclee MBLMG3M0 ' + JSON.stringify(param));
	
	setDefault();
	
	$('#label_Tcode').hide();
	$('#select_box3').hide();
	
	httpSend("getPayList", param, function(cb){
		gUnpaiedList = cb;
		logf(cb);
		logf(cb.resultList);
		
		logf('gclee MBLMG3M0 미납내역 : ' + cb.resultList);
		
		if(cb.list.resultList == undefined){
			
			var caList = '<p class="pb10">  미납 내역이 없습니다.</p>';
			$('.box_CaList').html(caList);
			
		}else{
			
			var vTotalAmount = '결제 선택 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 미납금액 합계&nbsp&nbsp'+chgNumberToMoney(cb.list.resultList[0].TOTAL_AMOUNT)+'&nbsp원'+'&nbsp';
			$('.totalAmount').html(vTotalAmount);
			
			var caList = '<p class="pb10">  납기일 과거 건부터 다수의 결제를 선택하실 수 있습니다.</p>';

			for(var i=0;i<cb.list.resultList.length;i++){
				caList += '<div class="bill">'+
				'<input type="hidden" value="'+' '+','+' '+'"/>'+
				'<p><strong>납기일</strong><span class="bold"><label for="chkc'+i+'" class="af-checkbox-text">'+toDateAddDot(cb.list.resultList[i].FAEDN)+'</label></span><span class="check"><input class="Checkbox" name="chkc0" value="'+i+'" checked="checked" id="chkc'+i+'" data-type="checkbox" data-classinit="true" type="checkbox" data-converted="true"></span></p>'+
				'<p><strong>고객명</strong><span class="txt">'+cb.list.resultList[i].NAME_LAST+'&nbsp;</span></p>'+
				'<p><strong>미납금액</strong><span class="txt">'+chgNumberToMoney(cb.list.resultList[i].BETRW)+'원'+'&nbsp;</span></p>'+
				'</div>';
			}
			$('.box_CaList').html(caList);
			
			//gclee card select box
			list_numStr = '';
			for(var ii=0;ii<cb.list.cardStoreInfoList.length;ii++){
				list_numStr += '<option value="'+cb.list.cardStoreInfoList[ii].CARDCOMPCD+'">'+cb.list.cardStoreInfoList[ii].CARDCOMNAME+'</option>';
			}
			
			$("#cardSelect")
			.html(list_numStr);
			
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
				
		    });
			
		};
		
		completLoad();
		
	}, function(errorCode, errorMessage){
		
		completLoad();
		
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