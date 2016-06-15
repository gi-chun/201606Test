
var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', initBack);
	alopexreadyRun = false;
}

function initBack(){
	if(device.osName == 'Android'){
		alopexController.setCustomizedBack(backBTNAnd);
	}
}

function backBTNAnd(){
	try{	// 이전페이지 저장 로직 만들까?
		if(nowPGCode == 'MNTMA0M0'){			//	 공지 목록 > 메인
			navigateGo('MMNPG0M0');
		}else if(nowPGCode == 'MNTMA0M1'){		// 공지 상세 > 목록
			navigateBackToNaviGo('MNTMA0M0');
		}else if(nowPGCode == 'MBLMG0M0'){		// 청구목록 > 메인
			navigateGo('MMNPG0M0');
		}else if(nowPGCode == 'MBLMG0M2'){		// 청구상세 > 목록
			navigateBackToNaviGo('MBLMG0M0');
		}else if(nowPGCode == 'MBLMG1M0'){		// 요금납부 > 메인
			navigateGo('MMNPG0M0');
		}else if(nowPGCode == 'MNTFQ0M1'){		// FAQ > 메인
			navigateGo('MMNPG0M0');
		}else if(nowPGCode == 'MMETR0M0'){		// 자가검침 > 메인
			navigateGo('MMNPG0M0');	
		}else if(nowPGCode == 'MNTGD0M1'){		// 가이드 > 메인
			navigateGo('MMNPG0M0');
		}else if(nowPGCode == 'MFXST0M0'){		// 푸시설정 > 설정
			navigateGo('MFXUS0M0');
		}else if(nowPGCode == 'MFXUS0M0'){		// 설정 > 메인
			navigateGo('MMNPG0M0');
		}else if(nowPGCode == 'MFXUS0M1'){		// 설정변경 > 설정
			navigateGo('MFXUS0M0');
		}else{
//			navigation.back();
			navigateGo('MMNPG0M0');
		}
	}catch(e){
		navigateGo('MMNPG0M0');
	}
	
}