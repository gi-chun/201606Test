var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MNTMA0M0';

var params = '';
function mainStart(){
	settingLoading();
	$('.imgloading').show();
	
	doPage();
}

function doPage(){
	$('.topLogoDiv').html(getTitleBpPush());
	var bp = getMainBP();
	var ss2 = bp.substring(0,1)+"000";
	
	var param = {
		"cgcSe" : ss2
	};
	httpSend("getNtBdList", param, function(Mcb){
		var str = '';
		for(var i=0;i<Mcb.list.ntBdList.length;i++){
			str += '<li ';
			if(isNoticeNew(Mcb.list.ntBdList[i].REG_DATE)) str += 'class="new"';
			str += '>';
			str += '	<a href="javascript:void(0);" class="viewNotice">';
			str += '		<strong>'+replaceAll(Mcb.list.ntBdList[i].TITLE, '\'','&quot;')+'</strong>';
			str += '		<input type="hidden" value="'+Mcb.list.ntBdList[i].SEQ+'"/>';
			str += '	<span>'+Mcb.list.ntBdList[i].REG_DATE+'</span></a>';
			str += '</li>';
		}
		$('.nt_list').html(str);
		
		$('.viewNotice').click(function(e){
			console.log(e.currentTarget.children[1].value);
			var param = {
				pageId : 'MNTMA0M1',
				parameters : {
					noti_no : e.currentTarget.children[1].value
				},
				autoDismiss: false
			};
			navigation.navigate(param);
		});
		completLoad();
		setDefault();
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

function isNoticeNew(dd){
	try{
		var now = new Date();
		var chkDt = new Date(makeDateFormat(replaceAll(dd,'-','')));
		var gap = now.getTime() - chkDt.getTime(); 
		var rtDay = Math.floor(gap / (1000 * 60 * 60 * 24)+1);
		if(rtDay < 3){
			return true;
		}else{
			return false;
		}
	}catch(e){
		return false;
	}
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});
