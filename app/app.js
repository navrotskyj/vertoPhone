
var vertoPhone;
Vue.config.devtools = true;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		vertoPhone.setActiveCall(request);
	}
);


vertoPhone = new Vue({
	el: '#application',
	data: {
		login: '',
		number: '',
		settings: {
			login: '',
			password: '',
			server: ''
		},
		activeCall: null,
		ringer: new Vue({el: '#localVideo'}),
		activeTabName: 'dialpad',
		prevActiveTabName: '',
		bg: null,
		calls: [],
		history: [],
		contacts: [],
		favorites: [],
		tabs: [
			{name: 'Favorites', id: 'favorites', class: 'icon ion-ios-star-outline'},
			{name: 'History', id: 'history', class: 'icon ion-ios-clock-outline'},
			{name: 'Contacts', id: 'contacts', class: 'icon icon-person'},
			{name: 'Dialpad', id: 'dialpad', class: 'icon ion-ios-keypad-outline'},
			{name: 'Settings', id: 'settings', class: 'icon icon-gear'}
		]
	},
	methods: {
		setActiveTab: function (item) {
			if (this.activeTabName == item.id) return;
			this.activeTabName = item.id;
		},
		setActiveCall: function (activeCalls) {
			this.activeCall = activeCalls;
		},
		getSettings: function () {
			return this.settings;
		},
		saveSettings: function () {
			// TODO
			this.bg.onSave(null, this.getSettings());
		},
		delLastNumber: function () {
			this.$set('number', this.number.substring(0, this.number.length - 1));
		},
		setSettings: function (settings) {
			if (!settings)
				settings = {};

			this.settings.login = settings.login || '';
			this.settings.password = settings.password || '';
			this.settings.server = settings.server || '';
		},

		onChangeActiveCall: function (v) {
			var callIds = Object.keys(v);
			if (callIds.length > 0) {
				this.setActiveTab({id: 'call'});
			} else {
				this.setActiveTab({id: 'dialpad'});
			}
		},

		// region  call control

		dtmf: function (number, callId) {
			this.number += number;
			this.ringer.$el.src = '../sound/DTMF' + encodeURIComponent(number || 0) + '.mp3';
			this.ringer.$el.play();
		},
		makeCall: function () {
			this.bg.session.makeCall(this.number);
		},
		dropCall: function (id) {
			this.bg.session.dropCall(id);
		},
		answerCall: function (id) {
			this.bg.session.answerCall(id);
		},
		holdCall: function (id) {
			this.bg.session.holdCall(id);
		},
		unholdCall: function (id) {
			this.bg.session.unholdCall(id);
		},
		transferCall: function () {

		},

		// endregion

		init: function (args) {
			console.log('on init', args);
			this.$watch('activeCall', this.onChangeActiveCall);
			this.bg = args;
			this.login = args.session.vertoLogin;

			var callCount = Object.keys(Object.keys(this.bg.session.activeCalls)).length;
			if (callCount > 0) {
				this.activeCall = this.bg.session.activeCalls;
				this.setActiveTab({id: 'call'})
			}
		},
		subscribe: function (name, fn) {
			this.$watch(name, fn);
		}
	}
});