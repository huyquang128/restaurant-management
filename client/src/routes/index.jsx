import AddMenuCategory from '@/pages/admin/AddMenuCategory.jsx';
import AddProductItem from '@/pages/admin/AddProductItem';
import Dashboard from '@/pages/admin/Dashboard';
import MenuAdmin from '@/pages/admin/MenuAdmin';
import ProductsAdmin from '@/pages/admin/ProductsAdmin';
import ResultSearchProducts from '@/pages/admin/ResultSearchProducts';
import SetTable from '@/pages/admin/SetTable';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ProductDetail from '@/pages/product/productDetail';
import Home from '@/pages/User/Home';
import Menu from '@/pages/User/Menu';

const routerPublic = [
    { path: '', components: <Home /> },
    { path: '/thực-đơn', components: <Menu /> },
    { path: '/thực-đơn/:productName', components: <ProductDetail /> },
    { path: '/login', components: <Login />, layout: 'auth' },
    { path: '/register', components: <Register />, layout: 'auth' },
    { path: '/admin/dashboard', components: <Dashboard />, layout: 'admin' },
    {
        path: '/admin/product-items',
        components: <ProductsAdmin />,
        layout: 'admin',
    },
    {
        path: '/admin/search',
        components: <ResultSearchProducts />,
        layout: 'admin',
    },
    {
        path: '/admin/product-items/add-product',
        components: <AddProductItem />,
        layout: 'admin',
    },
    {
        path: '/admin/product-items/:slug',
        components: <AddProductItem />,
        layout: 'admin',
    },

    //menu admin
    {
        path: '/admin/menus',
        components: <MenuAdmin />,
        layout: 'admin',
    },
    {
        path: '/admin/menus/add-menus',
        components: <AddMenuCategory />,
        layout: 'admin',
    },
    {
        path: '/admin/menus/:slug',
        components: <AddMenuCategory />,
        layout: 'admin',
    },
    //set table
    {
        path: '/admin/set-table',
        components: <SetTable />,
        layout: 'admin',
    },
];

export { routerPublic };
