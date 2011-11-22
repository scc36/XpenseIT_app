App.views.ExpenseEditorView = Ext.extend(Ext.form.FormPanel, {
	initComponent: function () {
		categoryStore: Ext.emptyFn,
	
		this.backButton = new Ext.Button({
			text: 'Home',
			ui: 'back',
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
			action: 'canceledit'
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
			xtype: 'datepickerfield',
			name: 'date',
			label: 'Date',
			picker: { yearFrom: 1900 }
		}, {
			xtype: 'selectfield',
			name: 'category',
			label: 'Category',
			options: [{
				text: 'Food',
				value: 'food'
			}, {
				text: 'Travel',
				value: 'travel'
			}, {
				text: 'Lodging',
				value: 'lodging'
			}, {
				text: 'Other',
				value: 'other'
			}]
		}, {
			xtype: 'hiddenfield',
			name: 'secret',
			value: false
		}, {
			xtype: 'textareafield',
			name: 'description',
			label: 'Description',
			placeHolder: 'Enter a description of your expense here'
		}]
	}, {
		layout: 'vbox',
		defaults: {xtype: 'button', flex: 1, style: 'margin: .5em;'},
		items: [{
			text: 'Reset form',
			handler: function(){
				Ext.getCmp('basicform').reset();
			}
		}]
	}]
});