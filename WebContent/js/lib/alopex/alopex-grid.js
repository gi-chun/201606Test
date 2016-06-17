/*! Alopex UI - v2.3.0 - 2015-04-06
* http://ui.alopex.io
* Copyright (c) 2015 alopex.ui; Licensed Copyright. SK C&C. All rights reserved. */
+(function($) {
	if (!window.console) {
		window.console = {
				history: [],
				historyLimit: 200,
				log: function() {
					this.history.push(Array.prototype.join.call(arguments, ' '));
					while (this.history.length > this.historyLimit) {
						this.history.shift();
					}
				}
		};
	}
	var $window = $(window);
	var $windowtop = $(window.top);

	function getParamNames(fn) {
		var funStr = fn.toString();
		return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(/([^\s,]+)/g);
	}
	function voidFunction(){}
	var isMobile = ("ontouchstart" in document.documentElement || 'ontouchstart' in window);
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	var isIE = (function() {
		//get document mode
		for (var v = 3, el = document.createElement('b'), all = el.all || [];
		el.innerHTML = '<!--[if gt IE ' + (++v) + ']><i><![endif]-->', all[0];);
		return _min(v > 4 ? v : document.documentMode, document.documentMode);
	}());
	var ieVER = (function(){
		//get browser mode
		var e, obj = document.createElement("div"), x,
		verIEtrue = null,  // True IE version [string/null]
		CLASSID = [
		           "{45EA75A0-A269-11D1-B5BF-0000F8051515}", // Internet Explorer Help
		           "{3AF36230-A269-11D1-B5BF-0000F8051515}", // Offline Browsing Pack 
		           "{89820200-ECBD-11CF-8B85-00AA005B4383}"];
		try{obj.style.behavior = "url(#default#clientcaps)"}
		catch(e){ };
		for (x=0;x<CLASSID.length;x++)
		{
			try{verIEtrue = obj.getComponentVersion(CLASSID[x], "componentid").replace(/,/g,".")}
			catch(e){ };
			if (verIEtrue) break;
		};
		return typeof verIEtrue ==="string" ? Number(verIEtrue.split(".")[0]) : null;
	})();
	var isAlopexEvent = $.fn.hasOwnProperty('tap') || $.fn.hasOwnProperty('singletap');
	var isAlopexMobile = isMobile && isAlopexEvent;
	var wheelEventName = ("onwheel" in document.createElement("div")) ? "wheel" : // Modern browsers support "wheel"
		document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
			"DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

	function _noapi(){
		setTimeout(function(){
			console.error('[DO NOT USE]');
			throw new Error('[AlopexGrid] unsupported API');
		},0);
	}
	//Polyfill
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	if (!Array.prototype.filter) {
		Array.prototype.filter = function(fun/*, thisArg*/) {
			'use strict';
			if (this === void 0 || this === null) {
				throw new TypeError();
			}

			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== 'function') {
				throw new TypeError();
			}

			var res = [];
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++) {
				if (i in t) {
					var val = t[i];
					// NOTE: Technically this should Object.defineProperty at
					//       the next index, as push can be affected by
					//       properties on Object.prototype and Array.prototype.
					//       But that method's new, and collisions should be
					//       rare, so use the more-compatible alternative.
					if (fun.call(thisArg, val, i, t)) {
						res.push(val);
					}
				}
			}

			return res;
		};
	}
	// Production steps of ECMA-262, Edition 5, 15.4.4.14
	// Reference: http://es5.github.io/#x15.4.4.14
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(searchElement, fromIndex) {

			var k;

			// 1. Let O be the result of calling ToObject passing
			//    the this value as the argument.
			if (this == null) {
				throw new TypeError('"this" is null or not defined');
			}

			var O = Object(this);

			// 2. Let lenValue be the result of calling the Get
			//    internal method of O with the argument "length".
			// 3. Let len be ToUint32(lenValue).
			var len = O.length >>> 0;

			// 4. If len is 0, return -1.
			if (len === 0) {
				return -1;
			}

			// 5. If argument fromIndex was passed let n be
			//    ToInteger(fromIndex); else let n be 0.
			var n = +fromIndex || 0;

			if (Math.abs(n) === Infinity) {
				n = 0;
			}

			// 6. If n >= len, return -1.
			if (n >= len) {
				return -1;
			}

			// 7. If n >= 0, then Let k be n.
			// 8. Else, n<0, Let k be len - abs(n).
			//    If k is less than 0, then let k be 0.
			k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

			// 9. Repeat, while k < len
			while (k < len) {
				// a. Let Pk be ToString(k).
				//   This is implicit for LHS operands of the in operator
				// b. Let kPresent be the result of calling the
				//    HasProperty internal method of O with argument Pk.
				//   This step can be combined with c
				// c. If kPresent is true, then
				//    i.  Let elementK be the result of calling the Get
				//        internal method of O with the argument ToString(k).
				//   ii.  Let same be the result of applying the
				//        Strict Equality Comparison Algorithm to
				//        searchElement and elementK.
				//  iii.  If same is true, return k.
				if (k in O && O[k] === searchElement) {
					return k;
				}
				k++;
			}
			return -1;
		};
	}
	// Production steps of ECMA-262, Edition 5, 15.4.4.19
	// Reference: http://es5.github.io/#x15.4.4.19
	if (!Array.prototype.map) {

		Array.prototype.map = function(callback, thisArg) {

			var T, A, k;

			if (this == null) {
				throw new TypeError(' this is null or not defined');
			}

			// 1. Let O be the result of calling ToObject passing the |this| 
			//    value as the argument.
			var O = Object(this);

			// 2. Let lenValue be the result of calling the Get internal 
			//    method of O with the argument "length".
			// 3. Let len be ToUint32(lenValue).
			var len = O.length >>> 0;

			// 4. If IsCallable(callback) is false, throw a TypeError exception.
			// See: http://es5.github.com/#x9.11
			if (typeof callback !== 'function') {
				throw new TypeError(callback + ' is not a function');
			}

			// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
			if (arguments.length > 1) {
				T = thisArg;
			}

			// 6. Let A be a new array created as if by the expression new Array(len) 
			//    where Array is the standard built-in constructor with that name and 
			//    len is the value of len.
			A = new Array(len);

			// 7. Let k be 0
			k = 0;

			// 8. Repeat, while k < len
			while (k < len) {

				var kValue, mappedValue;

				// a. Let Pk be ToString(k).
				//   This is implicit for LHS operands of the in operator
				// b. Let kPresent be the result of calling the HasProperty internal 
				//    method of O with argument Pk.
				//   This step can be combined with c
				// c. If kPresent is true, then
				if (k in O) {

					// i. Let kValue be the result of calling the Get internal 
					//    method of O with argument Pk.
					kValue = O[k];

					// ii. Let mappedValue be the result of calling the Call internal 
					//     method of callback with T as the this value and argument 
					//     list containing kValue, k, and O.
					mappedValue = callback.call(T, kValue, k, O);

					// iii. Call the DefineOwnProperty internal method of A with arguments
					// Pk, Property Descriptor
					// { Value: mappedValue,
					//   Writable: true,
					//   Enumerable: true,
					//   Configurable: true },
					// and false.

					// In browsers that support Object.defineProperty, use the following:
					// Object.defineProperty(A, k, {
					//   value: mappedValue,
					//   writable: true,
					//   enumerable: true,
					//   configurable: true
					// });

					// For best browser support, use the following:
					A[k] = mappedValue;
				}
				// d. Increase k by 1.
				k++;
			}

			// 9. return A
			return A;
		};
	}

	var ___tick___ = -1;
	function tick() {
		___tick___ = performance.now();
	}
	function tock() {
		return parseFloat(performance.now()-___tick___).toFixed(3);
	}

	var _idbase = Number(Math.random().toString().split(".").pop().slice(-3));
	var _idprefix = "alopexgrid";
	if($.inArray('dataTransfer', $.event.props)<0) {
		$.event.props.push('dataTransfer');
	}
	if($.inArray('clipboardData', $.event.props)<0) {
		$.event.props.push('clipboardData');
	}
	if($.inArray('alopexgrid', $.event.props)<0) {
		$.event.props.push('alopexgrid');
	}


	var __tagsToReplace = {
			'&': '&amp;','<': '&lt;','>': '&gt;','"': '&quot;',"'": '&#039;',' ':'&nbsp;'
	};
	function __replaceTag(tag) {
		return __tagsToReplace[tag] || tag;
	}
	function _escapeHTML(str) {
		return String(str).replace(/[&<>"'\s\u00A0]/g, __replaceTag);
	}

	function _generateUniqueId() {
		return _idprefix + (_idbase++);
	}
	function _generateUniqueNumber() {
		return _idbase++;
	}

	function _scrollHack($elem, ns){
		if(isMobile) { $elem.on('touchstart'+(ns||''), voidFunction); }
	}
	function clearSelection() {
		if (window.getSelection) {
			if (window.getSelection().empty) {
				try {
					window.getSelection().empty();
				} catch (error) {
				}
			} else {
				if (window.getSelection().removeAllRanges) {
					try {
						window.getSelection().removeAllRanges();
					} catch (error) {
					}
				}
			}
		} else {
			if (document.selection && document.selection.empty) {
				try {
					document.selection.empty();
				} catch (error) {
				}
			}
		}
	}
	function _valid(value) {
		return !(value === null || value === undefined);
	}
	function _min(a, b) {
		return a < b ? a : b;
	}
	function _max(a, b) {
		return a > b ? a : b;
	}
	function _generateHTML(data) {
		var html = "";
		if($.isArray(data)) {
			for(var i=0,l=data.length;i<l;i++) {
				html += _generateHTML(data[i]);
			}
			return html;
		}
		if (!data || (!data.tag && !data.child)) {
			return data || "";
		}

		if (data.tag) {
			html += ('<'+data.tag);
			if (data.attr) {
				for (var key in data.attr) {
					var name = key;
					if (key == "styleclass") {
						name = "class";
					}
					html += (' '+name+'="'+data.attr[key]+'"');
				}
			}
			html += '>';
		}

		if ($.isArray(data.child)) {
			for (var i=0,l=data.child.length;i<l;i++) {
				html += _generateHTML(data.child[i]);
			}
		} else if(data.child) {
			html += _generateHTML(data.child)
		}
		//}

		if (data.tag) {
			html += ('</'+data.tag+'>');
		}

		return html;

	}
	function _addClassAttribute(elem, className) {
		if(!elem.attr.styleclass || $.inArray(className,elem.attr.styleclass.split(' ')) < 0) {
			elem.attr.styleclass = (elem.attr.styleclass || '') + ' ' + className;
		}
	}
	function _addEventAttribute(elem, type, handler, useAttr) {
//		if (!elem || typeof elem !== "object" || !elem.hasOwnProperty('tag') || typeof type !== "string") {
//			return;
//		}
		var name = type;
		elem.attr = elem.attr || {};
		elem.attr[name] = elem.attr[name] || "";
		elem.attr[name] += handler;
	}

	function _isColumnValid(mapping, cell, value, data) {
		var self = this;
		if ($.isArray(mapping.valid)) {
			for ( var i in mapping.valid) {
				if (mapping.valid[i] === value) {
					return true;
				}
			}
			return false;
		} else if (typeof mapping.valid == "function") {
			return mapping.valid.call(self, value, data, mapping);
		} else if ($.isArray(mapping.rule)) {
			for ( var i in mapping.rule) {
				if (_ruleValue(mapping.rule[i],"value") === value) {
					return true;
				}
			}
			return false;
		}
		return true;
	}
	//mapping.render.rule object parser/reader
	function _parseRule(render, value, data, mapping) {
		if(!render.rule) return null;
		var rules = render.rule || null;
		if($.isFunction(render.rule)) {
			rules = render.rule(value, data, mapping) || null;
		}
		if($.isArray(render.rule)) {
			rules = render.rule;
		}
		return rules;
	}
	function _ruleValue(ruleobj, key) {
		if(ruleobj.hasOwnProperty(key)) return ruleobj[key];
		if(ruleobj.hasOwnProperty(key.toUpperCase())) return ruleobj[key.toUpperCase()];
		if(ruleobj.hasOwnProperty(key.toLowerCase())) return ruleobj[key.toLowerCase()];
		return undefined;
	}
	//셀 내부의 데이터로부터 현재 선택된 값을 추출..?
	function _extractValue(mapping, cell, data) {
		//render.type="text" : 셀 내부의 input의 value를 data로 추출한다
		//render.type="select" : 셀 내부의 select의 selected option의 value를 추출
		//render.type="radio" : 셀 내부의 radio input중 checked input의 value를 추출
		//render.type="check" : 셀 내부의 check input의 check여부에 따라 boolean값 추출
		//그 외에 처리되지 않는 내용은 endEdit함수에 의해 처리된다.
		var self = this;
		var $cell = cell.jquery ? cell : $(cell);
		if (mapping.editable === true) {
			if(self.option.directEdit) {
				return $cell.text();
			}
			return $cell.find('input').eq(0).val();
		}
		var editable = mapping.editable;

		if(editable.type && (self.option.renderMapping[editable.type] || self.option.renderMapping["*"])) {
			var mappedRender = self.option.renderMapping[editable.type] || self.option.renderMapping["*"];
			if($.isFunction(mappedRender)) {
				editable = mappedRender(editable, mapping);
			} else if($.isPlainObject(mappedRender)) {
				editable = $.extend({}, editable, mappedRender);
			}
		}

		if(editable.type) {
			if (editable.type == "text") {
				var val = $cell.find('input').val();
				if (editable.rule) {
					if (editable.rule === "comma") {
						val = val.replace(/,/g, '');
					} else if (editable.rule === "date" || editable.rule === "month") {
						val = val.replace(/-/g, '');
					}
				}
				return val;
			}
			if (editable.type == "select") {
				return $cell.find('select option').filter(":selected").val();
			}
			if (editable.type == "radio") {
				return $cell.find('input').filter(":checked").val();
			}
			if (editable.type == "textarea") {
				return $cell.find('textarea').val();
			}
			if (editable.type == "check") {
				var rule = editable.rule;
				var checked = $cell.find('input').eq(0).is(":checked");
				//true/false만 리턴하거나, 또는 render.rule이 지정하는 바가 있을 경우 찾아서 value를 생성한다.
				if ($.isArray(rule)) {
					$.each(rule, function(idx, r) {
						if (_ruleValue(r,"check") === checked) {
							checked = _ruleValue(r,"value");
							return false;
						}
					});
				}
				return checked;
			}
			if (editable.type == "date") {
				return $cell.find('input').val().replace(/\-/gi, '');
			}
		} else {
			var worker = null;
			if ($.isFunction(mapping.editedValue) || $.isFunction(editable.editedValue)) {
				worker = (mapping.editedValue || editable.editedValue);
			}
			if($.isFunction(worker)) {
				return worker(cell, $.extend({}, data), mapping);
			}
		}
	}
	function _renderValue(render, value, data, mapping) {
		var self = this;
		var rendered = "";
		if (value === undefined) {
			value = "";
		}
		// var copied = $.extend({}, data);
		var type = render.type || null;
		var orgtype = type;
		if(type && (self.option.renderMapping[type] || self.option.renderMapping["*"])) {
			var mappedRender = self.option.renderMapping[type] || self.option.renderMapping["*"];
			if($.isFunction(mappedRender)) {
				render = mappedRender.call(self, render, mapping);
			} else if($.isPlainObject(mappedRender)) {
				render = $.extend({}, render, mappedRender);
			}
			type = render.type || null;
		}
		if(!(type || render)) {
			throw new Error('[AlopexGrid] Unable to render cell with a renderer of type "'+orgtype+'"');
		}
		rendered += _renderValue.plugin[type || "general"].call(self, render, value, data, mapping);
		return rendered;
	}

	_renderValue.plugin = {};
	_renderValue.plugin["general"] = function(render, value, data, mapping) {
		var rendered = "";
		if (typeof render == "string") {
			rendered += render;
		} else if ($.isFunction(render)) {
			rendered += render.call(this, value, data, mapping, render);
		} else if ($.isPlainObject(render)) {
			if(render.rule) {
				var rules = $.isFunction(render.rule) ? render.rule(value, data, mapping, render) : render.rule;
				for ( var idx in rules) {
					if (_ruleValue(rules[idx],"value") == value) {
						rendered += _ruleValue(rules[idx],"text");
					}
				}
			}
		}
		return rendered;
	};
	//TODO 메타기반으로 자동 생성 가능토록
	_renderValue.plugin["href"] = function(render, value, data, mapping) {
		var rendered = "";
		rendered += ('<a href="'+ (value || '#') + '" class="');
		if (render.styleclass) {
			rendered += (render.styleclass);
		}
		rendered += ('" ');
		if (typeof render.attr == "object") {
			for ( var prop in render.attr) {
				rendered += (prop + '="' + render.attr[prop] + '" ');
			}
		}
		rendered += ('>');
		if (render.text) {
			rendered += (render.text);
		}
		rendered += ('</a>');
		return rendered;//.join('');
	};
	//일반 텍스트 렌더링 모듈. 천단위 콤마와 같은 특수 포매팅도 담당한다. 
	_renderValue.plugin["string"] = function(render, value, data, mapping) {
		value = _escapeHTML(value);
		var tag = {
				tag: "div",
				attr: {},
				child: value
		};
		tag.attr = $.extend(tag.attr, $.isPlainObject(render.attr) ? render.attr : null);
		if (typeof render.styleclass === "string") {
			tag.attr.styleclass = render.styleclass;
		}
		var renderrule = _parseRule(render, value, data, mapping);
		if (typeof renderrule === "string") {
			var rules = renderrule.split(' ');
			var result = value;
			$.each(rules, function(idx, rule) {
				if (rule === "comma") {
					result = _addCommas(result);
				} else if (rule === "ellipsis") {
					tag.attr.style = tag.attr.style || "";
					tag.attr.style += "text-overflow: ellipsis; white-space: nowrap; overflow: hidden;";
				}
			});
			tag.child = result;
		} else if($.isArray(render.rule) || $.isFunction(render.rule)) {
			var result = value;
			var rules = ($.isFunction(render.rule) ? render.rule(value, data, mapping) : render.rule) || [];
			for(var i=0,l=rules.length; i<l; i++) {
				var rule = rules[i];
				if(_ruleValue(rule, "value") === undefined) continue;
				if(String(_ruleValue(rule, "value")) === String(value) && _ruleValue(rule, "text") !== undefined) {
					result = _ruleValue(rule, "text");
				}
			}
			tag.child = result;
		}
		if($.isEmptyObject(tag.attr)) return _generateHTML(tag.child);
//		tag.child = _escapeHTML(tag.child);
		return _generateHTML(tag);
	};
	//textarea 생성 
	_renderValue.plugin["textarea"] = function(render, value, data, mapping) {
		//{ type : "textarea" , attr : {row : 6, col : 30}, styleclass : "newtextarea"
		var tag = {
				tag: "textarea",
				attr: {
					name: (this.option.editableNameWithKey ? mapping.key : null) || _generateUniqueId()
				},
				child: value
		};
		tag.attr = $.extend(tag.attr, $.isPlainObject(render.attr) ? render.attr : null);
		if (typeof render.styleclass === "string") {
			tag.attr.styleclass = render.styleclass;
		}
		if (!tag.attr.style || tag.attr.style.indexOf('width') === -1) {
			tag.attr.style = (tag.attr.style || "") + "width:100%;max-width:100%;height:100%;padding:0;";
		}
		return _generateHTML(tag);
	};
	//input tag 생성,  type="text"
	_renderValue.plugin["text"] = function(render, value, data, mapping) {
		var self = this;
		var rendered = '<input type="text" value="';
		rendered += ((value === undefined ? "" : value) + '" ');
		rendered += ('name="' + ((this.option.editableNameWithKey ? mapping.key : null) || _generateUniqueId()) + '" ');
		if (render.styleclass) {
			rendered += ('class="'+ render.styleclass+ '" ');
		}
		if(render.readonly) {
			rendered += (' disabled="disabled"');
		}
		var align = self.option.innerAlignForEditableText ? render.align : '';
		var aligntext = (align || render.textAlign) ? 
				('text-align:'+ (align || render.textAlign) + ';') : ''
		var styleoccured = false;
		if (typeof render.attr == "object") {	
			for ( var prop in render.attr) {
				if (prop == "style") {
					styleoccured = true;
					rendered += (prop + '="');
					if (render.attr[prop].toLowerCase().indexOf('width') < 0) {
						rendered += ('width:100%;');
					}
					rendered += (render.attr[prop] + aligntext + '" ');
				} else {
					rendered += (prop + '="' + render.attr[prop] + '" ');
				}
			}
		} 
		if(!styleoccured) {
			rendered += ('style="width:100%;'+aligntext+'"');
		}
		var irule = null;
		if (typeof render.rule === "string") {
			irule = render.rule.split(' ');
		} else if ($.isArray(render.rule)) {
			irule = render.rule;
		} else if ($.isFunction(render.rule)) {
			irule = render.rule(value, data, mapping);
		}
		if ($.isArray(irule)) {
			$.each(irule, function(idx, rule) {
				if (rule === "number") {//숫자만 입력 가능한 input
					rendered += (' onkeypress="AlopexGrid._renderNumberOnlyHandler(event);"');
				} else if (rule === "comma" || rule === "date" || rule === "month") {
					//comma : 3자리마다 쉼표를 넣기. number로 제한. extractor도 구현해야 함.
					//date : 2014-01-01. number로 제한
					//month : 2014-01. number로 제한. 
					rendered += (' onkeypress="if(AlopexGrid._renderNumberOnlyHandler(event)===false){return false;};return AlopexGrid._renderReplaceHandler(this,event,\'' + rule + '\');"');
				}
			});
		}
		rendered += ('/>');
		return rendered;//.join('');
	};
	_renderValue.plugin["select"] = function(render, value, data, mapping) {
		var rendered = '<select name="';
		var rules = render.rule;
		if (typeof rules == "function") {
			rules = rules(value, data, mapping);
		}
		rendered += (((this.option.editableNameWithKey ? mapping.key : null) || _generateUniqueId()) + '" ');

		if (render.styleclass) {
			rendered += ('class="'+ render.styleclass+ '" ');
		}
		if (typeof render.attr == "object") {
			for ( var prop in render.attr) {
				if (prop == "style") {
					rendered += (prop, '="');
					if (render.attr[prop].toLowerCase().indexOf('width') < 0) {
						rendered += ('width:100%;');
					}
					rendered += (render.attr[prop]+ '" ');
				} else {
					rendered += (prop+ '="'+ render.attr[prop]+ '" ');
				}
			}
		} else {
			rendered += ('style="width:100%;"');
		}

		if (render.readonly) {
			rendered += (' disabled="disabled"');
		}
		rendered += ('>');
		for ( var idx in rules) {
			var rule = rules[idx];
			rendered += ('<option value="'+ _ruleValue(rule, "value")+ '"');
			if (_ruleValue(rule, "value") == value) {
				rendered += (' selected="selected"');
			}
			rendered += ('>'+ (_ruleValue(rule, "text") || _ruleValue(rule, "value"))+ '</option>');
		}
		rendered += ('</select>');

		return rendered;//.join('');
	};
	_renderValue.plugin["radio"] = function(render, value, data, mapping) {
		var rendered = "";
		var name = (this.option.editableNameWithKey ? mapping.key : null) || _generateUniqueId();
		var rules = render.rule;
		if (typeof rules == "function") {
			rules = rules(value, data, mapping);
		}
		for ( var idx in rules) {
			var rule = rules[idx];
			rendered += ('<label ');
			if (typeof render.attr == "object") {
				for ( var prop in render.attr) {
					rendered += (prop+ '="'+ render.attr[prop]+ '" ');
				}
			}
			rendered += ('><input type="radio" name="'+ name+ '" value="'+ _ruleValue(rule, "value")+ '"');
			if (render.readonly) {
				rendered += (' disabled="disabled" ');
			}
			if (render.styleclass) {
				rendered += (' class="'+ render.styleclass+ '" ');
			}
			if (_ruleValue(rule, "value") == value) {
				rendered += (' checked="checked"');
			}
			rendered += ('/>'+ '<span>'+ (_ruleValue(rule, "text") || _ruleValue(rule, "value"))+ '</span>');
			rendered += ('</label>');
		}
		return rendered;//.join('');
	};
	_renderValue.plugin["check"] = function(render, value, data, mapping) {
		var rendered = "";
		var name = (this.option.editableNameWithKey ? mapping.key : null) || _generateUniqueId();
		var rules = render.rule;
		if (typeof rules == "function") {
			rules = rules(value, data, mapping);
		}
		rendered += ('<input type="checkbox" name="'+ name+ '"');
		if (render.styleclass) {
			rendered += (' class="'+ render.styleclass+ '" ');
		}
		if (typeof render.attr == "object") {
			for ( var prop in render.attr) {
				rendered += (prop+ '="'+ render.attr[prop]+ '" ');
			}
		}
		if (value === true || value === "true") {
			rendered += (' checked="checked"');
		}
		if ($.isArray(rules)) {
			for ( var idx in rules) {
				var rule = rules[idx];
				if (_ruleValue(rule, "value") === value && _ruleValue(rule, "check")) {
					rendered += (' checked="checked"');
					break;
				}
			}
		}
		if (render.readonly) {
			rendered += (' disabled="disabled"');
		}
		rendered += ('/>');
		return rendered;//.join('');
	};
	_renderValue.plugin["date"] = function(render, value, data, mapping) {
		var rendered = '<input type="text" data-type="dateinput" ';
		if (typeof render.attr == "object") {
			for ( var prop in render.attr) {
				if (prop == "style") {
					rendered += (prop+ '="');
					if (render.attr[prop].toLowerCase().indexOf('width') < 0) {
						rendered += ('width:100%;');
					}
					rendered += (render.attr[prop]+ '" ');
				} else {
					rendered += (prop+ '="'+ render.attr[prop]+ '" ');
				}
			}
		}
		var datestr = value.substr(0, 4) + '-' + value.substr(4, 2) + '-'
		+ value.substr(6, 2);
		rendered += (' value="' + ((value.length != 0) ? datestr : '') + '" ');
		rendered += ('/>');
		return rendered;
		// var str = rendered.join('');
		// return str;
	};

	var AlopexGrid = function(elem, option) {
		var self = this == window ? {} : this;
		var globalAlopexGrid = window["AlopexGrid"];
		var preloaded = $(elem).data(globalAlopexGrid.KEY_NAME);
		if (preloaded) {
			self.updateOption(option);
			return self;
		}

		var key = _generateUniqueId();
		self.key = key;
		self.eventns = '.'+self.key+'t'+(Math.random().toString().slice(-5).split('.').join(''));
		self.unique = _generateUniqueNumber();
		self.serial = AlopexGrid.serial++;
		self.state = {
				progressStack: 0,
				data: [],
				metaData : {},
				deletedData: [],
				rendered:[],
				renderTargetDataIndexList:[],
				_paddingDataLength:0,
				footerData : {}
		};
		//option extend
		self.option = $.extend(true, {}, globalAlopexGrid.defaultOption, globalAlopexGrid.commonOption);
		self.root = elem;
		self.$root = $(elem);

		//IE8에서 window.resize 무한루프 버그
		self.lastWindowHeight = $(window).height();
		self.lastWindowWidth = $(window).width();

		//마크업 생성
		self.viewInit();
		self.$title = this.$root.find('>.title');
		self.$pager = this.$root.find('>.pager');
		self.$pagerleft = self.$pager.find('.pagerleft');
		self.$pagerright = self.$pager.find('.pagerright');
		self.$wrapper = self.$root.find('.wrapper');
		self.$footer = self.$root.find('>.footer');
		self.$focusfixture = self.$root.find('.fixed-focus-catch');

		self.$scrollbarx = $('<div class="scrollbar x"></div>').appendTo(self.$wrapper);
		$('<div class="scrollbutton leftbutton">').appendTo(self.$scrollbarx);
		$('<div class="scrollbutton rightbutton">').appendTo(self.$scrollbarx);
		$('<div class="scrollhandle">').appendTo(self.$scrollbarx);
	
		self.$scrollbary = $('<div class="scrollbar y"></div>').appendTo(self.$wrapper);
		$('<div class="scrollbutton upbutton">').appendTo(self.$scrollbary);
		$('<div class="scrollbutton downbutton">').appendTo(self.$scrollbary);
		$('<div class="scrollhandle">').appendTo(self.$scrollbary);
		
		//List NodeList
		self.state.bodyCellList = self.$wrapper[0].getElementsByClassName('bodycell');
		self.state.nodataCell = self.$wrapper[0].getElementsByClassName('nodatacell');
		self.state.bodyFixedColumnCellList = self.$wrapper[0].getElementsByClassName('bodycell-fixcol');
		self.state.bodyPinnedCellList = self.$wrapper[0].getElementsByClassName('bodycell-pinned');
		self.state.bodyRowspanCellList = self.$wrapper[0].getElementsByClassName('cell-rowspan-column');
		self.state.bodyColspanCellList = self.$wrapper[0].getElementsByClassName('cell-colspan-column');
		self.state.headerCellList = self.$wrapper[0].getElementsByClassName('headercell');

		//옵션적용(updateOption)
		self.updateOption(option);
		if (self.option.pager && $.isPlainObject(self.option.paging) && $.isFunction(self.option.paging.pageSet)) {
			setTimeout(function() {
				self.pageSet(1);
			}, 0);
		}
		
		//jQuery에서 선택 가능하도록 data 생성.
		$(elem).data(globalAlopexGrid.KEY_NAME, self).attr("data-alopexgrid", key);
		self.state.loaded = true;
		globalAlopexGrid.instances[key] = self;
		//globalAlopexGrid.serialInstances[self.serial] = self;
		setTimeout(function(){self._triggerGridEvent('dataChanged',{"api":"init"})},0);
		return self;
	};
	$.extend(AlopexGrid, {
		KEY_NAME: _generateUniqueId(),
		//KEY_ROOT : ".positioner",
		serial : 0,
		instances: {},
		//serialInstances : {},
		i18n : function(key) {
			return AlopexGrid.i18nLocaleSet[AlopexGrid.locale][key];
		},
		locale : "ko",
		i18nLocaleSet : {
			"ko" : {
				"freezePanes" : "틀고정",
				"sum" : "합계"
			},
			"en" : {
				"freezePanes" : "Freeze Panes",
				"sum" : "Sum:"
			}
		},
		markup: {
//			tag: "div",
//			attr: {
//				styleclass: "alopexgrid positioner"
//			},
			child: [{
				tag: "div",
				attr: {
					styleclass: "title"
				}
			}, {
				tag: "div",
				attr: {
					styleclass: "wrapper",
					style: "width:100%;"
				},
				child: ""
			},
			{tag:"div",
				attr:{
					 "contentEditable":"true",
					 "style":"position:absolute;left:-1px;top:-1px;width:1px;height:1px;outline:none;padding:0;margin:0;border:none;overflow:hidden;",
					 "styleclass":"fixed-focus-catch focus"
				}},
			{
				tag: "div",
				attr: {
					styleclass: "footer",
					style: "position:relative;"
				},
				child: []
			},
			{
				tag: "div",
				attr: {
					styleclass: "pager",
					style: "position:relative;"
				},
				child: [{
					tag: "div",
					attr: {
						styleclass: "pagerleft",
						style: ""
					},
					child: ""
				}, {
					tag: "div",
					attr: {
						styleclass: "pagercenter"
					},
					child: [{
						tag: "div",
						attr: {
							styleclass: "pagination first-page",
							"data-to-page" : "first"
						}
					}, {
						tag: "div",
						attr: {
							styleclass: "pagination prev-page",
							"data-to-page" : "prev"
						}
					}, {
						tag: "ul",
						attr: {
							styleclass: "pagination page-list",
							"data-to-page" : "list"
						}
					}, {
						tag: "div",
						attr: {
							styleclass: "pagination next-page",
							"data-to-page" : "next"
						}
					}, {
						tag: "div",
						attr: {
							styleclass: "pagination last-page",
							"data-to-page" : "last"
						}
					}]
				}, {
					tag: "div",
					attr: {
						styleclass: "pagerright",
						style: ""
					},
					child: ""
				}]
			}]
		},
		markupTemplate: {
			colgroup: {
				tag: "colgroup"
			},
			col: {
				tag: "col"
			},
			row: {
				tag: "tr",
				attr: {
					styleclass: "row"
				}
			},
			cell: {
				tag: "td",
				attr: {
					styleclass: "cell"
				}
			},
			headerRow: {
				tag: "tr",
				attr: {
					styleclass: "row header"
				}
			},
			headerCell: {
				tag: "td",
				attr: {
					styleclass: "cell header"
				}
			}
		},
		defaultOption: {
			width: null,//600,
			height: null,
			header:true, //show header by default
			headerGroup : null,
			title: false,
			pager: false,
			data: [], //array
			dataLengthLimit : null,
			paging: {
				left: false,
				right: false
			}, //object
			defaultColumnMapping : {
				width : '100px' //무조건 120px의 너비를 가지고 시작하도록 한다.
			},
			columnMapping: [], //array
			rowOption : {}, //object
			footer : {
				position : null,
				footerMapping : []
			},
			on: {
				cell : {},
				row : {},
				headercell : {},
				headerrow : {},
				invalidEdit : null,
				scrollBottom : null,
				sortToggle : null,
				sortClear : null,
				pageSet : null,
				perPageChange : null,
				data:{
					"add"      : null,
					"set"      : null,
					"edit"     : null,
					"empty"    : null,
					"delete"   : null,
					"undelete" : null,
					"select"   : null,
					"selected" : null,
					"changed"  : null
				}
			},
			autoResize: true,
			autoResizeDelay : 200,
			
			message: {
				"nodata" : null,
				"dataLengthLimit" : null,
				"valueFilter" : null,
				"pagerTotal" : null
			},
			rowClickSelect: false,
			rowSingleSelect: false,
			rowInlineEdit : false,
			
			rowspanGroupSelect: true,
			rowspanGroupEdit: true,
			
			progressDelay: null,
			scrollBottomDelay: 50,
			numberingColumnFromZero:true,
			
			defaultState:{
				dataAdd:{},
				dataSet:{}
			}
			,eventMapping : {}
			,renderMapping : {}
			
			,valueFilter:null//filter value of grid data on endEdit
			,endInlineEditByOuterClick:false//end rowInlineEdit by clicking outside the grid.

			,mappingStyleclassToHeader:true
			,mappingStyleclassToBody:true

			,flushcallback : null


			,hideSortingHandle : false//hide header sorting arrow
			,disableHeaderClickSorting : false

			,getEditingDataOnEvent : true//get intermediate data if data._state.editing is true.
			,fitTableWidth : true//fit table width upto grid width
			,directEdit : false //edit cell with contenteditable, without <input> tag.
			,ellipsisText : false//show ... on overflowed text
			,autoSortingType : false//auto-detect sorting type when columnMapping.sorting:true

			,clientSortingOnDynamicDataSet : false//sort data even when dynamic binding is uses
			,disableFocusedState:false//disable data._state.focus state
			
			,editableNameWithKey : false//use mapping.key value as <input name=""> name attribute
			,parseNullValueCell : false//extract cell value on data init if value is null and it is editable. 
				//using default value for column is encouraged.
			,limitSelectorColumnClickArea : false //set true to allow row select iff checkbox in selector column has clicked.
			,mergeEditingImmediately:false //merge editing data and set edited flag right after editing value has changed
			,fullCompareForEditedState:false
			
			,grouping : {
				by : [],//['key1','key2','key3',...]
				useSummary:true,
				useGroupRowspan:false,
				useGrouping:false,
				useGroupRearrange : false,
				summaryRender:{
					'sum' : function(value){ return AlopexGrid.i18n("sum")+' : '+value; },
					'count' : function(value){ return '건수 : '+value; },
					'groupName' : function(value){ return value; },
					'average' : function(value){ return '평균 :'+value; }
				},
				foldShowLength : 1
			}
			,enableHeaderSelect : false
			,filteringHeader : false
			,filterTypeNameMap : {
				'equal' : '일치'
				,'notequal' : '불일치'
				,'contain' : '포함'
				,'notcontain' : '포함하지 않음'
				,'lt' : '보다 작은'
				,'lte' : '보다 작거나 같은'
				,'gt' : '보다 큰'
				,'gte' : '보다 크거나 같은'
			}

			,hidePinnedData : false //hinder pinned data from rendering
			,rowFixCount : 0

			,cellSelectable : false //focus,selection에 관여 
			,cellInlineEdit : false //keydown, mouse click에 의한 셀단위 편집시작/종료에 관여

			,enableDefaultContextMenu:true
			,enableContextMenu:true
			,defaultContextMenu : [
			   {
				   title : function(data, $cell, grid) {
					   return [AlopexGrid.i18n("freezePanes")];
				   },
				   processor : function(data, $cell, grid) {
					   var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
					   var mapping = grid.state.columnIndexToMapping[columnIndex];
						$.each(grid.option.columnMapping, function(i, m) {
						   m.fixed = m.columnIndex < columnIndex;
						});
						var count = data._index.rendered;
						grid.updateOption({rowFixCount:count});
				   },
				   use : function(data, $cell) {
					   return $cell.hasClass('bodycell') && !$cell.hasClass('summarycell');
				   }
			   },
			   {
				   title : function(data,$cell,grid){ 
					   return ['틀고정(행)'];
				   }, 
				   processor : function(d,$cell, grid){
					   
					   $.each(grid.option.columnMapping, function(i, mapping) {
						   mapping.fixed = false;
					   });
					   grid.updateOption();
					   
					   $(this).alopexGrid('rowFix', d._index.rendered, true);
				   }, 
				   use : function(data, $cell){
					   return /*!$cell.hasClass('pinnedcell') &&*/ $cell.hasClass('bodycell') && !$cell.hasClass('summarycell');
				   }
			   },
			   {
				   title : function(data,$cell,grid){ 
					   return '틀고정';
				   }, 
				   processor : function(d,$cell, grid) {
					   $(this).alopexGrid('dataUnpin');
					   var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
					   $.each(grid.option.columnMapping, function(i, mapping) {
						   mapping.fixed = mapping.columnIndex < columnIndex;
					   });
					   grid.updateOption();
				   },
				   use : function(data, $cell, grid) {
					   return $cell.hasClass('headercell') && $cell.attr('data-alopexgrid-columnindex');
				   }
			   },
			   {
				   title : '틀고정 취소',
				   processor : function(data, $cell, grid) {
					   $.each(grid.option.columnMapping, function(i, mapping) {
						   mapping.fixed = false;
					   });
					   grid.updateOption({rowFixCount:0});
				   },
				   use : function(data, $cell, grid) {
					   return true;
				   }
			   },
			   {
				   title : '이 위치에 행 삽입',
				   use : function(data, $cell, grid) {
					   return $cell.hasClass('bodycell') && $cell.attr('data-alopexgrid-renderedindex');
				   },
				   processor : function(data, $cell, grid) {
					   var emptyData = $.extend(true, {}, grid.state.emptyData);
					   var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
				   var dataIndex = data._index.data; //이 위치에 들어가면 됨.
				   if(data._meta) {
					   while(data._meta && data) {
						   data = grid._getRenderedDataFromRenderedIndex(--renderedIndex);
					   }
					   dataIndex = data._index.data+1;//위로 탐색을 했으므로 그 아래에 들어감.
				   }
				   if(!data) {
					   return;
				   }
				   if(grid.option.grouping && grid.option.grouping.by && grid.option.grouping.useGrouping) {
					   for(var i=0;i<grid.option.grouping.by.length;i++) {
						   var key = grid.option.grouping.by[i];
						   if(typeof key !== "string") continue;
								   emptyData[key] = data[key];
							   }
						   }
						   grid._showProgress(function(){
							   grid.dataAdd(emptyData, {_index:{data:dataIndex}});
						   },5);
				   }
			   },
			   {
				   title : '확대보기',
				   processor : function(data,$cell,grid) {
					   $grid = grid.$root;
					   // zoom 되어있는지 체크
					   if (grid.state.isZoomed) {
						   alert('확대보기 실행중입니다.');
						   return;
					   }
					   $window = $(window);
					   var $body = $(document.body);
					   var scrollTop = $window.scrollTop();
					   
					   var $gridparent = $grid.parent();
					   
					   var $blocker;
					   if ($('#blocker_' + grid.key).length > 0) {
						   $blocker = $('#blocker_' + grid.key);
						   $blocker.show();
					   } else {
						   $blocker = $('<div id="blocker_' + grid.key +'"></div>');
						   $blocker.css({
							   'overflow': 'hidden',
							   'display': 'block',
							   'z-index': '99998',
							   'position': 'absolute',
							   'left': '0',
							   'top': '0',
							   'width': '100%',
							   'height': '100%',
							   'background':'#FFFFFF'
						   });
						   $body.append($blocker);
					   }
					   
					   var $content, $button;
					   if ($('#content_' + grid.key).length > 0) {
						   $content = $('#content_' + grid.key);
						   $button = $content.find('button');
						   
						   $content.show();
					   } else {
						   $content = $('<div id="content_' + grid.key +'"></div>');
						   $content.css({
							   'display': 'block',
							   'z-index': '99999',
							   'position': 'absolute',
							   'left': '0',
							   'top': '0',
							   'width': '100%',
							   'height': '100%'
						   });
						   
						   $button = $('<a id="closebutton_' + grid.key +'">X</a>');
                           $button.css({
                               'position': 'relative',
                               'margin' : '5px',
                               'border': '1px solid #707070',
                               'width': '15px',
                               'height': '15px',
                               'display': 'inline-block',
                               'border-width': 'thin',
                               'border-radius': '3px',
                               'line-height': '15px',
                               'background-color': '#fff',
                               'cursor': 'pointer',
                               'text-align': 'center'
                           });
                           
						   $button.click(function() {
							   $body.css('overflow', '');
							   $blocker.hide();
							   $content.hide();
							   
							   $gridparent.append($grid);
							   grid.suppressRender(true);
							   grid.updateOption({
								   'height':gridHeight
							   });
							   grid.suppressRender(false);
							   grid.redraw();
							   grid.state._vspLastLeft = -1;
							   
							   $window.scrollTop(scrollTop);
							   grid.state.isZoomed= false;
						   });
						   $content.append($button);
						   $body.append($content)
					   }

					   var gridHeight = grid.option.height;
					   
					   $content.append($grid);
					   $body.css('overflow', 'hidden');
					   
					   $window.scrollTop(0);
					   grid.suppressRender(true);
					   grid.updateOption({
						   'height': ($window.height() - $grid.offset().top)
					   });
					   grid.suppressRender(false);
					   grid.redraw();
					   grid.state.isZoomed = true;
				   }
			   },
			   {
				   title : '필터제거',
				   processor : function(data,$cell,grid) {
					   grid.clearFilter(false);
				   },
				   use : function(data, $cell, grid) {
					   return $cell.hasClass('headercell') || $cell.hasClass('filtercell');
				   }
			   }
			]
			,contextMenu : [] //user added contextMenu
			,contextMenuTitleMapper : null

			,alwaysShowVerticalScrollBar : false
			,alwaysShowHorizontalScrollBar : false
			
			,allowSelectorColumnTitle:true

			,extendStateOnSet : true
			,extendStateOnAdd : true
			,fillUndefinedKey : false
			,forceEditedOnEdit : false
			,trimUnmappedKey : false
			,readonlyRender : true
			,disableCellTitle : false
			
			,disableValueEscape : false
			,defaultSortingOnDataSet : true
			,currentPageInCenter : false
			
			,innerAlignForEditableText:true
			,enableHeaderGroupResizing:true
			,evaluateAllowEditWithMergedData : true
			,setOriginalFromStart : false
			

		},
		getter: {},
		trimObject : function(dataObject) {
			var trimmed = $.extend({}, dataObject);
			delete trimmed._state;
			delete trimmed._index;
			delete trimmed._edited;
			delete trimmed._invalid;
			delete trimmed._key;
			delete trimmed._column;
			delete trimmed._original;
			return trimmed;
		},
		trimData: function(data) {
			if($.isArray(data)) {
				var trimmedlist = [];
				for(var i=0,l=data.length;i<l;i++) {
					if($.isPlainObject(data[i])) {
						trimmedlist.push(AlopexGrid.trimObject(data[i]));
					}
				}
				return trimmedlist;
			}
			return AlopexGrid.trimObject(data);
		},
		extractElement : function(elem) {
			if(!elem) return null;
			var fromElement = elem;
			if(elem.target && elem.target.nodeType && elem.hasOwnProperty('currentTarget') && elem.hasOwnProperty('type')) {
				fromElement = elem.target;
			} else if(elem.jquery && elem.length) {
				fromElement = elem[0];
			}
			var cell = null;
			var grid = null;
			do {
				if(String(fromElement.className).indexOf('alopexgrid-cell')>=0 && !cell) {
					cell = fromElement;
				}
				if(fromElement.getAttribute('data-alopexgrid') && !grid) {
					grid = $.data(fromElement, AlopexGrid.KEY_NAME);
				}
				if(cell && grid) {
					break;
				}

				fromElement = fromElement.parentNode;
			} while(fromElement);
			return {"cell":cell,"grid":grid,"$grid":grid.$root};
		},
		extractCell : function(elem) {
			return AlopexGrid.extractElement(elem)["cell"];
		},
		extractGrid : function(elem) {
			return AlopexGrid.extractElement(elem)["$grid"];
		},
		extractData : function(elem) {
			var el = AlopexGrid.extractElement(elem);
			var cell = el["cell"];
			var grid = el["grid"];
			if(!cell || !grid) {
				return null;
			}
			var dataId = cell.getAttribute('data-alopexgrid-dataid');
			var dataIndex = grid.state.dataIdToIndexMap[dataId];
			var data = grid.state.data[dataIndex] || {};
			if(data) {
				var columnIndex = cell.getAttribute('data-alopexgrid-columnindex');
				var key = cell.getAttribute('data-alopexgrid-key') || (_getMappingFromColumnIndex(grid, columnIndex)||{}).key;
				if(key !== undefined && key !== null && key) {
					data["_key"] = key;
				}
				if(columnIndex !== undefined && columnIndex !== null && !isNaN(parseInt(columnIndex))) {
					if(data && data._index) {
						data._index["column"] = parseInt(columnIndex);
					}
					data["_column"] = parseInt(columnIndex);
				}
			}
			return data || null;
		},
		currentData : function(data) {
			if(!data) return null;
			if(typeof data !== "object") return null;
			var self = AlopexGrid.instances[data._index.grid];
			var current = {};
			for(var key in data) {
				if(data.hasOwnProperty(key)) {
					if(key.indexOf('_') !== 0) {
						current[key] = data[key];
					}
				}
			}
			if(data._state.editing && data._state.recent) {
				for(var key in data._state.recent) {
					if(data._state.recent.hasOwnProperty(key)) {
						current[key] = data._state.recent[key];
					}
				}
			}
			if(self.state.editingCellInfo 
				&& self.state.editingCellInfo.hasOwnProperty("value")
				&& self.state.editingCellInfo["key"]) {
				var value = self.state.editingCellInfo["value"];
				var key = self.state.editingCellInfo["key"];
				targetData[key] = value;
			}
			return current;
		},
		extractCurrentData : function(elem) {
			return this.currentData(this.extractData(elem));
		},
		escapeHTML : function(str) {
			return _escapeHTML(str);
		},
		_renderNumberOnlyHandler: function(evt) {
			var e = evt || window.event;
			var key = e.keyCode || e.which;
			key = String.fromCharCode(key);
			var regex = /[0-9]|\./;
			if (!regex.test(key)) {
				e.returnValue = false;
				if (e.preventDefault)
					e.preventDefault();
				return false;
			}
		},
		_renderReplaceHandler: function(context, evt, formatter) {
			var self = context;
			var val = self.value;
			evt = evt || window.event;
			// Ensure we only handle printable keys, excluding enter and space
			var charCode = typeof evt.which == "number" ? evt.which : evt.keyCode;
			if (charCode && charCode > 32) {
				var keyChar = String.fromCharCode(charCode);

				var start, end;
				if (typeof self.selectionStart == "number" && typeof self.selectionEnd == "number") {
					// Non-IE browsers and IE 9
					start = self.selectionStart;
					end = self.selectionEnd;
					val = val.slice(0, start) + keyChar + val.slice(end);
					self.value = AlopexGrid["_" + formatter + "Formatter"](val);

					// Move the caret
					self.selectionStart = self.selectionEnd = start + 1 + (val.length !== self.value.length ? (self.value.length - val.length) : 0);
				} else if (document.selection && document.selection.createRange) {
					// For IE up to version 8
					var selectionRange = document.selection.createRange();
					var textInputRange = self.createTextRange();
					var precedingRange = self.createTextRange();
					var bookmark = selectionRange.getBookmark();
					textInputRange.moveToBookmark(bookmark);
					precedingRange.setEndPoint("EndToStart", textInputRange);
					start = precedingRange.text.length;
					end = start + selectionRange.text.length;

					val = val.slice(0, start) + keyChar + val.slice(end);
					self.value = AlopexGrid["_" + formatter + "Formatter"](val);
					start++;
					start += (val.length !== self.value.length ? (self.value.length - val.length) : 0);

					// Move the caret
					textInputRange = self.createTextRange();
					textInputRange.collapse(true);
					textInputRange.move("character", start - (self.value.slice(0, start).split("\r\n").length - 1));
					textInputRange.select();
				}

				return false;
			}
		},
		"_commaFormatter": function(str) {
			str = str.replace(/,/g, '');
			while (/(\d+)(\d{3})/.test(str.toString())) {
				str = str.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
			}
			return str;
		},
		"_dateFormatter": function(str) {
			return str;
		},
		"_monthFormatter": function(str) {
			return str;
		},
		dragObject: null,
		clipboard : {},
		generateKey: _generateUniqueId
	});
	window["AlopexGrid"] = AlopexGrid;

	// AlopexGrid.run("alopexgrid28175988", "dataAdd", {});
	AlopexGrid.run = function(id, api) {
		var instance = AlopexGrid.instances[id];
		if (!instance) {
			return;
		}
		var args = Array.prototype.slice.call(arguments, 2);
		return instance[api].apply(instance, args);
	};
	AlopexGrid.prototype.readOption = function(){
		return $.extend(true, {}, this.option);
	};

	AlopexGrid.prototype.updateOption = function(data) {
		var self = this;
		var option = self.option = $.extend(true, {}, self.option, data ? data : {});
		var $wrapper = self.$wrapper;
		var $pager = self.$pager;
		var $title = self.$title;
		var $r = self.$root;

		if($.isPlainObject(data) && (data.rowPadding || data.rowpadding)){
			self.option.rowPadding = data.rowPadding || data.rowpadding;
		}

		var headerProps = ['columnMapping', 'headerGroup'];//merge가 아닌, overwrite해야 하는 대상.
		$.each(headerProps, function(idx, prop) {
			if (data && data.hasOwnProperty(prop)) {
				option[prop] = $.extend(true, [], data[prop]);
			}
		});
		if(data && data.hasOwnProperty('footer')) {
			option.footer = $.extend({}, option.footer, data.footer);
		}
		if (self.option.columnMapping) {
			self.state.mappedKey = [];
			self.state.columnIndexToKeyMap = {};
			self.state.columnKeyToIndexMap = {};
			self.state.columnIndexToMapping = {};
			$.each(self.option.columnMapping, function(idx, mapping) {
				if(mapping.hasOwnProperty('key')) { 
					self.state.mappedKey.push(mapping.key);
					self.state.columnKeyToIndexMap[mapping.key] = parseInt(mapping.columnIndex);
				}
				if(mapping.hasOwnProperty('columnIndex')) {
					self.state.columnIndexToKeyMap[mapping.columnIndex] = String(mapping.key);
					self.state.columnIndexToMapping[mapping.columnIndex] = mapping;
				}
			});

			self.option.columnMapping.sort(function(former, latter) {
				var fi = _valid(former.columnIndex) ? Number(former.columnIndex) : Infinity;
				var li = _valid(latter.columnIndex) ? Number(latter.columnIndex) : Infinity;
				if (fi > li)
					return 1;
				if (fi < li)
					return -1;
				return 0;
			});

			var fixupto = -1;
			var fixedColumnWidth = 0;
			var fixedColumnMapping = [];
			$.each(self.option.columnMapping, function(idx, mapping) {
				if (mapping.columnIndex === null || mapping.columnIndex === undefined || mapping.hidden === true) {
					return;
				}
				if (mapping.fixed) {
					fixupto = mapping.columnIndex;
					fixedColumnWidth += parseInt(mapping.width);
					fixedColumnMapping.push(mapping);
				} else {
					return false;
				}
			});
			self.state.fixupto = fixupto;
			self.state.fixedColumnWidth = fixedColumnWidth;
			self.state.fixedColumnMapping = fixedColumnMapping;
			
			var maxColumnIndex = -1;
			var minColumnIndex = Number.POSITIVE_INFINITY;
			self.state.hasNumberingColumn = false;
			self.state.hasSelectorColumn = false;
			self.state.hasRowindexColumn = false;
			self.state.hasAllowEdit = false;
			self.state.dataCompositorMap = [];
			self.state.dataKeyList = [];
			self.state.hasColspan = false;
			
			//[mapping, mapping, ...]
			self.state.visibleColumnMappingList = [];
			//{columnIndex : visibleIndex, ...}
			self.state.visibleIndexMapByColumnIndex = {};
			//{key : visibleIndex, ...}
			self.state.visibleIndexMapByKey = {};
			
			var hasLeftColspan = false;
			self.state.hasLeftColspanMapByColumnIndex = {};
			
			$.each(self.option.columnMapping, function(idx, mapping) {
				if (mapping.hasOwnProperty('columnIndex')) {
					maxColumnIndex = Math.max(maxColumnIndex, mapping.columnIndex || 0)
					minColumnIndex = Math.min(minColumnIndex, mapping.columnIndex);
				}
				if(mapping.hasOwnProperty('key')) {
					self.state.dataKeyList.push(mapping.key);
					if(mapping.hasOwnProperty('value') && _valid(mapping.key) && _valid(mapping.value)) {
						self.state.dataCompositorMap.push(mapping);
					}
				}

				if(mapping.colspan || mapping.colspanTo) {
					self.state.hasColspan = true;
					hasLeftColspan = true;
				}
				
				if(mapping && isMappingVisible(mapping)) {
					self.state.visibleColumnMappingList.push(mapping);
					self.state.hasLeftColspanMapByColumnIndex[mapping.columnIndex] = hasLeftColspan;
				}
				

				if (mapping.numberingColumn) {
					self.state.hasNumberingColumn = true;
				}
				if (mapping.selectorColumn) {
					self.state.hasSelectorColumn = true;
				}
				if(mapping.rowindexColumn) {
					self.state.hasRowindexColumn = true;
				}
				if (mapping.allowEdit) {
					self.state.hasAllowEdit = true;
				}
				if($.isPlainObject(self.option.defaultColumnMapping)) {
					$.each(self.option.defaultColumnMapping, function(k,v){
						if(!mapping.hasOwnProperty(k)) {
							mapping[k] = v;
						}
					});
				}
			});
			
			var visibleWidth = 0;
			$.each(self.state.visibleColumnMappingList, function(visibleIndex, mapping){
				self.state.visibleIndexMapByColumnIndex[mapping.columnIndex] = visibleIndex;
				self.state.visibleIndexMapByKey[mapping.key] = visibleIndex;
				visibleWidth += parseInt(mapping.width);
			});

			self.state.visibleColumnCount = self.state.visibleColumnMappingList.length;
			self.state.visibleTableWidth = visibleWidth;
			
//			self.state.columnWidthMap = self._calcCellWidth();
			self._calcCellWidth();

			self.state.emptyData = {
					"_index" : {}, "_state" : {}
			};
			for(var j in self.state.dataKeyList) {
				var k = self.state.dataKeyList[j];
				self.state.emptyData[k] = "";
			}
			self.state.dataCompositor = null;
			if(self.state.dataCompositorMap.length) { 
				//var functionString = "";
				//self.state.dataCompositor = new Function('self','data', functionString);
				self.state.dataCompositor = function(self, data){
					for(var j in self.state.dataCompositorMap) {
						var mapping = self.state.dataCompositorMap[j];
						data[mapping.key] = $.isFunction(mapping.value) ? mapping.value(data[mapping.key], data, mapping) : mapping.value;
						if(data._state && data._state.editing && data._state.recent && data._state.recent.hasOwnProperty(mapping.key)) {
							data._state.recent[mapping.key] = data[mapping.key];
						}
					}
					return data;
				};
			}
			//defaultValue가 존재할 경우 && fillUndefinedKey가 있을 경우
			var needFiller = (self.option.fillUndefinedKey !== false) ||
			!!$.map(self.option.columnMapping, function(m){return m.defaultValue;}).length;
			//option check.
			var needTrimmer = self.option.trimUnmappedKey;
			self.state.dataFilltrimmer = null;
			if(needTrimmer || needFiller) {
				self.state.dataFilltrimmer = function(self, data) {
					if(needFiller) {
						for(var j in self.option.columnMapping) {
							var mapping = self.option.columnMapping[j];
							if(_valid(mapping.key) && !data.hasOwnProperty(mapping.key) &&
									(self.option.fillUndefinedKey !== false || mapping.defaultValue !== undefined)) {
								data[mapping.key] =
									($.isFunction(mapping.defaultValue) ? mapping.defaultValue(data) : mapping.defaultValue)
									|| (self.option.fillUndefinedKey === true ? "" : self.option.fillUndefinedKey);
							}
						}	
					}
					if(needTrimmer) {
						//self.state.mappedKey = [columnmapping에 처리된 key들의 목록]
						for(var prop in data) {
							if(!data.hasOwnProperty(prop) || prop == "_state" || prop == "_index"
								|| prop == "_key" || prop == "_edited") continue;
							if($.inArray(prop, self.state.mappedKey) < 0) {
								delete data[prop];
							}
						}
					}
				};
			}
			self.state.maxColumnIndex = maxColumnIndex;
		}

		self.state.rowHeightMapByDataId = self.state.rowHeightMapByDataId || {};
		
		if ($.isArray(this.option.data)) {
			this.dataSet(this.option.data, true);
			this.option.data = null;
		}
		
		if(self.option.cellSelectable || self.option.enableheaderSelect || self.state.hasRowindexColumn) {
			self.$wrapper.addClass('text-selection-disabled').attr('unselectable', 'on');
		} else {
			self.$wrapper.removeClass('text-selection-disabled').removeAttr('unselectable');
		}

		if(self.option.cellInlineEdit) {
			self.option.rowInlineEdit = false;
		}

		self.state.testRowAllowSelect = !!(self.option.rowOption && $.isFunction(self.option.rowOption.allowSelect))
		if(self.state.renderingSuppressed) {
			return;
		}
		clearSelectedHeader(self);
		clearCellSelection(self)
		self.pageInfo();
		//TODO calcAndRedraw / redraw 호출 조건을 찾아야 함(효율성문제).
		self.calcAndRedraw();
		self.viewEventUpdate();
	};
	//columnIndex may be real index or column key
	AlopexGrid.prototype.updateColumnMapping = function(columnIK, userMapping, dorecursive){
		if(!_valid(columnIK) || !_valid(userMapping)) return;
		if(!$.isPlainObject(userMapping) || $.isEmptyObject(userMapping)) return;
		var self = this;
		var option = self.option;
		if($.isArray(columnIK)) {
			$.each(columnIK, function(idx, columnIKV){
				self.updateColumnMapping(columnIKV, userMapping, true);
			});
			self.updateOption();
			return;
		}
		var columnMapping = option.columnMapping;
		$.each(columnMapping, function(idx, mapping) {
			if(Number(mapping.columnIndex)===Number(columnIK)
					|| (typeof mapping.key === "string" && mapping.key === columnIK) ) {
				$.each(userMapping, function(key, value) {
					if(value === null) {
						delete mapping[key];
					} else {
						mapping[key] = value;
					}
				});
			}
		});
		if(dorecursive) return;
		self.updateOption();
	};

	function _readMappingProp(mapping, prop) {
		return $.isFunction(mapping[prop]) ? mapping[prop](mapping) : mapping[prop];
	}
	AlopexGrid.prototype._processSortingMulti = function(sortingMulti){
		var self = this;
		if(!$.isArray(sortingMulti)) return;
		self.state.sortingMulti = [];
		$.each(sortingMulti, function(i,sortingMultiItem){
			if(!$.isPlainObject(sortingMultiItem)) { return; }
			if(sortingMultiItem.hasOwnProperty('sortingColumn') || sortingMultiItem.hasOwnProperty('sortingKey')) {
				self.state.sortingMulti.push($.extend({},sortingMultiItem));
			}
		});
	};
	AlopexGrid.prototype._processDefaultSorting = function() {
		var self = this;
		delete self.state.sortingColumn;
		delete self.state.sortingDirection;
		delete self.state.sortingMulti;
		for ( var i in self.option.columnMapping) {
			var mapping = self.option.columnMapping[i];
			var sorting = mapping.sorting;
			if(sorting) {
				if (self.option.defaultSorting) {
					if (Number(mapping.columnIndex) === self.option.defaultSorting.sortingColumn) {
						self.state.sortingColumn = mapping.columnIndex;
						self.state.sortingDirection = self.option.defaultSorting.sortingDirection || 'asc';
					}
				}
			}
		}
		if($.isPlainObject(self.option.defaultSorting) 
				&& $.isArray(self.option.defaultSorting.sortingMulti)) {
			self._processSortingMulti(self.option.defaultSorting.sortingMulti);
		}
	};
	AlopexGrid.prototype.viewInit = function(data) {
		var self = this;
		if(!self.option.defaultSortingOnDataSet) {
			self._processDefaultSorting();
		}
		$(self.root).addClass('alopexgrid positioner')
			.html(_generateHTML(AlopexGrid.markup));
	};

	AlopexGrid.prototype.viewUpdate = function(viewoption) {
		var self = this;
		var $r = self.$root;
		var gridOption = self.option;
		var gridState = self.state;
		var $title = self.$title;
		var $pager = self.$pager;
		var $wrapper = self.$wrapper;
		var tableheaderHeight = 0;

		if(gridState.renderingSuppressed) {
			return;
		}

		//TODO new logic
		$title[gridOption.title ? "show" : "hide"]();
		if(gridOption.title) {
			var titleString = gridOption.title;
			if(typeof titleString === "function") {
				titleString = titleString.call(self);
			}
			if(titleString) {
				$title.html(titleString);	
			}
		}
		self.$footer[self._hasFooter('bottom') ? "show" : "hide"]();
		$pager[gridOption.pager ? "show" : "hide"]();

		self._calcCellWidth();
		var visibleTableWidth = 0;
		$.each(self.state.visibleColumnMappingList, function(visibleIndex, mapping){
			visibleTableWidth += parseInt(mapping.width);
		});

		//기본 헤더셀/바디셀 행높이를 계산한다. 이 계산값을 토대로 dataDraw는 행을 그리게 된다.
		//custom row height를 가지고 있는 행은 그 높이를, 그 외의 행은 기본 높이를 가지고 렌더링을 한다.
		var $tempgrid = $('<div class="alopexgrid positioner"><div class="wrapper"></div></div>');

		var $tempBodyCell = $('<div class="cell bodycell" style="top:-999px;left:-999px;">&nbsp;</div>');
		var $tempHeaderCell = $('<div class="cell headercell" style="top:-999px;left:-999px;">&nbsp;</div>');
		if(self.$root.is(':visible')) {
			self.$wrapper.append($tempBodyCell, $tempHeaderCell);
		} else {
			$tempgrid.css('position','absolute')
				.css('top','-9999px')
				.css('left','-9999px')
				.appendTo(document.body);
			$tempgrid.children().append($tempBodyCell, $tempHeaderCell);
		}
		//높이는 border를 포함한 실제 차지 영역으로 정의한다.
		gridState.rowHeight = $tempBodyCell.outerHeight();
		gridState.rowContentHeight = $tempBodyCell.height();
		gridState.headerRowHeight = $tempHeaderCell.outerHeight();
		gridState.headerRowContentHeight = $tempHeaderCell.height();
		
		//일반셀, colspan cell등을 계산할 때 목표너비/높이에서 이 값을 뺀 만큼으로 셀에 width를 주어야 의도한 px값을 가져올 수 있다.
		gridState.cellUpdownBorderWidth = gridState.rowHeight - gridState.rowContentHeight;
		gridState.cellSideBorderWidth = $tempBodyCell.outerWidth() - $tempBodyCell.width();

		gridState.headerCellSideBorderWidth = $tempHeaderCell.outerWidth() - $tempHeaderCell.width();
		gridState.headerCellUpdownBorderWidth = gridState.headerRowHeight - gridState.headerRowContentHeight;

		$tempBodyCell.remove();
		$tempHeaderCell.remove();

		$tempgrid.remove();

		var hasWrapperInlineHeight = false;

		if(gridOption.height && !isNaN(Number(gridOption.height))) {
			hasWrapperInlineHeight = true;
			//숫자일 때에만.
			self.$root.css('overflow-y','');
			var rootHeight = parseInt(gridOption.height);
			var titleHeight = self.option.title ? self.$title.outerHeight(true) : 0;
			var pagerHeight = self.option.pager ? self.$pager.outerHeight(true) : 0;
			var wrapperHeight = rootHeight 
				- (self.$wrapper.outerHeight() - self.$wrapper.height()) 
				- pagerHeight - titleHeight;
			// if(typeof gridOption.height === "string" && gridOption.height.toLowerCase().indexOf('row')>=0) {
			// 	//TODO option.height = "rowPadding"
			// 	wrapperHeight = self.state.rowHeight * rootHeight;
			// 	rootHeight = wrapperHeight + pagerHeight + titleHeight
			// 		+ (self.$wrapper.prop('offsetHeight') - self.$wrapper.prop('clientHeight'));
			// }
			self.$root.css("height", rootHeight + 'px');
			self.$wrapper.css("height",wrapperHeight + 'px');
		} else {
			self.$root.css('overflow-y','visible');
			self.$root.css('height','');
			self.$wrapper.css('height','');
		}

		if(gridOption.height && typeof gridOption.height === "string" && isNaN(Number(gridOption.height))) {
    		//height = "10row"
    		if(gridOption.height.indexOf('row')>=0) {
    			var rowcount = parseInt(gridOption.height.split('row')[0]);
    			if(gridOption.height.toLowerCase() === "rowpadding" && self.option.rowPadding) {
    				rowcount = self.option.rowPadding;
    			}
    			if(rowcount) {
	    			var wrapperInlineHeight = parseInt(self.state.headerHeight + self.state.rowHeight*rowcount);
	    			self.$wrapper.css("height", (wrapperInlineHeight + self.state.scrollbarxHeight) + 'px');
	    			hasWrapperInlineHeight = true;
    			}
    		}
    	}

		if(gridOption.width) {
			self.$root.css('width', gridOption.width + 'px');
		} else {
			self.$root.css('width', '');
		}

		//스크롤바가 움직일 수 있는 바운더리. 스크롤바는 자신의 높이와 위치를 감안하여 이 안에서 움직여야 한다.
		var scrollbarUpButton = self.$scrollbary.find('.upbutton');
		var scrollbarDownButton = self.$scrollbary.find('.downbutton');
		var scrollbarLeftButton = self.$scrollbarx.find('.leftbutton');
		var scrollbarRightButton = self.$scrollbarx.find('.rightbutton');

		var hasVerticalScrollbar = false;
		var hasHorizontalScrollbar = false;

		if(self.option.alwaysShowVerticalScrollBar) {
			self.$scrollbary.css({'width':'','overflow':''});
			scrollbarRightButton.css('right','');
			hasVerticalScrollbar = true;
		} else {
			if(!gridOption.height) {
				self.$scrollbary.css({'width':'0px','overflow':'hidden'});
				scrollbarRightButton.css('right','0px');
			} else {
				self.$scrollbary.css({'width':'','overflow':''});
				scrollbarRightButton.css('right','');
				hasVerticalScrollbar = true;
			}
		}

		self.state.scrollbaryWidth = self.$scrollbary.outerWidth();

		//셀이 렌더링되어야 하는 영역의 너비와 높이의 px값
		self.state.wrapperWidth = Math.round(self.$wrapper.width() - self.state.scrollbaryWidth);

		if(self.option.alwaysShowHorizontalScrollBar) {
			self.$scrollbarx.css({'height':'','overflow':''});
			scrollbarDownButton.css('bottom','');
			hasHorizontalScrollbar = true;
		} else {
			if(visibleTableWidth < self.state.wrapperWidth) {
				self.$scrollbarx.css({'height':'0px','overflow':'hidden'});
				scrollbarDownButton.css('bottom','0px');
			} else {
				self.$scrollbarx.css({'height':'','overflow':'hidden'});
				scrollbarDownButton.css('bottom','');
				hasHorizontalScrollbar = true;
			}
		}

		self.state.hasHorizontalScrollbar = hasHorizontalScrollbar;
		self.state.hasVerticalScrollbar = hasVerticalScrollbar;

		self.state.scrollbaryTrackTop = parseInt(scrollbarUpButton.position().top + scrollbarUpButton.outerHeight());
		self.state.scrollbaryTrackBottom = parseInt(scrollbarDownButton.position().top);
		self.state.scrollbaryTrackLength = parseInt(self.state.scrollbaryTrackBottom - self.state.scrollbaryTrackTop)+1;

		self.state.scrollbarxTrackLeft = parseInt(scrollbarLeftButton.position().left + scrollbarLeftButton.outerWidth());
		self.state.scrollbarxTrackRight = parseInt(scrollbarRightButton.position().left);
		self.state.scrollbarxTrackLength = parseInt(self.state.scrollbarxTrackRight - self.state.scrollbarxTrackLeft)+1;
		self.state.scrollbarxHeight = self.$scrollbarx.outerHeight();

		self.state.wrapperHeight = hasWrapperInlineHeight ? 
			Math.round(self.$wrapper.height() - self.state.scrollbarxHeight) :
			Number.POSITIVE_INFINITY;

    	//DO SCROLL REPOSITIONING
		self._setScrollInfo();
		
		var forceRefresh = true;
		if(viewoption && viewoption["viewOnly"]===true) {
			forceRefresh = false;
		}
    	self._refreshBoard(forceRefresh);

    	if(!gridOption.height) {
    		//렌더링 내용이 결정된 후에.
    		self.state.wrapperHeight = ((self.state.headerHeight||0) + (self.state.bodyHeight||0));
    		self.$wrapper.css("height", (self.state.wrapperHeight + self.state.scrollbarxHeight) + 'px');
    		hasWrapperInlineHeight = true;
    	}
	};
	
	function renderlog(){
		console.error.apply(console, arguments);
	}

	//wrapper안의 셀을 제 위치에 맞게 렌더링하는 역할
	//스크롤바의 높이/너비를 데이터에 맞게 조절한다
	//wrapper의 높이와 너비에 맞게 렌더링 대상 데이터를 맞춰서 그린다.(state.wrapperWidth, state.wrapperHeight)
	//스크롤바에 의해 결정된 state.renderFromRenderedIndex와 state.renderFromColumnIndex로부터 스크롤영역을 맞춘다.
	//bottom, right에 스크롤이 도달하였다면 기준을 오른쪽으로 맞춘다. 또는 마지막까지 그리고 다들 left, top으로 조금씩 밀어서 렌더링한다.
	//self.state.scrollxEnd, self.state.scrollyEnd는 x축과 y축의 가장 마지막으로 스크롤되었음을 의미하는 boolean값.
	AlopexGrid.prototype._refreshHeaderCells = function(forceRefresh){
		var self = this;
		var headerCellList = self.state.headerCellList;
		
		var visibleMappingList = self.state.visibleColumnMappingList;
		var visibleMappingLength = self.state.visibleColumnCount;
		var visibleIndexMapByColumnIndex = self.state.visibleIndexMapByColumnIndex;
		var headerStackMapByColumnIndex = {};
		var globalHideSubTitle = false;
		var fixUpto = self.state.fixupto;
		
		forceRefresh = (forceRefresh === true);
		
		if(forceRefresh===true) {
			delete self.state.refreshheadercell;
		}
		self.state.refreshheadercell = self.state.refreshheadercell || {};
		
		var renderFrom = self.state.renderFromColumnIndex || 0;
		var prevRenderFrom = self.state.refreshheadercell.prevRenderFrom;
		var renderTo = renderFrom;
		var wrapperWidth = self.state.wrapperWidth;
		var isScrollEnd = self.state.scrollxEnd;
		
		
		var visibleWidth = 0;
		var renderTargetMapping = [];
		var fixedRenderTargetMapping = [];
		var mappingSkip = 0;
		
		if(self.option.header===false) {
			self.state.headerHeight = 0;
			var cells = [];
			var l = headerCellList.length || 0;
			for(var i=0;i<l;i++) {
				cells.push(headerCellList[i]);
			}
			l = cells.length;
			for(var i=0;i<l;i++) {
				var cell = cells[i];
				if(cell.parentNode) {
					cell.parentNode.removeChild(cell);
				}
			}
			return;
		}
		
		//사전 렌더링대상 계산 프로세스
		for(var i=0,l=self.option.columnMapping.length;i<l;i++) {
			var mapping = self.option.columnMapping[i];
			if(!mapping || !(parseInt(mapping.columnIndex) >= 0) || mapping.hidden===true) {
				continue;
			}
			if(mapping.columnIndex <= self.state.fixupto) {
				visibleWidth += parseInt(mapping.width);
				renderTargetMapping.push(mapping);
				fixedRenderTargetMapping.push(mapping);
				if(mapping.columnIndex < renderFrom) {
					mappingSkip++;
				}
			}
			else if(mapping.columnIndex >= renderFrom) {
				if(mappingSkip) {
					mappingSkip--;
				} else {
					visibleWidth += parseInt(mapping.width);
					renderTargetMapping.push(mapping);	
				}
			}
			if(visibleWidth > self.state.wrapperWidth && !isScrollEnd) {
				break;
			}
		}
		renderTo = (renderTargetMapping[Math.max(renderTargetMapping.length-1,0)]||{}).columnIndex;
		
		var fitRatio = 1;
		if(visibleWidth <= self.state.wrapperWidth) {
			isScrollEnd = false;
		}

		if(visibleWidth && self.option.fitTableWidth && visibleWidth < self.state.wrapperWidth) {
			fitRatio = self.state.wrapperWidth / visibleWidth;
		}

		if(!forceRefresh && self.option.fitTableWidth && fitRatio !== self.state.refreshheadercell.fitRatio) {
			forceRefresh = true;
		}

		var endxOffset =  - (isScrollEnd ? (visibleWidth - self.state.wrapperWidth):0);
		
		var posxList = [0];
		var posxMapByColumnIndex = {};
		var renderTargetColumnIndexMap = {};
		for(var x=0,xl=renderTargetMapping.length;x<xl;x++) {
			var mapping = renderTargetMapping[x];
			renderTargetColumnIndexMap[mapping.columnIndex] = true;
			var lastx = posxList[posxList.length-1];
			posxMapByColumnIndex[mapping.columnIndex] = lastx;
			var posx = lastx + parseInt(mapping.width)*fitRatio;
			posxList.push(posx);
		}
		
		var behindFixedColumnMap = {};
		for(var ci=renderFrom;ci<=renderTo;ci++) {
			if(self.state.columnIndexToMapping[ci] && !renderTargetColumnIndexMap[ci]) {
				behindFixedColumnMap[ci] = true;
			}
		}
		
		var lastx = 0;
		var posxList = [0];
		var posxMap = {};
		for(var x=0,xl=renderTargetMapping.length;x<xl;x++) {
			var mapping = renderTargetMapping[x];
			var prev = posxList[posxList.length-1];
			posxMap[mapping.columnIndex] = prev;
			posxList.push(prev+parseInt(mapping.width));
		}
		
		//헤더 스택 생성 시작. 원래 렌더링 대상인 스택을 모두 계산한다.
		for(var vi=0,vl=visibleMappingList.length;vi<vl;vi++) {
			var mapping = visibleMappingList[vi];
			
			var renderConfig = {};
			renderConfig["mapping"] = mapping;
			renderConfig["columnIndex"] = mapping.columnIndex;
			renderConfig["visibleIndex"] = vi;
			renderConfig["isGroup"] = false;
			
			headerStackMapByColumnIndex[mapping.columnIndex] = [renderConfig];//스택 최초생성
		}
		
		//헤더그룹 처리. 전체 렌더링 대상인 헤더그룹을 모두 만들어야 헤더의 총 depth를 알 수 있다.
		if(self.option.headerGroup && self.option.headerGroup.length) {
			for(var i=self.option.headerGroup.length-1;i>=0;i--) {
				var groupObject = self.option.headerGroup[i];
				if(!groupObject) continue;
				if(parseInt(groupObject["fromIndex"])>=0 && parseInt(groupObject["toIndex"])>=0) {
					var renderConfig = {};
					renderConfig["mapping"] = $.extend(true, {}, groupObject);
					renderConfig["columnIndex"] = groupObject["fromIndex"];
					renderConfig["toColumnIndex"] = groupObject["toIndex"];
					renderConfig["visibleIndex"] = visibleIndexMapByColumnIndex[groupObject["fromIndex"]];
					renderConfig["isGroup"] = true;
					renderConfig["colspan"] = 0;
					if(self.option.enableHeaderGroupResizing === true) {
						var resizing = [];
						for(var j=groupObject["fromIndex"];j<=groupObject["toIndex"];j++) {
							var m = self.state.columnIndexToMapping[j];
							if(!m || !(m.columnIndex>=0) || m.hidden===true) continue;
							if(m.resizing) {
								resizing.push(m.columnIndex);
							}
						}
						if(resizing.length) {
							renderConfig["mapping"].resizing = resizing;
						}
					}
					//나중에 분배된 object중 실제 렌더링 대상을 추려낸 후 나머지는 지워버려야 한다.
					for(var j=groupObject["fromIndex"];j<=groupObject["toIndex"];j++) {
						var m = self.state.columnIndexToMapping[j];
						if(!m || !(m.columnIndex>=0) || m.hidden===true) continue;
						renderConfig["colspan"] += 1
						if(groupObject["hideSubTitle"] === true) {
							headerStackMapByColumnIndex[m.columnIndex] = [];
						}
						headerStackMapByColumnIndex[m.columnIndex].unshift(renderConfig);
					}
				} else if(groupObject["hideSubTitle"] === true) {
					globalHideSubTitle = true;
				}
			}
		}
		
		var columnHeaderDepth = 0;
		
		for(var i in headerStackMapByColumnIndex) {
			var stack = headerStackMapByColumnIndex[i];
			if(globalHideSubTitle) {
				stack.splice(1, stack.length-1);
			}
			columnHeaderDepth = Math.max(stack.length, columnHeaderDepth);
		}
		for(var i in headerStackMapByColumnIndex) {
			var stack = headerStackMapByColumnIndex[i];
			for(var j=0,jl=stack.length-1;j<jl;j++) {
				var renderConfig = stack[j];
				if(renderConfig.mapping && renderConfig.mapping.resizing) {
					renderConfig["disableResizing"] = true;
				}
			}
			if(stack.length < columnHeaderDepth) {
				var lastItem = stack[stack.length-1];
				lastItem["rowspan"] = columnHeaderDepth - stack.length + 1;
				for(var j=1;j<lastItem["rowspan"];j++) {
					stack.push(null);
				}
			}
		}
		
		if(self.option.filteringHeader) {
			for(var i in headerStackMapByColumnIndex) {
				var stack = headerStackMapByColumnIndex[i];
				var renderConfig = {"filter":true,"columnIndex":parseInt(i)};
				stack.push(renderConfig);
			}
			columnHeaderDepth += 1;
		}
		
		
		for(var i=0,l=renderTargetMapping.length;i<l;i++) {
			var mapping = renderTargetMapping[i];
			var stack = headerStackMapByColumnIndex[mapping.columnIndex];
			for(var depth=0,dl = stack.length;depth<dl;depth++) {
				var renderConfig = stack[depth];
				if(!renderConfig) continue;
				if(renderConfig.colspan > 1) {
					var fromVisibleIndex = visibleIndexMapByColumnIndex[renderConfig["columnIndex"]];
					var toVisibleIndex = fromVisibleIndex + parseInt(renderConfig.colspan) - 1;
					var removeFrom = mapping.columnIndex+1;
					var removeTo = (self.state.visibleColumnMappingList[toVisibleIndex] 
						|| self.state.visibleColumnMappingList[self.state.visibleColumnMappingList.length-1]
					).columnIndex;
					for(var j=removeFrom,jl=removeTo;j<=jl;j++) {
						var hsm = headerStackMapByColumnIndex[j];
						if(!hsm) continue;
						hsm[depth] ? (hsm[depth] = null) : 0;
					}
				}
			}
		}
		
		//나머지 사용되지 않는 헤더스텍을 전부 제거한다.
		for(var ci in headerStackMapByColumnIndex) {
			if(!renderTargetColumnIndexMap[ci]) {
				delete headerStackMapByColumnIndex[ci];
			}
		}
		
		var existMap = {};
		var vmap = self.state.visibleIndexMapByColumnIndex;
		var diffx = vmap[renderFrom] - vmap[prevRenderFrom];
		
		var cells = [];
		for(var i=0,l=headerCellList.length;i<l;i++) {
			cells.push(headerCellList[i]);
		}
		for(var i=0,l=cells.length;i<l;i++) {
			var cell = cells[i];
			var columnIndex = parseInt(cell.getAttribute('data-alopexgrid-columnindex'));
			var depth = parseInt(cell.getAttribute('data-alopexgrid-columndepth'));
			if(!(columnIndex>=0) || !(depth>=0) || renderTo < columnIndex || depth >= columnHeaderDepth) {
				//비정상셀 삭제
				self.$wrapper[0].removeChild(cell);
				continue;
			}
			var stack = headerStackMapByColumnIndex[columnIndex];
			if(!stack || !stack[depth]) {
				self.$wrapper[0].removeChild(cell);
				continue;
			}
			existMap[columnIndex+","+depth] = true;
		}
		
		for(var i=0,l=renderTargetMapping.length;i<l;i++) {
			var mapping = renderTargetMapping[i];
			var columnIndex = mapping.columnIndex;
			var stack = headerStackMapByColumnIndex[mapping.columnIndex];
			for(var depth=0;depth<columnHeaderDepth;depth++) {
				var renderConfig = stack[depth];
				if(!existMap[columnIndex+","+depth] && renderConfig) {
					var cell = document.createElement("div");
					cell.className = "cell headercell";
					//cell.setAttribute('data-alopexgrid-columnindex',renderConfig["columnIndex"]);
					cell.setAttribute('data-alopexgrid-columnindex',columnIndex);
					cell.setAttribute('data-alopexgrid-columndepth',depth)
					self.$wrapper[0].appendChild(cell);
				}
			}
		}
		
		cells = [];
		for(var i=0,l=headerCellList.length;i<l;i++) {
			cells.push(headerCellList[i]);
		}
		
		var heightMap = [];
		var topMap = [0];
		for(var depth=0;depth<columnHeaderDepth;depth++) {
			heightMap[depth] = (
					self.option.headerRowHeight ? 
							(typeof self.option.headerRowHeight === "number" ? 
									self.option.headerRowHeight : self.option.headerRowHeight[depth]) 
							: null
				) || self.state.headerRowHeight;
			topMap.push(topMap[topMap.length-1] + heightMap[depth]);
		}
		
		for(var i=0,l=cells.length;i<l;i++) {
			var cell = cells[i];
			var columnIndex = parseInt(cell.getAttribute('data-alopexgrid-columnindex'));
			var depth = parseInt(cell.getAttribute('data-alopexgrid-columndepth'));
			var stack = headerStackMapByColumnIndex[columnIndex];
			var renderConfig = stack[depth];
			var mapping = renderConfig["mapping"];
			
			if(forceRefresh) {
				cell.className = "cell headercell alopexgrid-cell";
			}
			
			var left = posxMapByColumnIndex[columnIndex];
			if(isScrollEnd && columnIndex > self.state.fixupto) left += endxOffset;
			var top = topMap[depth];//(depth * self.state.headerRowHeight);
			var width = self.state.columnWidthMap[columnIndex]*fitRatio;
			var height = heightMap[depth];//self.state.headerRowHeight;
			
			if(renderConfig["rowspan"] > 1) {
				var fromDepth = depth;
				var toDepth = depth + parseInt(renderConfig["rowspan"]) - 1;
				height = 0;
				for(var d = fromDepth; d <= toDepth;d++) {
					height += heightMap[d];
				}
				//height = height * parseInt(renderConfig["rowspan"]);
			}
			if(renderConfig["colspan"] > 1 && renderConfig["isGroup"]) {
				width = 0;
				for(var groupedColumnIndex = renderConfig["mapping"]["fromIndex"];
				groupedColumnIndex<=renderConfig["mapping"]["toIndex"];groupedColumnIndex++) {
					width += self.state.columnWidthMap[groupedColumnIndex]*fitRatio || 0;
					//현재 위치에서 왼쪽으로 넓혀야 하는 경우.
					if(self.state.visibleIndexMapByColumnIndex[groupedColumnIndex] !== undefined && 
							groupedColumnIndex < columnIndex) {
						left -= self.state.columnWidthMap[groupedColumnIndex]*fitRatio;
					}
				}
			}
			
			var leftpx = left + 'px';
			var toppx = top + 'px';
			if(cell.style.left !== leftpx) cell.style.left = leftpx;
			if(cell.style.top !== toppx)   cell.style.top = toppx;
			
			var widthpx = width + 'px';
			var heightpx = height + 'px';
			if(cell.style.width !== widthpx)   cell.style.width = widthpx;
			if(cell.style.height !== heightpx) {
				cell.style.height = heightpx;
				//cell.style.lineHeight = heightpx;
			}
			
			//클래스 및 tag attribute 등
			if(!cell.isHeaderCellRendered || forceRefresh) {
				//var content = "&nbsp;";
				var className = "";
				var content = document.createDocumentFragment();
				var headerTitle = document.createElement('span');
				var needWrap = false;
				var noTitle = false;

				if(renderConfig["filter"]) {
					var filterMapping = self.state.columnIndexToMapping[renderConfig["columnIndex"]];
					if(filterMapping && filterMapping.key) {
						var filterCell = self._filterCellRender(filterMapping, true);
						content.appendChild(filterCell);
					}
					noTitle = true;
					className += " filtercell";
				}
				
				if(columnIndex <= self.state.fixupto) {
					className += " fixed cell-fixcol";
					if(columnIndex === self.state.fixupto) {
						className += " cell-fixcol-lastcolumn";
					}
				}
				
				if(renderConfig["isGroup"]) {
					className += ' header-group';
					if(renderConfig["rowspan"] > 1) {
						className += ' header-group-rowspan';
					}
					if(renderConfig["colspan"] > 1) {
						className += " header-group-colspan";
					}
					if(self.state.fixupto >= 0 
						&& mapping.fromIndex <= self.state.fixupto 
						&& mapping.toIndex >= self.state.fixupto) {
						className += " cell-fixcol-lastcolumn"
					}
				}
				if(mapping) {
					var $cell = $(cell);
					if(mapping["styleclass"] && self.option.mappingStyleclassToHeader) {
						var cl = mapping["styleclass"];
						if(typeof cl === "function") {
							cl = cl.call(self, "",{},mapping) || "";
						}
						if(typeof cl === "string") {
							className += (" " + cl);
						}
					}
					if(mapping["headerStyleclass"]) {
						var cl = mapping["headerStyleclass"];
						if($.isFunction(cl)) {
							cl = cl.call(self, mapping) || "";
						}
						if(typeof cl === "string") {
							className += (" " + cl);
						}
					}
					if(self.state.headerSelection) {
						var from = Math.min(self.state.headerSelection.from, self.state.headerSelection.to);
						var to = Math.max(self.state.headerSelection.from, self.state.headerSelection.to);
						if(mapping.columnIndex >= from && mapping.columnIndex <= to) {
							className += (' '+'header-selected');
						}
					}
					if(((mapping.columnIndex || mapping.fromIndex) + renderConfig.colspan) >= self.state.maxColumnIndex) {
						className += " lastcolumn lastcell";
					}
					if(mapping.selectorColumn && !(typeof mapping.title === "string" && self.option.allowSelectorColumnTitle)) {
						className += " selector-column";
						if (!(self.option.rowClickSelect === "only" || self.option.rowSingleSelect)) {
							cell.setAttribute("onclick", "AlopexGrid.run('" + self.key + "','_rowSelectAll',event,this);");
						}
					}

					if(mapping.selectorColumn && !(typeof mapping.title === "string" && self.option.allowSelectorColumnTitle)) {
						var input = {tag:"input",attr:{type:"checkbox",name:_generateUniqueId()}};
						if (self.option.rowClickSelect === "only" || self.option.rowSingleSelect) {
							input.attr["disabled"] = "disabled";
						}
						if (self.state.selectAll) {
							input.attr["checked"] = "checked";
						}
						headerTitle.innerHTML = _generateHTML(input);
					} else {
						var columnTitle = mapping.title;
						if($.isFunction(columnTitle)) {
							columnTitle = columnTitle.call(self, mapping);
						}
						headerTitle.innerHTML = (columnTitle || '&nbsp;');
					}
					
					var sorting = mapping.sorting;
					var resizing = _readMappingProp(mapping, 'resizing');
					if(sorting || resizing) {
						needWrap = true;
						if (sorting && mapping.key && !mapping.selectorColumn) {
							var handle = null;
							className += " sorting";
							if(self.option.disableHeaderClickSorting !== true) {
								className += " click-sortable";
							}
							if(self.option.hideSortingHandle!==true) {
								handle = createSortingHandle(self);
								content.appendChild(handle);
								if (self.state.sortingColumn !== undefined) {
									if (Number(mapping.columnIndex) === Number(self.state.sortingColumn)) {
										var dir = self.state.sortingDirection || "asc";
										className += ' ' + dir;
										if(self.state.sortingMulti && self.state.sortingMulti.length && handle) {
											//handle.innerHTML = "1";
											var span = document.createElement('span');
											var text = document.createTextNode('1');
											span.className = 'multi-sorting-order';
											span.appendChild(text);
											handle.appendChild(span);
										}
									}
									if(self.state.sortingMulti) {
										$.each(self.state.sortingMulti, function(sortingOrder,sortingMultiItem){
											if(sortingMultiItem.sortingColumn === Number(mapping.columnIndex) ||
													sortingMultiItem.sortingKey === mapping.key) {
												className += ' ' + (sortingMultiItem.sortingDirection || "asc");
												//handle.innerHTML = parseInt(sortingOrder+2);
												var span = document.createElement('span');
												var text = document.createTextNode(String(sortingOrder+2));
												span.className = 'multi-sorting-order';
												span.appendChild(text);
												handle.appendChild(span);
											}
										});
									}
								}
							}
							
							if(!self.option.disableHeaderClickSorting) {
								cell.setAttribute("onmousedown", "event.preventDefault();AlopexGrid.run('" + self.key + "','_sortToggle',"+mapping.columnIndex+",null,event);");
							} else if(String(cell.getAttribute('onclick')).indexOf('_sortToggle') >= 0) {
								cell.removeAttribute('onmousedown');
							}
						}
						if (resizing && !renderConfig["disableResizing"]) {
							if($.isArray(resizing)) {
								var widthmap = self.state.columnWidthMap;
								var offset = 0;
								var sumof = [];
								for(var rci = mapping.toIndex; rci>=mapping.fromIndex; rci--) {
									var handle = createResizingHandle(self, {columnIndex:rci});
									if(rci !== mapping.toIndex) {
										handle.style.right = offset+"px";
									}
									sumof.push(rci);
									offset += widthmap[rci];
									if($.inArray(rci, resizing)>=0){
										content.appendChild(handle);
									}
								}
							} else {
								content.appendChild(createResizingHandle(self, {columnIndex:columnIndex}));
							}
						}
					}
				}
				
				while(cell.firstChild) {
					cell.removeChild(cell.firstChild);
				}
				if(needWrap) {
					var wrap = document.createElement('div');
					wrap.className = 'relative-wrap';
					if(!noTitle) wrap.appendChild(headerTitle);
					wrap.appendChild(content);
					cell.appendChild(wrap);
				} else {
					if(!noTitle) cell.appendChild(headerTitle);
					cell.appendChild(content);
				}
				if(!noTitle) {
					//headerTitle.style.height = headerTitle.offsetHeight + 'px';
					headerTitle.className = 'column-title';
				}
				
				cell.className += className;
				cell.isHeaderCellRendered = true;
			}
			
		}
		
		self.state.refreshheadercell.prevRenderFrom = renderFrom;
		self.state.refreshheadercell.fitRatio = fitRatio;
		self.state.headerHeight = heightMap.length ? heightMap.reduce(function(a,b){return a+b;}) : 0;
		
		headerStackMapByColumnIndex = null;
	};

	//추출된 값을 셀 직접 렌더링 또는 export 개별 렌더링에서 사용
	//export모드 에서는 필요한 녀석만 잘..
	AlopexGrid.prototype._generateCellAttribute = function(data, mapping, exportMode) {
		var self = this;
		var attr = {"styleclass":['alopexgrid-cell']};
		var key = mapping.key;
		var gridState = self.state;

		if(!data) {
			attr["styleclass"].push('emptycell');
		} else {
			attr["data-alopexgrid-renderedindex"] = data._index.rendered;
			attr["data-alopexgrid-columnindex"] = mapping.columnIndex;
			attr["data-alopexgrid-dataindex"] = data._index.data;
			attr["data-alopexgrid-dataid"] = data._index.id;

			attr["styleclass"].push(data._index.id); //이거 넣게 되면 클래스 통한 복사붙여넣기 스타일 캡쳐가 어려워짐.
			attr["styleclass"].push(data._index.rendered%2?'row-odd':'row-even');
			if(data._state.selected) attr["styleclass"].push("selected");
			if(data._state.edited)   attr["styleclass"].push("edited");
			if(data._state.focused)  attr["styleclass"].push("focused");
			if(data._state.deleted)  attr["styleclass"].push("deleted");
			if(data._state.editing)  attr["styleclass"].push("editing");
			if(data._state.added)  attr["styleclass"].push("added");

			if(!self.option.disableCellTitle && mapping.key && data && mapping.tooltip) {
				var value = data[mapping.key];
				var title = value;
				if(typeof mapping.tooltip === "function") {
					title = mapping.tooltip(value, data, mapping) || "";
				} else if(typeof mapping.tooltip === "string") {
					title = mapping.tooltip;
				}
				attr["title"] = AlopexGrid.escapeHTML(title || "");
			}

			if(self.option.rowOption) {
				if(self.option.rowOption.styleclass) {
					var cs = self.option.rowOption.styleclass;
					if(typeof cs === "function") {
						cs = cs.call(self, data, self.option.rowOption);
					}
					if(cs && typeof cs === "string") {
						attr["styleclass"].push(cs);
					}
				}
				if(self.option.rowOption.highlight) {
					var cs = self.option.rowOption.highlight;
					if(typeof cs === "function") {
						cs = cs.call(self, data, self.option.rowOption);
					}
					if(cs) {
						attr["styleclass"].push('row-highlight');
						if(typeof cs === "string") {
							attr["styleclass"].push(cs);
						}
					}
				}
			}
			if(mapping.styleclass && self.option.mappingStyleclassToBody) {
				var cl = mapping.styleclass;
				if(typeof cl  === "function") {
					cl = cl.call(self, data[key], data, mapping);
				}
				if(cl && typeof cl === "string") {
					attr["styleclass"].push(cl);
				}
			}
			if(mapping.highlight) {
				var cl = mapping.highlight;
				if(typeof cl  === "function") {
					cl = cl.call(self, data[key], data, mapping);
				}
				if(cl) {
					attr["styleclass"].push('cell-highlight');
					if(typeof cl === "string") {
						attr["styleclass"].push(cl);
					}
				}	
			}
			if(mapping.bodyStyleclass) {
				var cl = mapping.bodyStyleclass;
				if(typeof cl  === "function") {
					cl = cl.call(self, data[key], data, mapping);
				}
				if(cl && typeof cl === "string") {
					attr["styleclass"].push(cl);
				}
			}
			
			//고정컬럼
			if(mapping.columnIndex <= self.state.fixupto) {
				attr["styleclass"].push('cell-fixcol');
				if(mapping.columnIndex === self.state.fixupto) {
					attr["styleclass"].push('cell-fixcol-lastcolumn');
				}
			}
			
			//고정행
			if(self.state.pinnedDataIdMap && self.state.pinnedDataIdMap[data._index.id]) {
				attr["styleclass"].push('pinnedcell');
			}
			if(data._index.rendered >= 0 && data._index.rendered < self.option.rowFixCount) {
				attr["styleclass"].push('cell-fixrow');
				if(data._index.rendered === (self.option.rowFixCount-1)){
					attr["styleclass"].push('cell-fixrow-lastrow');
				}
			}
			
			var firstMapping = self.state.visibleColumnMappingList[0];
			var lastMapping = self.state.visibleColumnMappingList[self.state.visibleColumnMappingList.length-1];
			if(firstMapping && firstMapping.columnIndex === mapping.columnIndex) {
				attr["styleclass"].push('cell-firstcolumn');
			}
			if(lastMapping && lastMapping.columnIndex === mapping.columnIndex) {
				attr["styleclass"].push('cell-lastcolumn');
			}

			if(mapping.align) {
				attr["styleclass"].push('align-'+mapping.align);
			}
			if(mapping.selectorColumn) {
				attr["styleclass"].push('selector-column');
			}
			if(mapping.groupingColumn) {
				attr["styleclass"].push('grouping-column');
			}
			if(mapping.key && data._original && data._original[mapping.key] !== _getCurrentValue(data,mapping.key)) {
				attr["styleclass"].push('cell-edited');
			}
			if(mapping.key) {
				attr["data-alopexgrid-key"] = mapping.key;
			}
			if(mapping.editable && (data._state.editing || self._isEditingCell(data._index.rendered, mapping.columnIndex))) {
				attr["styleclass"].push("editingcell");
			}
			if(self.option.ellipsisText === true) {
				attr["styleclass"].push('cell-ellipsis-text');
			}
			if(gridState.cellSelection) {
				if(gridState.cellSelection.focusColumnIndex === mapping.columnIndex 
						&& gridState.cellSelection.focusRenderedIndex === data._index.rendered) {
					attr["styleclass"].push('cell-selected-focus');
				} else if(gridState.cellSelection.focusRowspanInfo 
						&& gridState.cellSelection.focusRowspanInfo["from"] <= data._index.rendered
						&& gridState.cellSelection.focusRowspanInfo["to"] >= data._index.rendered
				&& gridState.cellSelection.focusColumnIndex === mapping.columnIndex ) {
					attr["styleclass"].push('cell-selected-focus');
				}
				if(gridState.cellSelection.columnIndexMap[mapping.columnIndex] 
				&& gridState.cellSelection.renderedIndexMap[data._index.rendered]) {
					attr["styleclass"].push('cell-selected');
					if(gridState.cellSelection.leftBoundaryColumnIndex === mapping.columnIndex) {
						attr["styleclass"].push('cell-selected-leftline');
					}
					if(gridState.cellSelection.rightBoundaryColumnIndex === mapping.columnIndex) {
						attr["styleclass"].push('cell-selected-rightline');
					}
					if(gridState.cellSelection.topBoundaryRenderedIndex === data._index.rendered) {
						attr["styleclass"].push('cell-selected-topline');
					}
					if(gridState.cellSelection.bottomBoundaryRenderedIndex === data._index.rendered) {
						attr["styleclass"].push('cell-selected-bottomline');
					}
				}
			}
		}
		attr["styleclass"] = attr["styleclass"].join(' ');
		return attr;
	};
	AlopexGrid.prototype._generateCellContent = function(data, mapping, exportMode) {
		var self = this;
		var gridState = self.state;
		var gridOption = self.option;
		var content = "";

		if(!data) {
			return content;
		}

		if(mapping.selectorColumn) {
			var selected = !!data._state.selected;
			var disabled = false;
			if(self._triggerGridEvent('dataSelect',{"data":data,"select":selected})===false
					|| (gridState.testRowAllowSelect && gridOption.rowOption.allowSelect(data)===false)) {
				// content.child.attr.disabled = "disabled";
				// delete content.child.attr.checked;
				selected = false;
				disabled = true;
			}
			content = '<div class="cell-wrapper">'+
				'<div class="selector-column-wrapper" style="text-align:center;">'+
				'<input type="checkbox" class="selector-checkbox" name="'+_generateUniqueId()+'" '+
				(selected ? 'checked="checked"' : '')+
				(disabled ? ' disabled="disabled"':'')+'>'+
				'</div></div>';
		} else if(mapping.groupingColumn) {
			if(gridOption.grouping && gridOption.grouping.useGrouping) {
				if(gridOption.rowOption && gridOption.rowOption.allowFolding 
						&& gridOption.rowOption.allowFolding(data) === false) {
					//do nothing
				} else {
					//TODO useSummary:false 일 때에도 작동할 방안이 필요하다. fold/unfold 기준 정립 필요.
					var groupBy = gridOption.grouping.by;
					if(groupBy[0]===true) {
						groupBy = groupBy.slice(1);
					}
					
					var foldingkeyDrawMap = {};
					var foldingkeys = gridOption.grouping.foldingButtonKey;
					if(gridOption.grouping.foldingButtonKey) {
						if(typeof foldingkeys === "string") {
							foldingkeys = [foldingkeys];
						}
						for(var g=0,gl=foldingkeys.length;g<gl;g++) {
							foldingkeyDrawMap[foldingkeys[g]] = true;
						}
					}
					
					var bymap = {};
					for(var g=0;g<groupBy.length;g++) {
						bymap[groupBy[g]] = g;
						if(!gridOption.grouping.foldingButtonKey) {
							foldingkeyDrawMap[groupBy[g]] = true;
						}
					}
					var lookupTable = gridState.groupingLookupTable;
					for(var g=0;g<groupBy.length;g++) {
						var groupKey = groupBy[g];
						var fold = false;
						var unfold = false;
						var folded = self._isDataFolded(data);
						if(foldingkeyDrawMap[groupKey]) {
							var icon = {
									tag : 'div',
									attr : {
										"styleclass" : "alopexgrid-group-icon alopexgrid-handle group-depth-"+g + ' group-key-'+groupKey,
										"data-alopexgrid-groupkey":groupKey
									}
							};
							var iconData = data;
							if(iconData._index && iconData._index.id) {
								var lookupTableItem = lookupTable[groupBy[g]];
								var lookupItem = lookupTableItem[iconData._index.data];
								folded = self._isDataFolded(iconData, g);
								if(folded==="unfold" || folded==="unfold-line") {
									//상위 그룹에 대한것인지 하위그룹에 대한 것인지 알 수 있어야 한다.
									//useSummary:false일 때 가장 첫번째 데이터가 그룹에서 생존해 있게 된다. 
									//이 행을 이용하여 그룹 fold/unfold를 하게 된다.
									if(folded==="unfold"){
										icon.attr["styleclass"] += " alopexgrid-group-unfold";
									} else {
										if(lookupItem["from"] === iconData._index.data) {
											icon.attr["styleclass"] += " alopexgrid-group-start";
										} else {
											icon.attr["styleclass"] += " alopexgrid-group-line";
										}
									}
									unfold = true;
								} else if(iconData._index.data === lookupItem["to"]) {
									if(gridOption.grouping.useSummary) {
										icon.attr["styleclass"] += " alopexgrid-group-line";
									} else {
										icon.attr["styleclass"] += " alopexgrid-group-fold";
									}
									fold=true;
								} else if(iconData._index.data === lookupItem["from"]) {
									icon.attr["styleclass"] += " alopexgrid-group-start";
									fold = true;
								} else if(!gridOption.grouping.useSummary && iconData._index.data === lookupItem["to"]) {
									icon.attr["styleclass"] += " alopexgrid-group-fold";
									fold = true;
								} else {
									if(lookupItem["from"] === iconData._index.data) {
										icon.attr["styleclass"] += " alopexgrid-group-start";
									} else {
										icon.attr["styleclass"] += " alopexgrid-group-line";
									}
									if(folded===true) {
										unfold = true;
									} else {
										fold=true;
									}
								}
								var title = [];
								for(var h=0;h<=g;h++) {
									title.push(iconData[groupBy[h]]);
								}
								icon.attr["title"] = _escapeHTML(title.join(', '));
							}
							var groupValues = [];
							if(fold || unfold) {
								for(var h=0;h<=g;h++) {
									groupValues.push(iconData[groupBy[h]]);
								}
							}
							if(fold) {
								var onclick = "AlopexGrid.run('" + this.key + "','foldGroup',['"+groupValues.join("','")+"']);";
								icon.attr["onclick"] = onclick;
								icon.attr["styleclass"] += ' alopexgrid-group-action-fold';
							}
							if(unfold) {
								var onclick = "AlopexGrid.run('" + this.key + "','unfoldGroup',['"+groupValues.join("','")+"']);";
								icon.attr["onclick"] = onclick;
								icon.attr["styleclass"] += ' alopexgrid-group-action-unfold';
							}
							content += (_generateHTML(icon));
							if(folded && !gridOption.grouping.useSummary && !iconData._meta) break;
						}
					}
				}
				
			}
 		} else if(mapping.rowindexColumn) {
 			var eventhandler = ' onmousedown="AlopexGrid.run(\''+self.key+'\', \'_rowResizeStart\',event,'+data._index.rendered+');"'
 			content = data._index.rendered + '<div class="rowindex-column-resizing-handle resizing-handle alopexgrid-handle"'+eventhandler+'></div>';
 		} else if(mapping.numberingColumn) {
 			var num = data._index.data + (self.option.numberingColumnFromZero ? 0 : 1);
 			content = '<div class="numbering-column-wrapper" style="text-align:center;">'+num+'</div>';
 		} else if(mapping.editable && (data._state.editing || self._isEditingCell(data._index.rendered, mapping.columnIndex))) {
			var renderer = mapping.editable === true ? {type: "text"} : mapping.editable;
			content = _renderValue.call(self, renderer, 
				gridState.editingCellInfo ? gridState.editingCellInfo["value"] : _getCurrentValue(data,mapping.key)
				, data, mapping);

			var eventHandler = "AlopexGrid.run('" + self.key + "','_cellEditUpdate',this,'" + data._index.id + "'," + (mapping.columnIndex) + ",event);";
			var total = "$1";
			total += (' onkeyup' + '="' + eventHandler + '"')
				+ (' onclick' + '="' + eventHandler + '"')
				+ (' onchange' + '="' + eventHandler + '"');
			if (typeof content === "string") {
				content = content.replace(/(<input|<select|<textarea)/g, total);
			}
 		} else {
 			var renderer = mapping.render;
			var val = data[mapping.key];
			if(renderer === "editable" && mapping.editable) {
				var editable = mapping.editable === true ? {type:"text"} : mapping.editable;
				renderer = editable;//$.extend({}, mapping.editable);
				val = gridState.editingCellInfo ? gridState.editingCellInfo["value"] : _getCurrentValue(data,mapping.key);
			}
			//if(gridOption.readonlyRender && $.isPlainObject(renderer)) {
			if(gridOption.readonlyRender && renderer) {
				renderer.readonly = true;
			}
 			var result = "&nbsp;";
			result = mapping.render ? _renderValue.call(self, renderer, val, data, mapping) :
				((data.hasOwnProperty(mapping.key) && val !== undefined) ? (gridOption.disableValueEscape ? val : _escapeHTML(val)) : '&nbsp;');
			content = result;
 		}
		return content;
	};
	AlopexGrid.prototype._createCell = function(data, mapping, cell) {
		var self = this;
		if(!cell) {
			cell = document.createElement('div');
		}
		if(!cell.className) {
			cell.className = 'cell bodycell';
		}

		var attr = self._generateCellAttribute(data, mapping);
		for(var prop in attr) {
			if(prop === "styleclass") {
				cell.className += (' '+attr[prop]);
			} else {
				cell.setAttribute(prop, attr[prop]);
			}
		}
		var content = self._generateCellContent(data, mapping);
		if(typeof content === "string") {
			cell.innerHTML = content;
		} else if(content && content.nodeType) {
			cell.appendChild(content);
		} else if(content && content.length) {
			var list = [];
			for(var i=0,l=content.length;i<l;i++) {
				list.push(content[i]);
			}
			for(var i=0,l=list.length;i<l;i++) {
				content = list[i];
				if(content && content.nodeType) {
					cell.appendChild(content);
				}
			}
		}
		cell.isCellAttributeGenerated = true;
		cell.isCellContentGenerated = true; //expando property to indicate this cell has some content
			
		return cell;
	};
	AlopexGrid.prototype._refreshBodyCells = function(forceRefresh){
		var self = this;
		var bodyCells = self.state.bodyCellList; //Live NodeList
		var forceRefreshInfo = {"dataIndexList":null,"columnIndexList":null,"dataIndexMap":{},"columnIndexMap":{}};
		if(forceRefresh && $.isPlainObject(forceRefresh)) {
			forceRefreshInfo["dataIndexList"] = forceRefresh["dataIndexList"];
			if(forceRefreshInfo["dataIndexList"]) {
				for(var i=0,l=forceRefreshInfo["dataIndexList"].length;i<l;i++) {
					forceRefreshInfo["dataIndexMap"][forceRefreshInfo["dataIndexList"][i]] = true;
				}
			}
			forceRefreshInfo["columnIndexList"] = forceRefresh["columnIndexList"];
			if(forceRefreshInfo["columnIndexList"]) {
				for(var i=0,l=forceRefreshInfo["columnIndexList"].length;i<l;i++) {
					forceRefreshInfo["columnIndexMap"][forceRefreshInfo["columnIndexList"][i]] = true;
				}
			}
			forceRefresh = false;
		}
		
		if(forceRefresh===true && self.state.refreshbodycell) {
			for(var prop in self.state.refreshbodycell) {
				delete self.state.refreshbodycell[prop];
			}
			delete self.state.refreshbodycell;
		}
		self.state.refreshbodycell = self.state.refreshbodycell || {};
		self.state.bodyHeight = 0;

		var bodyCellStartY = self.state.headerHeight || 0;
		var bodyCellEndY = self.state.wrapperHeight;

		var bodyCellStartX = 0;
		var bodyCellEndX = self.state.wrapperWidth;
		var scrollxEnd = self.state.scrollxEnd;
		var scrollyEnd = self.state.scrollyEnd;

		//고정컬럼 만큼을 띄워야 한다. 이후 스크롤대상 셀들은 이 위치에 맞추어 렌더링을 해야 함.
		var bodyCellScrollFromX = bodyCellStartX;
		var bodyCellScrollFromY = bodyCellStartY;

		var fromColumnIndex = self.state.renderFromColumnIndex || 0;
		var fromRenderedIndex = self.state.renderFromRenderedIndex || 0;

		var prevColumnIndex = self.state.refreshbodycell.prevColumnIndex;
		var prevRenderedIndex = self.state.refreshbodycell.prevRenderedIndex;
		
		if(self.state.refreshbodycell.prevRowFixCount !== self.option.rowFixCount) {
			forceRefresh = true;
		}

		var fitRatio = 1;

		var toColumnIndex = 0;
		var toRenderedIndex = 0;
		//self.state.columnIndexToMapping[columnIndex]
		//고정컬럼에 대한 x축 렌더링 시작점 조절
		if(self.state.fixupto >= 0) {
			bodyCellScrollFromX += self.state.fixedColumnWidth;
		}
		//고정행에 대한 y축 렌더링 시작점 조절
		var pinnedDataIndexList = []
		if(self._hasPinnedData()) {
			//self.state.pinnedDataIdMap[data._index.id];
			//self.state.pinnedDataIdList;
			for(var i=0,l=self.state.pinnedDataIdList.length;i<l;i++) {
				var dataid = self.state.pinnedDataIdList[i];
				var data = self.state.data[self.state.dataIdToIndexMap[dataid]];
				if(!data) continue;
				if($.inArray(data._index.data, self.state.renderTargetDataIndexList)<0) continue;
				bodyCellScrollFromY += self.state.rowHeightMapByDataId[dataid] || self.state.rowHeight;
				pinnedDataIndexList.push(data._index.data);
			}
		} else if(self.option.rowFixCount>0) {
			for(var i=0,l=self.option.rowFixCount;i<l;i++) {
				var dataIndex = self.state.renderTargetDataIndexList[i];
				var data = self.state.data[dataIndex];
				if(!data) continue;
				pinnedDataIndexList[i] = dataIndex;
				bodyCellScrollFromY += self.state.rowHeightMapByDataId[data._index.id] || self.state.rowHeight;
			}
		}

		//고정컬럼 + 고정행 : 무조건 그려져야함 + x/y축 모두 고정. 
		//고정컬럼셀 : 고정행 부분 제외한 고정컬럼셀. 세로스크롤에 따라 그려지는 범위 결정됨. x축 변경필요없음. y축만 고려.
		//고정행셀 : 고정컬럼 부분 제외한 고정행셀. 가로스크롤에 따라 그려지는 범위 결정됨. y축 변경 필요없음. x축만 고려
		//일반바디셀 : bodyCellStartX/Y 와 현재 스크롤위치를 고려하여 셀의 위치를 결정
		var cells = [];
		for(var i=0,l=bodyCells.length;i<l;i++) {
			cells.push(bodyCells[i]);
		}

		///////////////////////////////
		// calculate visible area  //
		///////////////////////////////
		var visibleWidth = 0;
		var visibleMapping = [];
		var fixedMapping = [];
		var mappingSkip = 0;
		for(var i=0,l=self.option.columnMapping.length;i<l;i++) {
			var mapping = self.option.columnMapping[i];
			if(!mapping || !(mapping.columnIndex >= 0) || mapping.hidden===true) {
				continue;
			}
			if(mapping.columnIndex <= self.state.fixupto) {
				visibleWidth += parseInt(mapping.width);
				visibleMapping.push(mapping);
				fixedMapping.push(mapping);
				if(mapping.columnIndex < fromColumnIndex) {
					mappingSkip++;
				}
			}
			else if(mapping.columnIndex >= fromColumnIndex) {
				if(mappingSkip) {
					mappingSkip--;
				} else {
					visibleWidth += parseInt(mapping.width);
					visibleMapping.push(mapping);
				}
			}
			if(visibleWidth > self.state.wrapperWidth && !scrollxEnd) {
				break;
			}
		}
		toColumnIndex = (visibleMapping[Math.max(visibleMapping.length-1,0)]||{}).columnIndex;
		//visibleMapping의 순서대로 local-x 에 순차 매핑한다. visibleMapping.length === local-x 의 최대치
		//renderlog('width(column)',visibleWidth, visibleMapping.map(function(d){return d.key;}));
		
		var columnIndexToLocalX = {};
		for(var i=0,l=visibleMapping.length;i<l;i++) {
			columnIndexToLocalX[visibleMapping[i].columnIndex] = i;
		}
		
		var visibleHeight = 0;
		var visibleDataIndex = [];
		var bodyAreaHeight = bodyCellEndY - bodyCellStartY;
		var fixedDataIndex = [];
		//pinnedDataIndexList : 현재 렌더링대상인 pin data의 리스트.
		for(var o=0,i=fromRenderedIndex,l=self.state.renderTargetDataIndexList.length;i<l;i++,o++) {
			var dataIndex = (o<pinnedDataIndexList.length) ? pinnedDataIndexList[o] : self.state.renderTargetDataIndexList[i];
			var data = self.state.data[dataIndex];
			var height = self.state.rowHeightMapByDataId[data._index.id] || self.state.rowHeight;

			visibleHeight += height;
			visibleDataIndex.push(dataIndex);
			if(o<pinnedDataIndexList.length) {
				fixedDataIndex.push(dataIndex);
			}
			if(visibleHeight > bodyAreaHeight && !scrollyEnd) break;
		}
		
		var lastFixedDataIndex = fixedDataIndex[fixedDataIndex.length-1];
		if(!(lastFixedDataIndex>=0)) {
			lastFixedDataIndex = -1;
		}
		
		toRenderedIndex = fromRenderedIndex + visibleDataIndex.length - 1;

		if(visibleHeight < bodyAreaHeight && self.option.rowPadding) {
			var padlen = self.option.rowPadding;
			if(padlen===true && self.option.paging) {
				padlen = self.option.paging.perPage;
			}
			var padVisibleHeight = visibleHeight;
			for(var i=toRenderedIndex+1;i<padlen;i++) {
				visibleDataIndex.push(null);
				padVisibleHeight += self.state.rowHeight;
				if(visibleHeight > bodyAreaHeight) break;
			}
		}

		self.state.renderToRenderedIndex = toRenderedIndex;
		self.state.renderToColumnIndex = toColumnIndex;

		if(visibleWidth <= (bodyCellEndX - bodyCellStartX)) {
			scrollxEnd = false;
		}
		if(visibleHeight <= (bodyCellEndY - bodyCellStartY)) {
			scrollyEnd = false;
		}
		if(visibleWidth && visibleWidth <= self.state.wrapperWidth && self.option.fitTableWidth) {
			fitRatio = self.state.wrapperWidth / visibleWidth;
		}

		if(!forceRefresh && self.option.fitTableWidth && fitRatio !== self.state.refreshbodycell.fitRatio) {
			forceRefresh = true;
		}

		//renderlog('height(row)',visibleHeight,visibleDataIndex);

		////////////////////////////
		// Cell check & remove  //
		////////////////////////////
		var existMap = {};
		var diffy = fromRenderedIndex - prevRenderedIndex;
		var vmap = self.state.visibleIndexMapByColumnIndex;
		var diffx = vmap[fromColumnIndex] - vmap[prevColumnIndex]; 
		for(var i=0,l=cells.length;i<l;i++) {
			var cell = cells[i];
			var localx = cell.getAttribute('data-localbody-x');
			var localy = cell.getAttribute('data-localbody-y');
			var localColumnIndex = parseInt(cell.getAttribute('data-alopexgrid-columnindex'));
			//기존 위치와의 비교를 통해 새로이 localx, localy를 계산한다.
			//변경된 값을 셀에 작성하고 localx, localy 변수를 변경한다.

			//이미 고정영역에 있다면 diffx, diffy를 적용하지 않는다
			//비고정영역에서 고정영역으로 진입하게 되면 셀을 지워야 한다.
			//고정영역에서는 탈출이 발생하지 않는다.
			if(localx < fixedMapping.length) {
				var fm = fixedMapping[localx];
				if(localColumnIndex >= 0 && fm.columnIndex !== localColumnIndex) {
					self.$wrapper[0].removeChild(cell);
					continue;
				}
			} else {
				if(diffx) {
					localx -= diffx;
					if(localx < fixedMapping.length) {
						self.$wrapper[0].removeChild(cell);
						continue;
					} else {
						cell.setAttribute('data-localbody-x',localx);
					}
				}
			}

			if(localy < fixedDataIndex.length) {

			} else {
				if(diffy) {
					localy -= diffy;
					if(localy < fixedDataIndex.length) {
						self.$wrapper[0].removeChild(cell);
						continue;
					} else {
						cell.setAttribute('data-localbody-y',localy);	
					}
				}	
			}
			if(localx >= visibleMapping.length || localy >= visibleDataIndex.length) {
				self.$wrapper[0].removeChild(cell);
				continue;
			}
			if(localx === null || localy === null || localx < 0 || localy < 0) {
				self.$wrapper[0].removeChild(cell);
				continue;
			}
			existMap[localx+","+localy] = true;
		}

		while(self.state.nodataCell.length) {
			self.$wrapper[0].removeChild(self.state.nodataCell[0]);
		}

		if(!self.state.data || !self.state.data.length) {
			if(self.option.message && self.option.message.nodata) {
				var div = document.createElement('div');
				div.className = 'cell emptycell nodata nodatacell';
				div.style.top = bodyCellStartY + 'px';
				div.style.left = bodyCellStartX + 'px';
				div.style.width = Math.min(visibleWidth, bodyCellEndX - bodyCellStartX) + 'px';
				div.style.height = self.state.rowHeight + 'px';
				var wrap = document.createElement('div');
				wrap.className = "cell-wrapper";
				wrap.innerHTML = self.option.message.nodata;
				div.appendChild(wrap);
				self.$wrapper[0].appendChild(div);	

				visibleDataIndex.push('emptycell');
			}
		}
		
		////////////////////////////////////////////////////
		// cell creation & x/y position precalculation  //
		////////////////////////////////////////////////////
		var posxMap = [bodyCellStartX];
		var posyMap = [bodyCellStartY];
		var heightSum = 0;
		for(var x=0,xl=visibleMapping.length;x<xl;x++) {
			var mapping = visibleMapping[x];
			posxMap.push(posxMap[posxMap.length-1]+parseInt(mapping.width)*fitRatio);
			var localHeightSum = 0;
			for(var y=0,yl=visibleDataIndex.length;y<yl;y++) {
				var dataIndex = visibleDataIndex[y];
				var data = self.state.data[dataIndex];
				var height = (data ? self.state.rowHeightMapByDataId[data._index.id] : 0) || self.state.rowHeight;
				localHeightSum += height;
				posyMap.push(posyMap[posyMap.length-1]+parseInt(height));
				if(!existMap[x+","+y]) {
					var div = document.createElement('div');
					div.className = 'cell bodycell';
					div.setAttribute('data-localbody-x',x);
					div.setAttribute('data-localbody-y',y);
					self.$wrapper[0].appendChild(div);
				}
			}
			heightSum = Math.max(heightSum, localHeightSum);
		}

		cells = [];//reselect body cells
		for(var i=0,l=bodyCells.length;i<l;i++) {
			cells.push(bodyCells[i]);
		}
		/////////////////////
		// Cell Rendering  //
		/////////////////////
		var localmap = [];
		for(var i=0,l=visibleMapping.length;i<l;i++) {
			localmap.push([]);
		}
		var removalMap = {};
		var endxOffset =  - (scrollxEnd ? (visibleWidth - self.state.wrapperWidth):0);
		var endyOffset =  - (scrollyEnd ? (visibleHeight+self.state.headerHeight - self.state.wrapperHeight):0);
		for(var i=0,l=cells.length;i<l;i++) {
			var cell = cells[i];
			var localx = parseInt(cell.getAttribute('data-localbody-x'));
			var localy = parseInt(cell.getAttribute('data-localbody-y'));
			var dataIndex = visibleDataIndex[localy];
			if(dataIndex==="emptycell") {
				removalMap[localx+','+localy] = true;
			}
			var mapping = visibleMapping[localx];
			var data = self.state.data[dataIndex];
			var refreshCell = !!(forceRefresh || 
				(forceRefreshInfo["dataIndexMap"][dataIndex] && !forceRefreshInfo["columnIndexList"]) || 
				(forceRefreshInfo["dataIndexMap"][dataIndex] && forceRefreshInfo["columnIndexMap"][mapping.columnIndex]));

			localmap[localx][localy] = cell;
			
			if(data && mapping) {
				cell.id = self._cellIdFromData(data, mapping.columnIndex);
			} else {
				cell.removeAttribute('id');
			}

			//default bodycell class
			if(refreshCell === true) {
				cell.className = 'cell bodycell';
			}

			if(removalMap[localx+','+localy]) {
				self.$wrapper[0].removeChild(cell);
				continue;
			}
			
			//////////////////////
			// width && colspan //
			//////////////////////
			//x축 스크롤이 발생했거나 너비가 설정된 적이 없다면.
			//그리고 colspan/colspanTo 가 선언되었다면 일단은 removalMap의 재 생성을 위해 이 로직을 돌린다.
			//colspan셀을 그리는 과정에서 다른 셀을 그려야 할 수도 있다. 즉 mapping 교체.
			//이를 위해 다른 로직보다 먼저 처리한다.
			var hasLeftColspan = self.state.hasLeftColspanMapByColumnIndex[mapping.columnIndex];
			var leftColspanOffset = 0;
			
			if(!cell.cellWidthProcessed || refreshCell || diffx || isNaN(diffx) || hasLeftColspan) {
				var cellColumnIndex = mapping.columnIndex;//셀이 그려지는 columnIndex. 왼쪽으로 밀 것인가는 별도의 문제임.
				var width = parseInt(mapping.width)*fitRatio;
				if(data) {
					var lastFixedColumn = self.state.fixupto >= 0 && mapping.columnIndex === self.state.fixupto;
					var colspanned = 0;
					
					//자기자신 또는 자신의 왼쪽에 colspan 컬럼이 존재한다. 자신이 덮여지는지 확인.
					if(hasLeftColspan) {
						var testx = cellColumnIndex;
						while(testx>=0) {
							var testMapping = self.state.columnIndexToMapping[testx--];
							if(!testMapping || !isMappingVisible(testMapping)) continue;
							if(!testMapping.colspan && !testMapping.colspanTo) { continue; }
							var colspanUpto = getColspanUpto(self, data, testMapping);
							if(colspanUpto >= cellColumnIndex) {
								//원래 그리려던 셀이 덮여씌워짐.
								width = parseInt(testMapping.width) || 0;
								if(testMapping.columnIndex < cellColumnIndex) {
									leftColspanOffset -= (width);
								}
								if(colspanUpto === self.state.fixupto) lastFixedColumn = true;
								for(var icolumnIndex = testMapping.columnIndex+1;icolumnIndex<=colspanUpto;icolumnIndex++) {
									var imapping = self.state.columnIndexToMapping[icolumnIndex];
									if(!imapping || !isMappingVisible(imapping)) continue;
									width += parseInt(imapping.width) || 0;
									colspanned++;
									if(icolumnIndex < cellColumnIndex) {
										//원래 그리려던 위치보다 왼쪽의 것을 더하고 있다면 left를 보정해야 한다.
										leftColspanOffset -= (parseInt(imapping.width) || 0);
									}
									var ilocalx = columnIndexToLocalX[icolumnIndex];
									if(ilocalx !== undefined && icolumnIndex > cellColumnIndex) {
										removalMap[ilocalx + "," + localy] = true;
									}
								}
								mapping = testMapping;
								break;
							}
						}
					}

					if(colspanned) {
						cell.className.indexOf('cell-colspan-column') < 0 ? (cell.className += ' cell-colspan-column') : '';
					}
					if(lastFixedColumn) {
						if(cell.className.indexOf('cell-fixcol-lastcolumn') < 0) {
							cell.className += ' cell-fixcol-lastcolumn';
						}
					}
				}
				if(cell.style.width !== (width+'px')) {
					cell.style.width = width + 'px';
				}
				cell.cellWidthProcessed = true;
			}

			//////////////////////
			// height & rowspan //
			//////////////////////
			//y축 스크롤이 발생했거나 높이가 설정된 적이 없다면.
			if(!cell.cellHeightProcessed || refreshCell || diffy || isNaN(diffy)) {
				var height = (data?self.state.rowHeightMapByDataId[data._index.id]:0) || self.state.rowHeight;
				if(data) {
					var lastFixedRow = data._index.data === lastFixedDataIndex;
					var rowspanned = 0;
					var rowspanStart = false;
					if(mapping.rowspan && self.option.grouping && self.option.grouping.useGroupRowspan) {
						var groupInfo = self._getGroupingRangeByMapping(dataIndex, mapping);
						//localy 기준으로 visibleDataIndex 를 확인해서 최종 그룹 범위를 결정한다.
						if(groupInfo) {
							rowspanned++;
							if(groupInfo["from"] === dataIndex) {
								rowspanStart = true;
							} else if(dataIndex === visibleDataIndex[fixedDataIndex.length]) {
								rowspanStart = true;
							} else if(dataIndex === visibleDataIndex[0]) {
								rowspanStart = true;
							} else {
								//자기자신 위가 모두 렌더링되지 않았다면(visibleDataIndex가 되었던, filtering이 되었던)
								//rowspanStart = true 가 된다.
								var hasUpper = false;
								var localyInFixedRow = localy < fixedDataIndex.length;
								for(var iy = localy-1;iy>=0;iy--) {
									if(!localyInFixedRow && iy < fixedDataIndex.length) {
										//비고정행에서 시작해서 고정행에 도달했다면 중지.
										break;
									}
									var upperDataIndex = visibleDataIndex[iy];
									if(upperDataIndex !== null && groupInfo["from"] <= upperDataIndex && upperDataIndex <= groupInfo["to"]) {
										hasUpper = true;
										break;
									}
								}
								if(!hasUpper) {
									rowspanStart = true;
								}
							}
							for(var iy = localy+1,il=visibleDataIndex.length;iy<il;iy++) {
								var inDataIndex = visibleDataIndex[iy];
								if(inDataIndex !== null && groupInfo["from"]<=inDataIndex && inDataIndex<=groupInfo["to"]) {
									var inData = self.state.data[inDataIndex];
									if(data._index.rendered < self.option.rowFixCount && inData._index.rendered >= self.option.rowFixCount) {
										continue;
									}
									var inDataId = inData ? inData._index.id : null;
									height += (self.state.rowHeightMapByDataId[inDataId] || self.state.rowHeight);
									rowspanned++;
									if(data._index.rendered < self.option.rowFixCount && inDataIndex === lastFixedDataIndex) {
										lastFixedRow = true;
										break;
									}
								}
							}
						}
					}
					if(rowspanned) {
						if(!rowspanStart) {
							removalMap[localx+','+localy] = true;
							self.$wrapper[0].removeChild(cell);
							continue;
						}
						cell.className.indexOf('cell-rowspan-column') < 0 ? (cell.className += ' cell-rowspan-column') : '';
						cell.isCellRowspanned = true;
					}
					if(lastFixedRow) {
						if(cell.className.indexOf('cell-fixrow-lastrow') < 0) {
							cell.className += ' cell-fixrow-lastrow';
						}
					}
				}
				cell.style.height = height + 'px';
				cell.cellHeightProcessed = true;
			}

			//////////////////////////
			// Top & Left Position  //
			//////////////////////////
			var x = posxMap[localx];
			if(scrollxEnd && mapping.columnIndex > self.state.fixupto) x += endxOffset;
			var xpx = (x+leftColspanOffset)+'px';
			if(cell.style.left !== xpx) {
				cell.style.left = xpx;
			}

			var y = posyMap[localy];
			if(scrollyEnd && localy >= pinnedDataIndexList.length) y += endyOffset;
			var ypx = y+'px';
			if(cell.style.top !== ypx) {
				cell.style.top = ypx;
			}

			// if(!data) {
			// 	cell.innerHTML = "";
			// 	continue;
			// }

			////////////////////
			// tag attribute  //
			////////////////////
			if(!cell.isCellAttributeGenerated || refreshCell === true) {
				var attr = self._generateCellAttribute(data, mapping);
				for(var prop in attr) {
					if(prop === "styleclass") {
						cell.className += (' '+attr[prop]);
					} else {
						cell.setAttribute(prop, attr[prop]);
					}
				}
				cell.isCellAttributeGenerated = true;
			}

			//////////////
			// Content  //
			//////////////
			if(!cell.isCellContentGenerated || refreshCell===true) {
				var content = self._generateCellContent(data, mapping);
				if(typeof content === "string") {
					cell.innerHTML = content;
				} else if(content && content.nodeType) {
					cell.appendChild(content);
				}
				cell.isCellContentGenerated = true; //expando property to indicate this cell has some content
			}
		}

		//post removal process
		for(var prop in removalMap) {
			if(!prop) continue;
			var localx = prop.split(',')[0];
			var localy = prop.split(',')[1];
			if(localmap[localx] && localmap[localx][localy]) {
				var cell = localmap[localx][localy];
				if(cell.parentNode) {
					cell.parentNode.removeChild(cell);
				}
			}
		}
		
		posxMap = null;
		posyMap = null;
		cells = null;
		bodyCells = null;
		localmap = null;
		existMap = null;
		removalMap = null;

		for(var i=visibleDataIndex.length-1;i>=0;i--) {
			if(visibleDataIndex[i]===null) {
				visibleDataIndex.splice(i,1);
			}
		}

		self.state.refreshbodycell.prevColumnIndex = self.state.renderFromColumnIndex;
		self.state.refreshbodycell.prevRenderedIndex = self.state.renderFromRenderedIndex;
		self.state.refreshbodycell.renderedDataIndexList = visibleDataIndex;
		self.state.refreshbodycell.renderedColumnMappingList = visibleMapping;
		self.state.refreshbodycell.renderedFixedColumnMappingList = fixedMapping;
		self.state.refreshbodycell.renderedPinnedDataIndexList = pinnedDataIndexList;
		self.state.refreshbodycell.prevRowFixCount = self.option.rowFixCount;
		self.state.refreshbodycell.fitRatio = fitRatio;
		self.state.bodyHeight = heightSum;
	};
	AlopexGrid.prototype._refreshPagingUnit = function(forceRefresh){
		var self = this;
		var pageinfo = self.pageInfo();
		var pagination = self.$pager[0].getElementsByClassName('pagination');

		for(var i=0,l=pagination.length;i<l;i++) {
			var elem = pagination[i];
			var type = elem.getAttribute('data-to-page');

			switch(type) {
				case "first" : 
				case "prev" :
				case "next" :
				case "last" :
					if(!elem.children.length || forceRefresh===true) {
 						elem.innerHTML = '<a class="pageset" href="#'+type+'"></a>';
 					}	
				break;
				case "list" :
					var pageFrom = 1;
					var pageTo = pageinfo["total"];
					var perpager = Number(pageinfo["pagerCount"]) || 5;
					if (self.option.currentPageInCenter && pageTo - pageFrom >= perpager) {
						pageFrom = pageinfo["current"] - ((perpager / 2) | 0);
						pageTo = pageFrom + perpager - 1;
						if (pageFrom < 1) {
							pageFrom = 1;
							pageTo = pageFrom + perpager - 1;
						}
						if (pageTo > pageinfo["total"]) {
							pageTo = pageinfo["total"];
							pageFrom = pageinfo["total"] - perpager + 1;
						}
					} else {
						pageTo = _min(pageTo, perpager);
						while(pageTo < pageinfo["current"]) {
							pageFrom += perpager;
							pageTo += perpager;
						}
						if(pageTo > pageinfo["total"]) {
							pageTo = pageinfo["total"];
						}
					}
					var lisraw = elem.getElementsByTagName('li');
					var lis = [];
					for(var j=0,jl=lisraw.length;j<jl;j++) {
						lis.push(lisraw[j]);
					}
					var existFrom = null;
					var existFromElem = null;
					var existTo = null;
					for(var j=0,jl=lis.length;j<jl;j++) {
						var li = lis[j];
						if(!li.children.length) {
							elem.removeChild(li);
							continue;
						}
						var topage = parseInt(li.firstChild.getAttribute('href').split('#').pop());
						if(topage < pageFrom) {
							elem.removeChild(li);
							continue;
						} else if(pageTo < topage) {
							elem.removeChild(li);
							continue;
						} else if(pageFrom <= topage && topage <= pageTo) {
							existFrom = existFrom===null ? topage : Math.min(existFrom, topage);
							if(existFrom === topage) {
								existFromElem = li;
							}
							existTo = existTo===null ? topage : Math.max(existTo, topage);
							if(topage === pageinfo["current"]) {
								li.className = "current";
							} else {
								li.className = "";
							}
						}
					}
					
					for(var pageNumber = pageFrom;pageNumber<=pageTo;pageNumber++) {
						if(existFrom !== null && pageNumber >= existFrom && pageNumber <= existTo) continue;
						var li = document.createElement('li');
						li.setAttribute('data-alopexgrid-pagenumber',pageNumber);
						if(pageNumber === pageinfo["current"]) {
							li.className = 'current';
						}
						li.innerHTML = '<a class="pageset" href="#'+pageNumber+'">'+pageNumber+'</a>';
						if(existFrom !== null && pageNumber < existFrom) {
							elem.insertBefore(li, existFromElem);
						} else {
							elem.appendChild(li);	
						}
					}
					
				break;
			}
		}
	};
	AlopexGrid.prototype._refreshTimerActivate = function(activate) {
		var self = this;
		if(activate === true) {
			if(!self.state.gridRefreshTimer) {
				self.state.gridRefreshTimer = setInterval(function(){
					self._refreshBoard();
				},40);
			}
		} else if(activate === false) {
			if(self.state.gridRefreshTimer) {
			  self._refreshBoard();
				clearInterval(self.state.gridRefreshTimer);
			}
			self.state.gridRefreshTimer = null;
		}
	};
	
	function isScrollAtTop(self) {
		return self.state.renderFromRenderedIndex === 0;
	}
	function isScrollAtColumnStart(self) {
		return self.state.renderFromColumnIndex === self.state.visibleColumnMappingList[0].columnIndex;
	}
	
	/**
	 * columnWidth를 계산하는 함수
	 */
	AlopexGrid.prototype._generateTranslatex = function(columnIndex) {
	  var self = this;
	  
	  var translateX = 0;
	  var fixedColumnLength = 0;
	  if (self.state.fixedColumnMapping != null) {
	    fixedColumnLength = self.state.fixedColumnMapping.length;
	  }
	  if (self.state.standardColumnWidthMap != null) {
	    var width, colIdx;
	    for (var idx in self.state.standardColumnWidthMap) {
	      width = self.state.standardColumnWidthMap[idx];
	      colIdx = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(Number(idx))-fixedColumnLength];
	      if (columnIndex <=0 || colIdx >= columnIndex) break;
	      translateX += width;
	    }
	  }
	  return translateX;
	};
	
	/**
	 * x축 빈칸의 넓이를 이용해 columnIndex 를 계산
	 */
  AlopexGrid.prototype._getColumnIndex = function(blankWidth) {
    var self = this;
    
    var translateX = 0;
    var currentIndex = 0;
    var fixedColumnLength = 0;
    if (self.state.fixedColumnMapping != null) {
      fixedColumnLength = self.state.fixedColumnMapping.length;
    }
    if (self.state.standardColumnWidthMap != null) {
      for (var idx in self.state.standardColumnWidthMap) {
        translateX += self.state.standardColumnWidthMap[idx];
        
        if (translateX*self.state.scrollxRatio >= blankWidth) {
          currentIndex = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(Number(idx))-fixedColumnLength];
          if (currentIndex == null) {
            currentIndex = self.state.columnIndexArr[0];
          }
          break;
        }
      }
    }
    return currentIndex;
  }
	
	/**
	 * scrollbar의 renderIndex와 translate 값을 다시 잡아준다.
	 */
	AlopexGrid.prototype._setScrollInfo = function() {
	  var self = this;
	  
	  // 만약 데이터가 없을경우 return
	  if (self.state.renderTargetDataIndexList.length == 0) {
	    self.state.renderFromColumnIndex = 0;
	    self.state.translatexX = 0;
	    self.state.renderFromRenderedIndex = 0;
	    self.state.translateY = 0;
	    return;
	  }
	  
	  // x축 스크롤 위치를 보정한다.
	  var translateX = 0;
	  // scrollEnd 설정
	  if (self.state.scrollxEnd === true) {
	    // columnIndex 값을 재설정한다.
	    var mapping;

	    if (self.state.wrapperWidth >= self.state.columnWidth) {
	      self.state.scrollxMoveable = false;
	      self.state.renderFromColumnIndex = self.state.columnIndexArr[0];
	      translateX = 0;
	    } else {
        self.state.scrollxRatio = self.state.wrapperWidth/self.state.columnWidth;
        var scrollbarxWidth = self.state.scrollbarxTrackLength*self.state.scrollxRatio
	      translateX = self.state.scrollbarxTrackLength - scrollbarxWidth;
	      self.state.renderFromColumnIndex = self._getColumnIndex(translateX);
	      
//	      var fixedColumnLength = 0;
//	      if (self.state.fixedColumnMapping != null) {
//	        fixedColumnLength = self.state.fixedColumnMapping.length;
//	      }
//
//	      var columnWidth = 0;
//	      var columnWidthArr = self.state.columnWidthForReverse;
//	      var columnWidthArrLength = columnWidthArr.length;
//	      for (var i=(columnWidthArrLength-1);i>=0;i--) {
//	        columnWidth += columnWidthArr[i];
//	        if (columnWidth > self.state.wrapperWidth) {
//	          var index = i- fixedColumnLength;
//	          if (index < 0) index = 0;
//	          self.state.renderFromColumnIndex = self.state.columnIndexArr[index];
//	          // 리사이징시 scrollxRatio값이 변경되기 때문에 재설정 해준다.
//	          self.state.scrollxRatio = self.state.wrapperWidth/self.state.columnWidth;
//	          var scrollbarxWidth = self.state.scrollbarxTrackLength*self.state.scrollxRatio
//	          translateX = self.state.scrollbarxTrackLength - scrollbarxWidth;// - self.state.scrollbarxTrackLeft;
//	          break;
//	        }
//	      }
	    }
	    //renderlog('scrollEnd일때  renderFromColumnIndex ==== ' + self.state.renderFromColumnIndex);
	  } else {
	    // renderFromColumnIndex는 기존값을 유지한다.
//	    renderlog('리프레쉬 이전 renderFromColumnIndex ==== ' + self.state.renderFromColumnIndex);
	    var arrIndex = self.state.columnIndexArr.indexOf(self.state.renderFromColumnIndex);
	    while (arrIndex < 0 && self.state.prevColumnIndexArr != null) {
	      // refresh 할때 해당 컬럼이 히든처리 될때는 다음 인덱스로 세팅한다.
	      self.state.renderFromColumnIndex = self.state.prevColumnIndexArr[self.state.prevColumnIndexArr.indexOf(self.state.renderFromColumnIndex)+1];
	      
	      if (self.state.renderFromColumnIndex == null) {
	        self.state.renderFromColumnIndex = self.state.columnIndexArr[0];
	        break;
	      }
	      arrIndex = self.state.columnIndexArr.indexOf(self.state.renderFromColumnIndex);
	    }
//	    renderlog('리프레쉬 이후 renderFromColumnIndex ==== ' + self.state.renderFromColumnIndex);
	    translateX = self._generateTranslatex(self.state.renderFromColumnIndex)*self.state.scrollxRatio;
	  }
	  // translate 재설정
	  self.state.translateX = translateX;
	  
	  // y축 스크롤 위치를 보정한다.
	  var translateY = 0;
	  
	  // 현재 rowIndex보다 데이터 길이가 짧다면 초기화해준다.
	  if ((self.state.renderFromRenderedIndex-1) > self.state.renderTargetDataIndexList.length) {
	    self.state.renderFromRenderedIndex = 0;
	    self.state.scrollyEnd = false;
	  } else {
	    var scrollbaryUpButton = self.$scrollbary.find('.upbutton');
	    var rowHeight = self.state.renderTargetDataIndexList.length*self.state.rowHeight;
	    self.state.scrollyRatio = self.state.scrollbaryTrackLength/rowHeight;
      
      var height = self.state.scrollbaryTrackLength*self.state.scrollyRatio;
      var scrollbaryBtnHeight = scrollbaryUpButton.height()*2;
      if (scrollbaryBtnHeight > height) {
        var extraHeight = scrollbaryBtnHeight - height;
        height = scrollbaryBtnHeight;
        self.state.scrollyRatio = (self.state.scrollbaryTrackLength-extraHeight)/rowHeight;
      }
      self.state.scrollbaryHeight = height;
      
      // 스크롤이 맨 마지막에 있을때
      if (self.state.scrollyEnd) {
        translateY = self.state.scrollbaryTrackLength - self.state.scrollbaryHeight;
      } else {
        translateY = (self.state.renderFromRenderedIndex)*self.state.rowHeight*self.state.scrollyRatio;
      }
	  }
	  self.state.translateY = translateY;
	};
	
	/**
	 * 스크롤을 index만큼 오른쪽으로 이동하는 함수
	 */
	AlopexGrid.prototype._scrollRightEvent = function(index, isRefresh){
	  var self = this;
	  
	  if (isRefresh == null) {
	    isRefresh = true;
	  }
	  
	  var translateX = 0;
	  var colmnIndex = 0;
	  if (self.state.scrollxEnd) return;

	  if (self.state.wrapperWidth >= self.state.standardColumnWidth) return;
	  
	  colmnIndex = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(self.state.renderFromColumnIndex)+index];
	  translateX = self._generateTranslatex(colmnIndex)*self.state.scrollxRatio;
	  if (translateX >= (self.state.scrollbarxTrackLength - self.state.scrollbarxWidth)) {
	    self.state.scrollxEnd = true;
	    self.state.renderFromColumnIndex = self.state.lastScrollxIndex;
	    translateX = self.state.scrollbarxTrackLength - self.state.scrollbarxWidth;
	  } else {
	    self.state.renderFromColumnIndex = colmnIndex;
	  }
	  self.state.translateX = translateX;
	  
	  if (isRefresh) self._refreshBoard();
	  //renderlog('self.state.renderFromColumnIndex = ' + self.state.renderFromColumnIndex);
	};

	/**
	 * 스크롤을 index만큼 왼쪽으로 이동하는 함수
	 */	
	AlopexGrid.prototype._scrollLeftMostEvent = function(isRefresh) {
		return this._scrollLeftEvent(Infinity, isRefresh);
	};
	AlopexGrid.prototype._scrollLeftEvent = function(index, isRefresh){
		var self = this;

		if (isRefresh == null) {
			isRefresh = true;
		}

		var translateX = 0;
		var colmnIndex = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(self.state.renderFromColumnIndex)-index];
		if (colmnIndex == null || index === Infinity) {
			translateX = 0;
			self.state.renderFromColumnIndex = self.state.columnIndexArr[0];
		} else {
			translateX = self._generateTranslatex(colmnIndex)*self.state.scrollxRatio;
			self.state.renderFromColumnIndex = colmnIndex;
		}
		self.state.scrollxEnd = false;
		self.state.translateX = translateX;

		if (isRefresh) self._refreshBoard();
		//renderlog('self.state.renderFromColumnIndex = ' + self.state.renderFromColumnIndex);
	};

	/**
	 * 스크롤을 index만큼 위쪽으로 이동하는 함수
	 */
	AlopexGrid.prototype._scrollTopEvent = function(doRefresh) {
		return this._scrollUpEvent(this.state.renderFromRenderedIndex, doRefresh);
	};
	AlopexGrid.prototype._scrollUpEvent = function(index, isRefresh){
		var self = this;

		if (isRefresh == null) {
			isRefresh = true;
		}

		var translateY = self.state.scrollyRatio*self.state.rowHeight*(self.state.renderFromRenderedIndex-index);
		self.state.renderFromRenderedIndex -= index;
		self.state.scrollyEnd = false;

		if (self.state.renderFromRenderedIndex <= 0) {
			self.state.renderFromRenderedIndex = 0;
			self.state.translateY = 0;
		} else {
			self.state.translateY = translateY;
		}

		if (isRefresh) self._refreshBoard();
		//renderlog('self.state.renderFromRenderedIndex = ' + self.state.renderFromRenderedIndex);
	};

	/**
	 * 스크롤을 index만큼 아래쪽으로 이동하는 함수
	 */
	AlopexGrid.prototype._scrollDownEvent = function(index, isRefresh){
		var self = this;
		var translateY = 0;

		if (isRefresh == null) {
			isRefresh = true;
		}

		if (self.state.scrollyEnd) return;

		var rowHeight = self.state.renderTargetDataIndexList.length*self.state.rowHeight;
		var wrapperHeight = self.state.wrapperHeight - self.state.headerRowHeight;
		if (wrapperHeight >= rowHeight) return;

		translateY = self.state.scrollyRatio*self.state.rowHeight*(self.state.renderFromRenderedIndex+index);
		if (translateY >= (self.state.scrollbaryTrackLength - self.state.scrollbaryHeight)) {
			self.state.scrollyEnd = true;
			self.state.renderFromRenderedIndex = self.state.renderTargetDataIndexList.length - self.state.scrollyRenderedItemLength -1;
			translateY = self.state.scrollbaryTrackLength - self.state.scrollbaryHeight;
		} else {
			self.state.renderFromRenderedIndex += index;
		}
		self.state.translateY = translateY;

		if (isRefresh) self._refreshBoard();
		//renderlog('self.state.renderFromRenderedIndex = ' + self.state.renderFromRenderedIndex);
	};
	
	/**
	 * 스크롤 위치에 따라 self.state.renderFromRenderedIndex, renderFromColumnIndex값을 수정한다.
	 * self.state.scrollxEnd, self.state.scrollyEnd boolean값은 렌더링은 
	 * renderFromRenderedIndex/renderFromColumnIndex 부터 하되, 가장 마지막 데이터를 
	 * 스크롤 영역의 우측에 붙이도록 한다.
	 */
	AlopexGrid.prototype._activateBoardScrollEvent = function(){
	  var self = this;
	  var eventns = '.alopexgridScrollbarEvent';
	  $(document).off(eventns+self.key);
	  self.$scrollbarx.off(eventns);
	  self.$scrollbary.off(eventns);
	  self.$wrapper.off(eventns);
	  //self.state.headerHeight 헤더의 높이가 저장된다.
	  //self.state.wrapperHeight 현재 self.$wrapper의 높이가 저장된다
	  //self.state.wrapperWidth 현재 self.$wrapper의 너비가 저장된다

//	  var columnWidth = self.state.currentColumnWidth;
//	  var columnWidthMap = self.state.columnWidthMap;
//	  var columnWidthExcepFixed = self.state.columnWidthExcepFixed;
//	  var columnMappingLength = self.option.columnMapping.length;
	  // row 데이터 갯수
	  var rowLength = self.state.renderTargetDataIndexList.length;
	  // 스크롤 왼쪽버튼 & 시작위치
//	  var scrollbarxLeftButton = self.$scrollbarx.find('.leftbutton');
//	  var scrollbarxStartPosition = scrollbarxLeftButton.offset().left + scrollbarxLeftButton.width();
	  // 스크롤 위쪽버튼 & 시작위치
//	  var scrollbaryUpButton = self.$scrollbary.find('.upbutton');
//	  var scrollbaryStartPosition = scrollbaryUpButton.offset().top + scrollbaryUpButton.height();
	  
	  var scrollbarxHandle = self.$scrollbarx.find('.scrollhandle');
	  var scrollbaryHandle = self.$scrollbary.find('.scrollhandle');

	  function getHeightIndex(blankLength) {
	    var currentIndex = Math.floor(blankLength/(self.state.scrollyRatio*self.state.rowHeight)); 
	    return currentIndex;
	  }

	  // x축 스크롤 버튼 이벤트
	  function scrollxButtonEvent(target, scrollbarxWidth) {
	    var translateX = 0;
	    var colmnIndex = 0;
	    if (target.attr('class').indexOf('leftbutton') == -1) {
	      // 오른쪽 버튼 클릭
	      if (self.state.scrollxEnd) return;

	      colmnIndex = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(self.state.renderFromColumnIndex)+1];
	      translateX = self._generateTranslatex(colmnIndex)*self.state.scrollxRatio;
	      if (translateX >= (self.state.scrollbarxTrackLength - scrollbarxWidth)) {
	        self.state.scrollxEnd = true;
	        self.state.renderFromColumnIndex = self.state.lastScrollxIndex;
	        translateX = self.state.scrollbarxTrackLength - scrollbarxWidth;
	      } else {
	        self.state.renderFromColumnIndex = colmnIndex;
	      }
	      self.state.translateX = translateX;
	    } else {
	      // 왼쪽 버튼 클릭
	      if (self.state.scrollxEnd) {
	        translateX = self.state.scrollbarxTrackLength - (scrollbarxWidth+(self.state.lastScrollxPixcel*self.state.scrollxRatio));
	      } else {
	        colmnIndex = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(self.state.renderFromColumnIndex)-1];
	        if (colmnIndex == null) {
	          translateX = 0;
	          self.state.renderFromColumnIndex = self.state.columnIndexArr[0];
	        } else {
	          translateX = self._generateTranslatex(colmnIndex)*self.state.scrollxRatio;
	          self.state.renderFromColumnIndex = colmnIndex;
	        }
	      }
	      self.state.scrollxEnd = false;
        self.state.translateX = translateX;
	    }
	    self._refreshBoard();
	    //renderlog('self.state.renderFromColumnIndex = ' + self.state.renderFromColumnIndex);
	  }

	  // x축 빈칸 영역 이벤트
	  function scrollxBlankEvent(startPageX, scrollbarX, scrollbarxWidth) {
	    var tempo = 2;
	    var translateX = 0;
	    var colmnIndex = 0;
	    if ((startPageX-scrollbarX) > 0) {
	      // 오른쪽 영역 클릭
	      if (self.state.scrollxEnd) return;

	      colmnIndex = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(self.state.renderFromColumnIndex)+tempo];
	      translateX = self._generateTranslatex(colmnIndex)*self.state.scrollxRatio;
	      if (translateX >= (self.state.scrollbarxTrackLength - scrollbarxWidth)) {
	        self.state.scrollxEnd = true;
	        self.state.renderFromColumnIndex = self.state.lastScrollxIndex;
	        translateX = self.state.scrollbarxTrackLength - scrollbarxWidth;
	      } else {
	        self.state.renderFromColumnIndex = colmnIndex
	      }
	      self.state.translateX = translateX;
	    } else {
	      // 왼쪽 영역 클릭
	      if (self.state.scrollxEnd) {
	        translateX = self.state.scrollbarxTrackLength - (scrollbarxWidth+(self.state.lastScrollxPixcel*self.state.scrollxRatio));
	      } else {
	        colmnIndex = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(self.state.renderFromColumnIndex)-tempo];
	        if (colmnIndex == null) {
            translateX = 0;
            self.state.renderFromColumnIndex = self.state.columnIndexArr[0];
          } else {
            translateX = self._generateTranslatex(colmnIndex)*self.state.scrollxRatio;
            self.state.renderFromColumnIndex = colmnIndex;
          }
        }
        self.state.scrollxEnd = false;
        self.state.translateX = translateX;
      }
	    self._refreshBoard();
	    //renderlog('self.state.renderFromColumnIndex = ' + self.state.renderFromColumnIndex);
	  }

	  // y축 스크롤 버튼 이벤트
	  function scrollyButtonEvent(target, scrollbaryHeight) {
	    var translateY = 0;
	    if (target.attr('class').indexOf('upbutton') == -1) {
	      // 아래 버튼 클릭
	      if (self.state.scrollyEnd) return;

	      translateY = self.state.scrollyRatio*self.state.rowHeight*(self.state.renderFromRenderedIndex+1);

	      if (translateY >= (self.state.scrollbaryTrackLength - scrollbaryHeight)) {
	        self.state.scrollyEnd = true;
	        self.state.renderFromRenderedIndex = self.state.lastScrollyIndex;
	        translateY = self.state.scrollbaryTrackLength - scrollbaryHeight;
	      } else {
	        self.state.renderFromRenderedIndex += 1;
	      }
	      self.state.translateY = translateY;
	    } else {
	      // 위쪽 버튼 클릭
	      if (self.state.scrollyEnd) {
	        if (self.state.lastScrollyPixel === 0) {
	          self.state.renderFromRenderedIndex -= 1;
	          translateY = self.state.scrollyRatio*self.state.rowHeight*(self.state.renderFromRenderedIndex);
	        } else {
	          translateY = self.state.scrollbaryTrackLength - (scrollbaryHeight + (self.state.lastScrollyPixel*self.state.scrollyRatio));
	        }
	      } else {
	        self.state.renderFromRenderedIndex -= 1;
	        translateY = self.state.scrollyRatio*self.state.rowHeight*(self.state.renderFromRenderedIndex);
	      }
	      self.state.scrollyEnd = false;

	      if (self.state.renderFromRenderedIndex <= 0) {
	        self.state.renderFromRenderedIndex = 0;
	        self.state.translateY = 0;
	      } else {
	        self.state.translateY = translateY;
	      }
	    }
	    self._refreshBoard();
	    //renderlog('self.state.renderFromRenderedIndex = ' + self.state.renderFromRenderedIndex);
	  }

	  // y축 빈칸 영역 이벤트 
	  function scrollyBlankEvent(startPageY, scrollbarY, scrollbaryHeight) {
	    var tempo = self.state.scrollyRenderedItemLength;
	    var translateY = 0;
	    if ((startPageY-scrollbarY) > 0) {
	      // 아래쪽 영역 클릭
	      if (self.state.scrollyEnd) return;

	      translateY = (self.state.renderFromRenderedIndex+tempo)*self.state.rowHeight*self.state.scrollyRatio;
	      if (translateY >= (self.state.scrollbaryTrackLength - scrollbaryHeight)) {
	        self.state.scrollyEnd = true;
	        self.state.renderFromRenderedIndex = self.state.lastScrollyIndex;
	        translateY = self.state.scrollbaryTrackLength - scrollbaryHeight;
	      } else {
	        self.state.renderFromRenderedIndex += tempo;
	      }
	      self.state.translateY = translateY;
	    } else {
	      // 위쪽 영역 클릭
	      self.state.scrollyEnd = false;
	      self.state.renderFromRenderedIndex -= tempo;
	      translateY = (self.state.renderFromRenderedIndex)*self.state.rowHeight*self.state.scrollyRatio;

	      if (self.state.renderFromRenderedIndex <= 0) {
	        self.state.renderFromRenderedIndex = 0;
	        self.state.translateY = 0;
	      } else {
	        self.state.translateY = translateY;
	      }
	    }
	    self._refreshBoard();
	    //renderlog('self.state.renderFromRenderedIndex = ' + self.state.renderFromRenderedIndex);
	  }

	  // x축 마우스 휠 이벤트
	  function wheelxEventHandler(deltaX, scrollbarxWidth) {
	    var tempoX = Math.ceil(Math.abs(deltaX)/100);
	    var translateX = 0;
	    var colmnIndex = 0;
	    if (deltaX >= 0) {
	      // 휠 오른쪽 이동
	      if (self.state.scrollxEnd) return;

	      colmnIndex = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(self.state.renderFromColumnIndex)+tempoX];
	      translateX = self._generateTranslatex(colmnIndex)*self.state.scrollxRatio;
	      if (translateX >= (self.state.scrollbarxTrackLength - scrollbarxWidth)) {
	        self.state.scrollxEnd = true;
	        self.state.renderFromColumnIndex = self.state.lastScrollxIndex;
	        translateX = self.state.scrollbarxTrackLength - scrollbarxWidth;
	      } else {
	        self.state.renderFromColumnIndex = colmnIndex;
	      }
	      self.state.translateX = translateX;
	    } else {
	      // 휠 왼쪽 이동
	      if (self.state.scrollxEnd) {
	        translateX = self.state.scrollbarxTrackLength - (scrollbarxWidth+(self.state.lastScrollxPixcel*self.state.scrollxRatio));
	      } else {
	        colmnIndex = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(self.state.renderFromColumnIndex)-tempoX];
          if (colmnIndex == null) {
            translateX = 0;
            self.state.renderFromColumnIndex = self.state.columnIndexArr[0];
          } else {
            translateX = self._generateTranslatex(colmnIndex)*self.state.scrollxRatio;
            self.state.renderFromColumnIndex = colmnIndex;
          }
        }
        self.state.scrollxEnd = false;
        self.state.translateX = translateX;
	    }
	    return true;
	  }

	  // y축 마우스 휠 이벤트
	  function wheelyEventHandler(deltaY, scrollbaryHeight) {
	    var tempoY = Math.ceil(Math.abs(deltaY)/100);
	    if (deltaY >= 0) {
	      //마우스 휠 아래로
	      if (self.state.scrollyEnd) return;

	      translateY = (self.state.renderFromRenderedIndex+tempoY)*self.state.rowHeight*self.state.scrollyRatio;
	      if (translateY >= (self.state.scrollbaryTrackLength - scrollbaryHeight)) {
	        self.state.scrollyEnd = true;
	        self.state.renderFromRenderedIndex = self.state.renderTargetDataIndexList.length - self.state.scrollyRenderedItemLength -1;
	        translateY = self.state.scrollbaryTrackLength - scrollbaryHeight;
	      } else {
	        self.state.renderFromRenderedIndex += tempoY;
	      }
	      self.state.translateY = translateY;
	    } else {
	      //마우스 휠 위로
	      translateY = (self.state.renderFromRenderedIndex-tempoY)*self.state.rowHeight*self.state.scrollyRatio;
	      self.state.renderFromRenderedIndex -= tempoY;
	      self.state.scrollyEnd = false;

	      if (self.state.renderFromRenderedIndex <= 0) {
	        self.state.renderFromRenderedIndex = 0;
	        self.state.translateY = 0;
	      } else {
	        self.state.translateY = translateY;
	      }
	    }
	    return true;
	  }

	  /////////////
	  // 휠스크롤  //
	  /////////////
	  self.$wrapper.on('wheel'+eventns, {self:self}, function(e){
	    var self = e.data.self;

	    if(self.state.hasVerticalScrollbar) {
	    	e.preventDefault();	
	    }

	    if (e.originalEvent) {
	      var deltaX = e.originalEvent.deltaX;
	      var deltaY = e.originalEvent.deltaY;
	      
	      var scrollX, scrollY;
	      if (deltaX !== 0 && self.state.scrollxMoveable) {
	        scrollX = wheelxEventHandler(deltaX, self.state.scrollbarxWidth);
	      }
	      if (deltaY !== 0 && self.state.scrollyMoveable) {
	        scrollY = wheelyEventHandler(deltaY, self.state.scrollbaryHeight);
	      }

	      if (scrollX != null || scrollY != null) {
	        //렌더링 위치정보를 수정하고 보드만 리프레시한다.
	        self._refreshBoard();
	      }
	    }
	  });

	  //////////
	  // X축  //
	  //////////
	  //self.state.fixupto 고정컬럼 마지막 columnIndex. -1은 없음.
	  //self.state.fixedColumnWidth 고정컬럼의 총 너비
	  self.$scrollbarx.on('mousedown'+eventns, {self:self}, function(e){
	    //스크롤바 빈 영역 클릭
	    var self = e.data.self;
	    if (!self.state.scrollxMoveable) return;
	    
	    if (e.target !== this) return;
	    $(document).off(eventns+self.key);
	    
	    var scrollbarxWidth = self.state.scrollbarxWidth;
	    
	    var startPageX = e.pageX;
	    var scrollbarX = scrollbarxHandle.offset().left + scrollbarxWidth;
	    scrollxBlankEvent(startPageX, scrollbarX, scrollbarxWidth);

	    var scrollbarxTimer = null;
	    var scrollbarxInterval = null;
	    scrollbarxTimer = setTimeout(function(){
	      scrollbarxInterval = setInterval(function(){
	        // interval에서는  scrollvarX 재설정
	        scrollbarX = scrollbarxHandle.offset().left + scrollbarxWidth;
	        if (startPageX > scrollbarX && (scrollbarX-startPageX) > 0 && (scrollbarX-startPageX) <= scrollbarxWidth) {
	          return;
	        } else if (scrollbarX > startPageX && (scrollbarX-startPageX) > 0 && (scrollbarX-startPageX) <= scrollbarxWidth) {
	          return;
	        } 
	        scrollxBlankEvent(startPageX, scrollbarX, self.state.scrollbarxWidth);
	      },50);
	      scrollbarxTimer = null;
	    },200);

	    $(document).on('mouseup'+eventns+self.key, {self:self}, function(e){
	      //self._refreshTimerActivate(false);
	      if(scrollbarxTimer) {
	        clearTimeout(scrollbarxTimer);
	      }
	      if(scrollbarxInterval) {
	        clearInterval(scrollbarxInterval);
	      }
	      //document에 걸린 이 그리드 인스턴스의 x축스크롤 이벤트 핸들러만 제거해야 한다.
	      $(document).off(eventns+e.data.self.key);
	    });
	  });

	  self.$scrollbarx.on('mousedown'+eventns,'.scrollhandle', {self:self}, function(e){
	    //스크롤바 핸들 클릭
	    var self = e.data.self;
	    if (!self.state.scrollxMoveable) return;
	    e.preventDefault();
	    $(document).off(eventns+self.key);
	    
	    // 핸들 클릭시 시작위치
	    var startPageX = e.pageX;
	    // 스크롤 왼쪽버튼 & 시작위치
	    var scrollbarxLeftButton = self.$scrollbarx.find('.leftbutton');
	    var scrollbarxStartPosition = scrollbarxLeftButton.offset().left + scrollbarxLeftButton.width();
	    // scrollbarxhandle 포지션
	    var scrollxHandlePosition = scrollbarxHandle.offset().left - scrollbarxStartPosition;
	    // 마우스 포인트 위치와 스크롤바 맨앞과의 length
	    var startPositionDff = startPageX - scrollbarxStartPosition;
	    
	    //스크롤되는 동안 타이머가 뒤에서 돌면서 지정된 시간마다 변경된 포인트값을 읽어서 보드를 리프레시한다.
	    self._refreshTimerActivate(true);
	    $(document).on('mousemove'+eventns+self.key, {self:self, scrollxHandlePosition:scrollxHandlePosition, scrollbarxStartPosition:scrollbarxStartPosition, startPositionDff:startPositionDff}, function(e){
	      e.preventDefault();
	      var self = e.data.self;
	      
	      var scrollbarxWidth = scrollbarxHandle.width();
	      var scrollxHandlePosition = e.data.scrollxHandlePosition;
	      var scrollbarxStartPosition = e.data.scrollbarxStartPosition;
	      var startPositionDff = e.data.startPositionDff;
	      self.state.scrollxEnd = false;
	      
	      // 왼쪽 빈칸 넓이값
	      var leftBlankWidth = e.pageX - startPositionDff - scrollbarxStartPosition + scrollxHandlePosition;

	      // 맨앞에 닿았을때
	      if (leftBlankWidth <= 0) {
	        self.state.renderFromColumnIndex = self.state.columnIndexArr[0];
	        self.state.translateX = 0;
	        return;
	      } else if ((leftBlankWidth+scrollbarxWidth) >= self.state.scrollbarxTrackLength) {
	        // 맨끝에 닿았을때 
	        self.state.scrollxEnd = true;
	        self.state.renderFromColumnIndex = self.state.lastScrollxIndex;
	        self.state.translateX = self.state.scrollbarxTrackLength - scrollbarxWidth;
	        return;
	      } else {
	        // column 에 따라 self.state.renderFromColumnIndex를 설정해준다.
	        self.state.renderFromColumnIndex = self._getColumnIndex(leftBlankWidth);
	        self.state.translateX = leftBlankWidth;
	      }
//	      renderlog('self.state.renderFromColumnIndex = ' + self.state.renderFromColumnIndex);
	    }).on('mouseup'+eventns+self.key, {self:self}, function(e){
	      e.data.self._refreshTimerActivate(false);
	      //document에 걸린 이 그리드 인스턴스의 x축스크롤 이벤트 핸들러만 제거해야 한다.
	      $(document).off(eventns+e.data.self.key);
	    });
	  });

	  self.$scrollbarx.on('mousedown'+eventns,'.scrollbutton', {self:self}, function(e){
	    // 스크롤 버튼클릭
	    var self = e.data.self;
	    if (!self.state.scrollxMoveable) return;
	    
	    $(document).off(eventns+self.key);
	    var $target = $(e.target);
	    scrollxButtonEvent($target, self.state.scrollbarxWidth);

	    var scrollbarxTimer = null;
	    var scrollbarxInterval = null;
	    scrollbarxTimer = setTimeout(function(){
	      scrollbarxInterval = setInterval(function(){
	        scrollxButtonEvent($target, self.state.scrollbarxWidth);
	      },50);
	      scrollbarxTimer = null;
	    },200);

	    $(document).on('mouseup'+eventns+self.key, {self:self}, function(e){
	      if(scrollbarxTimer) {
	        clearTimeout(scrollbarxTimer);
	      }
	      if(scrollbarxInterval) {
	        clearInterval(scrollbarxInterval);
	      }
	      //document에 걸린 이 그리드 인스턴스의 x축스크롤 이벤트 핸들러만 제거해야 한다.
	      $(document).off(eventns+e.data.self.key);
	    });
	  });

		//////////
		// y축 //
		//////////
		//self.state.rowHeight, self.state.rowContentHeight 높이가 지정되지 않은 row의 기본 높이다.
		//self.state.rowHeightMapByDataId {object} 별도로 높이가 조정된 행의 높이를 저장한다.
	  self.$scrollbary.on('mousedown'+eventns, {self:self}, function(e){
	    //스크롤바 빈 영역 클릭
	    var self = e.data.self;
	    if (!self.state.scrollyMoveable) return;
	    
	    if(e.target !== this) return;
	    $(document).off(eventns+self.key);
	    
	    var scrollbaryHeight = self.state.scrollbaryHeight;
	    
	    var startPageY = e.pageY;
	    var scrollbarY = scrollbaryHandle.offset().top + scrollbaryHeight;
	    scrollyBlankEvent(startPageY, scrollbarY, scrollbaryHeight);

	    var scrollbaryTimer = null;
	    var scrollbaryInterval = null;
	    scrollbaryTimer = setTimeout(function(){
	      scrollbaryInterval = setInterval(function(){

	        scrollbarY = scrollbaryHandle.offset().top + scrollbaryHeight;
	        if (startPageY > scrollbarY && (scrollbarY-startPageY) > 0 && (scrollbarY-startPageY) <= scrollbaryHeight) {
	          return;
	        } else if (scrollbarY > startPageY && (scrollbarY-startPageY) > 0 && (scrollbarY-startPageY) <= scrollbaryHeight) {
	          return;
	        } 

	        scrollyBlankEvent(startPageY, scrollbarY, scrollbaryHeight);
	      },50);
	      scrollbarxTimer = null;
	    },200);

	    $(document).on('mouseup'+eventns+self.key, {self:self}, function(e){
	      if(scrollbaryTimer) {
	        clearTimeout(scrollbaryTimer);
	      }
	      if(scrollbaryInterval) {
	        clearInterval(scrollbaryInterval);
	      }
	      //document에 걸린 이 그리드 인스턴스의 x축스크롤 이벤트 핸들러만 제거해야 한다.
	      $(document).off(eventns+e.data.key);
	    });
	  });

	  self.$scrollbary.on('mousedown.'+eventns,'.scrollhandle', {self:self}, function(e){
	    //스크롤바 핸들 클릭
	    var self = e.data.self;
	    if (!self.state.scrollyMoveable) return;
	    e.preventDefault();
	    $(document).off('.'+eventns+self.key);

	    // 핸들 클릭시 시작위치
	    var startPageY = e.pageY;
	    // 스크롤바의 스타트 위치
	    var scrollbaryUpButton = self.$scrollbary.find('.upbutton');
	    var scrollbaryStartPosition = scrollbaryUpButton.offset().top + scrollbaryUpButton.height();
	    // 스크롤 스타트 위치와 스크롤바의 거리 (빈칸 높이값)
	    var scrollyHandlePosition = scrollbaryHandle.offset().top - scrollbaryStartPosition;
	    // 마우스 포인트 위치와 스크롤바 맨앞과의 length
	    var startPositionDff = startPageY - scrollbaryStartPosition;

	    self._refreshTimerActivate(true);
	    $(document).on('mousemove.'+eventns+self.key, {self:self, scrollyHandlePosition:scrollyHandlePosition, scrollbaryStartPosition:scrollbaryStartPosition, startPositionDff:startPositionDff}, function(e){
	      e.preventDefault();
	      var self = e.data.self;
	      
	      var scrollbaryHeight = scrollbaryHandle.height();
	      var scrollyHandlePosition = e.data.scrollyHandlePosition;
	      var scrollbaryStartPosition = e.data.scrollbaryStartPosition;
	      var startPositionDff = e.data.startPositionDff;
	      self.state.scrollyEnd = false;
	      
	      // 빈칸 높이정보
	      var upBlankHeight = e.pageY - startPositionDff - scrollbaryStartPosition + scrollyHandlePosition;

	      if (upBlankHeight <= 0) {
	        self.state.renderFromRenderedIndex = 0;
	        self.state.translateY = 0;
	      } else if ((upBlankHeight+scrollbaryHeight) >= self.state.scrollbaryTrackLength) {
	        // 맨끝에 닿았을때 
	        self.state.scrollyEnd = true;
	        self.state.renderFromRenderedIndex = self.state.lastScrollyIndex;
	        self.state.translateY = self.state.scrollbaryTrackLength - scrollbaryHeight;
	      } else {
	        // blankHeight에 따라 self.state.renderFromRenderedIndex를 설정해준다.
	        self.state.renderFromRenderedIndex = getHeightIndex(upBlankHeight);
	        self.state.translateY = upBlankHeight;
	      }

	      //renderlog('self.state.renderFromRenderedIndex = ' + self.state.renderFromRenderedIndex);
	    }).on('mouseup.'+eventns+self.key, {self:self}, function(e){
	      e.data.self._refreshTimerActivate(false);
	      $(document).off('.'+eventns+e.data.self.key);
	    });
	  });

	  self.$scrollbary.on('mousedown'+eventns,'.scrollbutton', {self:self}, function(e){
	    // y축 스크롤 버튼클릭
	    var self = e.data.self;
	    if (!self.state.scrollyMoveable) return;
	    
	    if(e.target !== this) return;
	    var $target = $(e.target);

	    $(document).off(eventns+self.key);
	    scrollyButtonEvent($target, self.state.scrollbaryHeight);

	    var scrollbaryTimer = null;
	    var scrollbaryInterval = null;
	    scrollbaryTimer = setTimeout(function(){
	      scrollbaryInterval = setInterval(function(){
	        scrollyButtonEvent($target, self.state.scrollbaryHeight);
	      },50);
	      scrollbaryTimer = null;
	    },200);

	    $(document).on('mouseup'+eventns+self.key, {self:self}, function(e){
	      if(scrollbaryTimer) {
	        clearTimeout(scrollbaryTimer);
	      }
	      if(scrollbaryInterval) {
	        clearInterval(scrollbaryInterval);
	      }
	      //document에 걸린 이 그리드 인스턴스의 x축스크롤 이벤트 핸들러만 제거해야 한다.
	      $(document).off(eventns+e.data.self.key);
	    });
	  });
	};
	
	AlopexGrid.prototype._refreshScrollbar = function(){
	  var self = this;

	  var scrollbarxHandle = self.$scrollbarx.find('.scrollhandle');
	  var scrollbarxLeftButton = self.$scrollbary.find('.leftbutton');
	  self.state.scrollxMoveable = true;

	  // x축 스크롤바 넓이 설정
	  if (self.state.wrapperWidth >= self.state.columnWidth) {
	    scrollbarxHandle.width(self.state.scrollbarxTrackLength);
	    self.state.scrollbarxWidth = scrollbarxHandle.width();
	    self.state.scrollxMoveable = false;
//	    self.state.scrollxEnd = true;
	    self.state.translateX = 0;
	    self.state.renderFromColumnIndex = self.state.columnIndexArr[0];
	  } else {
	    // 컬럼 총 길이에 대한 scrollx 길이 비율을 구한다.
	    self.state.scrollxRatio = self.state.wrapperWidth/self.state.columnWidth;
	    // 튀어나온부분은 fixed에 상관없이 전체 width 로 계산한다.
	    var diff = self.state.columnWidth - self.state.wrapperWidth;
	    var translateXWidth = 0;
	    var width;
	    for (var idx in self.state.standardColumnWidthMap) {
	      width = self.state.standardColumnWidthMap[idx];
	      translateXWidth += width;
	      if (translateXWidth > diff) {
	        translateXWidth -= width;
	        // scrollbarx 가 끝에 닿았을때 columnIndex를 세팅한다. (fixedLength 제외)
	        self.state.lastScrollxIndex = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(Number(idx))-self.state.fixedColumnMapping.length];
	        self.state.lastScrollxPixcel = diff - translateXWidth;
	        break;
	      }
	    }
	    
	    var width = self.state.scrollbarxTrackLength*self.state.scrollxRatio;
	    var scrollbarxBtnWidth = scrollbarxLeftButton.width()*2;
	    if (scrollbarxBtnWidth > width) {
        var extraWidth = scrollbarxBtnWidth - width;
        width = scrollbarxBtnWidth;
        self.state.scrollxRatio = (self.state.wrapperWidth-extraWidth)/self.state.columnWidth;
      }
	    scrollbarxHandle.width(width);
	    self.state.scrollbarxWidth = width;
	  }
	  // x축 스크롤바 위치선정
	  scrollbarxHandle.css('transform', 'translateX('+ self.state.translateX +'px)');

	  var rowHeight = self.state.renderTargetDataIndexList.length*self.state.rowHeight;
	  var scrollbaryHandle = self.$scrollbary.find('.scrollhandle');
	  var scrollbaryUpButton = self.$scrollbary.find('.upbutton');
	  var wrapperHeight = self.state.wrapperHeight - self.state.headerRowHeight;
	  if (!self.option.header) {
	    wrapperHeight = self.state.wrapperHeight;
	  }
	  // - (pinnedDataIndexList.length*self.state.rowHeight);
	  self.state.scrollyMoveable = true;

	  // y축 스크롤바 길이설정
	  if (wrapperHeight >= rowHeight) {
	    scrollbaryHandle.height(self.state.scrollbaryTrackLength);
	    self.state.scrollyMoveable = false;
	    self.state.translateY = 0;
//	    self.state.scrollyEnd = true;
	    self.state.scrollyRenderedItemLength = self.state.scrollyRenderedItemMaxLength = self.state.renderTargetDataIndexList.length;
	  } else {
	    // 잘리는 부분 제외한 데이터 row length
	    self.state.scrollyRenderedItemLength = Math.floor(wrapperHeight / self.state.rowHeight);
	    // 잘리는 부분 포함한 데이터 row length
	    self.state.scrollyRenderedItemMaxLength = Math.ceil(wrapperHeight / self.state.rowHeight);
	    
	    var pageHeight = self.state.scrollyRenderedItemLength*self.state.rowHeight;
	    if (wrapperHeight > pageHeight) {
	      self.state.lastScrollyPixel = wrapperHeight - pageHeight;
	      self.state.lastScrollyIndex = self.state.renderTargetDataIndexList.length - self.state.scrollyRenderedItemLength -1;
	    } else {
	      self.state.lastScrollyPixel = 0;
	      self.state.lastScrollyIndex = self.state.renderTargetDataIndexList.length - self.state.scrollyRenderedItemLength
	    }
	    
	    self.state.scrollyRatio = self.state.scrollbaryTrackLength/rowHeight;
	    
	    var height = self.state.scrollbaryTrackLength*self.state.scrollyRatio;
	    var scrollbaryBtnHeight = scrollbaryUpButton.height()*2;
	    if (scrollbaryBtnHeight > height) {
	      var extraHeight = scrollbaryBtnHeight - height;
	      height = scrollbaryBtnHeight;
	      self.state.scrollyRatio = (self.state.scrollbaryTrackLength-extraHeight)/rowHeight;
	    }
	    scrollbaryHandle.height(height);
	    self.state.scrollbaryHeight = height;
	  }
	  // y축 스크롤바 위치선정
	  scrollbaryHandle.css('transform', 'translateY('+ self.state.translateY +'px)');
	};

	////////////////////
	// board refresh //
	////////////////////
	AlopexGrid.prototype._refreshBoard = function(forceRefresh) {
		var self = this;

		if(self.state.renderingSuppressed) {
			return;
		}

		if(forceRefresh !== true 
			&& self.state.prevRenderFromRenderedIndex === self.state.renderFromRenderedIndex
			&& self.state.prevRenderFromColumnIndex === self.state.renderFromColumnIndex
			&& self.state.prevWrapperWidth === self.state.wrapperWidth
			&& self.state.prevWrapperHeight === self.state.wrapperHeight
			&& self.state.prevScrollxEnd === self.state.scrollxEnd
			&& self.state.prevScrollyEnd === self.state.scrollyEnd
			&& self.state.prevTranslateX === self.state.translateX
			&& self.state.prevTranslateY === self.state.translateY
			&& self.state.prevColumnIndexArr === self.state.columnIndexArr) {
			//변경된 이력이 없으면 refresh할 필요가 없다.
			return;
		}
		//renderlog('forcerefresh',forceRefresh);
		//renderlog('refresh - renderFrom (r,c)',self.state.renderFromRenderedIndex,self.state.renderFromColumnIndex,
		//	self.state.scrollyEnd, self.state.scrollxEnd,self.state.renderTargetDataIndexList.length);
		//renderlog('board dimension (w,h)', self.state.wrapperWidth, self.state.wrapperHeight);
		//tick();
		//var time = [];
		self.state.prevRenderFromRenderedIndex = self.state.renderFromRenderedIndex;
		self.state.prevRenderFromColumnIndex = self.state.renderFromColumnIndex;
		self.state.prevWrapperWidth = self.state.wrapperWidth;
		self.state.prevWrapperHeight = self.state.wrapperHeight;
		self.state.prevScrollxEnd = self.state.scrollxEnd;
		self.state.prevScrollyEnd = self.state.scrollyEnd;
		self.state.prevTranslateX = self.state.translateX;
		self.state.prevTranslateY = self.state.translateY;
		self.state.prevColumnIndexArr = self.state.columnIndexArr;

		self._refreshPagingUnit(forceRefresh);

		self._refreshHeaderCells(forceRefresh);//헤더셀을 refresh하거나 새로 그린다.
		//time.push(tock());
		//renderlog('header');
		//tick();
		self._refreshBodyCells(forceRefresh);//바디셀을 refresh하거나 새로 그린다.
		//time.push(tock());
		//renderlog('body');
		//tick();
		self._refreshScrollbar(forceRefresh);//스크롤바의 크기를 현재 스크롤 현황에 맞게 고친다.
		//time.push(tock());//renderlog('scrollbar');
		//renderlog('[refresh time] header ',time[0]+'ms ','body ',time[1]+'ms scrollbar ',time[2]+'ms');

	};

	//데이터 순서/갯수가 바뀐 상태로 다시 그려야 한다면 calcAndRedraw 를 수행한다.
	AlopexGrid.prototype.calcAndRedraw = function() {
		var self = this;
		if(self.state.renderingSuppressed) {
			return;
		}
		self._sortInternalData();
		self._generateRenderTarget();
		self.viewUpdate();
	};
	AlopexGrid.prototype.filterAndRedraw = function() {
		var self = this;
		if(self.state.renderingSuppressed) {
			return;
		}
		self._generateRenderTarget();
		self.viewUpdate();
	};
	
	//데이터 순서/갯수 등이 바뀌지 않았다면 redraw만 수행한다.
	AlopexGrid.prototype.redraw = function() {
		var self = this;
		if(self.state.renderingSuppressed) {
			return;
		}
		self.viewUpdate();
	};

	
	//self._getFilteredDataList([filterObject1, filterObject2], self.state.data);
	AlopexGrid.prototype._getFilteredDataList = function(filterList, dataList) {
		var self = this;
		var failed = false;
		var newList = [];
		var filterLength = filterList.length;
		var isAlreadyFiltered = false;
		for(var i=0,l=dataList.length;i<l;i++) {
			var data = dataList[i];
			isAlreadyFiltered = false;
			for(var j=0;j<filterLength;j++) {
				var filter = filterList[j];
				if($.isPlainObject(filter)) {
					filter = self._filterDataToFunction(filter);
				}
				if($.isFunction(filter)) {
					if(filter(data) !== true) {
						isAlreadyFiltered = true;
						continue;
					}
				}
			}
			if (!isAlreadyFiltered) {
				newList.push(data);
			}
		}
		return newList;
	};
	//렌더링 대상을 결정한다.
	AlopexGrid.prototype._generateRenderTarget = function(){
		var self = this;
		//정렬한 뒤 현재의 실제 렌더링 목표를 결정한다.

		var vdata = self.state.data;
		var targetDataList = [];
		var targetData = [];
		var renderTargetDataList = [];
		var renderTargetData = [];

		var pagingObject = {
			"enabled" : null,
			"current" : null,
			"total" : null,
			"dataLength" : null,
			"pageDataLength" : null,
			"perPage" : null,
			"pagerCount" : null
		};
		var pagingOption = self.option.paging || {};

		//렌더링시 필요한 필수 정보
		var serverPaging = pagingOption.customPaging;
		var doPaging = pagingObject["enabled"] = !!self.option.pager;
		pagingObject["pagerCount"] = pagingOption["pagerCount"] || 10;
		pagingObject["current"] = (serverPaging ? serverPaging["current"] : pagingOption["current"]) || 1;
		pagingObject["perPage"] = serverPaging ? serverPaging["perPage"] : pagingOption["perPage"];
		
		var doFilter = $.isPlainObject(self.state.filter);
		self.state.filterApplied = false;
		var doFold = self.state.folded && self.state.folded.length;
		
		for(var dataIndex = 0,dataLength = vdata.length; dataIndex < dataLength; dataIndex++) {
			var data = vdata[dataIndex];
			delete data._index.row;
			delete data._index.rendered;
			data._state.filtered = false;
			if(doFilter) {
				var failed = false;
				$.each(self.state.filter, function(filterName,filter){
					if($.isPlainObject(filter)) {
						filter = self._filterDataToFunction(filter);
					}
					if($.isFunction(filter)) {
						if(filter(data) !== true) {
							failed = true;
							return false;
						}	
					}
				});
				if(failed) {
					//하나라도 걸러진 데이터가 있다면 filter가 적용된 것이다.
					self.state.filterApplied = true;
					continue;
				}
				data._state.filtered = true;
			}
			if(doFold) {
				var groupBy = self.option.grouping.by;
				groupBy = $.isArray(groupBy) ? groupBy : [groupBy];
				var groupByLength = groupBy.length;
				var outerContinue = true;
				for(var g=0;g<groupByLength;g++) {
					var r = (self._isDataFolded(data,g));
					if(r===true) {
						outerContinue = false;
						break;
					} else if(r==="unfold" || r==="unfold-line") {
						outerContinue = true;
						break;
					}
				}
				if(!outerContinue) continue;
			}

			targetDataList.push(dataIndex);
			targetData.push(data);
		}
		if(serverPaging) {
			pagingObject["total"] = serverPaging["total"];
		}
		else if(!targetDataList.length) {
			pagingObject["total"] = 0;
		} else {// if(!pagingObject["total"]) {
			pagingObject["total"] = Math.floor(targetDataList.length / pagingObject["perPage"]) 
				+ ((targetDataList.length % pagingObject["perPage"]) ? 1 : 0);
		}

		var pagingFrom = null;
		var pagingTo = null;
		if(doPaging) {
			pagingFrom = (pagingObject["current"] - 1) * pagingObject["perPage"];
			pagingTo = (pagingObject["current"] * pagingObject["perPage"]) - 1;
		}

		var renderedIndex = 0;
		for(var i=0,l=targetData.length;i<l;i++) {
			if(doPaging && !serverPaging && (i < pagingFrom || pagingTo < i)) {
				continue;
			}

			var data = targetData[i]

			data._index.row = data._index.rendered = renderedIndex++;
			renderTargetDataList.push(targetDataList[i]);
			renderTargetData.push(data);
		}

		pagingObject["dataLength"] = serverPaging ? serverPaging["dataLength"] : targetDataList.length;
		pagingObject["pageDataLength"] = renderTargetDataList.length;

		//filter - 제외목록
		//fold - 제외목록, cell렌더링은 접힌녀석 중 하나이상의 행을 보게 된다.
		//pin - 데이터 순서에 상관없이 무조건 상위에 배치? 현재는 rowPin()을 이용한 것만 허용할 예정이니 기본적으로 이와 같이 된다.
		//      상위배치의 이유.
		//paging - 최종 나온 목록에서 페이징을 적용하여 일부분만 보이게 한다.
		
		if(doFilter) {
			self.state.filteredDataIndexList = targetDataList;
			self.state.filteredDataList = targetData;
		} else {
			delete self.state.filteredDataIndexList;
			delete self.state.filteredDataList;
		}

		self.state.renderTargetDataIndexList = renderTargetDataList;
		self.state.renderTargetDataList = renderTargetData;

		self.state.pagingInfo = pagingObject;

		//최종 렌더링목표가 결정되면 현재 기준의 rowspan 정보가 정의되어야 refreshBoard 등에서 참조할 수 있다.
	};

	//dataId 또는 row element 기준으로 처리한다
	function saveRowHeight(self, row) {
		var height = row.style.height;
		self.state.rowHeightMapByDataId[typeof row === "string" ? row : row.getAttribute('data-alopexgrid-dataid')] = parseInt(height);
//		$.data(row, {'alopexGridRowHeight':height});
	}
	function readRowHeight(self, row) {
		return self.state.rowHeightMapByDataId[typeof row === "string" ? row : row.getAttribute('data-alopexgrid-dataid')];
	}
	
	AlopexGrid.prototype._rowResizeStart = function(e, renderedIndex) {
		if(!e || !e.type) return;
		var self = this;
		if(self.state.rowResizing) {
			return;
		}
		e = $.event.fix(e);
		if(e.which !== 1) {
			return;
		}
		
		if(self.state.$rowResizeBar) {
			self.state.$rowResizeBar.remove();
			self.state.$rowResizeBar = null;
		}
		
		//row height를 저장하는 map 필요
		self.state.rowHeightMapByDataId = self.state.rowHeightMapByDataId || {};
		//row의 높이값 정보를 dataId를 기준으로 저장하게 한다.
		//이 정보는 rowRender 로직에서 사용하게 된다. 이 정보를 사용할 경우 한번 설정된 높이는 저장되어 다시 사용된다.
		//dataSet이 되면 clear된다.
		var $target = $(e.target);
		var $cell = $target.closest('.bodycell');
		var dataId = $cell.attr('data-alopexgrid-dataid');
		
		if(e.type === 'dblclick') {
			//console.log('auto resize function');
			return;
		}
		
		var startPageY = e.pageY;
		var startTop = ($cell.offset().top - self.$wrapper.offset().top) + $cell.height();
		
		var $bar = $('<div class="resize-align">');
		$bar.css({
			"position": "absolute",
			"top":"0px",
			"z-index":"99998",
			//"top": startTop+"px",
			"transform":"translateY("+startTop+"px)",
			"left": "0px",
			"border": "1px dotted black",
			"width": Math.round(self.$wrapper.prop('clientWidth')*1.5) + "px"
		});
		var $pos = $bar.clone();
		$pos.css('border','1px dashed #afafaf').appendTo(self.$wrapper);
		$bar.appendTo(self.$wrapper);
		self.state.$rowResizeBar = $bar;
		
		$(document.body)
		.on('mousemove.alopexgridRowResize.'+self.key+self.eventns, {self:self,$bar:$bar,startPageY:startPageY, startTop:startTop}, function(e){
			//$bar.css('top',e.data.startTop + (e.pageY - e.data.startPageY)+'px');
			$bar.css('transform','translateY('+(e.data.startTop + (e.pageY - e.data.startPageY))+'px)');
		})
		.on('mouseup.alopexgridRowResize.'+self.key+self.eventns, {self:self,$bar:$bar,$pos:$pos,startPageY:startPageY, 
						startTop:startTop, renderedIndex:renderedIndex, dataId : dataId, $cell : $cell}, 
		function(e){
			$(document.body).off('.alopexgridRowResize');
			e.data.$bar.remove();
			e.data.$pos.remove();
			var prevHeight = parseInt(e.data.$cell.css('height'));
			var change = e.pageY - e.data.startPageY;
			e.data.self.state.rowHeightMapByDataId[e.data.dataId] = Math.max(3,prevHeight + change);
			e.data.self._refreshBoard(true);
		});
	};
	
	//이벤트 핸들러 기능을 하므로 일반 호출 불가.
	AlopexGrid.prototype._columnResizeStart = function(e, column) {
	  e.preventDefault();
		//console.log(e);
		if (!e || !e.type) {
			return;
		}
		
		var self = this;
		var $target = $(e.target);
		var $cell = $(e.target).closest('.headercell');
		var cell = $cell[0];
		var bar = $('<div class="resize-align">')[0];
		var barLeft = parseInt(cell.style.left) + parseInt(cell.style.width) + 'px';
		var resizeBarWidth = e.target.offsetWidth;
		var data = {self:this, bar:bar, prevX:0, totalMoveAmount:0, columnIndex:column};
			
		//hide subtitle인 헤더그룹에 여러개의 resize handler이 있는 경우
		if($target.siblings('.resizing-handle').length > 0) {
			barLeft = ($cell.position().left + $target.position().left + $target.width()) + 'px';
//			var siblings = $(e.target).siblings();
//			for(var i=0; i<siblings.length; i++){
//				//console.log('siblings', siblings[i]);
//				if(siblings[i].className === 'resizing-handle') {
//					barLeft = parseInt(e.target.style.left) + parseInt(cell.style.left) + resizeBarWidth + 'px';
//					break;
//				}
//					
//			}
		}

		bar.style.top = '0px';
		bar.style.left = barLeft;
		bar.style.height = parseInt(self.state.wrapperHeight*1.5) + 'px';
		self.$wrapper[0].appendChild(bar);

		self.state.resizing = true;
		data.prevX = parseInt(e.pageX);
		//console.log('mousedown');

		$(document).on('mousemove.alopexgridresizeevent' + self.eventns+self.key, data, resizeMoveHandler)
			.on('mouseup.alopexgridresizeevent' + self.eventns+self.key, data, resizeUpHandler);
	};
	
	function resizeMoveHandler(e) {
		//console.log('mousemove');
		if(e.data.self.state.resizing){
			var moveAmount = e.pageX - e.data.prevX;
			e.data.prevX = e.pageX;
			e.data.totalMoveAmount = e.data.totalMoveAmount + moveAmount;
			e.data.bar.style.left = parseInt(e.data.bar.style.left) + moveAmount + 'px';
		}
	}
	
	function resizeUpHandler(e) {
		var self = e.data.self;
		//console.log('mouseup');
		var newWidth = parseInt(self.state.columnIndexToMapping[e.data.columnIndex].width) + e.data.totalMoveAmount;
		if(newWidth < 10) newWidth = 10;
		self.state.resizing = false;
		e.data.bar.style.display = 'none';
		self.state.columnIndexToMapping[e.data.columnIndex].width = newWidth + 'px';
		if(self.state.headerSelection) {
			var from = self.state.headerSelection.from;
			var to = self.state.headerSelection.to;
			
			for(var ci = from; ci <= to; ci++) {
				var mapping = self.state.columnIndexToMapping[ci];
				if(mapping) {
					mapping.width = newWidth + 'px';
				}
			}
		}
		
		// 스크롤이 끝에있을때 컬럼 width 가 줄어들면 translateX 값을 보정해준다.
		if (e.data.totalMoveAmount > 0) {
		  self.state.scrollxEnd = false;
		}

		self.redraw();
		$(document).off('.alopexgridresizeevent' + self.eventns+e.data.self.key);
		self.$wrapper[0].removeChild(e.data.bar);
	}
	
	/**
	 * $(grid).alopexGrid('sortToggle', columnIndex or key, direction)
	 * 정렬을 column index 또는 key 기준으로 수행. 현재 렌더링된 데이터에 대해서 정렬 가능.
	 */
	AlopexGrid.prototype.sortToggle = function(column, dir) {
		if(typeof column === "string") { //key값 명시를 시도한 경우.
			for(var i=0,l=this.option.columnMapping.length;i<l;i++) {
				var m = this.option.columnMapping[i];
				if(m && m.columnIndex !== undefined && m.columnIndex !== null
						&& (typeof m.key === "string") && m.key === column) {
					column = Number(m.columnIndex);
					break;
				}
			}
		}
		return this._sortToggle(column, dir, false);
	};
	AlopexGrid.prototype.dataSort = function(column, dir, sortingMulti) {
		var self = this;
		if(!dir) dir = "asc";
		if($.isArray(column)) {
			column = $.extend(true, [], column);
			var head = column.shift();
			sortingMulti = column;
			column = self.state.columnKeyToIndexMap[head.sortingKey];
			if(!_valid(column)) column = head.sortingColumn;
			dir = head.sortingDirection || "asc";
			if(!sortingMulti.length) sortingMulti = undefined;
		}
		if(!$.isArray(sortingMulti)) {
			delete self.state.sortingMulti;
			return self.sortToggle(column, dir);
		}
		sortingMulti = $.extend(true, [], sortingMulti);
		self.state.sortingColumn = column;
		self.state.sortingKey = self.state.columnIndexToKeyMap[column];
		self.state.sortingDirection = dir || "asc";
		self._processSortingMulti(sortingMulti);
		self.calcAndRedraw();
	}
	AlopexGrid.prototype._sortToggle = function(column, dir, e) {
		var self = this;
		var columnIndex = column;
		if (self.state.disableSort) {
			return;
		}
		if (e) {
			e = $.event.fix(e);
			var $target = $(e.target);
			//resize에 의해 sort cell에 click이벤트가 발생하는 경우가 있다. 이를 방지.
			if ($(e.target).hasClass("resizing-handle")) {
				return;
			}
			if (columnIndex === undefined || columnIndex === null) {
				var $cell = $target.hasClass('headercell') ? $target : $target.parentsUntil(self.$wrapper, '.cell').eq(0);
				columnIndex = $cell.attr('data-alopexgrid-columnindex');
			}
			clearSelection();
			if((e.type==="click" || e.type.indexOf("mouse")>=0) && e.which !== 1) {
				return;
			}
		}

		if (columnIndex === undefined || columnIndex === null) {
			return;
		}

		function valueCorrector() {
			columnIndex = Number(columnIndex);
			if (self.state.hasOwnProperty('sortingColumn') && self.state.sortingColumn !== undefined && self.state.sortingColumn !== null && Number(self.state.sortingColumn) !== Number(columnIndex)) {
				delete self.state.sortingDirection;
			}
			if(self.state.sortingMulti) {
				delete self.state.sortingDirection;
			}
			if (dir === "desc" || (!dir && self.state.sortingDirection === "asc")) {
				self.state.sortingDirection = 'desc';
			} else if (dir === "asc" || (!dir && self.state.sortingDirection === "desc")) {
				self.state.sortingDirection = 'asc';
			} else {
				self.state.sortingDirection = 'asc';
			}
			self.state.sortingColumn = Number(columnIndex);
		}
		//valueCorrector();
		if(e && e.shiftKey) {
			self.state.sortingMulti = self.state.sortingMulti || [];
			var already = self.state.sortingColumn === columnIndex ? columnIndex : $.grep(self.state.sortingMulti, function(sm,ii){
				if(sm.sortingColumn === columnIndex || self.state.columnKeyToIndexMap[sm.sortingKey] === columnIndex) {
					return true;
				}
			});
			if($.type(already)==="number") {
				self.state.sortingDirection = self.state.sortingDirection ==="desc" ? "asc" : "desc";
			}
			else if(already.length) {
				already[0].sortingDirection = already[0].sortingDirection === "desc" ? "asc" : "desc";
			} else {
				self.state.sortingMulti.push({sortingColumn:columnIndex,sortingDirection:"asc"});
			}
		} else {
			valueCorrector();
			delete self.state.sortingMulti;
		}

		var tret = null;
		var eventData = {};
		var sortingMapping = _getMappingFromColumnIndex(self, self.state.sortingColumn);
		eventData["key"] = sortingMapping.key;
		eventData["column"] = sortingMapping.columnIndex;
		eventData["direction"] = self.state.sortingDirection;
		eventData["mapping"] = sortingMapping;
		eventData["paging"] = self.pageInfo();
		tret = self._triggerGridEvent('sortToggle', eventData);
		if(tret === false) {
			return;
		}

		self._scrollerReset();
		self.calcAndRedraw();

	};
	var lasthoverenterY = -100;
	var lasthoverleaveY = -100;
	AlopexGrid.prototype._hoverEnter = function(row, e) {
		var self = this;
		if (AlopexGrid.dragObject) {
			return;
		}
		var y = e.clientY;
		if (lasthoverenterY === y) {
			return;
		}
		lasthoverenterY = y;
		//TODO
	};
	AlopexGrid.prototype._hoverLeave = function(row, e) {
		var self = this;
		if (AlopexGrid.dragObject) {
			return;
		}
		var y = e.clientY;
		if (lasthoverleaveY === y) {
			return;
		}
		lasthoverleaveY = y;
		var $this = $(row);
		if (!$this.hasClass('hovering')) {
			return;
		}
		//TODO
	};
	AlopexGrid.prototype.cellElementGet = function(query, columnIK) {
		return this._elementGet(query, columnIK);
	};
	AlopexGrid.prototype.rowElementGet = function(query) {
		return this._elementGet(query, null);
	};
	AlopexGrid.prototype._elementGet = function(query, columnIK) {
		var self = this;
		var $cell = $();
		if(self.state.refreshbodycell) {
			var data = self.dataGet(query);
			var idlist = []
			for(var i in data) {
				idlist.push('.'+data[i]._index.id);
			}
			$cell = self.$wrapper.find(idlist.join(','));
			if(typeof columnIK === "number" && columnIK >= 0) {
				$cell = $cell.filter(function(idx,cell){
					return cell.getAttribute('data-alopexgrid-columnindex') === String(columnIK);
				});
			} else if(typeof columnIK === "string") {
				$cell = $cell.filter(function(idx,cell){
					return cell.getAttribute('data-alopexgrid-key') === String(columnIK);
				});
			}
		}
		return $cell;
	};
	AlopexGrid.prototype.refreshRow = function(query, elementget) {
		var self = this;
		var dataList = self.dataGet(query);
		var dataIndexList = [];
		if(dataList && dataList.length) {
			for(var i=0,l=dataList.length;i<l;i++) {
				var data = dataList[i];
				if(!data) continue;
				dataIndexList.push(data._index.data);
			}
			self._refreshBodyCells({"dataIndexList":dataIndexList});
		}
	};
	AlopexGrid.prototype.refreshCell = function(query, columnIndexKey, elementget) {
		var self = this;
		var dataList = self.dataGet(query);
		var dataIndexList = [];
		if(dataList && dataList.length) {
			for(var i=0,l=dataList.length;i<l;i++) {
				var data = dataList[i];
				if(!data) continue;
				dataIndexList.push(data._index.data);
			}
			var columnIndex = typeof columnIndexKey === "number" ? columnIndexKey :
				getColumnIndexByKey(self.option.columnMapping, columnIndexKey);
			self._refreshBodyCells({"dataIndexList":dataIndexList,"columnIndexList":[columnIndex]});
		}
	};
	function _getMappingByQuery(columnMapping, query, self, data) {
		for(var ci in columnMapping) {
			var mapping = columnMapping[ci];
			for(var prop in query) {
				if(mapping.hasOwnProperty(prop)) {
					if(typeof mapping[prop] === "string" && String(query[prop]) === mapping[prop]) return mapping;
					else if(typeof mapping[prop] === "number" && Number(query[prop]) === mapping[prop]) return mapping;
					else if(mapping[prop] === query[prop]) return mapping;
				}
			}
			var multiTemp = null;
			if(($.isFunction(mapping.multi) && $.isArray(multiTemp=mapping.multi.call(self, data[mapping.key], data, mapping)))
					|| $.isArray(mapping.multi)) {
				var r = _getMappingByQuery(multiTemp || mapping.multi, query, self, data);
				if(r) return r;
			}
		}
		return false;
	}

	function getTextBoundingRect(input, selectionStart, selectionEnd, debug) {
	    // Basic parameter validation
	    if(!input || !('value' in input)) return input;
	    if(typeof selectionStart == "string") selectionStart = parseFloat(selectionStart);
	    if(typeof selectionStart != "number" || isNaN(selectionStart)) {
	        selectionStart = 0;
	    }
	    if(selectionStart < 0) selectionStart = 0;
	    else selectionStart = Math.min(input.value.length, selectionStart);
	    if(typeof selectionEnd == "string") selectionEnd = parseFloat(selectionEnd);
	    if(typeof selectionEnd != "number" || isNaN(selectionEnd) || selectionEnd < selectionStart) {
	        selectionEnd = selectionStart;
	    }
	    if (selectionEnd < 0) selectionEnd = 0;
	    else selectionEnd = Math.min(input.value.length, selectionEnd);
	    
	    // If available (thus IE), use the createTextRange method
	    if (typeof input.createTextRange == "function") {
	        var range = input.createTextRange();
	        range.collapse(true);
	        range.moveStart('character', selectionStart);
	        range.moveEnd('character', selectionEnd - selectionStart);
	        return range.getBoundingClientRect();
	    }
	    // createTextRange is not supported, create a fake text range
	    var offset = getInputOffset(),
	        topPos = offset.top,
	        leftPos = offset.left,
	        width = getInputCSS('width', true),
	        height = getInputCSS('height', true);

	        // Styles to simulate a node in an input field
	    var cssDefaultStyles = "white-space:pre;padding:0;margin:0;",
	        listOfModifiers = ['direction', 'font-family', 'font-size', 'font-size-adjust', 'font-variant', 'font-weight', 'font-style', 'letter-spacing', 'line-height', 'text-align', 'text-indent', 'text-transform', 'word-wrap', 'word-spacing'];

	    topPos += getInputCSS('padding-top', true);
	    topPos += getInputCSS('border-top-width', true);
	    leftPos += getInputCSS('padding-left', true);
	    leftPos += getInputCSS('border-left-width', true);
	    leftPos += 1; //Seems to be necessary

	    for (var i=0; i<listOfModifiers.length; i++) {
	        var property = listOfModifiers[i];
	        cssDefaultStyles += property + ':' + getInputCSS(property) +';';
	    }
	    // End of CSS variable checks

	    var text = input.value,
	        textLen = text.length,
	        fakeClone = document.createElement("div");
	    if(selectionStart > 0) appendPart(0, selectionStart);
	    var fakeRange = appendPart(selectionStart, selectionEnd);
	    if(textLen > selectionEnd) appendPart(selectionEnd, textLen);

	    // Styles to inherit the font styles of the element
	    fakeClone.style.cssText = cssDefaultStyles;

	    // Styles to position the text node at the desired position
	    fakeClone.style.position = "absolute";
	    fakeClone.style.top = topPos + "px";
	    fakeClone.style.left = leftPos + "px";
	    fakeClone.style.width = width + "px";
	    fakeClone.style.height = height + "px";
	    document.body.appendChild(fakeClone);
	    var returnValue = fakeRange.getBoundingClientRect(); //Get rect
	    
	    if (!debug) fakeClone.parentNode.removeChild(fakeClone); //Remove temp
	    return returnValue;

	    // Local functions for readability of the previous code
	    function appendPart(start, end){
	        var span = document.createElement("span");
	        span.style.cssText = cssDefaultStyles; //Force styles to prevent unexpected results
	        span.textContent = text.substring(start, end);
	        fakeClone.appendChild(span);
	        return span;
	    }
	    // Computing offset position
	    function getInputOffset(){
	        var body = document.body,
	            win = document.defaultView,
	            docElem = document.documentElement,
	            box = document.createElement('div');
	        box.style.paddingLeft = box.style.width = "1px";
	        body.appendChild(box);
	        var isBoxModel = box.offsetWidth == 2;
	        body.removeChild(box);
	        box = input.getBoundingClientRect();
	        var clientTop  = docElem.clientTop  || body.clientTop  || 0,
	            clientLeft = docElem.clientLeft || body.clientLeft || 0,
	            scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop  || body.scrollTop,
	            scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
	        return {
	            top : box.top  + scrollTop  - clientTop,
	            left: box.left + scrollLeft - clientLeft};
	    }
	    function getInputCSS(prop, isnumber){
	        var val = document.defaultView.getComputedStyle(input, null).getPropertyValue(prop);
	        return isnumber ? parseFloat(val) : val;
	    }
	}
	function setCaretPosition(ctrl, pos){
		if(ctrl.setSelectionRange)
		{
			ctrl.focus();
			ctrl.setSelectionRange(pos,pos);
		}
		else if (ctrl.createTextRange) {
			var range = ctrl.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
	function _getSelectionTextInfo(el) {
		var atStart = false, atEnd = false;
		var selRange, testRange;
		if (window.getSelection) {
			var sel = window.getSelection();
			if (sel.rangeCount) {
				selRange = sel.getRangeAt(0);
				testRange = selRange.cloneRange();

				testRange.selectNodeContents(el);
				testRange.setEnd(selRange.startContainer, selRange.startOffset);
				atStart = (testRange.toString() == "");

				testRange.selectNodeContents(el);
				testRange.setStart(selRange.endContainer, selRange.endOffset);
				atEnd = (testRange.toString() == "");
			}
		} else if (document.selection && document.selection.type != "Control") {
			selRange = document.selection.createRange();
			testRange = selRange.duplicate();

			testRange.moveToElementText(el);
			testRange.setEndPoint("EndToStart", selRange);
			atStart = (testRange.text == "");

			testRange.moveToElementText(el);
			testRange.setEndPoint("StartToEnd", selRange);
			atEnd = (testRange.text == "");
		}

		return { atStart: atStart, atEnd: atEnd };
	}
	function _placeCaretAtEnd(el) {
		if (typeof window.getSelection != "undefined"
			&& typeof document.createRange != "undefined") {
			var range = document.createRange();
			range.selectNodeContents(el);
			range.collapse(false);
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		} else if (typeof document.body.createTextRange != "undefined") {
			var textRange = document.body.createTextRange();
			textRange.moveToElementText(el);
			textRange.collapse(false);
			textRange.select();
		}
	}
	function _moveCaret(charCount) {
		var sel, range;
		win = window;
		if (win.getSelection) {
			sel = win.getSelection();
			if (sel.rangeCount > 0) {
				var textNode = sel.focusNode;
				var newOffset = sel.focusOffset + charCount;
				sel.collapse(textNode, Math.min(textNode.length, newOffset));
			}
		} else if ( (sel = win.document.selection) ) {
			if (sel.type != "Control") {
				range = sel.createRange();
				range.move("character", charCount);
				range.select();
			}
		}
	}
	function insertTextAtCaret(elem,text) {
	    var txtarea = elem;
	    var scrollPos = txtarea.scrollTop;
	    var strPos = 0;
	    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
	        "ff" : (document.selection ? "ie" : false ) );
	    if (br == "ie") { 
	        txtarea.focus();
	        var range = document.selection.createRange();
	        range.moveStart ('character', -txtarea.value.length);
	        strPos = range.text.length;
	    }
	    else if (br == "ff") strPos = txtarea.selectionStart;

	    var front = (txtarea.value).substring(0,strPos);  
	    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
	    txtarea.value=front+text+back;
	    strPos = strPos + text.length;
	    if (br == "ie") { 
	        txtarea.focus();
	        var range = document.selection.createRange();
	        range.moveStart ('character', -txtarea.value.length);
	        range.moveStart ('character', strPos);
	        range.moveEnd ('character', 0);
	        range.select();
	    }
	    else if (br == "ff") {
	        txtarea.selectionStart = strPos;
	        txtarea.selectionEnd = strPos;
	        txtarea.focus();
	    }
	    txtarea.scrollTop = scrollPos;
	}

	AlopexGrid.prototype._setCursorUnderPointer = function($cell, pageX, pageY){
		var self = this;
		try {
			var $input = $cell.find('input,select,textarea').eq(0);
			if($input.length) {
				var tagName = $input.prop('tagName');
				if(tagName === "SELECT") {
					$input.focus();
				} else {
					var t = null;
					var c = 0;
					var lastx = -1;
					var lasty = -1;
					do {
						t = getTextBoundingRect($input[0],c);
						if( /*(t.top <= pageY && pageY <= t.bottom) &&*/ t.left > pageX) {
							if(Math.abs(lastx - 1 - pageX) <= Math.abs(t.left - 1 - pageX)) {
								c = c - 1;
							}
							break;
						}
						if(lastx === t.left && lasty === t.top) break;
						lastx = t.left;
						lasty = t.top;
						c++;
					} while (t);
					setCaretPosition($input[0],c);
				}
			}
		} catch(te){
			$cell.find('input,select,textarea').eq(0).focus();
		}
	};
	AlopexGrid.prototype._cellEditUpdate = function(cell, dataid, key, e) {
		var self = this;
		var mapping = null;
		var data = null;
		var dataIndex = null;
		//var row = null;
		if($.isPlainObject(dataid) && dataid._index.id) {
			data = dataid;
			dataid = data._index.id;
			dataIndex = data._index.data;
		}
		while (!cell.attributes["data-alopexgrid-columnindex"]) {
			cell = cell.parentNode;
			if (!cell) {
				return;
			}
		}
		// if(!_valid(dataid) && cell) {
		// 	row = cell.parentNode;
		// 	dataid = row.attributes['data-alopexgrid-dataid'].value;
		// }

		if(!_valid(dataid)) return;

		if(!data) {
			// $.each(self.state.data, function (idx, dat) {
			// 	if (dat._index.id === dataid) {
			// 		data = dat;
			// 		dataIndex = data._index.data;
			// 		return false;
			// 	}
			// });
			data = self.state.data[self.state.dataIdToIndexMap[dataid]];
			dataIndex = data._index.data;
		}

		if (!data) {
			return;
		}
		if (key === undefined || key === null || typeof key === "number") {
			var columnIndex = typeof key === "number" ? key : cell.attributes['data-alopexgrid-columnindex'].value;
			if (columnIndex === undefined || columnIndex === null) {
				return;
			}
			columnIndex = Number(columnIndex);
			//mapping = _getMappingByQuery(self.option.columMapping, {columnIndex:columnIndex}, self, data);
			mapping = _getMappingFromColumnIndex(self, columnIndex);
		} else if (typeof key === "object" && key.hasOwnProperty('columnIndex')) {
			mapping = key;
		} else if (typeof key === "string") {
			mapping = _getMappingByQuery(self.option.columnMapping, {key:key}, self, data);
		}
		if (mapping && mapping.editable) {
			if($.isFunction(mapping.allowEdit)) {
				var result = self._evaluateAllowEdit(data, mapping);
				if(result === false) {
					return;
				}
			}

			//var prevData = $.extend(true, {}, data, AlopexGrid.trimData(data._state.recent));
			var extractedValue = _extractValue.call(self, mapping, $(cell), data);
			//var newData = $.extend(true, {}, data, AlopexGrid.trimData(data._state.recent));
			var refreshed = [];
			if(self._isEditingCell(data._index.rendered, mapping.columnIndex)) {
				self.state.editingCellInfo["value"] = extractedValue;
			} else {
				data._state.recent = data._state.recent || {};
				var prevValue = data._state.recent.hasOwnProperty(mapping.key) ?
						data._state.recent[mapping.key] : data[mapping.key];

				var prevData = $.extend(true, {}, data, AlopexGrid.trimData(data._state.recent));
				var value = data._state.recent[mapping.key] = extractedValue;
				var newData = $.extend(true, {}, data, AlopexGrid.trimData(data._state.recent));
				if(prevValue !== value) {
					if(self.option.mergeEditingImmediately) {
						if(!data._state._beforeEditing) {
							data._state._beforeEditing = AlopexGrid.trimObject(data);
						}
						if(!data._state.edited) {
							data._original = AlopexGrid.trimObject(data);
							self.rowElementGet(data).addClass('edited');
							data._state._beforeEditing._state = {edited:false};
						}
						data[mapping.key] = value;
						if(self.option.fullCompareForEditedState) {
							data._state.edited = false;
							if(data._original) {
								$.each(data._original, function(k,v){
									if(v !== data[k]) {
										data._state.edited = true;
										return false;
									}
								});
							}
						} else {
							data._state.edited = true;	
						}
					}
					//refresh other columns which are depend on this column
					for(var j=0;j<self.option.columnMapping.length; j++) {
						var targetmapping = self.option.columnMapping[j];
						if(!_valid(targetmapping.columnIndex) || !$.isPlainObject(targetmapping)) continue;
						if(Number(targetmapping.columnIndex) === Number(mapping.columnIndex)) continue;
						if(targetmapping.hasOwnProperty('refreshBy')) {
							var doit = false;
							var cond = targetmapping.refreshBy;
							if(cond === true) {
								doit = true;
							}
							else if(typeof cond === "string" && cond === mapping.key) {
								doit = true;
							}
							else if($.isArray(cond)
									&& ($.inArray(mapping.key, cond)>=0
											|| $.inArray(Number(mapping.columnIndex), cond)>=0)
							) {
								doit = true;
							}
							else if($.isFunction(cond)) {
								var op = {};
								op["prevData"] = prevData;
								op["newData"] = newData;
								op["_key"] = targetmapping.key;
								op["_column"] = targetmapping.columnIndex;
								op["_index"] = $.extend({}, data._index);
								op["mapping"] = targetmapping;
								op["done"] = function() {
									var $cell = self.refreshCell({_index:{data:this._index.data}}, this._column);
									$.isFunction(this["_done"]) ? this["_done"]() : null;
									$cell ? $cell.find('input,select,textarea').trigger('change') : null;
									this.complete = true;
								};

								var res = cond.call(op, prevData, newData, targetmapping,
										(function(worker){
											return function(){worker.done();};
										})(op));
								if(res === true) {
									doit = true;
								} else if(res === "async") {
									(function(worker){
										if(!worker.complete) {
											self._showProgress(function(done){
												worker["_done"] = done;
											},0,true);
										}
									})(op);
								}
							}
							if(doit) {
								var $cell = self.refreshCell({_index:{data:dataIndex}}, targetmapping.columnIndex);
								refreshed.push(targetmapping.columnIndex);
								$cell ? $cell.find('input,select,textarea').trigger('change') : null;
							}
						}
					}
				}
				if (self.state.columnRowspanned && self.option.rowspanGroupEdit && self.state.rowspanindex[Number(mapping.columnIndex)]) {
					//span된 값을 동일 범위 key에 배포한다.
					var rindex = _columnRowspanned(self.state.rowspanindex[Number(mapping.columnIndex)], dataIndex, true);
					if (rindex) {
						for (var i = rindex.from; i < rindex.to; i++) {
							if(!self.state.data[i]._state.editing) continue;
							self.state.data[i]._state.recent = self.state.data[i]._state.recent || {};
							self.state.data[i]._state.recent[mapping.key] = value;

							if(mapping.rowspan && refreshed.length && i !== dataIndex && $.inArray(i, refreshed)>=0) {
								//만일 수정된 컬럼이 span되있다면 연결될 수 있는 다른 row를 리프레시한다.
								self.refreshRow({_index:{data:i}});
							}
						}
					}
				}
				if(self.state.groupRowspanned && self.option.rowspanGroupEdit && mapping.rowspan) {
					// var lookupTable = self.state.groupingLookupTable;
					// var key = mapping.key;
					// var lookupTableItem = lookupTable[key] || {};
					// var lookupItem = lookupTableItem[dataIndex];
					//TODO 현재 셀이 rowspan을 하고 있는 범위의 key를 추출해야 한다.
					var lookupItem = self._getGroupingRangeByMapping(dataIndex, mapping);
					if(lookupItem) {
						for(var i=lookupItem.from; i<=lookupItem.to;i++) {
							if(!self.state.data[i]._state.editing) continue;
							self.state.data[i]._state.recent = self.state.data[i]._state.recent || {};
							self.state.data[i]._state.recent[mapping.key] = value;

							if(self.option.mergeEditingImmediately) {
								if(!self.state.data[i]._state._beforeEditing) {
									self.state.data[i]._state._beforeEditing = AlopexGrid.trimObject(self.state.data[i]);
								}
								if(!self.state.data[i]._state.edited) {
									self.state.data[i]._original = AlopexGrid.trimObject(self.state.data[i]);
									self.rowElementGet(self.state.data[i]).addClass('edited');
									self.state.data[i]._state._beforeEditing._state = {edited:false};
								}
								self.state.data[i][mapping.key] = value;
								self.state.data[i]._state.edited = true;
							}
						}
					}
				}
			}

		}
	};
	AlopexGrid.prototype._evaluateAllowEdit = function(data, mapping) {
		var self = this;
		var result = mapping.allowEdit !== false;
		if($.isFunction(mapping.allowEdit)) {
			var targetData = data;
			if(self.option.evaluateAllowEditWithMergedData && data._state.editing) {
				targetData = $.extend({}, targetData, data._state.recent);
			}
			result = mapping.allowEdit(targetData[mapping.key], targetData, mapping);
		}
		return result;
	}
	// AlopexGrid.prototype._evaluateAllowEdit = function(data, mapping) {
	// 	var self = this;
	// 	var result = mapping.allowEdit !== false;
	// 	if($.isFunction(mapping.allowEdit)) {
	// 		var targetData = data;
	// 		if(self.option.evaluateAllowEditWithMergedData && data._state.editing) {
	// 			targetData = $.extend(true, {}, targetData, data._state.recent);
	// 			var isEditingCell = self._isEditingCell(data._index.rendered, mapping.columnIndex);
	// 			if(isEditingCell) {
	// 				var value = self.state.editingCellInfo["value"];
	// 				targetData[mapping.key] = value;
	// 			}
	// 		}
	// 		result = mapping.allowEdit.call(self, targetData[mapping.key], targetData, mapping);
	// 	}
	// 	return result;
	// }

	AlopexGrid.prototype._triggerGridEvent = function(name, data) {
		var ev = null;
		try {
			ev = new Event(name, {"bubbles":true,"cancelable":true});
		} catch(err) {
			ev = document.createEvent('Event');
			ev.initEvent(name, true, true);
		}
		if(data && typeof data === "object") {
			ev["alopexgrid"] = {};
			for(var prop in data) {
				if(data.hasOwnProperty(prop)) {
					ev["alopexgrid"][prop] = data[prop];	
				}
			}
		}
		return this.$root[0].dispatchEvent(ev);
	};
	AlopexGrid.prototype.viewEventUpdate = function(data) {
		var self = this;
		var $r = self.$root;
		var $wrapper = self.$wrapper;
		var option = self.option;
		var eventns = '.alopexgridViewEventUpdate';
		var $document = $(document).off(eventns + self.key);
		var $window = $(window).off(eventns + self.key)
		$r.off(eventns);
		self.$title.off(eventns);
		self.$pager.off(eventns);
		$wrapper.off(eventns);
		self.$focusfixture.off(eventns);
		self.$pager.off(eventns);

		var delegate = [
		{
			target: "cell",
			delegate: ".bodycell"
		}, 
		{
			target : "headercell",
			delegate : ".headercell"
		}
		];
		function extractDataFromEvent(e) {
			var self = e.data.self;
			var cell = this;
			var dataIndex = parseInt(e.currentTarget.getAttribute('data-alopexgrid-dataindex'));
			var columnIndex = parseInt(e.currentTarget.getAttribute('data-alopexgrid-columnindex'));
			var mapping = _getMappingFromColumnIndex(self, columnIndex);
			var data = $.extend(true, {}, self.option.getEditingDataOnEvent ? self._getRecentData(dataIndex) : self.state.data[dataIndex]);
			if(mapping && mapping.key) {
				data["_key"] = mapping.key
			}
			if(mapping && mapping.hasOwnProperty('columnIndex')) {
				data["_column"] = mapping.columnIndex;
			}
			if(!isNaN(columnIndex) && columnIndex >= 0 && data && data._index) {
				data._index["column"] = columnIndex;
			}
			return data;
		}
		function alopexGridEventPopulateForCell(e) {
			var self = e.data.self;
			var data = extractDataFromEvent(e);
			var handle = e.data.handle;
			var handler = typeof handle == "function" ? [handle] : handle;
			for ( var j in handler) {
				var h = handler[j];
				h.call(self, data, e);
			}
		}
		$.each(delegate, function(idx, elem) {
			if (option.on && option.on[elem.target]) { //on.cell
				$.each(option.on[elem.target], function(type, handle) { //on.cell.click
					$wrapper.on(
						(self.option.eventMapping[type] || type) + eventns, 
						elem.delegate, 
						{self:self, handle:handle},
						alopexGridEventPopulateForCell
					);
				});
			}
		});
		
		
		if(self.option.on && self.option.on.focus && typeof self.option.on.focus === "object") {
			for(var eventType in self.option.on.focus) {
				if(typeof eventType !== "string") continue;
				self.$focusfixture.on(
					eventType + eventns, 
					{self:self, handle:self.option.on.focus[eventType]},
					alopexGridEventPopulateForCell
				);
			}
		}

		if(isAlopexMobile) {
			//TODO Event Module Refinement
			var start = isMobile ? 'touchstart' : 'mousedown';
			var move = isMobile ? 'touchmove' : 'mousemove';
			var end = isMobile ? 'touchend' : 'mouseup';
			var cancel = isMobile ? 'touchcancel' : 'mouseup';
			var ns = '.gridtapworkaround';
			function getx(e) {
				return isMobile ? e.originalEvent.touches[0].pageX : e.pageX;
			}
			function gety(e) {
				return isMobile ? e.originalEvent.touches[0].pageY : e.pageY;
			}
			function dist(x1,y1,x2,y2) {
				return ((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2));
			}
			function distTap(o) {
				return dist(o.x,o.y,o.x2,o.y2);
			}
			$r.off(ns).on(start+ns,function(e) {
				self.state._tap = {
						target:e.target,
						x:getx(e),
						y:gety(e),
						x2:getx(e),
						y2:gety(e),
						timestamp:new Date().getTime()
				};

				$(window).off(ns)
				.on(move+ns+self.eventns,function(e) {
					if(!self.state._tap) return;
					self.state._tap.x2 = getx(e);
					self.state._tap.y2 = gety(e);
				})
				.on(end+ns+self.eventns,function(e) {
					if(self.state._tap && self.state._tap.target === e.target) {
						if(distTap(self.state._tap) < 25 && new Date().getTime()-self.state._tap.timestamp < 750) {
							$(e.target).parents().add(e.target).filter('[data-gridtap]').each(function(){
								var attrhandler = $(this).attr('data-gridtap');
								if(attrhandler) {
									var func = new Function('event',attrhandler);
									func.call(this,e);
								}
							});
						}
					}
					self.state._tap = null;
					$(window).off(ns);
				})
				.on(cancel+ns+self.eventns, function(e) {
					self.state._tap = null;
					$(window).off(ns);
				});
			});
		}

		$(document).off('.alopexgrideventinineedit'+self.key);
		if (option.rowInlineEdit) {
			var ev = $.type(option.rowInlineEdit)=="string" ? option.rowInlineEdit : 'dblclick';
			if(isAlopexMobile) ev = 'doubletap';
			
			$wrapper.on('dblclick' + eventns, '.bodycell', {self:self}, function(e){
				if(e.target.tagName === "INPUT") return;
				var $cell = $(this);
				var self = e.data.self;
				var dataIndex = $cell.attr('data-alopexgrid-dataindex');
				var columnIndex = $cell.attr('data-alopexgrid-columnindex');
				if(!_valid(dataIndex) || !_valid(columnIndex)) return;
				dataIndex = parseInt(dataIndex);
				columnIndex = parseInt(columnIndex);
				var pageX = e.pageX;
				var pageY = e.pageY;
				var data = self.state.data[dataIndex];
				if(data._state.editing) {
					self.endEdit({_index:{data:dataIndex}});
				} else {
					self.endEdit();
					self.startEdit({_index:{data:dataIndex}});
					var $newcell = self.cellElementGet({_index:{data:data._index.data}}, columnIndex);
					self._setCursorUnderPointer($newcell, pageX, pageY);
				}
			});
			$wrapper.on('click' + eventns, '.cell', {self:self}, function(e){
				var $cell = $(this);
				var self = e.data.self;
				var dataIndex = parseInt($cell.attr('data-alopexgrid-dataindex'));
				var data = self.state.data[dataIndex];
				if(!data || !data._state.editing) {
					var hasEditing = false;
					$.each(self.state.data, function(idx,d){
						if(d && d._state.editing) {
							hasEditing = true;
							return false;
						}
					});
					if(hasEditing) {
						self.endEdit();
					}
				}
			});
			if(option.endInlineEditByOuterClick) {
				$(document).on('click'+eventns+self.key,{self:self},function(e){
					var self = e.data.self;
					var $target = $(e.target);
					var $chain = $target.add($target.parents());
					if($chain.filter('.alopexgrid')[0] === self.$root[0]) {
						return;
					}//check only if area outside the grid is clicked
					if($chain.filter('input,select,button,textarea,a').length) {
						return;
					}//clicking on control elements should not end editing mode.
					self._endEditAllIfEditingExist();
				});
			}
		}//option.rowInlineEdit
		if(option.rowClickSelect) {
			$wrapper.on('click' + eventns,'.bodycell', {self:self}, function(e){
				e.data.self.rowSelect(this, 'toggle', e);
			});
		} else {
			$wrapper.on('click' + eventns, '.selector-checkbox', {self:self}, function(e){
				var $cell = $(this).closest('.bodycell');
				var self = e.data.self;
				setTimeout(function(){self.rowSelect($cell[0], 'toggle', e)},0);

			});
		}
		if(self.option.disableFocusedState !== true) {
			$wrapper.on('mousedown' + eventns,'.bodycell', {self:self}, function(e){
				e.data.self._rowFocus(this);
			});
		}
		if(self.option.cellPopupEdit) {
			$wrapper.on('dblclick' + eventns, '.bodycell', {self:self,$popupWrap:null},function(e){
				var self = e.data.self;
				var $cell = $(this);
				if($cell.hasClass('editingcell')) return;
				var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
				var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
				
				if ($.inArray(columnIndex, self.option.cellPopupEdit) === -1) {
					return;
				}
				
				if (self.state.activePopupTextarea == undefined) {
					self.state.activePopupTextarea = [];
				} else  if (self.state.activePopupTextarea.length > 0) {
					self.state.activePopupTextarea = [];
					$(document.body).off('.alopexgridCellPopupEdit'+self.key);
					if(e.data.$popupWrap) {
						e.data.$popupWrap.remove();
						e.data.$popupWrap = null;
					}
				}
				
				var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
				var mapping = _getMappingFromColumnIndex(self, columnIndex);
				var isReadonly = isCellReadonly(self, data, mapping);
				
				$target = $(e.target);
				var position = $target.offset();
				
				var topPosition = position.top + e.offsetY;
				var leftPosition = position.left + e.offsetX+10;
				if(e.data.$popupWrap) {
					e.data.$popupWrap.remove();
					e.data.$popupWrap = null;
				}
				var $popupWrap = $('<div tabIndex="0" class="alopexgrid-popupwrap" style="top:' + topPosition + 'px;left:' + leftPosition + 'px;">');
				e.data.$popupWrap = $popupWrap;
				$popupWrap.on('keydown.alopexgridCellPopupEdit', {self:self, $popupWrap:$popupWrap}, function(e) {
					var self = e.data.self;
					if(e.which === 27) {
						self.state.activePopupTextarea = [];
						$(document.body).off('.alopexgridCellPopupEdit'+self.key);
						if(e.data.$popupWrap) {
							e.data.$popupWrap.remove();
							e.data.$popupWrap = null;
						}
					}
				}); 
				var $popupButton = null;
				if(!isReadonly) {
					$popupButton = $('<button class="alopexgrid-popupbutton">저장</button>');
					$popupButton.on('click.alopexgridCellPopupEdit',{self:self, $popupWrap:$popupWrap},function(e) {
						var self = e.data.self;
						self._endCellEdit({
							renderedIndex: renderedIndex
							,columnIndex: columnIndex
							,value: $popupTextarea.val()});
						
						self.state.activePopupTextarea = [];
						$(document.body).off('.alopexgridCellPopupEdit'+self.key);
						if(e.data.$popupWrap) {
							e.data.$popupWrap.remove();
							e.data.$popupWrap = null;
						}
					});
				}
				var $cancelButton = $('<button class="alopexgrid-popupbutton">닫기</button>');
				$cancelButton.on('click.alopexgridCellPopupEdit',{self:self, $popupWrap:$popupWrap},function(e) {
					var self = e.data.self;
					self.state.activePopupTextarea = [];
					$(document.body).off('.alopexgridCellPopupEdit'+self.key);
					if(e.data.$popupWrap) {
						e.data.$popupWrap.remove();
						e.data.$popupWrap = null;
					}
				});
				
				var $popupTextarea = $('<textarea class="alopexgrid-popuptextarea">' + $target.text()+ '</textarea>')
				if(isReadonly) {
					$popupTextarea.attr('readonly','');
				}
				$popupWrap.append($('<div>').append($cancelButton, $popupButton), $popupTextarea);
				$(document.body).append($popupWrap);
				$(document.body).on('click.alopexgridCellPopupEdit'+self.key, {self:self, $popupWrap:$popupWrap}, popupAreaClickEvent);
				
				setTimeout(function(){
					$popupWrap.focus();
				}, 0);
				
				function popupAreaClickEvent(e) {
					var self = e.data.self;
					var target = e.target;
					
					if (self.state.activePopupTextarea.length > 0) {
						var el = self.state.activePopupTextarea[0];
						if ($(target).closest(el).length == 0) {
							self.state.activePopupTextarea = [];
							$(document.body).off('.alopexgridCellPopupEdit'+self.key);
							if(e.data.$popupWrap) {
								e.data.$popupWrap.remove();
								e.data.$popupWrap = null;
							}
						} 
					} else {
						self.state.activePopupTextarea.push($popupWrap);
					}
				}
			});
		}
		
		if(self.option.cellInlineEdit) {
			$wrapper.on('dblclick' + eventns, '.bodycell', {self:self},function(e){
				var self = e.data.self;
				var $cell = $(this);
				var pageX = e.pageX;
				var pageY = e.pageY;
				if($cell.hasClass('editingcell')) return;
				var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
				var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
				self._endCellEdit();
				self._startCellEdit(renderedIndex, columnIndex);
				clearSelection();
				setTimeout(function(){
					var $newcell = locateCellForPosition(self, renderedIndex, columnIndex);
					self._setCursorUnderPointer($newcell, pageX, pageY); 
				},0);
			});
			$wrapper.on('mousedown' + eventns, '.bodycell', {self:self},function(e){
				var self = e.data.self;
				var $cell = $(this);
				if($cell.hasClass('editingcell')) {
					return;
				}
				var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
				var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
				self._endCellEdit();
				setFocusFixture(self, renderedIndex, columnIndex);
			});
			$wrapper.on('keydown' + eventns,'.bodycell',{self:self}, function(e){
				var self = e.data.self;
				var $cell = $(this);
				var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
				var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
				var isEditingCell = self._isEditingCell(renderedIndex, columnIndex);
				if(isEditingCell) {
					if(e.which === 27) { //esc
						self._cancelCellEdit();
						setFocusFixture(self, renderedIndex, columnIndex);
					} else if(e.which === 13) { //enter
						if(!e.ctrlKey) {
							self._endCellEdit();
							setFocusFixture(self, renderedIndex, columnIndex);
							changeCellFocusByIncrement(self, (e.shiftKey ? -1 : 1),0);
						} else {//alt+enter in IE === FULL SCREEN and cannot override this behavior.
							insertTextAtCaret($cell.find('input,textarea').get(0),'\n');
						}
					} else if(e.which === 9) {
						self._endCellEdit();
						setFocusFixture(self, renderedIndex, columnIndex);
						changeCellFocusByIncrement(self, 0, (e.shiftKey ? -1 : 1));
					}
				} else {
					if(e.which === 113) { //f2
						self._startCellEdit(renderedIndex, columnIndex);
						setFocusFixture(self, renderedIndex, columnIndex);
					}
				}
			});
		}//cellInlineEdit
		
		self._startCellSelectEngine(self.option.cellSelectable);
		self._enableHeaderSelect(!!self.option.enableHeaderSelect);


		if(self.option.enableContextMenu || self.option.enableDefaultContextMenu) {
			$r.on('contextmenu' + eventns,{self:self},function(e){
				var self = e.data.self;
				var contextMenu = [];
				if(self.option.enableDefaultContextMenu && 
						self.option.defaultContextMenu && self.option.defaultContextMenu.length) {
					contextMenu = contextMenu.concat(self.option.defaultContextMenu);
				}
				if(self.option.enableContextMenu && 
						self.option.contextMenu && self.option.contextMenu.length) {
					contextMenu = contextMenu.concat(self.option.contextMenu);
				}
				if(!contextMenu.length) return;

				var data = self._getDataFromEvent(e);
				var $cell = self._getCellFromEvent(e);
				if(data) {
					data = $.extend(true, {}, data);
					data._index.column = parseInt($cell.attr('data-alopexgrid-columnindex'));
				}
				var pageX = e.pageX;
				var pageY = e.pageY;
				$('.alopexgrid-contextmenu-wrapper-'+self.key).remove();
				if(self.state.$contextMenuDropdown) {
					self.state.$contextMenuDropdown.close().remove();
					self.state.$contextMenuDropdown = null;
				}
				$(document).off('.alopexgridContextMenuEvent'+self.key);

				var $wrap = $('<div>');
				var $div = $('<div>').prop('id',_generateUniqueId()).appendTo($wrap);
				var id = _generateUniqueId();
				$wrap.css({'z-index': '99997', 'position':'absolute', 'left':pageX+'px', 'top':pageY+'px'});
				$wrap.prop('id', id);
				$wrap.addClass('alopexgrid-contextmenu-wrapper-'+self.key);

				var $contextMenuDropdown = self.state.$contextMenuDropdown = $('<ul data-type="dropdown">');
				function renderMenuItem(menuItem, contextMenuIndex, menuData, cell) {
					if(menuItem.use === false) return '';
					if($.isFunction(menuItem.use) && menuItem.use.call(self.$root, menuData, cell, self) === false) return '';
					if(menuItem.seperator===true) {
						return '<li class="af-group-header"><hr></li>';
					}
					var $item = $('<li>');
					var $a = $('<a>').appendTo($item);
					var title = menuItem.title;
					if($.isFunction(title)) {
						title = title.call(self.$root, menuData, cell, self);
					}
					$a.text(self.option.contextMenuTitleMapper ? self.option.contextMenuTitleMapper(title) : title);
					$a.attr('href','#');
					$a.on('click', {$grid:self.$root, gridInstance:self},function(ee){
						menuItem.processor.call(ee.data.$grid, menuData, cell, ee.data.gridInstance);
						ee.preventDefault();
					});
					return $item;
				}
				$.each(contextMenu, function(idx, menuItem) {
					$contextMenuDropdown.append(renderMenuItem(menuItem, idx, data, $cell));
				});
				if(!$contextMenuDropdown.children().length) {
					$contextMenuDropdown.remove();
					$wrap.remove();
					return;
				}
				$contextMenuDropdown.appendTo($wrap);
				$wrap.appendTo('body').addClass("alopexgrid-refer-"+self.key);
				$wrap.convert();
				$contextMenuDropdown.open();
				$(document).on('keydown.alopexgridContextMenuEvent'+self.key+self.eventns, {self:self},function(e){
					var self = e.data.self;
					if(e.keyCode === 27) {
						if(self.state.$contextMenuDropdown) {
							self.state.$contextMenuDropdown.close().remove();
							self.state.$contextMenuDropdown = null;
						}
						$(document).off('.alopexgridContextMenuEvent'+self.key);
						setFocusFixture(self);
					}
				});
				e.preventDefault();
			});
		}
		//*/

		if(self.option.pager) {
			self.$pager.on('click'+eventns, '.pageset',{self:self},function(e){
				var self = e.data.self;
				var topage = this.getAttribute('href').split('#').pop();
				$(this).parent().removeClass('hovering');
				self.pageSet(topage);
				e.preventDefault();
			}).on('mouseover'+eventns,'div.pagination,li',function(){
				var $el = $(this);
				$el.siblings().removeClass('hovering');
				$el.addClass('hovering');
			}).on('mouseout'+eventns,'div.pagination,li',function(){
				$(this).removeClass('hovering').siblings().removeClass('hovering');
			});
		}
		if(self.option.autoResize) {
			$window.on('resize'+eventns+self.key, {self:self,timer:null}, function(e) {
				var self = e.data.self;
				if(e.data.timer) {
					clearTimeout(e.data.timer);
				}
				e.data.timer = setTimeout(function(){
					//TODO 윈도 리사이징에 대응하여 사용자가 활용하여 무언가를 할 수 있어야 한다.
					//self._triggerGridEvent('gridResize', {key:"value"}) // function(e){ e.alopexgrid.key === "value";}
					self.viewUpdate();
					e.data.timer = null;
				},self.option.autoResizeDelay);
			});
		}

		self._activateBoardScrollEvent();
	};
	AlopexGrid.prototype.addContextMenu = function(menuItem, index) {
		if(!$.isPlainObject(menuItem)) return;
		if(!menuItem.hasOwnProperty('title')) return;
		if($.isNumeric(index)) {
			this.option.contextMenu.splice(index, 0, menuItem);
		} else {
			this.option.contextMenu.push(menuItem);
		}
	};
	AlopexGrid.prototype.deleteContextMenu = function(index) {
		this.option.contextMenu.splice(index, 1);
	};
	AlopexGrid.prototype._populateEditableTabindex = function(enable){
		var self = this;
		self.state.dynamicTabindexEnabled = (enable!==false);
		self.$wrapper.find('input,select,textarea').prop('tabIndex',
				(enable===false) ? 0 : function(idx,oval){
					return (this.alopexgridTabIndex = this.alopexgridTabIndex || $(this).attr('data-tabindex'));
				}
		);
	};
	AlopexGrid.prototype._enableDragDrop = function(enable) {
		var self = this;
		//TODO 재구현 필요
	};

	AlopexGrid.prototype._calcCellWidth = function(){
		var self = this;
		
		// hidden column을 제외한 fixed column width를 가지고 있는다.
		self.state.columnWidth = 0;
		self.state.columnWidthMap = {};
		self.state.columnWidthExceptFixed = 0;
		self.state.columnWidthExcepFixedMap = {};
		self.state.columnIndexArr = [];
		//    self.state.columnWidthForReverse = [];
		var mapping;
		for (var i=0;i<self.option.columnMapping.length;i++) {
		  mapping = self.option.columnMapping[i];

		  if(!mapping || !(mapping.columnIndex >= 0) || mapping.hidden === true) {
		    continue;
		  } else if (mapping.fixed === true) {
		  } else {
		    self.state.columnWidthExcepFixedMap[mapping.columnIndex] = parseInt(mapping.width);
		    self.state.columnWidthExceptFixed += parseInt(mapping.width);
		  }
		  self.state.columnWidthMap[mapping.columnIndex] = parseInt(mapping.width);
		  self.state.columnWidth += parseInt(mapping.width);
		//      self.state.columnWidthForReverse.push(parseInt(mapping.width));
		  self.state.columnIndexArr.push(parseInt(mapping.columnIndex));
		}

		// fixed 컬럼이 있을경우 fixed를 제외한 값으로 계산한다
		self.state.standardColumnWidth = 0;
		self.state.standardColumnWidthMap = {};
		if (self.state.fixedColumnMapping.length > 0) {
		  self.state.standardColumnWidth = self.state.columnWidthExceptFixed;
		  self.state.standardColumnWidthMap = self.state.columnWidthExcepFixedMap;
		} else {
		  self.state.standardColumnWidth = self.state.columnWidth;
		  self.state.standardColumnWidthMap = self.state.columnWidthMap;
		}
	};

	AlopexGrid.prototype.import = function(obj){
		if($.type(obj) === "string") {
			obj = JSON.parse(obj);
		}
		var option = $.extend(true, {}, obj.option);
		delete option.data;
		var data = $.extend(true, [], obj.data);
		this.updateOption(option);
		this.dataSet(data);
	};

	AlopexGrid.prototype.scrollOffset = function(){
		return this._scrollOffset();
	};
	AlopexGrid.prototype._scrollOffset = function(merge) {
		var self = this;
		var offset = merge ? merge : {};
		offset["scrollTop"] = 0;
		offset["scrollLeft"] = 0;
		return offset;
	};

	AlopexGrid.prototype._getGroupingRange = function(dataIndex, key) {
		var groupingLookupTable = this.state.groupingLookupTable;
		if(!groupingLookupTable) return null;
		var groupingLookupList = groupingLookupTable[key];
		if(!groupingLookupList) return null;
		var groupingLookupItem = groupingLookupList[dataIndex];
		if(!groupingLookupItem) return null;
		return groupingLookupItem;
	};
	AlopexGrid.prototype._getGroupingRangeByMapping = function(dataIndex, mapping) {
		var key = mapping.key;
		if(mapping.rowspan && typeof mapping.rowspan.by === "string") key = mapping.rowspan.by;
		return this._getGroupingRange(dataIndex, key);
	};
	
	function _getCurrentValue(data, key) {
		return (data._state.recent ? data._state.recent[key] : data[key]) || "";
	}

	function _getMappingFromColumnIndex(self, columnIndex) {
		var rmap = null;
		return self.state.columnIndexToMapping[columnIndex] || null;
		// $.each(columnMapping, function(i,mapping) {
		// 	if(mapping.columnIndex === null || mapping.columnIndex === undefined) return;
		// 	if(Number(columnIndex) === Number(mapping.columnIndex)) {
		// 		rmap = mapping;
		// 		return false;
		// 	}
		// });
		// return rmap;
	}
	function _getColumnKeyFromColumnIndex(self, columnIndex) {
		var key = null;
		return self.state.columnIndexToKeyMap[columnIndex];
		// $.each(columnMapping, function(i,mapping) {
		// 	if(mapping.columnIndex === null || mapping.columnIndex === undefined) return;
		// 	if(Number(columnIndex) === Number(mapping.columnIndex)) {
		// 		key = mapping.key || null;
		// 	}
		// });
		// return key;
	}
	function createSortingHandle(self){
		var handle = document.createElement('div');
		handle.setAttribute('class', 'sorting-handle alopexgrid-handle');
		//handle.style.lineHeight = self.state.headerRowHeight + 'px';
		return handle;
	}
	function createResizingHandle(self, mapping){
		var columnIndex = mapping.columnIndex;
		var handle = document.createElement('div');
		handle.setAttribute('class', 'resizing-handle alopexgrid-handle');
		handle.setAttribute('data-alopexgrid-resizingcolumnindex', columnIndex);
		handle.setAttribute('onmousedown', "AlopexGrid.run('" + self.key + "','_columnResizeStart',event," + columnIndex + ");");
		return handle;
	}

	var _filterFunction = {
		'lt' : function(data, key, value) {
			return (Number(data[key]) < Number(value));
		},
		'lte' : function(data, key, value) {
			return (Number(data[key]) <= Number(value));
		},
		'gt' : function(data, key, value) {
			return (Number(data[key]) > Number(value));
		},
		'gte' : function(data, key, value) {
			return (Number(data[key]) >= Number(value));
		},
		'equal' : function(data, key, value) {
			return (String(data[key]).toLowerCase() === String(value).toLowerCase());
		},
		'notequal' : function(data, key, value) {
			return (String(data[key]).toLowerCase() !== String(value).toLowerCase());
		},
		'contain' : function(data, key, value) {
			return (String(data[key]).toLowerCase().indexOf(String(value).toLowerCase()) >= 0);
		},
		'notcontain' : function(data, key, value) {
			return (String(data[key]).toLowerCase().indexOf(String(value).toLowerCase()) < 0);
		},
		'checkedList' : function(data, key, value) {
			//TODO undefined 처리 다시 생각해보기
			return (value.indexOf(data[key]) >= 0);
		}
	};
	//filterData에 사용 가능한 형태.
	//lt,lte,gt,gte,equal,notequal,contain,notcontain
	//self.state.filter[columnIndex 3] = {type:'lt',value:'100',key:'USR_CODE'}
	//--> function(data) { return data[key] < value; }
	//실제 필터링시에만 사용. 렌더링에는 활용하지 않음.
	AlopexGrid.prototype._filterDataToFunction = function(filterData) {
	  var self = this;
	  var type = filterData.type;
	  if (type == '') {
	    return null;
	  }
	  var key = filterData.key;
	  var value = filterData.value;
	  return function(data){
	    return _filterFunction[type](data, key, value);
	  };
	};
	
	/**
	 * 필터링 드랍다운 박스 만들기
	 */
	function drawFilterDropdownPopup (self, key, filteredType, filteredValue, filterGridId) {
		var markup = [];
		var eventhandler = ["AlopexGrid.run('",self.key,"','_parseFilterHeader','" + filterGridId + "', event);"].join('');
		markup.push('<ul class="alopexgrid-filterdropdown">');
		// sorting 기능 붙이기
		markup.push('<li class="header">필터</li>');
		markup.push('<li class="menu remove"><a');
		markup.push(' data-key="' + key + '"');
		markup.push(' value="remove"');
		markup.push(' onclick="',eventhandler,'"');
		markup.push('>필터해제</a></li>');

		markup.push('<li class="header">텍스트 필터</li>');
		markup.push('<li class="menu">텍스트: <input type="text" class="filtertext" name="alopexgrid-filter-textinput" value="'+ filteredValue +'"/></li>');
		markup.push('<li class="menu">타입: <select class="filterselect" onchange="',eventhandler,'" disabled>');
		markup.push('<option value="" selected="selected" disabled>선택하세요</option>');
		$.each(self.option.filterTypeNameMap, function(presetType, name){
			markup.push('<option ');
			markup.push(' data-key="' + key + '"');
			markup.push(' value="',presetType,'"');
			if (filteredType == presetType) {
				markup.push(' selected="selected"');
			}
			markup.push('>',name,'</option>');
		});
		markup.push('</select></li>');

//		markup.push('<li>텍스트 필터');
//		markup.push('<ul>');
//		$.each(self.option.filterTypeNameMap, function(presetType, name){
//		markup.push('<li><a');
//		markup.push(' data-key="' + key + '"');
//		markup.push(' value="',presetType,'"');
//		markup.push(' onclick="',eventhandler,'"');
//		markup.push('>',name,'</a></li>');
//		});
//		markup.push('</ul></li>');

		markup.push('<li class="header">데이터 필터</li>');

		markup.push('</ul>');
		return markup.join('');
	}
	
	function setEnableBtn($el, boolean) {
		if (boolean) {
			$el.removeClass('af-disabled');
			$el.removeAttr('disabled');
		} else {
			$el.addClass('af-disabled');
			$el.attr('disabled', 'disabled');
		}
	}
	
	/**
	 * filterGrid 셋업
	 */
	function initFilterGrid (self, $filterGrid, key, columnIndex, $applyButton) {
		var isFiltered = $.isArray(self.state.filteredDataIndexList);

		// 다중필터 관련한 로직 추가
		var columnFilterTargetData = [];
		var filteredList = [];
		var isAlreadyFiltered = false;
		if (isFiltered && self.state.filter) {
			// 필터링된 컬럼이 있을때
			for (var idx in self.state.filter) {
				if (idx == columnIndex) {
					isAlreadyFiltered = true;
					continue;
				} else {
					filteredList.push(self.state.filter[idx]);
				}
			}
			
			if (isAlreadyFiltered) {
				// 필터링된 하나의 컬럼을 다시 선택했을땐 전체 데이터를 보여준다.
				if (filteredList.length == 0) {
					columnFilterTargetData = self.state.data;
				} else {
					// 필터링된 데이터를 가져와서 보여준다.
					columnFilterTargetData = self._getFilteredDataList(filteredList, self.state.data);
				}
			} else {
				// 필터링된 데이터가 아닌 다른 컬럼을 누를땐 화면에 보이는것만 렌더링한다.
				columnFilterTargetData = self.state.renderTargetDataList;
			}
		} else {
			// 처음엔 전체 데이터로 필터링한다.
			columnFilterTargetData = self.state.data;
		}
		
		var filterdData = isFiltered ? //map(self.state.filteredDataIndexList, self.state.data) : '';
				$.map(self.state.filteredDataIndexList, function(dataIndex){
					return self.state.data[dataIndex];
				}) : '';

		var data, dataLength;    
		var arrIdx = 0;
		var result = [];
		var filteredResult = [];
		if (columnFilterTargetData) {
			dataLength = columnFilterTargetData.length;
			for (var i=0;i<dataLength;i++) {
				data = columnFilterTargetData[i];
//				if ($.inArray(data[key], result) == -1) {
				if (result.indexOf(data[key]) < 0) {
					result[arrIdx] = data[key];
					arrIdx++;
				}
			}
		}
		arrIdx = 0;
		if (isFiltered && filterdData) {
			dataLength = filterdData.length;
			for (var i=0;i<dataLength;i++) {
				data = filterdData[i];
//				if ($.inArray(data[key], filteredResult) == -1) {
				if (filteredResult.indexOf(data[key]) < 0) {
					filteredResult[arrIdx] = data[key];
					arrIdx++;
				}
			}
		}

		// 필터링에 해당 컬럼의 renderMapping 적용여부 세팅
		self.state.filterColumnIndex = columnIndex;
		var columnInfo = self.columnInfo(columnIndex);
		var renderFunction, renderObj, isDefaultRenderType;
		var useRenderToFilter = columnInfo.useRenderToFilter;
		self.state.isFilterRendered = false;
		if (columnInfo.render && useRenderToFilter) {
			renderObj = columnInfo.render;
			var renderType = columnInfo.render.type;
			// render가 function으로 선언되있을경우
			if ($.isFunction(columnInfo.render)) {
				self.state.isFilterRendered = true;
				renderFunction = columnInfo.render;
			} else if(renderType) { // render에 type으로 선언되있을경우
				// setup에 선언된 renderMapping type
				if (self.option.renderMapping.hasOwnProperty(renderType)) {
					renderFunction = self.option.renderMapping[renderType];
					if ($.isFunction(renderFunction)) {
						isDefaultRenderType = false;
						self.state.isFilterRendered = true;
						renderFunction = renderFunction();
					}
				} else if (_renderValue.plugin.hasOwnProperty(renderType)) { // default render type
					self.state.isFilterRendered = true;
					isDefaultRenderType = true;
					renderFunction = _renderValue.plugin[renderType];
				}
			}
		}
		var sortingType;
		if (columnInfo.sorting) {
			sortingType = columnInfo.sorting; // 부모 그리드 정보와 동일하게 세팅
		} else {
			sortingType = true;
		}
		
		
		$filterGrid.alopexGrid({
			width: 200,
			height: 200,
//			header: false,
//			disableAlopexConvert:true,
			enableDefaultContextMenu:false,
			enableContextMenu: false,
//			mergeEditingImmediately : true,
//			defaultState:{
//			dataSet:{editing:true},
//			dataAdd:{editing:true}
//			},
			defaultSorting : {
				sortingColumn : 0,
				sortingDirection : 'asc'
			},
			columnMapping : [{
				columnIndex:0,
				key:'label',
				width: 185,
				title:'필터 목록',
				resizing:'self',
				sorting: sortingType,
				render: function(value, data, mapping) {
					var filteredSelf = this;
					var markup = '';
					if (data.isCheckAll) {
						return '<input id="'+ self.key + key +'_checkAll" type="checkbox" class="alopexgrid-filter-checkbox" data-type="checkbox" name="'+ key +'" '+ data.checked +'"/>' 
						+ '<label class="alopexgrid-filter-checkboxlabel">'+ data.label +'</label>';
					}
					markup = '<input id="'+ self.key + key +'_check_'+ data._index.data +'" type="checkbox" class="alopexgrid-filter-checkbox" data-type="checkbox" name="'+ key +'" '+ data.checked +'"/>';
					markup += '<label class="alopexgrid-filter-checkboxlabel">';
					// TODO undefined 처리방법 다시 생각해보기
					if (data.label == undefined) {
						markup += '(필드 값 없음)';
					} else {
						if (self.state.isFilterRendered) {
							if (filteredSelf.state.filterRenderFuntion && filteredSelf.state.isDefaultRenderType) {
								markup += filteredSelf.state.filterRenderFuntion(filteredSelf.state.renderObj, data.label);
							} else if (filteredSelf.state.filterRenderFuntion && !filteredSelf.state.isDefaultRenderType) {
								markup += filteredSelf.state.filterRenderFuntion(data.label);
							}
						} else {
							markup += data.label;
						}
					}
					markup += '</label>';
					return  markup
				}
			}],
			on: {
				cell: {
					'click': function(data, e) {
						var filteredSelf = this;
						var tagName = e.target.tagName;
						var $obj = $(e.target);
						var inputClick = true;
						if (tagName == 'DIV') {
							inputClick = false;
							$obj = $(e.target.children[0]);
						} else if (tagName == 'LABEL') {
							inputClick = false;
							$obj = $(e.target).siblings();
						}
						var text = $obj.siblings().text();

						// 필터링할 데이터가 없으면 리턴한다.
						if (filteredSelf.dataGet().length == 1) return;

						if (inputClick) {
							// select All row 클릭시
							if (data.isCheckAll) {
								if ($obj.prop('checked')) {
									filteredSelf.dataEdit({checked:'checked="checked"'});
									setEnableBtn($applyButton, true);
								} else {
									filteredSelf.dataEdit({checked:''});
									setEnableBtn($applyButton, false);
								}
							} else {
								var totalCheckLength = filteredSelf.dataGet().length-1;
								var checkedElSize = filteredSelf.dataGet({checked:'checked="checked"'}).length;

								if ($obj.prop('checked')) {
									if (totalCheckLength == (checkedElSize+1)) {
										filteredSelf.dataEdit({checked:'checked="checked"'}, {isCheckAll: true});
									} else {
										filteredSelf.dataEdit({checked:''}, {isCheckAll: true});
									}
									filteredSelf.dataEdit({checked:'checked="checked"'}, {_index:{data:data._index.data}});
									setEnableBtn($applyButton, true);
								} else {
									if (totalCheckLength == 0 || checkedElSize == 1 || (totalCheckLength == 1 && checkedElSize == 2)) {
										setEnableBtn($applyButton, false);
									} else {
										setEnableBtn($applyButton, true);
									}
									filteredSelf.dataEdit({checked:''}, {_index:{data:data._index.data}});
									filteredSelf.dataEdit({checked:''}, {isCheckAll: true});
								}
							}
						} else {
							// select All row 클릭시
							if (data.isCheckAll) {
								if (!$obj.prop('checked')) {
									filteredSelf.dataEdit({checked:'checked="checked"'});
									setEnableBtn($applyButton, true);
								} else {
									filteredSelf.dataEdit({checked:''});
									setEnableBtn($applyButton, false);
								}
							} else {
								var totalCheckLength = filteredSelf.dataGet().length-1;
								var checkedElSize = filteredSelf.dataGet({checked:'checked="checked"'}).length;

								if (!$obj.prop('checked')) {
									if (totalCheckLength == (checkedElSize+1)) {
										filteredSelf.dataEdit({checked:'checked="checked"'}, {isCheckAll: true});
									} else {
										filteredSelf.dataEdit({checked:''}, {isCheckAll: true});
									}
									filteredSelf.dataEdit({checked:'checked="checked"'}, {_index:{data:data._index.data}});
									setEnableBtn($applyButton, true);
								} else {
									if (totalCheckLength == 0 || checkedElSize == 1 || (totalCheckLength == 1 && checkedElSize == 2)) {
										setEnableBtn($applyButton, false);
									} else {
										setEnableBtn($applyButton, true);
									}
									filteredSelf.dataEdit({checked:''}, {_index:{data:data._index.data}});
									filteredSelf.dataEdit({checked:''}, {isCheckAll: true});
								}
							}
						}
					}
				}
			}
		});
		var filteredSelf = $filterGrid.data(AlopexGrid.KEY_NAME);

		// 중복된 value를 저장하기위한 map 생성
		if (filteredSelf.state.filterDuplicateMap == null) {
			filteredSelf.state.filterDuplicateMap = {};
		}
		filteredSelf.state.filterRenderFuntion = renderFunction;
		filteredSelf.state.isDefaultRenderType = isDefaultRenderType;
		filteredSelf.state.renderObj = renderObj;
		
		
		// 체크박스 데이터 가져와서 뿌리기
		var filterDataList = [{
			isCheckAll: true,
			checked: 'checked="checked"',
			label: '(Select All)'
		}];
		arrIdx = 1;
		var checked,value = '';
		var resultLength = result.length;
		
		
		var filterDuplicateLabel;
		for(var t=0;t<resultLength;t++) {
			checked = 'checked="checked"';
			value = result[t];
//			if (value == null) continue;
			
			// filterRendered일때만 이로직을 태운다.
			if (self.state.isFilterRendered) {
				// renderfuntion을 태운 value 중에 중복된 value가 있을때는 filterDataList에 넣지 않는다.
				if (filteredSelf.state.filterRenderFuntion && filteredSelf.state.isDefaultRenderType) {
					filterDuplicateLabel = filteredSelf.state.filterRenderFuntion(filteredSelf.state.renderObj, value);
				} else if (filteredSelf.state.filterRenderFuntion && filteredSelf.state.isDefaultRenderType !== null) {
					filterDuplicateLabel = filteredSelf.state.filterRenderFuntion(value);
				}
				
				// renderFuntion 을 탄 value에 대해서만 duplicateMap에 넣어준다.
				if (filteredSelf.state.filterDuplicateMap.hasOwnProperty(filterDuplicateLabel)) {
					filteredSelf.state.filterDuplicateMap[filterDuplicateLabel].push(value);
					continue;
				} else {
					filteredSelf.state.filterDuplicateMap[filterDuplicateLabel] = [];
				}
			}
			
			if (isFiltered && filteredResult.indexOf(value) < 0) {
				filterDataList[0].checked = '';
				checked = '';
			};
			filterDataList[arrIdx] = {
					checked: checked,
					label: value
			};
			arrIdx++;
		}

		filteredSelf.dataSet(filterDataList);
		filteredSelf.dataPin({isCheckAll:true});
	}

	//filtering cell의 select와 textinput을 생성한다.
	AlopexGrid.prototype._drawFilterUnit = function(filterData, columnIndex) {
		var self = this;
		var markup = [];
		var index = filterData.columnIndex;
		var type = filterData.type || "";
		var value = filterData.value || "";
		if (type === "checkedList") {
			type = "";
			value = "";
		}
		var key = filterData.key;
		var _filterBtnEventhandler = ["AlopexGrid.run('",self.key,"','_filterBtnEventhandler','",key,"' ,'",columnIndex,"', '",type,"', '",value,"', event);"].join('');

		markup.push('<input type="hidden" class="alopexgrid-filter-key" name="alopexgrid-filter-key" value="',key,'"/>');
		markup.push('<button class="alopexgrid-filter-dropdownbutton '+(filterData.filtered?'filtered':'')+'" type="button"');
		markup.push(' onclick="',_filterBtnEventhandler,'"');
		markup.push('>&nbsp;</button>');
		return markup.join('');
	};


	AlopexGrid.prototype._filterBtnEventhandler = function(key, columnIndex, filteredType, filteredValue, e) {
		var self = this;
		var $target = $(e.target);
		var targetOffset = $target.offset();

		// 기존 필터링 dropdown 삭제
		if(self.state.filterDropdownWrapper) {
			self.state.filterDropdownWrapper.remove();
			self.state.filterDropdownWrapper = null;
		} 
		
//		else {
//		if ($('.alopexgrid-filterdropdown-wrapper-'+self.key)[0] !== undefined) {
//		$('.alopexgrid-filterdropdown-wrapper-'+self.key)[0].parentNode.removeChild($('.alopexgrid-filterdropdown-wrapper-'+self.key)[0]);
//		}
////		$('.alopexgrid-filterdropdown-wrapper-'+self.key).remove();
//		}

		var $wrap = $('<div>');
		$wrap.append($('<div>').prop('id',_generateUniqueId()));
		$wrap.css({
			'position':'absolute', 
			'left':+targetOffset.left+'px', 
			'top':(targetOffset.top + $target.height())+'px'
		});
		var id = _generateUniqueId();
		$wrap.prop('id', id);
		$wrap.addClass('alopexgrid-filterdropdown-wrapper');
		var filterGridId = _generateUniqueId()+ '_' + self.key;
		var $dropdown = $(drawFilterDropdownPopup(self, key, filteredType, filteredValue, filterGridId));
		
		// 텍스트입력전에는 select disabled시킨다.
		var $filterTextinput = $dropdown.find('.filtertext');
		var $filterSelect = $dropdown.find('.filterselect');
		if ($.trim($filterTextinput.val()).length > 0){
			$filterSelect.attr('disabled', false);
		}

		$filterTextinput[0].oldVal = filteredValue;
		$filterTextinput.on('keyup mouseup', function(e) {
			var value = this.value;
			if ($.trim(value).length > 0) {
				if (this.oldVal !== value) {
					$filterSelect.val('');
				}
				$filterSelect.attr('disabled', false);
			} else {
				$filterSelect.val('').attr('disabled', true);
			}
		});
		
		var $filterGrid = $('<div id="'+ filterGridId +'">');
		var $div = $('<div class="checkboxarea"></div>');
		var buttonEvent = ["AlopexGrid.run('",self.key,"','_setCheckedListFilter','",filterGridId,"','",columnIndex,"', event);"].join('');
		var $ButtonLi = $('<li class="af-buttonitem"></li>');
		var $applyButton = $('<input type="button" class="filtersubmit" data-key="'+ key +'" value="적용" onclick="'+ buttonEvent +'"/>');
		var $closeButton = $('<input type="button" class="filterclose" value="닫기" />');
		$closeButton.click(function() {
			$wrap.hide();
			$filterGrid.removeAlopexGrid();
		});

		$ButtonLi.append($closeButton, $applyButton);
		$div.append($filterGrid, $ButtonLi);
		$dropdown.append($div);
		$wrap.append($dropdown);
		//$wrap.convert();
		$('body').append($wrap);//.addClass("alopexgrid-refer-"+self.key);
		
		// 필터링 데이터를 가져와 드롭다운내 필터그리드에 바인딩
		initFilterGrid(self, $filterGrid, key, columnIndex, $applyButton);

		// filter 드랍다운 위치가 윈도우 사이즈보다 클때 보정해준다.
		var left = Number($wrap.css('left').split('px')[0]);
		var top = Number($wrap.css('top').split('px')[0]);
		
		var dropdownWidth = $wrap.width() + Number($wrap.css('margin-left').split('px')[0]) + Number($wrap.css('margin-right').split('px')[0]);
		var dropdownHeight = $wrap.height() + Number($wrap.css('margin-top').split('px')[0]) + Number($wrap.css('margin-bottom').split('px')[0]);
		
		var renderWidth = $wrap.offset().left - $('body').scrollLeft() + dropdownWidth;
		var windowWidth = $(window).width();
		if (renderWidth > windowWidth) {
			left -= (renderWidth - windowWidth + 10);
			if (left < 0) left = 0;
//			left += $('body').scrollLeft(); //scroll 한 만큼 더해준다.
		}
		var renderHeight = $wrap.offset().top - $('body').scrollTop() + dropdownHeight;
		var windowHeight = $(window).height();
		if (renderHeight > windowHeight) {
			top -= (renderHeight - windowHeight + 10);
			if (top < 0) top = 0;
//			top +=  $('body').scrollTop(); //scroll 한 만큼 더해준다.
		}

		$wrap.css({
			'left': left + 'px',
			'top': top + 'px'
		});
		
		$filterGrid.alopexGrid('viewUpdate');
		
		self.state.filterDropdownWrapper = $wrap;
		self.state.filterDropdown = $dropdown;
		return;
	};
	
	AlopexGrid.prototype._setCheckedListFilter = function(filterGridId, columnIndex, e) {
		var self = this;
		var targetEl = e.target? e.target:e.currentTarget;
		
		var checkedList = self._filterGetCheckedList(filterGridId);
		if (checkedList.length == 0) {
			$(targetEl).setEnabled(false);
			return;
		}
		
		// 필터 드랍다운이 떠있으면 닫아준다.
		if (self.state.filterDropdownWrapper) {
			self.state.filterDropdownWrapper.hide();
			$('#' + filterGridId).removeAlopexGrid();
		}
		
		// 이미 필터링된 컬럼에서 select All이 클릭되어있으면 해당 컬럼은 필터링해제한다.
		var checkIndex = checkedList.indexOf('(Select All)');
		var isFilterRemove = false;
		if (checkIndex >= 0) {
			isFilterRemove = true;
		}
		
		// 기존 필터링 로직 여기서 수정
		self._showProgress(function(){
			var $filterunits = self.$wrapper.find('.filter-cell-unit');
			var filterDataList = $filterunits.map(function(idx, filterUnit){
				var filterData = self._parseFilterUnitForCheckList(filterUnit, checkedList, isFilterRemove, e);
				filterData ? (filterData.columnIndex = $(filterUnit).attr('data-alopexgrid-columnindex')) : +0;
				return filterData || undefined;
			});
			
			filterDataList.each(function(idx, filterData){
				self.setFilter(filterData.columnIndex, filterData, true);
			});
			
			// filter 된 셀 렌더링
			self.filterAndRedraw();
			self.pageInfo();
		},20);
	},

	AlopexGrid.prototype._parseFilterUnitForCheckList = function(unit, checkedList, isFilterRemove, e) {
		var self = this;
		var filterData = {};
		var $unit = $(unit);
		var columnIndex = $unit.attr('data-alopexgrid-columnindex');
		var targetEl = e.target? e.target:e.currentTarget;
		var dataKey =  $(targetEl).attr('data-key');
		var compareColumnKey = $unit.find('[name="alopexgrid-filter-key"]').val();

		if (dataKey !== compareColumnKey) {
			return null;
		}

		filterData.value = checkedList;
		if (isFilterRemove) {
			filterData.type = 'remove';
		} else {
			filterData.type = 'checkedList';
		}
		
		if (filterData.type == 'remove') {
			if (self.state.filter && self.state.filter[columnIndex] !== undefined) {
				if (self.state.filter[columnIndex]['key'] == dataKey){
					$unit.find('button').removeClass('filtered');
					//delete self.state.filter[columnIndex];
					self.deleteFilter(columnIndex, true);
					return null;
				}
			}
			return null;
		}
		filterData.key = $unit.find('.alopexgrid-filter-key').val();
		if(filterData.value.length === 0 || filterData.value === undefined || filterData.value === null) {
			return null;
		}
		$unit.find('button').addClass('filtered');
		filterData.filtered = true;
		return filterData;
	};

	AlopexGrid.prototype._filterGetCheckedList = function(filterGridId, e) {
		var self = this;
		var checkedList = [];
		var filteredSelf = $('#' + filterGridId).data(AlopexGrid.KEY_NAME);
		var filterGridCheckedList = filteredSelf.dataGet({checked:'checked="checked"'});
		
		var obj, label;
		for ( var i = 0; i < filterGridCheckedList.length; i++) {
			obj = filterGridCheckedList[i];
			// TODO undefined 값은 다시 undefined로 처리하는데 더좋은 방안 강구해야함
			if (obj.label === '(필드 값 없음)') {
				checkedList.push(undefined);
				continue;
			}
			checkedList.push(obj.label);
			
			// filterRendered일때만 이로직을 태운다.
			var filterDuplicateLabel;
			if (self.state.isFilterRendered) {
				// renderfuntion을 태운 value 중에 중복된 value가 있을때는 filterDataList에 넣지 않는다.
				if (filteredSelf.state.filterRenderFuntion && filteredSelf.state.isDefaultRenderType) {
					filterDuplicateLabel = filteredSelf.state.filterRenderFuntion(filteredSelf.state.renderObj, obj.label);
				} else if (filteredSelf.state.filterRenderFuntion && filteredSelf.state.isDefaultRenderType !== null) {
					filterDuplicateLabel = filteredSelf.state.filterRenderFuntion(obj.label);
				}
				// 필터링 드랍다운이 열리기전에 renderFuntion을 탄 value는 checkedlist에 넣어서 부모 그리드에 렌더링 시킨다.
				for (var idx in filteredSelf.state.filterDuplicateMap) {
					if (idx === filterDuplicateLabel) {
						// 체크박스에서 선택한 value와 중복 필터링을 방지하기위해 만들었던 value array 합치기
						checkedList = checkedList.concat(filteredSelf.state.filterDuplicateMap[idx]);
					}
				}
			}
		}
		return checkedList;
	},

	//filtering cell의 select와 textinput으로부터 filterData를 생성한다. 
	//filterData가 없다면 null을 리턴한다.
	AlopexGrid.prototype._parseFilterUnit = function(unit, e) {
		var self = this;
		var filterData = {};
		var $unit = $(unit);
		var columnIndex = $unit.attr('data-alopexgrid-columnindex');
		var targetEl = e.target? e.target:e.currentTarget;
		var $targetEl;
		if (targetEl.tagName == "A") {
			$targetEl = $(targetEl);
		} else {
			$targetEl = $(targetEl).find(":selected");
		}

		var dataKey =  $targetEl.attr('data-key')
		var compareColumnKey = $unit.find('[name="alopexgrid-filter-key"]').val();

		if (dataKey !== compareColumnKey) {
			return null;
		}
		filterData.value = self.state.filterDropdownWrapper.find('.filtertext').val();
		filterData.type = $targetEl.attr('value');

		if (filterData.type == 'remove') {
			if (self.state.filter && self.state.filter[columnIndex] !== undefined) {
				if (self.state.filter[columnIndex]['key'] == dataKey){
					$unit.find('button').removeClass('filtered');
					//delete self.state.filter[columnIndex];
					self.deleteFilter(columnIndex, true);
					return null;
				}
			}
			return null;
		}
		filterData.key = $unit.find('.alopexgrid-filter-key').val();
		if(filterData.value === "" || filterData.value === undefined || filterData.value === null) {
			return null;
		}
		$unit.find('button').addClass('filtered');
		filterData.filtered = true;
		return filterData;
	};
	
	AlopexGrid.prototype._parseFilterHeader = function(filterGridId, e) {
		var self = this;
		
		// dropdown 이 떠있을경우 close 시켜준다.
		if (self.state.filterDropdownWrapper) {
			self.state.filterDropdownWrapper.hide();
			$('#' + filterGridId).removeAlopexGrid();
		}
//		if (self.state.filterDropdown) {
//			self.state.filterDropdown.close();
//			$('#' + filterGridId).removeAlopexGrid();
//		}
		
		self._showProgress(function(){
			var $filterunits = self.$wrapper.find('.filter-cell-unit');
			var filterDataList = $filterunits.map(function(idx, filterUnit){
				var filterData = self._parseFilterUnit(filterUnit, e);
				filterData ? (filterData.columnIndex = $(filterUnit).attr('data-alopexgrid-columnindex')) : +0;
				return filterData || undefined;
			});
			//self.clearFilter(true);
			filterDataList.each(function(idx, filterData){
				self.setFilter(filterData.columnIndex, filterData, true);
			});
//			if (filterDataList.length == 0) {
//			return;
//			}
			// filter 된 셀 렌더링
			self.calcAndRedraw();
			self.pageInfo();
		},20);
	};
	AlopexGrid.prototype._filterCellRender = function(mapping, contentonly){
		var self = this;
		var columnIndex = mapping.columnIndex;
		
		var filterCell = document.createElement('div');
		filterCell.className = "cell filtercell" + (columnIndex===self.state.maxColumnIndex?" lastcell":"")
		//filterCell.innerHTML = "&nbsp;";

		if(!self.state.forceRenderAll) {
			filterCell.setAttribute('data-alopexgrid-columnindex', columnIndex);
		}
		
		if(mapping.key && mapping.filter !== false) {
			var filterData = (self.state.filter ? self.state.filter[columnIndex] : null) || {key:mapping.key};
			filterData.columnIndex = mapping.columnIndex;
			
			var filterUI = document.createElement('div');
			filterUI.className = "filter-cell-unit";
			//console.log('_drawFilterUnit', self._drawFilterUnit(filterData))
			filterUI.innerHTML = self._drawFilterUnit(filterData, columnIndex);
	
			if(!self.state.forceRenderAll) {
				filterUI.setAttribute('data-alopexgrid-columnindex', columnIndex);
			}
			
			if(contentonly) return filterUI;
			
			// var eventhandler = ["AlopexGrid.run('",self.key,"','_headerFilterChange',this,event);"].join('');
			// _addEventAttribute(filterCell, 'onclick', eventhandler);
			// _addEventAttribute(filterCell, 'onkeyup', eventhandler);
			// _addEventAttribute(filterCell, 'onchange', eventhandler);
			filterCell.appendChild(filterUI);
		}
		return filterCell;
	};
	AlopexGrid.prototype._needEditedRefresh = function(){
		var self = this;
		// self._footerRefresh();
		// self._pinnedRefresh();
	};

	AlopexGrid.prototype._hasFooter = function(position) {
		var self = this;
		var option = self.option;
		if($.isPlainObject(option.footer) && $.isArray(option.footer.footerMapping)
				&& option.footer.footerMapping.length) {
			if(position && option.footer.position && option.footer.position !== position) {
				return false;
			}
			return true;
		}
		return false;
	};

	AlopexGrid.prototype._footerRowRender = function(viewoption){
		var self = this;
		var option = self.option;
		if(self._hasFooter()) {
			option.footer.data = {};
			var footerRow = { tag: "tr", attr: { styleclass: "row footerrow" }, child : [] };
			for (var i = 0; i <= self.state.maxColumnIndex; i++) {
				if(!isMappingVisible(self.option.columnMapping[i])) continue;
				if(viewoption && self.option.columnMapping[i].columnIndex > viewoption.columnLimit) continue;
				footerRow.child[i] = { tag : "td", child : "&nbsp;"
					, attr : {styleclass:"cell footercell"+(i===self.state.maxColumnIndex?" lastcell":"")}};
			}
			for(var i=0,l=option.footer.footerMapping.length; i<l; i++) {
				var mapping = option.footer.footerMapping[i];
				var value = self._footerValueByMapping(mapping);
				if(mapping.columnIndex === null || mapping.columnIndex === undefined) {
					continue;
				}
				if(self.isColumnHidden(mapping.columnIndex)) continue;
				if(viewoption && mapping.columnIndex > viewoption.columnLimit) continue;
				var bodymapping = _getMappingFromColumnIndex(self, mapping.columnIndex);
				var footerCell = footerRow.child[bodymapping.columnIndex];
				footerCell.attr["data-alopexgrid-columnindex"] = mapping.columnIndex;//mapping.columnIndex;
				footerCell.attr["styleclass"] += (" alopex-columnindex-"+mapping.columnIndex);
				if(mapping.align) {
					footerCell.attr.styleclass += " align-"+mapping.align;
				}
				if(mapping.styleclass) {
					var classString = mapping.styleclass;
					if($.isFunction(classString)) {
						classString = classString(value, $.extend({}, self.state.footerData), mapping);
					}
					if(classString && typeof classString === "string") {
						footerCell.attr["styleclass"] += (' ' + classString);
					}
				}
				if(mapping.colspan) {
					var colspanValue = mapping.colspan;
					footerCell.attr["colspan"] = colspanValue;
				}
				footerCell.child = value;
			}
			for(var i=0;i<footerRow.child.length;i++) {
				var footerCell = footerRow.child[i];
				if(!footerCell) continue;
				if(footerCell.attr.colspan) {
					for(var j=i+1;j<i+Number(footerCell.attr.colspan);j++) {
						footerRow.child[j] = null;
					}
				}
			}
			return footerRow;
		}
		return null;
	};

	AlopexGrid.prototype._footerRefresh = function(){
		var self = this;
		var option = self.option;
		if(self._hasFooter()) {
			var $footerrows = self.$root.find('.footerrow');
			for(var i=0,l=option.footer.footerMapping.length; i<l;i++) {
				var footerMap = option.footer.footerMapping[i];
				var columnIndex = footerMap.columnIndex;
				var value = self._footerValueByMapping(footerMap);
				if(columnIndex === null || columnIndex === undefined) continue;
				$footerrows.find('.alopex-columnindex-'+columnIndex)
				.html(value);
			}
		}
	};

	function _addCommas(x) {
		var parts = String(x).split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	}
	//TODO filter되었을 때의 footer 대상 데이터는?
	var _footerRenderer = {
			"sum" : function(param){
				var self = this;
				var key = _footerParamToKey(self, param);
				var sum = 0;
				var precision = 0;
				for(var i=0,l=self.state.data.length;i<l;i++) {
					var value = self.state.data[i][key];
					if(!isNaN(Number(value))) {
						sum += Number(value);
						precision = _max(precision, (String(value).split(".")[1]||"").length);
					}
				}
				return _addCommas(parseFloat(sum).toFixed(precision));
			},
			"average" : function(param){
				var self = this;
				var key = _footerParamToKey(self, param);
				var sum = 0;
				var count = 0;
				for(var i=0,l=self.state.data.length;i<l;i++) {
					var value = self.state.data[i][key];
					if(!isNaN(Number(value))) {
						sum += Number(value);
						count++;
					}
				}
				return _addCommas(!count ? 0 : Math.round(sum/count*10)/10);
			},
			"stdev" : function(param) {
				var self = this;
				var key = _footerParamToKey(self, param);
				var integral = 0;
				var sum = 0;
				var count = 0;
				for(var i=0,l=self.state.data.length;i<l;i++) {
					var value = self.state.data[i][key];
					if(!isNaN(Number(value))) {
						sum += Number(value);
						integral += (Number(value)*Number(value));
						count++;
					}
				}
				return _addCommas(!count ? 0 : Math.round(Math.sqrt( (integral/count) - (sum/count)*(sum/count) )*10)/10);
			},
			"count" : function(param){
				var self = this;
				var key = _footerParamToKey(self, param);
				var count = 0;
				for(var i=0,l=self.state.data.length;i<l;i++) {
					var value = self.state.data[i][key];
					if(_valid(value) && value) count++;
				}
				return _addCommas(count);
			},
			"countif" : function(param,value){
				var self = this;
				var key = _footerParamToKey(self, param);
				var count = 0;
				for(var i=0,l=self.state.data.length;i<l;i++) {
					var datavalue = self.state.data[i][key];
					if(datavalue !== undefined && datavalue !== null && datavalue === value) count++;
				}
				return _addCommas(count);
			},
			"min" : function(param) {
				var self = this;
				var key = _footerParamToKey(self, param);
				var min = undefined;
				for(var i=0,l=self.state.data.length;i<l;i++) {
					var datavalue = self.state.data[i][key];
					if(min === undefined || Number(datavalue) < Number(min)) {
						min = Number(datavalue);
					}
				}
				return _addCommas(min);
			},
			"max" : function(param) {
				var self = this;
				var key = _footerParamToKey(self, param);
				var max = 0;
				for(var i=0,l=self.state.data.length;i<l;i++) {
					var datavalue = self.state.data[i][key];
					if(Number(datavalue) > Number(max)) {
						max = Number(datavalue);
					}
				}
				return _addCommas(max);
			},
			"key" : function(key) {
				var self = this;
				self.state.footerData = self.state.footerData || {};
				var value = self.state.footerData[key];
				return _valid(value) ? value : "";
			}
	};
	function _footerParamToColumnIndex(cstr) {
		return Number(cstr.split("c").pop());
	}
	function _footerParamToKey(self,cstr) {
		var key = null;
		var ci = Number(cstr);
		if(isNaN(ci)) {
			if(cstr.charAt(0) == "c") {
				ci = Number(cstr.split("c").pop());
				key = _getColumnKeyFromColumnIndex(self, ci);
			}
			if(key === null) {
				key = cstr;
			}
		} else {
			key = _getColumnKeyFromColumnIndex(self, ci);
		}
		return key;
	}

	AlopexGrid.prototype._footerValueByMapping = function(footerMap) {
		//columnIndex:footer가 표시될컬럼위치, render : 계산할내용, title : 이게 우선. value는 무조건 title
		if(typeof footerMap.title === "string") {
			//무조건 타이틀이 우선
			return footerMap.title;
		}
		var self = this;
		var result = [];

		if(footerMap.render) {
			var render = footerMap.render;
			if(typeof render === "string") render = [render];
			for(var i=0,l=render.length;i<l;i++) {
				var func = render[i];
				if($.isFunction(func)) {
					result.push(func($.extend(true, [], self.state.data)));
				} else {
					var method = (func.match(/((^\w+)[(].+[)])/i) || [null]).pop();
					var param = (func.match(/[^(]*\(([^)]*)\)/) || ['',null])[1];
					var params = param ? param.split(/\W+/) : null;

					if(!method) {
						result.push(func);
					} else if($.isFunction(_footerRenderer[method])) {
						result.push(_footerRenderer[method].apply(self, params));
					}	
				}
			}
		}
		var value = result.join('');
		if(footerMap.key) {
			self.state.footerData[footerMap.key] = value;
		}
		return (!value || !value.length) ? "&nbsp;" : value;
	};
	AlopexGrid.prototype._footerData = function(key, value) {
		this.state.footerData = this.state.footerData  || {};
		if(value === null || value === undefined) {
			delete this.state.footerData[key];
		} else {
			this.state.footerData[key] = value;
		}
	};
	AlopexGrid.prototype.footerData = function() {
		var self = this;
		var args = $.makeArray(arguments);
		self.state.footerData = self.state.footerData || {};
		var dataChanged = false;
		if($.isPlainObject(args[0])) {
			for(var prop in args[0]) {
				if(args[0].hasOwnProperty(prop)) {
					self._footerData(prop, args[0][prop]);
					dataChanged = true;
				}
			}
		} else if(typeof args[0] === "string") {
			var key = args[0];
			var value = args[1];
			if(args.length < 2) {
				value = self.state.footerData[key];
				return _valid(value) ? value : null;
			} else {
				self._footerData(key, value);
				dataChanged = true;
			}
		}
		if(dataChanged) {
			self._needEditedRefresh();
		}
		if(!args.length) {
			return $.extend({},self.state.footerData);
		}
	};

	AlopexGrid.prototype.sortClear = function() {
		var self = this;
		self.$wrapper.find('.headercell.sorting').removeClass("asc desc");
		self.state.sortingColumn = undefined;
		self.state.sortingDirection = undefined;
		self.state.sortingMulti = undefined;

		self._showProgress(function(){
			var tret = null;

			tret = self._triggerGridEvent('sortClear', {"paging":self.pageInfo()});
			if(tret === false) {
				return;
			}

			if (self.state.columnRowspanned) {
				for ( var i in self.option.columnMapping) {
					var mapping = self.option.columnMapping[i];
					if (mapping.rowspan === "asc" || mapping.rowspan === "desc") {
						self.redraw();
						break;
					}
				}
			}
		}, 10);
	};

	function _isEmptyQuery(query) {
		return (!query || $.isEmptyObject(query));
	}

	AlopexGrid.prototype._noData = function() {
		if (!this.state.data || !this.state.data.length) {
			return true;
		}
		return false;
	};

	function _columnRowspanned(rowspanindex, myindex, getindex) {
		var result = false;
		var summary = rowspanindex[rowspanindex.length - 1];
		if (!summary) {
			return;
		}
		var index = summary[myindex];
		if(!index) return false;
		var from = Number(index.from);
		var to = Number(index.to);
		var my = Number(myindex);
		if (from === my) {
			return getindex ? index : (to - from);
		}
		if (from < my && my < to) {
			return getindex ? index : true;
		}
		return false;
	}

	function _columnRowspanWidestIndex(rowspanindex, dataIndex) {
		var result = null;
		if (!rowspanindex || !rowspanindex.length) {
			return result;
		}
		$.each(rowspanindex, function(idx,rindex) {
			if(!rindex) {
				return;
			}
			if(!result) {
				result = _columnRowspanned(rindex, Number(dataIndex), true);
			} else {
				var comp = _columnRowspanned(rindex, Number(dataIndex), true);
				if(Math.abs(comp.to - comp.from) > Math.abs(result.to - result.from)) {
					result = comp;
				}
			}
		});
		return result;
	}

	AlopexGrid.prototype._sortInternalData = function(_list, _col, _dir, _filter) {
		var self = this;
		var option = this.option;
		this.state.data = this.state.data || [];
		var vdata = ($.isArray(_list)) ? $.extend(true, [], _list) : this.state.data;
		var sortingColumn = (_col !== undefined) ? _col : Number(this.state.sortingColumn);
		var sortingMapping = null;
		var dir = _dir ? _dir : this.state.sortingDirection;
		var sorted = false;
		var hasRowspan = false;
		var rowspanAlwaysColumn = null;
		var rowspanAlways = false;
		var rowspanMapping = [];
		var collen = 0;//for rowspanindex.

		self.state.groupRowspanned = false;
		self.state.columnRowspanned = false;
		delete self.state.rowspanindex;
		self.state.rowspanindex = null;

		for ( var i in option.columnMapping) {
			var mapping = option.columnMapping[i];
			if (!isNaN(Number(mapping.columnIndex)) && mapping.key) {
				collen++;
			}
			if (sortingColumn === Number(mapping.columnIndex)) {
				sortingMapping = mapping;
			}
			if (mapping.rowspan === "always") {
				rowspanAlways = mapping;
				rowspanAlwaysColumn = Number(mapping.columnIndex);
			}
			if (mapping.rowspan) {
				hasRowspan = true;
			}
			if (mapping.rowspan === true || mapping.rowspan === "always") {
				rowspanMapping.push(mapping);
			}
		}
		var useSortingMulti = $.isArray(self.state.sortingMulti) && self.state.sortingMulti.length;
		//rowspanalways가 없으면 일반 정렬수행
		function sortfunc(array, key, filt, dir, begin, end) {
			var order = dir === "asc" ? 1 : (dir === "desc" ? -1 : 0);
			if (order === 0) { //sort() is not stable over browsers
				return false;
			}
			var partial = !!(begin || end);
			begin = begin || 0;
			end = end || array.length;
			var workingfilter = filt || "string";
			if(filt === true) workingfilter = "string";
			var detected = typeof filt === "string" ? true : false;
			//vdata.sort(function(former,latter) {//오름차순정렬은 order=1
			var comparison = function(former, latter) {
				var fv = former[key];
				var lv = latter[key];
				if($.isFunction(workingfilter)) {
					var ret = workingfilter(fv, lv) || 0;
					return ret * order;
				}
				if(self.option.autoSortingType && !detected) {
					var fvnum = $.isNumeric(fv);
					var lvnum = $.isNumeric(lv);
					if(fvnum && lvnum) {
						workingfilter = "number";
						detected = true;
					} else if(fvnum && !lv) {
						workingfilter = "number";
						detected = true;
					} else if(!fv && lvnum) {
						workingfilter = "number";
						detected = true;
					} else if(fv && lv && !fvnum && !lvnum){
						workingfilter = "string";
						detected = true;
					}
				}
				var filter = workingfilter == "number" ? Number : String;

				if (fv === undefined || fv === null) {
					fv = workingfilter === "number" ? Number.NEGATIVE_INFINITY : "";
				}
				if (lv === undefined || lv === null) {
					lv = workingfilter === "number" ? Number.NEGATIVE_INFINITY : "";
				}
				if(typeof workingfilter === "string") {
					fv = filter(fv);
					lv = filter(lv);
				}
				var apinned = self.state.pinnedDataIdMap ? self.state.pinnedDataIdMap[former._index.id] : false;
				var bpinned = self.state.pinnedDataIdMap ? self.state.pinnedDataIdMap[latter._index.id] : false;
				//if (workingfilter !== "number") {
//				if(typeof fv === "string") {
//				fv = fv.toLowerCase();
//				}
//				if(typeof lv === "string") {
//				lv = lv.toLowerCase();
//				}

				//고정행 데이터를 가장 위에 올린다.
				if(apinned && !bpinned) return -1;
				if(!apinned && bpinned) return 1;

				var ret = 0;
				if (fv < lv) {
					return -1 * order;
				}
				else if (fv > lv) {
					return 1 * order;
				}
				if(useSortingMulti) {
					var cur = 0;
					var curEnd = self.state.sortingMulti.length;
					while(cur < curEnd) {
						var criteria = self.state.sortingMulti[cur];
						var suborder = (criteria.sortingDirection ==="desc") ? -1 : 1;
						var subkey = self.state.columnIndexToKeyMap[criteria.sortingColumn] || criteria.sortingKey;
						var subfilt = criteria.sortingType || (self.state.columnIndexToMapping[criteria.sortingColumn] || {}).sorting || "string";
						var subfilter = String;
						if(subfilt === "number") {
							subfilter = Number;
						}
						if(!subkey) break;
						var sfv = subfilter(former[subkey]);
						var slv = subfilter(latter[subkey]);
						if(sfv === slv) {
							cur++;
							continue;
						}
						if(sfv < slv) {
							return -1 * suborder;
						}
						if(sfv > slv) {
							return 1 * suborder;
						}
						return 0;
					}
				}
				return (former._index.data - latter._index.data) || 0;
			};
			var part = partial ? array.splice(begin, end-begin) : array;
			part.sort(comparison);
			if(partial) {
				part.unshift(begin, 0);
				array.splice.apply(array, part);	
			}
			return true;
		}
		//동적바인딩 적용시 정렬을 하지 않는다.
		if (!rowspanAlways && dir && sortingColumn !== undefined &&
				(!this.state.dynamicBinding || self.option.clientSortingOnDynamicDataSet)
		) {
			for ( var i in option.columnMapping) {
				var mapping = option.columnMapping[i];
				var sorting = mapping.sorting;
				if ((sorting || _list) && Number(mapping.columnIndex) === sortingColumn) {
					sortfunc(vdata, mapping.key, _filter || sorting, dir);
					sorted = true;
				}
			}
		}
		//rowspan을 반드시 실시하는 컬럼이 있을 경우 이에 따라 묶음수행. _rowspanPack은 필요에 따라 호출한다.
		//_rowspanPack(vdata, mapping)
		if (rowspanAlways && sortingColumn !== undefined) {
			//always가 정렬로 선택된 컬럼이거나. 또는 by가 지정하는 컬럼이 정렬로 선택되었는데
			//by가 지정하는 컬럼이 always인 경우는 always항목에 준하여 sorting을 수행해야 한다.
			if (rowspanAlwaysColumn === sortingColumn
					//|| rowspanAlwaysColumn === (sortingMapping.rowspan ? sortingMapping.rowspan.by : false)
			) {
				//이때엔 세부정렬 기준이 있을시 이에 의거한 정렬을 우선 수행 후.
				//rowspan always의 정렬을 수행한다.
				var submap = false;
				for ( var i in option.columnMapping) {
					var mapping = option.columnMapping[i];
					if (mapping.key && (mapping.rowspan == "asc" || mapping.rowspan == "desc")) {
						submap = mapping;
						break;
					}
				}
				if (submap) {
					//세부기준에 의거한 sorting을 수행한다.
					sortfunc(vdata, submap.key, null, submap.rowspan);
				}
				//always항목에 의거한 sorting을 수행한다.
				sortfunc(vdata, rowspanAlways.key, null, dir);
				if (rowspanAlwaysColumn === (sortingMapping.rowspan ? sortingMapping.rowspan.by : false)) {
					//always에 의거하여 packing을 실시한 뒤, by를 가지는 sortingColumn의 값들을 기준으로
					//pack된 값들을 정렬해야 한다.
					sortfunc(vdata, sortingMapping.key, null, dir);
					_rowspanPack(vdata, rowspanAlways);
				}
			} else {
				//이때는 rowspanalways항은 있는대로 놔두긴 하지만
				//대신 _rowspanPack을 수행하여 묶어내고.
				//이들에 대해 묶이는 아이템들에 대해 일일이 부분정렬을 sortingColumn에 의하여 정렬한다.
				//_sort(vdata, comparision, begin, end)
				_rowspanPack(vdata, rowspanAlways);

				//rowspan=asc|desc처리. 이 처리는 사용자 지정된 sortingColumn보다 먼저 일어나야 한다.
				for ( var i in option.columnMapping) {
					var mapping = option.columnMapping[i];
					if (mapping.rowspan === "asc" || mapping.rowspan === "desc") {
						var begin = 0;
						var end = vdata.length;
						var sortingkey = mapping.key;
						while (begin < end) {
							var from = begin;
							var to = begin + 1;
							//rowspanAlways에 해당하는 컬럼의 값이 어디까지 동일한지 추출.
							while (to < end && vdata[from][rowspanAlways.key] === vdata[to][rowspanAlways.key]) {
								to++;
							}
							sortfunc(vdata, sortingkey, null, mapping.rowspan, from, to);
							begin = to;
						}
					}
				}

				var begin = 0;
				var end = vdata.length;
				var sortingkey = null;
				for ( var i in option.columnMapping) {
					if (Number(option.columnMapping[i].columnIndex) === Number(sortingColumn)) {
						sortingkey = option.columnMapping[i].key;
					}
				}
				while (begin < end) {
					var from = begin;
					var to = begin + 1;
					//rowspanAlways에 해당하는 컬럼의 값이 어디까지 동일한지 추출.
					while (to < end && vdata[from][rowspanAlways.key] === vdata[to][rowspanAlways.key]) {
						to++;
					}
					sortfunc(vdata, sortingkey, null, dir, from, to);
					begin = to;
				}
			}
		} else if (rowspanAlways && (sortingColumn === undefined || sortingColumn === null)) {
			_rowspanPack(vdata, rowspanAlways);
		}

		// if(_list===undefined) {
		// 	self._generateDataIndex(vdata);
		// }
		// if(self._hasPinnedData()) {
		// 	//틀고정된 데이터는 무조건 위로 올린다.
		// 	vdata.sort(function(a,b){
		// 		var apinned = self.state.pinnedDataIdMap[a._index.id];
		// 		var bpinned = self.state.pinnedDataIdMap[b._index.id];
		// 		if(apinned && !bpinned) return -1;
		// 		if(!apinned && bpinned) return 1;
		// 		return (a._index.data - b._index.data) || 0;
		// 	});
		// }

		if(self.option.grouping) {
			//실제는 grouping 대상 key에 대해 우선순위를 정해서
			//상위부터 묶고, 다시 하위에서 묶는 방식으로 적용해야 함.
			if(self.option.grouping.by && self.option.grouping.useGrouping) {
				var groupBy = self.option.grouping.by;
				groupBy = $.isArray(groupBy) ? groupBy : [groupBy];
				if(groupBy[0]===true) {
					groupBy = groupBy.slice(1);
				}
				//_rowspanPack(vdata, {rowspan:"always",key:self.option.grouping.by});
				var groupOccurrenceMap = {};
				var groupOccurrenceOrder = {};
				$.each(groupBy, function(idx, groupname){
					var localOccured = {};
					var goo = groupOccurrenceOrder[groupname] = {};
					var gooCount = 0;
					var mm = vdata.map(function(data){
						var val = data[groupname];
						if(goo[val] === undefined) {
							goo[val] = gooCount++;
							return val;
						}
					});
					var ff = mm.filter(function(value){return value !== undefined});
					groupOccurrenceMap[groupname] = ff;
				});
				//groupOccurrenceMap의 array는 출현순서대로 array가 구성된다.
				//이 순서대로 vdata의 데이터들을 splice해서 묶으면 될 것? n단그룹에서 문제가 됨.
				var bylen = groupBy.length;
				if(self.option.grouping.useGroupRearrange) {
					vdata.sort(function(former,latter){
						for(var i=0;i<bylen;i++) {
							var compareKeyName = groupBy[i];
							var formerVal = former[compareKeyName];
							var latterVal = latter[compareKeyName];
							var fo = groupOccurrenceOrder[compareKeyName][formerVal];
							var lo = groupOccurrenceOrder[compareKeyName][latterVal];
							if(fo < lo) {
								return -1;
							}
							if(fo > lo) {
								return 1;
							}
						}
						//끝까지 값이 같으면 원래 순서대로 앞뒤를 정한다.
						return former._index.data - latter._index.data;
					});
				}

				//if(self.option.grouping.useGroupRowspan) {
				if(true) {
					//데이터들이 자신의 dataIndex와 key/columnIndex값 만으로 lookup을 할 수 있는
					//lookup table을 만든다.

					//self.state.groupRowspanned = true;
					self.state.groupRowspanned = !!self.option.grouping.useGroupRowspan;
					self.state.groupingLookupTable = {};
					self.state.groupOccurrenceMap = groupOccurrenceMap;
					self.state.groupOccurrenceOrder = groupOccurrenceOrder;

					var groupByLength = groupBy.length;
					var lookupTable = self.state.groupingLookupTable;
					var lookupStack = [];
					for(var i=0;i<groupByLength;i++) {
						lookupTable[groupBy[i]] = [];
					}

					for(var i=0,l=vdata.length;i<l;i++) {
						var data = vdata[i];
						var nextData = vdata[i+1];
						var currentStack = [];
						var nextStack = [];

						for(var j=0;j<groupByLength;j++) {
							var key = groupBy[j];
							currentStack.push(key===true?undefined:data[key]);
							nextStack.push(nextData ? nextData[key] : null);
							if(!lookupStack[j]) {
								lookupStack[j] = {
										"from":i,
										"value":data[key],
										"childGroup":[],
										"childGroupValue":[],
										"childGroupEndIndex":[]
								};
							}
							lookupTable[key][i] = lookupStack[j];
						}

						for(var j=groupByLength-1;j>=0;j--) {
							var groupChanged = false;
							for(k=j;k>=0;k--) {
								if(currentStack[k] !== nextStack[k]) {
									groupChanged = true;
									break;
								}
							}
							//i = dataIndex
							if(i===(self.state.pinnedDataIdList||[]).length-1
									&& self.option.hidePinnedData) {
								groupChanged = true;
							}
							var under = [];
							var underValue = [];
							var key = groupBy[j];
							for(k=j-1;k>=0;k--){
								under.push(groupBy[k]);
								underValue.push(data[groupBy[k]]);
							}
							if(groupChanged) {
								//lookupStack에 to를 기록하고 지워버린다. 다음 iteration에서 lookupStack을 다시 
								//{from:i} 부터 채워넣는다.
								lookupStack[j]["to"] = i;
								lookupStack[j]["under"] = under;
								lookupStack[j]["underValue"] = underValue;
								lookupStack[j] = null;
								for(k=j-1;k>=0;k--) {
									lookupStack[k]["childGroup"].push(key);
									lookupStack[k]["childGroupValue"].push(data[key]);
									lookupStack[k]["childGroupEndIndex"].push(i);
								}
							}
						}
					}
				}
			}
		}

		for (var i = vdata.length; i >= 0; i--) {
			if (!vdata[i]) {
				vdata.splice(i, 1);
			}
		}

		if(_list===undefined) {
			self._generateDataIndex(vdata);
		}

		if(self._hasPinnedData()) {
			//self.state.dataIdToIndexMap[dataid] = dataIndex;
			self.state.pinnedDataIdList.sort(function(a,b){
				return (self.state.dataIdToIndexMap[a] - self.state.dataIdToIndexMap[b]) || 0
			});
		}

		//state.rowspanindex를 작성하고 state.columnRowspanned를 true로 설정한다.
		if(self.option.grouping && self.option.grouping.useGrouping &&
				self.option.grouping.by && _list === undefined) {
			//no rowspan by columnMapping. grouping을 쓸 때엔 일반 rowspan을 완전 비활성 시킨다.
		} else if (hasRowspan && _list === undefined) {
			var ri = [];
			for (var i = 0; i < collen; i++) {
				ri.push(undefined);
			}
			var index = 1;
			$.each(rowspanMapping, function(idx, mapping) {
				var begin = 0;
				var end = vdata.length;
				ri[Number(mapping.columnIndex)] = [];
				var ritem = ri[Number(mapping.columnIndex)];
				var summary = [];
				while (begin < end) {
					var from = begin;
					var to = begin + 1;
					//rowspanAlways에 해당하는 컬럼의 값이 어디까지 동일한지 추출.
					while (to < end && vdata[from][mapping.key] === vdata[to][mapping.key]) {
						to++;
					}
					var item = {
							from: from,
							to: to,
							index: index++
					};
					for (var i = from; i < to; i++) {
						summary[i] = item;
					}
					ritem.push(item);
					begin = to;
				}
				ritem.push(summary);//console.log(summary)
			});
			for ( var i in option.columnMapping) {
				var mapping = option.columnMapping[i];
				if (mapping.rowspan && typeof mapping.rowspan.by == "number") {
					if (mapping.rowspan.under) {
						//under : true
						var by = ri[mapping.rowspan.by];
						by = by[by.length - 1];
						var begin = 0;
						var end = vdata.length;
						ri[Number(mapping.columnIndex)] = [];
						var ritem = ri[Number(mapping.columnIndex)];
						var summary = [];
						while (begin < end) {
							var from = begin;
							var to = begin + 1;
							//rowspanAlways에 해당하는 컬럼의 값이 어디까지 동일한지 추출.
							while (to < end && vdata[from][mapping.key] === vdata[to][mapping.key]) {
								//console.log(' loop', from, to, by[from])
								if (to + 1 > by[from].to) {
									break;
								}
								to++;
							}
							//console.log('merge', from, to)
							var item = {
									from: from,
									to: to,
									index: index++
							};
							for (var i = from; i < to; i++) {
								summary[i] = item;
							}
							ritem.push(item);
							begin = to;
						}
						ritem.push(summary);//console.log(summary)

					} else {
						ri[mapping.columnIndex] = ri[mapping.rowspan.by];
					}
				}
			}
			delete this.state.rowspanindex;
			var valid = false;
			for ( var i in ri) {
				if (ri[i]) {
					valid = true;
				}
			}
			if (valid) {
				this.state.rowspanindex = ri;
				this.state.columnRowspanned = true;
			} else {
				this.state.rowspanindex = undefined;
				this.state.columnRowspanned = false;
			}
		} else {
			this.state.rowspanindex = undefined;
			this.state.columnRowspanned = false;
		}

		if (_list !== undefined) {
			return vdata;
		}
//		$.each(vdata, function(idx, item) {
//		item._index = $.extend({}, item._index);
//		item._index.data = idx;
//		});
		return sorted;
	};
	AlopexGrid.prototype._dataMoveByDataindex = function(old_dataindex, new_dataindex) {
		if (!this.state.data || !this.state.data.length) {
			return;
		}
		var list = this.state.data;
		list.splice(new_dataindex + (new_dataindex > old_dataindex ? -1 : 0), 0, list.splice(old_dataindex, 1)[0]);
	};
	function _dataSlice(self, list, remove) {
		if(!list) return null;
		var sliced = [];
		if(!$.isArray(list)) list = [list];
		var idlist = $.map(list, function(data) {
			if(!data || !data._index) return;
			return data._index.id;
		});
		$.each(self.state.data, function(idx,data){
			if($.inArray(data._index.id, idlist)>=0) {
				sliced.push(data);
			}
		});
		if(remove) {
			var i = self.state.data.length;
			while(i--){
				var data = self.state.data[i];
				if($.inArray(data._index.id, idlist)>=0) {
					self.state.data.splice(i,1);
				}
			}
		}
		return sliced;
	}
	AlopexGrid.prototype.dataMove = function(fromquery, toquery, after) {
		var self = this;
		if(self._noData()) return;
		if(_isEmptyQuery(fromquery)) return;
		if(_isEmptyQuery(toquery)) return;
		var fromlist = self.dataGet(fromquery);
		var tolist = self.dataGet(toquery);
		if(!fromlist || !tolist || !fromlist.length || !tolist.length) return;
		if(!tolist[0] || !tolist[0]._index) return;
		var toindex = tolist[0]._index.data;
		if(!_valid(toindex)) return;
		//do actual modification
		var fromdatalist = _dataSlice(self, fromlist, true);
		$.each(self.state.data, function(idx, data){
			if(data && data._index && toindex <= data._index.data) {
				var comp = 0;
				//inc only if data exists
				if(after === true && toindex === data._index.data) comp++;
				toindex = idx + comp;
				return false;
			}
		});
		if(toindex >= 0) {
			self.state.data.splice.apply(self.state.data, [toindex, 0].concat(fromdatalist) );
		} else {
			//problem
		}
		self.sortClear();
		self.calcAndRedraw();
	};
	function _positionToPercentage(position, isPositionY) {
	  var map = {"left":0,"middle":50,"right":100};
	  if (isPositionY) {
	    map = {"top":0,"middle":50,"bottom":100};
	  }
		var percentage = null;
		if(map.hasOwnProperty(position)) {
			percentage = map[position];
		} else if(typeof position == "string" && position.indexOf('%') >= 0) {
			percentage = Number(position.split('%')[0]);
		} else if(!isNaN(Number(position))) {
			percentage = Number(position);
		}
		return percentage;
	}
  /**
   * rowIndex, position을 넣었을때 translateY값과 renderFromRenderedIndex 세팅
   */
	function _setRowTranslateY(rowIdx, position, self) {
	  var rowFixedLength = self.option.rowFixCount;
	  var translateY = 0;
	  var rowIndex = 0;
	  if (position == 100 || position == 50) {
	    var diffRowLength = 0;
	    if (position == 100 && self.state.scrollyRenderedItemMaxLength != self.state.scrollyRenderedItemLength) {
	      diffRowLength = self.state.scrollyRenderedItemMaxLength - self.state.scrollyRenderedItemLength;
	    }
	    var moveRatio = Math.ceil(self.state.scrollyRenderedItemLength*(position/100));
	    rowIndex = (rowIdx - moveRatio + diffRowLength);
	    if (rowIndex <= 0) {
	    	rowIndex = 0;
	    }
	    translateY = rowIndex*self.state.rowHeight*self.state.scrollyRatio;
	    if (translateY >= (self.state.scrollbaryTrackLength - self.state.scrollbaryHeight)) {
	      self.state.scrollyEnd = true;
	      self.state.renderFromRenderedIndex = self.state.lastScrollyIndex;
	      translateY = self.state.scrollbaryTrackLength - self.state.scrollbaryHeight;
	    } else {
	      self.state.scrollyEnd = false;
	      self.state.renderFromRenderedIndex = rowIndex;
	    }
	  } else {
	    self.state.renderFromRenderedIndex = rowIdx - rowFixedLength;
	    translateY = self.state.renderFromRenderedIndex*self.state.rowHeight*self.state.scrollyRatio;
	    if (translateY >= (self.state.scrollbaryTrackLength - self.state.scrollbaryHeight)) {
	      self.state.scrollyEnd = true;
	      self.state.renderFromRenderedIndex = self.state.lastScrollyIndex;
	      translateY = self.state.scrollbaryTrackLength - self.state.scrollbaryHeight;
	    } else {
	      self.state.scrollyEnd = false;
	    }
	  }
	  self.state.translateY = translateY;

	}
	/**
	 * columnIndex, position을 넣었을때 translateX값과 renderFromColumnIndex 세팅
	 */
	function _setColumnTranslateX(columnIdx, position, self) {
		var fixedLength = self.state.fixedColumnMapping.length
		var columnIndex = 0;
		var translateX = 0;
		// middle 일때
		if (position == 100 || position == 50) {
			var wrapperWidth = self.state.wrapperWidth*(position/100);
			var columnWidth = 0;
			self.state.scrollxEnd = false;
			for (var i=columnIdx;i>=0;i--) {
				columnWidth += self.state.columnWidthMap[i];
				self.state.renderFromColumnIndex = i;
				if (columnWidth > wrapperWidth){
					self.state.renderFromColumnIndex = i + 1;
					break;
				}
			}
			// TODO fixed 컬럼 안맞음
			translateX = self._generateTranslatex(self.state.renderFromColumnIndex)*self.state.scrollxRatio;

			if (translateX >= (self.state.scrollbarxTrackLength - self.state.scrollbarxWidth)) {
				self.state.scrollxEnd = true;
				self.state.renderFromColumnIndex = self.state.lastScrollxIndex;
				translateX = self.state.scrollbarxTrackLength - self.state.scrollbarxWidth;
			}
		} else {
			columnIndex = self.state.columnIndexArr[self.state.columnIndexArr.indexOf(columnIdx)-fixedLength];
			if (columnIndex == null || columnIndex <= 0) {
				columnIndex = 0;
			}
			translateX = self._generateTranslatex(columnIndex)*self.state.scrollxRatio;

			if (translateX >= (self.state.scrollbarxTrackLength - self.state.scrollbarxWidth)) {
				self.state.scrollxEnd = true;
				self.state.renderFromColumnIndex = self.state.lastScrollxIndex;
				translateX = self.state.scrollbarxTrackLength - self.state.scrollbarxWidth;
			} else {
				self.state.scrollxEnd = false;
				self.state.renderFromColumnIndex = columnIndex;
			}
		}
		self.state.translateX = translateX;

	}
	// TODO position 스크롤 되는 데이터의 위치 top, middle, bottom
	// column Index에 대한 것 새로 추가
	AlopexGrid.prototype.dataScroll = function(query, position, callback) {
	  var self = this;
	  if($.isFunction(position)) {
	    callback = position;
	    position = null;
	  }
	  
	  // 사용자가 이동하고자하는 rowIndex, ColumnIndex 설정
	  var columnIndex = 0;
	  var rowIndex = 0;
	  if(typeof query === "string") {
		  if(query === "top") {
		  	rowIndex = 0;
		  } else if (query === "middle"){
		  	rowIndex = parseInt(self.state.renderTargetDataList.length/2);
		  	if(self.state.refreshbodycell && self.state.refreshbodycell.renderedDataIndexList) {
		  		rowIndex -= parseInt(self.state.refreshbodycell.renderedDataIndexList.length/2);
		  	}
		  } else if (query === "bottom") {
		  	rowIndex = self.state.renderTargetDataList.length-1;
		  } else if(query.indexOf('%')>0) {
		  	var proportion = parseInt(query.split('%')[0]);
		  	rowIndex = parseInt(self.state.renderTargetDataList.length * (proportion/100));
		  }
	  } else if (typeof query === "object" && query._index) {
	    columnIndex = query._index.column;
	    rowIndex = query._index.row;
	    if(rowIndex === undefined) {
	    	rowIndex = query._index.rendered;
	    }
	    if(!_valid(rowIndex)) {
	    	var dataIndex = query._index.data;
	    	if(dataIndex === undefined && query._index.id) {
	    		dataIndex = self.state.dataIdToIndexMap[query._index.id];
	    	}
	    	var data = self.state.data[dataIndex];
	    	if(data) {
				rowIndex = data._index.rendered;	
	    	}
	    }
	  }

	  var scrollPositionX = 0; 
	  var scrollPositionY = 0;
	  if (position != null) {
	    scrollPositionX = _positionToPercentage(position.scrollX) != null? _positionToPercentage(position.scrollX) : 0;
	    scrollPositionY = _positionToPercentage(position.scrollY, true) != null? _positionToPercentage(position.scrollY, true) : 0;
	  }

	  //console.log('percentage = ' + scrollPositionX + ',  ' + scrollPositionY);
	  // y축 데이터 스크롤
	  if (rowIndex != null && self.state.scrollyMoveable) {
	    _setRowTranslateY(rowIndex, scrollPositionY, self);
	  }

	  // x축 데이터 스크롤
	  if (columnIndex != null && self.state.scrollxMoveable) {
	    _setColumnTranslateX(columnIndex, scrollPositionX, self);
	  }

	  if (rowIndex != null || columnIndex != null) {
	    self._refreshBoard();
	    //renderlog('self.state.renderFromColumnIndex = ' + self.state.renderFromColumnIndex);
	    //renderlog('self.state.renderFromRenderedIndex = ' + self.state.renderFromRenderedIndex);
	  }

	  if($.isFunction(callback)) {
	    setTimeout(function() {
	      callback();
	    }, 10);
	  }
	};
	
	AlopexGrid.prototype._dataSetState = function(query, state, norender) {
		var self = this;
		var data = self.dataGetByIndex(query._index);
		if (!data) {
			return;
		}
		var rec = null;
		if(state.deleted === true || data._state.deleted) {
			state.editing = false;
		}
		if($.isFunction(self.option.rowOption.allowEdit) && self.option.rowOption.allowEdit(data)===false) {
			state.editing = false;
		}
		if (!data._state.editing && state.editing) {
			rec = AlopexGrid.trimData(data);
		}
		data = $.extend(true, data, {
			_state: state || {}
		});
		if (!self.state.data[data._index.data]) {
			return;
		}
		if (rec) {
			self.state.data[data._index.data]._state.recent = rec;
			data._state.recent = rec;
		}

		this.state.data[data._index.data]._state = data._state;
		if (!data._state.editing) {
			_deleteRecent(this.state.data[data._index.data]);
		}
		if (data._state && data._state.recent) {
			data = $.extend(true, {}, data, data._state.recent);
		}

		if(norender !== true) {
			this.refreshRow({_index:{data:data._index.data}});
		}
	};

	//AlopexGrid.prototype.setFilter = function(filter) {...}
	AlopexGrid.prototype.setFilter = function(filterName, filter, norender) {
		var self = this;
		if(!filter) {
			filter = filterName;
			filterName = _generateUniqueId();
		}
		if(!_valid(filterName)) filterName = _generateUniqueId();
		self.state.filter = $.extend({},self.state.filter);
		self.state.filter[filterName] = filter;
		if(norender !== true) {
			self._showProgress(function(){
				self.calcAndRedraw();
			});
		}
		return filterName;
	};
	AlopexGrid.prototype.deleteFilter = function(filterName, norender) {
		var self = this;
		if(filterName && self.state.filter && self.state.filter[filterName]) {
			delete self.state.filter[filterName];
			if($.isEmptyObject(self.state.filter)) {
				delete self.state.filter;
			}
			if(!norender) {
				self._showProgress(function(){
					self.calcAndRedraw();
				});	
			}
			return true;
		}
		self.pageInfo();
		return false;
	};
	AlopexGrid.prototype.clearFilter = function(norender) {
		var self = this;
		if(self.state.filter) {
			delete self.state.filter;
			if(norender !== true) {
				self._showProgress(function(){
					self.calcAndRedraw();
				});
			}	
		}
	};

	AlopexGrid.prototype.showSortDialog = function(){

	};

	AlopexGrid.prototype._isDataFolded = function(data,depth) {
		var self = this;
		self.state.folded = self.state.folded || [];
		//return true; 아예 지워버려서 그려질 필요도 없음
		//return "unfold"; unfold용 데이터임.
		//TODO useSummary:false일 떄 동작하는 방안은?

		if(data._meta) {
			var dataValues = data["_groupValues"];
			var upperExist = false;
			var sameExist = false;
			//상위그룹에서 제거되었으면 그때에만 완전 지움. return true;
			//그리고나서
			//그룹과 완전히 일치하면 return unfold를 함.
			//$.each(self.state.folded, function(idx,foldItem){
			for(var idx=0,l=self.state.folded.length;idx<l;idx++) {
				var foldItem = self.state.folded[idx];
				if(foldItem.length > dataValues.length) return;//깊은단계는 무시.
				if(foldItem.length === dataValues.length) {
					//완전히 일치하는가?
					var yes = true;
					for(var j=0;j<foldItem.length;j++) {
						if(foldItem[j] !== dataValues[j]) yes = false;
					}
					if(yes) sameExist = true;
				}
				if(foldItem.length < dataValues.length) {
					//상위에서 일치한것이 있었는가? 
					var yes = true;
					for(var j=0;j<foldItem.length;j++) {
						if(foldItem[j] !== dataValues[j]) yes = false;
					}
					if(yes) upperExist = true;
				}
			}
			//});
			if(upperExist) {
				return true;
			}
			if(sameExist) return "unfold"
		} else {
			var dataValues = [];
			var groupBy = self.option.grouping.by;
			if(groupBy[0]===true) groupBy = groupBy.slice(1);

			if(!_valid(depth)) {
				depth = Number.POSITIVE_INFINITY;
			} else {
				depth = depth+1;
			}
			
			for(var j=0;j<groupBy.length && j<depth;j++) {
				dataValues.push(String(data[groupBy[j]]));
			}
			//상위그룹이 하나라도 해당되면 완전 지움. return true;
			//단 state.folded의 그룹들이 데이터에 딱 맞아야 함.
			var upperExist = false;
			var exactExist = false;
			//foldItem = ["3","1"]
			//$.each(self.state.folded, function(idx,foldItem){
			for(var idx=0,l=self.state.folded.length;idx<l;idx++) {
				var foldItem = self.state.folded[idx];
				if(foldItem.length <= dataValues.length && foldItem.length <= depth) {
					//상위에서 일치한것이 있었는가? 상위에서 일치했다면
					//fold고 unfold고 그냥 안그리는것이다. return true;
					var yes = true;
					for(var j=0;j<foldItem.length && j<depth;j++) {
						if(foldItem[j] !== dataValues[j]) yes = false;
					}
					if(yes) {
						if(Math.min(depth,foldItem.length) < dataValues.length) {
							upperExist = foldItem;
						} else {
							exactExist = foldItem;
						}
					}
				}
			}
			//});
			
			if(self.option.grouping && self.option.grouping.by && self.option.grouping.by.length && 
					self.option.grouping.useGrouping){// && !self.option.grouping.useSummary) {
				//fold되어 있고 정확히 일치하는 그룹이 있을 때 이것이 최 상위 데이터라면 unfold이다.
				if(!upperExist && exactExist) {
					var lookupTable = self.state.groupingLookupTable;
					var lookupTableItem = lookupTable[groupBy[exactExist.length-1]];
					var lookupItem = lookupTableItem[data._index.data];
					var foldShowLen = Math.max(1,parseInt(self.option.foldShowLength || 1));
					var from = lookupItem["from"];
					var to = Math.min(
							from + Math.max(foldShowLen) -1,
							lookupItem["to"]);
//					if(lookupItem["from"] === data._index.data) {
//						return "unfold";
//					}
					if(data._index.data === to) {
						if(self.option.grouping.useSummary && (to-from+1)===foldShowLen) {
							return "unfold-line";//summary가 fold시 보여주는 영역 가장 끝이므로 데이터는 라인으로 표시.
						} else {
							return "unfold";
						}
					} else if(from <= data._index.data && data._index.data < to) {
						return "unfold-line";
					}
				}
				if(upperExist) {
					//전체 fold된 목록 중 이 데이터가 모든부분에서 최 상위일 경우 이 데이터는 unfold이다. depth를 반영.
					//TODO upperExist 변수 설정 알고리즘 문제있음.
				}
			}
			if(upperExist || exactExist) {
				
				return true;
			}
			
//			var lookupTableItem = lookupTable[groupBy[g]];
//			var lookupItem = lookupTableItem[iconData._index.data];
		}

		return false;
	};
	AlopexGrid.prototype.foldGroup = function(groupByValues, norender) {
		var self = this;
		self.state.folded = self.state.folded || [];
		if(!groupByValues) return;
		if(!self.option.grouping || !self.option.grouping.useGrouping) return;
		if(!$.isArray(groupByValues) || !groupByValues.length) {
			return;
		}
		var exist = false;
		$.each(self.state.folded, function(idx, foldItem){
			var same = true;
			for(var i=0,l1=groupByValues.length,l2=foldItem.length;i<l1||i<l2;i++) {
				if(groupByValues[i] !== foldItem[i]) {
					same = false;
					break;
				}
			}
			if(same) {
				exist = true;
				return false;
			}
		});
		if(!exist) {
			self.state.folded.push($.extend(true, [], groupByValues));
		}
		if(norender===true) return;
		self._showProgress(function(){
			self.calcAndRedraw();
		},10);
	};
	AlopexGrid.prototype.unfoldGroup = function(groupByValues, norender) {
		var self = this;
		self.state.folded = self.state.folded || [];
		if(!groupByValues || !$.isArray(groupByValues) || !groupByValues.length) {
			return;
		}
		if(!self.option.grouping || !self.option.grouping.useGrouping) return;
		var exist = false;
		$.each(self.state.folded, function(idx, foldItem){
			var same = true;
			for(var i=0;i<groupByValues.length||i<foldItem.length;i++) {
				if(groupByValues[i] !== foldItem[i]) {
					same = false;
					break;
				}
			}
			if(same) {
				exist = idx;
				return false;
			}
		});
		if(exist !== false) {
			self.state.folded.splice(exist,1);
		}
		if(norender===true) return;
		self._showProgress(function(){
			self.calcAndRedraw();
		},10);
	};

	AlopexGrid.prototype._generateDataIndex = function(datalist) {
		var self = this;
		var dlist = datalist || self.state.data;
		delete self.state.dataIdToIndexMap;
		self.state.dataIdToIndexMap = {};
		//$.each(dlist, function(dataIndex, data){
		for(var dataIndex=0,l=dlist.length;dataIndex<l;dataIndex++){
			var data = dlist[dataIndex];
			data._index.data = dataIndex;
			self.state.dataIdToIndexMap[data._index.id] = dataIndex;
		}
		//});
	};
	
	AlopexGrid.prototype._getDataFromEvent = function(e){
		var $cell = $(e.target).closest('.bodycell');
		if($cell.length) {
			return this._getRenderedDataFromRenderedIndex(parseInt($cell.attr('data-alopexgrid-renderedindex')));
		}
		return null
	};
	AlopexGrid.prototype._getCellFromEvent = function(e) {
		return $(e.target).closest('.cell');
	};
	//원래의 rendered와 비교하여 무엇이 바뀌었는지를 파악할 떄 사용한다.
	AlopexGrid.prototype._renderedToDataIdList = function(){
		var self = this;
		var datalist = self.state.data;
		return $.map(self.state.rendered, function(renderedIndex, dataIndex) {
			return self._getRenderedDataFromRenderedIndex(renderedIndex)._index.id || dataIndex;
		});
	};
	AlopexGrid.prototype._getRenderedDataFromRenderedIndex = function(renderedIndex) {
		var self = this;

		var dataIndex = self.state.renderTargetDataIndexList[renderedIndex];
		var data = self.state.data[dataIndex] || null;
		return data;
	};

	function isMappingVisible(mapping) {
		return _valid(mapping.columnIndex) && mapping.hidden !== true;
	}
	function isColumnHidden(columnMapping, columnIndexKey) {
		for (var i = 0, l = columnMapping.length; i < l; i++) {
			var mapping = columnMapping[i];
			if(Number(mapping.columnIndex) === Number(columnIndexKey)
					|| (typeof mapping.key === "string" && mapping.key === columnIndexKey)) {
				return !!mapping.hidden;
			}
		}
		return false;
	}
	function getColumnIndexByKey(columnMapping, key) {
		for(var i=0,l=columnMapping.length;i<l;i++) {
			var mapping = columnMapping[i];
			var ci = mapping.columnIndex;
			if(_valid(ci) && mapping.key === key) {
				return ci;
			}
		}
		return null;
	}
	AlopexGrid.prototype.columnInfo = function(columnIK) {
		var self = this;
		var option = self.option;
		var columnMapping = option.columnMapping;
		var columnIndex = columnIK;
		var columnKey = columnIK;
		var info = null;
		$.each(columnMapping, function(idx,mapping) {
			var ci = Number(columnIndex);
			if(ci === Number(mapping.columnIndex)
					|| (typeof mapping.key === "string" && mapping.key === columnKey)
					|| columnIK === mapping) {
				info = $.extend(true, {}, mapping);
				return false;
			}
		});
		return info;
	};
	AlopexGrid.prototype.columnGet = function() {
		var self = this;
		var columnMapping = self.option.columnMapping;
		var cqueries = $.makeArray(arguments);
		var ret = [];
		$.each(columnMapping, function(idx, mapping) {
			var oci = Number(mapping.columnIndex);
			var passed = true;
			$.each(cqueries, function(jdx,cquery) {
				if(!$.isPlainObject(cquery)) return;
				for(var prop in cquery) {
					if(prop === "columnIndex") {
						if(oci !== cquery[prop]) {
							passed = false;
						}
					} else if(prop === "hidden") {
						if(isColumnHidden(columnMapping, oci) !== cquery[prop]) {
							passed = false;
						}
					} else if(cquery[prop] !== mapping[prop]) {
						passed = false;
					}
				}
			});
			if(passed) {
				var cinfo = self.columnInfo(mapping);
				ret.push(cinfo);
			}
		});
		return ret;
	};
	AlopexGrid.prototype.isColumnHidden = function(columnIK) {
		var self = this;
		var option = self.option;
		var columnMapping = option.columnMapping;
		return isColumnHidden(columnMapping, columnIK);
	};
	AlopexGrid.prototype.hideCol = function(ci, noupdate) {
		//columnIndex는 original columnIndex기준으로 입력이 됨을 가정.
		var self = this;
		return self.showCol(ci, noupdate, true);
	};
	AlopexGrid.prototype.showCol = function(ci, noupdate, hidden) {
		var self = this;
		var option = self.option;
		var columnMapping = option.columnMapping;
		var allshow = true;
		if(ci === true) {
			$.each(columnMapping, function(idx,mapping) {
				hidden ? self.hideCol(mapping.key, true) : self.showCol(mapping.key, true);
			});
			self.updateOption();
			return;
		}
		if(typeof ci === "string") {
			ci = ci.split(',');
		} else if (!$.isArray(ci)) {
			ci = [ci];
		}
		$.each(self.option.columnMapping, function(idx,mapping){
			if(_valid(mapping.columnIndex) &&
					($.inArray(mapping.columnIndex, ci) >= 0
							|| $.inArray(mapping.key, ci) >= 0
					)
			){
				mapping.hidden = hidden || false;
			}
		});
		if (noupdate !== true) {
			self.updateOption();
		}
		return;
	};

	AlopexGrid.prototype.dataAdd = function(data, query) {
		var self = this;
		if(self._triggerGridEvent('dataAdd',{"data":data,"query":query})===false) {
			return false;
		}
		if (!data) {
			return;
		}
		if (!self.state.data) {
			self.state.data = [];
		}
		delete self.state.editingCellInfo;
		delete self.state.cellSelection;
		self._rowSelectAllUncheck();
		var items = $.isArray(data) ? data : [data];
		if (!items.length) {
			return;
		}
		if(self.option.dataLengthLimit && (self.state.data.length + items.length) > self.option.dataLengthLimit) {
			var msg = self.option.message.dataLengthLimit || "Exceed Limit.";
			if($.isFunction(msg)) {
				msg = msg(self.state.data.length + items.length);
			}
			alert(msg);
			return;
		}
		if (query && query._index && query._index.row !== undefined) {
			//TODO 보이는 기준으로 삽입. state.rendered의 array index를 기준으로 위치를 계산한다.
		}
		var beforeDataLength = self.state.data.length;
		var hasDefaultState = !$.isEmptyObject(self.option.defaultState.dataAdd) && self.option.defaultState.dataAdd;
		var defaultState = self.option.defaultState.dataAdd;
		var doAllowEditTest = $.isFunction(self.option.rowOption.allowEdit);
		for(var i=0,l=items.length;i<l;i++) {
			var item = items[i];
			// item._state = $.extend({
			// 	edited: false,
			// 	editing: false,
			// 	selected: false,
			// 	added: true,
			// 	deleted : false
			// }, self.option.defaultState.dataAdd, self.option.extendStateOnAdd ? item._state : null);
			var prevState = item._state;
			item._state = {
					edited: false,
					editing: false,
					selected: false,
					added:true,
					deleted : false
			};
			if(hasDefaultState) {
				typeof defaultState.edited === "boolean" ? (item._state.edited = defaultState.edited) : 0;
				typeof defaultState.editing === "boolean" ? (item._state.editing = defaultState.editing) : 0;
				typeof defaultState.selected === "boolean" ? (item._state.selected = defaultState.selected) : 0;
				typeof defaultState.added === "boolean" ? (item._state.added = defaultState.added) : 0;
				typeof defaultState.deleted === "boolean" ? (item._state.deleted = defaultState.deleted) : 0;
			}
			if(self.option.extendStateOnAdd && prevState) {
				typeof prevState.edited === "boolean" ? (item._state.edited = prevState.edited) : 0;
				typeof prevState.editing === "boolean" ? (item._state.editing = prevState.editing) : 0;
				typeof prevState.selected === "boolean" ? (item._state.selected = prevState.selected) : 0;
				typeof prevState.added === "boolean" ? (item._state.added = prevState.added) : 0;
				typeof prevState.deleted === "boolean" ? (item._state.deleted = prevState.deleted) : 0;
			}
			item._index = item._index || {};
			item._index.id = _generateUniqueId();
			item._index.grid = self.key;
			self.state.dataFilltrimmer ? self.state.dataFilltrimmer(self, item) : 0;
			self.state.dataCompositor ? self.state.dataCompositor(self, item) : 0;
			if(doAllowEditTest) {
				if(self.option.rowOption.allowEdit(item) === false) {
					item._state.editing = false;
				}
			}
			self.option.setOriginalFromStart ? (item._original = AlopexGrid.trimObject(item)) : 0;
			if (query && query._index && query._index.data !== undefined) {
				self.state.data.splice(Number(query._index.data)+i, 0, item);
			} else if (query && query._index && query._index.row !== undefined) {
				var nidx = self.state.rendered[query._index.row];
				self.state.data.splice(Number(nidx)+i, 0, item);
			} else {
				self.state.data.push(item);
			}
		}
		//데이터 삽입 후 데이터 리스트 정리. _state, _index.data 등이 생성되며, 
		//items 변수를 통해서 삽입된 데이터들의 _index.data를 읽을 수 있다.
		//어떤 길이를 가지던 items[0]._index.data 의 인덱스 부터 items.length개 만큼 렌더링이 될 수 있으며(안해도 될 수도 있다)
		//dataAdd이전에 생성된 state.rendered array와 option.paging의 내용을 토대로.
		//add된 데이터는 무조건 그려야 된다는 가정 하에, 필요 data를 table-body에 append/replace하고. 
		//현재의 페이징 정보에 따라 table-body의 초과 row들을 제거한다. 
		self.state.dynamicBinding ? "" : self.sortClear();
		var renderedPrev = self.state.rendered;
		if(self.state.renderingSuppressed) {
			self._sortInternalData();
			self._generateRenderTarget();
			setTimeout(function(){self._triggerGridEvent('dataChanged',{"api":"add","data":data,"query":query});},0);
			return;
		}
		self._refreshEditableCellAll();
		clearSelection();
		self.calcAndRedraw();
		setTimeout(function(){self._triggerGridEvent('dataChanged',{"api":"add","data":data,"query":query});},0);
		return;
	};

	AlopexGrid.prototype._scrollerReset = function() {
		var self = this;
		self.state.renderFromRenderedIndex = 0;
		self.state.renderFromColumnIndex = 0;
		self.state.scrollxEnd = false;
		self.state.scrollyEnd = false;
	};
	AlopexGrid.prototype.dataSet = function(dataList, _dataonly) {
		var self = this;
		if(self._triggerGridEvent('dataSet',{"data":dataList})===false) {
			return false;
		}
		self.clearFilter(true);
		delete self.state.editingCellInfo;
		delete self.state.cellSelection;
		delete self.state.rowHeightMapByDataId;
		delete self.state.pinnedDataIdList;
		delete self.state.pinnedDataIdMap;
		self._rowSelectAllUncheck();
		self.state.rowHeightMapByDataId = {};
		self.state.data = [];
		self.state.deletedData = [];
		if (!dataList) {
			self.dataEmpty();
			return;
		}
		if (!$.isArray(dataList)) {
			if (typeof dataList == "object") {
				dataList = [dataList];
			} else {
				self.dataEmpty();
				return;
			}
		}
		if(self.option.dataLengthLimit && (self.state.data.length + items.length) > self.option.dataLengthLimit) {
			var msg = self.option.message.dataLengthLimit || "Exceed Limit.";
			if($.isFunction(msg)) {
				msg = msg(self.state.data.length + items.length);
			}
			alert(msg);
			return;
		}

		var hasDefaultState = !$.isEmptyObject(self.option.defaultState.dataSet) && self.option.defaultState.dataSet;
		var defaultState = self.option.defaultState.dataSet;
		var doAllowEditTest = $.isFunction(self.option.rowOption.allowEdit);
		for (var i = 0; i < dataList.length; i++) {
			var item = dataList[i];
			// item.state = $.extend({
			// 	edited: false,
			// 	editing: false,
			// 	selected: false,
			// 	added:false,
			// 	deleted : false
			// }, self.option.defaultState.dataSet, self.option.extendStateOnSet ? item._state : null);
			var prevState = item._state;
			item._state = {
					edited: false,
					editing: false,
					selected: false,
					added:false,
					deleted : false
			};
			if(hasDefaultState) {
				typeof defaultState.edited === "boolean" ? (item._state.edited = defaultState.edited) : 0;
				typeof defaultState.editing === "boolean" ? (item._state.editing = defaultState.editing) : 0;
				typeof defaultState.selected === "boolean" ? (item._state.selected = defaultState.selected) : 0;
				typeof defaultState.added === "boolean" ? (item._state.added = defaultState.added) : 0;
				typeof defaultState.deleted === "boolean" ? (item._state.deleted = defaultState.deleted) : 0;
			}
			if(self.option.extendStateOnSet && prevState) {
				typeof prevState.edited === "boolean" ? (item._state.edited = prevState.edited) : 0;
				typeof prevState.editing === "boolean" ? (item._state.editing = prevState.editing) : 0;
				typeof prevState.selected === "boolean" ? (item._state.selected = prevState.selected) : 0;
				typeof prevState.added === "boolean" ? (item._state.added = prevState.added) : 0;
				typeof prevState.deleted === "boolean" ? (item._state.deleted = prevState.deleted) : 0;
			}
			item._index = item._index || {};
			item._index.id = _generateUniqueId();
			item._index.data = i;
			item._index.grid = self.key;
			self.state.dataFilltrimmer ? self.state.dataFilltrimmer(self, item) : 0;
			self.state.dataCompositor ? self.state.dataCompositor(self, item) : 0;
			if(doAllowEditTest) {
				if(self.option.rowOption.allowEdit(item) === false) {
					item._state.editing = false;
				}
			}
			self.option.setOriginalFromStart ? (item._original = AlopexGrid.trimObject(item)) : 0;
			self.state.data.push(item);
		}

		delete self.state.sortingColumn;
		delete self.state.sortingDirection;

		if ($.isPlainObject(_dataonly)) {
			//동적 데이터 처리 로직
			var dynamicOption = $.extend({},_dataonly);
			if(_valid(dynamicOption["dataLength"]) && _valid(dynamicOption['current'])) {
				var pobj = {};
				pobj["current"] = Number(dynamicOption["current"]);
				pobj["dataLength"] = Number(dynamicOption["dataLength"]);
				pobj["perPage"] = Number(dynamicOption["perPage"] || self.state.data.length);
				pobj["total"] = Number(
						pobj["dataLength"] && pobj["perPage"] ? 
								(((pobj["dataLength"]/pobj["perPage"])|0) + (pobj["dataLength"]%pobj["perPage"]?1:0))
								: dynamicOption["total"]
				);
				self.state._paddingDataLength = self.option.pager ? (pobj.perPage * (pobj.current - 1) || 0) : 0;
				self.option.paging.customPaging = pobj;
			}
			//TODO 동적바인딩에서 multi level sorting 정보를 넘길 수 있도록 한다. 
			if(_valid(dynamicOption["sortingColumn"]) || _valid(dynamicOption["sortingKey"])) {
				self.state.sortingColumn = Number(dynamicOption["sortingColumn"]);
				if(!_valid(dynamicOption["sortingColumn"])) {
					for(var i=0,l=self.option.columnMapping.length;i<l;i++) {
						var m = self.option.columnMapping[i];
						var ci = m.columnIndex;
						if(ci !== undefined && ci !== null && m.key === dynamicOption["sortingKey"]) {
							self.state.sortingColumn = Number(ci);
							break;
						}
					}
				}
				self.state.sortingDirection = dynamicOption["sortingDirection"] || "asc";
			}
			self.state.dynamicBinding = true;
		} else {
			if (self.option.paging && self.option.paging.customPaging) {
				delete self.option.paging.customPaging;
			}
			if(self.option.defaultSortingOnDataSet) {
				self._processDefaultSorting();
			}
			self.state.dynamicBinding = false;
			self.state._paddingDataLength = 0;
		}

		self._scrollerReset();
		if(self.state.renderingSuppressed) {
			setTimeout(function(){self._triggerGridEvent('dataChanged',{"api":"set","data":dataList});},0);
			return;
		}
		if (_dataonly !== true) {
			self.calcAndRedraw();
		}
		self._refreshEditableCellAll();
		setTimeout(function(){self._triggerGridEvent('dataChanged',{"api":"set","data":dataList});},0);
		//this.updateOption();
	};
	AlopexGrid.prototype.clear = function(flushCallback) {
		this.dataFlush(flushCallback);
		this.dataEmpty();
	};
	AlopexGrid.prototype.dataEmpty = function(data) {
		var self = this;
		if(self._triggerGridEvent('dataEmpty')===false) {
			return false;
		}
		self.clearFilter(true);
		this.state.data = [];
		this.state.deletedData = [];
		this.state.rendered = [];
		var self = this;
		self._scrollerReset();
		self.calcAndRedraw();
		setTimeout(function(){self._triggerGridEvent('dataChanged',{"api":"dataEmpty"});},0);
		//this.updateOption();
	};
	AlopexGrid.prototype._getActualDataByIndex = function(_index) {
		var self = this;
		if(_index.hasOwnProperty('data')) {
			return self.state.data[_index.data];
		}
		if(_index.hasOwnProperty('row')) {
			return self.state.data[self.state.rendered[_index.row]];
		}
		if(_index.id) {
			return self.state.data[self.state.dataIdToIndexMap[_index.id]];
		}
		return null;
	};
	AlopexGrid.prototype.dataGetByIndex = function(index, getrecent) {
		//index.row : 현재 페이지에서의 row index
		//index.data : state.data에서의 index
		//index.element : 데이터를 가져오고자 하는 row 또는 row를 구성하는 element
		if (this._noData() || !index) {
			return null;
		}
		var self = this;
		if(index.id) {
			var dataIndex = self.state.dataIdToIndexMap[index.id];
			return self.state.data[dataIndex];
		} else if(index.data >= 0) {
			return self.state.data[index.data];
		} else if(index.row >= 0) {
			return self.state.data[self.state.renderTargetDataIndexList[index.row]];
		} else if(index.rendered >= 0) {
			return self.state.data[self.state.renderTargetDataIndexList[index.rendered]];
		}
		return null;
	};

	var _KeyUnreadable = "__unreadable__";
	function _isUserReadableData(data) {
		if(!data || (data && data[_KeyUnreadable]) || (data && !data._state)) return false;
		return true;
	}
	function _setDataUnreadable(data,unset) {
		if(!data) return;
		data[_KeyUnreadable] = (unset===false)?false:true;
	}
	function _dataMeetsQuery(self, datalist, dataIndex, query, getrecent) {
		query = query || {};
		//query의 조건이 하나라도 맞지 않으면 false처리한다.
		var data = datalist[dataIndex];
		if(!_isUserReadableData(data)) {
			return false;
		}
		if(getrecent) {
			data = $.extend({}, data, data._state.recent);
		}
		if(query._index) {
			if(query._index.hasOwnProperty('id')){
				if(query._index.id === data._index.id) return true;
				return false;
			}
			if(query._index.hasOwnProperty('data')){
				if(query._index.data === dataIndex) return true;
				return false;
			}
			if(query._index.hasOwnProperty('row')){
				if(self.state.renderTargetDataIndexList[query._index.row] === data._index.data) return true;
				return false;
			}
			if(query._index.hasOwnProperty('rendered')) {
				if(self.state.renderTargetDataIndexList[query._index.rendered] === data._index.data) return true;
				return false;
			}
		}
		if($.isPlainObject(query._state)) {
			for(var prop in query._state) {
				if(query._state[prop] !== data._state[prop]) {
					return false;
				}
			}
		}
		var trimmedquery = AlopexGrid.trimData(query);
		if(!$.isEmptyObject(trimmedquery)) {
			var failed = false;
			$.each(trimmedquery, function(key, val){
				if(data[key] !== val) {
					failed = true;
					return false;
				}
			});
			if(failed) return false;
		}
		return true;
	}
	AlopexGrid.prototype.dataGet = function(query) {
		//query._state.added/selected/deleted
		var self = this;
		var ret = [];
		var queries = $.makeArray($.isArray(query) ? query : arguments);
		if($.isArray(query) && arguments[1]===true) {
			queries.push(true);
		}
		var getrecent = arguments[arguments.length-1] === true;
		if(getrecent) {
			while ($.inArray(true, queries) > -1) {
				queries.splice( $.inArray(true, queries), 1 );
			}
		}
		if(!self.option.leaveDeleted && queries.length) {
			//self.state.deletedData에 삭제데이터가 관리되는 경우
			var qcopied = [];
			for(var i=0,l=queries.length;i<l;i++) {
				if(queries[i] && queries[i]._state && queries[i]._state.deleted) {
					qcopied.push(queries[i]);
				}
			}
			if(qcopied.length) {
				var deleted = self.state.deletedData || [];
				for(var i=0,l=deleted.length;i<l;i++) {
					var d = deleted[i];
					var meets = false;
					for(var j=0,k=qcopied.length;j<k;j++) {
						if(_dataMeetsQuery(self, deleted, i, qcopied[j])) {
							//하나라도 해당될경우(or조건)
							meets = true;
						}
					}
					if(meets) {
						ret.push(d);
					}
				}
			}
		}
		if(!queries.length) {
			queries.push({});
		}
		for(var i=0,l=self.state.data.length; i<l;i++) {
			var meets = false;
			for(var j=0,k=queries.length;j<k;j++) {
				if(self.state.data[i]._state.meta) continue;
				if( _dataMeetsQuery(self, self.state.data, i, queries[j],getrecent) ) {
					meets = true;
					break;
				}
				if(queries[j] && queries[j]._index && queries[j]._index.hasOwnProperty('row')) {
					if(self.state.rendered[queries[j]._index.row] == i) {
						meets = true;
						break;
					}
				}
			}
			if(meets) {
				var d = self.dataGetByIndex({
					data: i
				},getrecent);
				ret.push(d);
			}
		}
		return ret;
	};
	AlopexGrid.prototype.dataEdit = function(data, queries, op) {
		var self = this;
		data = data || {};
		if(self._triggerGridEvent('dataEdit', {"data":data,"query":queries})===false) {
			return false;
		}
		if (this._noData()) {
			return;
		}
		if (!$.isArray(queries)) {
			queries = [queries];
		}
		var trimmedData = AlopexGrid.trimData(data);
		//* TODO dataEdit 로직 최적화 재구현
		var editedIndex = [];
		$.each(queries, function(idx,query) {
			var datalist = self.dataGet(query);
			if(!$.isArray(datalist) || !datalist.length) {
				return;
			}
			$.each(datalist, function(didx,targetData){
				var dataIndex = targetData._index.data;
				var prevData = targetData;
				var trimmedPrev = AlopexGrid.trimObject(prevData);
				var original = targetData._original;
				var newData = $.extend(true,
						{ _index:{},_state:{} },
						{ _index : prevData._index, _state : prevData._state },
						{ _index : data._index || {},
							_state : data._state || {}},
							!targetData._state.edited ? {_original : trimmedPrev} : { _original : original },
									//prevData, data
									trimmedPrev,trimmedData
				);
				if (prevData._state.editing && $.isPlainObject(prevData._state.recent)) {
					newData._state.recent = $.extend({},
							//prevData, 
							trimmedPrev,
							AlopexGrid.trimObject(prevData._state.recent),
							//data
							trimmedData
					);
				}
				var trimmedNew = AlopexGrid.trimObject(newData);
				if($.isFunction(self.option.valueFilter)) {
					for(var prop in trimmedNew) {
						var filtered = self.option.valueFilter(trimmedNew[prop],newData);
						if(filtered === false) {
							//forbid invalid value
							return ($.isFunction(self.option.message.valueFilter)
									? self.option.message.valueFilter(trimmedNew[prop],newData) : self.option.message.valueFilter)
									|| false;
						} else if(typeof filtered == "string" || typeof filtered == "number") {
							newData[prop] = String(filtered);
						}
					}
				}
				var diffkey = [];
				for(var prop in trimmedPrev) {
					if(trimmedPrev[prop] !== trimmedNew[prop]) {
						diffkey.push(prop);
					}
				}
				for(var prop in trimmedNew) {
					if(trimmedNew[prop] !== trimmedPrev[prop] && $.inArray(prop, diffkey) < 0) {
						diffkey.push(prop);
					}
				}
				var diffmap = $.map(diffkey, function(key, idx) {
					var mapped = {"key":key};
					var ci = getColumnIndexByKey(self.option.columnMapping, key);
					if(_valid(ci)) {
						mapped["column"] = ci;
					}
					return mapped;
				});
				newData["_prev"] = prevData;
				newData["_edited"] = diffmap;
				if(self.option.fullCompareForEditedState) {
					newData._state.edited = false;
					if(newData._original) {
						$.each(newData._original, function(k,v){
							if(v !== newData[k]) {
								newData._state.edited = true;
								return false;
							}
						});
					}
				} else if(diffkey.length || self.option.forceEditedOnEdit) {//set edited state only if there is change
					newData._state.edited = true;
				}
				self.state.dataCompositor ? self.state.dataCompositor(self, newData) : 0;
				self.state.data[dataIndex] = newData;
				if(self.state.renderTargetDataList) {
					self.state.renderTargetDataList[dataIndex] = newData;
				}
				editedIndex.push(Number(dataIndex));

				if (self.option && self.option.on && self.option.on["edit"]) {
					var cb = self.option.on["edit"];
					if ($.isFunction(cb)) {
						cb = [cb];
					}
					$.each(cb, function(idx, callback) {
						callback.call(self, newData);
					});
				}

				delete newData["_prev"];
				//delete newData["_edited"];
			});
		});

		if (self.option.flushOnEdit) {
			self.dataFlush();
		}
		if(editedIndex.length) {
			setTimeout(function(){self._triggerGridEvent('dataChanged',{"api":"edit","data":data,"query":queries});},0);
		}
		if(op && op.norender===true) return;
		if(self.state.renderingSuppressed) return;
		
		//self.redraw();
		self._refreshBodyCells({"dataIndexList":editedIndex});

		if(editedIndex.length) {
			self._needEditedRefresh();
		}
		return;

	};
	AlopexGrid.prototype.dataFlush = function(callback, fop) {
		var self = this;
		var option = this.option;
		if (typeof callback == "object") {
			fop = callback;
		}
		fop = fop || {};
		if (typeof option.flushCallback == "function" || typeof callback == "function") {
			var dirties = this.dataGet({ _state: { edited: true } }, { _state: { added:true } });
			var deleted = this.dataGet({ _state: { deleted: true } });
			if (typeof option.flushCallback == "function")
				option.flushCallback.call(this, dirties, deleted);
			if (typeof callback == "function")
				callback.call(this, dirties, deleted);
		}
		if (fop.noCommit === true) {
			return;
		}
		for(var i=0,l=self.state.data.length;i<l;i++) {
			var data = self.state.data[i];
			var changed = false;
			if (data._state && (data._state.edited || data._state.added) && !fop.leaveEdited) {
				data._state.added = false;
				data._state.edited = false;
				changed = true;
			}
			if(changed) {
				self.state.dataCompositor ? self.state.dataCompositor(self, data) : 0;
				data._original = AlopexGrid.trimData(data);
			}
		}
		if (!fop.leaveDeleted) {
			if(self.option.leaveDeleted) {
				self.dataDelete({_state:{deleted:true}},null,true);
			}
			this.state.deletedData = [];
		}
		if ((!fop.leaveEdited) && (!fop.noredraw)) {
			self.calcAndRedraw();
		}
	};
	function _deleteRecent(data) {
		delete data._state.recent;
		delete data._state._editableStarted;
		delete data._state._beforeEditing;
	}
	AlopexGrid.prototype.dataRestore = function(query) {
		var self = this;
		var datalist = self.dataGet(query);
		if(!datalist || !datalist.length) return;
		var refreshall = _isEmptyQuery(query);
		var count = 0;
		$.each(datalist, function(idx, targetData){
			var data = self.state.data[targetData._index.data];
			if(data._original) {
				$.extend(data, data._original);
			}
			if(data._state.edited) count++;
			_deleteRecent(data);
			data._state.edited = false;
			if(!refreshall) {
				self.refreshRow(targetData);
			}
		});
		if(refreshall && count) {
			self.calcAndRedraw();
		}
	};
	/**
	 * undelete : option.leaveDeleted=true일 때, 삭제처리된 데이터를 복원시킬떄 사용
	 * deletefromdata : state.deletedData로 삭제 데이터를 이동시킴. dataFlush에서 사용.
	 */
	AlopexGrid.prototype.dataDelete = function(query, undelete, deletefromdata) {
		var self = this;
		if(self._triggerGridEvent(undelete===true?"dataUndelete":"dataDelete",{"query":query})===false) {
			return false;
		}
		if (self._noData()) {
			return;
		}
		var datalist = self.dataGet(query);
		var indexes = [];
		$.each(datalist, function(idx, data) {
			indexes.push(data._index.data);
		});
		var dellist = [];
		//IE8 sort 이슈 http://www.zachleat.com/web/array-sort/
		indexes.sort(function(m1, p1) {
			var m = Number('' + m1), p = Number('' + p1);
			if (m < p)
				return 1;
			if (m > p)
				return -1;
			return 0;
		});
		if(self.option.leaveDeleted && deletefromdata !== true) {
			//비삭제모드
			$.each(indexes, function(idx, index) {
				//undelete 기능. deleteit이 false인경우 삭제를 복원한다.
//				self.state.data[index]._state.deleted = (deleteit===false)? false : true;
//				self.state.data[index]._state.selected = false;
//				self.state.data[index]._state.editing = false;
				if(self.state.data[index] && self.state.data[index]._state &&
						!self.state.data[index]._state.added) {
					self._dataSetState({_index:{data:index}}, {deleted:(undelete===true)? false : true}, true);
					self.state.dataCompositor ? self.state.dataCompositor(self, self.state.data[index]) : 0;
					dellist.push(self.state.data[index]);
				} else {
					//added후 삭제되는 데이터는 관리하지 않는다.
					delete self.state.dataIdToIndexMap[self.state.data[index]._index.id];
					self.state.data.splice(index,1);
				}
			});
		} else {
			if(undelete === true) {
				for(var i=self.state.deletedData.length-1;i>=0;i--) {
					if(_dataMeetsQuery(self, self.state.deletedData, i, query)) {
						var rdata = self.state.deletedData[i];
						rdata._state.deleted = false;
						self.state.data.splice(rdata._index.data, 0, rdata);
						self.state.deletedData.splice(i,1);
					}
				}
			} else {
				$.each(indexes, function(idx, index) {
					delete self.state.dataIdToIndexMap[self.state.data[index]._index.id];
					var deleted = self.state.data.splice(index, 1)[0];
					deleted._state.deleted = true;
					self.state.deletedData = self.state.deletedData || [];
					if(deleted && deleted._state && !deleted._state.added) {
						//added후 삭제되는 데이터는 관리할 필요가 없음
						self.state.dataCompositor ? self.state.dataCompositor(self, deleted) : 0;
						deleted._state.selected = false;
						deleted._state.editing = false;
						deleted._state.focused = false;
						self.state.deletedData.push(deleted);
						dellist.push(deleted);
					}
				});
			}
		}
		self._triggerGridEvent('dataDeleted', {"list":dellist});

		if (self.option.flushOnEdit) {
			self.dataFlush({
				noredraw: true
			});
		}
		self.pageInfo();
		self.calcAndRedraw();
		setTimeout(function(){self._triggerGridEvent('dataChanged',{"api":undelete===true?"undelete":"delete","data":data});},0);
	};
	AlopexGrid.prototype.dataUndelete = function(query) {
		return this.dataDelete(query, true);
	};

	AlopexGrid.prototype.dataFilter = function(){
		var self = this;
	};


	function _queryMapper(d){ if($.isPlainObject(d) || $.isArray(d)) { return d; } }
	function _editingMapper(d){ if($.type(d)==="boolean" || d===null) return d; }
	function _appendMapper(d){ if($.type(d)==="string") return d; }
	function _unpinFromStateByIdx(self, idxlist) {
		for(var i = self.state.pinnedDataIdList.length-1; i>=0; i--) {
			if($.inArray(i, idxlist) >= 0) {
				var id = self.state.pinnedDataIdList[i];
				delete self.state.pinnedDataStateMapById[id];
				self.state.pinnedDataIdList.splice(i, 1);
			}
		}
	}

	AlopexGrid.prototype._hasPinnedData = function(dataid){
		var self = this;
		if($.type(dataid) === "string") {
			return $.inArray(dataid, self.state.pinnedDataIdList) >= 0;
		}
		return $.isArray(self.state.pinnedDataIdList) && self.state.pinnedDataIdList.length;
	};

	//상위 몇개의 row를 고정할 것인가에 대한 기능.
	AlopexGrid.prototype.rowFix = function(rowCount) {
		var self = this;
		//상위 몇개의 row를 fix할 것인가? self.state.renderTargetDataIndexList 에서 상위의 값이 고정대상이 된다.
		self.option.rowFixCount = rowCount;
		self._refreshBoard(true);
	};
	AlopexGrid.prototype.rowUnfix = function(){
		var self = this;
		self.option.rowFixCount = 0;
		self._refreshBoard(true);
	}
	AlopexGrid.prototype.rowPin = function(renderedIndex, includeAbove){
		var self = this;
		var from = includeAbove ? 0 : renderedIndex;
		var to = renderedIndex;
		if(!_valid(renderedIndex) || (to-from+1)<=0) return;
		var query = [];
		for(var i=from;i<=to;i++) {
			var data = self._getRenderedDataFromRenderedIndex(i);
			query.push({_index:{id:data._index.id}});
		}
		return self.addPin(query);
	};
	AlopexGrid.prototype.addPin = function(query, editing, append) {
		var self = this;
		var args = $.makeArray(arguments);
		query = $.map(args, _queryMapper);
		editing = $.map(args, _editingMapper)[0];
		append = "add";
		return self.dataPin(query, editing, append);
	};
	AlopexGrid.prototype.dataPin = function(query, editing, append) {
		var self = this;
		var args = $.makeArray(arguments);
		query = $.map(args, _queryMapper);
		editing = $.map(args, _editingMapper)[0];
		append = $.map(args, _appendMapper)[0];
		if($.type(editing) !== "boolean" && editing !== null) {
			//editing = false;//default is non-editing data.
		}
		if($.isArray(query) || ($.isPlainObject(query) && !$.isEmptyObject(query))) {
			var pinlist = $.isArray(query) ? self.dataGet.apply(self, query) : self.dataGet(query);
			if(!pinlist || !pinlist.length) {
				return;
			}
			pinlist = $.map(pinlist, function(pd){return pd._index.id});
			self.state.pinnedDataIdList = (append === "add") ? (self.state.pinnedDataIdList || []) : [];
			self.state.pinnedDataIdMap = (append === "add") ? (self.state.pinnedDataIdMap || {}) : {};
			var added = [];
			$.each(pinlist, function(idx,pid) {
				if($.inArray(pid, self.state.pinnedDataIdList)<0) {
					added.push(pid);
					self.state.pinnedDataIdMap[pid] = true;
					var stateobj = {};
					if($.type(editing)==="boolean") {
						stateobj[pid] = {editing:editing};
					} else {
						delete stateobj[pid];
					}
					self.state.pinnedDataStateMapById = $.extend({}, self.state.pinnedDataStateMapById, stateobj);
				}
			});
			if(!added.length) {
				return;
			}
			self.state.pinnedDataIdList = self.state.pinnedDataIdList.concat(added);
			//self.redraw(null, null);
			self.updateOption();
		}
	};
	AlopexGrid.prototype.dataUnpin = function(query, norender) {
		var self = this;
		self.option.rowFixCount = 0;
		if(!self._hasPinnedData()) return;
		if($.isPlainObject(query) && !$.isEmptyObject(query)) {
			var unpinlist = self.dataGet(query);
			if(!unpinlist || !unpinlist.length) {
				return;
			}
			unpinlist = $.map(unpinlist, function(upd){return upd._index.id});
			var unpinned = [];
			$.each(unpinlist, function(idx, upid){
				var aidx = $.inArray(upid, self.state.pinnedDataIdList);
				if(aidx >= 0) {
					unpinned.push(aidx);
				}
			});
			if(!unpinned.length) {
				return;
			}
			_unpinFromStateByIdx(self, unpinned);
		} else {
			self.state.pinnedDataIdList = false;
			self.state.pinnedDataIdMap = false;
		}
		if(norender===true) return;
		//self.redraw(null, null);
		self.updateOption();
	};

	AlopexGrid.prototype._rowFocus = function(query) {
		var self = this;
		self.state.focusedDataId = self.state.focusedDataId || [];
		var data = null;
		if(query && query.nodeType && query.className.indexOf('bodycell')>=0) {
			data = self._getActualDataByIndex({id:query.getAttribute('data-alopexgrid-dataid')});
		} else if(query && query.index) {
			data = self._getActualDataByIndex(query.index);
		}
		if(data && !data._state.focused) {
			$.each(self.state.focusedDataId, function(i,dataid){
				var pdata = self._getActualDataByIndex({id:dataid});
				if(pdata) {
					pdata._state.focused = false;
					self.rowElementGet({_index:{id:dataid}}).removeClass('focused');
				}
			});
			self.state.focusedDataId = [];
			data._state.focused = true;
			self.state.focusedDataId.push(data._index.id);
			self.rowElementGet({_index:{id:data._index.id}}).addClass('focused');
		}
	};
	AlopexGrid.prototype._rowSelectAllUncheck = function(){
		var self = this;
		self.state.selectAll = false;
		self.$wrapper.find('.headercell.selector-column').find('input').prop('checked',false);
	};
	AlopexGrid.prototype._rowSelectAll = function(e, cell) {
		var self = this;
		if (!self.state.data || !self.state.data.length || !self.state.renderTargetDataIndexList || !self.state.renderTargetDataIndexList.length) {
			return;
		}
		if(self.option.rowSingleSelect || self.option.rowClickSelect === "only") {
			return;
		}
		var invertLater = false;
		if(e) {
			e = $.event.fix(e);
			if (!$(cell || e.currentTarget).hasClass('selector-column')) {
				return;
			}
			if(e.target.tagName !== 'INPUT') {
				invertLater = true;
			}
		}
		var $target = $(cell || e.target);
		//IE8 cannot reproduce e.currentTarget using event object.
		var $cell = (cell || e.currentTarget) ? $(cell || e.currentTarget) : $target.closest('.cell');
		var $input = $cell.find('input');
		var selected = $input.prop('checked');
		if(invertLater) selected = !selected;
		for (var idx=0,idxl=self.state.renderTargetDataIndexList.length;idx<idxl;idx++) {
			var data = self._getRenderedDataFromRenderedIndex(idx);
			if(!data || data._meta) continue;
			if(self._triggerGridEvent("dataSelect",{"data":data,"select":selected})===false
					|| (self.state.testRowAllowSelect && self.option.rowOption.allowSelect(data)===false)) {
				data._state.selected = false;
			} else {
				data._state.selected = selected;
			}
//			if(data._state.deleted) {
//			data._state.selected = false;
//			}
		}
		
		self.state.selectAll = selected;

		self.redraw();
		self._triggerGridEvent('dataChanged',
			{
				"api":"select",
				"data":$.map(self.state.rendered, function(di){return $.extend(true,{},self.state.data[di]);}),
				"selected":selected
			});
	};
	AlopexGrid.prototype.rowSelect = function(query, selected, e) {
		var self = this;
		var option = self.option;
		if (self._noData()) {
			return;
		}
		if (e) {
			e = $.event.fix(e);
		}
		if (e) {
			var $target = $(e.target);
			if(option.rowClickSelect) {
				if (e.target.tagName === "INPUT" && !$target.hasClass("selector-checkbox")) {
					return;
				}
				if(e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") {
					return;
				}
			} else {
				if(self.option.limitSelectorColumnClickArea) {
					if(!$target.hasClass('selector-checkbox')) {
						return false;
					}
				} else {
					if(!($target.hasClass('selector-checkbox')
							|| $target.hasClass('selector-column')
							|| $target.hasClass('selector-column-wrapper')
					)) {
						return;
					}
				}
			}
			if($target.hasClass("selector-checkbox") && isAlopexMobile) {
				$target.one('click', function(ee){ee.preventDefault();});
			}
		}
		var datalist = (query.nodeType) ?
				[self.state.data[query.getAttribute('data-alopexgrid-dataindex')]]
		: self.dataGet(query);
		var firstDataIndex = null;
		if(self.option.rowClickSelect==="only" || self.option.rowSingleSelect) {
			datalist = [datalist[0]];
			if(datalist[0])
				firstDataIndex = datalist[0]._index.data;
		}
		var changedlist = [];
		var processed = [];
		for(var i=0,l=datalist.length;i<l;i++) {
			if(!datalist[i]) continue;
			var dataIndex = datalist[i]._index.data;
			var actualdata = self.state.data[dataIndex];
			if(!_isUserReadableData(actualdata)) {
				continue;
			}
			dataIndex = Number(dataIndex);
			var prev = !!actualdata._state.selected;
			var chosen = (selected == "toggle") ? !actualdata._state.selected : !!selected;

			if(prev !== chosen) {
				changedlist.push(dataIndex);
			}
			if(self._triggerGridEvent('dataSelect',{"data":actualdata,"select":chosen})===false
					|| (self.state.testRowAllowSelect && self.option.rowOption.allowSelect(actualdata)===false)) {
				chosen = false;
			}
			if(self.state.columnRowspanned && self.option.rowspanGroupSelect) {
				var rowspanindex = _columnRowspanWidestIndex(self.state.rowspanindex, dataIndex);
				var rfrom = rowspanindex.from;
				var rto = rowspanindex.to;
				for(var j=rfrom;j<rto;j++) {
					self.state.data[j]._state.selected = chosen;
					self._rowSelectAllUncheck();
					processed.push(j);
				}
			} else {
				actualdata._state.selected = chosen;
				self._rowSelectAllUncheck();
				processed.push(dataIndex);
			}
			self.state.dataCompositor ? self.state.dataCompositor(self, actualdata) : 0;
		}
		if (option.rowClickSelect === "only" || option.rowSingleSelect) {
			$.each(self.state.data, function(i,d) {
				if(!!d._state.selected !== false && i !== firstDataIndex) {
					changedlist.push(Number(i));
					d._state.selected = false;
					self.state.dataCompositor ? self.state.dataCompositor(self, d) : 0;
				}
			});
		}

		self._refreshBodyCells({"dataIndexList":changedlist});

		self._triggerGridEvent('dataChanged',
			{
				"api":"select",
				"data":$.map(changedlist, function(di){return $.extend(true,{},self.state.data[di]);}),
				"selected":selected
			}
		);
	};
	function isCellEmptied(cell) {
		cell = cell.jquery ? cell[0] : cell;
		return String(cell.className).indexOf("emptied") >= 0;
	}
	//조건과 상관없이 현재 화면에 그려진/수정된 데이터를 가져온다.(편집용)
	//빈값이 들어온 컬럼에 대해 값을 추출하는 용도로 사용한다. 초기 편집시 발동을 의도.
	//.children사용시 .row 또는 .cell을 사용했다가 지워버림.
	AlopexGrid.prototype._refreshEditableCellAll = function(){
		var self = this;
		if(self.option.parseNullValueCell) {
			$.each(self.state.data, function(idx,d) {
				if(d._state.editing && !d._state._editableStarted) {
					self._refreshEditableCell(d._index.data, true);
				}
			});
		}
	};
	AlopexGrid.prototype._refreshEditableCell = function(dataIdIndex,generateRow){
		if(!this.option.parseNullValueCell) {
			return;
		}

		var self = this;
		var data = null;
		if(typeof dataIdIndex === "string") {
			for(var i in self.state.data) {
				if(self.state.data[i]._index && self.state.data[i]._index.id === dataIdIndex) {
					data = self.state.data[i];
					break;
				}
			}
		} else if(typeof dataIdIndex === "number") {
			data = self.state.data[dataIdIndex];
		}
		if(!data || data._state._editableStarted || !data._state.editing) return null;

		var celllist = []

		for(var i=0,l=self.option.columnMapping.length;i<l;i++) {
			var mapping = self.option.columnMapping[i];
			if(!isMappingVisible(mapping)) continue;
			celllist.push(self._createCell(data, mapping));
		}

		var $cells = $(celllist);

		$cells.each(function(idx,cell){
			var key = cell.getAttribute('data-alopexgrid-key');
			if(key) {
				if(data[key] !== undefined && data[key] !== null) return;
				var mapping = _getMappingByQuery(self.option.columnMapping, {key:key}, self, data);
				if(mapping) {
					self._cellEditUpdate(cell, data._index.id, mapping);
				}
			}
		});
		data._state._editableStarted = true;
		$cells.remove();
	};
	AlopexGrid.prototype._getRecentData = function(dataIdIndex) {
		var self = this;
		var data = null;
		if(typeof dataIdIndex === "string") {
			for(var i in self.state.data) {
				if(self.state.data[i]._index && self.state.data[i]._index.id === dataIdIndex) {
					data = self.state.data[i];
					break;
				}
			}
		} else if(typeof dataIdIndex === "number") {
			data = self.state.data[dataIdIndex];
		}
		if(!data) return null;
		var recentdata = $.extend(true, {_index:{},_state:{}}, {_index:data._index,_state:data._state},
				AlopexGrid.trimData(data), AlopexGrid.trimData(data._state.recent));
		return recentdata;
	};

	//row에 대한 편집모드 시작 및 종료. query는 이 API를 호출하는 이벤트 핸들러 등에서 조합하여 넘긴다.
	//편집기능의 범위는 현재 페이지다.
	AlopexGrid.prototype.startEdit = function(query, cancel, cancelKeepEditing) {
		var self = this;
		if (this._noData()) {
			return;
		}
		//* 재구현코드
		var datalist = self.dataGet(query);
		if(!datalist || !datalist.length) {
			return;
		}
		var startedIndex = [];
		for(var i=0,l=datalist.length;i<l;i++) {
			var data = datalist[i];
			if(!data) continue;
			if(data._state.deleted) continue;
			if((data._state.editing && cancel!==true) || (!data._state.editing && cancel === true)) continue;
			if($.isFunction(self.option.rowOption.allowEdit) && self.option.rowOption.allowEdit(data)===false) {
				continue;
			}
			var dataIndex = data._index.data;
			var toeditIndex = [];
			if(self.state.columnRowspanned && self.option.rowspanGroupEdit) {
				var rowspanindex = _columnRowspanWidestIndex(self.state.rowspanindex, dataIndex);
				if(!rowspanindex) {
					toeditIndex.push(Number(dataIndex));
				} else {
					var from = rowspanindex.from;
					var to = rowspanindex.to;
					for(var j=from;j<to;j++) {
						toeditIndex.push(Number(j));
					}
				}
			} else {
				toeditIndex.push(Number(dataIndex));
			}
			for(var j=0,k=toeditIndex.length;j<k;j++) {
				startedIndex.push(Number(toeditIndex[j]));
				if(cancel===true) {
					if(self.option.mergeEditingImmediately) {
						$.extend(self.state.data[dataIndex], self.state.data[dataIndex]._state._beforeEditing);
					}
					_deleteRecent(self.state.data[dataIndex]);
				}
				self._dataSetState({_index:{data:toeditIndex[j]}}, {editing:cancelKeepEditing===true?true:(cancel===true?false:true)}, true);
			}
		}
		self.redraw();
		if(startedIndex.length){
			self._refreshEditableCellAll();
		}
		self._needEditedRefresh();
		return;
	};
	//short hand for dataInvalid and dataScroll
	AlopexGrid.prototype.dataInvalidFocus = function(query) {
		var self = this;
		var inval = self.dataInvalid();
		if(!inval) return null;
		var column = inval._invalid && inval._invalid[0] ? inval._invalid[0].column : null;
		self.dataScroll(inval, function(){
			var $cell = self._elementGet(inval, column);
			var $inputs = $cell.find('input,select,textarea');
			$inputs.trigger('change');
			setTimeout(function(){
				$inputs.add($cell).eq(0).focus();
			},1);
		});
		return inval;
	};
	AlopexGrid.prototype.dataInvalid = function(query) {
		var self = this;
		return self.endEdit(query, undefined, true);
	};
	AlopexGrid.prototype._endEditAllIfEditingExist = function() {
		var self = this;
		for(var i=0,l=self.state.data.length;i<l;i++) {
			var data = self.state.data[i];
			if(data && data._state.editing) {
				self.endEdit();
				break;
			}
		}
		self._endCellEdit();
	};
	AlopexGrid.prototype.endEdit = function(query, keepEditing, validateonly) {
		var self = this;

		if (self._noData()) {
			return;
		}
		if(query === true) {
			query = undefined;
			keepEditing = true;
		}
		if($.isArray(query) && !query.length) {
			return;
		}
		var invalidMessages = [];
		var endedIndex = [];
		//* endEdit 로직 최적화 및 $rows 사용 최소화
		var datalist = self.dataGet(query, true);//getrecent:true
		if(datalist.length) {
			var invalidInfo = [];
			var doValidCheck = !!self.option.valueFilter;
			for(var i=0,l=self.option.columnMapping.length;i<l;i++) {
				if(self.option.columnMapping[i].valid || self.option.columnMapping[i].validate) {
					doValidCheck = true;
					break;
				}
			}
			var toendIndex = [];
			for(var i=0,l=datalist.length;i<l;i++) {
				var data = datalist[i];
				if(!data) continue;
				if(data._state.deleted) continue;
				if(!data._state.editing) continue;
				var dataIndex = data._index.data;
				if(self.state.columnRowspanned && self.option.rowspanGroupEdit) {
					var rowspanindex = _columnRowspanWidestIndex(self.state.rowspanindex, dataIndex);
					if(!rowspanindex) {
						toendIndex.push(Number(dataIndex));
					} else {
						var from = rowspanindex.from;
						var to = rowspanindex.to;
						for(var j=from;j<to;j++) {
							toendIndex.push(Number(j));
						}
					}
				} else {
					toendIndex.push(Number(dataIndex));
				}
			}

			//TODO mapping.valid, mapping.validate, option.valueFilter
			//validateOnly
			//invalidMessage, on.invalidEdit
			var $rows = $();//self.$tablebody.children('.bodyrow');
			var $clonedrows = $();//self.state.hasFixColumn ? self.state.$fixcolbody.children('.bodyrow') : $();
			var rowfrom = Number($rows.eq(0).attr('data-alopexgrid-dataindex'));
			var rowto = Number($rows.eq(-1).attr('data-alopexgrid-dataindex'));
			for(var i=0,l=toendIndex.length;i<l;i++) {
				var dataIndex = toendIndex[i];
				var data = self.state.data[dataIndex];
				if(!data || !data._state.editing) {
					continue;
				}
				var $row = dataIndex>=rowfrom && dataIndex<=rowto ? $rows.eq(dataIndex-rowfrom) : $();
				var $clonedrow = dataIndex>=rowfrom && dataIndex<=rowto ? $clonedrows.eq(dataIndex-rowfrom) : $();
				if(doValidCheck) {
					var invalid = false;
					var $cells = $row.children();
					var $clonedcells = $clonedrow.children();
					for(var j in self.option.columnMapping) {
						var cellInvalid = false;
						var mapping = self.option.columnMapping[j];
						if(!_valid(mapping.columnIndex)) {
							continue;
						}
						if(!mapping.editable) {
							continue;
						}
						var $cell = $cells.filter('[data-alopexgrid-columnindex="'+mapping.columnIndex+'"]');
						if($cell.hasClass('cell-fixcol')) {
							$cell = $clonedcells.filter('[data-alopexgrid-columnindex="'+mapping.columnIndex+'"]');
						}
						var errMessage = [];
						var value = (data._state.recent?data._state.recent[mapping.key]:null)
						||data[mapping.key];
						if (mapping && !_isColumnValid.call(self, mapping, $cell, value, data)) {
							//valid:['allowed','value','array']
							//valid:function(cell,value,data){return (boolean)valid; }
							invalid = true;
							cellInvalid = true;
							if (typeof mapping.invalid == "function") {
								errMessage.push(mapping.invalid($cell, value, data));
							} else if (typeof mapping.invalid === "string") {
								errMessage.push(mapping.invalid);
							} else {
								errMessage.push(null);
							}
						}
						if($.isFunction(self.option.valueFilter)) {
							var filtered = self.option.valueFilter(value, data);
							if(filtered === false) {
								invalid = true;
								cellInvalid = true;
								errMessage.push( ($.isFunction(self.option.message.valueFilter)
										? self.option.message.valueFilter(value, data) : self.option.message.valueFilter
								) || null);
							} else if(typeof filtered == "string" || typeof filtered == "number") {
								if(data._state.recent && data._state.recent.hasOwnProperty(mapping.key)) {
									data._state.recent[mapping.key] = filtered;
								}
							}
						}
						$cell[cellInvalid ? "addClass" : "removeClass"]("invalid");
						if(cellInvalid) {
							invalidMessages = invalidMessages.concat(errMessage);
							invalidInfo.push({
								"column":mapping.columnIndex,
								"mapping":mapping,
								"errorMessage":errMessage
							});
						}
					}
					if(invalid && validateonly === true) {
						var returnData = $.extend(true,{},data, (data._state.editing && self.option.getEditingDataOnEvent) ? data._state.recent : null);
						returnData["_invalid"] = invalidInfo;
						return returnData;
					}
					if(invalidMessages.length) {
						self._triggerGridEvent('invalidEdit', {"data":data,"messages":invalidMessages});
						break;
					}
				}
				if(validateonly === true) {
					//validate only -> no process on editing=false
					continue;
				}
				var editingState = (keepEditing === true) ? true : false;
				data._state.editing = editingState;
				self.dataEdit(data._state.recent, {_index:{data:dataIndex}},{norender:true});
				_deleteRecent(data);
				self._dataSetState(data, {editing:editingState},true);
				endedIndex.push(dataIndex);
				self._triggerGridEvent('endEdit', {"data":data});
			}
		}
		if(validateonly === true) return null;
		self.calcAndRedraw();//편집으로 인해 그룹관계가 변경될 수 있다.
		if(invalidMessages.length) {
			return false;
		}
		return;
	};
	AlopexGrid.prototype.cancelEdit = function(query, keepEditing) {
		//수정된 데이터를 state.data에 반영하지 않고 종료.
		var self = this;
		if (self._noData()) {
			return;
		}
		if(query === true) {
			query = undefined;
			keepEditing = true;
		}
		self.startEdit(query, true, keepEditing);
		return ;
	};

	AlopexGrid.prototype._cellIdFromData = function(data, columnIndex) {
		return [this.key, data._index.rendered, columnIndex].join('-');
	};
	AlopexGrid.prototype._cellIdFromRendered = function(renderedIndex, columnIndex) {
		return [this.key, renderedIndex, columnIndex].join('-');
	};
	AlopexGrid.prototype._isEditingCell = function(renderedIndex, columnIndex) {
		if(this.state.editingCellInfo) {
			if(this.state.editingCellInfo["renderedIndex"] === renderedIndex
					&& this.state.editingCellInfo["columnIndex"] === columnIndex) {
				return true;
			}
		}
		return false;
	};
	AlopexGrid.prototype._focusEditCell = function(renderedIndex, columnIndex) {
		var self = this;
		var $cell = $('#'+self._cellIdFromRendered(renderedIndex, columnIndex));
		var $inputs = $cell.find('input,select,textarea');
		if($inputs.length) {
			if(!$inputs.filter(document.activeElement).length){
				($inputs[0] !== document.activeElement) ? $inputs.focus() : "";
			}
		} else if($cell.attr("tabindex")>=0){
			($cell[0] !== document.activeElement) ? $cell.focus() : "";
		} else {
			var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
			var mapping = _getMappingFromColumnIndex(self, columnIndex);
			var groupItem = self._getGroupingRangeByMapping(data._index.data, mapping);
			if(groupItem) {
				var groupStartDataIndex = groupItem["from"];
				var renderedIndex = data._index.rendered;
				var renderedFrom = 0;
				var targetRenderedIndex = Math.max(renderedIndex, renderedFrom);
				$cell = $('#'+self._cellIdFromRendered(targetRenderedIndex, columnIndex));
				$inputs = $cell.find('input,select,textarea');
				if($inputs.length) {
					if(!$inputs.filter(document.activeElement).length){
						$inputs.focus();
					}
				} else if($cell.attr("tabindex")>=0){
					$cell.focus();
				}
			}
		}
		return $cell;
	};
	function isCellReadonly(self, data, mapping) {
		if(typeof mapping.readonly === "boolean" || typeof mapping.readonly === "function") {
			var result = mapping.readonly;
			if(typeof result === "function") {
				result = mapping.readonly.call(self, data[mapping.key], data, mapping);
			}
			if(typeof result === "boolean") {
				return result === true;
			}
		}
		if(self.option.rowOption && (typeof self.option.rowOption.readonly === "boolean" 
			|| typeof self.option.rowOption.readonly === "function")) {
			var result = self.option.rowOption.readonly;
			if(typeof result === "function") {
				result = result.call(self, data, self.option.rowOption);
			}
			if(typeof result === "boolean") {
				return result === true;
			}
		}
		return false;
	}
	AlopexGrid.prototype._startCellEdit = function(renderedIndex, columnIndex,norender){
		var self = this;
		var rowRenderedFrom = 0;
		var rowRenderedTo = Math.max(0, self.state.rendered.length);
		var isRowRendered = rowRenderedFrom <= renderedIndex && renderedIndex <= rowRenderedTo;
		var editStarted = false;
		var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
		var mapping = _getMappingFromColumnIndex(self, columnIndex);
		if(!data || !mapping){
			return false;
		}
		if(isColumnHidden(mapping) || !mapping.editable || isCellReadonly(self, data, mapping)) {
			return false;
		}

		var prevInfo = self.state.editingCellInfo;
		if(!self._isEditingCell(renderedIndex, columnIndex)) {
			self._endCellEdit();
		}

		var value = data[mapping.key];
		if(!_valid(value)) value = "";
		self.state.editingCellInfo = {
				"renderedIndex" : parseInt(renderedIndex), 
				"columnIndex" : parseInt(columnIndex),
				"columnMapping" : mapping,
				"key" : mapping.key,
				"value" : value
		};
		if(norender===true) return null;
		self._refreshBoard(true);
		return null;
	};
	
	AlopexGrid.prototype._endCellEdit = function(cancel, norender){
		var self = this;

		if($.isPlainObject(cancel)) {
			self.state.editingCellInfo = cancel;
		}

		if(self.state.editingCellInfo) {
			var info = self.state.editingCellInfo;
			var data = self._getRenderedDataFromRenderedIndex(info["renderedIndex"]);
			var mapping = _getMappingFromColumnIndex(self, info["columnIndex"]);
			if(!data || !mapping) {
				delete self.state.editingCellInfo;
				return null;
			}
			if(isCellReadonly(self, data, mapping)) {
				delete self.state.editingCellInfo;
				return null;
			}
			var prevData = null;
			var newData = null;
			if(cancel !== true) {
				var valueChanged = (data[mapping.key] !== info["value"]);
				var hasFunctionRefreshBy = false;
				var hasRefreshBy = false;
				for(var i=0;i<self.option.columnMapping.length;i++) {
					var targetmapping = self.option.columnMapping[i];
					if(!isColumnHidden(targetmapping)){
						continue;
					} 
					if($.isFunction(targetmapping.refreshBy)) {
						hasFunctionRefreshBy = true;
					}
					if(targetmapping.refreshBy) {
						hasRefreshBy = true;
					}
				}
				var prevValue = data[mapping.key];
				if(!data._original) {
					data._original = AlopexGrid.trimObject(data);
				}
				
				var newValue = info["value"];
				if(typeof newValue === "string" && newValue.length === 1 && newValue.charCodeAt(0) === 160) {
					newValue = "";
				}
				if(_isColumnValid.call(self, mapping, null, newValue, data)) {
					data[mapping.key] = newValue;
				} else {
					delete self.state.editingCellInfo;
					var errMessage = [];
					if (typeof mapping.invalid == "function") {
						errMessage.push(mapping.invalid($cell, value, data));
					} else if (typeof mapping.invalid === "string") {
						errMessage.push(mapping.invalid);
					} else {
						//errMessage.push(null);
					}
					self._triggerGridEvent('invalidEdit', {"data":data,"mapping":mapping,"messages":errMessage});
					if(norender!==true) {
						self._refreshBoard(true);
					}
					return null;
				}

				if(valueChanged) {
					if(self.option.fullCompareForEditedState) {
						data._state.edited = false;
						if(data._original) {
							$.each(data._original, function(k,v){
								if(v !== data[k]) {
									data._state.edited = true;
									return false;
								}
							});
						}
					} else {
						data._state.edited = true;	
					}
					if(self.state.dataFilltrimmer) {
						self.state.dataFilltrimmer(self, data);
					}
					if(self.state.dataCompositor) {
						self.state.dataCompositor(self, data);
					}
				}

				if(hasRefreshBy && valueChanged) {
					if(hasFunctionRefreshBy) {
						prevData = $.extend({}, data, AlopexGrid.trimObject(data));
						newData = $.extend({}, data, AlopexGrid.trimObject(data));
						prevData[mapping.key] = prevValue;
					}
					for(var i=0;i<self.option.columnMapping.length;i++) {
						var targetmapping = self.option.columnMapping[i];
						if(targetmapping.hasOwnProperty('refreshBy')) {
							var doit = false;
							var cond = targetmapping.refreshBy;
							if(cond === true) {
								doit = true;
							}
							else if(typeof cond === "string" && cond === mapping.key) {
								doit = true;
							}
							else if($.isArray(cond)
									&& ($.inArray(mapping.key, cond)>=0
											|| $.inArray(Number(mapping.columnIndex), cond)>=0)
							) {
								doit = true;
							}
							else if($.isFunction(cond)) {
								var op = {};
								op["prevData"] = prevData;
								op["newData"] = newData;
								op["_key"] = targetmapping.key;
								op["_column"] = targetmapping.columnIndex;
								op["_index"] = $.extend({}, data._index);
								op["mapping"] = targetmapping;
								op["done"] = function() {
									var $cell = self.refreshCell({_index:{data:this._index.data}}, this._column);
									$.isFunction(this["_done"]) ? this["_done"]() : null;
									$cell ? $cell.find('input,select,textarea').trigger('change') : null;
									this.complete = true;
								};

								var res = cond.call(op, prevData, newData, targetmapping,
										(function(worker){
											return function(){worker.done();};
										})(op));
								if(res === true) {
									doit = true;
								} else if(res === "async") {
									(function(worker){
										if(!worker.complete) {
											self._showProgress(function(done){
												worker["_done"] = done;
											},0,true);
										}
									})(op);
								}
							}
							if(doit) {
								self.refreshCell({_index:{data:dataIndex}}, targetmapping.columnIndex);
								//refreshed.push(targetmapping.columnIndex);
								//$cell ? $cell.find('input,select,textarea').trigger('change') : null;
							}
						}
					}//for
				}//if(hasRefreshBy)

				if(self.state.groupRowspanned && self.option.rowspanGroupEdit && mapping.rowspan) {
					// var lookupTable = self.state.groupingLookupTable;
					// var key = mapping.key;
					// var lookupTableItem = lookupTable[key] || {};
					// var lookupItem = lookupTableItem[dataIndex];
					//현재 셀이 rowspan을 하고 있는 범위의 key를 추출해야 한다.
					var lookupItem = self._getGroupingRangeByMapping(data._index.data, mapping);
					if(lookupItem) {
						for(var i=lookupItem.from; i<=lookupItem.to;i++) {
							var groupChanged = (self.state.data[i][mapping.key]!==newValue);
							self.state.data[i][mapping.key] = newValue;
							if(groupChanged) {
								if(self.option.fullCompareForEditedState) {
									self.state.data[i]._state.edited = false;
									if(self.state.data[i]._original) {
										$.each(self.state.data[i]._original, function(k,v){
											if(v !== self.state.data[i][k]) {
												self.state.data[i]._state.edited = true;
												return false;
											}
										});
									}
								} else {
									self.state.data[i]._state.edited = true;	
								}
//								if(self.state.data[i]._index.id !== data._index.id){
//									if(norender!==true) {
//										self.refreshRow({_index:{id:self.state.data[i]._index.id}});
//									}
//								}
							}
						}
					}
				}
			}

			self._triggerGridEvent('endCellEdit',{"value":data[mapping.key],"data":data,"mapping":mapping})

			delete self.state.editingCellInfo;
			if(norender!==true) {
				self._refreshBoard(true);
			}
			triggerCellSelectionEvent(self);
			return true;
		} else {
			return null;
		}
	};
	AlopexGrid.prototype._cancelCellEdit = function(){
		return this._endCellEdit(true);
	};

	//focus cell 외의 셀들이 셀렉션에 포함되어 있는가 여부
	function isCellSelectionAvailable(self) {
		return (!!self.state.cellSelection) && 
		(
				(self.state.cellSelection.rightBoundaryColumnIndex - self.state.cellSelection.leftBoundaryColumnIndex)
				||
				(self.state.cellSelection.bottomBoundaryRenderedIndex - self.state.cellSelection.topBoundaryRenderedIndex)
		);
	}
	function clearCellSelection(self) {
		delete self.state.cellSelection;
	}
	function correctRenderedIndex(self, renderedIndex) {
		return Math.min(Math.max(self.state.renderTargetDataIndexList.length-1,0),renderedIndex);
	}
	function correctColumnIndex(self, columnIndex) {
		return Math.min(Math.max(0,columnIndex),self.state.maxColumnIndex);
	}
	function startCellSelection(self, renderedIndex, columnIndex) {
		delete self.state.cellSelection;
		self.state.cellSelection = {};

		self.state.cellSelection.renderedIndexMap = {};
		self.state.cellSelection.columnIndexMap = {};

		renderedIndex = correctRenderedIndex(self, renderedIndex);
		columnIndex =correctColumnIndex(self, columnIndex);
		
//		var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
//		for(var i=columnIndex;i>=0;i--) {
//			var mapping = _getMappingFromColumnIndex(self, i);
//			if(!mapping) continue;
//			if(!isMappingVisible(mapping)) return;
//			if(!mapping.colspan) continue;
//			if(mapping && mapping.colspan) {
//				var colspanval = Number($.isNumeric(mapping.colspan) ? mapping.colspan :
//					($.isFunction(mapping.colspan) ? mapping.colspan(data[mapping.key], data, mapping) : null));
//				if(colspanval > 1 && columnIndex < mapping.columnIndex+colspanval) {
//					columnIndex = mapping.columnIndex;
//					break;
//				}
//			}
//		}
		
//		self.state.cellSelection.extendedRenderedIndex =
			self.state.cellSelection.focusRenderedIndex = renderedIndex;
//		self.state.cellSelection.extendedColumnIndex = 
			self.state.cellSelection.focusColumnIndex = columnIndex;

		self.state.cellSelection.focusRowspanInfo = 
			getRowspanInfoForCell(self, correctRenderedIndex(self, renderedIndex), correctColumnIndex(self, columnIndex));

		self.state.cellSelection.renderedIndexMap[renderedIndex] = true;
		self.state.cellSelection.columnIndexMap[columnIndex] = true;

		self.state.cellSelection.rightBoundaryColumnIndex = self.state.cellSelection.focusColumnIndex;
		self.state.cellSelection.leftBoundaryColumnIndex  = self.state.cellSelection.focusColumnIndex;
		self.state.cellSelection.bottomBoundaryRenderedIndex = self.state.cellSelection.focusRenderedIndex;
		self.state.cellSelection.topBoundaryRenderedIndex    = self.state.cellSelection.focusRenderedIndex;
	}
	var __cellSelectedClassNames = 
		[
		 'cell-selected',
		 'cell-selected-topline',
		 'cell-selected-bottomline',
		 'cell-selected-leftline',
		 'cell-selected-rightline',
		 'cell-selected-focus'
		 ].join(' ');
	function removeCellSelectionClasses(self) {
		self.$wrapper.find('.cell-selected')
		.removeClass(__cellSelectedClassNames);
	}
	function calculateCurrentCellSelectionBoundary(self) {
		if(self.state.cellSelection) {
			self.state.cellSelection.rightBoundaryColumnIndex = self.state.cellSelection.focusColumnIndex;
			self.state.cellSelection.leftBoundaryColumnIndex = self.state.cellSelection.focusColumnIndex;
			self.state.cellSelection.topBoundaryRenderedIndex = self.state.cellSelection.focusRenderedIndex;
			self.state.cellSelection.bottomBoundaryRenderedIndex = self.state.cellSelection.focusRenderedIndex;
	
			for(var renderedIndex in self.state.cellSelection.renderedIndexMap) {
				var ri = parseInt(renderedIndex);
				for(var columnIndex in self.state.cellSelection.columnIndexMap) {
					var ci = parseInt(columnIndex);
					if(self.state.visibleIndexMapByColumnIndex[ci] >= 0) {
						self.state.cellSelection.rightBoundaryColumnIndex = Math.max(self.state.cellSelection.rightBoundaryColumnIndex, ci);
						self.state.cellSelection.leftBoundaryColumnIndex = Math.min(self.state.cellSelection.leftBoundaryColumnIndex, ci);
						self.state.cellSelection.bottomBoundaryRenderedIndex = Math.max(self.state.cellSelection.bottomBoundaryRenderedIndex, ri);
						self.state.cellSelection.topBoundaryRenderedIndex = Math.max(0,Math.min(self.state.cellSelection.topBoundaryRenderedIndex, ri));
					}
				}
			}
		}
	}
	//이 내용이 false이면 일반적인 처리 - 모서리에서 스크롤하고 확장하고 - 를 하면 됨.
	function isCellSelectionStartFromFixedColumn(self){
		if(!self.state.cellSelection) return false;
		return self.state.cellSelection.focusColumnIndex <= self.state.fixupto;
	}
	function isCellSelectionStartFromFixedRow(self) {
		if(!self.state.cellSelection) return false;
		return self.state.cellSelection.focusRenderedIndex < self.option.rowFixCount;
	}
	function doesCellSelectionCrossFixedColumn(self) {
		if(!self.state.cellSelection) return false;
		return self.state.cellSelection.leftBoundaryColumnIndex <= self.state.fixupto
			&& self.state.cellSelection.rightBoundaryColumnIndex > self.state.fixupto;
	}
	function doesCellSelectionCrossFixedRow(self) {
		if(!self.state.cellSelection) return false;	
		return self.state.cellSelection.topBoundaryRenderedIndex < self.option.rowFixCount
			&& self.state.cellSelection.bottomBoundaryRenderedIndex >= self.option.rowFixCount;
	}
	function isPositionInCellSelection(self, renderedIndex, columnIndex) {
		return self.state.cellSelection.columnIndexMap[columnIndex] && self.state.cellSelection.renderedIndexMap[renderedIndex];
	}
	function isRowInFixedRow(self, renderedIndex) {
		return renderedIndex < self.option.rowFixCount;
	}
	function isColumnInFixedColumn(self, columnIndex) {
		return columnIndex <= self.state.fixupto;
	}
	
	function setSelectionFromTo(self, fromRenderedIndex, fromColumnIndex, renderedIndex, columnIndex) {
		startCellSelection(self, fromRenderedIndex, fromColumnIndex);
		//determineCellSelectionFromIndexMap(self);
		var rfrom = Math.min(fromRenderedIndex,renderedIndex);
		var rto = Math.max(fromRenderedIndex,renderedIndex);
		var cfrom = Math.min(fromColumnIndex,columnIndex);
		var cto = Math.max(fromColumnIndex,columnIndex);
		
		for(var c=cfrom;c<=cto;c++) {
			for(var r=rfrom;r<=rto;r++) {
				if(!(self.state.visibleIndexMapByColumnIndex[c] == null)) {
					var skip = expandCellSelectionByPosition(self, r, c);
					if(typeof skip === "number") {
						r = skip;
					}
				}
			}
		}
		
		determineCellSelectionFromIndexMap(self);
		calculateCurrentCellSelectionBoundary(self);
		
		removeCellSelectionClasses(self);
		addCellSelectionClasses(self);
	
		triggerCellSelectionEvent(self);
	}
	
	function addCellSelectionClasses(self) {
		if(!self.state.cellSelection) return;

		if(!self.state.refreshbodycell) return;

		for(var i=0,l=self.state.refreshbodycell.renderedDataIndexList.length;i<l;i++) {
			var dataIndex = self.state.refreshbodycell.renderedDataIndexList[i];
			var data = self.state.data[dataIndex];
			if(!data) continue;
			var ri = data._index.rendered;

			if(ri < self.state.cellSelection.topBoundaryRenderedIndex) continue;
			if(ri > self.state.cellSelection.bottomBoundaryRenderedIndex) continue;

			for(var j=0,jl=self.state.refreshbodycell.renderedColumnMappingList.length;j<jl;j++) {
				var mapping = self.state.refreshbodycell.renderedColumnMappingList[j];
				var ci = mapping.columnIndex;

				if(ci < self.state.cellSelection.leftBoundaryColumnIndex) continue;
				if(ci > self.state.cellSelection.rightBoundaryColumnIndex) continue;

				if(!(self.state.visibleIndexMapByColumnIndex[ci]>=0)) continue;
				var $c = $('#'+self._cellIdFromRendered(ri,ci));//locateCellForPosition(self, ri, ci);
				if(!$c || !$c.length) continue;

				var color = $c.css('color');
				var bgColor = $c.css('background-color');

				var stylekey = $.trim($c.prop('className').split('cell-selected')[0]);//$c.prop('id');//

				$c.addClass('cell-selected');
				var inRowspanRange = self.state.cellSelection.focusRowspanInfo 
					&& self.state.cellSelection.focusRowspanInfo["from"] <= ri
					&& self.state.cellSelection.focusRowspanInfo["to"] >= ri;
				var upto = getColspanUpto(self, data, ci);
				var inColspanRange = ci <= upto && ci <= self.state.cellSelection.focusColumnIndex && 
					self.state.cellSelection.focusColumnIndex <= upto;
				
				if(ci===self.state.cellSelection.focusColumnIndex
						&& ri===self.state.cellSelection.focusRenderedIndex) {
					$c.addClass('cell-selected-focus');
				} else if(inRowspanRange && self.state.cellSelection.focusColumnIndex === ci ) {
					$c.addClass('cell-selected-focus');
				} else if(inColspanRange && ri===self.state.cellSelection.focusRenderedIndex) {
					$c.addClass('cell-selected-focus');
				} else if(inColspanRange && inRowspanRange) {
					$c.addClass('cell-selected-focus');
				}

				if(ci===self.state.cellSelection.leftBoundaryColumnIndex) {
					$c.addClass('cell-selected-leftline');
				}
				if(ci===self.state.cellSelection.rightBoundaryColumnIndex) {
					$c.addClass('cell-selected-rightline');
				}
				if(ri===self.state.cellSelection.topBoundaryRenderedIndex) {
					$c.addClass('cell-selected-topline');
				}
				if(ri===self.state.cellSelection.bottomBoundaryRenderedIndex) {
					$c.addClass('cell-selected-bottomline');
				}
			//});
			}
		//});
		}
	}
	function getRowspanInfoForCell(self, renderedIndex, columnIndex) {
		var mapping = _getMappingFromColumnIndex(self, columnIndex);
		if(!mapping) return null;
		if(self.option.grouping && self.option.grouping.useGroupRowspan!==true) return null;
		
		var rowspanKey = null;//그룹을 따라갈 수 있게 한다. 이때에도 값을 분배하는가?
		if(mapping.rowspan === true) { //rowspan 세부설정은 컬럼단위로 지정하도록 한다.
			rowspanKey = mapping.key;
		} else if(mapping.rowspan && typeof mapping.rowspan.by === "string") {
			rowspanKey = mapping.rowspan.by;
		}

		var groupingLookupTable = self.state.groupingLookupTable;
		if(!groupingLookupTable) return null;
		var lookupList = groupingLookupTable[rowspanKey];
		if(!lookupList) return null;
		var dataIndex = self.state.renderTargetDataIndexList[renderedIndex];
		var lookupItem = lookupList[dataIndex];
		var groupFromDataIndex = lookupItem["from"];
		var groupToDataIndex = lookupItem["to"];
		var renderFrom = undefined;
		var renderTo = undefined;
		for(var d=groupFromDataIndex;d<=groupToDataIndex;d++) {
			var ri = self.state.renderTargetDataIndexList.indexOf(d);
			if(ri>=0) {
				if(renderFrom === undefined) {
					renderFrom = ri;
				} else {
					renderFrom = Math.min(ri, renderFrom);
				}
				if(renderTo === undefined) {
					renderTo = ri;
				} else {
					renderTo = Math.max(ri, renderTo);
				}
			}
		}
		if(renderFrom !== undefined && renderTo !== undefined) {
			return {"from":renderFrom,"to":renderTo};
		}

		return null;
	}
	//columnIndex 또는 key값 기준으로 몇번 columnIndex까지 colspan되는가를 얻어온다.
	function getColspanUpto(self, data, columnIndex) {
		var mapping = typeof columnIndex === "number" ? self.state.columnIndexToMapping[columnIndex] : columnIndex;
		if(mapping.colspan) {
			var colspanval = getColspanValue(self, data, mapping);
			if(colspanval) {
				//TODO 실제 렌더링 대상 컬럼들을 이용하여 colspanval 만큼 적용시 몇번컬럼까지 가는가를 검출해야 함.
				var currentVisibleIndex = self.state.visibleIndexMapByColumnIndex[mapping.columnIndex];
				var toVisibleIndex = Math.min(self.state.visibleColumnCount - 1, currentVisibleIndex + colspanval - 1);
				return self.state.visibleColumnMappingList[toVisibleIndex].columnIndex;
			}
		} else if(mapping.colspanTo) { //0이면 어짜피 mapping.columnIndex에 의해 0...
			//TODO columnIndex, key값 기준으로 colspan 범위를 계산한다.
			if(typeof mapping.colspanTo === "string") {
				//key값 기준으로 자기자신 뒤의 key 출현 컬럼을 검출한다.
				var currentVisibleIndex = self.state.visibleIndexMapByColumnIndex[mapping.columnIndex];
				var toVisibleIndex = self.state.visibleIndexMapByKey[mapping.colspanTo];
				return self.state.visibleColumnMappingList[toVisibleIndex].columnIndex;
			} else {
				if(!data) return null;
				var colspanTo = $.isFunction(mapping.colspanTo) ? 
						mapping.colspanTo(data[mapping.key], data, mapping) : mapping.colspanTo;
				var actualColumnIndex = colspanTo;
				if(typeof actualColumnIndex === "string") {
					var toVisibleIndex = self.state.visibleIndexMapByKey[actualColumnIndex];
					actualColumnIndex = self.state.visibleColumnMappingList[toVisibleIndex].columnIndex;
				}
				return Math.min(self.state.maxColumnIndex, actualColumnIndex);
			}
		}
		return null;
	}

	//self.state.visibleColumnCount
	//self.state.visibleColumnMappingList = [mapping, mapping, ...]
	//self.state.visibleIndexMapByColumnIndex[mapping.columnIndex] = visibleIndex;
	//self.state.visibleIndexMapByKey[mapping.key] = visibleIndex;
	
	function getColspanValue(self, data, mapping, columnIndexLimit) {
		var val = null;
		var currentVisibleIndex = null;
		if(mapping.colspan) {
			var colspanval = Number($.isNumeric(mapping.colspan) ? mapping.colspan :
				($.isFunction(mapping.colspan) ? mapping.colspan(data[mapping.key], data, mapping) : null));
			val = colspanval;
		} else if(mapping.colspanTo) {
			currentVisibleIndex = self.state.visibleIndexMapByColumnIndex[mapping.columnIndex];
			var colspanTo = $.isFunction(mapping.colspanTo) ? mapping.colspanTo(data[mapping.key], data, mapping) : mapping.colspanTo;
			if(typeof colspanTo === "string") {
				//key값 기준으로 자기자신 뒤의 key 출현 컬럼을 검출한다.
				var toVisibleIndex = self.state.visibleIndexMapByKey[colspanTo];
				var visibleLen = toVisibleIndex - currentVisibleIndex + 1
				val = visibleLen > 0 ? visibleLen : null;
			} else {
				var toVisibleIndex = self.state.visibleIndexMapByColumnIndex[colspanTo];
				var visibleLen = toVisibleIndex - currentVisibleIndex + 1
				val = visibleLen > 0 ? visibleLen : null
			}
		} else {
			return null;
		}
		if(columnIndexLimit) {
			currentVisibleIndex = currentVisibleIndex || self.state.visibleIndexMapByColumnIndex[mapping.columnIndex];
			var toVisibleIndex = self.state.visibleIndexMapByColumnIndex[columnIndexLimit];
			var visibleLen = toVisibleIndex - currentVisibleIndex + 1;
			//if(data._index.rendered===0) console.log('COLSPAN?',currentVisibleIndex,toVisibleIndex,columnIndexLimit,val,visibleLen)
			val = visibleLen > 0 ? Math.min(val, visibleLen) : null;//가로가상스크롤에 의한 제약을 반영.
		}
		if(currentVisibleIndex + val > self.state.visibleColumnCount) {
			val = self.state.visibleColumnCount - currentVisibleIndex;
		}
		return val;
	}
	function determineCellSelectionFromIndexMap(self) {
		var rfrom = self.state.cellSelection.topBoundaryRenderedIndex;
		var rto = self.state.cellSelection.bottomBoundaryRenderedIndex;
		var cfrom = self.state.cellSelection.leftBoundaryColumnIndex;
		var cto = self.state.cellSelection.rightBoundaryColumnIndex;
		for(var c=cfrom;c<=cto;c++) {
			for(var r=rfrom;r<=rto;r++) {
				if(self.state.visibleIndexMapByColumnIndex[c]>=0){
					var skip = expandCellSelectionByPosition(self, r, c);
					if(typeof skip === "number"){
						r = skip;
					}
				}
			}
		}
	}
	function expandCellSelectionByPosition(self, renderedIndex, columnIndex) {
		var dataIndex = self.state.renderTargetDataIndexList[renderedIndex];
		var mapping = _getMappingFromColumnIndex(self, columnIndex);
		if(!mapping) return;
		
		self.state.cellSelection.renderedIndexMap[renderedIndex] = true;
		self.state.cellSelection.columnIndexMap[columnIndex] = true;

		var groupRange = (mapping.rowspan && self.option.grouping && self.option.grouping.useGroupRowspan===true) 
			//? self._getGroupingRangeByMapping(dataIndex, mapping) : false;
			? getRowspanInfoForCell(self, renderedIndex, columnIndex) : false; 

		if(groupRange) {
			//filter가 되어서 렌더링되지 않은 데이터는 이전의 _index.rendered 값을 가지고 있으므로
			//이 로직은 오작동한다.
			var fromRendered = groupRange["from"];//self.state.data[groupRange["from"]]._index.rendered;
			var toRendered = groupRange["to"];//self.state.data[groupRange["to"]]._index.rendered;
			var from = Math.min(toRendered,fromRendered,self.state.renderTargetDataIndexList.length-1);
			var to = Math.min(Math.max(toRendered,fromRendered), self.state.renderTargetDataIndexList.length-1);
			for(var r=from;r<=to;r++) {
				self.state.cellSelection.renderedIndexMap[r] = true;
				var data = self._getRenderedDataFromRenderedIndex(r);
				for(var i=columnIndex;i>=0;i--) {
					if(!(self.state.visibleIndexMapByColumnIndex[i]>=0)){
						continue;
					}
					var mapping = _getMappingFromColumnIndex(self, i);
					if(!mapping || !isMappingVisible(mapping) || (!mapping.colspan && !mapping.colspanTo)) {
						continue;
					}
					var upto = getColspanUpto(self, data, mapping);
					if(!upto || upto < columnIndex) continue;
				
					for(var c=i;c<=upto && c<=self.state.maxColumnIndex;c++) {
						if(self.state.visibleIndexMapByColumnIndex[c]>=0){
							self.state.cellSelection.columnIndexMap[c] = true;
						}
					}
				
				}
			}
			return to;
		} 
		//if(mapping.colspan || mapping.colspanTo){
			var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
			for(var i=columnIndex;i>=0;i--) {
				var mapping = _getMappingFromColumnIndex(self, i);
				if(!mapping) continue;
				if(!isMappingVisible(mapping) || (!mapping.colspan && !mapping.colspanTo)) continue;
				var upto = getColspanUpto(self, data, mapping);
				if(!upto || upto < columnIndex) continue;
				for(var c=i;c<=upto && c<=self.state.maxColumnIndex;c++) {
					self.state.cellSelection.columnIndexMap[c] = true;
				}
			}
		//}
//		
//		if(mapping.colspan) {
//			var colspan = Number($.isNumeric(mapping.colspan) ? mapping.colspan :
//				($.isFunction(mapping.colspan) ? mapping.colspan(data[mapping.key], data, mapping) : null));
//			if(colspan>1) {
//				var from = Math.min(columnIndex, (columnIndex+colspan-1));
//				var to = Math.max(columnIndex, (columnIndex+colspan-1));
//				for(var c=from;c<=to;c++) {
//					self.state.cellSelection.columnIndexMap[c] = true;
//				}
//			}
//		}
	}
	//실제 렌더링된 셀을 찾아서 포커스를 주고자 할 떄 사용. focusColumnIndex는 이동하고 있는데
	//그 중간에 rowspan cell이 있다면 그에 대응해야 한다. 
	function locateCellForPosition(self, renderedIndex, columnIndex) {
		var $cell = $('#'+self._cellIdFromRendered(renderedIndex, columnIndex));
		if($cell.length) return $cell;
		if(self.state.groupRowspanned && self.option.grouping && self.option.grouping.useGroupRowspan===true) {
			var mapping = _getMappingFromColumnIndex(self, columnIndex);
			if(mapping && mapping.rowspan) {
				var info = getRowspanInfoForCell(self, renderedIndex, columnIndex);
				if(!info) return null;
				if(info["from"] !== renderedIndex) {
					var r = renderedIndex-1;
					if(info["from"] < renderedIndex) {
						r = info["from"] || 0;
					}
					if(r === renderedIndex) return null;
					return locateCellForPosition(self, r, columnIndex);
				}
			}
		}
		
		var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
		for(var i=columnIndex;i>=0;i--) {
			var mapping = _getMappingFromColumnIndex(self, i);
			if(!mapping) continue;
			if(!isMappingVisible(mapping)) return;
			var upto = getColspanUpto(self, data, mapping);
			if(columnIndex <= upto) {//자신이 포함된다면
				if(columnIndex === mapping.columnIndex) return null;
				 return locateCellForPosition(self, renderedIndex, mapping.columnIndex);
			}
		}
		return null;
	}
	//현재 focusColumnIndex, focusRenderedIndex 정보에 의해 자신이 focus 대상 셀인지 테스트
	//_cellRender에서 렌더링하는 셀이 cell-selected-focus 클래스를 가져야 하는지를 테스트한다.
	function doesCellHasFocus(self, renderedIndex, columnIndex) {

	}
	function restoreCurrentFocusForCellSelection(self) {
		focusCorespondingCell(self, self.state.cellSelection.focusRenderedIndex,self.state.cellSelection.focusColumnIndex);
	}
	function focusCorespondingCell(self, renderedIndex, columnIndex) {
		self._focusEditCell(renderedIndex, columnIndex);
	}
	function setFocusFixture(self, renderedIndex, columnIndex) {
		var prop = {};
		var attr = {};
		if(_valid(renderedIndex)) {
			prop["renderedIndex"] = renderedIndex;
			var dataIndex = attr["data-alopexgrid-dataindex"] = self.state.renderTargetDataIndexList[renderedIndex];
			attr["data-alopexgrid-dataid"] = self.state.data[dataIndex]._index.id;
		}
		if(_valid(columnIndex)) {
			prop["columnIndex"] = columnIndex;
			attr["data-alopexgrid-columnindex"] = columnIndex;
		}
		self.$focusfixture.prop(prop).attr(attr);//[0].focus();
		var el = self.$focusfixture[0];
		var range = document.createRange();
		var sel = window.getSelection();
		var t = document.createTextNode("");
		el.appendChild(t);
		range.setStart(el.childNodes[0], 0);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
		//selectLogger('focus fixture got selection(focus)');
	}
	function moveCellFocusByIndex(self, renderedIndex, columnIndex) {
		if(!self.state.cellSelection) return;
		renderedIndex = correctRenderedIndex(self, renderedIndex);
		columnIndex = correctColumnIndex(self, columnIndex);
		self.state.cellSelection.focusRenderedIndex = renderedIndex;
		self.state.cellSelection.focusColumnIndex = columnIndex;
		self.state.cellSelection.focusRowspanInfo = 
			getRowspanInfoForCell(self, self.state.cellSelection.focusRenderedIndex, self.state.cellSelection.focusColumnIndex);
		expandCellSelectionByPosition(self, renderedIndex, columnIndex);
		calculateCurrentCellSelectionBoundary(self);
		moveScrollForCellToShow(self, self.state.cellSelection.focusRenderedIndex,self.state.cellSelection.focusColumnIndex);
		removeCellSelectionClasses(self);
		addCellSelectionClasses(self);
		setTimeout(function(){setFocusFixture(self, renderedIndex, columnIndex);},0);
	}
	function setInitialFocusOnCellByIndex(self, renderedIndex, columnIndex, direction) {
		renderedIndex = correctRenderedIndex(self, renderedIndex);
		columnIndex = correctColumnIndex(self, columnIndex);
		startCellSelection(self, renderedIndex, columnIndex);
		expandCellSelectionByPosition(self, renderedIndex, columnIndex);
		calculateCurrentCellSelectionBoundary(self);
		//if(direction) console.log(self.state.cellSelection)
		if(direction === "up") {
			self.state.cellSelection.focusRenderedIndex = self.state.cellSelection.topBoundaryRenderedIndex;
		} else if(direction === "down") {
			self.state.cellSelection.focusRenderedIndex = self.state.cellSelection.bottomBoundaryRenderedIndex;
		} else if(direction === "left") {
			self.state.cellSelection.focusColumnIndex = self.state.cellSelection.leftBoundaryColumnIndex;
		} else if(direction === "right") {
			self.state.cellSelection.focusColumnIndex = self.state.cellSelection.rightBoundaryColumnIndex;
		}
		self.state.cellSelection.focusRowspanInfo = 
			getRowspanInfoForCell(self, self.state.cellSelection.focusRenderedIndex, self.state.cellSelection.focusColumnIndex);
		moveScrollForCellToShow(self, self.state.cellSelection.focusRenderedIndex,self.state.cellSelection.focusColumnIndex);
		removeCellSelectionClasses(self);
		addCellSelectionClasses(self);

		setTimeout(function(){
			if(!self.state.cellSelection) return; //TODO ??
			setFocusFixture(self, 
					self.state.cellSelection.focusRenderedIndex, 
					self.state.cellSelection.focusColumnIndex);
		},0);
	}
	function changeCellFocusByIncrement(self, renderedInc, columnInc) {
		if(!self.state.cellSelection) return;
		var renderedIndex = self.state.cellSelection.focusRenderedIndex;
		var columnIndex = self.state.cellSelection.focusColumnIndex;
		var toRendered = renderedIndex+renderedInc;
		//var toColumn = columnIndex+columnInc;
		var toColumn = columnIndex;
		if(columnInc > 0) {
			toColumn = columnIndexAtRightSide(self, columnIndex, columnInc);
		} else if(columnInc < 0) {
			toColumn = columnIndexAtLeftSide(self, columnIndex, -columnInc);
		}
		
		if(isCellSelectionAvailable(self)) {
			//selection 안에서 움직여야 한다.
			if(renderedInc) {
				if(toRendered > self.state.cellSelection.bottomBoundaryRenderedIndex) {
					toRendered = self.state.cellSelection.topBoundaryRenderedIndex;
					//toColumn++;
					toColumn = columnIndexAtRightSide(self, toColumn,1);
				}else if(toRendered < self.state.cellSelection.topBoundaryRenderedIndex) {
					toRendered = self.state.cellSelection.bottomBoundaryRenderedIndex;
					//toColumn--;
					toColumn = columnIndexAtLeftSide(self, toColumn,1);
				}

				if(toColumn > self.state.cellSelection.rightBoundaryColumnIndex) {
					toColumn = self.state.cellSelection.leftBoundaryColumnIndex;
				} else if(toColumn < self.state.cellSelection.leftBoundaryColumnIndex) {
					toColumn = self.state.cellSelection.rightBoundaryColumnIndex;
				}	
			} else if(columnInc) {
				if(toColumn > self.state.cellSelection.rightBoundaryColumnIndex) {
					toColumn = self.state.cellSelection.leftBoundaryColumnIndex;
					toRendered++;
				} else if(toColumn < self.state.cellSelection.leftBoundaryColumnIndex) {
					toColumn = self.state.cellSelection.rightBoundaryColumnIndex;
					toRendered--;
				}

				if(toRendered > self.state.cellSelection.bottomBoundaryRenderedIndex) {
					toRendered = self.state.cellSelection.topBoundaryRenderedIndex;
				}else if(toRendered < self.state.cellSelection.topBoundaryRenderedIndex) {
					toRendered = self.state.cellSelection.bottomBoundaryRenderedIndex;
				}
			}

			moveCellFocusByIndex(self, toRendered, toColumn);
		} else {
			setInitialFocusOnCellByIndex(self, toRendered, toColumn);
		}
	}
	function extendCellSelectionByDirection(self, left, right, up, down) {
		//현재 셀렉션에서 포커스지점과 전체 범위를 고려하여 선택범위를 늘이거나 줄인다.
		//각 방향은 키보드를 눌렀을때를 가정한다.
//TODO rowspan colspan 처리에 대해 확장축소 모두 general하게 돌아갈 수 있는 알고리즘 필요.
//rowspan/colspan cell 범위 안에 focus가 있을 경우 처리할 수 없다.
		self.state.cellSelection.extendedRenderedIndex = self.state.cellSelection.focusRenderedIndex;
		self.state.cellSelection.extendedColumnIndex = self.state.cellSelection.focusColumnIndex;
		if(left) {
			//focusColumnIndex 보다 rightboundary가 오른쪽에 있다면 오른쪽을 줄이고
			//아니면 왼쪽을 늘린다.
			if(self.state.cellSelection.focusColumnIndex < self.state.cellSelection.rightBoundaryColumnIndex) {
				delete self.state.cellSelection.columnIndexMap[self.state.cellSelection.rightBoundaryColumnIndex];
				self.state.cellSelection.extendedColumnIndex = 
					Math.max(0,
							columnIndexAtLeftSide(self, self.state.cellSelection.rightBoundaryColumnIndex,1 )
							);
				self.state.cellSelection.rightBoundaryColumnIndex = 
					self.state.cellSelection.extendedColumnIndex;
			} else {
				var extendColumnIndex = Math.max(
						columnIndexAtLeftSide(self, self.state.cellSelection.leftBoundaryColumnIndex, 1),
						0
					);
				self.state.cellSelection.columnIndexMap[extendColumnIndex] = true;
				self.state.cellSelection.leftBoundaryColumnIndex = Math.max(0,
						Math.min(self.state.cellSelection.leftBoundaryColumnIndex, extendColumnIndex)
					);
				self.state.cellSelection.extendedColumnIndex = extendColumnIndex;
			}
		} else if(right) {
			if(self.state.cellSelection.focusColumnIndex > self.state.cellSelection.leftBoundaryColumnIndex) {
				delete self.state.cellSelection.columnIndexMap[self.state.cellSelection.leftBoundaryColumnIndex];
				self.state.cellSelection.extendedColumnIndex = 
					columnIndexAtRightSide(self, self.state.cellSelection.leftBoundaryColumnIndex,1);
				self.state.cellSelection.leftBoundaryColumnIndex = 
					self.state.cellSelection.extendedColumnIndex;
			} else {
				var extendColumnIndex = Math.min(
						columnIndexAtRightSide(self, self.state.cellSelection.rightBoundaryColumnIndex,1),
						self.state.maxColumnIndex
					);
				self.state.cellSelection.columnIndexMap[extendColumnIndex] = true;
				self.state.cellSelection.rightBoundaryColumnIndex
					= Math.min(self.state.maxColumnIndex, 
							Math.max(self.state.cellSelection.rightBoundaryColumnIndex, extendColumnIndex));
				self.state.cellSelection.extendedColumnIndex = extendColumnIndex;
			}
		} else if(up) {
			up = (up===true) ? 1 : up;
			var focusLineBottom = self.state.cellSelection.focusRenderedIndex;
			for(var c = self.state.cellSelection.leftBoundaryColumnIndex;
					c<=self.state.cellSelection.rightBoundaryColumnIndex;c++){
				var mapping = _getMappingFromColumnIndex(self, c);
				var rowspanInfo = getRowspanInfoForCell(self, self.state.cellSelection.focusRenderedIndex, c);
				if(!rowspanInfo) continue;
				var rowspanLen = rowspanInfo["to"] - rowspanInfo["from"];
				if(rowspanLen) {
					focusLineBottom = rowspanInfo["to"];
				}
			}
			var shrinkMode = focusLineBottom < self.state.cellSelection.bottomBoundaryRenderedIndex;

			if(shrinkMode) {
				//아래에서 위로 축소
				var shrinkToRenderedIndex = Math.max(0,self.state.cellSelection.bottomBoundaryRenderedIndex-up);
				
				var scanline = shrinkToRenderedIndex;
				
				for(var c = self.state.cellSelection.leftBoundaryColumnIndex;
					c<=self.state.cellSelection.rightBoundaryColumnIndex;c++){
					var mapping = _getMappingFromColumnIndex(self, c);
					var rowspanInfo = getRowspanInfoForCell(self, scanline, c);
					if(rowspanInfo && (rowspanInfo["to"]-rowspanInfo["from"])>0) {
						shrinkToRenderedIndex = Math.max(
								Math.min(shrinkToRenderedIndex,rowspanInfo["from"]-1),
								self.state.cellSelection.focusRenderedIndex);
					}
				}
				
				for( var i = self.state.cellSelection.bottomBoundaryRenderedIndex;
					i>self.state.cellSelection.focusRenderedIndex && i>shrinkToRenderedIndex;
					i--
				) {
					delete self.state.cellSelection.renderedIndexMap[i];
				}
//축소한 최종 위치에 rowspan이 하나라도 있다면 그 rowspan범위 바로 위를 bottom boundary로 정의해야 한다.
				self.state.cellSelection.extendedRenderedIndex = shrinkToRenderedIndex;
				self.state.cellSelection.bottomBoundaryRenderedIndex = shrinkToRenderedIndex;
			} else {//위로 확장
				
				var expandToRenderedIndex = Math.max(
						self.state.cellSelection.topBoundaryRenderedIndex-up,
						0);
				var scanline = expandToRenderedIndex;
				
				//확장위치에 rowspand이 하나라도 있다면 rowspan범위 바로 위를 top boundary로.
				for(var c = self.state.cellSelection.leftBoundaryColumnIndex;
					c<=self.state.cellSelection.rightBoundaryColumnIndex;c++){
					var mapping = _getMappingFromColumnIndex(self, c);
					var rowspanInfo = getRowspanInfoForCell(self, scanline, c);
					if(rowspanInfo && (rowspanInfo["to"]-rowspanInfo["from"])>0) {
						expandToRenderedIndex = Math.max(
								Math.min(expandToRenderedIndex,rowspanInfo["from"]),
								0);
					}
				}
				
				for(var i=self.state.cellSelection.topBoundaryRenderedIndex;
					i>=expandToRenderedIndex && i>=0;
					i--
				) {
					self.state.cellSelection.renderedIndexMap[i] = true;
				}
				self.state.cellSelection.extendedRenderedIndex = expandToRenderedIndex;
				self.state.cellSelection.topBoundaryRenderedIndex = expandToRenderedIndex;
			}
		} else if(down) {
			down = (down === true) ? 1 : down;
			var focusLineTop = self.state.cellSelection.focusRenderedIndex;
			for(var c = self.state.cellSelection.leftBoundaryColumnIndex;
					c<=self.state.cellSelection.rightBoundaryColumnIndex;c++){
				var mapping = _getMappingFromColumnIndex(self, c);
				var rowspanInfo = getRowspanInfoForCell(self, self.state.cellSelection.focusRenderedIndex, c);
				if(!rowspanInfo) continue;
				var rowspanLen = rowspanInfo["to"] - rowspanInfo["from"];
				if(rowspanLen) {
					focusLineTop = rowspanInfo["from"];
				}
			}
			var shrinkMode = focusLineTop > self.state.cellSelection.topBoundaryRenderedIndex;

			if(shrinkMode) {
				//위에서 아래로 축소
				
				var shrinkToRenderedIndex = Math.min(
						self.state.cellSelection.topBoundaryRenderedIndex+down,
						Math.max(self.state.renderTargetDataIndexList.length-1,0)
				);
				
				var scanline = shrinkToRenderedIndex;
				
				for(var c = self.state.cellSelection.leftBoundaryColumnIndex;
					c<=self.state.cellSelection.rightBoundaryColumnIndex;c++){
					var mapping = _getMappingFromColumnIndex(self, c);
					var rowspanInfo = getRowspanInfoForCell(self, scanline, c);
					if(rowspanInfo && (rowspanInfo["to"]-rowspanInfo["from"])>0) {
						shrinkToRenderedIndex = Math.min(
							Math.max(shrinkToRenderedIndex,rowspanInfo["to"]+1),
							self.state.cellSelection.focusRenderedIndex);
					}
				}
				
				for( var i = self.state.cellSelection.topBoundaryRenderedIndex;
				i<self.state.cellSelection.focusRenderedIndex && i<shrinkToRenderedIndex;
				i++
				) {
					delete self.state.cellSelection.renderedIndexMap[i];
				}
//축소한 최종 위치에 rowspan이 하나라도 있다면 그 rowspan범위 바로 아래를 top boundary로 정의해야 한다.
				self.state.cellSelection.extendedRenderedIndex = shrinkToRenderedIndex;
				self.state.cellSelection.topBoundaryRenderedIndex = shrinkToRenderedIndex;
			} else {
				//아래방향으로 확장
				var expandToRenderedIndex = 
						Math.min(self.state.renderTargetDataIndexList.length-1, 
								self.state.cellSelection.bottomBoundaryRenderedIndex+down);
				//확장하는 최종 위치에 rowspan이 하나라도 있다면 그 rowspan 범위 바로 아래를 bottom boundary로 정의해야 한다.
				
				var scanline = expandToRenderedIndex;
				for(var c = self.state.cellSelection.leftBoundaryColumnIndex;
					c<=self.state.cellSelection.rightBoundaryColumnIndex;c++){
					var mapping = _getMappingFromColumnIndex(self, c);
					var rowspanInfo = getRowspanInfoForCell(self, scanline, c);
					if(rowspanInfo && (rowspanInfo["to"]-rowspanInfo["from"])>0) {
						expandToRenderedIndex = Math.min(
							Math.max(expandToRenderedIndex,rowspanInfo["to"]),
							self.state.renderTargetDataIndexList.length-1);
					}
				}
				
				for( var i=self.state.cellSelection.bottomBoundaryRenderedIndex;
				i<=(expandToRenderedIndex) && i<self.state.renderTargetDataIndexList.length;
				i++
				) {
					self.state.cellSelection.renderedIndexMap[i] = true;
				}
				self.state.cellSelection.extendedRenderedIndex = expandToRenderedIndex;
				self.state.cellSelection.bottomBoundaryRenderedIndex = expandToRenderedIndex;
			}
		}

		//줄이거나 늘리는 작업이 완료되면 범위를 정리함. 
		determineCellSelectionFromIndexMap(self);
		calculateCurrentCellSelectionBoundary(self);
		
		removeCellSelectionClasses(self);
		addCellSelectionClasses(self);

		var $cell = locateCellForPosition(self, 
				self.state.cellSelection.extendedRenderedIndex, self.state.cellSelection.extendedColumnIndex);
		// if($cell && $cell.length) {
		// 	var pos = $cell.position();
		// 	moveScrollerForBoxToShow(self, pos.left, pos.top, $cell.outerWidth(), $cell.outerHeight());
		// }
		moveScrollForCellToShow(self, self.state.cellSelection.extendedRenderedIndex, self.state.cellSelection.extendedColumnIndex);

	}
	//예측스크롤
	function moveScrollForCellToShow(self, renderedIndex, columnIndex, toPosition) {
		var columnWidthMap = self.state.columnWidthMap;
		var rowHeight = self.state.rowHeight;
		
		var wrapperWidth = self.state.wrapperWidth;
		var wrapperHeight = self.state.wrapperHeight;
		var renderFromRenderedIndex = self.state.renderFromRenderedIndex;
		var renderFromColumnIndex = self.state.renderFromColumnIndex;
		var renderToRenderedIndex = self.state.renderToRenderedIndex;
		var renderToColumnIndex = self.state.renderToColumnIndex;
		
		var noNeedX = false;
		var noNeedY = false;

//		self.state.refreshbodycell.renderedColumnMappingList;
//		self.state.refreshbodycell.renderedFixedColumnMappingList;
//		self.state.visibleIndexMapByColumnIndex;
		
		if(self.state.fixupto>=0) {
			//renderFromColumnIndex += self.state.fixedColumnMapping.length;
			var rm = self.state.refreshbodycell.renderedColumnMappingList;
			var fm = self.state.refreshbodycell.renderedFixedColumnMappingList;
			renderFromColumnIndex = rm[fm.length].columnIndex;
			if(columnIndex <= self.state.fixupto && toPosition !== true) {
				noNeedX = true;
			}
		}
		if(self.option.rowFixCount > 0) {
			if(renderedIndex < self.option.rowFixCount && toPosition !== true) {
				noNeedY = true;
			}
			for(var i=0;i<self.option.rowFixCount;i++) {
				var dataIndex = self.state.renderTargetDataIndexList[i];
				var data = self.state.data[dataIndex];
				if(!data) continue;
				renderFromRenderedIndex++;
			}
		} else if(self.state.refreshbodycell && self.state.refreshbodycell.renderedPinnedDataIndexList) {
			if(renderedIndex < self.state.refreshbodycell.renderedPinnedDataIndexList.length && toPosition !== true) {
				noNeedY = true;
			}
			for(var i=0;i<self.state.refreshbodycell.renderedPinnedDataIndexList.length;i++) {
				var dataIndex = self.state.refreshbodycell.renderedPinnedDataIndexList[i];
				var data = self.state.data[dataIndex];
				if(!data) continue;
				renderFromRenderedIndex++;
			}
		}
		var vm = self.state.visibleIndexMapByColumnIndex;
		if(!noNeedX) {
			if(columnIndex < renderFromColumnIndex) {
				//wrapper 왼쪽에 셀이 위치하고 있음.
				//console.log('leftside');
				self._scrollLeftEvent(vm[renderFromColumnIndex] - vm[columnIndex], false);
			} else if(columnIndex >= renderToColumnIndex) {
				//wrapper 오른쪽에 셀이 위치하고 있음. 오른쪽 셀이 보이기 위한 실제 카운트를 찾아야 함.
				//console.log('rightside')
				var rightOffset = 0;
				//var currentRightMapping = _getMappingFromColumnIndex(self, renderToColumnIndex);
				var currentRightColumnWidth = self.state.columnWidthMap[renderToColumnIndex];
				var offset = columnIndex - renderToColumnIndex + 1;
				var leftOffsetWidth = 0;
				for(var o=0,i=renderFromColumnIndex;i<=self.state.maxColumnIndex,o<offset;i++,o++) {
					var mapping = _getMappingFromColumnIndex(self, i);
					if(!mapping) continue;
					leftOffsetWidth += self.state.columnWidthMap[i];
					rightOffset++;
					if(leftOffsetWidth > currentRightColumnWidth) {
						break;
					}
				}
				self._scrollRightEvent(rightOffset, false);
			}
		}
		if(!noNeedY) {
			if(renderedIndex < renderFromRenderedIndex && !(renderedIndex < self.option.rowFixCount)) {
				//wrapper 위쪽에 셀이 위치하고 있음.
				//console.log('above')
				self._scrollUpEvent(renderFromRenderedIndex - renderedIndex, false);
			} else if(renderedIndex >= renderToRenderedIndex && !(renderedIndex < self.option.rowFixCount)) {
				//wrapper 아래쪽에 셀이 위치하고 있음.
				//console.log('lower')
				self._scrollDownEvent(renderedIndex - renderToRenderedIndex + 1, false);
			}
		}
		self._refreshBoard();
		//moveScrollerForBoxToShow(self, leftPos, renderedIndex*rowHeight, width, rowHeight);
	}
	function moveScrollerForBoxToShow(self,left,top,width,height) {
		//TODO 새로구현
	}
	function triggerCellSelectionEvent(self) {
		if(!self.state.cellSelection) {
			return self.$root.trigger("cellSelectionEmpty");
		}
		var renderedFrom = self.state.cellSelection.topBoundaryRenderedIndex;
		var renderedTo = self.state.cellSelection.bottomBoundaryRenderedIndex;
		var columnFrom = self.state.cellSelection.leftBoundaryColumnIndex;
		var columnTo = self.state.cellSelection.rightBoundaryColumnIndex;
		var selectionValueList = []
		for(var renderedIndex=renderedFrom;renderedIndex<=renderedTo;renderedIndex++) {
			var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
			for(var columnIndex=columnFrom;columnIndex<=columnTo;columnIndex++) {
				var mapping = _getMappingFromColumnIndex(self, columnIndex);
				if(!mapping || !data) continue;
				if(!data._meta && mapping.key) {
					selectionValueList.push(data[mapping.key]);
				}
				if(data._meta) {
					selectionValueList.push(data[mapping.columnIndex]);
				}
			}
		}
		var eventName = "cellSelectionChange";
		if(renderedFrom === renderedTo && columnFrom === columnTo) {
			eventName = "cellSelectionStart";
		}
		var event = jQuery.Event(eventName);
		event.selectionValueList = selectionValueList;
		event.fromSelectionRow = renderedFrom;
		event.toSelectionRow = renderedTo;
		event.fromSelectionColumn = columnFrom;
		event.toSelectionColumn = columnTo;
		self.$root.trigger(event);
	}
	var re_attributeSearch = /([^\s]*)=["'](.*?)["']|([\w\-]+)/g;
	function convertSelectionToTableMarkup(self){
		if(!self.state.cellSelection) return;
		
		if(self.state.cellSelection.leftBoundaryColumnIndex === self.state.cellSelection.rightBoundaryColumnIndex
			&& self.state.cellSelection.topBoundaryRenderedIndex === self.state.cellSelection.bottomBoundaryRenderedIndex) {
			//single cell -  no table
			var data = self._getRenderedDataFromRenderedIndex(self.state.cellSelection.focusRenderedIndex);
			var mapping = _getMappingFromColumnIndex(self, self.state.cellSelection.focusColumnIndex);
			if(data && mapping && mapping.key) {
				return data[mapping.key];
			}
		}
		
		var table = '<table><!-- Alopex UI Grid Table Conversion -->';
		var fromRenderedIndex = self.state.cellSelection.topBoundaryRenderedIndex;
		var toRenderedIndex = self.state.cellSelection.bottomBoundaryRenderedIndex;
		var selectionMappingList = [];
		for(var i=self.state.cellSelection.leftBoundaryColumnIndex;i<=self.state.cellSelection.rightBoundaryColumnIndex;i++) {
			var mapping = self.state.columnIndexToMapping[i];
			if(!mapping || !isMappingVisible(mapping)) continue;
			selectionMappingList.push(mapping);
		}

		table += '<colgroup>';

		for(var i=0,l=selectionMappingList.length;i<l;i++) {
			var mapping = selectionMappingList[i];
			table += '<col style="width:'+mapping.width+';">';
		}

		table += '</colgroup>';

		table += '<tbody>';
		
		var cellSelectionTemp = self.state.cellSelection;
		self.state.cellSelection = null;
		
		var rowspanCount = [];
		
		for(var renderedIndex = fromRenderedIndex;renderedIndex<=toRenderedIndex;renderedIndex++) {
			var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
			if(!data) continue;
			table += '<tr>';
			for(var i=0,l=selectionMappingList.length;i<l;i++) {
				rowspanCount[i] = rowspanCount[i] || 0;
				if(rowspanCount[i] > 0) {
					rowspanCount[i]--;
					continue;
				}
				var mapping = selectionMappingList[i];
				var rowspanInfo = getRowspanInfoForCell(self, renderedIndex, mapping.columnIndex);
				var colspanUpto = getColspanUpto(self, data, mapping);
				var attr = self._generateCellAttribute(data, mapping);
				attr["styleclass"] = "cell bodycell " + attr["styleclass"];
				//attr["data-alopexgrid-value"] = data[mapping.key];
				var content = data[mapping.key];//self._generateCellContent(data, mapping);
				
				var rowspanValue = 0;
				if(rowspanInfo) {
					rowspanValue = rowspanInfo["to"] - renderedIndex + 1;
					rowspanCount[i] = rowspanValue-1;
					attr["rowspan"] = rowspanValue;
				}
				if(colspanUpto > mapping.columnIndex) {
					var colspanval = 1;
					for(var j=i+1;j<l;j++) {
						var rightMapping = selectionMappingList[j];
						if(rightMapping.columnIndex <= colspanUpto) {
							colspanval++;
						}
						if(rightMapping.columnIndex >= colspanUpto) {
							break;
						}
					}
					attr["colspan"] = colspanval;
					i += colspanval-1;
				}
				
				table += '<td';
				
				var div = document.createElement('div');
				div.className = attr["styleclass"];
				self.$wrapper[0].appendChild(div);
				var actualStyle = window.getComputedStyle(div);
				attr["style"] = (attr["style"]||"") 
					+ "background-color:"+(actualStyle.getPropertyValue('background-color'))+";"
					//+ "border:"+(actualStyle.border)+";"
					+ "color:"+(actualStyle.getPropertyValue('color'))+";";
				self.$wrapper[0].removeChild(div);
				div = null;
				actualStyle = null;

				for(var prop in attr) {
					var key = prop;
					var val = attr[prop];
					if(key==="styleclass") key = "class";
					table += (' '+key+'="'+val+'"');
				}

				table += '>';
				table += _valid(content) ? String(content).replace(/\n/g,'<br style="mso-data-placement:same-cell;"/>') : "";
				table += '</td>';
			}

			table += '</tr>';
		}
		self.state.cellSelection = cellSelectionTemp;
		table += '</tbody></table>';
//		selectLogger('converted ',
//				self.state.cellSelection.topBoundaryRenderedIndex,'/',self.state.cellSelection.leftBoundaryColumnIndex,' to ',
//				self.state.cellSelection.bottomBoundaryRenderedIndex,'/',self.state.cellSelection.rightBoundaryColumnIndex);
		return table;
	}
	function decodeHtml(html) {
		var txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	}
	function pasteToCurrentSelectionFocus(self, markup){
		var clipboardRows = [];
		if(markup.indexOf('&lt;table')>=0 && markup.indexOf('table&gt;')>=0) {
			markup = decodeHtml(markup);
		}
		if(markup.indexOf('<table')>=0) {
			markup = markup.slice(markup.indexOf('<table'));
			if(markup.lastIndexOf('</table>')>=0) {
				markup = markup.slice(0,markup.lastIndexOf('</table>'))+'</table>';
			}//selectLogger("clipped[",markup,"]");
			var $markup = $(markup);
			var $tr = $markup.find('tr');
			$tr.each(function(rowIndex,tr){
				clipboardRows[rowIndex] = [];
			});
			$tr.each(function(rowIndex,tr){
				var localcolspan = 0;
				$(tr).children().each(function(colIndex,td){
					if(td.rowSpan>1) {
						var to = rowIndex + parseInt(td.rowSpan);
						for(var r=rowIndex+1;r<to;r++) {
							clipboardRows[r][colIndex] = null;
						}
					}
					if(td.colSpan > 1) {
						for(var c=colIndex+1;c<colIndex+colSpan;c++) {
							clipboardRows[rowIndex][c] = null;
						}
					}
					if(clipboardRows[rowIndex][colIndex] !== null){
						clipboardRows[rowIndex][colIndex] = (td.innerText);
					}
				});
			});
		} 

		if(!clipboardRows.length) return false;
	
		var fciVisibleIndex = self.state.visibleIndexMapByColumnIndex[self.state.cellSelection.focusColumnIndex];
		
		startCellSelection(self, self.state.cellSelection.focusRenderedIndex, self.state.cellSelection.focusColumnIndex);
		for(var r=0;r<clipboardRows.length;r++) {
			var rin = self.state.cellSelection.focusRenderedIndex + r;
			for(var c=0;c<clipboardRows[r].length;c++) {
				var mapping = self.state.visibleColumnMappingList[fciVisibleIndex + c];
				if(!mapping) continue;
				var cin = mapping.columnIndex;
				var value = clipboardRows[r][c];
				//console.log(r,'/',c,'/[',value,']')
				expandCellSelectionByPosition(self, rin, cin);
				if(value !== undefined && value !== null) {
					self._endCellEdit({
						"renderedIndex":rin,
						"columnIndex":cin,
						"value":clipboardRows[r][c]
					}, true);
				}
			}
		}
		self._refreshBoard(true);
		calculateCurrentCellSelectionBoundary(self);
		removeCellSelectionClasses(self);
		addCellSelectionClasses(self);
		triggerCellSelectionEvent(self);
		return true;
	}
	
//	self.state.visibleColumnCount
//	//[mapping, mapping, ...]
//	self.state.visibleColumnMappingList = [];
//	//{columnIndex : visibleIndex, ...}
//	self.state.visibleIndexMapByColumnIndex = {};
//	//{key : visibleIndex, ...}
//	self.state.visibleIndexMapByKey = {};
	function columnIndexAtLeftSide(self, columnIndex, offset) {
		var visibleAt = self.state.visibleIndexMapByColumnIndex[columnIndex];
		offset = offset || 1;
		return self.state.visibleColumnMappingList[Math.max(visibleAt-offset,0)].columnIndex;
	}
	function columnIndexAtRightSide(self, columnIndex, offset) {
		var visibleAt = self.state.visibleIndexMapByColumnIndex[columnIndex];
		offset = offset || 1;
		return self.state.visibleColumnMappingList[Math.min(visibleAt+offset,self.state.visibleColumnCount-1)].columnIndex;
	}

	function selectLogger(){return;
	//console.log($.makeArray(arguments).join(''));
	}
	
	
	
	AlopexGrid.prototype._startCellSelectEngine = function(start) {
		var eventNamespace = '.alopexgridCellSelectEngine';
		var downmoveNamespace = '.alopexgridCellSelectEngineMouseenter';
		this.$wrapper.off(eventNamespace);
		this.$wrapper.off(downmoveNamespace);
		this.$focusfixture.off(eventNamespace);
		$(document).off(eventNamespace+this.key);
		if(start) {
			//(pageup 33) (pagedown 34) (home 36) (end 35)
			//(left 37) (right 39) (up 38) (down 40) 
			//(tab 9) (enter 13) (esc 27) (F12 113)
//			this.$root.addClass('text-selection-disabled').attr('unselectable', 'on');
			// this.$focusfixture.on('blur'+eventNamespace,{self:this},function(e){
			// 	if(isCellSelectionAvailable(e.data.self)) {
			// 		clearCellSelection(e.data.self);
			// 		removeCellSelectionClasses(e.data.self);
			// 	}
			// });
			var keyTimerForFixture = null;
			this.$focusfixture.on('keydown'+eventNamespace, {self:this,keytimer:{id:null}},function(e){
//				TODO 헤더 클릭이라던가 외부 클릭, 헤더클릭 다이얼로그 등 외부 동작에 대해 focus를 훔치는 로직이 개입될 여지가 많음
				var self = e.data.self;
				if(keyTimerForFixture) return;
				var el = self.$focusfixture[0];
				var shift = e.shiftKey;
				var alt = e.altKey;
				var meta = e.metaKey;
				var ctrl = e.ctrlKey;
				var keyCode = e.keyCode;//console.log('$fixture ',e.type,keyCode,ctrl);
				var expectedChar = String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode-48 : e.keyCode);
				var renderedIndex = el.renderedIndex;
				var columnIndex = el.columnIndex;
				var isEditing = self._isEditingCell(renderedIndex, columnIndex);
				var pageUPDNOffset = 20;
				var direction = null;
//				selectLogger('fixturekeydown===',
//						e.type + '|' + this.value + '||' +
//						e.keyCode + '|||' +
//						(e.shiftKey?'shift':'') + '||' +
//						(e.altKey?'alt':'') + '|' +
//						(e.ctrlKey ? 'ctrl':'') + '|' +
//						String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode-48 : e.keyCode) + '||' +
//						(this.renderedIndex+'/'+this.columnIndex)
//				);
//				TODO scroll 대응, 키 입력시 영역확장축소로직 대응
				var forceEmptyFixture = false;
				if(keyCode === 13) {//enter
					//setInitialFocusOnCellByIndex는 마우스다운에 의해 최초 포커스를 설정하는 과정을 내포하고 있으므로
					//키보드에 의한 이동에 대응하는 함수가 필요하다.
					if(isEditing) {
						self._endCellEdit();
					}
					changeCellFocusByIncrement(self, (shift ? -1 : 1),0);
				} else if(keyCode === 9) {//tab
					if(isEditing) {
						self._endCellEdit();
					}
					changeCellFocusByIncrement(self, 0, (shift ? -1 : 1));
					e.preventDefault();
				} else if(keyCode === 113 && self.option.cellInlineEdit) {//F2
					if(!isEditing) {
						var rowspanInfo = getRowspanInfoForCell(self, renderedIndex, columnIndex);
						if(rowspanInfo) {
							renderedIndex = rowspanInfo["from"];
						}
						self._startCellEdit(renderedIndex, columnIndex);
						var $input = locateCellForPosition(self, renderedIndex, columnIndex).find('input,select,textarea');
						$input.focus();
						var val = $input.val();
						$input.val('').val(val);
					}
				} else if(keyCode === 39) {//right
					if(!isEditing) {
						if(shift) {
							//확장축소모드
							extendCellSelectionByDirection(self, false, true, false, false);
						} else {
							direction = "right";//console.log('right from',columnIndex)
							var toColumnIndex = columnIndexAtRightSide(self, columnIndex, 1);
							var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
							for(var i=columnIndex;i>=0;i--) {
								var mapping = _getMappingFromColumnIndex(self, i);
								if(!mapping) continue;
								if(!isMappingVisible(mapping)) continue;
								var upto = getColspanUpto(self, data, mapping);
								if(upto > i && columnIndex <= upto) { //오른쪽으로 이동하려는데 현재 colspan 셀에 자신이 포함된다면
									 //toColumnIndex = upto + 1;
									toColumnIndex = columnIndexAtRightSide(self, upto, 1);
									 break;
								}
							}//console.log('rrr',columnIndex,toColumnIndex)
							setInitialFocusOnCellByIndex(self, renderedIndex, toColumnIndex, direction);
						}
					}
				} else if(keyCode === 37) {//left
					if(!isEditing) {
						if(shift){
							//확장축소모드
							extendCellSelectionByDirection(self, true, false, false, false);
						} else {
							direction = "left";
							var toColumnIndex = columnIndexAtLeftSide(self, columnIndex, 1);
							var data = self._getRenderedDataFromRenderedIndex(renderedIndex);
							for(var i=columnIndex;i>=0;i--) {
								var mapping = _getMappingFromColumnIndex(self, i);
								if(!mapping) continue;
								if(!isMappingVisible(mapping)) continue;
								var upto = getColspanUpto(self, data, mapping);
								if(columnIndex <= upto) { //왼쪽으로 이동하려는데 현재 셀이 colspan되어 있다면
									//toColumnIndex = mapping.columnIndex-1;//toColumnIndex를 새로 계산한다.
									toColumnIndex = columnIndexAtLeftSide(self, mapping.columnIndex, 1);
									//TODO 이때 왼쪽셀의 마지막 인덱스가 mapping.columnIndex-1이 아닐 수가 있다.
									break;
								}
							}
							setInitialFocusOnCellByIndex(self, renderedIndex, toColumnIndex, direction);
						}
					}
				} else if(keyCode === 38 || keyCode === 33) {//up,pageup
					if(!isEditing) {
						//TODO rowspan 되어 있을 때엔 그만큼 점프해야 한다.
						var rowspanInfo = getRowspanInfoForCell(self, renderedIndex, columnIndex);
						if(rowspanInfo) {
							renderedIndex = rowspanInfo["from"];
						}
						var ofs = (keyCode===33?pageUPDNOffset:1);
						if(shift) {
							//확장축소모드 
							extendCellSelectionByDirection(self, false, false, ofs, false);
						} else {
							direction = "up";
							//var pinnedLen = self.state.pinnedDataIdList && self.state.pinnedDataIdList.length 
							//	? (self.state.pinnedDataIdList.length) : 0
							var toRendered = Math.max(renderedIndex-ofs,0);//-pinnedLen);//console.log('up)from',renderedIndex,'to',toRendered,rowspanInfo)
							setInitialFocusOnCellByIndex(self, toRendered, columnIndex, direction);
						}
					}
					e.preventDefault();
				} else if(keyCode === 40 || keyCode === 34) {//down,pagedown
					if(!isEditing) {
						//TODO rowspan 되어 있을 때엔 그만큼 점프해야 한다.
						var rowspanInfo = getRowspanInfoForCell(self, renderedIndex, columnIndex);
						if(rowspanInfo) {
							renderedIndex = rowspanInfo["to"]; //자기자신 행에 rowspan이 있는가
						}
						var ofs = (keyCode===34?pageUPDNOffset:1);
						if(shift) {
							//확장축소모드
							extendCellSelectionByDirection(self, false, false, false, ofs);
						} else {
							direction = "down";
							var toRendered = renderedIndex+ofs;//console.log('down)from',renderedIndex,'to',toRendered,rowspanInfo)
							setInitialFocusOnCellByIndex(self, toRendered, columnIndex, direction);
						}
					}
					e.preventDefault();
				} else if((ctrl||meta) && expectedChar.toUpperCase()==="C") {
					//selectLogger('copy detected(key combination)');
					var markup = convertSelectionToTableMarkup(self);
					if(!_valid(markup)) {
						markup = "";
					}
					forceEmptyFixture = true;
					if(window.clipboardData && window.clipboardData.setData) {
						window.clipboardData.setData("text",String(markup));
						//selectLogger('support window.clipboardData setData(IE). markup copied ('+markup.length+')');
						//selectLogger('[',markup,']')
					} else {
						//selectLogger('do nothing.')
					}
				} else if((ctrl||meta) && expectedChar.toUpperCase()==="V") {
					//selectLogger("paste detected(key combination). do nothing.",document.activeElement);
					if(e.data.keytimer.id) {
						clearTimeout(e.data.keytimer.id);
					}
					return;
				}

				triggerCellSelectionEvent(self);

				if(!self.state.cellSelection) {
					//selection에 걸리지 않았다면 종료.
					return;
				}

				if(keyCode === 33 || keyCode === 34 || keyCode === 38 || keyCode === 40) {
					e.preventDefault();
				}
				
				var fri = self.state.cellSelection.focusRenderedIndex;
				var fci = self.state.cellSelection.focusColumnIndex;//selectLogger(fri,fci)
				var $cell = locateCellForPosition(self, fri, fci);//selectLogger($cell,renderedIndex,fri,columnIndex,fci)

				//사용자가 단건입력을 한 행위에 대해 문자열이 생성되어 있다면 처리.
				if(e.data.keytimer.id) {
					clearTimeout(e.data.keytimer.id);
				}
				//selectLogger('fixture text test sent to setTimeout.')
				e.data.keytimer.id = setTimeout(function(){
					//TODO paste와 이 부분이 시점문제를 일으키지 않도록 해야 함.
					var val = forceEmptyFixture ? '' : $.trim(el.innerText);
					//selectLogger('fixture got value of length '+val.length);
					el.innerHTML = "";
					var mapping = _getMappingFromColumnIndex(self, fci);
					if(val && !self._isEditingCell(fri, fci) && mapping && mapping.editable && self.option.cellInlineEdit) {
						self._startCellEdit(fri,fci);
						$cell = locateCellForPosition(self, fri, fci);
						clearSelection();
						if($cell && $cell.length) {
							var $input = $cell.find('input,select,textarea');
							if(!$input.length) {
								//Error
							} else {
								$input[0].focus();
								$input.val(val).change();
							}
							keyTimerForFixture = null;
						} else {
							//error
						}
						return;
					}

					setTimeout(function(){
						keyTimerForFixture = null;
					},1);
				},50);
			});
			this.$focusfixture.on('copy'+eventNamespace, {self:this},function(e){
				//selectLogger('support copy DOM event');
				var self = e.data.self;
				var markup = convertSelectionToTableMarkup(self);
				if(!_valid(markup)) {
					markup = "";
				}
				markup = String(markup);
				if(e.originalEvent.clipboardData) {
					e.preventDefault();
					var contenttype = 'text/html';
					if(typeof markup === "string" && markup.indexOf("<table") < 0) {
						contenttype = 'text/plain';
					}
					e.originalEvent.clipboardData.setData(contenttype, markup);
					//selectLogger('support event.clipboardData. markup copied to event.clipboardData('+markup.length+')');
					if(!markup.length || markup.length < 100) {
						//selectLogger(markup)
					}
				}
				else if(window.clipboardData && window.clipboardData.setData) {
					window.clipboardData.setData("text",markup);
					//selectLogger('support window.clipboardData setData(IE). markup copied to window.clipboardData('+markup.length+')');
					//selectLogger('[',markup,']')
					return false;
				}
			});


			this.$focusfixture.on('paste'+eventNamespace, {self:this},function(e){
				//selectLogger('paste dom event detected')
				var self = e.data.self;
				var markup = "";
				if(e.originalEvent.clipboardData) {
					//selectLogger('support event.clipboardData');
					markup = e.originalEvent.clipboardData.getData("text/html");
					if(!pasteToCurrentSelectionFocus(self, markup)) {
						//selectLogger('paste failed for markup ('+markup+')');
						markup = e.originalEvent.clipboardData.getData("text/plain");
						//selectLogger('try plain text ('+markup+')');
						if(!markup || !markup.length) return;
						var fri = self.state.cellSelection.focusRenderedIndex;
						var fci = self.state.cellSelection.focusColumnIndex;
						self._endCellEdit({"value":markup,"renderedIndex":fri,"columnIndex":fci});
						//selectLogger('cell edited. (len'+markup.length+')');
//						if(!self._isEditingCell(fri, fci)) {
//							self._startCellEdit(fri,fci);
//							var $cell = locateCellForPosition(self, fri, fci);
//							clearSelection();
//							var $input = $cell.find('input,select,textarea');
//							$input[0].focus();
//							$input.val(markup).change();
//							selectLogger('instead, cell edit started. (len'+markup.length+')');
//						}
						e.preventDefault();
						return;
					}
					self.$focusfixture.empty();
					e.preventDefault();
					//selectLogger('paste by event.clipboardData.getData("text/html"). default prevented.');
					//setTimeout(function(){self.$focusfixture.empty();},10);
				} else {
					//selectLogger('doesnt support event.clipboardData');
					setTimeout(function(){
						markup = self.$focusfixture.html();
						self.$focusfixture.empty();
						if(!pasteToCurrentSelectionFocus(self, markup)){
							//selectLogger('paste failed for markup ('+markup+')');
							if(!markup || !markup.length) return;
							var fri = self.state.cellSelection.focusRenderedIndex;
							var fci = self.state.cellSelection.focusColumnIndex;
							self._endCellEdit({"value":markup,"renderedIndex":fri,"columnIndex":fci});
							//selectLogger('cell edited. (len'+markup.length+')');
//							if(!self._isEditingCell(fri, fci)) {
//								self._startCellEdit(fri,fci);
//								var $cell = locateCellForPosition(self, fri, fci);
//								clearSelection();
//								var $input = $cell.find('input,select,textarea');
//								$input[0].focus();
//								$input.val(markup).change();
//								selectLogger('instead, cell edit started. (len'+markup.length+')');
//							}
							return;
						}
						//selectLogger('paste from fixture html('+markup.length+')')
					},5);
				}
			});
//			this.$root.on('mousedown'+eventNamespace, {self:this}, function(e){
//				var self = e.data.self;
//				if(e.which!==1) return;
//				//TODO 선택이 반드시 해제되어야 하는 조건(또는 해제되지 않을 땐 포커스를 $focusfixture로 어떻게 복원하는가)
			//DOM에 없는 엘리먼트를 테스트하게 되면 무조건 clearSelection을 타게 된다.
//				if(!$(e.target).closest('.wrapper').length) {
//					clearCellSelection(self);
//					removeCellSelectionClasses(self);
//				}
//			});
			var timerObject = {id:null};
			this.$wrapper.on('mousedown'+eventNamespace, '.bodycell', {self:this}, function(e){
				var self = e.data.self;
				if(e.which!==1 && e.which!==3) return;
				var $cell = $(this);
				if($cell.hasClass('editingcell') || (e.target.className||"").indexOf('alopexgrid-handle')>=0) {
					return;
				}
				//이 값은 현재 렌더링 된 기준에서의 renderedIndex일 뿐
				//실제 셀의 rowspan이 시작된 값을 의미하지 않는다. 따라서 getRowspanInfoForCell로 한번 더 조사한다.
				var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
				var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
//				var rowspanInfo = getRowspanInfoForCell(self, renderedIndex, columnIndex);
//				if(rowspanInfo) {
//					renderedIndex = rowspanInfo["from"];
//				}
				self._endCellEdit();
				//self._focusEditCell(renderedIndex, columnIndex);

				setInitialFocusOnCellByIndex(self, renderedIndex, columnIndex);
				
				var width = self.$wrapper.width();
				var height = self.$wrapper.height();
				var offset = self.$wrapper.offset();
				if(timerObject.id) {
					clearInterval(timerObject.id);
					timerObject.id = null;
				}

				triggerCellSelectionEvent(self)

				self.$wrapper.off(downmoveNamespace);
				$(document).off(downmoveNamespace+self.key);
				//모서리 이동에 따른 스크롤처리

				$(document).on('mouseup'+downmoveNamespace+self.key+self.eventns, {self:self, timer:timerObject}, function(e){
					var self = e.data.self;
					if(e.data.timer.id) {
						clearInterval(e.data.timer.id);
						e.data.timer.id = null;
					}
					e.data.self.$wrapper.off(downmoveNamespace);
					$(document).off(downmoveNamespace+e.data.self.key);
					setTimeout(function(){
						setFocusFixture(self,null,null);
						//selectLogger('restore focus after mouseup',document.activeElement)
					},0);
				});
				
				if(false){
					var fixedRowHeight = 0;
					var fixedRowCount = self.option.rowFixCount;
					if(!fixedRowCount) {
						var pinned = self.state.pinnedDataIdList;
						if(pinned && pinned.length) {
							for(var i=0,l=pinned.length;i<l;i++) {
								var dataid = pinned[i];
								var dataIndex = self.state.dataIdToIndexMap[dataid];
								if(!(dataIndex>=0)) continue;
								var data = self.state.data[dataIndex];
								fixedRowHeight += self.state.rowHeightMapByDataId[dataid] || self.state.rowHeight;
							}
						}
					} else {
						for(var i=0;i<fixedRowCount;i++) {
							var dataIndex = self.state.renderTargetDataIndexList[i];
							if(!(dataIndex>=0)) continue;
							var data = self.state.data[dataIndex];
							if(!data) continue;
							fixedRowHeight += self.state.rowHeightMapByDataId[data._index.id] || self.state.rowHeight;
						}
					}
					var edata = {self:self,wrapperOffset:offset,fixedRowHeight:fixedRowHeight,timer:null};

					function selectionMouseMoveHandler(e){
						var self = e.data.self;
						
						var $cell = $(e.target).closest('.bodycell');
						var intervalDelay = 80;
						var intervalWorker = [];
						
						var targetIsCell = !!$cell.length;
						var cellColumnIndex = $cell.attr('data-alopexgrid-columnindex');
						var cellRenderedIndex = $cell.attr('data-alopexgrid-renderedindex');
						
						var fromColumnIndex = self.state.cellSelection.focusColumnIndex;
						var fromRenderedIndex = self.state.cellSelection.focusRenderedIndex;
						var toColumnIndex = fromColumnIndex;
						var toRenderedIndex = fromRenderedIndex;
						
						var edgeWidth = 25;
						
						var wrapperOffset = e.data.wrapperOffset;
						var wrapperWidth = self.state.wrapperWidth;
						var wrapperHeight = self.state.wrapperHeight;
						var wrapperLeft = wrapperOffset.left;
						var wrapperTop = wrapperOffset.top;
						
						var headerHeight = self.state.headerHeight;
						var bodyTop = wrapperTop + headerHeight;
						
						var fixedRowHeight = e.data.fixedRowHeight;
						var fixedColumnWidth = self.state.fixedColumnWidth || 0;
						
						var scrollableTop = bodyTop + fixedRowHeight;
						var scrollableLeft = wrapperLeft + fixedColumnWidth;
						
						var startedFromFixedRow = isCellSelectionStartFromFixedRow(self);
						var startedFromFixedColumn = isCellSelectionStartFromFixedColumn(self);//셀선택이 고정영역에서부터 시작됨.
						
						var targetInFixedRow = isRowInFixedRow(self, cellRenderedIndex);
						var targetInFixedColumn = isColumnInFixedColumn(self, cellColumnIndex);
						
						var selectionAcrossFixedColumn = doesCellSelectionCrossFixedColumn(self);
						var selectionAcrossFixedRow = doesCellSelectionCrossFixedRow(self);
						
						var scrollAtTop = isScrollAtTop(self);
						var scrollAtColumnStart = isScrollAtColumnStart(self);
						
						var pointerX = e.pageX;
						var pointerY = e.pageY;
						
						var leftEdgeX = scrollableLeft + edgeWidth;
						var rightEdgeX = wrapperLeft + wrapperWidth - edgeWidth;
						var topEdgeY = scrollableTop + edgeWidth;
						var bottomEdgeY = wrapperTop + wrapperHeight - edgeWidth;
						
						var atLeftEdge = pointerX < leftEdgeX;
						var atRightEdge = pointerX > rightEdgeX;
						var atTopEdge = pointerY < topEdgeY;
						var atBottomEdge = pointerY > bottomEdgeY;
						
						var leftDistPx = atLeftEdge ? leftEdgeX - pointerX : 0;
						var rightDistPx = atRightEdge ? pointerX - rightEdgeX : 0;
						var topDistPx = atTopEdge ? topEdgeY - pointerY : 0;
						var bottomDistPx = atBottomEdge ? pointerY - bottomEdgeY : 0;
						
						if(e.data.timer) {
							clearInterval(e.data.timer);
							e.data.timer = null;
						}
						
						//스크롤을 할 것인가
						//_scrollLeftMostEvent(맨왼쪽)
						//_scrollTopEvent(맨위로)
						
						//_scrollLeftEvent(몇칸씩)
						//_scrollRightEvent(몇칸씩)
						//_scrollUpEvent(몇칸씩)
						//_scrollDownEvent(몇칸씩)
						//선택을 확장(변경)할 것인가
						//setSelectionFromTo(self, fromRenderedIndex, fromColumnIndex, renderedIndex, columnIndex);
						
						intervalWorker.push(function(){
							var scrollit = false;
							if(startedFromFixedColumn || startedFromFixedRow) {
								
							} else {
								if(targetIsCell) {
									if(targetInFixedColumn) {
										var renderedFixedCount = self.state.refreshbodycell.renderedFixedColumnMappingList.length;
										toColumnIndex = self.state.refreshbodycell.renderedColumnMappingList[renderedFixedCount].columnIndex;
									} else if(atRightEdge) {
										var lastRendered = self.state.refreshbodycell.renderedColumnMappingList.length-1;
										toColumnIndex = self.state.refreshbodycell.renderedColumnMappingList[lastRendered].columnIndex;
									} else {
										toColumnIndex = cellColumnIndex;
									}
									if(targetInFixedRow || atTopEdge) {
										var renderedAfterFixed = self.state.refreshbodycell.renderedDataIndexList[self.option.rowFixCount];
										toRenderedIndex = self.state.data[renderedAfterFixed]._index.rendered;
									} else if(atBottomEdge) {
										var lastRendered = self.state.refreshbodycell.renderedDataIndexList.length-1;
										var lastData = self.state.refreshbodycell.renderedDataIndexList[lastRendered];
										toRenderedIndex = self.state.data[lastData]._index.rendered;
									} else {
										toRenderedIndex = cellRenderedIndex;
									}
								}
								if(atLeftEdge) {
									scrollit = true;
									self._scrollLeftEvent(1, true);
								} else if(atRightEdge) {
									scrollit = true;
									self._scrollRightEvent(1, true);
								} else if(atTopEdge) {
									scrollit = true;
									self._scrollUpEvent(1, true);
								} else if(atBottomEdge) {
									scrollit = true;
									self._scrollDownEvent(1, true);
								}
							}
							
							if(scrollit) {
								self._refreshBoard();
							}
							if(fromRenderedIndex !== toRenderedIndex || fromColumnIndex !== toColumnIndex) {
								setSelectionFromTo(self, fromRenderedIndex, fromColumnIndex, toRenderedIndex, toColumnIndex);
							}
						});
						
						
						if(intervalWorker.length) {
							function intervalWorkerRunner() {
								for(var i=0,l=intervalWorker.length;i<l;i++) {
									intervalWorker[i]();
								}
							}
							intervalWorkerRunner();
							e.data.timer = setInterval(intervalWorkerRunner, intervalDelay);
						}
					}
					
					$(document).on('mousemove'+downmoveNamespace+self.key+self.eventns,edata,selectionMouseMoveHandler);
					$(document).on('mouseup'+downmoveNamespace+self.key+self.eventns,edata,function(e){
						if(e.data.timer){
							clearInterval(e.data.timer);
							e.data.timer = null;
						}
					});
					edata = null;
					return;
				}
				
				function calculateDiffWeight(a,b,w) {
					return parseInt(Math.max(Math.min(500,Math.abs(a-b)/(5*(w||1))),1));
				}
				$(document).on('mousemove'+downmoveNamespace+self.key+self.eventns,
						{self:self,height:height,width:width,offset:offset,timer:timerObject},function(em){
					var self = em.data.self;
					var wrapperWidth = em.data.width;//wrapper width
					var wrapperHeight = em.data.height;//wrapper height
					var wrapperOffset = em.data.offset;//wrapper offset
					var wrapperLeft = wrapperOffset.left;
					var wrapperTop = wrapperOffset.top;
					var wrapperRight = wrapperLeft + wrapperWidth;
					var wrapperBottom = wrapperTop + wrapperHeight;
					var pointerX = em.pageX;
					var pointerY = em.pageY;
					var worker = null;
					var timer = em.data.timer;
					var edgeWidth = 25;//걸터있을 수 있는 너비
					var headerHeight = self.state.headerHeight || 0;
					var fixedRowCount = self.option.rowFixCount;
					var fixedColumnMapping = self.state.fixedColumnMapping;
					
					var fixedRowHeight = 0;
					var fixedColumnWidth = self.state.fixedColumnWidth || 0;
					
					if(!fixedRowCount) {
						var pinned = self.state.pinnedDataIdList;
						if(pinned && pinned.length) {
							for(var i=0,l=pinned.length;i<l;i++) {
								var dataid = pinned[i];
								var dataIndex = self.state.dataIdToIndexMap[dataid];
								if(!(dataIndex>=0)) continue;
								var data = self.state.data[dataIndex];
								fixedRowHeight += self.state.rowHeightMapByDataId[dataid] || self.state.rowHeight;
							}
						}
					} else {
						for(var i=0;i<fixedRowCount;i++) {
							var dataIndex = self.state.renderTargetDataIndexList[i];
							if(!(dataIndex>=0)) continue;
							var data = self.state.data[dataIndex];
							if(!data) continue;
							fixedRowHeight += self.state.rowHeightMapByDataId[data._index.id] || self.state.rowHeight;
						}
					}
					
					var bodyTop = wrapperTop + headerHeight;
					
					var scrollableTop = bodyTop + fixedRowHeight;
					var scrollableLeft = wrapperLeft + fixedColumnWidth;
					
					var workerDelay = 80;
	
					var startedFromFixedRow = isCellSelectionStartFromFixedRow(self);
					var startedFromFixedColumn = isCellSelectionStartFromFixedColumn(self);//셀선택이 고정영역에서부터 시작됨.
					
					var targetInFixedRow = isRowInFixedRow(self, renderedIndex);
					var targetInFixedColumn = isColumnInFixedColumn(self, columnIndex);
					
					var selectionAcrossFixedColumn = doesCellSelectionCrossFixedColumn(self);
					var selectionAcrossFixedRow = doesCellSelectionCrossFixedRow(self);
					
					var scrollAtTop = isScrollAtTop(self);
					var scrollAtColumnStart = isScrollAtColumnStart(self);
					
					var noVertical = false;
					var noHorizontal = false;
					
					if(timer.id) {
						clearInterval(timer.id);
						timer.id = null;
					}
					
					if(startedFromFixedRow && pointerY < scrollableTop) {
						noVertical = true;
					}
					if(startedFromFixedColumn && pointerX < scrollableLeft) {
						noHorizontal = true;
					}
					
					if(pointerX < wrapperOffset.left + fixedColumnWidth + edgeWidth && !noHorizontal) {
						worker = function(){
							var w = calculateDiffWeight(pointerX, wrapperOffset.left + fixedColumnWidth + edgeWidth,8);
							self._scrollLeftEvent(1 * w);
						};
						workerDelay = 160;
					} else if(pointerX > (wrapperOffset.left + wrapperWidth - edgeWidth) && !noHorizontal) {
						worker = function(){
							var w = calculateDiffWeight(pointerX, (wrapperOffset.left + wrapperWidth - edgeWidth),8);
							self._scrollRightEvent(1 * w);
						};
						workerDelay = 160;
					//} else if(pageY > (offset.top + headerHeight) && pageY < (offset.top+paddingpx+headerHeight)) {
					} else if(pointerY < (wrapperOffset.top + edgeWidth + headerHeight + fixedRowHeight) && !noVertical) {
						worker = function(){
							var w = calculateDiffWeight(pointerY, (wrapperOffset.top + edgeWidth + headerHeight + fixedRowHeight),1.5);
							self._scrollUpEvent(1 * w);
						};
					} else if(pointerY > (wrapperOffset.top + wrapperHeight - edgeWidth) && !noVertical) {
						worker = function(){
							var w = calculateDiffWeight(pointerY, (wrapperOffset.top + wrapperHeight - edgeWidth),1.5);
							self._scrollDownEvent(1 * w);
						};
					}
					
					if(!worker) {
						worker = function(){ 
							if(timer.id) {
								clearInterval(timer.id);
								timer.id = null;
							}
						};
					}
					
					em.preventDefault();
					worker();
					timer.id = setInterval(worker,workerDelay);
				});
				//셀위에 올라가게 되었을 때의 셀 선택 확장처리
				self.$wrapper.on('mouseenter'+downmoveNamespace, '.bodycell', {self:self}, function(e2){
					var self = e2.data.self;
					var fromColumnIndex = self.state.cellSelection.focusColumnIndex;
					var fromRenderedIndex = self.state.cellSelection.focusRenderedIndex;
					var $cell = $(this);
					var renderedIndex = parseInt($cell.attr('data-alopexgrid-renderedindex'));
					var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
					var rowspanInfo = getRowspanInfoForCell(self, renderedIndex, columnIndex);
					
					var startedFromFixedRow = isCellSelectionStartFromFixedRow(self);
					var startedFromFixedColumn = isCellSelectionStartFromFixedColumn(self);//셀선택이 고정영역에서부터 시작됨.
					
					var targetInFixedRow = isRowInFixedRow(self, renderedIndex);
					var targetInFixedColumn = isColumnInFixedColumn(self, columnIndex);
					
					var selectionAcrossFixedColumn = doesCellSelectionCrossFixedColumn(self);
					var selectionAcrossFixedRow = doesCellSelectionCrossFixedRow(self);
					
					var scrollAtTop = isScrollAtTop(self);
					var scrollAtColumnStart = isScrollAtColumnStart(self);
					
					var scrollChanged = false;
					
					clearSelection();
					
					if(startedFromFixedRow && !targetInFixedRow && !selectionAcrossFixedRow) {
						renderedIndex = self.option.rowFixCount;
						self._scrollTopEvent(true);
						scrollChanged = true;
					}
					if(startedFromFixedColumn && !targetInFixedColumn && !selectionAcrossFixedColumn) {
						self._scrollLeftEvent(undefined, true);
						columnIndex = 
							self.state.visibleColumnMappingList[self.state.visibleIndexMapByColumnIndex[self.state.fixupto]+1].columnIndex || 
								self.state.maxColumnIndex;
						scrollChanged = true;
					}
					
					if(!startedFromFixedRow && targetInFixedRow && !selectionAcrossFixedRow && !scrollAtTop) {
						renderedIndex = self.state.data[self.state.refreshbodycell.renderedDataIndexList[self.option.rowFixCount]].rendered;
					}
					if(!startedFromFixedColumn && targetInFixedColumn && !selectionAcrossFixedColumn) {
						if(!scrollAtColumnStart) {
							columnIndex = self.state.refreshbodycell.renderedColumnMappingList[self.state.refreshbodycell.renderedFixedColumnMappingList.length].columnIndex;
//							self._scrollLeftEvent(undefined, true);
//							scrollChanged = true;
						} else {
							
						}
					}
					
					if(scrollChanged) {
						self._refreshBoard();
					}
					setSelectionFromTo(self, fromRenderedIndex, fromColumnIndex, renderedIndex, columnIndex);
				});
			});

//			$(document).on('mouseup'+eventNamespace+this.key, {self:this}, function(e){selectLogger('mousemoveBBB')
//			e.data.self.$wrapper.off(downmoveNamespace);
//			$(document).off(downmoveNamespace+e.data.self.key);
//			if(timerObject.id) {
//			clearInterval(timerObject.id);
//			timerObject.id = null;
//			}
//			});
		} else {
			//this.$root.removeClass('text-selection-disabled').removeAttr('unselectable');
		}
	};
	
	function clearSelectedHeader(self) {
		if(!self.state.headerSelection) return;
		delete self.state.headerSelection.from;
		delete self.state.headerSelection.to;
		self.$wrapper.find('.headercell').removeClass('header-selected');
	}
	AlopexGrid.prototype._enableHeaderSelect = function(enable) {
		var self = this;
		var eventNamespace = ".alopexgridHeaderSelectEngine";
		var outsideEventNamespace = eventNamespace + self.key + self.key;
		var insideEventNamespace = eventNamespace + self.key;
		self.$wrapper.off(eventNamespace).off(insideEventNamespace);
		var $document = $(document);
		$document.off(insideEventNamespace).off(outsideEventNamespace);
		
		if(enable === true) {
			self.state.headerSelection = self.state.headerSelection || {timer:{id:null}};
			self.$wrapper.on('mousedown'+eventNamespace, '.headercell',{self:self,info:self.state.headerSelection}, function(e){
				var self = e.data.self;
				self.$wrapper.off(insideEventNamespace);
				$document.off(insideEventNamespace);
				if(e.which!==1) return;
				if($(e.target).closest('.resizing-handle').length) return;
				var $cell = $(this);
				var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
				self.$wrapper.find('.headercell').removeClass('header-selected');
				e.data.info["from"] = columnIndex;
				
				self.$wrapper.on('mouseenter'+insideEventNamespace, '.headercell', {self:self,info:e.data.info}, function(e){
					var self = e.data.self;
					var $cell = $(this);
					var columnIndex = parseInt($cell.attr('data-alopexgrid-columnindex'));
					e.data.info["to"] = columnIndex;
					var from = Math.min(e.data.info["from"],e.data.info["to"]);
					var to = Math.max(e.data.info["from"],e.data.info["to"]);
					self.$wrapper.find('.headercell').removeClass('header-selected').filter(function(){
						var attr = this.getAttribute('data-alopexgrid-columnindex');
						return (attr && attr >= from && attr <= to);
					}).addClass('header-selected');
				});
				var offset = self.$wrapper.offset();
				var width = self.$wrapper.outerWidth();
				$document.on('mousemove'+insideEventNamespace+self.eventns, {self:self,offset:offset,width:width}, function(e){
					var self = e.data.self;
					var offset = e.data.offset;
					var width = e.data.width;
					var timer = self.state.headerSelection.timer;
					e.preventDefault();
					if(timer.id) {
						clearInterval(timer.id);
						timer.id = null;
					}
					if( (e.pageX - offset.left) < 50 ) {
						timer.id = setInterval(function(){
							self._scrollLeftEvent(1);
						},80);
					} else if( (offset.left + width - e.pageX) < 50 ) {
						timer.id = setInterval(function(){
							self._scrollRightEvent(1);
						},80);
					}
				});
				$document.on('mouseup'+insideEventNamespace+self.eventns, {self:self,info:e.data.info}, function(e){
					var self = e.data.self;
					//console.log('selected from ',e.data.info.from,' to ',e.data.info.to);
					self.$wrapper.off(insideEventNamespace);
					$document.off(insideEventNamespace);
					var timer = self.state.headerSelection.timer;
					if(timer.id) {
						clearInterval(timer.id);
						timer.id = null;
					}
				});
			});
			$document.on('mousedown'+outsideEventNamespace+self.eventns, {self:self, info:self.state.headerSelection},function(e){
				var $target = $(e.target);
				if($target.closest('.alopexgrid').attr('data-alopexgrid') !== e.data.self.key) {
					clearSelectedHeader(e.data.self);
				} else if($target.closest('.bodycell').length) {
					clearSelectedHeader(e.data.self);
				}
			});
		} else {
			
		}
	}

	AlopexGrid.prototype.sortingInfo = function() {
		var self = this;
		var info = {"sortingKey":null};
		info["sortingColumn"] = _valid(self.state.sortingColumn) ? Number(self.state.sortingColumn) : null;
		for(var i=0,l=self.option.columnMapping.length;i<l;i++) {
			var mapping = self.option.columnMapping[i];
			if(_valid(mapping.columnIndex) && Number(mapping.columnIndex) === Number(self.state.sortingColumn)) {
				info["sortingKey"] = mapping.key;
				break;
			}
		}
		info["sortingDirection"] = self.state.sortingDirection || null;
		info["sorted"] = _valid(self.state.sortingColumn);
		return info;
	};
	AlopexGrid.prototype.pageInfo = function() {
		return this.state.pagingInfo;
	};
	AlopexGrid.prototype.pageSet = function(page) {
		var self = this;
		var pageinfo = self.pageInfo();
		var prevcurr = pageinfo["current"];
		if(page==="first") page = 1;
		else if(page==="prev") page = Math.max(prevcurr - 1,1);
		else if(page==="next") page = Math.min(prevcurr + 1, pageinfo["total"]);
		else if(page==="last") page = pageinfo["total"];
		if(!page) page = 1;	
		page = Math.min(Math.max(1,Number(page)),pageinfo["total"]);

		if(self._triggerGridEvent('pageSet',{"page":page,"paging":pageinfo})===false) {
			return false;
		}

		self.option.paging.current = page;

		self._rowSelectAllUncheck();
		self._scrollerReset();
		self.calcAndRedraw();
	};
	AlopexGrid.prototype._showProgress = function(callback, delay, async) {
		var self = this;
		if (delay === null || delay === undefined) {
			delay = self.option.progressDelay;
		}
		var $div = self.$root.children('div.progress.alopexgrid-progress');
		if (!$div.length) {
			$div = $('<div>');
		}
		var $background = self.$root.children('div.modal.alopexgrid-progress-modal');
		if (!$background.length) {
			$background = $('<div>');
		}
		var text = self.option.progressText;
		if(!_valid(text)) {
			text = 'loading...';
		}
		$div.addClass('progress alopexgrid-progress');
		$div.css(self.option.progressCss || {}).html(text);
		$background.addClass('modal alopexgrid-progress-modal').css(self.option.modalCss || {});
		$background.appendTo(self.$root);
		$div.appendTo(self.$root);
		self.state.progressStack++;

		var setfunc = function() {
			function reduceProgress() {
				self.state.progressStack--;
				if (self.state.progressStack <= 0) {
					self.state.progressStack = 0;
					self.$root.children('.progress').remove();
					$div.remove();
					$background.remove();
				}
			}
			if (async) {
				callback(reduceProgress);
				return;
			}
			callback();
			reduceProgress();
		};
		if (delay === null || delay === undefined) {
			setfunc();
		} else {
			setTimeout(setfunc, delay);
		}
	};

	AlopexGrid.prototype.suppressRender = function(jobFunc) {
		var self = this;
		if($.type(jobFunc)==="boolean") {
			self.state.renderingSuppressed = jobFunc;
		} else if($.isFunction(jobFunc)){
			self.state.renderingSuppressed = true;
			jobFunc();
			self.state.renderingSuppressed = false;	
		}
	};

	function _instance(elem) {
		//return elem[AlopexGrid.KEY_NAME];
		return $(elem).data(AlopexGrid.KEY_NAME);
	}
	$.fn._alopexGridInstance = function(){
		return _instance(this);
	};
	$.fn.removeAlopexGrid = function(){
		return this.each(function(){
			var self = _instance(this);
			if(self) {
				$(window).off(self.eventns);
				$(document).off(self.eventns);
				$(document.body).off(self.eventns);
				//그리드 외부로 붙은 요소들도 제거해야 한다.
				$('.alopexgrid-refer-'+self.key).remove();
				self.$root.remove();
				delete AlopexGrid.instances[self.key];
				$(this).removeData(AlopexGrid.KEY_NAME);
			}
		});
	}
	$.fn.alopexGrid = function(option, param, param2) {
		if (!this.length) {
			return this;
		}
		if (typeof option == "string") {
			if (!AlopexGrid.prototype[option]) {
				throw new Error("[AlopexGrid] AlopexGrid has no method [" + option + "]");
			}
			var ret = undefined;
			var jqobj = undefined;
			var args = $.makeArray(arguments).slice(1);
			jqobj = this.each(function(idx, elem) {
				var instance = _instance(this);
				if (!instance) {
					instance = new AlopexGrid(this);
				}
				//instance._showProgress(function() {
				//ret = instance[option](param, param2);
				ret = instance[option].apply(instance, args);
				//});
				if (ret !== undefined) {
					return false;
				}
			});
			if (ret !== undefined) {
				return ret; //getter
			}
			return jqobj;//jquery method chain
		} else {
			return this.each(function(idx, elem) {
				var instance = _instance(this);
				if (!instance) {
					instance = new AlopexGrid(this, option);
				}
				instance.updateOption(option);
			});
		}
	};
	function commonoption(option) {
		if ($.isPlainObject(option)) {
			AlopexGrid.commonOption = AlopexGrid.commonOption || {};
			AlopexGrid.commonOption = $.extend({}, AlopexGrid.commonOption, option);
		}
	}
	if ($.alopex) {
		$.alopex.alopexGrid = commonoption;
		if ($.isFunction($.alopex.registerSetup)) {
			$.alopex.registerSetup('grid', commonoption);
		}
	}
	$.alopexGrid = commonoption;
})(jQuery);