Ext.regModel('TripModel', {
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'start_date', type: 'date', dateFormat: 'c' },
		{ name: 'end_date', type: 'date', dateFormat: 'c' },
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' }
    ],
	hasMany: 'ExpenseModel',
    validations: [
        { type: 'presence', field: 'id' },
        { type: 'presence', field: 'name', message: 'Please enter a name for this trip' }
    ]
});