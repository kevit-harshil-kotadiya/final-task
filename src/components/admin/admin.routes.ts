import { Router } from 'express';
// import authorization from '../../utils/auth';
import AdminController from './admin.controller';

class AdminRouter {
	public router: Router;

	userController = new AdminController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {

		this.router.post('/adduser', this.userController.adduser);

		// List Users
		// this.router.get('/',  this.userController.getUsers);

		// Update User
		// this.router.patch(
		// 	'/update',
			
		// 	this.userController.updateUser,
		// );

		// Delete User
		// this.router.delete(
		// 	'/delete',
			
		// 	this.userController.deleteUser,
		// );

		// Login User
		// this.router.post('/login', this.userController.loginUser);

		// Logout User
		// this.router.put(
		// 	'/logout',
			
		// 	this.userController.logoutUser,
		// );
	}
}

export default new AdminRouter().router;