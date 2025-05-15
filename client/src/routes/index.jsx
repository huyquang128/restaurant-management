import AddMenuCategory from '@/pages/admin/AddMenuCategory.jsx';
import AddProductItem from '@/pages/admin/AddProductItem';
import BookingSchedule from '@/pages/admin/BookingSchedule';
import Dashboard from '@/pages/admin/Dashboard';
import MenuAdmin from '@/pages/admin/MenuAdmin';
import ProductsAdmin from '@/pages/admin/ProductsAdmin';
import ResultSearchProducts from '@/pages/admin/ResultSearchProducts';
import SeatingChart from '@/pages/admin/SeatingChart';
import SelectedProductAdmin from '@/pages/admin/SelectedProductAdmin';
import SelectedTable from '@/pages/admin/SelectedTable';
import SetTable from '@/pages/admin/SetTable';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ProductDetail from '@/pages/product/productDetail';
import Home from '@/pages/User/Home';
import Menu from '@/pages/User/Menu';
import Cart from '@/pages/User/Cart';
import CheckOut from '@/pages/User/CheckOut';
import PaymentResult from '@/pages/User/PaymentResult';
import HistorySetTable from '@/pages/admin/HistorySetTable';
import OrderAdmin from '@/pages/admin/OrderAdmin';
import OrderCurrent from '@/pages/admin/OrderCurrent';
import OrderDetail from '@/pages/admin/OrderDetail';
import ComboAdmin from '@/pages/admin/ComboAdmin';
import AddCombo from '@/pages/admin/AddCombo';
import AccessControl from '@/pages/admin/AccessControl';
import StaffInner from '@/pages/admin/StaffInner';
import ListRole from '@/pages/admin/ListRole';
import ListUser from '@/pages/admin/ListUser';
import ManagementSystem from '@/pages/admin/ManagementSystem';
import ManagementSlideShow from '@/pages/admin/ManagementSlideShow';
import SettingAdmin from '@/pages/admin/settingAdmin';
import InfoCustomerDetail from '@/pages/admin/InfoCustomerDetail';
import ListStaff from '@/pages/admin/ListStaff';
import AddStaff from '@/pages/admin/addStaff';
import HistoryOrder from '@/pages/admin/HistoryOrder';
import MyDocumentBill from '@/components/common/MyDocumentBill';
import UnauthPage from '@/pages/UnauthPage';
import AddTable from '@/pages/admin/AddTable';
import ReviewAdmin from '@/pages/admin/ReviewAdmin';
import SlideShowDetail from '@/pages/admin/SlideShowDetail';
import Contact from '@/pages/User/Contact';
import ManagementMenu from '@/pages/admin/ManagementMenu';
import SpecialOffer from '@/pages/User/SpecialOffer';
import ManagementNew from '@/pages/admin/ManagementNew';
import ManagementSpecialOffer from '@/pages/admin/ManagementSpecialOffer';
import ManagementEvent from '@/pages/admin/ManagementEvent';
import AddSpecialOffer from '@/pages/admin/AddSpecialOffer';

