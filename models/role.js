const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  rol: {
    type    : String,
    required: [true, 'El rol en requirdo']
  }
});


module.exports = model('Role', RoleSchema);