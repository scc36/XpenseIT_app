App.views.CategoryListView = Ext.extend(Ext.Panel, {
    categoryStore: Ext.emptyFn,
    categoryList: Ext.emptyFn,
    layout: 'fit',
    initComponent: function () {
        this.newButton = new Ext.Button({
            text: 'New',
            ui: 'action',
            handler: this.onNewCategory,
            scope: this
        });
        this.topToolbar = new Ext.Toolbar({
            title: 'My Categories',
            items: [
                { xtype: 'spacer' },
                this.newButton
            ]
        });
        this.dockedItems = [this.topToolbar];
        this.categoryList = new Ext.List({
            store: this.categoryStore,
            grouped: true,
            emptyText: '<div style="margin:5px;">No category cached.</div>',
            onItemDisclosure: true,
            itemTpl: '<div class="list-item-title">{title}</div>' +
                            '<div class="list-item-narrative">{description}</div>'
        });
        this.categoryList.on('disclose', function (record, index, evt) {
            this.onEditCategory(record, index);
        }, this),
        this.items = [this.categoryList];
        App.views.CategoryListView.superclass.initComponent.call(this);
    },
    onNewCategory: function () {
        Ext.dispatch({
            controller: App.controllers.categoryController,
            action: 'newcategory'
        });
    },
    onEditCategory: function (record, index) {
        Ext.dispatch({
            controller: App.controllers.categoryController,
            action: 'editcategory',
            category: record
        });
    },
    refreshList: function () {
        this.categoryList.refresh();
    }
});