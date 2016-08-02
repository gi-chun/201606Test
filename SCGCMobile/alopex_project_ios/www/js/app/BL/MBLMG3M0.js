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
	
	//gclee card
	$('.goPayPage').click(function(){
		
	  vCardCode = $("#cardSelect option:selected").val();
	  vConnectURL = getCardPayURL(vCardCode);

	  var chkBPCA = getMainBPCA();
	  var useBPCA = JSON.parse(chkBPCA);
	  vBPCode = useBPCA.regiogroup;
	  
//      var option = {
//      "ordername" : vOrderName,
//      "ordernumber" : vOrderNumber,
//      "amount" : vAmount,
//      "goodname" : vGoodName,
//      "phoneno" : vPhoneNo,
//      "cardCode" : vCardCode,
//      "BPCode" : vBPCode,
//      "connectURL" : vConnectURL
//      };
      
	  var option = {
    	      "ordername" : vOrderName,
    	      "ordernumber" : vOrderNumber,
    	      "amount" : vAmount,
    	      "goodname" : vGoodName,
    	      "phoneno" : vPhoneNo,
    	      "cardCode" : vCardCode,
    	      "BPCode" : vBPCode,
    	      "connectURL" : vConnectURL
    	      };
           
      logf("vPhoneNo : "+vPhoneNo);
      logf("vOrderName : "+vOrderName);
      logf("vOrderNumber : "+vOrderNumber);
      logf("vAmount : "+vAmount);
      logf("vGoodName : "+vGoodName);
      logf("vCardCode : "+vCardCode);
      logf("vBPCode : "+vBPCode);
      logf("vConnectURL : "+vConnectURL);
      
      //gclee card 임시 결제완료, 결제실패, 이전
//      if(device.osName != 'iOS'){
//    	  jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON.stringify(option), "popCardResult");
//      }else{
//    	  jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON.stringify(option), "popCardResult"); 
//      }    
      
      //gclee card - ing - 테스트시 사용
//      popCardResult('2'); //1:취소, 2:결제성공, 3:결제실패
		
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
	//rCardCode = '<option value="'+cb.list.cardStoreInfoList[ii].CARDCOMPCD+'">'+cb.list.cardStoreInfoList[ii].CARDCOMNAME+'</option>';
	//'<p class="form_title"><input type="checkbox" name="payChecks" id="check'+i+'" class="input'+i+'" />&nbsp;&nbsp;결제선택</p>'+
	//check select
	var checkCount = 0;
	var tempStr;
	var i=0;
	for(i=0;i<gUnpaiedList.list.resultList.length;i++){
		tempStr = 'check' + i;
		if($("input:checkbox[id="+tempStr+"]").is(":checked")){
			checkCount++;
		}	
	}
	
	logf('gclee MBLMG3M0 goMenuBLMG02 checked count : ' + checkCount);
	
	if( checkCount < 1){
		notiPop('확인','휴대폰번호가 입력되지 않았습니다.',true,false,null);
		return;
	}
	//check 과거건 부터 결제
	//cb.list.resultList[i].FAEDN
//	var beforeDay = 30001230;
//	var tempDay = 0;
//	for(i=0;i<gUnpaiedList.list.resultList.length;i++){
//		tempDay = gUnpaiedList.list.resultList[i].FAEDN;
//		if(beforeDay > tempDay){
//			beforeDay = tempDay;
//		}	
//	}
//	logf('gclee MBLMG3M0 beforeDay  : ' + beforeDay);
	
	var isNoOld = false;
	if($("input:checkbox[id=check0]").is(":checked")==false){
		isNoOld = true;
	}
	
	var tempIndex = 0;
	var paymentList = new Array();
	for(i=0;i<gUnpaiedList.list.resultList.length;i++){
		tempStr = 'check' + i;
		if($("input:checkbox[id="+tempStr+"]").is(":checked")){
			
			if((i-tempIndex) > 1){
				isNoOld = true;
				break;
			}
			paymentList.push(gUnpaiedList.list.resultList[i]);
			tempIndex = i;
			
//			logf('222222222222222222');
//			logf(gUnpaiedList.list.resultList[i]);
//			tempDay = gUnpaiedList.list.resultList[i].FAEDN;
//			if(beforeDay < tempDay){
//				isNoOld = true;
//				break;
//			}
		}
	}
	
	logf('gclee MBLMG3M0 isNoOld  : ' + isNoOld);
	
	if(isNoOld){
		notiPop('확인','과거건 부터 결제해 주십시요.',true,false,null);
		return;
	}
	
	//get card code - 잠시 
	//var rCardCode = getRealCardCode(pCardCode);
	//
	//test
	//pCardCode = '0100';
	
	  pCardCode = getRealCardCodeTest(pCardCode);
	  vConnectURL = getCardPayURL(pCardCode);

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
//     "connectURL" : vConnectURL
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
    	     "CANO" : JSON.parse(getAlopexCookie('MainBPCA')).ca
    	     };
     

//     var option = {
//    	     "ordername" : "ordername_test",
//    	     "ordernumber" : "00001",
//    	     "amount" : "1004",
//    	     "goodname" : "goodName_test",
//    	     "phoneno" : "01000001111",
//    	     "cardCode" : pCardCode,
//    	     "BPCode" : "B000",
//    	     "connectURL" : vConnectURL
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
     if(device.osName != 'iOS'){
   	  jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON.stringify(option), JSON.stringify(paymentList), "popCardResult");
     }else{
   	  jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON.stringify(option), JSON.stringify(paymentList), "popCardResult"); 
     }    
     
     //gclee card - ing - 테스트시 사용
