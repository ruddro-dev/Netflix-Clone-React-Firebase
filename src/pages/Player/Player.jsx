import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGMzMGI5ZTBiOWI3OThkNjQ2YzhjOTQzZjhiMzJjYiIsIm5iZiI6MTczMzM3ODM5NC45NTEsInN1YiI6IjY3NTE0MTVhYjFlYWE1Yzg5MWRhY2M0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._SxI3TtjbNp5IpVftxcW8RjJaOeDN89Mr8MhgnsZViI',
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.results && response.results.length > 0) {
          const firstResult = response.results[0];
          setApiData({
            name: firstResult.name || "",
            key: firstResult.key || "",
            published_at: firstResult.published_at || "",
            typeof: firstResult.type || "",
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={()=>{navigate(-2)}}/>
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title={apiData.name}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>Published Date: {apiData.published_at.slice(0,10)}</p>
        <p>Name: {apiData.name}</p>
        <p>Type: {apiData.typeof}</p>
      </div>
    </div>
  );
};

export default Player;
