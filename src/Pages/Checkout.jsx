// نفس الاستيراد اللي عندك
import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase-config';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import Modal from 'react-modal';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FaBox, FaMoneyBillWave, FaShippingFast } from 'react-icons/fa';

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [Cart, setCart] = useState([]);
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [city, setCity] = useState('');
const [street, setStreet] = useState('');
const [buildingNumber, setBuildingNumber] = useState('');
const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchCartAndUser = async () => {
      if (!auth.currentUser) return;

      const cartRef = doc(db, 'carts', auth.currentUser.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const data = cartSnap.data();
        setCart(data.items || []);
      }

      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserName(userSnap.data().name || 'مستخدم');
      }
    };

    fetchCartAndUser();
  }, []);

  const totalPrice = Cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const confirmOrder = async () => {
    const orderData = {
      items: Cart,
      shippingAddress,
      paymentMethod,
      totalPrice,
      status: 'pending',
      date: new Date(),
      userId: auth.currentUser?.uid,
    };

    await addDoc(collection(db, "orders"), orderData);
    await setDoc(doc(db, "carts", auth.currentUser.uid), { items: [] });

    setOrderDetails(orderData);
    setShowModal(true);
    setOrderStatus('✅ تم تأكيد الطلب بنجاح');
  };

  const handleOrderConfirmation = async () => {
    try {
      if (paymentMethod === 'باي بال') return;
      await confirmOrder();
    } catch (error) {
      console.error('Error confirming order:', error);
      setOrderStatus('❌ حدث خطأ أثناء تأكيد الطلب');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCart([]);
    setShippingAddress('');
    setPaymentMethod('');
    setOrderStatus('');
    setOrderDetails(null);
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AYYZ7K01dJDuNCkkmP_1ERCyXFg-jn1i9R-LBBTGingn86o_2Mevt9Ea0GEkSPMc4Iv_5ARobu4wyeJQ", currency: "USD" }}>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 text-right font-sans">
      <div className="flex flex-col items-center space-y-4">

  {/* السلة */}
  <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100 w-full max-w-md">
    <h3 className="text-xl font-bold mb-3 text-[#006272] flex items-center gap-2 justify-end">
      المنتجات المختارة <FaBox className="text-[#006272]" />
    </h3>
    <ul className="space-y-2">
      {Cart.map((item) => (
        <li key={item.id} className="flex justify-between items-center bg-blue-50 rounded-lg p-2 text-sm shadow-sm">
          <div className="text-right">
            <p className="font-semibold text-[#004f59]">{item.title}</p>
            <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
          </div>
          <span className="font-bold text-green-700 text-sm">{item.price * item.quantity} جنيه</span>
        </li>
      ))}
    </ul>
    <div className="text-base font-bold mt-4 text-green-800 text-center">
      🧾 الإجمالي: {totalPrice} جنيه
    </div>
  </div>

{/* بيانات الشحن */}
<div className="bg-white p-4 rounded-xl shadow-md border border-blue-100 w-full max-w-md">
  <h3 className="text-xl font-bold mb-3 text-[#006272] flex items-center gap-2 justify-end">
    عنوان التوصيل <FaShippingFast className="text-[#006272]" />
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
    <input
      type="text"
      placeholder="اسم الشارع"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
    <input
      type="text"
      placeholder="المدينة"
      value={street}
      onChange={(e) => setStreet(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
    <input
      type="text"
      placeholder="رقم الموبايل"
      value={buildingNumber}
      onChange={(e) => setBuildingNumber(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
    <input
      type="tel"
      placeholder="رقم العقار"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  </div>

  <textarea
    value={shippingAddress}
    onChange={(e) => setShippingAddress(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-300"
    placeholder="تفاصيل إضافية (اختياري)"
  />
</div>

  {/* الدفع */}
  <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100 w-full max-w-md mb-20">
    <h3 className="text-xl font-bold mb-3 text-[#006272] flex items-center gap-2 justify-end">
      طريقة الدفع <FaMoneyBillWave className="text-[#006272]" />
    </h3>
    <select
      value={paymentMethod}
      onChange={(e) => setPaymentMethod(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-lg text-lg focus:outline-none text-right focus:ring-2 focus:ring-blue-300 "
    >
      <option value="">اختر طريقة الدفع</option>
      <option value="كاش عند الاستلام">كاش عند الاستلام</option>
      <option value="بطاقة ائتمانية">بطاقة ائتمانية</option>
      <option value="باي بال">باي بال</option>
    </select>
  </div>
</div>


        {/* زر تأكيد */}
        {paymentMethod === 'باي بال' ? (
          <div className="flex justify-center mt-4">
            <PayPalButtons
              style={{ layout: "vertical" }}
              forceReRender={[totalPrice]}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: { value: totalPrice.toString() },
                  }],
                });
              }}
              onApprove={async (data, actions) => {
                await actions.order.capture();
                await confirmOrder();
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                setOrderStatus("❌ حدث خطأ أثناء الدفع");
              }}
            />
          </div>
        ) : (
          <div className="flex justify-center mt-5">
            <button
              onClick={handleOrderConfirmation}
              className="bg-[#006272] hover:bg-[#004f59] text-white py-3 px-8 rounded-full text-lg transition duration-200"
            >
              تأكيد الطلب
            </button>
          </div>
        )}

        {/* المودال */}
        <Modal
  isOpen={showModal}
  onRequestClose={handleCloseModal}
  contentLabel="تفاصيل الطلب"
  className="bg-gradient-to-b from-white to-blue-50 max-w-2xl mx-auto mt-20 p-6 rounded-2xl shadow-2xl text-right text-sm animate-fade-in"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 backdrop-blur-sm"
>
  <div className="space-y-4">
    {/* العنوان */} 
    <div className="text-center text-[#006272]">
      <h2 className="text-2xl font-extrabold flex justify-center items-center gap-2">
        ✅ تم تأكيد الطلب
      </h2>
      <p className="text-sm mt-1 text-gray-600">شكرًا لطلبك! التفاصيل أدناه 👇</p>
    </div>

    {/* معلومات المستخدم والعنوان */}
    <div className="bg-white border rounded-lg p-4 shadow-sm space-y-2">
      <p>👤 <span className="font-semibold text-[#004f59]">الاسم:</span> {userName}</p>
      <p>🏙️ <span className="font-semibold text-[#004f59]">اسم الشارع:</span> {city}</p>
      <p>🛣️ <span className="font-semibold text-[#004f59]">المدينة :</span> {street}</p>
      <p>🏢 <span className="font-semibold text-[#004f59]">رقم الموبايل:</span> {buildingNumber}</p>
      <p>📱 <span className="font-semibold text-[#004f59]">رقم العقار:</span> {phone}</p>
      <p>📦 <span className="font-semibold text-[#004f59]">تفاصيل إضافية:</span> {orderDetails?.shippingAddress || 'لا يوجد'}</p>
      <p>💳 <span className="font-semibold text-[#004f59]">طريقة الدفع:</span> {orderDetails?.paymentMethod}</p>
      <p className="font-bold text-green-700 mt-2">🧾 الإجمالي: {orderDetails?.totalPrice} جنيه</p>
    </div>

    {/* المنتجات */}
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h4 className="font-semibold mb-2 text-[#004f59] flex items-center gap-1 justify-end">📦 المنتجات:</h4>
      <ul className="list-disc pr-4 space-y-1 text-sm text-gray-700">
        {orderDetails?.items?.map((item, index) => (
          <li key={index}>
            <span className="font-medium">{item.title}</span> - الكمية: {item.quantity} - السعر: <span className="text-green-700">{item.price * item.quantity} جنيه</span>
          </li>
        ))}
      </ul>
    </div>

    {/* زر الإغلاق */}
    <div className="text-center">
      <button
        onClick={handleCloseModal}
        className="bg-gradient-to-r from-[#006272] to-[#00a9a5] hover:opacity-90 text-white font-semibold py-2 px-8 rounded-full shadow-lg transition-all duration-200" >تم 
      </button>
    </div>
  </div>
</Modal>


      </div>
    </PayPalScriptProvider>
  );
}

export default Checkout;
