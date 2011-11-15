Ext.regController('MenuController', {
	'index': function(options){
		if (!App.views.menuView) {
			App.views.menuView = new App.views.MenuView();
		}
		App.views.menuView.setActiveItem(
			App.views.indexView
		);
	},
	'about': function() {
		App.views.menuView.setActiveItem(
			App.views.aboutView,
			{ type: 'slide', direction: 'left' }
		);
	}
});
App.controllers.menuController = Ext.ControllerManager.get('MenuController');