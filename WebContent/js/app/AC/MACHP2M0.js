
document.addEventListener('alopexready', mainStart);


function mainStart(){
	params = navigation.parameters;
	logf('param :: '+JSON.stringify(params));
	var getuInfoElse = '';
	if(device.osName != 'iOS'){
		getuInfoElse = getAlopexSession('uInfoElse');
	}else{
		getuInfoElse = getAlopexCookie('uInfoElseCookie');
	}
	if(getuInfoElse == 'undefined'){
//		setAlopexSession('uInfoElse',JSON.stringify(params));
		if(device.osName != 'iOS'){
			setAlopexSession('uInfoElse',JSON.stringify(params));
		}else{
			setAlopexCookie('uInfoElseCookie',JSON.stringify(params));
		}
		logf('1');
	}else if(params == null){
		params = JSON.parse(getuInfoElse);
		logf('2');
	}else{
//		setAlopexSession('uInfoElse',JSON.stringify(params));
		if(device.osName != 'iOS'){
			setAlopexSession('uInfoElse',JSON.stringify(params));
		}else{
			setAlopexCookie('uInfoElseCookie',JSON.stringify(params));
		}
		logf('3');
	}
	
	if(params.from != null && params.from == '60'){
		if(params.retMsg.indexOf('대표번호 일치') > -1){
			$('.msgBox3').html('해당 세대는 이미 등록 되어있습니다. <br /><span class="col_red">아래의 보조인증으로 회원가입을 계속해 주세요.</span>');
			if(params.mobile == undefined){
				$('.boxphone3div').hide();
			}else{
				$('.box3Phone').html(viewPhoneNM(params.mobile));
			}
			
			// 고객센터만 열기
		}else if(params.retMsg.indexOf('미존재 세대번호') > -1){
			$('.msgBox3').html(params.retMsg+' <br /><span class="col_red">아래의 보조인증으로 회원가입을 계속해 주세요.</span>');
			if(params.mobile == undefined){
				$('.boxphone3div').hide();
			}else{
				$('.box3Phone').html(viewPhoneNM(params.mobile));
			}
		}else{}
		setScreen(3);
	}else if(params.list.bpCaList[0].from != null && params.list.bpCaList[0].from == '70'){
		if(params.list.bpCaList[0].retMsg.indexOf('대표번호 일치') > -1){
			$('.msgBox4').html('해당 세대는 이미 등록 되어있습니다. <br /><span class="col_red">아래의 보조인증으로 회원가입을 계속해 주세요.</span>');
			// 고객센터만 열기
			//$('.box4Phone').html(viewPhoneNM(params[0].mobile));
			if(params.list.bpCaList[0].mobile == undefined){
				$('.boxphone4div').hide();
			}else{
				$('.box4Phone').html(viewPhoneNM(params.list.bpCaList[0].mobile));
			}
		}else{$('.boxphone4div').hide();}
		setScreen(4);
	}else if(params.list.bpCaList[0].retMsg.indexOf('비회원') > -1){
		setScreen(2);
	}else{
		setScreen(1);
		try{
			$('.box1Phone').html(viewPhoneNM(params[0].mobile));
		}catch(e){
			$('.box1Phone').html(viewPhoneNM(params.list.bpCaList[0].mobile));
		}
	}
	
	setDefault();
	setEventListner();
}

function setEventListner(){
	$('#NonMain').click(function(){
		//app 종료
	});
	
	$('.doCall').click(function(){
		navigateGo('MACHP2M1');
	});
	
	$('.doBacord').click(function(){
		navigateGo('MACHP2M2');
	});
	
	$('.doCA').click(function(){
		navigateGo('MACHP2M3');
	});
		
	$('.doNonUser').click(function(){
		navigateGo('MMNPG1M0');
	});
};

function setScreen(no){
	if(no == 2){
		$('.box2').show();
		$('.doCall').show();
		$('.doBacord').show();
		$('.doCA').show();
		//$('.doCall').show();
	}else if(no == 3){
		$('.box3').show();
		$('.doCall').show();
		$('.doBacord').show();
		$('.doCA').show();
	}else if(no == 4){
		$('.box4').show();
		$('.doCall').show();
		$('.doBacord').show();
		$('.doCA').show();
	}else{
		$('.box1').show();
		$('.doCall').show();
	}
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});