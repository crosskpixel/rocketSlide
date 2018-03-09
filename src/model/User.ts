export default (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		uuid: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		username: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		email_auth: {
			type: Sequelize.BOOLEAN,
			allowNull: false
		}
	});
	return User;
}

export interface UserInterface {
	name: string,
	username: string,
	email: string,
	password: string,
	uuid:string,
	email_auth:Number
}