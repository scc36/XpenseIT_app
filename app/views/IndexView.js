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
	case 'home':
		alert("Going home");
		break;
	case 'profile':
		alert("Modify profile settings");
		break;
	case 'settings':
		alert("Change settings");
		break;
	case 'info':
		alert("About XpenseIT");
		break;
	}
}

App.views.IndexView = Ext.extend(Ext.Panel, {
	layout: 'vbox',
	initComponent: function () {
		this.homeButton = new Ext.Button({
			iconCls: 'home',
			title: 'home',
			iconMask: true,
			handler: this.menuHandler,
			scope: this
		});
		
		this.profileButton = new Ext.Button({
			iconCls: 'user',
			name: 'profile',
			iconMask: true,
			handler: this.menuHandler,
			scope: this
		});
		
		this.settingsButton = new Ext.Button({
			iconCls: 'settings',
			name: 'settings',
			iconMask: true,
			handler: this.menuHandler,
			scope: this
		});
		
		this.infoButton = new Ext.Button({
			iconCls: 'info',
			name: 'info',
			iconMask: true,
			handler: this.menuHandler,
			scope: this
		});
		
		this.topToolbar = new Ext.Toolbar({
            title: 'XpenseIT',
			dock: 'top',
        });
		this.bottomToolbar = new Ext.Toolbar({
			dock: 'bottom',
			layout: {
				pack: 'center',
			},
			items: [
				this.homeButton,
				this.profileButton,
				this.settingsButton,
				this.infoButton,
			],
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