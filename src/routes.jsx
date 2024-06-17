import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import AddCatalogue from './pages/AddCatalogue';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/add-catalogue',
		element: <AddCatalogue />,
	},
]);
