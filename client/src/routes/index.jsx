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
];

export { routerPublic };
