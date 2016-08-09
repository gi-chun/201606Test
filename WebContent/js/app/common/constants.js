
var CONSTANTS = new Object();

var _0x5a44=["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x73\x63\x67\x63\x2E\x73\x6B\x65\x6E\x73\x2E\x63\x6F\x6D\x3A\x31\x34\x34\x33\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F\x6E\x6D\x70"];
var _0xd8e0=["\x68\x74\x74\x70\x3A\x2F\x2F\x31\x36\x38\x2E\x31\x35\x34\x2E\x31\x38\x32\x2E\x31\x30\x37\x3A\x31\x39\x36\x38\x31\x2F\x63\x69\x70\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F\x6E\x6D\x70"];
var _0x19b3=["\x68\x74\x74\x70\x3A\x2F\x2F\x70\x75\x73\x68\x2E\x73\x6B\x65\x6E\x73\x2E\x63\x6F\x6D\x2F\x70\x75\x73\x68\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F\x6E\x6D\x70"];

/*
 * 사용방법 
 * var app_id = CONSTANTS.APP_ID;
 */
CONSTANTS = {
	// 
	APP_IDENTIFIER : "com.alopex.android.template",
		
	//App id
	APP_ID : "SCGC",
	
	PUSH_APP_ID : "push",
	
	//HTTP Timeout
	HTTP_TIMEOUT : 180000, //10000,
	
	//CIP Url
	senderId : "1001614302866", //구글앱아이디
//	senderId : "1001614302866
	
	//TEST
	CIP_TEST_URL :_0xd8e0[0],
	//TEST local - 백지훈대리님 로컬PC
//	CIP_TEST_URL : "http://168.154.182.41/services/api/nmp",
//	CIP_TEST_URL : "http://192.9.112.128:8090/scgc/services/nmp",
	CIP_TEST_URL : "http://168.154.182.107:19681/cip/services/nmp",
//	CIP_TEST_URL : "http://192.9.100.165:13331/api/nmp",
	//운영
	//CIP_URL : "http://scgc.skens.com:9090/services/nmp",
	CIP_URL : "http://168.154.182.41/services/api/nmp",
//	CIP_URL : "https://scgc.skens.com:1443/services/nmp",
	
	UPLOAD_URL : "",

	PUSH_URL : _0x19b3,
	
	//화면 ID
	SCREEN_ID : "",
	
	EXPIRED_PERIOD : 2*60*60*1000,
	
	BUILD_DATE : "2015-05-12.01"
		
};

/**
 * 화면 아이디 설정
 *
 */
try {
	
	CONSTANTS.SCREEN_ID = ( location.href.indexOf("?") > -1 ) ?  location.href.substring( 0,  location.href.indexOf("?") ) : location.href;
	CONSTANTS.SCREEN_ID = CONSTANTS.SCREEN_ID.substring( CONSTANTS.SCREEN_ID.lastIndexOf("/")+1, CONSTANTS.SCREEN_ID.lastIndexOf(".") );

} catch (e) { 
	loge("Get CONSTANTS.SCREEN_ID Error");
};

