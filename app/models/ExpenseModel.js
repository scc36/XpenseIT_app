Ext.regModel('ExpenseModel', {
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'date', type: 'date', dateFormat: 'c' },
        { name: 'amount', type: 'int' },
		{ name: 'category', type: 'string' },
        { name: 'description', type: 'string' }
    ],
	belongsTo: 'CategoryModel',
    validations: [
        { type: 'presence', field: 'id' },
        { type: 'presence', field: 'amount', message: 'Please enter an amount' }
    ]
});