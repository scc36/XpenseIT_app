App.models.ExpenseModel = new Ext.regModel('ExpenseModel', {
	idProperty: 'id',
	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'remote_id', type: 'int' },
		{ name: 'synced', type: 'boolean' },
		{ name: 'amount', type: 'int' },
		{ name: 'category', type: 'string' },
		{ name: 'description', type: 'string' },
		{ name: 'date', type: 'date', dateFormat: 'c' },
		{ name: 'mileage', type: 'int' },
		{ name: 'image', type: 'blob' },
	],
	validations: [
		{ type: 'presence', field: 'id' },
		{ type: 'presence', field: 'amount', message: 'Please enter an amount' }
	],
	sorters: [{
        property: 'date',
        direction: 'DESC'
    }],
	proxy: {
		type: 'scripttag',
		id: 'expenses.json',
		url: 'http://xpenseit-webdemo.herokuapp.com/expenses.json',
		reader: new Ext.data.JsonReader({
		}),
		writer: {
			type: 'json',
			record: 'expense'
		},
	},
	getGroupString: function (record) {
        if (record && record.data.date) {
            return record.get('date').toDateString();
        } else {
            return '';
        }
    }
});

App.stores.localExpenses = new Ext.data.Store({
    model: 'ExpenseModel',
    sorters: [{
        property: 'date',
        direction: 'ASC'
    }],
    proxy: {
        type: 'localstorage',
        id: 'expenses'
    },
    getGroupString: function (record) {
        if (record && record.data.date) {
            return record.get('date').toDateString();
        } else {
            return '';
        }
    }
});

App.stores.remoteExpenses = new Ext.data.Store({
	id: 'remoateExpenses',
	model: 'ExpenseModel',
	proxy: {
		type: 'scripttag',
		id: 'expenses.json',
		url: 'http://xpenseit-webdemo.herokuapp.com/expenses.json',
		reader: new Ext.data.JsonReader({
		}),
		writer: {
			type: 'json',
			record: 'expense'
		},
	},
});

App.models.synchronizeLocalToRemote = function () {
	if(!navigator.onLine) {
		Ext.Msg.alert('Offline', 'You need to be online to sync to the web server');
		return;
	}

	var localStore = App.stores.localExpenses.load();
	var syncArray = getDataToSync(localStore);
	var count = syncArray.length;
	if(count == 0) {
		Ext.Msg.show({
			title: 'Synced',
			msg: 'All expenses are synced'
		});
		return;
	}
	var syncInfo = "";
	//console.log("Number of items to sync: " + count);

	// Show the syncing spinner
	var mask = new Ext.LoadMask(Ext.getBody(), {msg: "Synchronizing"});
	mask.show();

	// Sync items to remote
	for(var i = 0; i < count; i++) {
		console.log("Index: " + i);
		form = syncArray[i];
		var syncModel = Ext.ModelMgr.create(form.data, 'ExpenseModel');
		// Calling save on the model calls the remote proxy
		syncModel.save({
			success: function(result, request) {
				var id = result.data['id']
				console.log("Result ID: " + id);
				console.log("Success");
				form.set('remote_id', id);
				form.set('synced', true);
				localStore.sync();
				syncInfo = 'Success: ' + form.get('amount') + ' has been synced<br />';
			},
			failure: function(result, request) {
				console.log("Exception");
				console.log("Result: " + request.responseText);
				syncInfo = 'Failed: ' + form.get('amount') + ' has not been synced<br />';
			},
			callback: function(result, request) {
				console.log(syncInfo);
				if(i >= count - 1) {
					mask.hide();
					Ext.Msg.show({
						title: 'Complete',
						msg: syncInfo
					});
				}
			}
		});
	}
	mask.hide();
	Ext.Msg.show({
		title: 'Sync Complete',
		msg: syncInfo
	});
}

var getDataToSync = function(store) {
	var syncArray = new Array();
	store.each( function(form, index) {
		var isSynced = form.get('synced');
		if (!isSynced) {
			syncArray.push(form);
		}
	});
	return syncArray
}