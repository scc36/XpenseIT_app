App.views.CategoryEditorView = Ext.extend(Ext.form.FormPanel, {
	initComponent: function () {
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
			title: 'Edit Category',
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
		App.views.CategoryEditorView.superclass.initComponent.call(this);
	},
	
	backButtonTap: function () {
		Ext.dispatch({
			controller: App.controllers.categoryController,
			action: 'canceledit'
		});
	},
	
	saveButtonTap: function () {
		Ext.dispatch({
			controller: App.controllers.categoryController,
			action: 'savecategory'
		});
	},
	
	trashButtonTap: function () {
		Ext.dispatch({
			controller: App.controllers.categoryController,
			action: 'deletecategory'
		});
	},
	
	items: [{
		xtype: 'textfield',
		name: 'title',
		label: 'Title',
		required: true
	}, {
		xtype: 'textareafield',
		name: 'narrative',
		label: 'Narrative'
	}]
});