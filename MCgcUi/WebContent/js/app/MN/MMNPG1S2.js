document.addEventListener('alopexready', mainStart);

var ss = '';
var lscDB = '';

var pcID = '';
var callNo = '1599-0009';
var box1NM = '';

function mainStart(){
	setDefault();
	setEventListner();
	
	lscDB = JSON.parse(getAlopexCookie('lscDB'));
}


function setEventListner(){
	$('.box1Call').click(function(event){
		makeBox2(event.currentTarget.children[0].value);
	});
	
	$('.box2Call').click(function(event){
//		ss = event;
		alert('!!');
	});
	
	$('.doBack').click(function(){
		//$a.back();
		navigateGo('MACHP2M0');
	});
	
	$('.callStart').click(function(){
		logf(callNo);
		phone.call(callNo);
	});
	
	$('.callCancle').click(function(){
		pcID.close();
	});
	
	$('.back1').click(function(){
		$('.box2').hide();
		$('.box3').hide();
		$('.box1').show();
	});
	
	$('.back2').click(function(){
		$('.box1').hide();
		$('.box3').hide();
		$('.box2').show();
	});
};

function makeBox2(box1){
	var box2ListStr = '';
	//var lscDB = JSON.parse(getAlopexCookie('lscDB'));
	//console.log(lscDB);
	var box2List = [];
	
	$.each(lscDB, function(i,el){
		if(el.city == box1){
			console.log(box1);
			if($.inArray(el.sigungu, box2List) === -1) box2List.push(el.sigungu);
		}
	});
	logf(box2List);
	if(box2List.length > 0){
		$.each(box2List, function(i,el){
			box2ListStr += '<li><a href="javascript:void(0);" class="box2Call">'+el+'</a></li>';
		});
		$('.box2List').html(box2ListStr);
		$('.box1').hide();
		box1NM = box1;
		$('.box2Msg').html(box1 + ' > ');
		$('.box2').show();
		
		$('.box2Call').click(function(event){
    		var chkCity = jQuery(event.currentTarget).html();
    		logf(chkCity);
    		makeBox3(chkCity);
    	});
	}else{
		loge('error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	}
}

function makeBox3(box2){
	var box3ListStr = '';
//	var lscDB = JSON.parse(getAlopexCookie('lscDB'));
	var box3List = [];
	
	$.each(lscDB, function(i,el){
		if(el.sigungu == box2){
			box3List.push(el);
		}
	});    	
	if(box3List.length == 1){
//		var phoneNum = box3List[0].tel;
//		callNo = phoneNum;
		console.log(box3List[0]);
		var param = {
			pageId : 'MMNPG1S4',
			parameters : box3List[0],
			autoDismiss: false
		};
		navigation.navigate(param);
//		pcID = $('.pop_call').bPopup({
//			opacity: 0.6,
//			speed: 300
//		});
	}else if(box3List.length > 1){
		$.each(box3List, function(i,el){
			box3ListStr += '<li><a href="javascript:void(0);" class="box3Call"><input type="hidden" value="'+i+'">'+el.dong+'</a></li>';
		});
		$('.box3List').html(box3ListStr);
		$('.box2').hide();
		box2NM = box2;
		$('.box3Msg').html(box1NM + ' > ' + box2 + ' > ');
		$('.box3').show();
		
		$('.box3Call').click(function(event){
    		var phoneNum = jQuery(event.currentTarget).children()[0].value;
    		console.log(box3List[Number(phoneNum)]);
    		
    		var param = {
				pageId : 'MMNPG1S4',
				parameters : box3List[Number(phoneNum)],
				autoDismiss: false
			};
			navigation.navigate(param);
//    		callNo = phoneNum;
    		//alert('11');
//    		pcID = $('.pop_call').bPopup({
//				opacity: 0.6,
//				speed: 300
//			});
    	});
	}
}


$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
//    	
//    	setDefault();
//    	setEventListner();
    };    
});