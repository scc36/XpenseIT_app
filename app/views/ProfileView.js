App.views.ProfileView = Ext.extend(Ext.form.FormPanel, {
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
		App.views.ProfileView.superclass.initComponent.call(this);
	},
	
	backButtonTap: function () {
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'gohome'
		});
	},
	
	saveButtonTap: function () {
		alert("Profile Saved");
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'gohome'
		});
	},
	
	scroll: 'vertical',
	items: [{
		xtype: 'fieldset',
		title: 'Edit Profile',
		defaults: {
			// labelAlign: 'right'
			labelWidth: '35%'
		},
		items: [{
			xtype: 'textfield',
			name: 'name',
			label: 'Name',
			value: 'Joe Vassilatos',
			required: true,
			useClearIcon: true
		}, {
			xtype: 'textfield',
			name: 'business',
			label: 'Business',
			value: 'Rutgers University',
			useClearIcon: true
		}, {
			xtype: 'textfield',
			name: 'address',
			label: 'Address',
			value: '1 Scarlet Knight Way',
			useClearIcon: true
		}, {
			xtype: 'textfield',
			name: 'phone',
			label: 'Phone Number',
			value: '732-445-6105',
			useClearIcon: true
		}, {
			xtype: 'selectfield',
			name: 'report',
			label: 'Report Categorization',
			options: [{
				text: 'By Trip',
				value: 'trip'
			}, {
				text: 'By Date',
				value: 'date'
			}]
		}, {
			xtype: 'selectfield',
			name: 'type',
			label: 'Type of Claimer',
			options: [{
				text: 'Employee',
				value: 'employee'
			}, {
				text: 'Visitor',
				value: 'visitor'
			}]
		}, {
			xtype: 'hiddenfield',
			name: 'secret',
			value: false
		}]
	}]
});