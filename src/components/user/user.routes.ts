// import { Router } from 'express';
// import authorization from '../../utils/auth';
// import UserController from './user.controller';

// class UsersRoute {
// 	public router: Router;

// 	userController = new UserController();

// 	constructor() {
// 		this.router = Router();
// 		this.initializeRoutes();
// 	}

// 	initializeRoutes() {
// 		// Sign Up
// 		this.router.post('/signup', this.userController.createUsers);

// 		// List Users
// 		this.router.get('/', authorization, this.userController.getUsers);

// 		// Update User
// 		this.router.patch(
// 			'/update',
// 			authorization,
// 			this.userController.updateUser,
// 		);

// 		// Delete User
// 		this.router.delete(
// 			'/delete',
// 			authorization,
// 			this.userController.deleteUser,
// 		);

// 		// Login User
// 		this.router.post('/login', this.userController.loginUser);

// 		// Logout User
// 		this.router.put(
// 			'/logout',
// 			authorization,
// 			this.userController.logoutUser,
// 		);
// 	}
// }

// export default new UsersRoute().router;
