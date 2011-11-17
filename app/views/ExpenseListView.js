App.views.ExpenseListView = Ext.extend(Ext.Panel, {
    expenseStore: Ext.emptyFn,
    expenseList: Ext.emptyFn,
    layout: 'fit',
    initComponent: function () {
        this.newButton = new Ext.Button({
            text: 'New',
            ui: 'action',
            handler: this.onNewExpense,
            scope: this
        });
        this.topToolbar = new Ext.Toolbar({
            title: 'My Expenses',
            items: [
                { xtype: 'spacer' },
                this.newButton
            ]
        });
        this.dockedItems = [this.topToolbar];
        this.expenseList = new Ext.List({
            store: this.expenseStore,
            grouped: true,
            emptyText: '<div style="margin:5px;">No expense cached.</div>',
            onItemDisclosure: true,
            itemTpl: '<div class="list-item-title">{amount}</div>' +
                            '<div class="list-item-narrative">{description}</div>'
        });
        this.expenseList.on('disclose', function (record, index, evt) {
            this.onEditExpense(record, index);
        }, this),
        this.items = [this.expenseList];
        App.views.ExpenseListView.superclass.initComponent.call(this);
    },
    onNewExpense: function () {
        Ext.dispatch({
            controller: App.controllers.expenseController,
            action: 'newexpense'
        });
    },
    onEditExpense: function (record, index) {
        Ext.dispatch({
            controller: App.controllers.expenseController,
            action: 'editexpense',
            expense: record
        });
    },
    refreshList: function () {
        this.expenseList.refresh();
    }
});