﻿Ext.regModel('ExpenseModel', {
    idProperty: 'id',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'date', type: 'date', dateFormat: 'c' },
        { name: 'title', type: 'string' },
        { name: 'narrative', type: 'string' }
    ],
	belongsTo : 'CategoryModel',
    validations: [
        { type: 'presence', field: 'id' },
        { type: 'presence', field: 'title', message: 'Please enter a title for this note.' }
    ]
});