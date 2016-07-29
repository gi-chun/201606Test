/***
 * date : 2015-05-15
 * pg : jys
 * note : 
 * 1. 가입완료 처리 남음
 */
document.addEventListener('alopexready', mainStart);


var mbpFlag = false;
var cgLists = [];
var params = '';
var uPhone = '';

function mainStart(){
	params = navigation.parameters;
	logf(JSON.stringify(params));
//	setBoxList(params);
	setBPBoxList(params);
	
	setEventListner();
	setDefault();
	
	uPhone = getAlopexCookie('uPhone');
}


function setBoxList(cbr){
	var cb = ''; 
	try{
		cb = cbr.list.bpCaList;
		if(cb == undefined){
			cb = cbr;
		}
	}catch(e){
		cb = cbr;
	}
	
	// 배열처리해야함
	//cb = cb[0];
	$('.uPhone').html(viewPhoneNM(cb[0].mobile));
	var caList = '<p class="pb10">모바일 청구서를 신청하시면, 도시가스 앱에서 언제라도 1년간의 청구서를 조회하실 수 있으며,  푸시알림으로 청구서 발행 메시지도 받으실 수 있습니다.</p>';
	if(true){
		//console.log('11');
		//var cgList = [];
		for(var i=0;i<cb.length;i++){
		//	console.log('1122');
			caList += '<div class="bill">'+
			'<input type="hidden" value="'+Number(cb[i].bp)+','+Number(cb[i].ca)+'"/>'+
    		'<p><strong>납입자 번호</strong><span class="bold"><label for="chkc'+i+'" class="af-checkbox-text">'+Number(cb[i].ca)+'</label></span><span class="check"><input class="Checkbox" name="chkc0" value="'+Number(cb[i].ca)+'" checked="checked" id="chkc'+i+'" data-type="checkbox" data-classinit="true" type="checkbox" data-converted="true"></span></p>'+
    		'<p><strong>주소</strong><span class="txt">'+cb[i].addr+'</span></p>'+
    		'</div>';
		//	console.log('112233');
			cgLists[i] = {
					'bp' : Number(cb[i].bp),
					'ca' : Number(cb[i].ca),
					'sdType' : 22
			};
		}
		//cgLists = cgList;
		setAlopexCookie('cgLists',JSON.stringify(cgLists));
		//mokamoka10x
		//저장 시기 저장 cgListsDT
		//console.log('11223344');
		$('.box_CaList').html(caList);
		//console.log('1122334455');
	}else{
		// 다수
	}
	
}

function setBPBoxList(cbr){
	var cb = ''; 
	try{
		cb = cbr.list.bpCaList;
		if(cb == undefined){
			cb = cbr;
		}
	}catch(e){
		cb = cbr;
	}
	//cb = cbr.list.bpCaList;
	logf(cb);
	var bpList = '';
	if(cb.length > 1){
		logf('1');
		mbpFlag = true;
	//	fbp_div
		logf('12');
		for(var i=0;i<cb.length;i++){
			logf('123::'+i);
			var lcsData = JSON.parse(getAlopexCookie(getSelBP(cb[i].regiogroup)));
			logf(lcsData);
			
			/*
			 <label for="chk0" class="af-checkbox-text"><input class="Checkbox" name="chk0" checked="checked" value="check1" id="chk0" data-type="checkbox" data-classinit="true" type="checkbox" data-converted="true"></label>
			 */
			
			bpList += '<tr'+(i==0?' class="col_red"':'')+'>'+
			'	<td ><input class="Checkbox" name="chk0"'+(i==0?' checked="checked"':'')+' value="'+cb[i].regiogroup+','+cb[i].bp+','+cb[i].ca+'" id="chk'+i+'" data-type="checkbox" data-classinit="true" type="checkbox" data-converted="true"></td>'+
			'	<td><label for="chk'+i+'" class="af-checkbox-text">'+Number(cb[i].ca)+'</label></td>'+
			'	<td>'+lcsData.bpname+'</td>'+
			'</tr>';
		}
		//bpList += '<tr><td><label for="chk1" class="af-checkbox-text"><input class="Checkbox" name="chk0" value="check2" id="chk1" data-type="checkbox" data-classinit="true" type="checkbox" data-converted="true"></label></td><td>12345678</td><td>코원에너지서비스</td></tr>';
		$('.box_BpList').html(bpList);
		$('#fbp_div').show();
		
		$('[name=chk0]').click(function(e){
			logf(e.currentTarget.id);
    		$('[name=chk0]').setChecked(false);
    		$('#'+e.currentTarget.id).setChecked(true);
    		$('#'+e.currentTarget.id).parents('TBODY').children('TR').removeClass('col_red');
    		$('#'+e.currentTarget.id).parents('TR').addClass('col_red');
    	});
		//
	}else{
		$('#fbp_div').hide();
			var Str3 = {
					bp : cb[0].bp,
					ca : cb[0].ca
			};
			
			setAlopexCookie('MainBP',getSelBP(cb[0].regiogroup));
			setAlopexCookie('MainBPCA',JSON.stringify(Str3));
	}
}

