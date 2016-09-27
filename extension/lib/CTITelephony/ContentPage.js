/*
*	Telephone Number Detection
*	Source © CTI Telephony
*	CTITelephony@GMail.com
*/

var enabled = false;
var initPage = document.URL;
var invalidNumbers = [];
var validNumbers = [];
var parsing = false;
var protocol = "";
var minTelVal = 0;
var maxTelVal = 0;
var r_enabled = false;
var r_types = {"tel":false,"dial":false,"callto":false,"ucdial":false,"sip":false};

var handsetImage = "iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3gcWEAU3+l7xlgAAApJJREFUOMuVkk1IVGEUht/z3TuO482s1FTIJH8wQYXsnzLLhZUWEtYuClqYiwosSyhJIZJiNkUZLoxaFEJZbQzKRQSGVIgI5cLf0HGc1HG8c0fHmTv3+75WQkSL67s85zzP5j0Emyls/upIS3LWqYqyvByJdX1p3GkAgGpXkODAoZVIrAVkuVxOtRDAVQBgduDi272aynB2ak7f+MsXcC2GVmoP3u8/Z1sQryBvIbh0hHNOBAHfgqGZMV6d0/Q90ZYgHI0VmKaZKQWHFAKQHN553RGzuMOWwAibwUg0NigF51IKSCG54NbPqXv7A7YEUdPs4UKcgeSDUnBAckOC3mCtyavv7kyt7ZJpde9erc6YXfiou6/EwVAmBQ9JwdvXJDj18Ft6JBJt9etGCknRJkG9qztbj2SEli9N+fzllmVNMKY88OfXxJIea+CWAP19WNbywZmXtSWNS8w8u1BoHWh670hK1Go8s4GO6Tk9zBTluKvi+uDp3FKuOlcwujgNZRWudn9OSdmwrsHjm2tI0pxeV9GJiYzUTdXzi4Z7zPNbYQpr1HMbe87vLuVR1YPZ8DxmlgJQ993oUjIzNm9fiZgdfQNDJXoo7FjUjbaCnK3Dk775PcPj0/FE1CSFeOFaH7LCIoRAQMWCCKK56AnU9NTkyoAedA8MjeZbXIIYw9ikN3t8aiZbAn7G1DsgeqR31nFthwuRcALai19ixPqB7ORtUFju4Ysj45NVFudEAAgSIAJB6gqjeiI8D76+bAJAbK8Fv+qDh4+gKqsSxz5WgLSTrcWQ0k1E5SBSiRgnxvpB7Kbx9tqnfxtR7hKkxkCOOHBDgwqJIIBWQD4FKbtA5JVCdEONm/hfpfyWBK5wQHBAGPgDf9c6qAYOxxMAAAAASUVORK5CYII="

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (typeof request !== "undefined")
		alterDOM(request);
});

chrome.extension.sendRequest({ pageLoad: true }, function(response) {
    alterDOM(response);
});

loadConfig();

document.addEventListener('DOMNodeInserted', handleDomChange, true);
document.addEventListener('DOMCharacterDataModified', handleDomChange, true);

chrome.storage.onChanged.addListener(function(changes) {
	if (changes.protocol != undefined) protocol = changes.protocol.newValue;
	if (changes.minTelVal != undefined) minTelVal = parseInt(changes.minTelVal.newValue);
	if (changes.maxTelVal != undefined) maxTelVal = parseInt(changes.maxTelVal.newValue);
	
	chrome.storage.sync.get("telEnabled", function (obj) {
		var shouldRescan = (changes.telEnabled != undefined) ? obj.telEnabled : true;
		if (shouldRescan) {
			clearDOM();
			parseDOM(document.body);
		}
	});
});

