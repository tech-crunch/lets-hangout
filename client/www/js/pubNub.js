var pubnub = PUBNUB.init({
	'publish_key': 'pub-c-b8bfc89b-2bc4-4e14-8e44-60fe8ef001a8',
	'subscribe_key': 'sub-c-17da15be-647f-11e6-8de8-02ee2ddab7fe',
	'ssl': true,
	error: function (error) {
		console.log('Error:', error);
	}
});