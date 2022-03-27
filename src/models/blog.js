require('dotenv').config()
const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')
const currentYear = new Date().getFullYear()
const yearErrorMsg = `Year must be between 1991 and ${currentYear}`
class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      min: {
        args: 1991,
        msg: yearErrorMsg
      },
      max: {
        args: currentYear,
        msg: yearErrorMsg
      },
    },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blogs'
});

module.exports = Blog