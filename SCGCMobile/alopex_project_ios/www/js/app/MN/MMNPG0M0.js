/*******************************************************************************
 * date : 2015-05-18 pg : jys note : 1. 안드로이드 백버튼 앱종료 2. 각종 버튼
 */

var alopexreadyRun = true;
if (alopexreadyRun) {
	document.addEventListener('alopexready', init);
	alopexreadyRun = false;
}
nowPGCode = 'MMNPG0M0';

var params = '';
var ss = '';
var billNo = '';
var closeNM = 0;
var bp = '';
var ca = '';
var call_pop_id = '';
var bp_pop_id = '';

var selfChk = false; // 자가검침 가능여부 : 최종
var selfChkMulti = false; // 자가검침 가능여부 : 다중 계량기
var selfChkSide = false; // 자가검침 가능여부 : 외부 계량기
var selfChkSideOut = false; // 자가검침 가능여부 : 외부지시부
var endME = false;

var bpInfo = '';

function init() {

	// console.log('#############################################################
	// main');
	// showProgressBar();
	if (device.osName == 'Android') {
		alopexController.setCustomizedBack(backTEST);
	}

	settingLoading();
	$('.imgloading').show();

	// params = getParamBot(param);
	param = navigation.parameters;
	//

	$('.notice').easyTicker({
		visible : 1,
		interval : 4000
	});
	// params = param;

	$('.phoneCancle').click(function() {
		call_pop_id.close();
	});

	$('.phoneCall').click(function() {
		myCallCenter();
	});

	// console.log(param);
	logf(JSON.stringify(param));

	if (param == null || param.list == undefined) {
		// console.log('param error');
		params = '';
		if (device.osName != 'iOS') {
			params = JSON.parse(getAlopexSession('loginSession'));
		} else {
			params = JSON.parse(getAlopexCookie('loginCookie'));
			//gclee login
//			params = JSON.parse(getAlopexCookie('loginSession'));
		}
	} else {
		// console.log('param okok');
		params = param;
		setAlopexSession('loginSession', JSON.stringify(param));
		setAlopexCookie('loginCookie', JSON.stringify(param));
	}

	// setDefault();
	// var mbp = getMainBP();
	setEventListner();
	initStart('M');
}

function initStart(st) {
	if (st != 'M')
		$('.loading').show();

	// var mbp = getMainBP();
	// bpInfo = JSON.parse(getAlopexCookie(mbp));
	var mbp = JSON.parse(getMainBPCA());
	bpInfo = JSON.parse(getAlopexCookie(mbp.regiogroup));
	console.log(bpInfo);
	setMainBP(bpInfo);
	getMain();
}

function backTEST() {
	if (closeNM == 0) {
		// console.log('no');
		closeNM = 1;
		$('.info_back').bPopup({
			opacity : 0.6,
			speed : 300,
			autoClose : 1000,
			onClose : function() {
				closeNM = 0;
			}
		});
		$('.info_back').css({
			'top' : '80%',
			'position' : 'absolute'
		});
	} else {
		// console.log('ok');
		alopexController.exit();
	}
}

