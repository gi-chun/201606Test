var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MNTFQ0M1';

var params = '';
var ss = '';
var Scb = '';

function mainStart(){
	settingLoading();
	$('.imgloading').show();
	
	
	//getFaqList
	var bp = getMainBP();
	var ss2 = bp.substring(0,1)+"000";
	
	var param = {
		"cgcSe" : ss2
	};
	httpSend("getFaqList", param, function(cb){
		Scb = cb;
		pageSetting(cb);
		//******************		
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

function pageSetting(Mcb){
	console.log(Mcb);
	var strTitle = '';
	var strContent1='',strContent2='',strContent3='',strContent4='',strContent5='',strContent6='',strContent7 = '';
	var strCKey1='',strCKey2='',strCKey3='',strCKey4='',strCKey5='',strCKey6 = '';
	for(var i=0;i<Mcb.list.faqSeList.length;i++){
		if(Mcb.list.faqSeList[i].FAQ_SE_TITLE == "가스요금관련"){	// 
			strCKey1 = Mcb.list.faqSeList[i].FAQ_SE;
		}else if(Mcb.list.faqSeList[i].FAQ_SE_TITLE == "가스안전관리"){	// 가스안전관리
			strCKey2 = Mcb.list.faqSeList[i].FAQ_SE;
		}else if(Mcb.list.faqSeList[i].FAQ_SE_TITLE == "가스공급관련"){	// 가스공급관련
			strCKey3 = Mcb.list.faqSeList[i].FAQ_SE;
		}else if(Mcb.list.faqSeList[i].FAQ_SE_TITLE == "가스기기관련"){	// 가스기기관련
			strCKey4 = Mcb.list.faqSeList[i].FAQ_SE;
		}else if(Mcb.list.faqSeList[i].FAQ_SE_TITLE == "가스검침관련"){	// 가스검침관
			strCKey5 = Mcb.list.faqSeList[i].FAQ_SE;
		}else if(Mcb.list.faqSeList[i].FAQ_SE_TITLE == "전출입관련"){	// 전출입관련
			strCKey6 = Mcb.list.faqSeList[i].FAQ_SE;
		}
	}
	
//	console.log('['+strCKey6+']');
	for(var i=0;i<Mcb.list.faqList.length;i++){
		if(Mcb.list.faqList[i].FAQ_SE == strCKey1){	// 가스요금관련
			strContent1 += '<li class="faq'+Mcb.list.faqList[i].SEQ+'">';
			strContent1 += '	<a href="#" class="tit">'+Mcb.list.faqList[i].TITLE+'</a>';
			strContent1 += '	<div >'+replaceAll(Mcb.list.faqList[i].CONTENT,'\\n','<br/>')+'</div>';
			strContent1 += '</li>';
		}else if(Mcb.list.faqList[i].FAQ_SE == strCKey2){	// 가스안전관리
			strContent2 += '<li class="faq'+Mcb.list.faqList[i].SEQ+'">';
			strContent2 += '	<a href="#" class="tit">'+Mcb.list.faqList[i].TITLE+'</a>';
			strContent2 += '	<div >'+replaceAll(Mcb.list.faqList[i].CONTENT,'\\n','<br/>')+'</div>';
			strContent2 += '</li>';
		}else if(Mcb.list.faqList[i].FAQ_SE == strCKey3){	// 가스공급관련
			strContent3 += '<li class="faq'+Mcb.list.faqList[i].SEQ+'">';
			strContent3 += '	<a href="#" class="tit">'+Mcb.list.faqList[i].TITLE+'</a>';
			strContent3 += '	<div >'+replaceAll(Mcb.list.faqList[i].CONTENT,'\\n','<br/>')+'</div>';
			strContent3 += '</li>';
		}else if(Mcb.list.faqList[i].FAQ_SE == strCKey4){	// 가스기기관련
			strContent4 += '<li class="faq'+Mcb.list.faqList[i].SEQ+'">';
			strContent4 += '	<a href="#" class="tit">'+Mcb.list.faqList[i].TITLE+'</a>';
			strContent4 += '	<div >'+replaceAll(Mcb.list.faqList[i].CONTENT,'\\n','<br/>')+'</div>';
			strContent4 += '</li>';
		}else if(Mcb.list.faqList[i].FAQ_SE == strCKey5){	// 가스검침관
			strContent5 += '<li class="faq'+Mcb.list.faqList[i].SEQ+'">';
			strContent5 += '	<a href="#" class="tit">'+Mcb.list.faqList[i].TITLE+'</a>';
			strContent5 += '	<div >'+replaceAll(Mcb.list.faqList[i].CONTENT,'\\n','<br/>')+'</div>';
			strContent5 += '</li>';
		}else if(Mcb.list.faqList[i].FAQ_SE == strCKey6){	// 전출입관련
			strContent6 += '<li class="faq'+Mcb.list.faqList[i].SEQ+'">';
			strContent6 += '	<a href="#" class="tit">'+Mcb.list.faqList[i].TITLE+'</a>';
			strContent6 += '	<div >'+replaceAll(Mcb.list.faqList[i].CONTENT,'\\n','<br/>')+'</div>';
			strContent6 += '</li>';
		}else{
			strContent7 += '<li class="faq'+Mcb.list.faqList[i].SEQ+'">';
			strContent7 += '	<a href="#" class="tit">'+Mcb.list.faqList[i].TITLE+'</a>';
			strContent7 += '	<div >'+replaceAll(Mcb.list.faqList[i].CONTENT,'\\n','<br/>')+'</div>';
			strContent7 += '</li>';
		}
	}
	strTitle += '<div class="swiper-slide swipe1"><a href="javascript:void(0);"><img src="../../images/tab_faqs1_on.png" alt="가스요금" /></a></div>';
	strTitle += '<div class="swiper-slide swipe2"><a href="javascript:void(0);"><img src="../../images/tab_faqs2_on.png" alt="가스안전" /></a></div>';
	strTitle += '<div class="swiper-slide swipe3"><a href="javascript:void(0);"><img src="../../images/tab_faqs3_on.png" alt="가스공급" /></a></div>';
	strTitle += '<div class="swiper-slide swipe4"><a href="javascript:void(0);"><img src="../../images/tab_faqs4_on.png" alt="가스기기" /></a></div>';
	strTitle += '<div class="swiper-slide swipe5"><a href="javascript:void(0);"><img src="../../images/tab_faqs5_on.png" alt="가스검침" /></a></div>';
	strTitle += '<div class="swiper-slide swipe6"><a href="javascript:void(0);"><img src="../../images/tab_faqs6_on.png" alt="전출입" /></a></div>';
	strTitle += '<div class="swiper-slide swipe7"><a href="javascript:void(0);"><img src="../../images/tab_faqs7_on.png" alt="기타" /></a></div>';
	$('.swList').html(strTitle);
	$('.tab1List').html(strContent1==""?'<li><a href="#">내용이 없습니다.</a></li>':strContent1);
	$('.tab2List').html(strContent2==""?'<li><a href="#">내용이 없습니다.</a></li>':strContent2);
	$('.tab3List').html(strContent3==""?'<li><a href="#">내용이 없습니다.</a></li>':strContent3);
	$('.tab4List').html(strContent4==""?'<li><a href="#">내용이 없습니다.</a></li>':strContent4);
	$('.tab5List').html(strContent5==""?'<li><a href="#">내용이 없습니다.</a></li>':strContent5);
	$('.tab6List').html(strContent6==""?'<li><a href="#">내용이 없습니다.</a></li>':strContent6);
	$('.tab7List').html(strContent7==""?'<li><a href="#">내용이 없습니다.</a></li>':strContent7);
	
	//******************
	$('#container').show();
	
	$('.Accordion_menu li div').hide();
	$('.Accordion_menu li .tit').click(function(){
		if($(this).next().is(':hidden')){
			$('.Accordion_menu li .tit').removeClass('active').next().slideUp("fast");
			$(this).toggleClass('active').next().slideDown("fast");
		}else{
			$('.Accordion_menu li div').slideUp("");
		}
		return false;
	});
	
	
	
	$('.swipe1').click(function(ss){
		clearTab(1);
		ss.target.src = '../../images/tab_faqs1_on.png';
		$('#tab1').show();
	});

	$('.swipe2').click(function(ss){
		clearTab(2);
		ss.target.src = '../../images/tab_faqs2_on.png';
		$('#tab2').show();
	});

	$('.swipe3').click(function(ss){
		clearTab(3);
		ss.target.src = '../../images/tab_faqs3_on.png';
		$('#tab3').show();
	});

	$('.swipe4').click(function(ss){
		clearTab(4);
		ss.target.src = '../../images/tab_faqs4_on.png';
		$('#tab4').show();
	});

	$('.swipe5').click(function(ss){
		clearTab(5);
		ss.target.src = '../../images/tab_faqs5_on.png';
		$('#tab5').show();
	});

	$('.swipe6').click(function(ss){
		clearTab(6);
		ss.target.src = '../../images/tab_faqs6_on.png';
		$('#tab6').show();
	});

	$('.swipe7').click(function(ss){
		clearTab(7);
		ss.target.src = '../../images/tab_faqs7_on.png';
		$('#tab7').show();
	});
	
	
	completLoad();
	setDefault();
	
	
	
	var swiper = new Swiper('.swiper-container', {
		nextButton: '.swiper-button-next', 
		prevButton: '.swiper-button-prev',
		slidesPerView: 4,
		paginationClickable: true,
		spaceBetween: 0
	});
	
	clearTab(1);
	$('.swipe1').children().children().attr('src','../../images/tab_faqs1_on.png');
	$('#tab1').show();
	
	
	
	
	$('.btnFaqSearch').click(function(){
		console.log(Scb);
		console.log();
		var searchWord = $('#searchText').val();
		if(searchWord == ''){
			console.log('검색어가 없습니다.');
			// 화면 초기화
			$('.tab1List li').show();
			$('.tab2List li').show();
			$('.tab3List li').show();
			$('.tab4List li').show();
			$('.tab5List li').show();
			$('.tab6List li').show();
			$('.tab7List li').show();
		}else{
			for(var i=0;i<Scb.list.faqList.length;i++){
				if(Scb.list.faqList[i].CONTENT.indexOf(searchWord) > -1){
					$('.faq'+Scb.list.faqList[i].SEQ).show();
//					console.log('seach '+i+':: true');
				}else{
					$('.faq'+Scb.list.faqList[i].SEQ).hide();
					//console.log('seach '+i+':: false');
				}
			}
//			console.log();
		}

	});
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});
