import bcrypt = require('bcrypt');
import mongoose from 'mongoose';
// import HttpException from '../../utils/error.utils';

const { Schema, model } = mongoose;
/**
 * User Schema for DB
 */
const userSchema = new Schema({
	firstName: {
		type: Schema.Types.String,
		required: true,
	},
	lastName: {
		type: Schema.Types.String,
		required: true,
	},
	emailId: {
		type: Schema.Types.String,
		required: true,
		unique: true,
	},
	password: {
		type: Schema.Types.String,
		required: true,
	},
	authToken: {
		type: Schema.Types.String,
	},
	orgId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
});
// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
	try {
		if (this.isModified('password')) {
			this.password = await bcrypt.hash(this.password, 10);
		}
		next();
	} catch (err) {
		// throw new HttpException(
		// 	500,
		// 	err.message,
		// 	'CREATE_USER_UNHANDLED_IN_DB',
		// 	err,
		// );
	}
});
const User = model('User', userSchema);
export default User;