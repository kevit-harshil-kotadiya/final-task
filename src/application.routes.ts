import { Application } from 'express';
// import AdminRoutes from './components/admin/admin.routes';
// import UserRoutes from './components/user/user.routes';
import IndexRoute from './index';

export default class ApplicationConfig {
	public static registerRoute(app: Application) {
		app.use('/', IndexRoute);
		// app.use('/users', UserRoutes);
		// app.use('/admin', AdminRoutes);
	}
}