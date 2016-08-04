
/**
	 * 테스트 유무1
	 */
	var isTest = false;
	
	var last_click_time = new Date().getTime();
	
	// LSC 코드 DB버전
	// 1.0 : 2015-06-18
	// 1.1 : 2015-06-23
	// 1.2 : 2015-07-13
	// 1.3 : 2015-07-16 (좌표값 추가)
	// 1.4 : 2015-07-22 (지역 주소 세밀하게 갱신)
	// 1.5 : 2016-04-13 (전남 구례 5센터 추가)
	// 1.6 : 2016-05-20 (구미 전화번호는 대표 콜센터가 아닌 각 LSC 전화번호로 변경)
	var lscVer = '1.6'; 
	
	//gclee lsc - 서버에서 수신함 runDB 삭제, runDB_Next 삭제
	
	var nowPGCode = '';

	/**
	 * HTML타이틀 생성
	 * @param nm
	 */
	function TITLE(nm){
		document.write('<title>'+nm+' &gt; 스마트 도시가스 3.0 | SK E&amp;S</title>');
	}
	
	/**
	 * HTML상단 래더 생성 - 모두
	 * @param nm
	 */
	function HEADER(nm){
		document.write('<div id="header">');
		document.write('<h1 class="title"><a href="#">'+nm+'</a></h1>');
		document.write('<p class="btn_home"><button id="button_home">홈으로</button></p>');
		document.write('<p class="btn_set"><button id="button_set">설정</button></p>');
		document.write('</div>');
	}
	
	/**
	 * HTML 상단 해더 생성 - 일부
	 * @param nm
	 */
	function HEADER_NONE(nm){
		document.write('<div id="header">');
		document.write('<h1 class="title"><a href="#">'+nm+'</a></h1>');
		//document.write('<p class="btn_home"><button id="button_home">홈으로</button></p>');
		//document.write('<p class="btn_set"><button id="button_set">설정</button></p>');
		document.write('</div>');
	}
	
	/**
	 * HTML 상단 해더 생성 - 일부
	 * @param nm
	 */
	function HEADER_NO_MEMBER(nm){
		document.write('<div id="header">');
		document.write('<h1 class="title"><a href="#">'+nm+'</a></h1>');
		document.write('<p class="btn_noUsrHome"><button id="button_home">홈으로</button></p>');
		//document.write('<p class="btn_set"><button id="button_set">설정</button></p>');
		document.write('</div>');
	}
	
	/**
	 * HTML 상단 해더 생성 - 일부
	 * @param nm
	 */
	function HEADER_BACK(nm){
		document.write('<div id="header">');
		document.write('<h1 class="title"><a href="#">'+nm+'</a></h1>');
		document.write('<p class="btn_back"><button id="button_back">뒤로가기</button></p>');
		//document.write('<p class="btn_set"><button id="button_set">설정</button></p>');
		document.write('</div>');
	}
	
	/**
	 * 사용안함
	 */