function setEventListner() {

	// $('#div_goMenu_METR').click(function(){
	// //$a.navigate('ME/MMETR0M0');
	// navigateGo('MMETR0M0');
	// });

	// $('#div_goMenu_BLPG').click(function(){
	// //$a.navigate('BL/MBLMG0M0');
	// navigateBackToNaviGo('MBLMG0M0');
	// });

	$('#mINSU').click(function() {
		navigateBackToNaviGo('MINRE0M0');
	}); // 보험 보장내역

	$('#mBILL').click(function() {
		// last_click_time = new Date().getTime();
		navigateBackToNaviGo('MBLMG1M0');
	}); // 요금납부
	$('#mSVC').click(function() {
		// last_click_time = new Date().getTime();
		navigateGo('MFXST0M0');
		console.log('#############################################go ST');
	}); // 서비스관리
	$('#bUSR').click(function() { /* $a.navigate('BL/MBLMG0M0'); */
		pop_error();
	}); // 설문조사
	$('#vSVCP').click(function() { /* $a.navigate('BL/MBLMG0M0'); */
		pop_error();
	}); // 고객센터 치도보기
	$('#bFAQ').click(function() {
		// last_click_time = new Date().getTime();
		navigateBackToNaviGo('MNTFQ0M1');
		// if(bpInfo.bpname == '코원에너지서비스'){
		// navigateBackToNaviGo('MNTFQ0M1');
		// }else if(bpInfo.bpname == '부산도시가스'){
		// navigateBackToNaviGo('MNTFQ0S1');
		// }else if(bpInfo.bpname == '충청에너지서비스'){
		// navigateBackToNaviGo('MNTFQ0S2');
		// }else if(bpInfo.bpname == '영남에너지서비스'){
		// if(bpInfo.lsc.indexOf('E') > -1){
		// navigateBackToNaviGo('MNTFQ0S4');
		// }else if(bpInfo.lsc.indexOf('F') > -1){
		// navigateBackToNaviGo('MNTFQ0S7');
		// }
		// }else if(bpInfo.bpname == '강원도시가스'){
		// navigateBackToNaviGo('MNTFQ0S3');
		// }else if(bpInfo.bpname == '전북에너지서비스'){
		// navigateBackToNaviGo('MNTFQ0S5');
		// }else if(bpInfo.bpname == '전남도시가스'){
		// navigateBackToNaviGo('MNTFQ0S6');
		// }else{
		// navigateBackToNaviGo('MNTFQ0M1');
		// }
	}); // FAQ

	$('#vGDN')
			.click(
					function() {
						var gdnvUrl = '';
						var gdnvId = '';
						if (device.osName == 'Android') {
							gdnvUrl = 'https://play.google.com/store/apps/details?id=com.kd.SmartTok';
							gdnvId = 'com.kd.SmartTok';
						} else {
							gdnvUrl = 'https://itunes.apple.com/kr/app/nabien-seumateutog-boilleo/id638684078';
							gdnvId = 'smarttok://';
						}
						application
								.hasApp(
										gdnvId,
										function(rt) {
											console.log(rt);
											if (rt) {
												application
														.startApplication(gdnvId);
											} else {
												// alert('경동 나비엔 App이 설치 되어있지
												// 않습니다.');
												notiPop(
														'안내',
														'경동 나비엔 스마트톡 앱이 설치되어있지 않습니다.<br/>설치 화면으로 이동하시겠습니까?',
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
																	application
																			.startWebBrowser(gdnvUrl);
																});

												$('.pCancelNO').click(
														function() {
															notiPopID.close();
														});
											}
										});
					}); // 경동나비엔
	$('#bQNA').click(function() {
		navigateGo('MNTQA0M1');
	}); // 문의하기
	$('#bNOTI').click(function() {
		navigateBackToNaviGo('MNTMA0M0');
	}); // 공지사항
	$('#bMSG').click(function() {
		var rtMsg = {
			'bp' : bp,
			'ca' : ca,
			'DOC_HEADER_OPBEL' : billNo
		};
		navigateBackToNaviParamGo('MMNHM0M0', rtMsg);
	}); // 알려드립니다
	$('#vMAP').click(function() {

		navigateBackToNaviGo('MMNMP0M0');
	}); // 알려드립니다

	// $('#vCOMP').click(function(){
	// var bpInfo = JSON.parse(getAlopexCookie(mbp));
	// if(bpInfo.bpname == '코원에너지서비스'){
	// application.startWebBrowser("http://www.skens.com/m/kr/koone/main/index.do");
	// }else if(bpInfo.bpname == '부산도시가스'){
	// application.startWebBrowser("http://www.skens.com/m/kr/busan/main/index.do");
	// }else if(bpInfo.bpname == '충청에너지서비스'){
	// application.startWebBrowser("http://www.skens.com/m/kr/chengju/main/index.do");
	// }else if(bpInfo.bpname == '영남에너지서비스'){
	// if(bpInfo.city == '경북(구미)'){
	// application.startWebBrowser("http://www.skens.com/m/kr/gumi/main/index.do");
	// }else if(bpInfo.city == '경북(포항)'){
	// application.startWebBrowser("http://www.skens.com/m/kr/pohang/main/index.do");
	// }
	// }else if(bpInfo.bpname == '강원도시가스'){
	// application.startWebBrowser("http://www.skens.com/m/kr/gangwon/main/index.do");
	// }else if(bpInfo.bpname == '전북에너지서비스'){
	// application.startWebBrowser("http://www.skens.com/m/kr/jeonbuk/main/index.do");
	// }else if(bpInfo.bpname == '전남도시가스'){
	// application.startWebBrowser("http://www.skens.com/m/kr/jeonnam/main/index.do");
	// }else{
	//    		
	// }
	// }); // 회사소개

	$('#vGSAJ')
			.click(
					function() {
						// var bpInfo = JSON.parse(getAlopexCookie(mbp));
						if (bpInfo.bpname == '코원에너지서비스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/koone/content/view.do?cate=service&m1=gassafety");
						} else if (bpInfo.bpname == '부산도시가스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/busan/content/view.do?cate=service&m1=gassafety");
						} else if (bpInfo.bpname == '충청에너지서비스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/cheongju/content/view.do?cate=service&m1=gassafety");
						} else if (bpInfo.bpname == '영남에너지서비스') {
							if (bpInfo.lsc.indexOf('E') > -1) {
								application
										.startWebBrowser("http://www.skens.com/m/kr/gumi/content/view.do?cate=service&m1=gassafety");
							} else if (bpInfo.lsc.indexOf('F') > -1) {
								application
										.startWebBrowser("http://www.skens.com/m/kr/pohang/content/view.do?cate=service&m1=gassafety");
							}
						} else if (bpInfo.bpname == '강원도시가스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/gangwon/content/view.do?cate=service&m1=gassafety");
						} else if (bpInfo.bpname == '전북에너지서비스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/jeonbuk/content/view.do?cate=service&m1=gassafety");
						} else if (bpInfo.bpname == '전남도시가스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/jeonnam/content/view.do?cate=service&m1=gassafety");
						} else {

						}
					}); // 가스와 안전

	$('#vYGNB')
			.click(
					function() {
						// var bpInfo = JSON.parse(getAlopexCookie(mbp));
						if (bpInfo.bpname == '코원에너지서비스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/koone/content/view.do?cate=service&m1=supplyaskcharge&m2=fareguide");
						} else if (bpInfo.bpname == '부산도시가스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/busan/content/view.do?cate=service&m1=supplyaskcharge&m2=fareguide");
						} else if (bpInfo.bpname == '충청에너지서비스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/cheongju/rate/guide.do");
						} else if (bpInfo.bpname == '영남에너지서비스') {
							if (bpInfo.lsc.indexOf('E') > -1) {
								application
										.startWebBrowser("http://www.skens.com/m/kr/gumi/content/view.do?cate=service&m1=supplyaskcharge&m2=fareguide");
							} else if (bpInfo.lsc.indexOf('F') > -1) {
								application
										.startWebBrowser("http://www.skens.com/m/kr/pohang/rate/guide.do");
							}
						} else if (bpInfo.bpname == '강원도시가스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/gangwon/rate/guide.do");
						} else if (bpInfo.bpname == '전북에너지서비스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/jeonbuk/rate/guide.do");
						} else if (bpInfo.bpname == '전남도시가스') {
							application
									.startWebBrowser("http://www.skens.com/m/kr/jeonnam/rate/guide.do");
						} else {

						}
					}); // 요금안내

	// $('#vNOTI').click(function(){ navigateBackToNaviGo('MNTMA0M1'); }); //
	// 공지사항 상세

	$('#goBill').click(function() {
		// $a.navigate('BL/MBLMG0M2');
		
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
		
	}); // 청구서 상세

	$('#phoneSVC').click(function(event) {
		// console.log(event.currentTarget.children[0].children[1].children[0].innerHTML);
		// var callNo =
		// event.currentTarget.children[0].children[1].children[0].innerHTML;
		// phone.call(callNo);

		call_pop_id = $('.pop_account_regist').bPopup({
			opacity : 0.6,
			speed : 300,
		});
	});

	$('#cont1_left').click(function() {
		// console.log('cont1_left :1: selfChk :1: '+selfChk);
		if (selfChk) {
			if (endME) {
				navigateGo('MMETR0M1');
			} else {
				navigateGo('MMETR0M0');
			}
		} else {
			if (selfChkSide) {
				// 외부
				pop_error_3();
			} else if (selfChkMulti) {
				// 멍티
				pop_error_3();
			} else {
				// 기간이 아님
				pop_error_2();
			}
		}
	}); // 자가검침
	$('#cont1_right').click(function() {
		navigateBackToNaviGo('MNTGD0M1');
	}); // 알림

	// $('#slidx_button').click(function(){ pop_error(); }); // 관리

	// 제3자 제공 동의 영역, 거부 클릭할 경우 동의 클릭 해제
	$('#refuse_provide_info').click(
			function() {
				if ($(this).is(':checked')) {
					$('#agree_provide_info').setChecked(false);
				}
				if ($(this).is(':checked') == false
						&& $('#agree_provide_info').is(':checked') == false) {
					$(this).setChecked(true);
				} else {
					var mainBPCA = getMainBPCA();
					var mbc = JSON.parse(mainBPCA);
					param = {
						"bp" : mbc.bp,
						"ca" : mbc.ca,
						"agree_provide_info_yn" : "N"
					};

					httpSend("putScgcPromotion", param, function(result) {

					}, function(errorCode, errorMessage) {

					});
				}
			});
	// 제3자 제공 동의 영역, 동의 클릭할 경우 거부 클릭 해제
	$('#agree_provide_info').click(
			function() {
				if ($(this).is(':checked')) {
					$('#refuse_provide_info').setChecked(false);
				}
				if ($(this).is(':checked') == false
						&& $('#refuse_provide_info').is(':checked') == false) {
					$(this).setChecked(true);
				} else {
					var mainBPCA = getMainBPCA();
					var mbc = JSON.parse(mainBPCA);
					param = {
						"bp" : mbc.bp,
						"ca" : mbc.ca,
						"agree_provide_info_yn" : "Y"
					};

					httpSend("putScgcPromotion", param, function(result) {

					}, function(errorCode, errorMessage) {

					});
				}
			});

};

