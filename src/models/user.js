const { Model, DataTypes, Op } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  defaultScope: {
    where: {[Op.or]: [{ disabled: false }, { disabled: null }]}
  },
  scopes: {
    include_disabled: {
      where: { }
    }
  },
  sequelize,
  timestamps: true,
  underscored: true,
  modelName: 'users'
})

module.exports = User