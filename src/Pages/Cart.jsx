import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            if (!auth.currentUser) {
                setLoading(false);
                return;
            }
            const cartRef = doc(db, 'carts', auth.currentUser.uid);
            const cartDoc = await getDoc(cartRef);
            if (cartDoc.exists()) {
                setCart(cartDoc.data().items);
            } else {
                setCart([]);
            }
            setLoading(false);
        };

        fetchCart();
    }, []);

    const updateCartInFirestore = async (newCart) => {
        if (!auth.currentUser) return;
        const cartRef = doc(db, 'carts', auth.currentUser.uid);
        await setDoc(cartRef, { items: newCart });
    };

    const decreaseQuantity = (id) => {
        setCart(prevCart => {
            const updatedCart = prevCart
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0);

            updateCartInFirestore(updatedCart);
            return updatedCart;
        });
    };

    const increaseQuantity = (id) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );

            updateCartInFirestore(updatedCart);
            return updatedCart;
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(item => item.id !== id);
            updateCartInFirestore(updatedCart);
            return updatedCart;
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        // توجيه المستخدم إلى صفحة الدفع
        navigate('/checkout');
    };

    if (loading) {
        return <p className="text-center">جاري تحميل السلة...</p>;
    }

    return (
        <div className="px-10 mt-5 mb-5">
            {/* محتوى السلة */}
            {cart.length === 0 ? (
                <p className="text-center text-[#006272]">السلة فارغة</p>
            ) : (
                <div className="space-y-6">
                    {/* عرض الأدوية */}
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded-lg shadow-md">
                            <div className="flex items-center gap-4">
                                <img src={item.img} alt={item.title} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                                <div>
                                    <h4 className="text-xl font-semibold text-[#006272]">{item.title}</h4>
                                    <p className="text-[#006272]">{item.type}</p>
                                    <p className="text-[#006272]">السعر: {item.price} جنيه</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button onClick={() => decreaseQuantity(item.id)} className="text-white px-2 py-1 rounded-lg shadow-md">➖</button>
                                <span className="text-lg font-semibold text-[#006272]">{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item.id)} className="text-white px-2 py-1 rounded-lg shadow-md">➕</button>
                                <button onClick={() => removeFromCart(item.id)} className="bg-red-600 text-white px-2 py-1 rounded-lg shadow-md">❌</button>
                            </div>

                            <div className="text-[#006272] font-semibold">
                                إجمالي السعر: {item.price * item.quantity} جنيه
                            </div>
                        </div>
                    ))}

                    {/* إجمالي السعر */}
                    <div className="mt-5 text-right">
                        <h3 className="text-lg font-semibold text-[#006272]">إجمالي السعر: {calculateTotal()} جنيه</h3>
                    </div>

                    {/* زر تأكيد الشراء */}
                    <div className="mt-5 flex justify-end">
                        <button onClick={handleCheckout} className="bg-[#006272] text-white px-6 py-2 text-lg rounded-lg shadow-lg hover:bg-[#008080] transition">
                            تأكيد الشراء
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