function loadConfig() {

	chrome.storage.sync.get("minTelVal", function (obj) {
		minTelVal = (obj.minTelVal != undefined) ? parseInt(obj.minTelVal) : 8;
	});
	
	chrome.storage.sync.get("maxTelVal", function (obj) {
		maxTelVal = (obj.maxTelVal != undefined) ? parseInt(obj.maxTelVal) : 20;
	});
	
	chrome.storage.sync.get("replaceList", function (obj) {
		replaceList = (obj.replaceList != undefined) ? JSON.parse(obj.replaceList) : {};
		r_enabled = replaceList["enable"];
		var rTypes = Object.keys(r_types);
		rTypes.forEach(function(type) {
			r_types[type] = replaceList[type];
		});
		
	});
}

function handleDomChange(e) {
    if (enabled) {
        if (parsing) return;
        var newNodeClass = e.srcElement.className;
        var targetNode = (e.relatedNode) ? e.relatedNode : e.target;
        parsing = true;
        setTimeout(function() {
            parseDOM(targetNode);
            parsing = false;
        }, 10);
    }
}

function alterDOM(request) {
    if (request.parseDOM) {
        enabled = true;
		clearDOM();
        parseDOM(document.body);
    } else if (request.clearDOM) {
        enabled = false;
        clearDOM();
    } else if (request.isPageComplete) {
		if(document.readyState === "complete") {
			if (enabled) {
				if ($('.DetectedNumber').length == 0) {
					chrome.extension.sendRequest({ pageLoad: true }, function(response) {
						alterDOM(response);
						initPage = document.URL
					});
				}
			}
		};
    }
}

function clearDOM() {
	$('.DetectedNumberImg').each(function() {
        $(this).replaceWith("");
    });
    $('.DetectedNumber').each(function() {
        $(this).replaceWith(this.innerHTML);
    });
}

function parseDOM(node) {
	if (node == undefined)
		return;
    var invalidNodes = ['SCRIPT', 'STYLE', 'SELECT', 'TEXTAREA', 'BUTTON', 'CODE', 'IMG'];
    var nodeName = node.nodeName.toUpperCase();

	var nodeType = node.type;
	if (nodeType != undefined) {
		while (nodeType.type != undefined) {
			nodeType = nodeType.type;
		}
		nodeType = nodeType.toString().toUpperCase();
	}
	
    var childNodesLength = node.childNodes.length;

    if ($.inArray(nodeName, invalidNodes) > -1 || $(node).hasClass('dial-message-box')) {
        return 0;
    }
	
	if (nodeName == 'A') {
		if (r_enabled) {
			var rTypes = Object.keys(r_types);
			rTypes.forEach(function(type) {
				if (r_types[type]) {
					if (node.protocol.match(type + ':')) {
						ReplaceNode(node);
					}
				}
			});
		}
		breakA: {
			return 0;
		}
	}
	
	if (nodeName == 'DIV') {
		if (node.className == 'DetectedNumber') {
			return 0;
		}
		if (node.attributes.role) {
			if (node.attributes.role.value == 'button') {
				return inputDialBtn(node);
			}
			if (node.attributes.role.value == 'menuitem') {
				if (node.firstChild.firstChild != undefined) {
					for (var n = 0; n < node.firstChild.firstChild.childElementCount; n++) {
						inputDialBtn(node.firstChild.firstChild.childNodes[n]);
						if (node.firstChild.firstChild.childNodes[n].nextSibling != null && node.firstChild.firstChild.childNodes[n].nextSibling.className == "DetectedNumber") {
							node.firstChild.firstChild.childNodes[n].nextSibling.style.float = "right";
							node.firstChild.firstChild.childNodes[n].nextSibling.attributes.jscontroller="null";
							node.firstChild.firstChild.childNodes[n].nextSibling.attributes.jsaction="click:null; focus:null; mousedown:null; mouseenter:null; mouseleave:null";
							node.firstChild.firstChild.childNodes[n].nextSibling.attributes.jsname="null";
						}
					}
				}
				return 0;
			}
		}
	}
	
	if (nodeName == 'INPUT')
		if (nodeType == "TEXT")
			return inputDialBtn(node);
		else
			return 0;
	
    for (var n = 0; n < childNodesLength; n++) {
		parseDOM(node.childNodes[n]);
    }
    if (node.nodeType == Node.TEXT_NODE) {
		if ((node.parentElement.isContentEditable != null) ? ((node.parentElement.isContentEditable == false) ? true : false ) : true)
			return numberToLink(node);
    }

    return 0;
}

