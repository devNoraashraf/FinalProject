import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase-config';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [Cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!auth.currentUser) return;

      const cartRef = doc(db, 'carts', auth.currentUser.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const data = cartSnap.data();
        setCart(data.items || []);
      }
    };

    fetchCart();
  }, []);

  const totalPrice = Cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrderConfirmation = async () => {
    try {
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

      setOrderStatus('✅ تم تأكيد الطلب بنجاح');
      setCart([]);
    } catch (error) {
      console.error('Error confirming order:', error);
      setOrderStatus('❌ حدث خطأ أثناء تأكيد الطلب');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-right">
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h3 className="text-2xl font-bold mb-4 text-[#006272]">🛒 تفاصيل السلة</h3>
        <ul className="divide-y">
          {Cart.map((item) => (
            <li key={item.id} className="py-3 flex justify-between items-center">
              <span className="font-medium">{item.title} ({item.quantity})</span>
              <span className="text-gray-700">{item.price * item.quantity} جنيه</span>
            </li>
          ))}
        </ul>
        <div className="text-lg font-bold mt-4 text-green-700">
          إجمالي السعر: {totalPrice} جنيه
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h3 className="text-2xl font-bold mb-4 text-[#006272]">📦 بيانات الشحن</h3>
        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-right"
          placeholder="أدخل عنوان الشحن"
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h3 className="text-2xl font-bold mb-4 text-[#006272]">💳 طريقة الدفع</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-right"
        >
          <option value="">اختر طريقة الدفع</option>
          <option value="كاش عند الاستلام">كاش عند الاستلام</option>
          <option value="بطاقة ائتمانية">بطاقة ائتمانية</option>
          <option value="باي بال">باي بال</option>
        </select>
      </div>

      {paymentMethod === 'باي بال' ? (
        <PayPalScriptProvider options={{ "client-id": "AYYZ7K01dJDuNCkkmP_1ERCyXFg-jn1i9R-LBBTGingn86o_2Mevt9Ea0GEkSPMc4Iv_5ARobu4wyeJQ", currency: "USD" }}>
          <div className="flex justify-center mt-5">
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
                handleOrderConfirmation();
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                setOrderStatus("❌ حدث خطأ أثناء الدفع");
              }}
            />
          </div>
        </PayPalScriptProvider>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={handleOrderConfirmation}
            className="bg-[#006272] hover:bg-[#004f59] text-white py-2 px-8 rounded-full transition duration-200"
          >
            تأكيد الطلب
          </button>
        </div>
      )}

      {orderStatus && (
        <div className="mt-6 text-center text-lg font-semibold text-green-600">
          {orderStatus}
        </div>
      )}
    </div>
  );
}

export default Checkout;
