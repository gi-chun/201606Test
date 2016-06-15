var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
var params = '';
nowPGCode = 'MNTQA0M1';
function mainStart(){
	params = navigation.parameters;
	settingLoading();
	$('.imgloading').show();
	
	setEventListner();
	doPage();
}

function setEventListner(){

}
var ss = '';
function doPage(){
	$('.topLogoDiv').html(getTitleBp());
	var pn = getAlopexCookie('uPhone');
	
	var param = {
			"phoneNum" : pn,
			"qnaSe" : "B",
			"beginNo" : "1",
			"pageSize" : "10"
	};
	
	httpSend("getQnaList", param, function(cb){
//		Scb = cb;
//		pageSetting(cb);
		console.log(cb);
//		console.log();
		if(cb.list.qnaList == undefined){
			console.log('11');
			var str = '<li><a href="#">전출 신청 내용이 없습니다.</a></li>';
			
			//gclee test
//			var str = '';
//			for(var i=0;i<11;i++){
//				var status = "Y"=="Y"?"답변완료":"답변대기중";
//				
//				str += '<li>';
//				str += '	<a href="#" class="tit">['+status+'] '+'test1'+' ('+'test1'+')</a>';
//				str += '	<div class="cont'+i+' dispNone colList">';
//				str += '<ul><li>[질문]<ul><li> 제목 : '+'test1'+'</li><li> 내용 : '+'test1' +'</li></ul></li>';
//				str += '<li>[답변]<ul><li> 답변일 : '+'test1'+'</li><li> 내용 : '+'test1' +'</li></ul></li></ul>';
//				str += '	</div>';
//				str += '</li>';
//			}
//			$('.qnaList').html(str);
//			//$('.Accordion_Menu').collapseAll();
//			$('.cont0').show();
//			
//			$('.tit').click(function(e){
//				//console.log(e);
//				//ss = e;
//				$('.colList').hide();
//				$('.'+e.currentTarget.nextElementSibling.className.split(" ")[0]).show();
//			});
			//gclee end
			
			$('.qnaList').html(str);
		}else{
			console.log('22');
			var str = '';
			for(var i=0;i<cb.list.qnaList.length;i++){
				var status = cb.list.qnaList[i].ANSWER_AT=="Y"?"답변완료":"답변대기중";
				
				str += '<li>';
				str += '	<a href="#" class="tit">['+status+'] '+cb.list.qnaList[i].QESTN_SJ+' ('+cb.list.qnaList[i].WRITNG_DE+')</a>';
				str += '	<div class="cont'+i+' dispNone colList">';
				str += '<ul><li>[질문]<ul><li> 제목 : '+cb.list.qnaList[i].QESTN_SJ+'</li><li> 내용 : '+cb.list.qnaList[i].QESTN_CN +'</li></ul></li>';
				str += '<li>[답변]<ul><li> 답변일 : '+cb.list.qnaList[i].ANSWER_DE+'</li><li> 내용 : '+cb.list.qnaList[i].ANSWER_CN +'</li></ul></li></ul>';
				str += '	</div>';
				str += '</li>';
			}
			$('.qnaList').html(str);
			//$('.Accordion_Menu').collapseAll();
			$('.cont0').show();
			
			$('.tit').click(function(e){
				//console.log(e);
				//ss = e;
				$('.colList').hide();
				$('.'+e.currentTarget.nextElementSibling.className.split(" ")[0]).show();
			});
		}
		//******************		
		completLoad();
		setDefault();
	}, function(errorCode, errorMessage){
		completLoad();
		setDefault();
		if (errorCode == "9999") {
			loge('error :: 9999 :: main');
		} else {
			loge('error :: other :: main');
			console.log(errorMessage);
		}
	});
	
	$('#agree_both').click(function(){
		navigateGo('MNTQA0M2');
	});
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});
