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

function mainStart(){
	setEventListner();
	
	doPage();
}

function setEventListner(){    	

	
};

//gclee card - ing
function popCardResult(ss){
	
	//1:취소(처음위치), 2:결제성공(결제목록화면이동), 3:결제실패(결제실패하였습니다. 다시 시도하십시요! alert)
	
	logf('popCardResult param = ' + ss);
	
	if(ss == '1'){
		//1:취소(처음위치)
        //1:결제실패
		
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
		 
	}    
}

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

function goMenuBLMG02(){
	//gclee card
	var pCardCode = $("#cardSelect option:selected").val();
	
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
	var paymentList = new Array();
	
	for(var i=0;i<$('[name=chkc0]:checked').length;i++){
		
		var s1 = $('[name=chkc0]:checked')[i].value;
		logf('gclee MBLMG3M0 goMenuBLMG02 s1: ' + s1);
		
		tempCuIndex = s1;
		
		if((tempCuIndex-tempIndex) > 1){
			isNoOld = true;
			break;
		}
		paymentList.push(gUnpaiedList.list.resultList[s1]);
		tempIndex = tempCuIndex;
	}
	
	logf('gclee MBLMG3M0 isNoOld  : ' + isNoOld);
	
	if(isNoOld){
		notiPop('확인','과거건 부터 결제해 주십시요.',true,false,null);
		return;
	}
	
	  pCardCode = getRealCardCodeTest(pCardCode);
	  vConnectURL = getCardPayURL(pCardCode);
    var vPayType = getPayType(pCardCode);

	  var chkBPCA = getMainBPCA();
	  var useBPCA = JSON.parse(chkBPCA);
	  vBPCode = useBPCA.regiogroup;
	  vBPCode = vBPCode.substring(0, 1) + "000";
	  
	  logf("vBPCode : "+vBPCode);
	  
	  vAmount = gUnpaiedList.list.resultList[0].BETRW;
	  vGoodName = gUnpaiedList.list.resultList[0].BUTXT;
	  vPhoneNo = getAlopexCookie('uPhone');
	  
//     var option = {
//     "ordername" : vOrderName,
//     "ordernumber" : vOrderNumber,
//     "amount" : vAmount,
//     "goodname" : vGoodName, //bpname
//     "phoneno" : vPhoneNo,
//     "cardCode" : vCardCode,
//     "BPCode" : vBPCode,
//     "connectURL" : vConnectURL,
//     "payType: : vPayType
//     };
     
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
    	     "installment" : $("#installment option:selected").val(),
    	     "RGUBUN" : "04",
         "payType" : vPayType
    	     };
     

//     var option = {
//    	     "ordername" : "ordername_test",
//    	     "ordernumber" : "00001",
//    	     "amount" : "1004",
//    	     "goodname" : "goodName_test",
//    	     "phoneno" : "01000001111",
//    	     "cardCode" : pCardCode,
//    	     "BPCode" : "B000",
//    	     "connectURL" : vConnectURL,
//           "payType:    :
//    	     };
          
     logf("vPhoneNo : "+vPhoneNo);
     logf("vOrderName : "+vOrderName);
     logf("vOrderNumber : "+vOrderNumber);
     logf("vAmount : "+vAmount);
     logf("vGoodName : "+vGoodName);
     logf("vCardCode : "+vCardCode);
     logf("vBPCode : "+vBPCode);
     logf("vConnectURL : "+vConnectURL);
     
     //gclee card 임시 결제완료, 결제실패, 이전
     //잠시 주석
    
    //sniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON.stringify(option), "popCardResult");
    
     if(device.osName != 'iOS'){
   	  jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON.stringify(option), JSON.stringify(paymentList), "popCardResult", "refrash");
     }else{
   	  jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON.stringify(option), JSON.stringify(paymentList), "popCardResult");
     }    
     
     //gclee card - ing - 테스트시 사용
//     popCardResult('2'); //1:취소, 2:결제성공, 3:결제실패
     
     refrash();
     
     
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
	
//	var param = {
//			"COMPCD" : pMbp,	
//			"GUBUN" : '04',
//			"CANO" : currentCa
//	};
//	
	var param = {
			"COMPCD" : 'B000',	
			"GUBUN" : '04',
			"CANO" : '15979102' //test
//			"CANO" : String(Number(params.list.bpCaList[0].ca))
	};
	
	logf('gclee MBLMG3M0 ' + JSON.stringify(param));
	
	setDefault();
	
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