function inputDialBtn(node){
	if(node.attributes.DialLink && node.nextSibling != undefined && node.nextSibling.className == "DetectedNumber")
		return;

	var result = parsePhoneNumbers(node);
	if (result){
		nodeUpdate(result, node, false);
		node.attributes.DialLink = true;
	}
}

function nodeUpdate(resultArray, node, insertBefore=true) {
	for (var n = 0; n < resultArray.length; n++) {
		var result = resultArray[n].trim();
		
		if (result.length < minTelVal || result == "" || (resultArray.length > 1)?resultArray.input == null:false)
			continue;
		
		var nodeValue = (node.nodeValue == undefined) ? (node.value == undefined)? node.textContent : node.value : node.nodeValue;
		nodeValue = (resultArray.length > 1) ? resultArray.input : nodeValue;
		
		
		var offset = nodeValue.indexOf(result);	
		
		var telNumber = result.trim();
		
		while (telNumber.charAt(telNumber.length-1).match(/[^0-9]/))
			telNumber = telNumber.substr(0,telNumber.length-1);

		var cleanNumber = telNumber.trim();
		
		//Remove first (x) number if number contains a leading +.
		if (cleanNumber.substring(0,1) == "+")
			cleanNumber = cleanNumber.replace(/\([(0-9]\)/g,'');
		
		//Now remove all non-numeric characters
		cleanNumber = cleanNumber.replace(/[a-zA-Z]+/g,',').replace(/[^0-9\+\,]/g,'');
		
		if (cleanNumber.length > telNumber.replace(/[\d\s]/g,'').length && cleanNumber.length >= minTelVal && cleanNumber.length <= maxTelVal) {

			if (insertBefore) {
				//var spanNode = buildNode(telNumber, cleanNumber, cleanNumber + offset.toString() + "_dialLink", true);
				var spanNode = buildNode(telNumber, cleanNumber, true);

				if (node.length >= (telNumber.length - offset)) {
					var range = node.ownerDocument.createRange();
					range.setStart(node, offset);
					try {
						range.setEnd(node, telNumber.length + offset);
					}
					catch (e){
						var irir = 0;
					}
					
					var docfrag = range.extractContents();
					var before = range.startContainer.splitText(range.startOffset);
					var parent = before.parentNode;
					parent.insertBefore(spanNode, before);
					return;
				}
			} else {
				var spanNode = buildNode(telNumber, cleanNumber, false);
			
				$(spanNode).insertAfter(node);
				return;
			}
		}
    }
}

function buildNode(telNumber, cleanNumber, fullSize) {
	var spanNode;
	
	if(fullSize) {
		spanNode = $('<div style="display: inline-block; position: relative; cursor: pointer;padding-left:3px;padding-right:20px;-webkit-border-radius: 8px;-webkit-box-shadow: 0 1px 1px #ddd, 0 1px 1px #555;white-space: nowrap;" title="Call: ' + telNumber + '" class="DetectedNumber">' + telNumber + '<img src="data:image/png;base64,' + handsetImage + '" style="display: inline-block; width: initial; border: 0px; padding: 0px; margin: 0px; float: right; bottom: 1px; right: 1px; position: absolute; background-color:rgba(0,0,0,0);" class="DetectedNumberImg"/></div>')[0];
	} else {
		spanNode = $('<div style="display: inline-block;cursor: pointer;padding-left:3px;-webkit-border-radius: 8px;-webkit-box-shadow: 0 1px 1px #ddd, 0 1px 1px #555;white-space: nowrap;" title="Call: ' + telNumber + '" class="DetectedNumber"><img src="data:image/png;base64,' + handsetImage + '" style="width: initial; border: 0px; padding: 0px; margin: 0px; float: none; bottom: 1px; right: 1px; background-color:rgba(0,0,0,0);" class="DetectedNumberImg"/></div>')[0];
	}

	spanNode.addEventListener('click', () => {
		chrome.extension.sendRequest({ number: telNumber.replace(/\D/g, '') });
	});
	return spanNode;
}

function numberToLink(node) {
	var telNumCounter = -1;
	var result;
	while (result = parsePhoneNumbers(node)) {
		
		if (result && (node || node.nodeValue.search(/\d/) > -1)) {
			nodeUpdate(result, node);
			node = node.nextSibling;
		}
		
		telNumCounter++;
		if (telNumCounter > 0)
			return telNumCounter; //Do another check if more are found.
		
		if (node && node.nextSibling != undefined)
			node = node.nextSibling;
	}
	return 0;
}

function ReplaceNode(node){
	if (!node) //Already detected, return.
		return 0;
	if (node.className == "DetectedNumber") //Already detected, return.
		return 0;
	
	var parnode = node.parentNode;
	if (parnode) {
		for (var n = 0; n < parnode.childNodes.length; n++) {
			if (node == parnode.childNodes[n]) {
				
				var nodeValue = (node.nodeValue == undefined) ? (node.value == undefined)? node.textContent : node.value : node.nodeValue;				
				var telNumber = nodeValue.trim();
				
				while (telNumber.charAt(telNumber.length-1).match(/[^0-9]/))
					telNumber = telNumber.substr(0,telNumber.length-1);

				var cleanNumber = telNumber.trim();
				
				//Remove first (x) number if number contains a leading +.
				if (cleanNumber.substring(0,1) == "+")
					cleanNumber = cleanNumber.replace(/\([(0-9]\)/g,'');
				
				//Now remove all non-numeric characters
				cleanNumber = cleanNumber.replace(/[a-zA-Z]+/g,',').replace(/[^0-9\+\,]/g,'');
				
				var spanNode = buildNode(telNumber, cleanNumber, true);
				parnode.replaceChild(spanNode, parnode.childNodes[n]);
				return 0;
			}
		}
	}
	
	return 0;
}

function parsePhoneNumbers(node) {
	if (!node) //Already detected, return.
		return null;
	if (node.className == "DetectedNumber") //Already detected, return.
		return null;
	
	//Valid - cache regexs
	if (validNumbers.length == 0) {
		validNumbers[validNumbers.length] = /[\+\[]?[\s0-9]([\-\)\.\/-\]]?\s?\–?\(?[0-9\s]){8,20}?/;
		validNumbers[validNumbers.length] = /^([\+\[]?[\(\)]?[\s0-9]([\-\)\.\/-\]]?\s?\–?\(?\d){8,20})$/;
		validNumbers[validNumbers.length] = /(\+?[\s\-]?\d*[\s\.\-\\\/]?)?([\(\[][\d]*[\)\]])?[\s\.\-\\\/]?[\d]*[\s\.\-\\\/]?[\d]{3,4}?[\s\.\-\\\/]?[\d]+(([\s\.\-\\\/]?[a-zA-Z]{1,8}?[\s\.\-\\\/]|\,)?[\d]+)?/g;
		validNumbers[validNumbers.length] = /(([\+][\d]{1,3})?([\D])?[\d]{3,5}([\D])?[\d]{3,4}([\D])?[\d]{3,4})/g; //NNNX XXX XXX
	}

	//Invalid - cache regexs
	if (invalidNumbers.length == 0) {
		invalidNumbers[invalidNumbers.length] = /([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/; //MAC; Style = FF[:-]FF
		invalidNumbers[invalidNumbers.length] = /([0-9A-Fa-f]{4}[.]){2}([0-9A-Fa-f]{4})/; //MAC; Style = FFFF.FFFF.FFFF
		invalidNumbers[invalidNumbers.length] = /([0-9]{4})[\.\/\-]([0-9]{2})[.\/-]([0-9]{2})/; //DATE; Style = 2014[./-]01[./-]01
		invalidNumbers[invalidNumbers.length] = /([0-9][0-9]?[\.\/\-]){2}([0-9]{4})/; //DATE; Style = 01[./-]01[./-]2014
		invalidNumbers[invalidNumbers.length] = /([0-9]\D|[0-9]{2}\D).*[0-9]{4}.*[:]/; //DATETIME 12, 1234 12:
		invalidNumbers[invalidNumbers.length] = /([\w]{8}[-]?[\w]{4}[-]?[\w]{4}[-]?[\w]{4}[-]?[\w]{12})/; //GUID
		invalidNumbers[invalidNumbers.length] = /^([1-9][^\d]|[0-3]\d[^\d])[^\d]?(\D{2,14}|(\d[^\d]|[0-3]\d[^\d]))[^\d]{1}([\w]\d{1,3})/; //DATE; Style = [0]1[ \/.-]Sep[tember][ \/.-][20]14
		invalidNumbers[invalidNumbers.length] = /^([0-9]{4})[\s][\.\/\-][\s]([0-9]{2})$/; //([0-9]{4})[ ][./-][ ]([0-9]{2})[ ]/; //DATE; Style = 2014 [./-] 01
		invalidNumbers[invalidNumbers.length] = /[1-2]([0-9]{3})[\s]?[\-\:][\s]?[1-2]([0-9]{3})/;//[1-2]([0-9]{3})[\s]?[/-][\s]?[1-2]([0-9]{3})/; //DATE; Style [1-2]914[/-][1-2]014
		invalidNumbers[invalidNumbers.length] = /(([1-2][0-9][0-9]|[1-9][0-9]|[0-9])[.]){3}([1-2][0-9][0-9]|[1-9][0-9]|[0-9])/; //IP;
		invalidNumbers[invalidNumbers.length] = /([0-2][0-9]|[0-9])[:]([0-9]{2})[\s]?[\.\/\-][\s]?([0-2][0-9]|[0-9])[:]([0-9]{2})/; //TIME; Style = [0-2]:[0-9] - [0-2]:[0-9]
		invalidNumbers[invalidNumbers.length] = "://";
		invalidNumbers[invalidNumbers.length] = /[\£\$\؋\ƒ\៛\¥\₡\₱\€\¢\₭\д\₮\₦\₩\﷼\฿\₴\л\₫]/; //CURRENCY; Style = $123123
		invalidNumbers[invalidNumbers.length] = /([0-9]{1,3}\,)+[0-9]{1,3}/;//\s[0-9]{1,3}(\,[0-9]{1,3})+/; //NUMERICS; Style = x,xxx xxx,xxx x,xxx,xxx xxx,xxx,xxx,xxx...
		invalidNumbers[invalidNumbers.length] = /[0-9]+(\.[0-9]+)+/; //NUMERICS; xxxxxx.xxxxx
		invalidNumbers[invalidNumbers.length] = /\/[0-9]+\//; //NUMERICS; xxxxxx.xxxxx
	}
	
    var rawTelNumber = (node.nodeValue == undefined) ? (node.value == undefined)? node.textContent : node.value : node.nodeValue;
    if (rawTelNumber == null || rawTelNumber.trim().length == 0 || rawTelNumber.replace(/[\D]*/,'').length == 0)
		return null;
	
	//Find strings that are known invalid:
	for (key in invalidNumbers) {
		var badresult = rawTelNumber.match(invalidNumbers[key]);
		if (badresult)
			return null;
	}

	//Find strings that best match a valid phone number:
	var bestResult = null;
	for (key in validNumbers) {
		var goodresult = rawTelNumber.match(validNumbers[key]); //Get result...
		if (goodresult)											//Is it valid?
			if (bestResult) {									//If we already cached the best result, compare it.
				if (goodresult.length < bestResult.length)		//Is it 'cleaner'?
					if (goodresult[0].trim().length >= bestResult[0].trim().length) //Is the new result a longer string?
						bestResult = goodresult;						//Keep it!
			} else {
				bestResult = goodresult;						//No existing result, so grab the first.
			}
	}
	return bestResult;
}
