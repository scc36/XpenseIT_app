App.views.MenuView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function () {
        Ext.apply(App.views, {
            indexView: new App.views.IndexView(),
            aboutView: new App.views.AboutView()
        });
        this.items = [
            App.views.indexView,
            App.views.aboutView
        ]
        App.views.MenuView.superclass.initComponent.call(this);
    }
});