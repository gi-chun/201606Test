
var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MINRE0M0';
function mainStart(){
	setEventListner();
	setDefault();
}

function setEventListner(){
	
}

function download(url){
	
		var downloadHttp = new Http();
		var entity = {
		    "url" : url
		};

		downloadHttp.download(entity, downloadSuccessCallback, downloadErrorCallback, downloadProgressCallback, downloadCancelCallback);

		function downloadSuccessCallback(path) {
		   platformUIComponent.dismissProgressBarDialog();
		   alert("아래의 경로로 다운로드 완료 되었습니다.\n\n다운로드 경로 : " + path);
		}

		function downloadErrorCallback(http) {
//		   alert ("Fail to download file. error code: " + http.errorCode + " errorMessage: " + http.errorMessage);
		}

		function downloadProgressCallback(progress) {
		   platformUIComponent.setProgress(progress); //파일 다운로드 진행률을 UI로 보여줌.
		}
		
		function downloadCancelCallback() {
		}
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');	
    };
});