//document.addEventListener('alopexready', mainStart);
document.addEventListener('alopexready', mainStart);

nowPGCode = 'MBLMG2M0';
function mainStart(){
	setEventListner();
	
	settingLoading();
	$('.imgloading').show();
	
	doPage();
}

var auto_bill_id = "";
var ss = '';
var currentCa = '';
var paramBpCa = {'list' : [{'bpCaList' : [] }]};

//gclee card
var vOrderName;
var vOrderNumber;
var vAmount;
var vGoodName;
var vPhoneNo;
var vCardCode;
var vBPCode;
var vConnectURL;

//gclee card
var cardFee = ''; //ZBTRANZ
var popPayFail = ''; //gclee card 

function setEventListner(){
	
	//gclee card - ing
	$('#okPayFail').click(function() {
		popPayFail.close();
		
	});
	
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
      
     //gclee card 임시 결제완료, 결제실패, 이전
                    
//		var param = {
//				bp : '1111111',
//				ca : '1111111'),
//				DOC_HEADER_OPBEL : '111111'
//			};
//		
//		if(device.osName != 'iOS'){
//				navigateGo('PAYMENT',param);
//		}else{
//                navigateGo('PAYMENT', param);
//		}
		
//		$('.,').bPopup({
//			opacity: 0.6,
//			speed: 300,
//		});
		
	});
	
};

function doPage(){
	$('.topLogoDiv').html(getTitleBp());
//	var mainPage = JSON.parse(getAlopexSession('mainPage'));
	var loginSession = "";
	if(device.osName != 'iOS'){
		loginSession = JSON.parse(getAlopexSession('loginSession'));
	}else{
		loginSession = JSON.parse(getAlopexCookie('loginCookie'));
	}
	logf(loginSession);
	
	
//	paramBpCa.list = [{'bpCaList' : []}];
//	
	for(var i=0;i<loginSession.list.bpCaList.length;i++){
		paramBpCa.list[0].bpCaList[i] = {
			'bp' : String(Number(loginSession.list.bpCaList[i].bp)),
			'ca' : String(Number(loginSession.list.bpCaList[i].ca)),
			'regiogroup' : loginSession.list.bpCaList[i].regiogroup,
			'sernr' : loginSession.list.bpCaList[i].sernr,
			'anlage' : loginSession.list.bpCaList[i].anlage
			
		};
	}
	var chkBPCA = getMainBPCA();
	if(chkBPCA == 'undefined'){
		currentCa = Number(loginSession.list.bpCaList[0].ca);
	}else{
		var useBPCA = JSON.parse(chkBPCA);
		currentCa = Number(useBPCA.ca);
	}
	
	showPayList();
}

