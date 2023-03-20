const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
	id: { type: DataTypes.INTEGER },
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	createdAt: {
		type: DataTypes.STRING
	},
	updatedAt: {
		type: DataTypes.STRING
	}
});

module.exports = User;
