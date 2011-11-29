var menuHandler = function (btn, evt) {
	switch (btn.name) {
	case 'takepicture':
		alert("Take a picture");
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'newexpense'
		});
		break;
	case 'expense':
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'newexpense'
		});
		break;
	case 'viewreport':
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'listexpense'
		});
		break;
	case 'listreport':
		alert("View List of Reports");
		break;
	// Bottom toolbar buttons
	case 'preferences':
		alert("View Preferences");
		break;
	case '':
		alert("View List of Reports");
		break;
	}
}

App.views.IndexView = Ext.extend(Ext.Panel, {
	layout: 'vbox',
	initComponent: function () {
		this.topToolbar = new Ext.Toolbar({
            title: 'XpenseIT',
			dock: 'top',
        });
		this.bottomToolbar = new Ext.Toolbar({
			dock: 'bottom',
			layout: {
				pack: 'center',
			},
			items: [{
				xtype: 'button',
				name: 'preferences',
				iconCls: 'bookmarks',
				title: 'Preferences',
				handler: menuHandler,
			}, {
				xtype: 'button',
				iconCls: 'download',
				title: 'Download',
				handler: menuHandler,
			}],
			// Home, Profile, Settings, Info
        });
		this.dockedItems = [this.topToolbar, this.bottomToolbar];
		App.views.IndexView.superclass.initComponent.call(this);
	},
	items: [{
		xtype: 'button',
		name: 'takepicture',
		text: 'Take Picture',
		width: 400,
		handler: menuHandler,
	}, {
		xtype: 'button',
		name: 'expense',
		text: 'Record Expense',
		width: 400,
		handler: menuHandler,
	}, {
		xtype: 'button',
		name: 'viewreport',
		text: 'View current report',
		width: 400,
		handler: menuHandler,
	}, {
		xtype: 'button',
		name: 'listreport',
		text: 'Existing Reports',
		width: 400,
		handler: menuHandler,
	}]
});