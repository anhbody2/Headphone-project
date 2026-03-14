import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Layout } from './components/layout/Layout';
import { AdminSkuPage } from './pages/AdminSkuPage';
import { Toaster } from 'react-hot-toast';
import ProductPage from './pages/ProductPage/ProductPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { CartPage } from './pages/CartPage/CartPage';
import PaymentPage from './pages/PaymentPage';
import { AdminProductPage } from './pages/AdminProductPage';
import { AdminOrderPage } from './pages/AdminOrderPage';
import { ChangePasswordPage } from './pages/changePasswordPage';
import { AdminRoute } from './components/layout/AdminRoute';
import { SeriesPage } from './pages/SeriesPage';
import { CombinedProfilePage } from './pages/AboutandContactPage';
import { DashboardOverview } from './pages/Dashboard';
export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />

            <Route element={<AdminRoute/>}>
            <Route path="/admin/skus" element={<AdminSkuPage />} />
            <Route path="/admin/products" element={<AdminProductPage />} />
            <Route path="/admin/orders" element={<AdminOrderPage />} />
            </Route>
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/users-profile" element={<UserProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/changePassword" element={<ChangePasswordPage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/about" element={<CombinedProfilePage />} />

            <Route path="/admin" element={<DashboardOverview />} />

          </Route>
        </Routes>
    </BrowserRouter>
  );
}
