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
                .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
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
        navigate('/checkout');
    };

    if (loading) {
        return <p className="text-center text-gray-500 mt-10">جارٍ تحميل السلة...</p>;
    }

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold text-[#006272] mb-6 text-center">🛒 سلة المشتريات</h2>
    
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">السلة فارغة</p>
                ) : (
                    <div className="space-y-6">
                        {cart.map(item => (
                            <div
                                key={item.id}
                                className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-lg transition"
                            >
                                {/* صورة ومعلومات الدواء */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold text-[#004D4D]">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.type}</p>
                                        <p className="text-sm text-gray-700 mt-1">السعر: {item.price} جنيه</p>
                                    </div>
                                </div>
    
                                {/* الكمية + الإجمالي + الحذف */}
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full md:w-auto">
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-200 text-gray-700 px-2 rounded hover:bg-gray-300">-</button>
                                        <span className="text-lg font-bold text-[#006272]">{item.quantity}</span>
                                        <button onClick={() => increaseQuantity(item.id)} className="bg-gray-200 text-gray-700 px-2 rounded hover:bg-gray-300">+</button>
                                    </div>
                                    <div className="text-sm font-semibold text-[#004D4D] whitespace-nowrap">
                                        الإجمالي: {item.price * item.quantity} جنيه
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 text-xl"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        ))}
    
                        <div className="mt-6 text-right">
                            <h3 className="text-xl font-bold text-[#006272]">
                                💰 إجمالي السعر: {calculateTotal()} جنيه
                            </h3>
                        </div>
    
                        <div className="flex justify-end">
                            <button
                                onClick={handleCheckout}
                                className="bg-[#006272] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#008080] transition text-lg">
                                تأكيد الشراء
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default Cart;
