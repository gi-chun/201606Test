var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', initBack);
	alopexreadyRun = false;
}

var closeNM = 0;

function initBack(){
	if(device.osName == 'Android'){
		alopexController.setCustomizedBack(backBTN);
	}
}

function backBTN(){
	if(closeNM == 0){
		closeNM = 1;
		$('.info_back').bPopup({
			opacity: 0.6,
			speed: 300, 
			autoClose:1000,
			onClose: function(){
				closeNM = 0;
			}
		});
		$('.info_back').css({'top':'80%','position':'absolute'});
	}else{
		navigation.exit();
	}
}

document.write('<div id="popup2" class="pop_prepare2">');
document.write('<div class="inner">');
document.write('<p class="prepare">한번더 누르시면 종료 됩니다.</p>');
document.write('</div>');
document.write('</div>');
document.write('<div class="info_back" style="display:none"><p><span>뒤로버튼을 한번 더 누르시면 종료됩니다.</span></p></div>');