const routerPublic = [
    { path: '', components: <Home /> },
    { path: '/menu', components: <Menu /> },
    { path: '/cart', components: <Cart /> },
    { path: '/special-offer', components: <SpecialOffer /> },
    { path: '/contact', components: <Contact /> },
    { path: '/payment-result', components: <PaymentResult /> },
    { path: '/cart/checkout', components: <CheckOut /> },
    { path: '/menu/:productName', components: <ProductDetail /> },
    { path: '/login', components: <Login />, layout: 'auth' },
    { path: '/register', components: <Register />, layout: 'auth' },
    { path: '/admin/dashboard', components: <Dashboard />, layout: 'admin' },
    { path: '/admin/reviews', components: <ReviewAdmin />, layout: 'admin' },
    { path: '/unauth-page', components: <UnauthPage /> },
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
    {
        path: '/admin/order/print/:orderId',
        components: <MyDocumentBill />,
        layout: 'admin',
    },

    //order menu and history order
    {
        path: '/admin/order',
        components: <OrderAdmin />,
        layout: 'admin',
        child: [
            {
                path: '/admin/order/order-existing',
                components: <OrderCurrent />,
                layout: 'admin',
            },
            {
                path: '/admin/order/history-order',
                components: <HistoryOrder />,
                layout: 'admin',
            },
        ],
    },

    {
        path: '/admin/order/history-order/:orderId',
        components: <OrderDetail />,
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
        child: [
            {
                path: '/admin/set-table/booking-schedule',
                components: <BookingSchedule />,
                layout: 'admin',
            },
            {
                path: '/admin/set-table/history-set-table',
                components: <HistorySetTable />,
                layout: 'admin',
            },
            {
                path: '/admin/set-table/seating-chart',
                components: <SeatingChart />,
                layout: 'admin',
            },
        ],
    },

    {
        path: '/admin/set-table/add-table',
        components: <AddTable />,
        layout: 'admin',
    },

    {
        path: '/admin/set-table/booking-schedule/select-table/:orderId',
        components: <SelectedTable />,
        layout: 'admin',
    },

    {
        path: '/admin/set-table/add-table/select-table',
        components: <SelectedTable />,
        layout: 'admin',
    },

    {
        path: '/admin/set-table/booking-schedule/select-product/:orderId',
        components: <SelectedProductAdmin />,
        layout: 'admin',
    },

    //combo dishes
    {
        path: '/admin/combo',
        components: <ComboAdmin />,
        layout: 'admin',
    },

    {
        path: '/admin/combo/add-combo',
        components: <AddCombo />,
        layout: 'admin',
    },
    {
        path: '/admin/combo/:slug',
        components: <AddCombo />,
        layout: 'admin',
    },

    //manage staff
    {
        path: '/admin/staff',
        components: <StaffInner />,
        layout: 'admin',
        child: [
            {
                path: '/admin/staff/list-staff',
                components: <ListStaff />,
                layout: 'admin',
            },
            {
                path: '/admin/staff/list-role',
                components: <ListRole />,
                layout: 'admin',
            },
        ],
    },

    {
        path: '/admin/staff/add-staff',
        components: <AddStaff />,
        layout: 'admin',
    },

    {
        path: '/admin/staff/list-staff/access-control/:name',
        components: <AccessControl />,
        layout: 'admin',
    },

    //list customer
    {
        path: '/admin/customer',
        components: <ListUser />,
        layout: 'admin',
    },

    {
        path: '/admin/customer/customer-detail/:username',
        components: <InfoCustomerDetail />,
        layout: 'admin',
    },

    // news admin
    {
        path: '/admin/management-news',
        components: <ManagementNew />,
        layout: 'admin',
        child: [
            {
                path: '/admin/management-news/special-offer',
                components: <ManagementSpecialOffer />,
                layout: 'admin',
            },
            {
                path: '/admin/management-news/event',
                components: <ManagementEvent />,
                layout: 'admin',
            },
        ],
    },

    {
        path: '/admin/management-news/special-offer/add-special-offer',
        components: <AddSpecialOffer />,
        layout: 'admin',
    },

    {
        path: '/admin/management-news/special-offer/:slug',
        components: <AddSpecialOffer />,
        layout: 'admin',
    },

    //manage system
    {
        path: '/admin/system',
        components: <ManagementSystem />,
        layout: 'admin',
        child: [
            {
                path: '/admin/system/management-slide-show',
                components: <ManagementSlideShow />,
                layout: 'admin',
            },
            {
                path: '/admin/system/management-menu-primary',
                components: <ManagementMenu />,
                layout: 'admin',
            },
        ],
    },

    {
        path: '/admin/system/management-slide-show/detail',
        components: <SlideShowDetail />,
        layout: 'admin',
    },

    //setting
    {
        path: '/admin/setting',
        components: <SettingAdmin />,
        layout: 'admin',
    },
];

export { routerPublic };
