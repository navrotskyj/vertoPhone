console.log('init app', $('.content'), new Date());

var Phone = function () {
	this.ringer = document.createElement('audio');
};

Phone.prototype.playNumber = function (number) {
	this.ringer.src = '../sound/DTMF' + encodeURIComponent(number || 0) + '.mp3';
	this.ringer.play();
};


var phone = new Phone();

$('.dialpad-btn').click(function (e) {
	var $inp = $('.input-number');
	$inp.val($inp.val() + $(this).attr('number'));
	phone.playNumber($(this).attr('number'));
});

$('.tab-item').click(function() {
	var $content = $(this.hash);
	$('.tab-item').removeClass('active');
	$('.content').attr('hidden', '');

	$(this).addClass('active');
	$content.attr('hidden', null);
})