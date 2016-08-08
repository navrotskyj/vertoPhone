console.log('init app', $('.content'), new Date());

var vertoPhone;

$(document).ready(function() {

});

var Phone = function () {
	this.ringer = document.createElement('audio');
	this.number = '';

	this.controls = {
		$inputCreateContact: $('.dialpad-form > .ion-ios-plus-outline'),
		$inputDelChar: $('.dialpad-form > .ion-backspace-outline'),
		$callBtn: $('.call'),
		$dialpadForm: $('.dialpad-form'),
		$activeCallForm: $('.call-active'),
		settings: {
			$login: $('#settingsLogin'),
			$password: $('#settingsPassword'),
			$server: $('#settingsServer')
		},
		// TODO bad
		$events: $('body')
	};

	this.settings = {};

	this.setVisibleInputButton(this.getNumber());

	this.subscribeUI();
};

Phone.prototype.on = function (name, handler) {
	this.controls.$events.on(name, handler);
};

Phone.prototype.off = function (a, b, c) {
	this.controls.$events.off(a, b, c);
};

Phone.prototype.setSettings = function (data) {
	console.info('set settings ', data);
	this.settings.server = data.server || "";
	this.settings.login = data.login || "";
	this.settings.password = data.password || "";

	this.controls.settings.$login.val(this.settings.login);
	this.controls.settings.$password.val(this.settings.password);
	this.controls.settings.$server.val(this.settings.server);

	this.controls.$events.trigger('saveSettings', this.getSettings());
};

Phone.prototype.getSettings = function () {
	return {
		login: this.controls.settings.$login.val(),
		password: this.controls.settings.$password.val(),
		server: this.controls.settings.$server.val()
	};
};

Phone.prototype.playNumber = function (number) {
	this.ringer.src = '../sound/DTMF' + encodeURIComponent(number || 0) + '.mp3';
	this.ringer.play();
};

Phone.prototype.setVisibleInputButton = function (val) {
	this.controls.$inputCreateContact.css('display', val ? '' : 'none');
	this.controls.$inputDelChar.css('display', val ? '' : 'none');
};

Phone.prototype.setNumber = function (number) {
	this.number = number || '';
	var $inp = $('.input-number');
	$inp.val(this.getNumber());
	this.setVisibleInputButton(this.getNumber());
};

Phone.prototype.getNumber = function () {
	return this.number;
};

Phone.prototype.makeCall = function () {
	// TODO
	if (this.controls.$callBtn.hasClass('make-call')) {
		this.controls.$callBtn.removeClass('make-call');
		this.controls.$callBtn.addClass('hangup-call');

		this.controls.$dialpadForm.hide();
		this.controls.$activeCallForm.show();
	} else {
		this.controls.$callBtn.removeClass('hangup-call');
		this.controls.$callBtn.addClass('make-call');

		this.controls.$activeCallForm.hide();
		this.controls.$dialpadForm.show();
	}
};

Phone.prototype.subscribeUI = function () {
	var phoneScope = this;

	$('.input-number').keyup(function (e) {
		phoneScope.setNumber(this.value);
		return e;
	});

	$('.dialpad-btn').click(function (e) {
		phoneScope.setNumber(phoneScope.getNumber() + $(this).attr('number'));
		phoneScope.playNumber($(this).attr('number'));
	});

	$('.tab-item').click(function() {
		var $content = $(this.hash);
		$('.tab-item').removeClass('active');
		$('.content').attr('hidden', '');

		$(this).addClass('active');
		$content.attr('hidden', null);
	});
	
	this.controls.$inputDelChar.click(function () {
		var number = phoneScope.getNumber();
		phoneScope.setNumber(number.substring(0, number.length - 1));
	});
	
	this.controls.$callBtn.click(function () {
		phoneScope.makeCall();
	});

	$('#settings > form').submit(function (e) {
		phoneScope.setSettings(phoneScope.getSettings());
		return false
	});
};

vertoPhone = new Phone();