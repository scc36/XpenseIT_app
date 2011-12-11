var newexpense = function (btn, evt) {
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
	}
}
var myreport = function (btn, evt) {
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'listexpense'
		});
}
var allreports = function (btn, evt) {
		alert("View List of Reports");
}

var alertDismissed = function () {
}

App.views.IndexView = Ext.extend(Ext.Panel, {
	layout: 'vbox',
	initComponent: function () {
	
		this.homeButton = new Ext.Button({
			iconCls: 'home',
			title: 'home',
			iconMask: true,
			handler: this.gohome,
			scope: this
		});
		
		this.profileButton = new Ext.Button({
			iconCls: 'user',
			name: 'profile',
			iconMask: true,
			handler: this.gotoprofile,
			scope: this
		});
		
		this.settingsButton = new Ext.Button({
			iconCls: 'settings',
			name: 'settings',
			iconMask: true,
			handler: this.gotosettings,
			scope: this
		});
		
		this.infoButton = new Ext.Button({
			iconCls: 'info',
			name: 'info',
			iconMask: true,
			handler: this.xpenseitinfo,
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
				this.profileButton,
				this.settingsButton,
				this.infoButton,
			],
        });
		this.dockedItems = [this.topToolbar, this.bottomToolbar];
		App.views.IndexView.superclass.initComponent.call(this);
	},
	
	xpenseitinfo: function () {
		navigator.notification.alert(
			'XpenseIT copyright 2011\n Anirudh Rathi \n Joe Vassilatos \n Kiran Salgarkar \n Shawn Chen',  // message
			alertDismissed,         // callback
			'XpenseIT version 0.1', // title
			'Done'                  // buttonName
		);
	},
	
	gotoprofile: function () {
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'gotoprofile'
		});
	},
	gotosettings: function () {
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'gotosettings'
		});
	},
	
	//scroll: 'vertical',
	items: [{
		xtype: 'button',
		iconCls: 'btnPicture',
		ui: 'action',
		name: 'takepicture',
		text: 'Capture Receipt',
		width: 300,
		handler: newexpense,
	}, {xtype: 'spacer', height: 10, width: 100}, {
		xtype: 'button',
		iconCls: 'btnExpense',
		ui: 'confirm',
		name: 'expense',
		text: 'Record Expense',
		width: 300,
		handler: newexpense,
	}, {xtype: 'spacer', height: 10, width: 100}, {
		xtype: 'button',
		iconCls: 'btnReport',
		name: 'viewreport',
		text: 'View expenses',
		width: 300,
		handler: myreport,
	}, {xtype: 'spacer', height: 10, width: 100}, {
		xtype: 'button',
		iconCls: 'btnAllReports',
		name: 'listreport',
		text: 'My Reports',
		width: 300,
		handler: allreports,
	}],
});