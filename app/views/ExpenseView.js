﻿App.views.ExpenseView = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function () {
        Ext.apply(App.views, {
            expenseListView: new App.views.ExpenseListView({ expenseStore: App.stores.expenseStore }),
            expenseEditorView: new App.views.ExpenseEditorView()
        });
        this.items = [
            App.views.expenseListView,
            App.views.expenseEditorView
        ]
        App.views.ExpenseView.superclass.initComponent.call(this);
        this.on('render', function () {
            App.stores.expenseStore.load();
        });
    }
});