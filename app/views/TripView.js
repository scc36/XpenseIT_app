App.views.TripView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function () {
        Ext.apply(App.views, {
            tripListView: new App.views.TripListView({ tripStore: App.stores.tripStore }),
            tripEditorView: new App.views.TripEditorView()
        });
        this.items = [
            App.views.tripListView,
            App.views.tripEditorView
        ]
        App.views.TripView.superclass.initComponent.call(this);
        this.on('render', function () {
            App.stores.tripStore.load();
        });
    }
});