function chkNote() {
	var chkNo = 0;
	console.log(JSON.stringify(params));
	for (var i = 0; i < params.list.bpCaList.length; i++) {
		if (params.list.bpCaList[i].note == 'B') {
			chkNo++;
		} else if (params.list.bpCaList[i].retMsg.indexOf('여러 대') > -1) {
			chkNo++;
		}
	}
	return chkNo;
}

function chkSelfNote(bp, ca) {
	// console.log('*****************************************************************************');
	// console.log('*[#BP#]*['+bp+']######[#CA#]*['+ca+']****************************************');
	// console.log('*****************************************************************************');
	for (var i = 0; i < params.list.bpCaList.length; i++) {
		if (Number(params.list.bpCaList[i].ca) == Number(ca)) {
			// console.log('*[#ca#]*['+ca+']######[#params.list.bpCaList[i].ca#]*['+params.list.bpCaList[i].ca+']****************************************');
			// console.log('*[#params.list.bpCaList[i].note#]*['+params.list.bpCaList[i].note+']***************************************');
			if (params.list.bpCaList[i].note == 'B') {
				// console.log('******************[[][][][][B][][][][]]**********************');
				// 계량기 외부
				selfChk = false; // 자가검침 가능여부 : 최종
				selfChkSide = true; // 자가검침 가능여부 : 외부 계량기
				setAlopexSession('selfChkMulti', selfChkMulti);
				setAlopexSession('selfChkSide', selfChkSide);
				setAlopexCookie('selfChkMultiCookie', selfChkMulti);
				setAlopexCookie('selfChkSideCookie', selfChkSide);
			} else if (params.list.bpCaList[i].mult == 'X') {
				// console.log('******************[[][][][][X][][][][]]**********************');
				// 계량기 다수
				selfChk = false; // 자가검침 가능여부 : 최종
				selfChkMulti = true; // 자가검침 가능여부 : 다중 계량기
				setAlopexSession('selfChkMulti', selfChkMulti);
				setAlopexSession('selfChkSide', selfChkSide);
				setAlopexCookie('selfChkMultiCookie', selfChkMulti);
				setAlopexCookie('selfChkSideCookie', selfChkSide);
			} else {
				// console.log('******************[[][][][][A][][][][]]**********************');
				selfChk = true;
				selfChkMulti = false;
				selfChkSide = false;
				setAlopexSession('selfChkMulti', selfChkMulti);
				setAlopexSession('selfChkSide', selfChkSide);
				setAlopexCookie('selfChkMultiCookie', selfChkMulti);
				setAlopexCookie('selfChkSideCookie', selfChkSide);
			}
		}
	}
}

