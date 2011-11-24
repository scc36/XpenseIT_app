Ext.regStore('TripStore', {
    model: 'TripModel',
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
App.stores.tripStore = Ext.StoreMgr.get('TripStore');