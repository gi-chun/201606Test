
var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MFXUS0C0';
var ss = '';
function mainStart(){
	setEventListner();
	
	var str = "selfChk :: "+getAlopexSession('selfChk')+"<br/>";
	str += "selfChkMulti :: "+getAlopexSession('selfChkMulti')+"<br/>";
	str += "selfChkSide :: "+getAlopexSession('selfChkSide')+"<br/>";
	str += "selfChkSideOut :: "+getAlopexSession('selfChkSideOut')+"<br/>";
	str += "endME :: "+getAlopexSession('endME')+"<br/>";
	var mp = JSON.parse(getAlopexSession('mainPage'));
	console.log(mp);
	str += "cb.custReadingresult :: "+mp.custReadingresult+"<br/>";
	str += "cb.v_ablhinw :: "+mp.v_ablhinw+"<br/>";
	str += "cb.e_adatsoll1 :: "+mp.e_adatsoll1+"<br/>";
	str += "cb.s_adatsoll1 :: "+mp.s_adatsoll1+"<br/>";
	str += "isOverChkDate :: "+isOverChkDate(mp.e_adatsoll1,mp.s_adatsoll1)+"<br/>";
	str += "chkstr :: "+getAlopexSession('chkStr')+"<br/>";
	$('.content').html(str);
	setDefault();
}

function setEventListner(){
	//doPage();
}

$a.page(function(){
    this.init = function(id,param){
    	logf('page on');	
    };
});