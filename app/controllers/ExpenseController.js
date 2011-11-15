Ext.regController('ExpenseController', {
	'index': function (options) {
		if (!App.views.expenseView) {
			App.views.expenseView = new App.views.ExpenseView();
		}
		App.views.expenseView.setActiveItem(
			App.views.expenseListView
		);
	},
	'newexpense': function (options) {
		var now = new Date();
		var expenseId = now.getTime();
		var expense = Ext.ModelMgr.create({ id: expenseId, date: now, title: '', narrative: '' },
			'ExpenseModel'
		);
		
		App.views.expenseEditorView.load(expense);
		App.views.expenseView.setActiveItem(
			App.views.expenseEditorView,
			{ type: 'slide', direction: 'left' }
		);
	},
	'editexpense': function (options) {
		App.views.expenseEditorView.load(options.expense);
		App.views.expenseView.setActiveItem(
			App.views.expenseEditorView,
			{ type: 'slide', direction: 'left' }
		);
	},
	'saveexpense': function (options) {
		var currentExpense = App.views.expenseEditorView.getRecord();
		App.views.expenseEditorView.updateRecord(currentExpense);
		var errors = currentExpense.validate();
		if (!errors.isValid()) {
			Ext.Msg.alert('Wait!', errors.getByField('title')[0].message, Ext.emptyFn);
			return;
		}
		if (null == App.stores.expenseStore.findRecord('id', currentExpense.data.id)) {
			App.stores.expenseStore.add(currentExpense);
		} else {
			 currentExpense.setDirty();
		}
		App.stores.expenseStore.sync();
		App.stores.expenseStore.sort([{ property: 'date', direction: 'DESC'}]);
		App.views.expenseListView.refreshList();
		App.views.expenseView.setActiveItem(
			App.views.expenseListView,
			{ type: 'slide', direction: 'right' }
		);
	},
	'deleteexpense': function (options) {
		var currentExpense = App.views.expenseEditorView.getRecord();
		if (App.stores.expenseStore.findRecord('id', currentExpense.data.id)) {
			App.stores.expenseStore.remove(currentExpense);
		}
		App.stores.expenseStore.sync();
		App.views.expenseListView.refreshList();
		App.views.expenseView.setActiveItem(
			App.views.expenseListView,
			{ type: 'slide', direction: 'right' }
		);
	},
	'canceledit': function (options) {
		App.views.expenseView.setActiveItem(
			App.views.expenseListView,
			{ type: 'slide', direction: 'right' }
		);
	}
});
App.controllers.expenseController = Ext.ControllerManager.get('ExpenseController');