//     popCardResult('2'); //1:취소, 2:결제성공, 3:결제실패
};

function onScreenBack(){
	doPage();	
}

function doPage(){
	//gclee card ing
//	if(device.osName != 'iOS'){
//		params = JSON.parse(getAlopexSession('loginSession'));
//	}else{
//		params = JSON.parse(getAlopexCookie('loginCookie'));
//	}
//	var chkBPCA = getMainBPCA();
//	if(chkBPCA == 'undefined'){
//		currentCa = Number(params.list.bpCaList[0].ca);
//	}else{
//		var useBPCA = JSON.parse(chkBPCA);
//		currentCa = Number(useBPCA.ca);
//	}
//	
//	//gclee push
//	$('.topLogoDiv').html(getTitleBp());
//	
//	logf('jysjys',params);
//	
//	viewBillList();
	viewUnpaidList();
}

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

	viewUnpaidList();
}

function viewUnpaidList(){
	//gclee card 2
	var mbp = getMainBP();
	logf('gclee setting mbp: ' + JSON.stringify(mbp));
	var pMbp = mbp.substring(0,1) + '000';
	logf('gclee substring mbp: ' + JSON.stringify(pMbp));
	
//	var param = {
//			"COMPCD" : pMbp,	
//			"GUBUN" : '03',
//			"CANO" : '15979102' //test
////			"CANO" : String(Number(params.list.bpCaList[0].ca))
//	};
	
	var param = {
			"COMPCD" : 'B000',	
			"GUBUN" : '03',
			"CANO" : '15979102' //test
//			"CANO" : String(Number(params.list.bpCaList[0].ca))
	};
	logf('gclee MBLMG3M0 ' + JSON.stringify(param));
	
	setDefault();
	
	httpSend("getPayList", param, function(cb){
		gUnpaiedList = cb;
		logf(cb);
		logf(cb.resultList);
		
		logf('gclee MBLMG3M0 미수납내역 : ' + cb.resultList);
		
		if(cb.list.resultList == undefined){
			var contStr = '<li class="view_cont">미수납 내역이 없습니다.</li>';
			$('.boxList').html(contStr);
		}else{
			var contStr = '';
			for(var i=0;i<cb.list.resultList.length;i++){
				contStr += '<li class="view_cont">'+
				'<div>'+
				'<p class="form_title"><input type="checkbox" name="payChecks" id="check'+i+'" class="input'+i+'" />&nbsp;&nbsp;결제선택</p>'+
			    '</div>'+
				'		<div>'+
				'			<p class="form_title">'+'납기일 : '+toDateAddDot(cb.list.resultList[i].FAEDN)+' </p>'+
				'			<p class="form_view px0">'+'고객명 : '+cb.list.resultList[i].NAME_LAST+'</p>'+
				'			<span class="col_red"><p class="form_title">'+'미납금액 : '+chgNumberToMoney(cb.list.resultList[i].BETRW)+'원</p></span>'+
				'			<p class="form_view px0">'+'상태 : '+getStringPayStatus(cb.list.resultList[i].STATUS)+'</p>'+
				'			<p class="form_title">'+'미납금액 합계 : '+chgNumberToMoney(cb.list.resultList[i].TOTAL_AMOUNT)+'원</p>'+
				'		</div>';
				
				contStr += '</li>';
			}
			
			$('.boxList').html(contStr);
			
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