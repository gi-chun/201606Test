document.addEventListener('alopexready', init);

function init(){
	if(device.osName == 'Android'){
		// 전화번호 가져오기
		jsniCaller.invoke("GetPhoneNumber.myPhone","popPhone");
//		AlopexController.setCustomizedBack(function(){
//			alert('1');
//		});
	}
}

function popPhone(pn){
	alert(pn);
};

$(function () {

		$('#chart').highcharts({
			credits: {
				enabled: false
			},
	        chart: {
	            zoomType: 'none' 					// zoom 막기
	        },
	        exporting: {							// export 막기
	        	contextButton: {
	        		enabled : false
	        	},
	        	enabled : false
	        },
	        title: {
	            text:''
	        },
	        xAxis: [{
	            categories: ['5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월', '1월', '2월', '3월', '4월'],
	            crosshair: false
	        }],
	        yAxis: [{ // Primary yAxis
	             labels: {
	                enabled: false //사이드바 가리기
	            }, 
	            title: {
	                text: '',
	                style: {
	                    color: Highcharts.getOptions().colors[1]
	                }
	            },
	            maxPadding : 0.2          		// 그래프 상단 여유 사이즈 정의
	        }],
	        legend: {
	        	enabled: false
	        },
	        plotOptions: {
	        	column: {
	        		color : '#666',			// 바 그래프 색상
	        		enableMouseTracking : false // 툴팁 막기
	        	},
	        	spline: {
	        		color : '#666',			// 라인 그래프 색상정의
	        		dashStyle : 'solid',			// 라인 정의
	        		dataLabels: {
	        			y:-7,
	        			style: {
	        				fontSize : "8px",
	        				color : "#333"
	        			},
	        			enabled : true			// 포인트 출력
	        		},
	        		enableMouseTracking : false	// 툴팁 막기
	        	},
	        	series: {
	        		pointWidth : 8				// 선 굵기(기본 20)
	        	}
	        },
	        series: [{
	            name: '',
	            type: 'column',
	            data: [117.0, 140.0, 160.0, 165.0, 0.0, 132.0, 117.0, 140.0, 160.0, 165.0, 120.0, {
	            	y:132.0,
	                color : '#ea002c'
	            }]
	        }, {
	            name: '',
	            marker: {
	            	radius : 0,
	            	fillColor : '#ffaaff',
	            },
	            type: 'spline',
	            data: [117.0, 140.0, 160.0, 165.0, 0.0, 132.0, 117.0, 140.0, 160.0, 165.0, 120.0, {
	            	y:132.0,
	                color : '#ea002c'
	            }]
	        }]
	    });
	
	
//    $('#chart').highcharts({
//        chart: {
//            zoomType: 'none' 					// zoom 막기
//        },
//        exporting: {							// export 막기
//        	contextButton: {
//        		enabled : false
//        	},
//        	enabled : false
//        },
//        title: {
//            text:''
//        },
//        //subtitle: {
//        //    text: 'Source: WorldClimate.com'
//        //},
//        xAxis: [{
//            categories: ['5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월', '1월', '2월', '3월', '4월'],
//            /* plotBands : [{
//            	color : '#aaaaaa',				// 밴드 색상 조절
//            	from : 10.5,					// 범위는 건들지 마세요.
//            	to : 11.5
//            }], */
//            /* labels: {
//            	style : {
//            		fontSize : "10px"
//            	}
//            }, */
//            crosshair: false
//        }],
//        yAxis: [{ // Primary yAxis
//             labels: {
//                enabled: false //사이드바 가리기
//            }, 
//            title: {
//                text: '',
//                style: {
//                    color: Highcharts.getOptions().colors[1]
//                }
//            },
//            maxPadding : 0.2          		// 그래프 상단 여유 사이즈 정의
//        }],
//       /*  tooltip: {
//            //shared: false
//            //enabled: false
//            formatter: function () {
//            	return this.y;				// 툴팁 내용 정의
//            }
//        }, */
//        legend: {
//        	enabled: false
//        },
//        plotOptions: {
//        	column: {
//        		color : '#666',			// 바 그래프 색상
//        		enableMouseTracking : false // 툴팁 막기
//        	},
//        	spline: {
//        		color : '#666',			// 라인 그래프 색상정의
//        		dashStyle : 'solid',			// 라인 정의
//        		dataLabels: {
//        			y:-7,
//        			style: {
//        				fontSize : "8px",
//        				color : "#333"
//        			},
//        			enabled : true			// 포인트 출력
//        		},
//        		enableMouseTracking : false	// 툴팁 막기
//        	},
//        	series: {
//        		pointWidth : 8				// 선 굵기(기본 20)
//        	}
//        },
//        series: [{
//            name: '',
//            type: 'column',
//            data: [117.0, 140.0, 160.0, 165.0, 0.0, 132.0, 117.0, 140.0, 160.0, 165.0, 120.0, {
//            	y:132.0,
//                color : '#ea002c'
//            }]
//        }, {
//            name: '',
//            marker: {
//            	radius : 10,
//            	fillColor : '#ffaaff',
//            	//lineWidth: 4,									// border
//            	//symbol: 'square'
//            	
//            	 symbol : 'url(../images/ico_point.png)'   		// 작성하세요.
//            	 //,height : 10
//            	 //,width : 30
//            },
//            //pointStart : 20,
//            type: 'spline',
//            data: [117.0, 140.0, 160.0, 165.0, 0.0, 132.0, 117.0, 140.0, 160.0, 165.0, 120.0, {
//				y:132.0,
//				marker:{
//					 symbol : 'url(../images/ico_point2.png)'
//				}
//			}]
//        }]
//    });
});