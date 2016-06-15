//$(document).ready(function() {
//    document.addEventListener("alopexready", function() {
//       init();
//    });
//});
//
//var signature_path;
//
//function init() {
//    //$( ".content").css("height", $("body").height()-$("#titleBarText").height());
//    $("#openButton").click(showBarcodeReader);
//}
//
//function showBarcodeReader() {
//    var option = {
//        "width" : 500,
//        "height" : 400,
//        "x" : window.event.x,
//        "y" : window.event.y
//    }
//    jsniCaller.invoke("BarcodeReaderJSNI.showBarcodeReader", JSON.stringify(option), "barcodeReadSuccessCallback");
//}
//
//function barcodeReadSuccessCallback(param) {
//    $("#scanResult").text(param);
//}

$(document).ready(function() {
    document.addEventListener("alopexready", function() {
    	jsniCaller.invoke("GetPhoneNumber.myPhone","popPhone");
    });
});

function popPhone(pn){
	//alert(pn);
	var keyName = "uPhone";
	
	console.log('my phone num1 :: '+pn);
	getAlopexCookie(keyName,pn);
	console.log('my phone num2 :: '+getAlopexCookie("uPhone"));
	
	$('#BtnLogin').click(function(){
		console.log('clickLogin0 :: ');
		var uPhone = getAlopexCookie(keyName);
		console.log('clickLogin1 :: '+uPhone);
		if(uPhone == 'null'){
			console.log('clickLogin2 :: '+uPhone);
			$a.navigate('AC/MACHP0M0');
		}else{
			console.log('clickLogin3 :: '+uPhone);
			$a.navigate('AC/MACHP1M0');
		}
	});
	$('#Main').click(function(){
		$a.navigate('MN/MMNPG0M0');
	});
	$('#NonMain').click(function(){
		$a.navigate('MN/MMNPG1M0');
	});
}


$a.page(function(){
	this.init = function(id,param){
		
	}

	$a.navigate.setup({
    	url : function(url, param){
    		return url +'.html';
    	}
    });
});