function setMainBP(mbp) {
	// BP 셋팅
	// var bpInfo = JSON.parse(getAlopexCookie(mbp));
	// console.log('bp :: '+mbp[0])
	// console.log('jys',bpInfo);
	logf('###jys0###');
	var lscStr = '<div>' +
	// ' <h3>'+bpInfo.bpname+'<br />'+bpInfo.center+'</h3>'+
	'	<h3>' + (mbp.lsc.indexOf('B') == -1 ? '콜센터' : '서비스센터')
			+ '<br/><span>가스누출,전출입,요금문의</br>※이사 시 3일전 예약 필요</span></h3>'
			+ '	<p class="tell"><span class="col_yellow">' + bpInfo.tel
			+ '</span><span class="time">상담시간 09:00~18:00</span></p>'
			+ '</div>';
	$('#phoneSVC').html(lscStr);
	logf('###jys1###');
	// 상단로고
	var rtStr = '';
	var bpLogo = [];
	bpLogo[0] = '<h1 class="koone"><a href="#">코원에너지서비스 | SK E&amp;S</a></h1>';
	bpLogo[1] = '<h1 class="bs"><a href="#">부산도시가스 | SK E&amp;S</a></h1>';
	bpLogo[2] = '<h1 class="ch"><a href="#">충청에너지서비스 | SK E&amp;S</a></h1>';
	bpLogo[3] = '<h1 class="gumi"><a href="#">영남에너지서비스(구미) | SK E&amp;S</a></h1>';
	bpLogo[4] = '<h1 class="gw"><a href="#">강원도시가스 | SK E&amp;S</a></h1>';
	bpLogo[5] = '<h1 class="jb"><a href="#">전북에너지서비스 | SK E&amp;S</a></h1>';
	bpLogo[6] = '<h1 class="jn"><a href="#">전남도시가스 | SK E&amp;S</a></h1>';
	bpLogo[7] = '<h1 class="pohang"><a href="#">영남에너지서비스(포항) | SK E&amp;S</a></h1>';

	var after = '<p class="btn_more dispNone"><button id="more_button">청구서 더보기</button></p><p class="btn_set"><button id="slidx_button">설정</button></p>';
	if (bpInfo.bpname == '코원에너지서비스') {
		rtStr = bpLogo[0] + after;
	} else if (bpInfo.bpname == '부산도시가스') {
		rtStr = bpLogo[1] + after;
	} else if (bpInfo.bpname == '충청에너지서비스') {
		rtStr = bpLogo[2] + after;
	} else if (bpInfo.bpname == '영남에너지서비스') {
		rtStr = bpLogo[3] + after;
	} else if (bpInfo.bpname == '강원도시가스') {
		rtStr = bpLogo[4] + after;
	} else if (bpInfo.bpname == '전북에너지서비스') {
		rtStr = bpLogo[5] + after;
	} else if (bpInfo.bpname == '전남도시가스') {
		rtStr = bpLogo[6] + after;
		// }else if(bpInfo.bpname == '영남에너지서비스(포항)'){
		// rtStr = bpLogo[7]+after;
	} else {

	}
	$('#header').html(rtStr);
	$('#slidx_button').click(function() {
		// navigateGo('MFXUS0M0');
		navigateBackToNaviGo('MFXUS0M0');
	});

	$('#more_button').click(function() {
		// console.log('111111111111111111111');
		bp_pop_id = $('.pop_input_num').bPopup({
			opacity : 0.6,
			speed : 300,
		});
	});
}

