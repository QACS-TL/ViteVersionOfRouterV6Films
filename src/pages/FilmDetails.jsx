import {useState, useEffect, useCallback} from 'react';
import { Route, Routes, useParams, useNavigate,  Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Promotions from './Promotions';
import { GETFILMBYID } from '../config/urls';

const filmDetails = GETFILMBYID;

const FilmDetails = () => {
  const [selectedFilm, setSelectedFilm] = useState([]);
  const [viewPromotions, setViewPromotions] = useState(false);
  const [showButton, setShowButton] = useState(true);


  const navigate = useNavigate();
  const { id } = useParams()

  //SEE COMMENTS IN Promotions file for explanation of commented out code
  // function importAll(r) {
  //   let images = {};
  //   r.keys().forEach((item, index) => { images[item.replace('../images', '')] = r(item); });
  //   console.log(images)
  //   return images
  // }
  
  // const images = importAll(require.context('../images', false, /\.(jpe?g)$/));
  const toggleButton = () => {
    setShowButton(!showButton);
  };

  const getFilm = useCallback (
    async () => {
      let response;

    try {  
      //id is passed as a parameter on the end of the url. This
      //has been retrieved with the code on line 10:
      // const { id } = useParams()//);
      response =  await fetch(`${filmDetails}`);
    }
    catch (error) {
      console.log(error);
    }
    //console.log(response.status)
    if (response.status === 200) {
      const films =  await response.json();
      const film = films.find(film => film.id === id);
      //console.log(film)
      setSelectedFilm(film)
    }
    }, [],
  )

  useEffect(() => {
    //Replaces to CDM and CDU
    setTimeout(() => {
      getFilm(); //getFilm is an async function
    }, 200);
  }, []);

  return (
    <div className="content">
      <div className="product">
        <div className="image">
          <img src={('/' + selectedFilm.image)} alt={selectedFilm.title} width="400"  />
          {/* OLD CLUMSY approach to retrieveing appropriate image file from images folder */}
          {/* <img src={(images["./" + selectedFilm.image])} alt={selectedFilm.title} width="400" /> */}
        </div>
        <div className="details">
          <h1><a href={selectedFilm.url}>{selectedFilm.title}</a></h1>
          <h2>Synopsis</h2>
          <p>{selectedFilm.synopsis}</p>
          <h2>Review</h2>
          <p>{selectedFilm.review}</p>
          <br />
          <br />
        </div>
      </div>
        {showButton && <Button as={Link} to="promotions"
          onClick={(e) => {setShowButton(!showButton);  }}>
             See Promotions
          </Button>}
        {!showButton && <Button as={Link} to=""
            onClick={(e) => {setShowButton(!showButton);  }}>
            Remove Promotions
          </Button>}
      <Routes>
        <Route path="/promotions" element={<Promotions />} />
      </Routes>
    </div>
  )
}

export default FilmDetails
