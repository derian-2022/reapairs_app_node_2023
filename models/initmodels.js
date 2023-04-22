const User = require('./users.model')
const Repair = require('./reapir.model.js')
const initModel = () => {

User.hasMany(Repair);
Repair.belongsTo(User)
}



module.exports = initModel;