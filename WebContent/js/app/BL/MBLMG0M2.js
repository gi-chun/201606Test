/***
 * date : 2015-05-19
 * pg : jys
 * note : 
 * 1. 내용 입력
 */

document.addEventListener('alopexready', mainStart);

nowPGCode = 'MBLMG0M2';
var ss = '';
var params = '';
var nowGRGno = '0';

//gclee bill
var popBillCerti = '';
var popBillCertiSave = '';
//gclee bill end

function mainStart(){
	params = navigation.parameters;
	//params = param;
	
	setEventListner();
	
	settingLoading();
	$('.imgloading').show();
	
	doPage('1');
}

var call_pop_id = ""; 

function clearTab(no){
	for(var i=1;i<7;i++){
		if(i==no){
		}else{
			$('.swipe'+i).children().children().attr('src','../../images/tab_bill'+i+'_off.png');
			$('#tab'+i).hide();
		}
	}
}

function setEventListner(){
	$('#button_input_num').click(function(){
		$('.pop_input_num').bPopup({
			opacity: 0.6,
			speed: 300,
		});
	});
	
	$('.btn_account').click(function(){
		$('.pop_account').bPopup({
			opacity: 0.6,
			speed: 300, 
		});
	});

	$('.btn_account_confirm').click(function(){
		$('.pop_prepare').bPopup({
			opacity: 0.6,
			speed: 300, 
		});
	});
	
	
	$('.view_list').click(function(){
		navigateBackToNaviGo('MBLMG0M0');
	});
	
	
	$('.billBtn').click(function(){
		navigateBackToNaviGo('MBLMG1M0');
	});
	
	
	$('.btn_account_regist').click(function(e) {
		call_pop_id = $('.pop_account_regist').bPopup({
			opacity: 0.6,
			speed: 300, 
		});
	});
	
	$('.phoneCancle').click(function(){
		call_pop_id.close();
	});
	
	$('.phoneCall').click(function(){
		myCallCenter();
	});

	var jbOffset = $('.month_view').offset();
	$(window).scroll(function(){
		if ($(document).scrollTop()>jbOffset.top){
			$('.month_view').addClass('month_fix').fadeIn(1000);
		} else {
			$('.month_view').removeClass('month_fix');
		}
	});
	
	
	$('.swipe1').click(function(ss){
		clearTab(1);
		ss.target.src = '../../images/tab_bill1_on.png';
		$('#tab1').show();
	});

	$('.swipe2').click(function(ss){
		clearTab(2);
		ss.target.src = '../../images/tab_bill2_on.png';
		$('#tab2').show();
	});

	$('.swipe3').click(function(ss){
		clearTab(3);
		ss.target.src = '../../images/tab_bill3_on.png';
		$('#tab3').show();
	});

	$('.swipe4').click(function(ss){
		clearTab(4);
		ss.target.src = '../../images/tab_bill4_on.png';
		$('#tab4').show();
	});

	$('.swipe5').click(function(ss){
		clearTab(5);
		ss.target.src = '../../images/tab_bill5_on.png';
		$('#tab5').show();
	});

	$('.swipe6').click(function(ss){
		clearTab(6);
		ss.target.src = '../../images/tab_bill6_on.png';
		$('#tab6').show();
	});

	$('.searchGRG').click(function(){
    	getChangeGRG();
    });
	
	// gclee bill
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
//
//	$(function(){	
//		var swiper = new Swiper('.swiper-container', {
//			nextButton: '.swiper-button-next', 
//			prevButton: '.swiper-button-prev',
//			slidesPerView: 4,
//			paginationClickable: true,
//			spaceBetween: 0
//		});
//		
//	});

	$a.page(function(e,a){
		this.init = function(e){
			// 2015-06-04 청구내역이 먼저 보이도록 수정
			$('.swipe2').children().children().attr('src','../../images/tab_bill2_on.png');
			$('#tab2').show();
		};
	});
};

function onScreenBack(){
	if(navigation.results){
		doPage(navigation.results['DOC_HEADER_OPBEL']);
	}else{
		loge('jys error!!!!!!');
	}
}

