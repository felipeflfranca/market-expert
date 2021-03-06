import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Products from '../views/products/list';
import Product from '../views/products';
import ProductType from '../views/product-type';
import ProductTypes from '../views/product-type/list';
import Report from '../views/reports';
import Tax from 'views/taxes';
import Taxes from 'views/taxes/list';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/list/products',
            element: <Products />
        },
        {
            path: '/product',
            element: <Product />
        },
        {
            path: '/product/:id',
            element: <Product />
        },
        {
            path: '/list/taxes',
            element: <Taxes />
        },
        {
            path: '/tax',
            element: <Tax />
        },
        {
            path: '/tax/:id',
            element: <Tax />
        },
        {
            path: '/list/product/types',
            element: <ProductTypes />
        },
        {
            path: '/product/type',
            element: <ProductType />
        },
        {
            path: '/product/type/:id',
            element: <ProductType />
        },
        {
            path: '/report',
            element: <Report />
        }
    ]
};

export default MainRoutes;
