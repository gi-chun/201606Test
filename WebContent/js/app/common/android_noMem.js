var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', initBack);
	alopexreadyRun = false;
}

function initBack(){
	if(device.osName == 'Android'){
		alopexController.setCustomizedBack(backBTN);
	}
}

function backBTN(){
	navigateBackToNaviGo('MMNPG1M0');
}