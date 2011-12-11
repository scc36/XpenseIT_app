App.views.ExpenseEditorView = Ext.extend(Ext.form.FormPanel, {
	initComponent: function () {
		categoryStore: Ext.emptyFn,
	
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
		
		this.trashButton = new Ext.Button({
			iconCls: 'trash',
			iconMask: true,
			handler: this.trashButtonTap,
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
		
		this.bottomToolbar = new Ext.Toolbar({
			dock: 'bottom',
			items: [
				{ xtype: 'spacer' },
				this.trashButton
			]
		});
		
		this.dockedItems = [this.topToolbar, this.bottomToolbar];
		App.views.ExpenseEditorView.superclass.initComponent.call(this);
	},
	
	backButtonTap: function () {
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'gohome'
		});
	},
	
	saveButtonTap: function () {
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'saveexpense'
		});
	},
	
	trashButtonTap: function () {
		Ext.dispatch({
			controller: App.controllers.expenseController,
			action: 'deleteexpense'
		});
	},
	scroll: 'vertical',
	items: [{
		xtype: 'fieldset',
		title: 'Enter expense information',
		defaults: {
			// labelAlign: 'right'
			labelWidth: '35%'
		},
		items: [{
			xtype: 'textfield',
			name: 'amount',
			label: 'Amount',
			placeHolder: '0',
			required: true,
			useClearIcon: true
		}, {
			xtype: 'selectfield',
			name: 'category',
			label: 'Category',
			options: [{
				text: 'Food',
				value: 'Food'
			}, {
				text: 'Travel',
				value: 'Travel'
			}, {
				text: 'Lodging',
				value: 'Lodging'
			}, {
				text: 'Other',
				value: 'Other'
			}]
		}, {
			xtype: 'hiddenfield',
			name: 'secret',
			value: false
		}, {
			xtype: 'textareafield',
			name: 'description',
			label: 'Description',
			placeHolder: 'Enter a description of your expense here',
			useClearIcon: true
		}, {
			xtype: 'textfield',
			name: 'mileage',
			label: 'Mileage',
			placeHolder: '0',
			value: 0,
			required: true,
			useClearIcon: true
		}, {
			xtype: 'datepickerfield',
			name: 'date',
			label: 'Date',
			picker: { yearFrom: 1900 }
		}]
	}]
});