import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase-config';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import Modal from 'react-modal';

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [Cart, setCart] = useState([]);
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

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
      setOrderDetails(orderData);
      setShowModal(true);
      setOrderStatus('✅ تم تأكيد الطلب بنجاح');
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

      <div className="flex justify-center">
        <button
          onClick={handleOrderConfirmation}
          className="bg-[#006272] hover:bg-[#004f59] text-white py-2 px-8 rounded-full transition duration-200"
        >
          تأكيد الطلب
        </button>
      </div>

      {/* ✅ البوب الخاص بتأكيد الطلب */}
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel="تفاصيل الطلب"
        className="bg-white max-w-xl mx-auto mt-20 p-8 rounded-2xl shadow-lg text-right"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#006272]">✅ تم تأكيد الطلب بنجاح</h2>
        <p className="mb-2">👤 اسم المستخدم: {userName}</p>
        <p className="mb-2">📍 العنوان: {orderDetails?.shippingAddress}</p>
        <p className="mb-2">💳 طريقة الدفع: {orderDetails?.paymentMethod}</p>
        <p className="mb-4 font-bold text-green-700">🧾 إجمالي السعر: {orderDetails?.totalPrice} جنيه</p>

        <h4 className="font-semibold mb-2">📦 المنتجات:</h4>
        <ul className="list-disc pr-4 space-y-1 mb-4">
          {orderDetails?.items?.map((item, index) => (
            <li key={index}>
              {item.title} - الكمية: {item.quantity} - السعر: {item.price * item.quantity} جنيه
            </li>
          ))}
        </ul>

        <div className="text-center">
          <button
            onClick={handleCloseModal}
            className="bg-[#006272] hover:bg-[#004f59] text-white py-2 px-6 rounded-full"
          >
            تم
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Checkout;
