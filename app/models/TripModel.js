Ext.regModel('TripModel', {
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'start_date', type: 'date', dateFormat: 'c' },
		{ name: 'end_date', type: 'date', dateFormat: 'c' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' }
    ],
	hasMany: 'ExpenseModel',
    validations: [
        { type: 'presence', field: 'id' },
        { type: 'presence', field: 'name', message: 'Please enter a name for this trip' }
    ]
});

App.stores.tripStore = new Ext.data.Store({
	id: 'tripStore',
    sorters: [{
        property: 'date',
        direction: 'DESC'
    }],
    proxy: {
        type: 'localstorage',
        id: 'trip-app-store'
    },
    getGroupString: function (record) {
        if (record && record.data.date) {
            return record.get('date').toDateString();
        } else {
            return '';
        }
    }
});