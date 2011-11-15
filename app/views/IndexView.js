App.views.IndexView = Ext.extend(Ext.Panel, {
	layout: 'fit',
	initComponent: function () {
		this.topToolbar = new Ext.Toolbar({
            title: 'XpenseIT',
        });
		this.dockedItems = [this.topToolbar];
		App.views.IndexView.superclass.initComponent.call(this);
	},
	items: [{
		xtype: 'button',
		name: 'newexpense',
		text: 'Add New Expense',
	}, {
		xtype: 'button',
		name: 'expense',
		text: 'View Existing Entries',
	}, {
		xtype: 'button',
		name: 'category',
		text: 'Modify Categories',
	}, {
		xtype: 'button',
		name: 'about',
		text: 'About Expense Tracker',
	}]
});