function setEventListner(){
	$('#pop_test_1').click(function(){
		$('#bill_n').css('display','none');
		$('#fbp_div').css('display','none');
	});
	
	$('#pop_test_n').click(function(){
		//console.log('11');
		$('#bill_n').css('display','block');
		$('#fbp_div').css('display','block');
	});
		
	$('#pop_rep').click(function(){
		showProgressBar();
		
		$('#pop_rep').hide();
		$('.imgloading').show();
		
		if(mbpFlag){
			var Str1 = $('[name=chk0]:checked')[0].value;
			var Str2 = Str1.split(',');
			var Str3 = {
					bp : Str2[1],
					ca : Str2[2]
			};
			setAlopexCookie('MainBP',Str2[0]);
			setAlopexCookie('MainBPCA',JSON.stringify(Str3));
		}
//		if($('[name=chkc0]:checked').length > 0){
//			logf('go change');
//			logf($('[name=chkc0]:checked').length);
//			
//			var param = {'list' : 		[{'bpCaReqList' : []	}]  			};
//			for(var i=0;i<$('[name=chkc0]:checked').length;i++){
//				var s1 = $('[name=chkc0]:checked')[i].parentNode.parentNode.parentNode.children[0].value;
//				var s2 = s1.split(',');
//				var pn = uPhone;
//				param.list[0].bpCaReqList[i] = {
//						'bp' : s2[0],
//						'ca' : s2[1],
//						'phoneNum' : pn,
//						'statusGp' : '21',
//						'gubun' : '50'
//				};
//				for(var i=0;i<cgLists.length;i++){
//    				if(cgLists[i].bp == Number(s2[0]) && cgLists[i].ca == Number(s2[1])){
//    					cgLists[i].sdType = 21;
//    					setAlopexCookie('cgLists',JSON.stringify(cgLists));
//    					//mokamoka10x
//    					break;
//    				}
//    			}
//			}
//
//			logf(param);
//			
//	    	httpSend("putAccInfo", param, function(cb){
//	    		logf(cb);
//	    		//navigateGo('MMNPG0M0');
//	    		
//	    		goLogin();
//	    	}, function(errorCode, errorMessage){
//	    		if (errorCode == "9999") {
//	    			goLogin();
//	    			loge('error :: 9999 :: hsUsrCommit');
//	    		} else {
//	    			goLogin();
//	    			loge('error :: other :: hsUsrCommit');
//	    		}
//	    	});
//		}else{
			logf('go main');
			//navigateGo('MMNPG0M0');
			navigateGo('index');
//			goLogin();
//		}
	});   	
};

function goLogin(){

	var param = {
		"phoneNum" : uPhone, "gubun" : "10"
	};

	logf('gclee getAccInfo MACHP1M1 ' + JSON.stringify(param));

	httpSend("getAccInfo", param, function(cb){
		logf('cb',cb);
		
		var rtCB = clopCB(cb);
//		if(cb.list.bpCaList[0].retCd == 'F'){
//			navigateGo('MACHP1M0');
//		}else{
//			setAlopexSession('login',cb);
//			if(getAlopexCookie('MainBP') == 'undefined'){
//				
//				var Str3 = {
//						bp : cb.list.bpCaList[0].bp,
//						ca : cb.list.bpCaList[0].ca
//				};
//				
//				setAlopexCookie('MainBP',getSelBP(cb.list.bpCaList[0].regiogroup));
//				setAlopexCookie('MainBPCA',JSON.stringify(Str3));
//			}
//			navigateGo('MMNPG0M0',cb);
//		}
		
		if(getAlopexCookie('MainBP') == 'undefined'){
			var Str3 = {
					bp : String(Number(rtCB.list.bpCaList[0].bp)),
					ca : String(Number(rtCB.list.bpCaList[0].ca)),
					sernr : rtCB.list.bpCaList[0].sernr,
					anlage : String(Number(rtCB.list.bpCaList[0].anlage)),
					regiogroup : rtCB.list.bpCaList[0].regiogroup
			};
			
			setAlopexCookie('MainBP',getSelBP(rtCB.list.bpCaList[0].regiogroup));
			setAlopexCookie('MainBPCA',JSON.stringify(Str3));
		}
		if(rtCB.list.bpCaList.length > 0){
//			navigateGo('MMNPG0M0',rtCB);
			navigateGo('index');
		}else{
			navigateGo('MMNPG0M0');
		}
	}, function(errorCode, errorMessage){
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
		}
	});
}

function clopCB(cb){
	var rtCB = { 'result': "1000", 
			'resultMessage': "OK", 
			'list' : {
			           'bpCaList' : []
			}};
	logf(rtCB);
	var rtCBNo = 0;
	for(var i=0;i<cb.list.bpCaList.length;i++){
//		if(cb.list.bpCaList[i].retCd != 'F' || cb.list.bpCaList[i].retMsg.indexOf('검침 계량기가 여러 대 입니다.') > -1){
		if(cb.list.bpCaList[i].retCd != 'F'){
			rtCB.list.bpCaList[rtCBNo] = cb.list.bpCaList[i];
			rtCBNo++;
		}
	}
	return rtCB;
}


$a.page(function(){
    this.init = function(id,param){
    	logf('page on');   	
    	
    };
});