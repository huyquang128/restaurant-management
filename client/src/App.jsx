import { Routes, Route } from 'react-router';
import { routerPublic } from './routes';
import HomeLayout from './pages/User/HomeLayout';
import AuthLayout from './pages/auth/AuthLayout';

function App() {
    return (
        <Routes>
            {routerPublic.map((route, index) => {
                let LayoutCommon;

                if (route.layout === 'auth') {
                    LayoutCommon = <AuthLayout />;
                } else {
                    LayoutCommon = <HomeLayout />;
                }

                return (
                    <Route key={index} path={route.path} element={LayoutCommon}>
                        <Route
                            path={route.path}
                            index
                            element={route.components}
                        />
                    </Route>
                );
            })}
        </Routes>
        // <Route exact path="/" component={Home} />
    );
}

export default App;
