import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFilms } from '../../contexts/FilmsContext';
import { goBack, addToCart as addToCartAPI } from '../../services/api';
import { addToCart } from '../../redux/actions';
import PrimaryButton from '../../components/PrimaryButton/primaryButton';
import Select from '../../components/Select/select';
import Spinner from '../../components/Spinner/spinner';
import './item.css';

const qualityMultipliers = {
  720: 1.0,
  1080: 1.3,
  1440: 1.6,
  2160: 2.0
};

const availableQualities = [
  { value: 720, label: '720p' },
  { value: 1080, label: '1080p' },
  { value: 1440, label: '1440p' },
  { value: 2160, label: '4K (2160p)' }
];

export default function Item() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getFilmById } = useFilms();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState(720);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const calculateBasePrice = (currentPrice, currentQuality) => {
    const multiplier = qualityMultipliers[currentQuality] || 1.0;
    return currentPrice / multiplier;
  };

  
  const calculatePriceForQuality = (basePrice, quality) => {
    const multiplier = qualityMultipliers[quality] || 1.0;
    return Math.round(basePrice * multiplier);
  };

  useEffect(() => {
    const loadFilm = async () => {
      try {
        setLoading(true);
        const filmData = await getFilmById(id);
        setFilm(filmData);
        const initialQuality = filmData.quality || 720;
        setSelectedQuality(initialQuality);
        const basePrice = calculateBasePrice(filmData.price, initialQuality);
        const initialPrice = calculatePriceForQuality(basePrice, initialQuality);
        setCalculatedPrice(initialPrice);
      } catch (error) {
        console.error('Error loading film:', error);
        setFilm(null);
      } finally {
        setLoading(false);
      }
    };

    loadFilm();
  }, [id, getFilmById]);

  useEffect(() => {
    if (film) {
      const basePrice = calculateBasePrice(film.price, film.quality || 720);
      const newPrice = calculatePriceForQuality(basePrice, selectedQuality);
      setCalculatedPrice(newPrice);
    }
  }, [film, selectedQuality]);

  if (loading) {
    return <Spinner />;
  }

  if (!film) {
    return (
      <div className="item-page">
        <div className="error-message">
          <p>Фільм не знайдено</p>
          <PrimaryButton onClick={() => navigate('/catalog')}>
            Повернутися до каталогу
          </PrimaryButton>
        </div>
      </div>
    );
  }

  const characteristics = [
    `Жанр: ${film.genre}`,
    `Рік: ${film.year}`
  ];

  const handleGoBack = async () => {
    try {
      await goBack();
      navigate('/catalog');
    } catch (error) {
      console.error('Error in go back:', error);
      navigate('/catalog');
    }
  };

  const handleQualityChange = (e) => {
    const newQuality = parseInt(e.target.value);
    setSelectedQuality(newQuality);
  };

  const handleAddToCart = async () => {
    try {
      await addToCartAPI(film.id);
      const filmWithQuality = {
        ...film,
        quality: selectedQuality,
        price: calculatedPrice
      };
      dispatch(addToCart(filmWithQuality));
    } catch (error) {
      console.error('Error adding to cart:', error);
      const filmWithQuality = {
        ...film,
        quality: selectedQuality,
        price: calculatedPrice
      };
      dispatch(addToCart(filmWithQuality));
    }
  };

  return (
    <div className="item-page">
      <div className="item-content">
        <div className="item-image-section">
          <img 
            src={film.image} 
            alt={film.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x700?text=No+Image';
            }}
          />
        </div>
        <div className="item-info-section">
          <div className="characteristics">
            {characteristics.map((char, index) => (
              <span key={index} className={`characteristic ${index === 0 ? 'dark' : 'teal'}`}>
                {index + 1} {char.split(':')[0]}
              </span>
            ))}
          </div>
          
          <h1 className="item-title">{film.name}</h1>
          
          <p className="item-description">
            {film.genre} фільм {film.year} року. Тривалість: {film.duration} хвилин. 
            Рейтинг: ⭐ {film.rating}. Переглянуто {film.views.toLocaleString()} разів.
          </p>
          
          <div className="item-quality-selector">
            <label htmlFor="quality-select" className="quality-label">
              Оберіть якість:
            </label>
            <Select
              id="quality-select"
              value={selectedQuality}
              onChange={handleQualityChange}
              options={availableQualities}
              className="quality-select"
            />
          </div>
          
          <div className="item-price">
            Ціна: {calculatedPrice} грн
          </div>
          
          <div className="item-actions">
            <PrimaryButton 
              variant="secondary" 
              onClick={handleGoBack}
            >
              Go back
            </PrimaryButton>
            <PrimaryButton 
              variant="dark"
              onClick={handleAddToCart}
            >
              Add to cart
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}


