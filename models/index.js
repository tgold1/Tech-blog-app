const User = require('./User');
const Blogpost = require('./Blogpost');

User.hasMany(Blogpost, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});

Blogpost.belongsTo(User, {
  foreignKey: 'id'
});

module.exports = { User, Blogpost };