function getMain() {
	// if(params != ''){
	// console.log(params);
	// }

	logf('###jys3###');
	var param = '';
	var mainBPCA = getMainBPCA();
	logf(mainBPCA);
	logf('###jys4###');
	
	var vPhone = getAlopexCookie('uPhone');
	
	if (mainBPCA == 'undefined') {
		logf('###jys5###');
		//gclee login token
		param = {
			// "bp" : '14641452', "ca" : '15527726'
			// "bp" : '12704738', "ca" : '12809544'
			// "bp" : '00000000', "ca" : '00000000'
			"bp" : String(Number(params.list.bpCaList[0].bp)),
			"ca" : String(Number(params.list.bpCaList[0].ca)),
			"sernr" : params.list.bpCaList[0].sernr,
			"anlage" : String(Number(params.list.bpCaList[0].anlage)),
			"regiogroup" : params.list.bpCaList[0].regiogroup,
			"token" : getAlopexCookie('loginToken'),
			"mbtlnum" : vPhone
		};

		chkSelfNote(params.list.bpCaList[0].bp, params.list.bpCaList[0].ca);
	} else {
		logf('###jys6###');
		var mbc = JSON.parse(mainBPCA);
		logf('###jys7###');
		//gclee login token
		
		param = {
			"bp" : String(Number(mbc.bp)),
			"ca" : String(Number(mbc.ca)),
			"sernr" : mbc.sernr,
			"anlage" : String(Number(mbc.anlage)),
			"regiogroup" : mbc.regiogroup,
			"token" : getAlopexCookie('loginToken'),
			"mbtlnum" : vPhone
		};
		chkSelfNote(mbc.bp, mbc.ca);
	}

	logf('###jys8###');
	//gclee login 
	logf('gclee getMnpgInfo : ' + JSON.stringify(param));
	setAlopexSession('mainParam', JSON.stringify(param));
	setAlopexCookie('mainParamCookie', JSON.stringify(param));

	httpSend("getMnpgInfo", param, mainSetting, function(errorCode,
			errorMessage) {
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
}

function setMultiButton() {
	if (params.list.bpCaList.length < 2) {
		$('.btn_more').hide();
	} else {
		$('.btn_more').show();
		var popCaListStr = '';
		for (var i = 0; i < params.list.bpCaList.length; i++) {
			console.log("########################");
			console.log("ca ::" + ca);
			console.log("params.list.bpCaList[i].ca ::"
					+ params.list.bpCaList[i].ca);
			console.log("result ::"
					+ (ca == Number(params.list.bpCaList[i].ca)));
			console.log("########################");
			popCaListStr += '<li class="'
					+ (ca == Number(params.list.bpCaList[i].ca) ? 'key_' : '')
					+ 'num goMainInfo"><input type="hidden" value="'
					+ params.list.bpCaList[i].regiogroup + ','
					+ params.list.bpCaList[i].bp + ','
					+ params.list.bpCaList[i].ca + ','
					+ params.list.bpCaList[i].sernr + ','
					+ params.list.bpCaList[i].anlage
					+ '"/><a href="javascript:void(0);">'
					+ Number(params.list.bpCaList[i].ca) + '</a></li>';
		}
		$('.popCaList').html(popCaListStr);
	}

	$('.goMainInfo').click(function(event) {
		var s1 = jQuery(event.currentTarget);
		// var s2 = s1.children('input')[0].value;
		// ss = s1;

		var Str1 = s1.children('input')[0].value;
		var Str2 = Str1.split(',');
		var Str3 = {
			bp : Str2[1],
			ca : Str2[2],
			sernr : Str2[3],
			anlage : Str2[4],
			regiogroup : Str2[0]
		};

		setAlopexSession('SessionBP', Str2[0]);
		setAlopexSession('SessionBPCA', JSON.stringify(Str3));
		putGlobalPreference('selectedBp', Str2[0]);
		putGlobalPreference('selectedBpCa', JSON.stringify(Str3));

		initStart('S'); // 메인 갱신
		bp_pop_id.close();
	});
}

function onScreenBack() {
	initStart('S');
}

function mainSetting(cb) {
	setAlopexSession('mainPage', JSON.stringify(cb));
	logf(cb);
	var chkstr = '0';
	// 자가검침이 입력된 경우 체크
	if (cb.custReadingresult == "0" ||cb.custReadingresult == "null") {
		chkstr += '1';
		endME = false;
		setAlopexSession('endME', endME);
		setAlopexCookie('endMECookie', endME);
	} else {
		chkstr += '2';
		endME = true;
		setAlopexSession('endME', endME);
		setAlopexCookie('endMECookie', endME);
	}

	ss = cb;
	// 대표 BP 셋팅
	// 메인 로고
	// 센터 전화, 명

	// 자가검침
	if (selfChk) {
		var mainBPCA = getMainBPCA();
		var mbc = JSON.parse(mainBPCA);
		chkstr += '3';
		if (cb.v_ablhinw == "10") {
			chkstr += '4';
			console
					.log('#############################################################################xxxxxx1');
			selfChk = false;
			selfChkSideOut = true;
			setAlopexSession('selfChkSideOut', selfChkSideOut);
			setAlopexCookie('selfChkSideOutCookie', selfChkSideOut);
			// 자가검침이 note 10 외부지시부
			// }else if(isOverChkDate(cb.e_adatsoll1,cb.s_adatsoll1)){
		} else if (isOverChkDateSpc(cb.e_adatsoll1, cb.s_adatsoll1,
				cb.adatsoll1, mbc.regiogroup)) {
			chkstr += '5';
			console.log('#################################################1');
			selfChk = true;
			setAlopexSession('selfChk', selfChk);
			setAlopexCookie('selfChkCookie', selfChk);
		} else {
			chkstr += '6';
			selfChkSideOut = false;
			setAlopexSession('selfChkSideOut', selfChkSideOut);
			setAlopexCookie('selfChkSideOutCookie', selfChkSideOut);
			console.log('#################################################2');
			selfChk = false;
			setAlopexSession('selfChk', selfChk);
			setAlopexCookie('selfChkCookie', selfChk);
		}
		chkstr += '7';
	} else {
		chkstr += '8';
		console.log('#################################################3');
		selfChk = false;
		setAlopexSession('selfChk', selfChk);
		setAlopexCookie('selfChkCookie', selfChk);
	}

	console.log('mainSetting :1: selfChk :1: ' + selfChk);
	console.log('mainSetting :1: selfChkMulti :2: ' + selfChkMulti);
	console.log('mainSetting :1: selfChkSide :3: ' + selfChkSide);
	if (!selfChk) {
		chkstr += '9';
		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$0');
		if (selfChkMulti) {
			chkstr += 'a';
			console
					.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$1');
			var adatsollStr = '<div>' + '	<h3>자가검침</h3>'
					+ '	<p class="notime">자가검침 대상이<br />아닙니다.</p>' + '</div>';
			$('#cont1_left').html(adatsollStr);
		} else if (selfChkSide) {
			chkstr += 'b';
			console
					.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$2');
			var adatsollStr = '<div>' + '	<h3>자가검침</h3>'
					+ '	<p class="notime">자가검침 대상이<br />아닙니다.</p>' + '</div>';
			$('#cont1_left').html(adatsollStr);
		} else if (selfChkSideOut) {
			chkstr += 'c';
			console
					.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$2');
			var adatsollStr = '<div>' + '	<h3>자가검침</h3>'
					+ '	<p class="notime">자가검침 대상이<br />아닙니다.</p>' + '</div>';
			$('#cont1_left').html(adatsollStr);
		} else {
			chkstr += 'd';
			console
					.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$3');
			var adatsollStr = '<div>' + '	<h3>자가검침</h3>'
					+ '	<p class="notime">자가검침 기간이<br />아닙니다.</p>' + '</div>';
			$('#cont1_left').html(adatsollStr);
		}
		chkstr += 'e';
		logf('자가검침 yes');
	} else if (cb.adatsoll1 == '') {
		chkstr += 'f';
		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4');
		// 검침기간이 아닙니다.
		logf('자가검침 no');
	} else if (isChkEnd(cb.e_adatsoll1)) {
		chkstr += 'g';
		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$5');
		logf('자가검침 no111');
	} else {
		chkstr += 'h';
		console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$7');
		var adatsollStr = '<div>' + '<h3 class="new">자가검침</h3>'
				+ '<p class="dday"><span>' + getDDay(cb.e_adatsoll1)
				+ '</span></p>' + '<p class="date">'
				+ getMonthDayDOW(cb.s_adatsoll1) + ' ~ '
				+ getMonthDayDOW(cb.e_adatsoll1)
				+ ' <br /><span>자가검침 등록기간</span></p>' + '</div>';
		$('#cont1_left').html(adatsollStr);
		logf('자가검침 yes');
	}
	chkstr += 'i';

	setAlopexSession('chkStr', chkstr);
	// 공지사항
	// 임의로 뿌리기

	// 고객센터 우선순위
	// 1. 대표BP
	// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	if (cb.list.thsmonUsgQtyResult == undefined) {
		// console.log('@@@@1');
		$('.used').hide();

		var billStr = '<div><h3><a href="#">모바일 청구서</a></h3><p class="bill view"><a href="#">청구서 보기</a></p></div>';
		$('#goBill').html(billStr);

		var cont2Str = '<h3>청구서 정보</h3><ul>'
				+ '<div style="margin:32px;"><span class="rtt">발행내역이 없습니다.</span></div></ul>';
		$('.cont2').html(cont2Str);
		// billNo = '';
		var mainBPCA = getMainBPCA();
		var mbc = JSON.parse(mainBPCA);
		console.log(mbc);
		billNo = '';
		bp = mbc.bp;
		ca = mbc.ca;
		setMultiButton();
	} else {
		// console.log('@@@@2');
		$('.used').show();
		// 청구서 도착
		// 현재달 가져오기 function 필요
		if (cb.list.thsmonUsgQtyResult[0].BUDAT == getYearMonth()) {
			// 옴
			logf('옴');
			// $('.bill').show();
			var billStr = '<div><h3 class="new"><a href="javascript:void(0);">모바일 청구서</a></h3><p class="bill dispNone"><a href="javascript:void(0);">이번달 청구서 도착!</a></p></div>';
			$('#goBill').html(billStr);

		} else {
			// 안옴
			var billStr = '<div><h3><a href="#">모바일 청구서</a></h3><p class="bill view"><a href="#">청구서 보기</a></p></div>';
			$('#goBill').html(billStr);
			logf('안옴');
		}
		billNo = cb.list.thsmonUsgQtyResult[0].DOC_HEADER_OPBEL;
		bp = cb.list.thsmonUsgQtyResult[0].BPNO;
		ca = cb.list.thsmonUsgQtyResult[0].CANO;

		// 마이페이지
		var billMonth = Number(cb.list.thsmonUsgQtyResult[0].BUDAT.substring(4));
		// var cont2Str = '<h3>마이 페이지</h3><ul><li>'+billMonth+'월 사용량
		// <span>'+cb.list.thsmonUsgQtyResult[0].ABRMENGE+'㎥</span></li>'+//
		var cont2Str = '<h3>' + billMonth + '월 청구서</h3><ul>'
				+ '<li><span class="ltt">사용량  </span><span class="rtt">'
				+ toMypageUSED(cb.list.thsmonUsgQtyResult[0].I_SD_ITEM_03)
				+ ' ㎥</span></li>'
				+ '<li><span class="ltt">청구량  </span><span class="rtt">'
				+ toMypageUSED(cb.list.thsmonUsgQtyResult[0].ABRMENGE)
				+ ' MJ</span></li>'
				+ '<li><span class="ltt">청구금액 </span><span class="rtt">'
				+ chgNumberToMoney(cb.list.thsmonUsgQtyResult[0].ZBTRANX_99)
				+ ' 원</span></li>'
				+ '<li><span class="ltt">납부기한 </span><span class="rtt">'
				+ toDateAddDot(cb.list.thsmonUsgQtyResult[0].FAEDN)
				+ '</span></li></ul>';
		$('.cont2').html(cont2Str);

		// 최근추이
		// cb.list.fyerUsgQtyResult
		// var category = [ '4월','5월', '6월', '7월', '8월', '9월', '10월', '11월',
		// '12월', '1월', '2월', '3월' ];

		// var datas1 = [117.0, 140.0, 160.0, 165.0, 0.0, 132.0, 117.0, 140.0,
		// 160.0, 165.0, 120.0, {
		// y:132.0,
		// color : '#ea002c'
		// }];
		// var datas2 = [117.0, 140.0, 160.0, 165.0, 0.0, 132.0, 117.0, 140.0,
		// 160.0, 165.0, 120.0, {
		// y:132.0,
		// marker:{
		// // symbol : 'url(../../images/ico_point2.png)'
		// }
		// }];
		var category = getCategory(cb.list.fyerUsgQtyResult);
		var datas1 = getDatas1Month(cb.list.fyerUsgQtyResult,
				cb.list.thsmonUsgQtyResult[0].BUDAT);
		// var datas1 = getDatas1(cb.list.fyerUsgQtyResult);
		var datas2 = getDatas2(cb.list.fyerUsgQtyResult);
		drawGraph(category, datas1, datas2);
		var grpTextStr = textGraph(category, datas1, datas2);
		console.log(grpTextStr);
		$('.grpText').html(grpTextStr);
		setMultiButton();
	}

	var notiBpData = getMainBP();
	var notiBp = notiBpData.substring(0, 1) + "000";

	var notiParam = {
		"cgcSe" : notiBp
	};

	// 공지사항
	httpSend(
			"getNtBdList",
			notiParam,
			function(Mcb) {
				var str = '';
				for (var i = 0; i < Mcb.list.ntBdList.length; i++) {
					if (i > 2) {// 3건만 표기
					} else {
						str += '<li ><a href="javascript:void(0);" class="viewNotice">'
								+ replaceAll(Mcb.list.ntBdList[i].TITLE, '\'',
										'&quot;');
						str += '		<input type="hidden" value="'
								+ Mcb.list.ntBdList[i].SEQ + '"/>';
						str += '</a></li>';
						//				
						//				
						// str += '<li ';
						// if(isNoticeNew(Mcb.list.ntBdList[i].REG_DATE)) str +=
						// 'class="new"';
						// str += '>';
						// str += ' <a href="javascript:void(0);"
						// class="viewNotice">';
						// str += '
						// <strong>'+replaceAll(Mcb.list.ntBdList[i].TITLE,
						// '\'','&quot;')+'</strong>';
						//				
						// str += '
						// <span>'+Mcb.list.ntBdList[i].REG_DATE+'</span></a>';
						// str += '</li>';
					}
				}
				$('#vNOTI').html(str);

				$('.viewNotice').click(function(e) {
					ss = e;
					console.log(e.currentTarget.children[0].value);
					var param = {
						pageId : 'MNTMA0M1',
						parameters : {
							noti_no : e.currentTarget.children[0].value
						},
						autoDismiss : false
					};
					navigation.navigate(param);
				});
				completLoad();
				setDefault();
			}, function(errorCode, errorMessage) {
				completLoad();
				setDefault();
				if (errorCode == "9999") {
					loge('error :: 9999 :: main');
				} else {
					loge('error :: other :: main');
				}
			});

	// completLoad();
	// ##################################################################
	completLoad();
	setDefault();

	// var chkDisablePop = getAlopexCookie('chkDisablePop');
	// if(chkDisablePop != "true"){
	// notiPop('서비스 중지 안내','더 나은 서비스 제공을 위해<br/>아래 기간 동안 서비스가 중지 됩니다.<br/>불편을 드려
	// 죄송합니다. 감사합니다.<br/>기간 : 9월 25일 20시 ~ 9월 29일 09시<br/>“풍요로운 한가위
	// 보내세요”',true,false,{
	// list : [{
	// type : '',
	// id : 'pCancelVOK',
	// name : '다시보지 않음'
	// },{
	// type : '0',
	// id : 'pCancelVNO',
	// name : '닫기'
	// }]
	// });
	//		
	// $('.pCancelVOK').click(function(){
	// //url 연결
	// //application.startWebBrowser(gdnvUrl);
	// setAlopexCookie('chkDisablePop','true');
	// notiPopID.close();
	// });
	//		
	// $('.pCancelVNO').click(function(){
	// notiPopID.close();
	// });
	// }

	// 1월28일 점검 공지
	var now = new Date();

	var month = now.getMonth() + 1;
	var day = now.getDate();
	var year = now.getFullYear();

	if (year == 2016 && month == 1 && (day == 28)) {
		var isDisablePopup = getGlobalPreference("isDisablePopup_20160128");

		if (isDisablePopup != "true") {
			notiPop(
					'시스템 점검 안내',
					'더 나은 서비스 제공을 위하여<br/>아래 기간 동안 서비스가 중단 됩니다.<br/><br/>기간 : 1월 28일 22시 ~ 1월 29일 05시30분<br/><br/>불편을 드려 죄송합니다.<br/>감사합니다.<br/>',
					true, false, {
						list : [ {
							type : '',
							id : 'pCancelVOK',
							name : '다시보지 않음'
						}, {
							type : '0',
							id : 'pCancelVNO',
							name : '닫기'
						} ]
					});

			$('.pCancelVOK').click(function() {
				putGlobalPreference("isDisablePopup_20160128", "true");
				notiPopID.close();
			});

			$('.pCancelVNO').click(function() {
				notiPopID.close();
			});
		}
	}
	// --

	// 각 사별 공지사항 팝업
	var isDisablePopup = getGlobalPreference("isDisableNoticePopup_"
			+ cb.noticePopupSeq);
	if (isDisablePopup == "true") {
		var disableTime = getGlobalPreference("isDisableNoticePopup_time_"
				+ cb.noticePopupSeq);
		var currentTime = new Date().getTime();
		if ((currentTime - disableTime) > (1000 * 60 * 60 * 24 * 7)) {
			putGlobalPreference("isDisableNoticePopup_" + cb.noticePopupSeq,
					"false");
			isDisablePopup = "false";
		}
	}
	if ((isDisablePopup != "true") && (cb.noticePopupSeq != '')
			&& (cb.noticePopupSeq != undefined)) {
		notiPop(cb.noticePopupTitle, cb.noticePopupText, true, false, {
			list : [ {
				type : '',
				id : 'noticePopupDontLookBack',
				name : '일주일간 보지 않기'
			}, {
				type : '0',
				id : 'noticePopupClose',
				name : '닫기'
			} ]
		});
		$('.noticePopupDontLookBack').click(
				function() {
					putGlobalPreference("isDisableNoticePopup_"
							+ cb.noticePopupSeq, "true");
					putGlobalPreference("isDisableNoticePopup_time_"
							+ cb.noticePopupSeq, new Date().getTime());

					notiPopID.close();
				});

		$('.noticePopupClose').click(function() {
			notiPopID.close();
		});
	}
	// --

	var swiper = new Swiper('.swiper-container', {
		nextButton : '.swiper-button-next',
		prevButton : '.swiper-button-prev',
		slidesPerView : 3,
		paginationClickable : true,
		spaceBetween : 0
	});

	// var change21 = getAlopexCookie('change21_20150917');
	// if(change21 == "true"){
	// console.log('21 ing...2');

	//gclee login - 테스트시만 모든 플랫폼 아래전문 실행
	//gclee login - 배포시는 Android, iOS만 처리되게. 배포버전시 사용자 정보 업데이트 방지
	
//	if ((device.osName == 'Android' || device.osName == 'iOS') == false) { // 웹이라면
//																			// (안드로이드,
//																			// 아이폰이
//																			// 아니라면)
//		// TODO 웹에서 테스트시 데이터 입력 방지를 위함.
//	} else {
//		var paramSS = {
//			'list' : [ {
//				'bpCaReqList' : []
//			} ]
//		};
//		var j = 0;
//		for (var i = 0; i < params.list.bpCaList.length; i++) {
//			if (params.list.bpCaList[i].controlGp != '0021') {
//				paramSS.list[0].bpCaReqList[j] = {
//					'bp' : params.list.bpCaList[i].bp,
//					'ca' : params.list.bpCaList[i].ca,
//					'phoneNum' : params.list.bpCaList[i].mobile,
//					'statusGp' : '21',
//					'gubun' : '50'
//				};
//				j = j + 1;
//			} else {
//				console.log("controlGp == 0021 [bp:"
//						+ params.list.bpCaList[i].bp + ", ca:"
//						+ params.list.bpCaList[i].ca + ", pn:"
//						+ params.list.bpCaList[i].mobile + "]");
//			}
//		}
//
//		if (j > 0) {
//			httpSend("putAccInfo", paramSS, function(cb) {
//				console.log(cb);
//				console.log('update ok');
//				// setAlopexCookie('change21_20150917',"true");
//			}, function(errorCode, errorMessage) {
//				console.log('update error');
//			});
//		} else {
//			// setAlopexCookie('change21_20150917',"true");
//			console.log('21 ing...1');
//		}
//	}
	//gclee login end
	var paramSS = {
			'list' : [ {
				'bpCaReqList' : []
			} ]
		};
	
	//gclee login important
	
		var j = 0;
		for (var i = 0; i < params.list.bpCaList.length; i++) {
			//controGp 송달구분 0022가 와야, 송달변경 0021변경가능 
			console.log('update ok');
			if (params.list.bpCaList[i].controlGp != '0021') {
				console.log("gclee controlGp != 0021 송달변경하자 [bp:"
						+ params.list.bpCaList[i].bp + ", ca:"
						+ params.list.bpCaList[i].ca + ", pn:"
						+ params.list.bpCaList[i].mobile + "]");
				
				paramSS.list[0].bpCaReqList[j] = {
					'bp' : params.list.bpCaList[i].bp,
					'ca' : params.list.bpCaList[i].ca,
					'phoneNum' : params.list.bpCaList[i].mobile,
					'statusGp' : '21',
					'gubun' : '50'
				};
				j = j + 1;
			} else {
				console.log("controlGp == 0021 [bp:"
						+ params.list.bpCaList[i].bp + ", ca:"
						+ params.list.bpCaList[i].ca + ", pn:"
						+ params.list.bpCaList[i].mobile + "]");
			}
		}

		if (j > 0) {
			logf('gclee putAccInfo MMNPG0M0' + paramSS);
			
			httpSend("putAccInfo", paramSS, function(cb) {
				console.log(cb);
				console.log('update ok');
				// setAlopexCookie('change21_20150917',"true");
			}, function(errorCode, errorMessage) {
				console.log('update error');
			});
		} else {
			// setAlopexCookie('change21_20150917',"true");
			console.log('21 ing...1');
		}
		
   //gclee login end		
	
	
	
	

	// 제3자 정보제공 동의 여부 체크
	/*
	 * if(cb.insuranceAt!='Y' && cb.insuranceAt!='N'){ //동의 및 거부를 선택하지 않은 경우
	 * 
	 * if(notiBp=='B000'){ //담당회사가 코원인 경우에만 팝업 안내를 띄운다. view_use_pop =
	 * $('.view_use_provide_info').bPopup({ opacity: 0.6, speed: 300, });
	 * $('#provide_info_popup_close').click(function(){ view_use_pop.close();
	 * });
	 *  } }
	 */

	if (cb.approvedInsuranceAt) {
		if (cb.approvedInsuranceAt == 'Y') {
			// 동의를 했다면 보장내역 확인 버튼을 노출한다.
			$('#mINSU').show();
		}
	}
	
	// setTimeout('setLoadSwiper()',10);
	// ##################################################################
		
}

// function setLoadSwiper(){
// completLoad();
// setDefault();
//	
// var swiper = new Swiper('.swiper-container', {
// nextButton: '.swiper-button-next',
// prevButton: '.swiper-button-prev',
// slidesPerView: 3,
// paginationClickable: true,
// spaceBetween: 0
// });
// }

$a.page(function() {

	this.init = function(id, param) {
		logf('page on');
		// console.log(param);

	};

});