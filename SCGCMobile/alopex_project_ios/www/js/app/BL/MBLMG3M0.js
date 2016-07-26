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
      popCardResult('2'); //1:취소, 2:결제성공, 3:결제실패
		
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

function goMenuBLMG02(){
	//gclee card
	var pCardCode = $("#cardSelect option:selected").val();
	
	logf(gUnpaiedList);
	logf(gUnpaiedList.resultList);
	
	logf('gclee MBLMG3M0 goMenuBLMG02 미수납내역 : ' + gUnpaiedList.resultList);
	
	//get card code
	var rCardCode = getRealCardCode(pCardCode);
	var isISP = false;
	if(rCardCode.length > 2){ // 2자리 보다 크면 ISP (4자리 코드)
		isISP = true;
	}else{	           // 2자리 코드
		isISP = false;
	}
	
	if(isISP){
		//#0. TID를 우선 client에서 생성
				// M(1) + ordId(?) + "_"(1) + yyMMddHHmmss(12) + "_"(1) + seq(5:00001~) - max 40 bytes ( UNIQUE value )
		//OPBEL	0	0	left	0x20	N	N	문서번호
		
		//realform._KVP_TID.value = "M" + OPBEL(문서번호) + "_" + "<%=nowTime.substring(2)%>" + "_" + seq;
		var Now = new Date();
		var NowTime = Now.getFullYear();
		NowTime += '-' + Now.getMonth() + 1 ;
		NowTime += '-' + Now.getDate();
		NowTime += ' ' + Now.getHours();
		NowTime += ':' + Now.getMinutes();
		NowTime += ':' + Now.getSeconds();
		
		//M1111_16072609337_00001
//		var TID;
//		TID = 'M'+




		//#1. 카드인증 전문요청 (cip server)
		//#2. 카드인증 전문요청 결과 받으면
		//    TID를 받아서 jsni를 통해 IPS 앱실행
		//    서버측에 요청 --> isp_rtn.jsp 이전 return callBackUrl에 앱(iOS & Android) 스킴URL를 설정에서 카드승인 해줄것을 요청예정, ISP앱 카드승인 후 도시가스앱으로 다시 돌아와야함
		//#3  결제요청 전문요청 (이전 TID로 요청할 것임)
		//#4  수납내역 화면으로 이동
	}else{
		// MPI 확인 call back
		//#1. 리얼 카드코드로 앱 내부 jsni를 통해MBLMG6M0화면을 보여줌
		//    결제완료 callbackUrl은 서버CIP 전문URL넘김
		//#2. 결제완료후 앱이 현재화면 유지, ??? 상의필요
	}
	//navigateBackToNaviGo('MBLMG1M0');
	
//	 vCardCode = $("#cardSelect option:selected").val();
//	  vConnectURL = getCardPayURL(vCardCode);
//
//	  var chkBPCA = getMainBPCA();
//	  var useBPCA = JSON.parse(chkBPCA);
//	  vBPCode = useBPCA.regiogroup;
//	  
//     var option = {
//     "ordername" : vOrderName,
//     "ordernumber" : vOrderNumber,
//     "amount" : vAmount,
//     "goodname" : vGoodName,
//     "phoneno" : vPhoneNo,
//     "cardCode" : vCardCode,
//     "BPCode" : vBPCode,
//     "connectURL" : vConnectURL
//     };
//          
//     logf("vPhoneNo : "+vPhoneNo);
//     logf("vOrderName : "+vOrderName);
//     logf("vOrderNumber : "+vOrderNumber);
//     logf("vAmount : "+vAmount);
//     logf("vGoodName : "+vGoodName);
//     logf("vCardCode : "+vCardCode);
//     logf("vBPCode : "+vBPCode);
//     logf("vConnectURL : "+vConnectURL);
     
     //gclee card 임시 결제완료, 결제실패, 이전
//     if(device.osName != 'iOS'){
//   	  jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON.stringify(option), "popCardResult");
//     }else{
//   	  jsniCaller.invoke("PaymentJSNI.showPaymentCtl", JSON.stringify(option), "popCardResult"); 
//     }    
     
     //gclee card - ing - 테스트시 사용
     popCardResult('2'); //1:취소, 2:결제성공, 3:결제실패
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
				'<p class="form_title"><input type="checkbox" id="check'+i+'" class="input'+i+'" />&nbsp;&nbsp;결제선택</p>'+
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