Ext.regModel('ExpenseModel', {
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'date', type: 'date', dateFormat: 'c' },
        { name: 'amount', type: 'int' },
        { name: 'description', type: 'string' }
    ],
	belongsTo: 'CategoryModel',
    validations: [
        { type: 'presence', field: 'id' },
        { type: 'presence', field: 'among', message: 'Please enter an amount.' }
    ]
});