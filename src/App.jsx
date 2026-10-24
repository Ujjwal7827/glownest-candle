import { Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppButton from './components/WhatsAppButton';
import NewsletterForm from './components/NewsletterForm';
import ScrollToTop from './components/ScrollToTop';
import { useCart } from './context/CartContext';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Hampers from './pages/Hampers';
import BestSellers from './pages/BestSellers';
import Under99 from './pages/Under99';
import GiftCombos from './pages/Gifts';
import GiftBuilder from './pages/GiftBuilder';
import BulkOrders from './pages/BulkOrders';
import About from './pages/About';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import CandleCare from './pages/CandleCare';
import Contact from './pages/Contact';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsPolicy from './pages/ReturnsPolicy';
import CancellationPolicy from './pages/CancellationPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';

export default function App() {
  const { toast } = useCart();
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/hampers" element={<Hampers />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/under-99" element={<Under99 />} />
          <Route path="/gifts" element={<GiftCombos />} />
          <Route path="/gifts/build" element={<GiftBuilder />} />
          <Route path="/bulk-orders" element={<BulkOrders />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/candle-care" element={<CandleCare />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/returns-refunds" element={<ReturnsPolicy />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      <NewsletterForm />
      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </>
  );
}
