import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocumentBill from './components/common/MyDocumentBill';
import ScrollToTop from './components/ScrollToTop';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ScrollToTop />
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
                <ToastContainer />
            </PersistGate>
        </Provider>
    </BrowserRouter>
);