function doPage(opbelNo){
	var param = '';
	
	var param_isCertiPass = navigation.parameters.isCertiPass;
	
	//gclee push
	if(opbelNo == '1'){
		//gclee push test
		$('.topLogoDiv').html(getTitleBp());
		//'<h2 class="ko-one"><a href="#">코원에너지서비스 | SK E&amp;S</a></h2>'
		//$('.topLogoDiv').html('<h2 class="ko-one"><a href="#">코원에너지서비스 | SK E&amp;S</a></h2>');
		saveBillNo(params.DOC_HEADER_OPBEL);
		//gclee login token
		param = {
				"mbtlnum" : getAlopexCookie('uPhone'),
				"doc_header_opbel" : params.DOC_HEADER_OPBEL,
				"bp" : String(Number(navigation.parameters.bp)),	
				"ca" : String(Number(navigation.parameters.ca)),
				"token" : getAlopexCookie('loginToken')
		};
		
	}else{
		clearTab(2);
		$('.swipe2').children().children().attr('src','../../images/tab_bill2_on.png');
		$('#tab2').show();
		
		$('.loading').show();
//		$('.imgloading').show();
		saveBillNo(opbelNo);
		
		//gclee login token
		param = {
				"mbtlnum" : getAlopexCookie('uPhone'),
				"doc_header_opbel" : opbelNo,
				"bp" : String(Number(navigation.parameters.bp)),	
				"ca" : String(Number(navigation.parameters.ca)),
				"token" : getAlopexCookie('loginToken')
		};
	}

	logf('gclee MBLMG0M2 param:' + JSON.stringify(param));
	
	httpSend("getBillDetail", param, function(cb){
		ss = cb;
		
		logf('gclee MBLMG0M2 return: ' + JSON.stringify(cb));
		var returnStr = JSON.stringify(cb);
		
		//gclee login token
//		if(cb.isTokenTrue == 'false'){
//			notiPop('확인','비정상 접근입니다. <br />초기화면으로 이동하겠습니다.',true,false,null);
//			navigateGo('MACHP0M0');
//			return;
//		}
		//gclee login token end
		
		// 이전월 다음월
		var monthViewListStr = '';
		if(cb.list.billDetailResult[0].PREV_DOC_HEADER_OPBEL!="") monthViewListStr += '<a href="javascript:void(0);" class="prev_month">이전 월 보기</a>';
		monthViewListStr += '<span class="">'+cb.list.billDetailResult[0].BUDAT_YEAR+'년 '+cb.list.billDetailResult[0].BUDAT_MONTH+'월</span>';
		if(cb.list.billDetailResult[0].NEXT_DOC_HEADER_OPBEL!="") monthViewListStr += '<a href="javascript:void(0);" class="next_month">다음 월 보기</a>';
		$('.monthViewList').html(monthViewListStr);
		
		$('.prev_month').click(function(){
			//pop_error();
//			var param = {
//					bp : String(Number(params.bp)),
//					ca : String(Number(params.ca)),
//					DOC_HEADER_OPBEL : cb.list.billDetailResult[0].PREV_DOC_HEADER_OPBEL
//			};
//			navigateGo('MBLMG0M2',param);
			doPage(cb.list.billDetailResult[0].PREV_DOC_HEADER_OPBEL);
		});
		
		$('.next_month').click(function(){
			//pop_error();
//			var param = {
//					bp : String(Number(params.bp)),
//					ca : String(Number(params.ca)),
//					DOC_HEADER_OPBEL : cb.list.billDetailResult[0].NEXT_DOC_HEADER_OPBEL
//			};
//			navigateGo('MBLMG0M2',param);
			doPage(cb.list.billDetailResult[0].NEXT_DOC_HEADER_OPBEL);
		});
		if(opbelNo == '1'){
			//상단 정보
			var topInfoViewStr = '<li class="tit"><strong>납입자번호</strong> <span class="col_red">'+Number(cb.list.billDetailResult[0].CANO)+'</span></li>'+
			'	<li><strong>고객명</strong>'+ascUserNM(cb.list.billDetailResult[0].BUS_PART_NAME)+'</li>'+
			'	<li><strong>고객주소</strong>'+cb.list.billDetailResult[0].CONT_ADDRESS+'</li>';
			//gclee card billGashtDetailResult 데이터 없는 경우 발생 처리 
			//'	<li><strong>고객주소</strong>'+cb.list.billGashtDetailResult[0].I_DEVICE_ADDRESS+'</li>';
			
			$('.topInfoView').html(topInfoViewStr);
		}
		//중단 정보
		var middleInfoViewStr = '<a href="javascript:void(0);">'+
		'	<div>'+
		'		<p class="form_title">'+cb.list.billDetailResult[0].BUDAT_YEAR+'년 '+cb.list.billDetailResult[0].BUDAT_MONTH+'월 청구서</p>'+
		'		<p class="form_view px0">열람</p>'+
		'	</div>'+
		'	<div class="pt10">'+
		'		<p class="form_closed">'+(false?'<span class="bg_green">미납</span>':'')+' 납부마감일 <span class="col_red">'+toDateAddDot(cb.list.billDetailResult[0].FAEDN)+'</span></p>'+
		'		<p class="form_price">'+chgNumberToMoney(cb.list.billDetailResult[0].ZBTRANX_99)+'원</p>'+
		'	</div>'+
		'</a>';
		if(cb.list.billDetailResult[0].NEXT_DOC_HEADER_OPBEL==""){
			if(device.osName != 'iOS'){
				params = JSON.parse(getAlopexSession('loginSession'));
			}else{
				params = JSON.parse(getAlopexCookie('loginCookie'));
				//gclee login
//				params = JSON.parse(getAlopexSession('loginSession'));
			}
			var chkBPCA = getMainBPCA();
			if(chkBPCA == 'undefined'){
				currentCa = Number(params.list.bpCaList[0].ca);
			}else{
				var useBPCA = JSON.parse(chkBPCA);
				currentCa = Number(useBPCA.ca);
			}
			var buymInfo = getBuym(currentCa);
			//gclee card 테스트위해 betrw값 있다고 가정
			if(Number(buymInfo.betrw) > 0){
				middleInfoViewStr += '<span class="tac pt10"><a href="javascript:void(0);" class="Button red2 big goPayPage" style="width: 40%;">납부안내</a></span>';
				middleInfoViewStr += '<span class="tac pt10"><a href="javascript:void(0);" class="Button red2 goPayList" style="width: 40%; margin:10px;">당일수납내역</a></span>';				
			}else{
				middleInfoViewStr += '<span class="tac pt10"><a href="javascript:void(0);" class="col_red big" style="width: 40%;">납부완료</a></span>';
				middleInfoViewStr += '<span class="tac pt10"><a href="javascript:void(0);" class="Button red2 goPayList" style="width: 40%; margin:10px;">당일수납내역</a></span>';
			}
						
		}
		
		$('.middleInfoView').html(middleInfoViewStr);
		
		//gclee
		$('.goPayPage').click(function(){
			navigateBackToNaviGo('MBLMG1M0');
		});
		
		$('.goPayList').click(function(){
			navigateBackToNaviGo('MBLMG4M0');
		});
		
		//tab1_1 ok
		var tab1_1Str = '<li><strong>납입자번호</strong> <span class="floatR">'+Number(cb.list.billDetailResult[0].CANO)+'</span></li>'+
			'<li><strong>홈페이지 가입번호(A)</strong> <span class="floatR">'+Number(cb.list.billDetailResult[0].BPNO)+'</span></li>'+
			'<li><strong>사용기간</strong> <span class="floatR">'+toDateAddDot(cb.list.billDetailResult[0].AB)+' ~ '+toDateAddDot(cb.list.billDetailResult[0].BIS)+'</span></li>'+
			'<li><strong>작성일자</strong> <span class="floatR">'+toDateAddDot(cb.list.billDetailResult[0].DRUCK)+'</span></li>';
		$('.tab1_1').html(tab1_1Str);
		
//		//tab1_2 (검침원정보) ok
		if(cb.list.mrResult != undefined){
			//'<li><strong>검침원정보</strong> <span class="floatR">'+cb.list.mrResult[0].METERREADER+'</span></li>'+
			var tab1_2Str = '<li><strong>검침일</strong> <span class="floatR">'+cb.list.mrResult[0].ACTUALMRDATE+'</span></li>';
			$('.tab1_2').html(tab1_2Str);
		}else{
			//'<li><strong>검침원정보</strong> <span class="floatR">-</span></li>'+
			var tab1_2Str = '<li><strong>검침일</strong> <span class="floatR">-</span></li>';
			$('.tab1_2').html(tab1_2Str);
		}
		
		//tab2_1  ok 
		//var tab2_1Str = '<li><strong>당월사용량</strong> <span class="floatR">'+cb.list.billDetailResult[0].ABRMENGE+' ㎥</span></li>';
//		var tab2_1Str = '<li><strong>당월사용량</strong> <span class="floatR">'+Math.floor(cb.list.billDetailResult[0].ABRMENGE)+' MJ</span></li>';
		var tab2_1Str = '<li><strong>당월청구량</strong> <span class="floatR">'+cb.list.billDetailResult[0].ABRMENGE+' MJ</span></li>';
		//'<li><strong>가스요금</strong> <span class="floatR">'+cb.list.billDetailResult[0].ABRMENGE+'원</span></li>';
		for(var i=1;i<8;i++){
			if(eval('cb.list.billDetailResult[0].ZBTRANS_0'+i) != ""){
				var tS = eval('cb.list.billDetailResult[0].ZBTRANS_0'+i);
				var titleStr = tS.substring(0,tS.indexOf(' '));
				var valueStr = tS.substring(tS.lastIndexOf(' '));
				tab2_1Str += '<li><strong>'+titleStr+'</strong> <span class="floatR">'+valueStr+'원</span></li>';
			}
		}
		if(cb.list.billDetailResult[0].ZBTRANS_99 != ""){
			var tS = cb.list.billDetailResult[0].ZBTRANS_99;
			var titleStr = tS.substring(0,tS.indexOf(' '));
			var valueStr = tS.substring(tS.lastIndexOf(' '));
			tab2_1Str += '<li><strong>'+titleStr+'</strong> <span class="floatR">'+valueStr+'원</span></li>';
		}
		$('.tab2_1').html(tab2_1Str);
		
		//tab2_2 ok
		var tab2_2Str = '<li><strong>공급자등록번호</strong> <span class="floatR">'+cb.list.billDetailResult[0].NO12+'</span></li>'+
			'<li><strong>공급받는 자 등록번호</strong> <span class="floatR">'+cb.list.billDetailResult[0].NO14+'</span></li>'+
			'<li><strong>상호</strong> <span class="floatR">'+ascUserNM(cb.list.billDetailResult[0].BUS_PART_NAME)+'</span></li>'+
			'<li><strong>공급가액</strong> <span class="floatR">'+cb.list.billDetailResult[0].ZBTRANX_98+'</span></li>'+
			'<li><strong>부가가치세</strong> <span class="floatR">'+cb.list.billDetailResult[0].ZBTRANX_97+'</span></li>';
		$('.tab2_2').html(tab2_2Str);
		
		//그래프 2_3 ok
		//console.log(cb.list.fyerUsgQtyResult);
		var category = getCategory(cb.list.fyerUsgQtyResult);
    	var datas1 = getDatas1Month(cb.list.fyerUsgQtyResult,cb.list.billDetailResult[0].BUDAT);
    	var datas2 = getDatas2(cb.list.fyerUsgQtyResult);
    	drawGraph(category, datas1, datas2);
    	var grpTextStr = textGraph(category, datas1, datas2);
    	console.log(grpTextStr);
		$('.grpText').html(grpTextStr);
		//tab3_1
//    	var tab3_1Str = getTab3_1Str(cb);
//    	$('.tab3_1').html(tab3_1Str);
		//gclee card 아래데이터 없는경우 발생
		getTab3_1Str(cb);
		
//		if( returnStr.indexOf('billGashtDetailResult') > -1 ){
//			getTab3_1Str(cb);
//		}
    	
    	//tab3_2
    	//tab3_3
    	
    	//tab4_1 no
    	var tab4_1Str = '';
    	$('.tab4_1').html(tab4_1Str);
    	if(cb.list.billDetailResult[0].I_OVERDUE_01 !=""){
    		//I_SD_ITEM_04 // ;
    		var sdItemTemp = cb.list.billDetailResult[0].I_SD_ITEM_04.split(';');
    		var wStr = '<li><strong>기준일자</strong> <span class="floatR">'+sdItemTemp[2]+' 기준</span></li>';
    		var sumTotal = 0;
    		for(var i=1;i<4;i++){
    			if(eval('cb.list.billDetailResult[0].I_OVERDUE_0'+i) != ''){
    				
    				var wStrMake = removeArrayToNull(eval('cb.list.billDetailResult[0].I_OVERDUE_0'+i).split(' '));
    				wStr += '<li><strong>'+wStrMake[0]+'</strong> <span class="floatR">'+wStrMake[1]+'원</span></li>';
    				sumTotal = sumTotal + Number(wStrMake[1].replace(',','').replace(',','').replace(',',''));
    			}
    		}
    		wStr += '<li class="total"><strong>합계</strong> <span class="floatR">'+chgNumberToMoney(sumTotal)+' 원</span></li>';
    		$('.tab4_1').html(wStr);
    		$('.tab4_1M').show();
    		$('.tab4_2M').hide();
    	}else{    		
    		$('.tab4_1M').hide();
    		$('.tab4_2M').show();
    	}
    	
    	//tab5 1-ok, 2-no
    	if(cb.list.billDetailResult[0].BANKA != ''){
    		var tab5_1Str = '<li><strong>예금주명</strong> <span class="floatR">'+cb.list.billDetailResult[0].BANKOUT_KOINH+'</span></li>'+
			'<li><strong>금융기관</strong> <span class="floatR">'+cb.list.billDetailResult[0].BANKA+'</span></li>'+
			'<li><strong>계좌번호</strong> <span class="floatR">'+cb.list.billDetailResult[0].BANKOUT_BANKN+'</span></li>'+
			'<li><strong>이체일자</strong> <span class="floatR">'+toDateAddDot(cb.list.billDetailResult[0].FAEDN)+'</span></li>';
    		$('.tab5_1').html(tab5_1Str);
    		
    		//I_PAYMENT_01
    		if(cb.list.billDetailResult[0].I_PAYMENT_01 != ''){
    			var tab5_2StrMake = removeArrayToNull(cb.list.billDetailResult[0].I_PAYMENT_01.split(' '));
        		//console.log(tab5_2StrMake);
        		var tab5_2Str = '<li><strong>금액수납일</strong> <span class="floatR">'+tab5_2StrMake[0]+'</span></li>'+
    			'<li><strong>납부방법</strong> <span class="floatR">'+tab5_2StrMake[1]+'</span></li>'+
    			'<li><strong>금액</strong> <span class="floatR">'+tab5_2StrMake[2]+'원</span></li>';
        		$('.tab5_2').html(tab5_2Str);
        		$('.tab5_2M').show();
    		}else{
    			//
    			$('.tab5_2M').hide();
    		}
    		
    		$('.tab5_1M').show();
    	//	$('.tab5_2M').show();
    		$('.tab5_3M').hide();
    		$('.tab5_4M').hide();
    	}else{
    		var tab5_3Str = '';
    		for(var i=1;i<9;i++){
    			if(eval('cb.list.billDetailResult[0].ZCATT'+'0'+i) != ''){
    				tab5_3Str += '<li class="bank">';
    				tab5_3Str += getBankName(eval('cb.list.billDetailResult[0].ZCATT'+'0'+i));
    				tab5_3Str += '<span class="floatR">'+eval('cb.list.billDetailResult[0].ZCATP'+'0'+i)+'</span></li>';
    			}
    		}
    		tab5_3Str += '<li class="box_blue"><strong>예금주</strong> <span class="floatR">'+cb.list.billDetailResult[0].ZCOUNT_NAME+'</span></li>';
    		$('.tab5_3').html(tab5_3Str);
    		
    		if(cb.list.billDetailResult[0].I_PAYMENT_01 != ''){
    			var tab5_4StrMake = removeArrayToNull(cb.list.billDetailResult[0].I_PAYMENT_01.split(' '));
        		//console.log(tab5_2StrMake);
        		var tab5_4Str = '<li><strong>금액수납일</strong> <span class="floatR">'+tab5_4StrMake[0]+'</span></li>'+
    			'<li><strong>납부방법</strong> <span class="floatR">'+tab5_4StrMake[1]+'</span></li>'+
    			'<li><strong>금액</strong> <span class="floatR">'+tab5_4StrMake[2]+'원</span></li>';
        		$('.tab5_4').html(tab5_4Str);
        		$('.tab5_4M').show();
    		}else{
    			$('.tab5_4M').hide();
    		}
    		
    		$('.tab5_1M').hide();
    		$('.tab5_2M').hide();
    		$('.tab5_3M').show();
    		//$('.tab5_4M').show();
    	}
    	
    	//tab6 - ok
    	var tab6_1Str = '';
    	for(var i=1;i<16;i++){
    		if(eval('cb.list.billDetailResult[0].NOTICE_MESSAGE_'+(i<10?'0'+i:i)) != ''){
    			if(eval('cb.list.billDetailResult[0].NOTICE_MESSAGE_'+(i<10?'0'+i:i))[0] == '-'){
    				var ss2 =  eval('cb.list.billDetailResult[0].NOTICE_MESSAGE_'+(i<10?'0'+i:i));
    				tab6_1Str += '<li>';
    				tab6_1Str += ss2.substring(2)+'</li>';
    			}else{
    				tab6_1Str += '<li class="noDash">';
    				tab6_1Str += eval('cb.list.billDetailResult[0].NOTICE_MESSAGE_'+(i<10?'0'+i:i))+'</li>';
    			}
    			
    		}
    	}
    	$('.tab6_1').html(tab6_1Str);

    	if(cb.list.billDetailResult[0].I_OVERDUE_01 !=""){
	    	if(cb.list.ldoMsgResult != undefined){	// 미납
	    		var rtmsg = '';
	    		for(var i=1;i<12;i++){
	    			if(eval('cb.list.ldoMsgResult[0].PRESS_MESSAGE_'+(i<10?'0'+i:i)) != ""){
	    				rtmsg += eval('cb.list.ldoMsgResult[0].PRESS_MESSAGE_'+(i<10?'0'+i:i))+' ';
		    		}
	    		}
	    		
	    		var tab6_3Str = '<dt>요금 미납 안내</dt>'+
				'<dd>'+rtmsg+'</dd>';
	    		$('.tab6_3').html(tab6_3Str);
	    		$('.tab6_3').show();
	    	}else{
	    		$('.tab6_3').hide();
	    	}
    	}
    	
    	
    	
//    	$('.searchGRG').click(function(){
//    		getChangeGRG();
//    	});
    	
    	//##################################################################
    	
    	completLoad();
		setDefault();
		
		var swiper = new Swiper('.swiper-container', {
			nextButton: '.swiper-button-next', 
			prevButton: '.swiper-button-prev',
			slidesPerView: 4,
			paginationClickable: true,
			spaceBetween: 0
		});
		
		clearTab(2);
		$('.swipe2').children().children().attr('src','../../images/tab_bill2_on.png');
		$('#tab2').show();
    	
    	//gclee bill ###################################################################################################
		/*if(param_isCertiPass == 'undefined' || param_isCertiPass != '1'){
			
			var vIsPerson;
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
			}
		}*/
		
		//gclee bill end ###################################################################################################
    	
//    	setTimeout('setLoadSwiper()',10);
    	//##################################################################
		
		//gclee push test  ############################# 임시로 푸시왔을때 상황을 테스트함
		
//		var chkAlready = getAlopexCookie('chkAlready');
//	
//		if(chkAlready != 'true'){
//			
//			setAlopexCookie('chkAlready', 'true');
//			
//			var rtMsg = {
//					'PUSH_TYPE' : 'E',
//					'BP' : '10030764',
//					'CA' : '10007307',
//					'DOC_HEADER_OPBEL' : '204006968472' //204006968472
//			};
//			
//			logf('gclee pushstart MBLMG0M2 ' + JSON.stringify(rtMsg));
//			
//			navigateGo('pushstart',rtMsg);
//		}
		
		//gclee push test end ##########################
		
	}, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
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
						'DOC_HEADER_OPBEL' : billNo
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

//function setLoadSwiper(){
//	console.log('1111');
//	completLoad();
//	setDefault();
//	
//	var swiper = new Swiper('.swiper-container', {
//		nextButton: '.swiper-button-next', 
//		prevButton: '.swiper-button-prev',
//		slidesPerView: 4,
//		paginationClickable: true,
//		spaceBetween: 0
//	});
//	
//	clearTab(2);
//	$('.swipe2').children().children().attr('src','../../images/tab_bill2_on.png');
//	$('#tab2').show();
//}

function getGRGInfo(cbq){
	var rtStr = '';
	for(var i=0;i<cbq.list.deviceResult.length;i++){
		rtStr += '<option value=\''+cbq.list.deviceResult[i].deviceSeq+'\' '+((nowGRGno==cbq.list.deviceResult[i].deviceSeq)?'selected':'')+'>'+cbq.list.deviceResult[i].deviceNo+'</option>';
	}
	$('#krgList').html(rtStr);
	
	if((cbq.list.deviceResult.length > 1)){
		$('.GRGSelectDiv').show();
	}else{
		$('.GRGSelectDiv').hide();
	}
}

function getChangeGRG(){
	var nowGRG = $('#krgList :selected').val();
	var paramGR = {
		"bp": String(Number(navigation.parameters.bp)),
		"ca": String(Number(navigation.parameters.ca)),
		"doc_header_opbel": params.DOC_HEADER_OPBEL,
		"deviceSeq": nowGRG
	};

	httpSend("getDeviceBillGashtDetail", paramGR, function(cb){
		//console.log(cb);
		getTab3_1Str(cb);
	}, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});	
}

function getTab3_1Str(cb){
	//ss = cb;
	try{
//		var sumMoney = 0;
		var chkData = [];
		for(var i=1;i<31;i++){ //1~30
			if(eval('cb.list.billGashtDetailResult[0].I_ZDEVICE_'+(i<10?'0'+i:i)) != ''){
				var makeData = removeArrayToNull(eval('cb.list.billGashtDetailResult[0].I_ZDEVICE_'+(i<10?'0'+i:i)).split(' '));
				chkData[i] = makeData;
			}else{
				break;
			}
		}
		logf(chkData);
		ss = chkData;
		if(chkData[1][0] != '항'){//error
			logf('jjys :: no :1: 항');
		}else if(ss[ss.length-1][0] != '소계'){//error
			logf('jjys :: no :2: 소계');
		}else{
			//
			logf('good data');
			// 데이터 확인
//			2015-06-09 상세내역 삭제
//			var isGSD = chkDataString(chkData,'가스기본료');
			var isGSU = chkDataString(chkData,'가스사용료');
			var isBJCB = chkDataString(chkData,'보정기교체비용');
			var isGRCB = chkDataString(chkData,'계량기교체비용');
//			var isDCPAY = chkDataString(chkData,'할인요금');
			
//			2015-06-09 상세내역 삭제
//			var totalGSD = '';			// 가스기본료
//			var totalGSU = 0;			// 가스사용료
//			var totalSG = getDateString(chkData,'소계');			// 소계
//			var totalBG = getDateString(chkData,'부가세');			// 부가세
			
			var GSUList = [];			// 가스사용 리스트
			var BJCBList = [];			// 보정기교체 리스트
			var GRCBList = [];			// 계량기교체 리스트	
			
			var make3str = '<p class="txt">청구기간은 '+toDateHangul(cb.list.billDetailResult[0].AB)+' ~ '+toDateHangul(cb.list.billDetailResult[0].BIS)+' 입니다. </p>';
			
//			2015-06-09 상세내역 삭제
//			if(isGSD){
//				sumMoney = 0;
////				var rtData = getDataObjects(chkData,'가스기본료',isDCPAY);
//				var rtData = getDataObjects(chkData,'가스기본료',false);
//				console.log("가스기본료 ");
//				console.log(rtData);
//				totalGSD = chkData[rtData.info][3];
//				
//				if(rtData.lastPayNo == rtData.lastInfo){
//					// 값 분리 안되어 있어 할것없음
//				}else if(rtData.lastPayNo > rtData.lastInfo){
//					//sumMoney = 0;
//					for(var i=rtData.lastInfo+1;i<rtData.lastPayNo+1;i++){
//						console.log('11 ::'+i);
//						sumMoney = sumMoney+Number(codeMoney(chkData[i][2]));
//					}
//					console.log(GSUList);
//				}
//				totalGSD = Number(totalGSD)+sumMoney;
//			}
			if(isGSU){
//				sumMoney = 0;
//				var rtData = getDataObjects(chkData,'가스사용료',isDCPAY);
				var rtData = getDataObjects(chkData,'가스사용료',false);
				logf("가스사용료 ");
				logf(rtData);
				//totalGSU = chkData[rtData.info][10];
				var arrNo = 1;
				GSUList[0] = {
					GSU_1 : chkData[rtData.info][1],		// 계량기번호
					GSU_2 : chkData[rtData.info][2],		// 사용기간
					GSU_3 : chkData[rtData.info][3],		// 전월지침
					GSU_4 : chkData[rtData.info][4],		// 당월지침
					GSU_5 : chkData[rtData.info][5],		// 보정계수
					GSU_6 : chkData[rtData.info][6],		// 사용량 (고지량)
					GSU_7 : chkData[rtData.info][7],		// 열량계수
					GSU_8 : chkData[rtData.info][8],		// 청구량
					GSU_9 : chkData[rtData.info][10]		// 소계
				};
				var lastGRName = chkData[rtData.info][1];
				if(rtData.lastInfo != undefined){
					//if(rtData.lastPayNo > 0) rtData.lastInfo = rtData.lastInfo - rtData.lastPayNo;
					for(var i=rtData.info+1;i<=rtData.lastInfo;i++){
						var ss1 = chkData[i][0];
						var ss2 = ss1.substring(0,1);
						var ss3 = ss2=="0" || ss2=="1";
						if(ss3){
							GSUList[arrNo++] = {
								GSU_1 : lastGRName,
								GSU_2 : chkData[i][0],
								GSU_3 : chkData[i][1],
								GSU_4 : chkData[i][2],
								GSU_5 : chkData[i][3],
								GSU_6 : chkData[i][4],
								GSU_7 : chkData[i][5],
								GSU_8 : chkData[i][6],
								GSU_9 : chkData[i][8]
							};		
						}else{
							lastGRName = chkData[i][0];
							GSUList[arrNo++] = {
								GSU_1 : lastGRName,
								GSU_2 : chkData[i][1],
								GSU_3 : chkData[i][2],
								GSU_4 : chkData[i][3],
								GSU_5 : chkData[i][4],
								GSU_6 : chkData[i][5],
								GSU_7 : chkData[i][6],
								GSU_8 : chkData[i][7],
								GSU_9 : chkData[i][9]
							};		
						}
					}
				}
				
//				2015-06-09 상세내역 삭제
//				if(rtData.lastPayNo == rtData.lastInfo){
//					// 값 분리 안되어 있어 할것없음
//				}else if(rtData.lastPayNo > rtData.lastInfo){
////					console.log('lastPayNo :: '+rtData.lastPayNo);
//					
//					// 기간별 값 계산 주석 2015-06-01
//					/*if(GSUList[0].GSU_9 == undefined){
//						var sumMoney = 0;
//						var tempLength = Number(codeMoney(GSUList[0].GSU_8));
//						var GSUListNo = 0;
//						
//						for(var i=rtData.lastInfo+1;i<rtData.lastPayNo+1;i++){				
//							var twothLength = Number(codeMoney(chkData[i][0]));
//							
//							tempLength = parseFloat(tempLength-twothLength).toFixed(4);
//							sumMoney = sumMoney+Number(codeMoney(chkData[i][2]));
//							
//							console.log('twothLength :: '+twothLength);
//							console.log('af tempLength :: '+tempLength);
//							console.log('result sumMoney :: '+sumMoney);
//							if(tempLength == 0.0000){
//								console.log('###1###'+i);
//								GSUList[GSUListNo].GSU_9 = String(sumMoney);
//								console.log('###2-1###'+(GSUListNo));
//								console.log('###2-2###'+(GSUList.length));
//								if(GSUListNo +1 < GSUList.length){
//									GSUListNo = GSUListNo +1;
//									console.log('###3###'+GSUListNo);
//									sumMoney = 0;
//									console.log('###4###'+sumMoney);
//									console.log('###5-1###'+GSUList[GSUListNo].GSU_8);
//									tempLength = Number(codeMoney(GSUList[GSUListNo].GSU_8));
//									console.log('###5-2###'+tempLength);
//								}
//							}
//						}
//					}*/
//					
//					for(var i=rtData.lastInfo+1;i<rtData.lastPayNo+1;i++){
//						console.log('11 ::'+i);
//						if(chkData[i][2]!=undefined){
//							sumMoney = sumMoney+Number(codeMoney(chkData[i][2]));
//						}
//					}
//					console.log(GSUList);
//				}
				
//				console.log("totalGSU :: "+totalGSU);
//				totalGSU = sumMoney;
				//var make3str = '';
				for(var i=0;i<GSUList.length;i++){
//					console.log();
					//totalGSU = totalGSU + Number(GSUList[i].GSU_9.replace(',','').replace(',','').replace(',',''));
					//console.log("totalGSU :'+i+': "+totalGSU);
					make3str += '<dl>'+
					'<dt>사용기간 : '+GSUList[i].GSU_2+'</dt>'+
					'	<dd>'+
					'		<ul>'+
					'			<li><strong>계량기번호</strong> <span class="floatR">'+GSUList[i].GSU_1+'</span></li>'+
//					'			<li><strong>사용기간</strong> <span class="floatR">'+GSUList[i].GSU_2+'</span></li>'+
					'			<li><strong>전월지침</strong> <span class="floatR">'+GSUList[i].GSU_3+'</span></li>'+
					'			<li><strong>당월지침</strong> <span class="floatR">'+GSUList[i].GSU_4+'</span></li>'+
					'			<li><strong>보정계수</strong> <span class="floatR">'+GSUList[i].GSU_5+'</span></li>'+
					'			<li><strong>사용량</strong> <span class="floatR">'+GSUList[i].GSU_6+' ㎥ </span></li>'+
					'			<li><strong>열량계수</strong> <span class="floatR">'+GSUList[i].GSU_7+'</span></li>'+
					'			<li><strong>청구량</strong> <span class="floatR">'+GSUList[i].GSU_8+' MJ</span></li>'+
					//'			<li class="total"><strong>소계</strong> <span class="floatR">'+GSUList[i].GSU_9+' 원</span></li>'+
					'		</ul>'+
					'	</dd>'+
					'</dl>';
				} 
				logf(GSUList);
				
				//console.log(totalGSU);
			}
			if(isBJCB){
				var rtData = getDataObjects(chkData,'보정기교체비용',false);
				logf("보정기교체비용 ");
				logf(rtData);
				var arrNo = 1;
				BJCBList[0] = {
					BJCB_1 : chkData[rtData.info][1],		// 기물번호
					BJCB_2 : chkData[rtData.info][2],		// 사용기간
					BJCB_3 : chkData[rtData.info][3],		// 단가
					BJCB_4 : chkData[rtData.info][4]		// 소계
				};
				if(rtData.lastInfo != undefined){
					for(var i=rtData.info+1;i<=rtData.lastInfo;i++){
						if(chkData[i][0][0]=='0' || chkData[i][0][0]=='1'){
							BJCBList[arrNo++] = {
								BJCB_1 : chkData[rtData.info][1],		// 기물번호
								BJCB_2 : chkData[i][0],		// 사용기간
								BJCB_3 : chkData[i][1],		// 단가
								BJCB_4 : chkData[i][2]		// 소계
							};
						}else{
							BJCBList[arrNo++] = {
								BJCB_1 : chkData[i][0],		// 기물번호
								BJCB_2 : chkData[i][1],		// 사용기간
								BJCB_3 : chkData[i][2],		// 단가
								BJCB_4 : chkData[i][3]		// 소계
							};
						}
					}
				}
				for(var i=0;i<BJCBList.length;i++){
					make3str += '<dl>'+
					'	<dt>보정기  교체비용</dt>'+
					'	<dd>'+
					'		<ul>'+
					'			<li><strong>계량기번호</strong> <span class="floatR">'+BJCBList[i].BJCB_1+'</span></li>'+
					'			<li><strong>사용기간</strong> <span class="floatR">'+BJCBList[i].BJCB_2+'</span></li>'+
					'			<li><strong>소계</strong> <span class="floatR">'+BJCBList[i].BJCB_4+'원</span></li>'+
					'		</ul>'+
					'	</dd>'+
					'</dl>';
				} 
				logf(BJCBList);
			}
			if(isGRCB){
				var rtData = getDataObjects(chkData,'계량기교체비용',false);
				logf("계량기교체비용 ");
				logf(rtData);
				var arrNo = 1;
				GRCBList[0] = {
					GRCB_1 : chkData[rtData.info][1],		// 기물번호
					GRCB_2 : chkData[rtData.info][2],		// 사용기간
					GRCB_3 : chkData[rtData.info][3],		// 단가
					GRCB_4 : chkData[rtData.info][4]		// 소계
				};
				if(rtData.lastInfo != undefined){
					for(var i=rtData.info+1;i<=rtData.lastInfo;i++){
						if(chkData[i][0][0]=='0' || chkData[i][0][0]=='1'){
							GRCBList[arrNo++] = {
								GRCB_1 : chkData[rtData.info][1],		// 기물번호
								GRCB_2 : chkData[i][0],		// 사용기간
								GRCB_3 : chkData[i][1],		// 단가
								GRCB_4 : chkData[i][2]		// 소계
							};
						}else{
							GRCBList[arrNo++] = {
								GRCB_1 : chkData[i][0],		// 기물번호
								GRCB_2 : chkData[i][1],		// 사용기간
								GRCB_3 : chkData[i][2],		// 단가
								GRCB_4 : chkData[i][3]		// 소계
							};
						}
					}
				}
				for(var i=0;i<GRCBList.length;i++){
					make3str += '<dl>'+
					'	<dt>계량기  교체비용</dt>'+
					'	<dd>'+
					'		<ul>'+
					'			<li><strong>계량기번호</strong> <span class="floatR">'+GRCBList[i].GRCB_1+'</span></li>'+
					'			<li><strong>사용기간</strong> <span class="floatR">'+GRCBList[i].GRCB_2+'</span></li>'+
					'			<li><strong>소계</strong> <span class="floatR">'+GRCBList[i].GRCB_4+'원</span></li>'+
					'		</ul>'+
					'	</dd>'+
					'</dl>';
				} 
				logf(GRCBList);
			}
			
			
//			2015-06-09 상세내역 삭제
//			make3str += '<dl>'+
//			'	<dt>상세내역</dt>'+
//			'	<dd>'+
//			'		<ul>'+
//			'			<li><strong>가스기본료</strong> <span class="floatR">'+totalGSD+' 원</span></li>'+
//			'			<li><strong>가스사용료</strong> <span class="floatR">'+chgNumberToMoney(String(totalGSU))+' 원</span></li>'+
//			'			<li><strong>부가세</strong> <span class="floatR">'+totalBG+' 원</span></li>'+
//			'			<li class="total"><strong>합계</strong> <span class="floatR">'+totalSG+' 원</span></li>'+
//			'		</ul>'+
//			'	</dd>'+
//			'</dl>';
			
			$('.tab3ListHtml').html(make3str);
			getGRGInfo(cb);
		}
		
	}catch(e){
		var make3str = '<dl>'+
			'<dt>상세내역</dt>'+
			'<dd>'+
			'	<p class="bg_fail">죄송합니다.</p>'+
			' 	<p>고객님의 상세내역은 데이터량이 많은 관계로 PC를 통해 홈페이지에서 확인 부탁드립니다.</p>'+
			'</dd>'+
		'</dl>';
		loge(e);
		$('.GRGSelectDiv').hide();
		$('.tab3ListHtml').html(make3str);
	}
	//return tab3_1Str;
}

/**
 * 소계, 부가세 조회용
 * @param cd
 * @param key
 * @returns
 */
function getDateString(cd,key){
	for(var i=2;i<cd.length;i++){
		if(cd[i][0] == key){
			return cd[i][1];
		}
	}
}

/**
 * 데이터 번지 확인
 * @param cd
 * @param key
 * @returns {Number}
 */
function getDateStringKey(cd,key){
	for(var i=2;i<cd.length;i++){
		if(cd[i][0] == key){
			return i;
		}
	}
}

/**
 * 데이터 있는지 검증용 (가스기본료,가스사용룓등)
 * @param cd
 * @param key
 * @returns {Boolean}
 */
function chkDataString(cd,key){
	var isChecked = false;
	for(var i=2;i<cd.length;i++){
		if(cd[i][0] == key){
			isChecked = true;
			break;
		}
	}
	return isChecked;
}

function chkNextInfo(cd, no){
	for(var i=no+1;i<cd.length;i++){
		if(cd[i][0]=='가스기본료' || cd[i][0]=='부가세' || cd[i][0]=='보정기교체비용' || cd[i][0]=='계량기교체비용' || cd[i][0]=='가스사용료'){
			return i-1;
		}else if(cd[i][0].indexOf('~') > 0){
			//console.log(':311: :'+cd[i][0]+':ok '+i);
		}else if(cd[i][3] == undefined){
			//console.log(':211: :'+cd[i][3]+':ok '+i);
			return i-1;
		}
	}
}

function chkNextInfoPay(cd, no){
	ss=cd;
	for(var i=no+1;i<cd.length;i++){
		logf(':1:'+i);
		if(cd[i][0]=='가스기본료' || cd[i][0]=='부가세' || cd[i][0]=='보정기교체비용' || cd[i][0]=='계량기교체비용' || cd[i][0]=='가스사용료'){
		//	console.log(':2: ::no '+i);
			return i-1;
		}else if(cd[i][0].indexOf('~') > 0){
	//		console.log(':3: :'+cd[i][0]+':ok '+i);
		}else if(cd[i][3] == undefined){
	//		console.log(':2: :'+cd[i][3]+':ok '+i);
		}else{
	//		console.log(':1: ::no '+i);
			return i-1;
		}
	}
}

/**
 * 데이터 조회용
 * @param cd
 * @param key
 * @returns {Boolean}
 */
function getDataObjects(cd,key,isDC){
	logf('jjyyss',cd.length);
	var rtDatas = {};
	
	if(key == '가스기본료'){
		var no = getDateStringKey(cd, key);
		rtDatas.info = no;
		var lastNo = chkNextInfo(cd,no);
		var lastPayNo = chkNextInfoPay(cd,no);
		if(lastPayNo != undefined){
			rtDatas.lastPayNo = lastPayNo;
		}else{
			rtDatas.lastPayNo = -1;
		}
		if(lastNo != undefined){
			rtDatas.lastInfo = lastNo;
		}else{
			rtDatas.lastInfo = -1;
		}
	}else if(key == '가스사용료'){
		var no = getDateStringKey(cd, key);
		rtDatas.info = no;
		var lastNo = chkNextInfo(cd,no);
		var lastPayNo = chkNextInfoPay(cd,no);
		if(lastPayNo != undefined){
			rtDatas.lastPayNo = lastPayNo;
		}else{
			rtDatas.lastPayNo = -1;
		}
		if(lastNo != undefined){
			rtDatas.lastInfo = lastNo;
		}else{
			rtDatas.lastInfo = -1;
		}
		
	}else{
		var no = getDateStringKey(cd, key);
		rtDatas.info = no;
		var lastNo = chkNextInfo(cd,no);
		if(lastNo != undefined){
			rtDatas.lastInfo = lastNo;
		}else{
			rtDatas.lastInfo = -1;
		}
	}
	
	// 할인요금
//	if(isDC){
//		if(cd[rtDatas.info-1][0] == '할인요금'){
//			rtDatas.dicInfo = (rtDatas.info-1);
//		}else{
//			rtDatas.dicInfo = -1;
//		}
//	}
	
	logf(rtDatas);
	return rtDatas;
//	var isChecked = false;
//	for(var i=2;i<cd.length;i++){
//		if(cd[i][0] == key){
//			isChecked = true;
//			break;
//		}
//	}
//	return isChecked;
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
    	
    	//params = navigation.parameters;
    };
});