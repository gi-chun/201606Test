/***
 * date : 2015-05-19
 * pg : jys
 * note : 
 * 1. 내용 입력
 */

var alopexreadyRun = true;
if(alopexreadyRun){
	document.addEventListener('alopexready', mainStart);
	alopexreadyRun = false;
}
nowPGCode = 'MMNMP0M0';
var bpInfo = '';
function mainStart(){
	setEventListner();
	$('.topLogoDiv').html(getTitleBpPush());

	settingLoading();
	$('.imgloading').show();
//	
//	var map = new GoogleMap();
//	map.initialize();
	
	doPage();
}

function setEventListner(){

};

function doPage(){
//	var param = '';
//	var mbp = getMainBP();
//	var bpInfo = JSON.parse(getAlopexCookie(mbp));
	var mbp = JSON.parse(getMainBPCA());
		
	console.log(JSON.stringify(bpInfo));
	console.log(bpInfo);
	$('.titMap').text(bpInfo.lscNm);
	$('#titLoStr').text(bpInfo.addr);
	$('#titTel').text(bpInfo.tel);
	//##################################################################
    google.maps.Marker.prototype.setLabel = function(label){
        this.label = new MarkerLabel({
          map: this.map,
          marker: this,
          text: label
        });
        this.label.bindTo('position', this, 'position');
    };

    var MarkerLabel = function(options) {
        this.setValues(options);
        this.span = document.createElement('span');
        this.span.className = 'map-marker-label';
    };

    MarkerLabel.prototype = $.extend(new google.maps.OverlayView(), {
        onAdd: function() {
            this.getPanes().overlayImage.appendChild(this.span);
            var self = this;
            this.listeners = [
            google.maps.event.addListener(this, 'position_changed', function() { self.draw();    })];
        },
        draw: function() {
//            var text = String(this.get('text'));
//            var position = this.getProjection().fromLatLngToDivPixel(this.get('position'));
//            this.span.innerHTML = text;
//            this.span.style.left = (position.x - (markerSize.x / 2)) - (text.length * 3) + 10 + 'px';
//            this.span.style.top = (position.y - markerSize.y + 40) + 'px';
        }
    });
	//##################################################################
	var myLatLng = new google.maps.LatLng(bpInfo.LAT,bpInfo.LNG);

	var gmap = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom: 16,
		center: myLatLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var myMarker = new google.maps.Marker({
		map: gmap,
		position: myLatLng,
		label: bpInfo.lscNm,
		draggable: false
	});
	//##################################################################
	completLoad();
	setDefault();
	//##################################################################   
}



$a.page(function(){
    this.init = function(id,param){
    	logf('page on');
    };
});