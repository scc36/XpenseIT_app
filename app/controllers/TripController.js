Ext.regController('TripController', {
	'index': function (options) {
		if (!App.views.tripView) {
			App.views.tripView = new App.views.TripView();
		}
		App.views.tripView.setActiveItem(
			App.views.tripListView
		);
	},
	'newtrip': function (options) {
		var now = new Date();
		var tripId = now.getTime();
		var trip = Ext.ModelMgr.create({ id: tripId, start_date: now, end_date: now, name: '', description: '' },
			'TripModel'
		);
		
		App.views.tripEditorView.load(trip);
		App.views.tripView.setActiveItem(
			App.views.tripEditorView,
			{ type: 'slide', direction: 'left' }
		);
	},
	'edittrip': function (options) {
		App.views.tripEditorView.load(options.trip);
		App.views.tripView.setActiveItem(
			App.views.tripEditorView,
			{ type: 'slide', direction: 'left' }
		);
	},
	'savetrip': function (options) {
		var currentTrip = App.views.tripEditorView.getRecord();
		App.views.tripEditorView.updateRecord(currentTrip);
		var errors = currentTrip.validate();
		if (!errors.isValid()) {
			Ext.Msg.alert('Wait!', errors.getByField('title')[0].message, Ext.emptyFn);
			return;
		}
		if (null == App.stores.tripStore.findRecord('id', currentTrip.data.id)) {
			App.stores.tripStore.add(currentTrip);
		} else {
			 currentTrip.setDirty();
		}
		App.stores.tripStore.sync();
		App.stores.tripStore.sort([{ property: 'date', direction: 'DESC'}]);
		App.views.tripListView.refreshList();
		App.views.tripView.setActiveItem(
			App.views.tripListView,
			{ type: 'slide', direction: 'right' }
		);
	},
	'deletetrip': function (options) {
		var currentTrip = App.views.tripEditorView.getRecord();
		if (App.stores.tripStore.findRecord('id', currentTrip.data.id)) {
			App.stores.tripStore.remove(currentTrip);
		}
		App.stores.tripStore.sync();
		App.views.tripListView.refreshList();
		App.views.tripView.setActiveItem(
			App.views.tripListView,
			{ type: 'slide', direction: 'right' }
		);
	},
	'canceledit': function (options) {
		App.views.tripView.setActiveItem(
			App.views.tripListView,
			{ type: 'slide', direction: 'right' }
		);
	}
});
App.controllers.tripController = Ext.ControllerManager.get('TripController');