var pinId = '';
function showPayList(){
	
	//gclee card
	//getUnpaidListAndCardlis 예상
	httpSend("getBpCaPayInfo", paramBpCa, function(cbq){
		logf('jysjys',cbq);

		var list_numStr = '';
		var list_numCount = 0;
		var param = '';
		for(var i=0;i<cbq.list.bpCaList.length;i++){
//			if(cbq.list.bpCaList[i].doc_header_opbel != ''){
				list_numStr += '<li class="'+(currentCa == Number(cbq.list.bpCaList[i].ca)?'key_':'')+'num goPayInfo"><input type="hidden" value="'+cbq.list.bpCaList[i].regiogroup+','+Number(cbq.list.bpCaList[i].bp)+','+Number(cbq.list.bpCaList[i].ca)+','+cbq.list.bpCaList[i].sernr+','+cbq.list.bpCaList[i].anlage+','+Number(cbq.list.bpCaList[i].doc_header_opbel)+'"><a href="javascript:void(0);">'+Number(cbq.list.bpCaList[i].ca)+'</a></li>';
				list_numCount++;
//			}
		}
		
		for(var i=0;i<cbq.list.bpCaList.length;i++){
			//console.log('12121212121212121212::'+currentCa);
			if(Number(cbq.list.bpCaList[i].ca) == currentCa){
				//console.log('12121212');
				//box_type1
				var box_type1Str = '<h3>납입자번호</h3>'+
				'<span class="col_red">'+Number(cbq.list.bpCaList[i].ca)+'</span>';
				if(list_numCount > 1) box_type1Str += '<p class="small btn_input_num"><button id="button_input_num">납입자번호 선택하기</button></p>';
				$('.box_type1').html(box_type1Str);
				
				param = {
						'bp' : cbq.list.bpCaList[i].bp,
						'ca' : cbq.list.bpCaList[i].ca,
						'doc_header_opbel' : cbq.list.bpCaList[i].doc_header_opbel
				};
			}
		}
		$('.list_num').html(list_numStr);
		
		//gclee card select box
		list_numStr = '';
		var testValue = '1';
		var testName = '하나카드';
		for(var ii=0;ii<5;ii++){
			list_numStr += '<option value="'+testValue+'">'+testName+'</option>';
		}
		$("#cardSelect")
		.html(list_numStr);
		
		$('#button_input_num').click(function(){
			pinId = $('.pop_input_num').bPopup({
				opacity: 0.6,
				speed: 300,
			});
		});
		
		$('.goPayInfo').click(function(event){
			
			$('.tacBox1').hide();
			$('.tacBox2').hide();
			
			var s1 = jQuery(event.currentTarget);
//			var s2 = s1.children('input')[0].value;
//			var s3 = s2.split(',');
			
			var Str1 = s1.children('input')[0].value;
			var Str2 = Str1.split(',');
			var Str3 = {
					bp : Str2[1],
					ca : Str2[2],
					sernr : Str2[3],
					anlage : Str2[4],
					regiogroup : Str2[0]
			};

			setAlopexSession('SessionBP',Str2[0]);
			setAlopexSession('SessionBPCA',JSON.stringify(Str3));
			putGlobalPreference('selectedBp', Str2[0]);
			putGlobalPreference('selectedBpCa', JSON.stringify(Str3));
			
			currentCa = Number(Str2[2]);
			showPayList();
			pinId.close();
		});
		
		logf(param.doc_header_opbel);
		if(param.doc_header_opbel == undefined){
			
			$('.box_form_none').show();
			$('.formBox1').hide();
			$('.formBox2').hide();
		}else{
			showPayInfo(param);
		}
		
		
    	
		completLoad();
		setDefault();
    	
	}, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 99991 :: main');
		} else {
			loge('error :: other1 :: main'+errorMessage);
		}
	});
}

function showPayInfo(pr){
	//if(currentCa == ''){
	
	//}
	//gclee card - ing : 여기에 추가전문 필요
	//getRealPayInfor
	
	logf(pr);
	httpSend("getPayInfo", pr, function(cbq){
		logf(cbq);
		if(cbq.list.billDetailResult == undefined){
			$('.box_form_none').show();
			$('.formBox1').hide();
			$('.formBox2').hide();
		}else{
			$('.box_form_none').hide();
			$('.formBox1').show();
			$('.formBox2').show();

			//gclee card
             vPhoneNo = getAlopexCookie('uPhone');
             vOrderName = cbq.list.billDetailResult[0].BUS_PART_NAME;
             vOrderNumber = pr.doc_header_opbel;
             var s1 = cbq.list.billDetailResult[0].ZBTRANS_99.split(' ');
             vAmount = s1[s1.length-1];
             vAmount = vAmount.replace(',','');
             vGoodName = "도시가스 " + cbq.list.billDetailResult[0].BUDAT_YEAR + " 년 " + cbq.list.billDetailResult[0].BUDAT_MONTH + " 월 청구서";
             //vBPName = cbq.list.billDetailResult[0].ZCOUNT_NAME;
             
             logf("vPhoneNo : "+vPhoneNo);
             logf("vOrderName : "+vOrderName);
             logf("vOrderNumber : "+vOrderNumber);
             logf("vAmount : "+vAmount);
             logf("vGoodName : "+vGoodName);
             //logf("vBPName : "+vBPName);	
             
            //gclee card
    		var s2 = cbq.list.billDetailResult[0].ZBTRANS_99.split(' ');
			//gclee card
			$('.form_price').html(s2[s2.length-1]+'원');
			$('.form_closed2').html(toDateAddDot(cbq.list.billDetailResult[0].FAEDN)+'까지');
		}
		
	}, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main'+errorMessage);
		}
	});
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    	
    	
    };
       
    
});

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