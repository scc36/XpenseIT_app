Ext.regController('CategoryController', {
	'index': function (options) {
		if (!App.views.categoryView) {
			App.views.categoryView = new App.views.CategoryView();
		}
		App.views.categoryView.setActiveItem(
			App.views.categoryListView
		);
	},
	'newcategory': function (options) {
		var now = new Date();
		var categoryId = now.getTime();
		var category = Ext.ModelMgr.create({ id: categoryId, date: now, title: '', narrative: '' },
			'CategoryModel'
		);
		
		App.views.categoryEditorView.load(category);
		App.views.categoryView.setActiveItem(
			App.views.categoryEditorView,
			{ type: 'slide', direction: 'left' }
		);
	},
	'editcategory': function (options) {
		App.views.categoryEditorView.load(options.category);
		App.views.categoryView.setActiveItem(
			App.views.categoryEditorView,
			{ type: 'slide', direction: 'left' }
		);
	},
	'savecategory': function (options) {
		var currentCategory = App.views.categoryEditorView.getRecord();
		App.views.categoryEditorView.updateRecord(currentCategory);
		var errors = currentCategory.validate();
		if (!errors.isValid()) {
			Ext.Msg.alert('Wait!', errors.getByField('title')[0].message, Ext.emptyFn);
			return;
		}
		if (null == App.stores.categoryStore.findRecord('id', currentCategory.data.id)) {
			App.stores.categoryStore.add(currentCategory);
		} else {
			 currentCategory.setDirty();
		}
		App.stores.categoryStore.sync();
		App.stores.categoryStore.sort([{ property: 'date', direction: 'DESC'}]);
		App.views.categoryListView.refreshList();
		App.views.categoryView.setActiveItem(
			App.views.categoryListView,
			{ type: 'slide', direction: 'right' }
		);
	},
	'deletecategory': function (options) {
		var currentCategory = App.views.categoryEditorView.getRecord();
		if (App.stores.categoryStore.findRecord('id', currentCategory.data.id)) {
			App.stores.categoryStore.remove(currentCategory);
		}
		App.stores.categoryStore.sync();
		App.views.categoryListView.refreshList();
		App.views.categoryView.setActiveItem(
			App.views.categoryListView,
			{ type: 'slide', direction: 'right' }
		);
	},
	'canceledit': function (options) {
		App.views.categoryView.setActiveItem(
			App.views.categoryListView,
			{ type: 'slide', direction: 'right' }
		);
	}
});
App.controllers.categoryController = Ext.ControllerManager.get('CategoryController');