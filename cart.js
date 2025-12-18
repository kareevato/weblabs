import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../../redux/actions';
import { navCart, cartRemove, cartIncrease, cartDecrease, cartClear, getFilmDetails } from '../../services/api';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import './cart.css';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.items);

  React.useEffect(() => {
    navCart().catch(err => console.error('Nav cart error:', err));
  }, []);

  const handleRemove = async (item) => {
    try {
      await cartRemove(item.id);
      dispatch(removeFromCart(item));
    } catch (error) {
      console.error('Error removing from cart:', error);
      dispatch(removeFromCart(item));
    }
  };

  const handleIncrease = async (item) => {
    try {
      await cartIncrease(item.id);
      dispatch(increaseQuantity(item));
    } catch (error) {
      console.error('Error increasing quantity:', error);
      dispatch(increaseQuantity(item));
    }
  };

  const handleDecrease = async (item) => {
    try {
      await cartDecrease(item.id);
      dispatch(decreaseQuantity(item));
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      dispatch(decreaseQuantity(item));
    }
  };

  const handleClearCart = async () => {
    try {
      await cartClear();
      dispatch(clearCart());
    } catch (error) {
      console.error('Error clearing cart:', error);
      dispatch(clearCart());
    }
  };

  const handleViewMore = async (filmId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      await getFilmDetails(filmId);
      navigate(`/film/${filmId}`);
    } catch (error) {
      console.error('Error in view more:', error);
      navigate(`/film/${filmId}`);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h1>Кошик</h1>
        </div>
        <div className="empty-cart">
          <p>Ваш кошик порожній</p>
          <PrimaryButton onClick={() => window.location.href = '/catalog'}>
            Перейти до каталогу
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Кошик</h1>
        <PrimaryButton variant="secondary" onClick={handleClearCart}>
          Очистити кошик
        </PrimaryButton>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.quality || 720}`} className="cart-item">
            <div 
              className="cart-item-image"
              onClick={(e) => handleViewMore(item.id, e)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={item.image} 
                alt={item.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                }}
              />
            </div>
            <div className="cart-item-info">
              <h3 
                className="cart-item-title"
                onClick={(e) => handleViewMore(item.id, e)}
                style={{ cursor: 'pointer' }}
              >
                {item.name}
              </h3>
              <p className="cart-item-details">
                {item.genre} • {item.year} • ⭐ {item.rating}
              </p>
              {item.quality && (
                <p className="cart-item-quality">Якість: {item.quality}p</p>
              )}
              <p className="cart-item-price">Ціна: {item.price} грн</p>
            </div>
            <div className="cart-item-controls">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleDecrease(item)}
                >
                  −
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleIncrease(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                {(item.price * item.quantity).toFixed(2)} грн
              </div>
              <PrimaryButton 
                variant="secondary"
                onClick={() => handleRemove(item)}
              >
                Видалити
              </PrimaryButton>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Товарів:</span>
          <span>{totalItems}</span>
        </div>
        <div className="summary-row total">
          <span>Загалом:</span>
          <span>{totalPrice.toFixed(2)} грн</span>
        </div>
        <PrimaryButton variant="dark" className="checkout-btn">
          Оформити замовлення
        </PrimaryButton>
      </div>
    </div>
  );
}

