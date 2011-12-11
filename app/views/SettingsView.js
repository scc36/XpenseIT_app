App.views.SettingsView = Ext.extend(Ext.form.FormPanel, {
	initComponent: function () {
	
		this.backButton = new Ext.Button({
			iconCls: 'home',
			title: 'home',
			iconMask: true,
			handler: this.backButtonTap,
			scope: this
		});
		
		this.saveButton = new Ext.Button({
			text: 'Save',
			ui: 'action',
			handler: this.saveButtonTap,
			scope: this
		});
		
		this.topToolbar = new Ext.Toolbar({
			title: 'Edit Expense',
			items: [
				this.backButton,
				{ xtype: 'spacer' },
				this.saveButton
			]
		});
		
		this.dockedItems = [this.topToolbar];
		App.views.SettingsView.superclass.initComponent.call(this);
	},
	
	backButtonTap: function () {
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'gohome'
		});
	},
	
	saveButtonTap: function () {
	alert("Settings Saved");
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'gohome'
		});
	},
	
	scroll: 'vertical',
	items: [{
		xtype: 'fieldset',
		title: 'Edit Settings',
		defaults: {
			// labelAlign: 'right'
			labelWidth: '35%'
		},
		items: [{
			xtype: 'textfield',
			name: 'pathtoreceipts',
			label: 'Path to Receipts',
			value: '/xpenseit/receipts/',
			required: true,
			useClearIcon: true
		}, {
			xtype: 'textfield',
			name: 'deletedate',
			label: 'Delete Expense Older Than (days)',
			value: '60',
			useClearIcon: true
		}, {
			xtype: 'textfield',
			name: 'syncfrequency',
			label: 'Sync Frequency (days)',
			value: '1',
			useClearIcon: true
		}]
	}]
});