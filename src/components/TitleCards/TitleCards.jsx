import { Link } from 'react-router-dom';
import './TitleCards.css';
import { useRef, useCallback, useEffect, useState } from 'react';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGMzMGI5ZTBiOWI3OThkNjQ2YzhjOTQzZjhiMzJjYiIsIm5iZiI6MTczMzM3ODM5NC45NTEsInN1YiI6IjY3NTE0MTVhYjFlYWE1Yzg5MWRhY2M0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._SxI3TtjbNp5IpVftxcW8RjJaOeDN89Mr8MhgnsZViI',
    },
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(
      `https://api.themoviedb.org/3/movie/${category || 'now_playing'}?language=en-US&page=1`,
      { ...options, signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => setApiData(data.results))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Failed to fetch data. Please try again later.');
        }
      });

    return () => controller.abort();
  }, [category]);

  const handleWheel = useCallback((event) => {
    event.preventDefault();
    const container = cardsRef.current;
    if (container) {
      container.scrollLeft += event.deltaY * 0.5;
    }
  }, []);

  return (
    <div className="titlecards">
      <h2>{title || 'Popular on Netflix'}</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="card-list" ref={cardsRef} onWheel={handleWheel}>
        {apiData.map((card) => (
          <Link to={`/player/${card.id}`} className="card" key={card.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt={card.original_title || 'Card image'}
            />
            <p>{card.original_title || 'Untitled'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
