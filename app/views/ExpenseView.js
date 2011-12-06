App.views.ExpenseView = Ext.extend(Ext.Panel, {
	fullscreen: true,
	layout: 'card',
	cardSwitchAnimation: 'slide',
	initComponent: function () {
		Ext.apply(App.views, {
			indexView: new App.views.IndexView(),
			aboutView: new App.views.AboutView(),
			profileView: new App.views.ProfileView(),
			settingsView: new App.views.SettingsView(),
			expenseListView: new App.views.ExpenseListView({ expenseStore: App.stores.expenseStore }),
			expenseEditorView: new App.views.ExpenseEditorView(),
			tripListView: new App.views.TripListView({ tripStore: App.stores.tripStore }),
            tripEditorView: new App.views.TripEditorView()
		});
		this.items = [
			App.views.indexView,
			App.views.aboutView,
			App.views.profileView,
			App.views.settingsView,
			App.views.expenseListView,
			App.views.expenseEditorView,
			App.views.tripListView,
            App.views.tripEditorView
		]
		App.views.ExpenseView.superclass.initComponent.call(this);
		this.on('render', function () {
			App.stores.expenseStore.load();
			App.stores.tripStore.load();
			//App.stores.profileStore.load();
		});
	}
});