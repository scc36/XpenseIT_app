﻿var App = new Ext.Application({
	name: 'App',
	useLoadMask: true,
	launch: function() {
		this.launched = true;
		this.mainLaunch();
	},
	mainLaunch: function() {
		//if (!device || !this.launched) {return;}
		if (!this.launched) {return;}
		//console.log('mainLaunch');
		
		Ext.dispatch({
			controller: App.controllers.menuController,
			action: 'index'
		});
	}
});