App.views.TripListView = Ext.extend(Ext.Panel, {
    tripStore: Ext.emptyFn,
    tripList: Ext.emptyFn,
    layout: 'fit',
    initComponent: function () {
        this.newButton = new Ext.Button({
            text: 'New',
            ui: 'action',
            handler: this.onNewTrip,
            scope: this
        });
        this.topToolbar = new Ext.Toolbar({
            title: 'My Trips',
            items: [
                { xtype: 'spacer' },
                this.newButton
            ]
        });
        this.dockedItems = [this.topToolbar];
        this.tripList = new Ext.List({
            store: this.tripStore,
            grouped: true,
            emptyText: '<div style="margin:5px;">No trip cached.</div>',
            onItemDisclosure: true,
            itemTpl: '<div class="list-item-title">{name}</div>' +
                            '<div class="list-item-narrative">{description}</div>'
        });
        this.tripList.on('disclose', function (record, index, evt) {
            this.onEditTrip(record, index);
        }, this),
        this.items = [this.tripList];
        App.views.TripListView.superclass.initComponent.call(this);
    },
    onNewTrip: function () {
        Ext.dispatch({
            controller: App.controllers.tripController,
            action: 'newtrip'
        });
    },
    onEditTrip: function (record, index) {
        Ext.dispatch({
            controller: App.controllers.tripController,
            action: 'edittrip',
            trip: record
        });
    },
    refreshList: function () {
        this.tripList.refresh();
    }
});