//	$a.navigate.setup({
//    	url : function(url, param){
//    		return '../'+ url +'.html';
//    	}
//    });
	
	// getMnpgIngo APP_ID = SCGC

	/**
	 * 페이지 공통 함수
	 */
	function setDefault(){
		$('.btn_home').click(function(){
			//$a.navigate('MN/MMNPG0M0');
			//navigateBackTo('MMNPG0M0');
			navigateBackToNaviGo('MMNPG0M0');
//			navigateGo('MMNPG0M0');
//			navigation.backTo('MMNPG0M0');		
		});
		
		$('.btn_noUsrHome').click(function(){
			//$a.navigate('MN/MMNPG0M0');
			//navigateBackTo('MMNPG0M0');
			navigateBackToNaviGo('MMNPG1M0');
//			navigateGo('MMNPG0M0');
//			navigation.backTo('MMNPG0M0');		
		});
		
		$('.btn_back').click(function(){
			navigateBackToNaviGo('MBLMG1M0');
		});
		
		$('#button_set').click(function(){
			//$a.navigate('MN/MMNPG0M0');
			navigateBackToNaviGo('MFXUS0M0');
			//pop_error();
		});
		
		$('#pop_recommend').click(function(){
//			last_click_time = new Date().getTime();
    		//e.preventDefault();
//			$('.pop_recommend').bPopup({
//				opacity: 0.6,
//				speed: 300 
//			});
			ChkNVlast_click_time = new Date().getTime();
			if(NVlast_click_time != '' && nowPGCode != 'MMNST0M0' && (ChkNVlast_click_time - NVlast_click_time) < 2000){
				//
				console.log('############### db click!! error');
			}else{
				var subject = "도시가스 App";
				var text = "https://goo.gl/dq31Ky";
				var title = "도시가스 Application";
				NVlast_click_time = ChkNVlast_click_time; 
				jsniCaller.invoke("SocialSharing.share",subject,text,title,"shareCallback");
			}
    	});
    	
    	try{
	    	chkSelfTest();
    	}catch(e){
    	}
	}
	
	/**
	 * 공유하기 콜백
	 * @param rt
	 */
	function shareCallback(rt){
		logf('share result :: ',rt);
	}

	/**
	 * http 콜백 공통 
	 * 사용안함
	 * @param errorCode
	 * @param errorMessage
	 */
	function httpErrorCallback(errorCode, errorMessage) {
		logf('error');
	}
	
	/**
	 * 전화번호 형태로 변환 01000000000 > 010-0000-0000
	 * @param nm
	 * @returns
	 */
	function viewPhoneNM(nm){
		if(nm == undefined){
		}else{
			return ascPhoneNM(nm.replace(/(^01.{1})([0-9]+)([0-9]{4})/,"$1-$2-$3"));
		}
	}
	
	function viewPhoneNMJoin(nm){
		if(nm == undefined){
		}else{
			return nm.replace(/(^01.{1})([0-9]+)([0-9]{4})/,"$1-$2-$3");
		}
	}
	
	/**
	 * 전화번호 부분 가림 함수 010-0**0-0000
	 * @param nm
	 * @returns {String}
	 */
	function ascPhoneNM(nm){
		return nm.substring(0,nm.indexOf('-')+2)+'**'+nm.substring(nm.lastIndexOf('-')-1);
	}
	
	/**
	 * 전화번호 - 제거
	 * @param nm
	 * @returns
	 */
	function codePhoneNM(nm){
		return nm.replace('-','').replace('-','');
	}
	
	/**
	 * Alopex Page 이동 1
	 * @param pid
	 */
	function navigateGo(pid){
		if(device.osName == 'iOS'){
			navigateBackToNaviGo(pid);
		}else{
			navigateGo(pid,'',true);
		}
	}
	
	/**
	 * Alopex Page 이동 2
	 * @param pid
	 * @param parameters
	 */
	function navigateGo(pid, para){
		if(device.osName == 'iOS'){
			navigateBackToNaviGo(pid,para);
		}else{
			navigateGo(pid,para,true);
		}
	}
	
	/**
	 * Alopex Page 이동 3
	 * @param pid
	 * @param parameters
	 * @param onAutoDismiss
	 */
	var NVlast_click_time = '';
	function navigateGo(pid,para,onAutoDismiss){
//		ChkNVlast_click_time = new Date().getTime();
//		if(NVlast_click_time != '' && nowPGCode != 'MMNST0M0' && (ChkNVlast_click_time - NVlast_click_time) < 2000){
//			//
//			console.log('############### db click!! error');
//		}else{
			var param = {
				pageId : pid,
				parameters : para,
				autoDismiss: onAutoDismiss
			};
			console.log(location.pathname);
//			NVlast_click_time = ChkNVlast_click_time;
			navigation.navigate(param);
//		}
	}
	
	/**
	 * Alopex page이동 ( BacktoOrNavigate )
	 * @param pid
	 */
	function navigateBackToNaviGo(pid){
//		ChkNVlast_click_time = new Date().getTime();
//		if(NVlast_click_time != '' && nowPGCode != 'MMNST0M0' && (ChkNVlast_click_time - NVlast_click_time) < 2000){
//			//
//			console.log('############### db click!! error');
//		}else{
			var param = {
				pageId : pid
			};
//			NVlast_click_time = ChkNVlast_click_time;
			navigation.backToOrNavigate(param);		
//		}
	}
	
	/**
	 * Alopex page이동 ( BacktoOrNavigate )
	 * 사용안함
	 * 최초 이후에는 파라미터 안넘어감 증상으로 사용안함
	 * @param pid
	 * @param para
	 */
	function navigateBackToNaviParamGo(pid, para){
//		ChkNVlast_click_time = new Date().getTime();
//		if(NVlast_click_time != '' && nowPGCode != 'MMNST0M0' && (ChkNVlast_click_time - NVlast_click_time) < 2000){
//			//
//			console.log('############### db click!! error');
//		}else{
			var param = {
				pageId : pid,
				parameters : para
			};
//			NVlast_click_time = ChkNVlast_click_time;
			navigation.backToOrNavigate(param);
//		}
	}
	
	/**
	 * 현재 년월 가져오기 201504
	 * @returns
	 */
	function getYearMonth(){
		var now = new Date();
		var twoDigitMonth = ((now.getMonth().length+1) == 1)?(now.getMonth()+1) : '0'+(now.getMonth()+1);
		return now.getFullYear()+twoDigitMonth;
	}
	
	/**
	 * 이전 년월 가져오기 201503
	 * @returns
	 */
	function getYearBeforeMonth(){
		var now = new Date();
		var bMonth = new Date(now.getFullYear(), now.getMonth()-1, now.getDate());
		var twoDigitMonth = ((bMonth.getMonth().length+1) == 1)?(bMonth.getMonth()+1) : '0'+(bMonth.getMonth()+1);
		return bMonth.getFullYear()+twoDigitMonth;
	}
	
	/**
	 * 20150404 > 2015.04.04 변환
	 * @param dt
	 * @returns {String}
	 */
	function toDateAddDot(dt){
		return dt.substring(0,4)+'.'+dt.substring(4,6)+'.'+dt.substring(6,8);
	}
	
	function toDateHangul(dt){
		return String(Number(dt.substring(4,6)))+'월 '+String(Number(dt.substring(6,8)))+'일';
	}
	
	/**
	 * 자가 검침 날짜 형식 생성 > 2015.05.05 ~ 05.08
	 * @param dt1
	 * @param dt2
	 * @returns {String}
	 */
	function toMEDate(dt1,dt2){
		return toDateAddDot(dt1)+' ~ '+dt2.substring(4,6)+'.'+dt2.substring(6,8);
	}
	
	/**
	 * 숫자를 화패 단위로 변경
	 * @param nm
	 * @returns
	 */
	function chgNumberToMoney(nm){
		return String(nm).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	
	/**
	 * 20150530 > 5.30(토)
	 * @param dt
	 * @returns {String}
	 */
	function getMonthDayDOW(dt){
		var dd = new Date(makeDateFormat(dt));
		var week = new Array('(일)','(월)','(화)','(수)','(목)','(금)','(토)');
		return (dd.getMonth()+1)+'.'+dd.getDate()+(week[dd.getDay()]);
	}
	
	/**
	 * D-Day 구하기 (오늘기준)
	 * @param dt
	 * @returns {Number}
	 */
	function getDDay(dt){
		logf('###################################################');
		logf(dt);
		logf(makeDateFormat(dt));
		var dd = new Date(makeDateFormat(dt));
		logf(dd.getTime());
		var now = new Date();
		logf(now.getTime());
		var gap = dd.getTime() - now.getTime();
		logf(gap);
		var rtDay = Math.floor(gap / (1000 * 60 * 60 * 24)+1);
		logf(rtDay);
		return (rtDay==0?'마감일':'D-'+rtDay);
	}
	
	/**
	 * 사용자 이름 암호화
	 * @param nm
	 * @returns {String}
	 */
	function ascUserNM(nm){
		//console.log('nm.length',nm.length);
		if(nm.length < 5){ // 4자
			return nm.substring(0,1)+'*'+nm.substring(nm.length-1);
		}else{	// 5자 이상
			var rtStr = '';
			rtStr += nm.substring(0,2);
			for(var i=0;i<(nm.length-4);i++){
				rtStr += '*';
			}
			rtStr += nm.substring(nm.length-2);
			return rtStr;
		}
		
	}
	
	//gclee card
	/**
	 * 카드결제시 정해진 카드코드로 MPI vs ISP 구분 해당URL 세팅
	 * @param nm
	 * @returns {String}
	 */
	function getCardPayURL(nm){
		 //test
		 var MPI_TEST_URL = "http://168.154.182.41/services/ksnet/mpi.do";
		 var ISP_TEST_URL = "http://168.154.182.41/services/ksnet/isp.do";
		 //real
		 var MPI_URL = "http://168.154.182.41/services/MPI/m_mpiTest.jsp";
		 var ISP_URL = "http://168.154.182.41/services/ISP/payment_entry.jsp";
		 
//		http://168.154.182.41/services/ksnet/isp.do
//		http://168.154.182.41/services/ksnet/mpi.do
			 
		//console.log('nm.length',nm.length);
		if(nm.length > 2){ // 2자리 보다 크면 ISP (4자리 코드)
			return ISP_TEST_URL;
		}else{	           // 2자리 코드
			return MPI_TEST_URL;
		}
	}
	
	/**
	 * 상단 BP로고 가져오기
	 * @returns
	 */
	function getTitleBp(){
		
		//gclee push
		var mbp = getMainBP();
		logf('gclee setting mbp: ' + JSON.stringify(mbp));
		var bpInfoStr = getAlopexCookie(mbp);
		logf('gclee setting bpInfoStr: ' + bpInfoStr);
    	var bpInfo = JSON.parse(bpInfoStr);
    	
    	//var bpInfo = JSON.parse('MainBPCA');
    	
    	logf('gclee setting bpInfo: ' + JSON.stringify(bpInfo));
		
//    	var rtStr = '';
    	var bpLogo = [];
    	bpLogo[0] = '<h2 class="ko-one"><a href="#">코원에너지서비스 | SK E&amp;S</a></h2>';
    	bpLogo[1] = '<h2 class="bs"><a href="#">부산도시가스 | SK E&amp;S</a></h2>';		
    	bpLogo[2] = '<h2 class="ch"><a href="#">충청에너지서비스 | SK E&amp;S</a></h2>';		
    	bpLogo[3] = '<h2 class="gumi"><a href="#">영남에너지서비스(구미) | SK E&amp;S</a></h2>';		
    	bpLogo[4] = '<h2 class="gw"><a href="#">강원도시가스 | SK E&amp;S</a></h2>';		
    	bpLogo[5] = '<h2 class="jb"><a href="#">전북에너지서비스 | SK E&amp;S</a></h2>';		
    	bpLogo[6] = '<h2 class="jn"><a href="#">전남도시가스 | SK E&amp;S</a></h2>';		
    	bpLogo[7] = '<h2 class="pohang"><a href="#">영남에너지서비스(포항) | SK E&amp;S</a></h2>';
    	
    	if(bpInfo.bpname == '코원에너지서비스'){
    		return bpLogo[0];
    	}else if(bpInfo.bpname == '부산도시가스'){
    		return bpLogo[1];
    	}else if(bpInfo.bpname == '충청에너지서비스'){
    		return bpLogo[2];
    	}else if(bpInfo.bpname == '영남에너지서비스'){
    		return bpLogo[3];
    	}else if(bpInfo.bpname == '강원도시가스'){
    		return bpLogo[4];
    	}else if(bpInfo.bpname == '전북에너지서비스'){
    		return bpLogo[5];
    	}else if(bpInfo.bpname == '전남도시가스'){
    		return bpLogo[6];
//    	}else if(bpInfo.bpname == '영남에너지서비스(포항)'){
//    		return bpLogo[7];
    	}
    	 
	}
		
	/**
	 * 메인, 청구서 그래프 그리기시 카테고리 수집용
	 * @param fuqr
	 * @returns {Array}
	 */
    function getCategory(fuqr){
    	var category = [];
    	for(var i=0;i<fuqr.length;i++){
    		category[i] = String(Number(fuqr[i].BUDAT.substring(4)))+'월';
    	}
    	return category;
    }

    /**
     * 메인 그래프 그리기시 자료수집용1
     * @param fuqr
     * @returns {Array}
     */
    function getDatas1(fuqr){
    	var datas = [];
    	for(var i=0;i<fuqr.length;i++){
    		if(getYearBeforeMonth() == fuqr[i].BUDAT){
    			datas[i] = {
    					y : Number(fuqr[i].ABRMENGE.substring(0,fuqr[i].ABRMENGE.indexOf('.'))),
    					color : '#ea002c'
    			};
    		}else{
    			datas[i] = Number(fuqr[i].ABRMENGE.substring(0,fuqr[i].ABRMENGE.indexOf('.')));
    		}
    		
    	}
    	return datas;
    }
    
    /**
     * 청구서 그래프 그리기시 자료수집용1
     * 입력월에 색칠
     * @param fuqr
     * @param nowMonth
     * @returns {Array}
     */
    function getDatas1Month(fuqr,nowMonth){
    	var datas = [];
    	for(var i=0;i<fuqr.length;i++){
    		if(nowMonth == fuqr[i].BUDAT){
    			datas[i] = {
    					y : Number(fuqr[i].ABRMENGE.substring(0,fuqr[i].ABRMENGE.indexOf('.'))),
    					color : '#ea002c'
    			};
    		}else{
    			datas[i] = Number(fuqr[i].ABRMENGE.substring(0,fuqr[i].ABRMENGE.indexOf('.')));
    		}
    		
    	}
    	return datas;
    }
    
    /**
     * 메인, 청구서 그래프 그리기시 자료수집용2
     * @param fuqr
     * @returns {Array}
     */
    function getDatas2(fuqr){
    	var datas = [];
    	for(var i=0;i<fuqr.length;i++){
    		datas[i] = Number(fuqr[i].ABRMENGE.substring(0,fuqr[i].ABRMENGE.indexOf('.')));
    	}
    	return datas;
    }
    
    /**
     * 날짜 20150505 또는 201505인 경우 1505 형태로 변환
     * YY.MM으로 변환
     * @param dt
     * @returns {String}
     */
    function chgDate6And8to4(dt){
    	var rt = dt.substring(2,4)+'.'+dt.substring(4,6);
    	return rt;
    }
    
    /**
     * 프로그래스바 보임
     */
    function showProgressBar(){
    	var option = {
    			"message" : "화면을 불러오는 중입니다.",
    			"cancelable" : false
    	};
    	
    	platformUIComponent.showProgressDialog(option);
    }
    
    /**
     * 프로그래스바 메시지 추가
     * @param msg
     */
    function showProgressBarMsg(msg){
    	var option = {
    			"message" : msg,
    			"cancelable" : false
    	};
    	
    	platformUIComponent.showProgressDialog(option);
    }
    
    /**
     * 프로그래스바 숨김
     */
    function hideProgressBar(){
    	platformUIComponent.dismissProgressDialog();
    }
    
    /**
     * 사용안함
     * @param pr
     * @returns
     */
    function getParamBot(pr){
    	var isRuntime = true;
    	if(isRuntime){
    		return navigation.parameters;
    	}else{
    		return pr;
    	}
    }
    
    /**
     * 오늘이 입력된 날짜를 넘었는지 체크
     * @param dt
     * @returns {Boolean}
     */
    function isChkEnd(dt){
    	var now = new Date();
    	now.setDate(now.getDate() - 1); //당일로 조회하면 기간만료현상이 있어 1일전으로 조회
    	var dd = new Date(makeDateFormat(dt));

    	if(dd > now){
    		return false;
    	}else{
    		return true;
    	}
    }
    
    function makeDateFormat(dt){
	    var yy = dt.substring(0,4);
	    var mm = dt.substring(4,6);
	    var dd = dt.substring(6,8);
//	    if(device.osName == 'iOS'){
//	    	 logf(Number(mm)+"/"+Number(dd)+"/"+yy);
	     	return Number(mm)+"/"+Number(dd)+"/"+yy;
//	    }else{
//	     	logf(Number(dd)+"/"+Number(mm)+"/"+yy);
//		    return Number(dd)+"/"+Number(mm)+"/"+yy;
//	    }
	   
	   
    }
    
    /**
     * 고객센터 전화번호 가져오기
     */
    function myCallCenter(){
    	var mbp = JSON.parse(getMainBPCA());
    	var bpInfo = JSON.parse(getAlopexCookie(mbp.regiogroup));
		logf(bpInfo.tel);
		phone.call(bpInfo.tel);
    }
    
    /**
     * 숫자 , 제거
     * @param nm
     * @returns
     */
    function codeMoney(nm){
		return nm.replace(',','').replace(',','').replace(',','');
	}
    
    /**
     * 목록에서 Null 제거
     * @param as
     * @returns {___anonymous9188_9189}
     */
	function removeArrayToNull(as){
		var _arr = {};
		var l = 0;
		for(var k in as){
			if(as[k] != ''){
				_arr[l] = as[k];
				l++;
			}
		}
		return _arr;
	}
	
	/**
	 * 은랭명으로 화면 그리는 기능
	 * @param bnk
	 * @returns {String}
	 */
	function getBankName(bnk){
//		<li class="bank"><strong><img src="../../images/bank_kb.png" alt="국민은행" /> 국민</strong> <span class="floatR">8305-9012-829440</span></li>
//		<li class="bank"><strong><img src="../../images/bank_nh.png" alt="농협은행" /> 농협</strong> <span class="floatR">0149-4564-919436</span></li>
//		<li class="bank"><strong><img src="../../images/bank_wr.png" alt="우리은행" /> 우리</strong> <span class="floatR">452-061452-18-994</span></li>
//		<li class="bank"><strong><img src="../../images/bank_sh.png" alt="신한은행" /> 신한</strong> <span class="floatR">5620-2405-829242</span></li>
//		<li class="bank"><strong><img src="../../images/bank_ibk.png" alt="기업은행" /> 기업</strong> <span class="floatR">595-063269-97-762</span></li>
//		<li class="bank"><strong><img src="../../images/bank_busan.png" alt="부산은행" /> 부산</strong> <span class="floatR">346-92-689457-1</span></li>
		if(bnk == '국민'){
			return '<strong><img src="../../images/bank_kb.png" alt="국민은행" /> 국민</strong>';
		}else if(bnk == '농협'){
			return '<strong><img src="../../images/bank_nh.png" alt="농협은행" /> 농협</strong>';
		}else if(bnk == '우리'){
			return '<strong><img src="../../images/bank_wr.png" alt="우리은행" /> 우리</strong>';
		}else if(bnk == '신한'){
			return '<strong><img src="../../images/bank_sh.png" alt="신한은행" /> 신한</strong>';
		}else if(bnk == '기업'){
			return '<strong><img src="../../images/bank_ibk.png" alt="기업은행" /> 기업</strong>';
		}else if(bnk == '부산'){
			return '<strong><img src="../../images/bank_busan.png" alt="부산은행" /> 부산</strong>';
		}else{
			return '<strong> '+bnk+'</strong>';
		}
	}
	
	/**
	 * 메인, 청구서 그래프 그리기
	 * @param category
	 * @param datas1
	 * @param datas2
	 */
	function drawGraph(category, datas1, datas2){
		$('#chart').highcharts({
			credits: {
				enabled: false
			},
	        chart: {
	            zoomType: 'none' 					// zoom 막기
	        },
	        exporting: {							// export 막기
	        	contextButton: {
	        		enabled : false
	        	},
	        	enabled : false
	        },
	        title: {
	            text:''
	        },
	        xAxis: [{
	            categories: category,
	            crosshair: false
	        }],
	        yAxis: [{ // Primary yAxis
	             labels: {
	                enabled: false //사이드바 가리기
	            }, 
	            title: {
	                text: '',
	                style: {
	                    color: Highcharts.getOptions().colors[1]
	                }
	            },
	            maxPadding : 0.2          		// 그래프 상단 여유 사이즈 정의
	        }],
	        legend: {
	        	enabled: false
	        },
	        plotOptions: {
	        	column: {
	        		color : '#666',			// 바 그래프 색상
	        		enableMouseTracking : false // 툴팁 막기
	        	},
	        	spline: {
	        		color : '#666',			// 라인 그래프 색상정의
	        		dashStyle : 'solid',			// 라인 정의
	        		dataLabels: {
	        			y:-7,
	        			style: {
	        				fontSize : "8px",
	        				color : "#333"
	        			},
	        			format: '{y}',
	        			enabled : true			// 포인트 출력
	        		},
	        		enableMouseTracking : false	// 툴팁 막기
	        	},
	        	series: {
	        		pointWidth : 8				// 선 굵기(기본 20)
	        	}
	        },
	        series: [{
	            name: '',
	            type: 'column',
	            data: datas1
	        }, {
	            name: '',
	            marker: {
	            	radius : 0,
	            	fillColor : '#ffaaff',
	            },
	            type: 'spline',
	            data: datas2
	        }]
	    });
	}
	
	function textGraph(category, datas1, datas2){
		var str = '고객님의 최근 1년간 도시가스 사용량은 ';
		for(var i=0;i<category.length;i++){
			str += category[i]+' '+datas2[i]+'m<sup>3</sup>';
			if(i != (category.length-1)) str += ', ';
		}
		str += ' 입니다.';
		return str;
	}
	
	/**
	 * 로딩바 관련
	 * 페이지 초기 셋팅
	 */
	function settingLoading(){
		
		var $layerPopObj = $('.loading');
		var left=($(window).scrollLeft()+($(window).width()-$layerPopObj.width())/2);
		var top=($(window).scrollTop()+($(window).height()-$layerPopObj.height())/2);
		$layerPopObj.css({'left':left,'padding-top':top,'position':'absolute'});
		$('body').css('position','relative').append($layerPopObj);
	}
	
	/**
	 * 로딩바 관련
	 * 완료시 호출
	 */
	function completLoad(){
		$('#container').show();
    	$('.loading').hide();
	}
	
	/**
	 * 임시
	 * 코원제외 BP사 코드인경우 001로 고정
	 * 세션의 값이 존재 하는경우 우선처리
	 * @returns
	 */
	function getMainBP(){
		var mbps = getAlopexSession('SessionBP');
		if(mbps == 'undefined'){
			var mbp = getAlopexCookie('MainBP');
			logf(mbp);
			if(mbp.indexOf('B') == -1){
				mbp = mbp.substring(0,1)+'001';
			}
			return mbp;
		}else{
			logf(mbps);
			if(mbps.indexOf('B') == -1){
				mbps = mbps.substring(0,1)+'001';
			}
			return mbps;
		}
	}
	
	function getMainBPCA(){
		var bpcas = getAlopexSession('SessionBPCA');
		if(bpcas == 'undefined'){
			var bpca = getAlopexCookie('MainBPCA');
			return bpca;
		}else{
			return bpcas;
		}
	}
	
	function getSelBP(mbp){
		logf(mbp);
		if(mbp.indexOf('B') == -1){
			mbp = mbp.substring(0,1)+'001';
		}
		return mbp;
	}
	
	/**
	 * 숫자 .밑으로 제거
	 * @param uno
	 * @returns
	 */
	function toMypageUSED(uno){
		logf(uno);
		var rt = chgNumberToMoney(uno.substring(0,uno.indexOf('.')));
		return rt;
	}
	
	/**
	 * 열람 미열람 저장
	 * @param bno
	 */
	function saveBillNo(bno){
		var b1 = getAlopexCookie('readBillList');
		ss = b1;
		if(b1 == 'undefined'){
			// 새로 만들기
			var box2List = new Array();
			box2List.push(bno);
			setAlopexCookie('readBillList',box2List.toString());
		}else{
			b1 = b1.split(',');
			var box2List = [];
			//기존것에 추가
			b1.push(bno);
			//중복제거
			$.each(b1, function(i,el){
	    		if($.inArray(el, box2List) === -1) box2List.push(el);
	    	});
			//100겅체크 날리기
			if(box2List.length > 100){
				box2List.shift();
			}
			//세이브
			setAlopexCookie('readBillList',box2List.toString());
		}
	}
	
	/**
	 * 얄림 미열람 조회
	 * @param bno
	 * @returns {String}
	 */
	function chkBillNo(bno){
		//ss = bno;
		var b1 = getAlopexCookie('readBillList');
		if(b1 == 'undefined'){
			return '미열람';
		}else{
			var chkno = 0;
			b1 = b1.split(',');
			$.each(b1, function(i,el){
	    		if(el == bno){
	    			chkno = 1;
	    			return false;
	    		}    		
	    	});
			if(chkno > 0){
				logf('chkno::'+chkno);
				return '';
			}else{
				logf('chkno::'+chkno);
				return '미열람';
			}
		}
	}
	
	/**
	 * 미납 체납
	 * @param status
	 * @returns {String}
	 */
	function getStringPayStatus(status){
		
		if(status == '1'){
			return '미납';
		}else{
			return '체납';
		}
	}
	
	/**
	 * null chk
	 * @param value
	 * @returns {Boolean}
	 */
	function isNullCheck(value) {
		if (value == "null" || value == null || value == "" || value == " "
				|| value == undefined || value == "undefined") {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * 기간만료 여부 체크
	 * @param e_dt
	 * @param s_dt
	 * @returns {Boolean}
	 */
	function isOverChkDate(e_dt, s_dt){
		if(e_dt == ''){
			return false;
		}else{
			logf('############################');
			logf(e_dt);
			logf(s_dt);
			var edt = new Date(makeDateFormat(e_dt));
			var sdt = new Date(makeDateFormat(s_dt));
			var ndt = new Date();
			ndt.setDate(ndt.getDate() - 1);
			var ndt2 = new Date();
//			ndt2.setDate(ndt2.getDate());
//			var ndt2 = new Date((ndt.getMonth()+1)+'/'+ndt.getDate()+'/'+ndt.getFullYear());
//			logf('edt :'+e_dt+': '+edt.getFullYear()+'-'+(edt.getMonth()+1)+'-'+edt.getDate());
//			logf('sdt :'+s_dt+': '+sdt.getFullYear()+'-'+(sdt.getMonth()+1)+'-'+sdt.getDate());
//			logf('ndt :: '+ndt.getFullYear()+'-'+(ndt.getMonth()+1)+'-'+ndt.getDate());
//			logf('ndt2 :: '+ndt2.getFullYear()+'-'+(ndt2.getMonth()+1)+'-'+ndt2.getDate());
//			console.log(edt.getTime());
//			console.log(ndt.getTime());
			if(edt.getTime() < ndt.getTime()){  // 기간 만료
				logf('기간 만료');
				return false;
			}else if(sdt.getTime() > ndt2.getTime()){	// 기간 이전
				logf('기간 이전');
				return false;
			}else{
				logf('기간 정상');
				return true;
			}
		}
	}
	
	/**
	 * 기간만료 여부 체크 - 비정기
	 * @param e_dt
	 * @param s_dt
	 * @returns {Boolean}
	 */
	function isOverChkDateSpc(e_dt, s_dt, n_dt, lscCd){
		if(e_dt == ''){
			return false;
		}else{
			if(lscCd.substring(0,1) == "B"){	// 코원
				if(n_dt == '20150918'){
					e_dt = '20150918';
				}else if(n_dt == '20150919' || n_dt == '20150920'){
					e_dt = '20150919';
				}else if(n_dt == '20150921'){
					e_dt = '20150920';
				}else{
					return isOverChkDate(e_dt,s_dt);
				}
			}else if(lscCd.substring(0,1) == "C"){		// 부산
				if(n_dt == '20150917' || n_dt == '20150918'){
					e_dt = '20150918';
				}else if(n_dt == '20150919' || n_dt == '20150920'){
					e_dt = '20150919';
				}else if(n_dt == '20150921'){
					e_dt = '20150920';
				}else{
					return isOverChkDate(e_dt,s_dt);
				}
			}else if(lscCd.substring(0,1) == "D"){		// 충청
				if(n_dt == '20150916'){
					e_dt = '20150917';
				}else if(n_dt == '20150917' || n_dt == '20150918'){
					e_dt = '20150918';
				}else if(n_dt == '20150919' || n_dt == '20150920'){
					e_dt = '20150919';
				}else{
					return isOverChkDate(e_dt,s_dt);
				}
			}else if(lscCd.substring(0,1) == "E"){		// 구미
				if(n_dt == '20150918'){
					e_dt = '20150918';
				}else if(n_dt == '20150919' || n_dt == '20150920'){
					e_dt = '20150919';
				}else if(n_dt == '20150921'){
					e_dt = '20150920';
				}else{
					return isOverChkDate(e_dt,s_dt);
				}
			}else if(lscCd.substring(0,1) == "F"){		// 포항
				if(n_dt == '20150916'){
					e_dt = '20150917';
				}else if(n_dt == '20150917'){
					e_dt = '20150918';
				}else if(n_dt == '20150922'){
					e_dt = '20150921';
				}else if(n_dt == '20150923'){
					e_dt = '20150922';
				}else if(n_dt == '20150924'){
					e_dt = '20150923';
				}else{
					return isOverChkDate(e_dt,s_dt);
				}
			}else if(lscCd.substring(0,1) == "G"){		// 전남
				if(n_dt == '20150916'){
					e_dt = '20150917';
				}else if(n_dt == '20150917' || n_dt == '20150918'){
					e_dt = '20150918';
				}else{
					return isOverChkDate(e_dt,s_dt);
				}
			}else if(lscCd.substring(0,1) == "J"){		// 강원
				if(n_dt == '20150916'){
					e_dt = '20150917';
				}else if(n_dt == '20150917' || n_dt == '20150918'){
					e_dt = '20150918';
				}else{
					return isOverChkDate(e_dt,s_dt);
				}
			}else if(lscCd.substring(0,1) == "K"){		// 전북
				if(n_dt == '20150916'){
					e_dt = '20150917';
				}else if(n_dt == '20150917' || n_dt == '20150918'){
					e_dt = '20150918';
				}else{
					return isOverChkDate(e_dt,s_dt);
				}
			}else{
				return false;
			}
			logf('############################');
			logf(e_dt);
			logf(s_dt);
			var edt = new Date(makeDateFormat(e_dt));
			var sdt = new Date(makeDateFormat(s_dt));
			var ndt = new Date();
			ndt.setDate(ndt.getDate() - 1);
			var ndt2 = new Date();
//			ndt2.setDate(ndt2.getDate());
//			var ndt2 = new Date((ndt.getMonth()+1)+'/'+ndt.getDate()+'/'+ndt.getFullYear());
//			logf('edt :'+e_dt+': '+edt.getFullYear()+'-'+(edt.getMonth()+1)+'-'+edt.getDate());
//			logf('sdt :'+s_dt+': '+sdt.getFullYear()+'-'+(sdt.getMonth()+1)+'-'+sdt.getDate());
//			logf('ndt :: '+ndt.getFullYear()+'-'+(ndt.getMonth()+1)+'-'+ndt.getDate());
//			logf('ndt2 :: '+ndt2.getFullYear()+'-'+(ndt2.getMonth()+1)+'-'+ndt2.getDate());
//			console.log(edt.getTime());
//			console.log(ndt.getTime());
			if(edt.getTime() < ndt.getTime()){  // 기간 만료
				logf('기간 만료');
				return false;
			}else if(sdt.getTime() > ndt2.getTime()){	// 기간 이전
				logf('기간 이전');
				return false;
			}else{
				logf('기간 정상');
				return true;
			}
		}
	}
	
	/**
	 * cookie 저장
	 * @param key
	 * @param value
	 */
	function setAlopexCookie(key,value){
		if(key != "CookieList") setCookieList(key);
		if(device.osName != 'iOS'){
			$a.cookie(key,value);
		}else{
			preference.put(key,value);
		}
	}
	
	/**
	 * cookie 로드
	 * @param key
	 * @returns {String}
	 */
	function getAlopexCookie(key){
		if(key != "CookieList") setCookieList(key);
		var rt = '';
		if(device.osName != 'iOS'){
			rt = $a.cookie(key);
			return rt;
		}else{
			rt = preference.get(key);
			if(rt == undefined) rt = "undefined";
			return rt;
		}
	}
	
	/**
	 * session 저장
	 * @param key
	 * @param value
	 */
	function setAlopexSession(key,value){
		if(key != "SessionList") setSessionList(key);
		if(device.osName != 'iOS'){
			$a.session(key,value);
		}else{
			memoryPreference.put(key,value);
		}
	}
	
	/**
	 * session 로드
	 * @param key
	 * @returns {String}
	 */
	function getAlopexSession(key){
		var rt = '';
		if(device.osName != 'iOS'){
			rt = $a.session(key);
			return rt;
		}else{
			rt = memoryPreference.get(key);
			if(rt == undefined) rt = "undefined";
			return rt;
		}
	}
	
	function setSessionList(keyName){
		var b2 = getAlopexSession("SessionList");
		if(b2 == 'undefined'){
			var sessionList = new Array();
			sessionList.push(keyName);
			if(device.osName != 'iOS'){
				$a.session('SessionList',sessionList.toString());
			}else{
				memoryPreference.put('SessionList',sessionList.toString());
			}
		}else{
			b2 = b2.split(',');
			var sessionList = [];
			//기존것에 추가
			sessionList.push(keyName);
			//중복제거
			$.each(b2, function(i,el){
	    		if($.inArray(el, sessionList) === -1) sessionList.push(el);
	    	});
			//세이브
			if(device.osName != 'iOS'){
				$a.session('SessionList',sessionList.toString());
			}else{
				memoryPreference.put('SessionList',sessionList.toString());
			}
		}
	}
	
	function setCookieList(keyName){
		var b2 = getAlopexSession("CookieList");
		if(b2 == 'undefined'){
			var sessionList = new Array();
			sessionList.push(keyName);
			if(device.osName != 'iOS'){
				$a.session('CookieList',sessionList.toString());
			}else{
				memoryPreference.put('CookieList',sessionList.toString());
			}
		}else{
			b2 = b2.split(',');
			var sessionList = [];
			//기존것에 추가
			sessionList.push(keyName);
			//중복제거
			$.each(b2, function(i,el){
	    		if($.inArray(el, sessionList) === -1) sessionList.push(el);
	    	});
			//세이브
			if(device.osName != 'iOS'){
				$a.session('CookieList',sessionList.toString());
			}else{
				memoryPreference.put('CookieList',sessionList.toString());
			}
		}
	}
	
	function killAllSession(){
//		var b2 = getAlopexSession("SessionList");
		var recomendrSS = getAlopexSession('recomendr');
//		b2 = b2.split(',');
//		for(var j=0;j<b2.length;j++){
//			if(b2[j]=='recomendr'){
//				
//			}else{
//				setSessionKill(b2[j]);
//			}
//		}
		memoryPreference.removeAll();
		setAlopexSession('recomendr',recomendrSS);
		setSessionKill("SessionList");
	}
	
	function killAllCookie(){
		var uPhone = getAlopexCookie('uPhone');
		var chkDisablePop = getAlopexCookie('chkDisablePop');
		var change21_20150917 = getAlopexCookie('change21_20150917');
		
//		var b2 = getAlopexSession("CookieList");
	//	var resetFlag = getAlopexCookie("resetFlag150817");
//		if(resetFlag != 'true'){
//			b2 = b2.split(',');
//			for(var j=0;j<b2.length;j++){
////				if(b2[j] == 'uPhone' || b2[j] == 'resetFlag' || b2[j] == 'pushID'){
////					
////				}else{
//					setCookieKill(b2[j]);
////				}
//			}
			preference.removeAll();
			setSessionKill("CookieList");
//			setAlopexCookie("resetFlag150817","true");
			console.log("### clear cookie - complete ###");
			setAlopexCookie('change21_20150917',change21_20150917);
			setAlopexCookie('uPhone',uPhone);
			setAlopexCookie('chkDisablePop',chkDisablePop);
//		}else{
//			console.log("### clear cookie - end ###");
//		}
	}
	
	function killAllExitCookie(){
		var b2 = getAlopexSession("CookieList");
		b2 = b2.split(',');
		for(var j=0;j<b2.length;j++){
			setCookieKill(b2[j]);
		}
		setSessionKill("CookieList");
	}
	
	function setSessionKill(sid){
		console.log("####### kill session ####");
		if(device.osName != 'iOS'){
			$a.session(sid,'undefined');
		}else{
			memoryPreference.put(sid,'undefined');
		}
	}
	
	function setCookieKill(sid){
		console.log("####### kill Cookie ####");
		if(device.osName != 'iOS'){
			$a.cookie(sid,'undefined');
		}else{
			preference.put(sid,'undefined');
		}
	}
	
	/**
	 * trim
	 * @param str
	 * @returns
	 */
	function trim(str){
		str = str.replace(/(^\s*)|(\s*$)/,"");
		return str;
	}
	
	function replaceAll(str, str2, str3){
		str = eval('str.replace(/'+str2+'/gi,str3)');
		return str;
	}
	/**
	 * 로그 출력
	 * @param conV
	 */
	function logf(conV){
//		logfV('SCGC_Mobile',conV);
		//gclee log
		log.log(conV);
		console.log(conV);
	}
	function logfV(ti, conV){
		try{
			//gclee log
			if(device.osName == 'iOS'){
				log.log(conV);
			}else{
				console.log(conV);
			}
			console.log(conV);
		
		}catch(e){
			console.log(conV);
		}
	}
	function loge(conV){
//		logeV('SCGC_Mobile',conV);
		console.log(conV);
	}
	function logeV(ti, conV){
		try{
			
			//gclee log
//			if(device.osName == 'iOS'){
//				log.error(conV);
//			}else{
//				console.log(conV);
////				console.log(ti);
//			}
			
			console.log(conV);

			
		}catch(e){
			console.error(conV);
		}
	}
	
	
	
	/**
	 * 공용팝업
	 * HTML 하단에 foot_popup.js 추가해 줘야 동작함
	 * @param tit			타이틀					string
	 * @param cont			내용					string
	 * @param noti			느낌표 표시 여부 결정		boolean
	 * @param modalClose	modal 적용 여부 결정		boolean
	 * @param btnGrp		버튼 여부 				json{name, id, type[0,2]}
	 */
	var notiPopID = "";
	function notiPop(tit,cont,noti,modalClose,btnGrp){
		if(btnGrp==null){
			// no
			$('.btnGrpNotiP2').html('<span class="small"><button class="Button red pNotiP2Ok">확인</button></span>');
		}else{
			// set BTN
			var btnStr = '';
			for(var i=0;i<btnGrp.list.length;i++){
				btnStr += '<span class="small"><button class="Button red'+btnGrp.list[i].type+' '+btnGrp.list[i].id+'">'+btnGrp.list[i].name+'</button></span>';
			}
			$('.btnGrpNotiP2').html(btnStr);
		}
		if(noti){
    		$('#titleNotiP2').addClass('warning');
    	}else{
    		$('#titleNotiP2').removeClass('warning');
    	}
    	$('#titleNotiP2').html(tit);
    	$('#contNotiP2').html(cont);
    	notiPopID = $('.noti_pop').bPopup({
			modalClose: modalClose,
			opacity: 0.6,
			speed: 300, 
		});
    	if(btnGrp==null){
    		$('.pNotiP2Ok').click(function(){
        		//공용
        		notiPopID.close();
        	});
    	}
	}

	/**
	 * 공용 입력 팝업
	 * HTML 하단에 foot_input_popup.js 추가해 줘야 동작함
	 * @param tit			타이틀					string
	 * @param cont			내용						string
	 * @param noti			느낌표 표시 여부 결정		boolean
	 * @param modalClose	modal 적용 여부 결정		boolean
	 */
	var notiInputPopID = "";
	function notiInputPop(tit,cont,noti,modalClose){
		if(noti){
    		$('#titleNotiP3').addClass('warning');
    	}else{
    		$('#titleNotiP3').removeClass('warning');
    	}
    	$('#titleNotiP3').html(tit);
    	$('#contNotiP3').html(cont);
    	notiInputPopID = $('.noti_pop').bPopup({
			modalClose: modalClose,
			opacity: 0.6,
			speed: 300, 
		});
    	
		$('.pNotiP3Ok').click(function(){
    		//공용
			notiInputPopID.close();
    	});
		$('.pNotiP3Cancel').click(function(){
    		//공용
			notiInputPopID.close();
    	});
	}
	
	/**
	 * 편의점 수납 
	 * 2015-07-23일 발행일 이후부터 조회가 가능하기때문에
	 * 해당 일자를 지났는지 검증하는 function
	 * @param cdt 	발행일		string	20150724
	 * @returns {Boolean}
	 */
	function isCBNStart(cdt){
		var ldt = new Date('07/23/2015');
    	var dd = new Date(makeDateFormat(cdt));

    	if(dd >= ldt){
    		return true;
    	}else{
    		return false;
    	}
	}
	
	/**
	 * 점검일인지 여부 체크
	 * 매주 금요일 오후9시 이후에 오류 발생시 점검 공지 보일지 검증
	 * 다음날 세벽 5시 까지 
	 * @returns {Boolean}
	 */
	function isChkDay(){
		var now = new Date();
		
		var month = now.getMonth()+1;
		var day = now.getDate();
		var year = now.getFullYear();
		
		if(year == 2016 && month == 1 && day == 28){
			if(now.getHours() >= 21){	// 9시 이후
				return true;
			}else{
				return false;
			}
		}else if(year == 2016 && month == 1 && day == 29){
			if(now.getHours() < 6){	// 6시 이전
				return true;
			}else{
				return false;
			}
			
		}else if(now.getDay() == 4){	// 목요일
			if(now.getHours() >= 21){	// 9시 이후
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
	
	function putGlobalPreference(key, value){
		try{
			globalPreference.put(key, value);
		}catch(e){}
	}
	
	function getGlobalPreference(key){
		try{
			return globalPreference.get(key);
		}catch(e){
			return '';
		}
	}