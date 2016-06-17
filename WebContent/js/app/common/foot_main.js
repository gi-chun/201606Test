//<![CDATA[
document.write('<div class="info_back" style="display:none"><p><span>뒤로버튼을 한번 더 누르시면 종료됩니다.</span></p></div>');
document.write('<div id="footer" class="clearfix">');
document.write('<ul class="foot">');
//document.write('<li class="foot1"><a href="javascript:$a.navigate(\'BL/MBLMG0M0\')">모바일 청구서</a></li>');
document.write('<li class="foot1"><a href="javascript:navigateBackToNaviGo(\'MBLMG0M0\');">모바일 청구서</a></li>');
//document.write('<li class="foot2"><a href="javascript:$a.navigate(\'ME/MMETR0M0\')">자가점검</a></li>');
document.write('<li class="foot2"><a href="javascript:goSelfChk();">자가점검</a></li>');
document.write('<li class="foot3"><a href="javascript:navigateBackToNaviGo(\'MNTGD0M1\');">이용안내</a></li>');
document.write('<li class="foot4"><span id="pop_recommend"><a href="javascript:void(0);">지인추천</a></span></li>');
document.write('</ul>');
document.write('</div>');

document.write('<p class="loading"><img src="../../images/ajax-loader_lite.gif" alt="로딩중입니다." class="dispNone imgloading"/></p>');

function goSelfChk(){
	if(selfChk){
		if(endME){
			navigateGo('MMETR0M1'); 
		}else{
			navigateGo('MMETR0M0'); 
		}
	}else{
		if(selfChkSide){
			// 외부
			pop_error_3();
		}else if(selfChkMulti){
			// 멍티
			pop_error_3();
		}else if(selfChkSideOut){
			// 멍티
			pop_error_3();
		}else{
			// 기간이 아님
			pop_error_2();
		}
	}  	
}

function pop_error_2(){
	$('.pop_prepare_2').bPopup({
		opacity: 0.6,
		speed: 300, 
	});
}

function pop_error_3(){
	$('.pop_prepare_3').bPopup({
		opacity: 0.6,
		speed: 300, 
	});
}

//document.write('<div id="popup" class="pop_recommend">');
//document.write('	<div class="pop_head">');
//document.write('		<h4>지인추천</h4>');
//document.write('	</div>');
//document.write('	<div class="inner">');
//document.write('		<ul class="recommend">');
//document.write('			<li><a href="#"><img src="../../images/btn_recomment1.png" alt="문자 메시지" /></a></li>');
//document.write('			<li><a href="#"><img src="../../images/btn_recomment2.png" alt="이메일" /></a></li>');
//document.write('			<li><a href="#"><img src="../../images/btn_recomment3.png" alt="카카오톡" /></a></li>');
//document.write('			<li><a href="#"><img src="../../images/btn_recomment4.png" alt="페이스북" /></a></li>');
//document.write('			<li><a href="#"><img src="../../images/btn_recomment5.png" alt="트위터" /></a></li>');
//document.write('		</ul>');
//document.write('		<div class="btClose">');
//document.write('			<button class="b-close">닫기</button>');
//document.write('		</div>');
//document.write('	</div>');
//document.write('</div>');
//]]>



document.write('<div id="popup2" class="pop_prepare">');
document.write('	<div class="inner">');
document.write('		<p class="prepare">서비스 준비중입니다.</p>');
document.write('		<div class="btClose">');
document.write('			<button class="b-close">닫기</button>');
document.write('		</div>');
document.write('	</div>');
document.write('</div>');

document.write('<div id="popup2" class="pop_prepare pop_prepare_2">');
document.write('	<div class="inner">');
document.write('		<p class="prepare">자가검침 기간이 아닙니다.</p>');
document.write('		<div class="btClose">');
document.write('			<button class="b-close">닫기</button>');
document.write('		</div>');
document.write('	</div>');
document.write('</div>');

document.write('<div id="popup2" class="pop_prepare pop_prepare_3">');
document.write('	<div class="inner">');
document.write('		<p class="prepare">자가검침 대상이 아닙니다.</p>');
document.write('		<div class="btClose">');
document.write('			<button class="b-close">닫기</button>');
document.write('		</div>');
document.write('	</div>');
document.write('</div>');