App.views.TripEditorView = Ext.extend(Ext.form.FormPanel, {
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
			title: 'Edit Trip',
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
		App.views.TripEditorView.superclass.initComponent.call(this);
	},
	
	backButtonTap: function () {
		Ext.dispatch({
			controller: App.controllers.tripController,
			action: 'canceledit'
		});
	},
	
	saveButtonTap: function () {
		Ext.dispatch({
			controller: App.controllers.tripController,
			action: 'savetrip'
		});
	},
	
	trashButtonTap: function () {
		Ext.dispatch({
			controller: App.controllers.tripController,
			action: 'deletetrip'
		});
	},
	
	scroll: 'vertical',
	items: [{
		xtype: 'fieldset',
		title: 'Enter trip information',
		defaults: {
			// labelAlign: 'right'
			labelWidth: '35%'
		},
		items: [{
			xtype: 'textfield',
			name: 'name',
			label: 'Name',
			placeHolder: 'Name of this trip',
			required: true,
			useClearIcon: true
		}, {
			xtype: 'datepickerfield',
			name: 'start_date',
			label: 'Start date of trip',
			picker: { yearFrom: 1900 }
		}, {
			xtype: 'datepickerfield',
			name: 'end_date',
			label: 'End date of trip',
			picker: { yearFrom: 1900 }
		}, {
			xtype: 'hiddenfield',
			name: 'secret',
			value: false
		}, {
			xtype: 'textareafield',
			name: 'description',
			label: 'Description',
			placeHolder: 'Enter a description of the trip here'
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