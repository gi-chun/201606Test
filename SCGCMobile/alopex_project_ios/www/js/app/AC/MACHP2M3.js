var bePGID = '';
$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    	
    	setDefault();
    	setEventListner();
    	
//    	bePGID = getAlopexSession('bePGID');
    	if(device.osName != 'iOS'){
    		bePGID = getAlopexSession('bePGID');
    	}else{
    		bePGID = getAlopexCookie('bePGIDCookie');
    	}
    	if("MMNPG1M0" == bePGID){
    		$('.doBack').html('돌아가기');
    	}else{
    		$('.doBack').html('다른 인증시도');
    	}
    };
    
    var eh_div = "";
    var ep_div = "";
    var nh_div = "";
    var np_div = "";
    
    function setEventListner(){
    	$('#num_home').bind('click', function(e) {
    		e.preventDefault();
    		nh_div = $('.num_home').bPopup({
    			opacity: 0.6,
    			speed: 300,
    		});
    	});
    	$('#num_paid').bind('click', function(e) {
    		e.preventDefault();
    		np_div = $('.num_paid').bPopup({
    			opacity: 0.6,
    			speed: 300, 
    		});
    	});
    	$('#error_home').bind('click', function(e) {
    		e.preventDefault();
    		$('.error_home').bPopup({
    			opacity: 0.6,
    			speed: 300, 
    		});
    	});
    	$('#error_paid').bind('click', function(e) {
    		e.preventDefault();
    		$('.error_paid').bPopup({
    			opacity: 0.6,
    			speed: 300, 
    		});
    	});
    	
    	$('.doBack').click(function(){
//    		navigateGo('MACHP2M0');
    		try{
    			if(bePGID == "MMNPG1M0"){
    				navigateGo('MMNPG1M0');
    			}else{
    				navigateGo('MACHP2M0');
    			}
    		}catch(e){
    			navigateGo('MACHP2M0');
    		}
    	});
    	
    	$('.doComp').click(function(){
    		if(chkForm()){
    			showProgressBarMsg('고객번호 인증을 진행중입니다.');
    			logf('true');
    			var param = {
						"bp" : $('#bpid').val(),
						"ca" : $('#caid').val(),
						//"vstelle" : $('.setBarcode').html(),
			    		//"phoneNum" : MainCb.mobile, 
			    		//"statusGp" : '21', 
			    		"gubun" : "70"
					};
    			logf('gclee MACHP2M3 ' + JSON.stringify(param));
				
		    	httpSend("getAccInfo", param, function(cb){
		    		logf(cb);
		    		console.log(cb);
		    		if(cb.list.bpCaList[0].retCd == 'F'){
		    			logf('F');
		    			cb.list.bpCaList[0].from = '70';
		    			navigateGo('MACHP2M0',cb);
		    			//이미 가입된 세대
		    			//BPCA가 올바르지 않은 경우
		    		}else{
		    			logf('S');
		    			//navigateGo('MACHP1M1',cb.list.bpCaList);
		    			
			    		var pn = getAlopexCookie('uPhone');
			    		var paramCommit = { "list" : [{ "bpCaReqList": []}] };
			    		
			    		paramCommit.list[0].bpCaReqList[0] = {
								"bp" : cb.list.bpCaList[0].bp,
								"ca" : cb.list.bpCaList[0].ca,
					    		"phoneNum" : pn, 
					    		"gubun" : "30"
	    					};
			    		logf('gclee MACHP2M3',paramCommit);
		    			httpSend("putAccInfo", paramCommit, function(cbCommit){
		    				logf(cbCommit);
//		    				
		    	    		navigateGo('MACHP1M1',cbCommit);
//		    	    		
		    			}, function(errorCode, errorMessage){
		    				if (errorCode == "9999") {
		    					loge('error :: 9999 :: barcode_commit');
		    	    		} else {
		    	    			loge('error :: other :: barcode_commit');
		    	    		}
		    			});
		    		}
		    	}, function(errorCode, errorMessage){
		    		if (errorCode == "9999") {
		    			loge('error :: 9999 :: bpca');
		    		} else {
		    			loge('error :: other :: bpca');
		    		}
		    	});
    		}else{
    			loge('false');
    		}
    		//$a.navigate('AC/MACHP1M1');
    	});
    	
    	$('.closeEH').click(function(){
    		eh_div.close();
    	});
    	
    	$('.closeEP').click(function(){
    		ep_div.close();
    	});
    	
    	$('.closeNH').click(function(){
    		nh_div.close();
    	});
    	
    	$('.closeNP').click(function(){
    		np_div.close();
    	});
    };

    function chkForm(){
    	if($('#bpid').val().length < 8){
    		eh_div = $('.error_home').bPopup({
    			opacity: 0.6,
    			speed: 300, 
    		});
    		return false;
    	}else if($('#caid').val().length < 8){
    		ep_div = $('.error_paid').bPopup({
    			opacity: 0.6,
    			speed: 300, 
    		});
    		return false;
    	}else{
    		return true;
    	}
    }
});