
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProductListing from './components/ProductListing';
import Customizer from './components/Customizer';
import Cart from './components/Cart';
import ProductMockup from './components/ProductMockup';
import { Product, Customization, CartItem, Category, Order, User } from './types';

const TIME_SLOTS = [
  '11:00 AM', '12:00 PM', '01:00 PM', 
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { id: 'apple', label: 'Apple Pay', icon: '🍎' }
];

const App: React.FC = () => {
  const [currentView, setView] = useState('splash');
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phone: '',
    isLoggedIn: false,
  });
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Get fixed date: exactly 2 days from now
  const getFixedDate = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    return targetDate.toISOString().split('T')[0];
  };

  const [checkoutData, setCheckoutData] = useState({
    method: 'Delivery' as 'Delivery' | 'Pickup',
    date: getFixedDate(), // Forced to 2 days
    time: '',
    address: '',
    paymentMethod: 'card'
  });

  useEffect(() => {
    if (currentView === 'splash') {
      const timer = setTimeout(() => {
        setView('home'); 
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, isLoggedIn: true });
    setView('checkout_final');
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView('customize');
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setView('products');
  };

  const addToCart = (customization: Customization, quantity: number) => {
    if (!selectedProduct) return;
    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productImage: selectedProduct.image,
      customization,
      quantity,
      totalPrice: (selectedProduct.basePrice * quantity) + (customization.text ? 5 : 0) + (customization.image ? 10 : 0),
    };
    setCart([...cart, newItem]);
    setView('cart');
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const startCheckout = () => {
    if (cart.length === 0) return;
    if (!user.isLoggedIn) {
      setView('checkout_auth');
    } else {
      setView('checkout_final');
    }
  };

  const handleCheckout = () => {
    if (!checkoutData.time) {
      alert("Please select a valid time slot.");
      return;
    }
    const newOrder: Order = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      date: new Date().toLocaleDateString(),
      deliveryDate: checkoutData.date,
      deliveryTime: checkoutData.time,
      status: 'Order Placed',
      total: cart.reduce((acc, item) => acc + item.totalPrice, 0) + (checkoutData.method === 'Delivery' ? 5.99 : 0),
      items: [...cart],
      deliveryMethod: checkoutData.method,
      paymentMethod: checkoutData.paymentMethod
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setView('orders');
  };

  const renderView = () => {
    if (currentView === 'splash') {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-[#57A6A1] text-white">
          <div className="w-24 h-24 bg-white/20 rounded-[2.5rem] flex items-center justify-center text-5xl mb-6 shadow-2xl animate-bounce">🎨</div>
          <h1 className="text-4xl font-poppins font-black tracking-tighter uppercase">Customify</h1>
          <p className="mt-2 text-white/70 font-bold uppercase tracking-[0.2em] text-[10px]">Uniquely Yours</p>
        </div>
      );
    }

    if (currentView === 'checkout_auth') {
      return (
        <div className="h-full p-8 flex flex-col justify-center bg-white overflow-y-auto no-scrollbar">
          <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-[#57A6A1]/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🔐</div>
            <h2 className="text-3xl font-poppins font-bold text-gray-800 mb-2">Final Step</h2>
            <p className="text-gray-400 font-medium">Please sign in to place your order.</p>
          </div>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <input 
              type="text" placeholder="Full Name" required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#57A6A1]"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input 
              type="email" placeholder="Email Address" required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#57A6A1]"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input 
              type="tel" placeholder="Phone Number" required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#57A6A1]"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
            <button className="w-full py-4 bg-[#57A6A1] text-white rounded-2xl font-bold shadow-xl shadow-[#57A6A1]/30 mt-6 active:scale-95 transition-all">
              Sign In & Continue
            </button>
          </form>
          <button onClick={() => setView('cart')} className="mt-4 text-center text-gray-400 font-bold text-sm">Back to Cart</button>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <Home 
            onCategorySelect={handleCategorySelect} 
            onExploreProducts={() => setView('products')} 
            onSelectProduct={handleProductSelect}
          />
        );
      case 'products':
        return <ProductListing onSelectProduct={handleProductSelect} filterCategory={selectedCategory} />;
      case 'customize':
        return selectedProduct ? <Customizer product={selectedProduct} onAddToCart={addToCart} onBack={() => setView('products')} /> : null;
      case 'cart':
        return <Cart items={cart} onRemove={removeFromCart} onCheckout={startCheckout} />;
      case 'checkout_final':
        return (
          <div className="p-6 pb-24 space-y-8 bg-white h-full overflow-y-auto no-scrollbar">
            <div className="space-y-6">
              <h3 className="font-poppins font-bold text-2xl text-gray-800">Final Details</h3>
              
              <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl">
                {(['Delivery', 'Pickup'] as const).map(m => (
                  <button 
                    key={m}
                    onClick={() => setCheckoutData({...checkoutData, method: m})}
                    className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase transition-all ${checkoutData.method === m ? 'bg-white text-[#57A6A1] shadow-sm' : 'text-gray-400'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Guaranteed Ready Date</label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🗓️</span>
                  <div>
                    <span className="text-lg font-poppins font-black text-[#57A6A1]">{new Date(checkoutData.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Fixed 2-Day Production Turnaround</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time Window (11 AM - 5 PM)</label>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map(t => (
                    <button 
                      key={t}
                      onClick={() => setCheckoutData({...checkoutData, time: t})}
                      className={`py-3 rounded-xl border font-bold text-xs transition-all ${checkoutData.time === t ? 'border-[#57A6A1] bg-[#57A6A1]/5 text-[#57A6A1]' : 'border-gray-100 text-gray-400'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment Method</label>
                {PAYMENT_METHODS.map(pm => (
                  <button 
                    key={pm.id}
                    onClick={() => setCheckoutData({...checkoutData, paymentMethod: pm.id})}
                    className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all ${checkoutData.paymentMethod === pm.id ? 'border-[#57A6A1] bg-[#57A6A1]/5' : 'border-gray-100 text-gray-600'}`}
                  >
                    <span className="text-xl">{pm.icon}</span>
                    <span className="font-bold text-sm">{pm.label}</span>
                    {checkoutData.paymentMethod === pm.id && <span className="ml-auto text-[#57A6A1]">✓</span>}
                  </button>
                ))}
              </div>

              {checkoutData.method === 'Delivery' && (
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivery Address</label>
                  <textarea 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#57A6A1]"
                    rows={2} placeholder="Street, City, Zip Code"
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                  />
                </div>
              )}
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full py-5 bg-[#57A6A1] text-white rounded-[2rem] font-bold text-lg shadow-2xl shadow-[#57A6A1]/40 active:scale-95 transition-all"
            >
              Confirm & Pay ${(cart.reduce((a, b) => a + b.totalPrice, 0) + (checkoutData.method === 'Delivery' ? 5.99 : 0)).toFixed(2)}
            </button>
          </div>
        );
      case 'orders':
        return (
          <div className="p-6 pb-24 space-y-6 h-full overflow-y-auto no-scrollbar">
            <h3 className="font-poppins font-bold text-2xl text-gray-800">Your Orders</h3>
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                <span className="text-6xl mb-4">📦</span>
                <p className="font-bold uppercase tracking-widest text-xs">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Ref</p>
                        <h4 className="font-black text-xl text-gray-800 tracking-tight">#{order.id}</h4>
                      </div>
                      <div className="bg-[#57A6A1]/10 text-[#57A6A1] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {order.status}
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center bg-gray-50/50 p-3 rounded-[1.5rem] border border-gray-50">
                          <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                            <ProductMockup productId={item.productId} customization={item.customization} className="scale-125" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-bold text-[11px] text-gray-800">{item.productName}</h5>
                            <p className="text-[9px] text-gray-400 uppercase font-bold">{item.quantity} Unit(s) • {item.customization.side}</p>
                          </div>
                          <span className="font-bold text-xs text-gray-800">${item.totalPrice.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Ready By</p>
                        <p className="text-xs font-bold text-gray-700">{order.deliveryDate} @ {order.deliveryTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Grand Total</p>
                        <span className="font-poppins font-black text-xl text-[#57A6A1]">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-white relative flex flex-col shadow-2xl overflow-hidden">
      {currentView !== 'splash' && currentView !== 'customize' && currentView !== 'checkout_auth' && (
        <Header 
          title={currentView === 'products' ? (selectedCategory || 'Shop') : currentView} 
          showBack={currentView === 'products' && selectedCategory !== undefined}
          onBack={() => {
            if (currentView === 'products') setSelectedCategory(undefined);
          }}
        />
      )}
      
      <main className="flex-1 overflow-hidden relative">
        {renderView()}
      </main>

      {['home', 'products', 'cart', 'orders'].includes(currentView) && (
        <Navigation currentView={currentView} setView={setView} cartCount={cart.length} />
      )}
    </div>
  );
};

export default App;
