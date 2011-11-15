App.views.CategoryView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function () {
        Ext.apply(App.views, {
            categoryListView: new App.views.CategoryListView({ categoryStore: App.stores.categoryStore }),
            categoryEditorView: new App.views.CategoryEditorView()
        });
        this.items = [
            App.views.categoryListView,
            App.views.categoryEditorView
        ]
        App.views.CategoryView.superclass.initComponent.call(this);
        this.on('render', function () {
            App.stores.categoryStore.load();
        });
    }
});