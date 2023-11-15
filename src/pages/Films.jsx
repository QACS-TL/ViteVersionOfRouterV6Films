import { Link } from "react-router-dom"
import {useState, useEffect, useCallback} from 'react';
import { GETALLFILMS } from "../config/urls";

//SEE COMMENTS IN Promotions file for explanation of commented out code
// function importAll(r) {
// 	let images = {};
//   r.keys().forEach((item, index) => { images[item.replace('../images/', '')] = r(item); });
//   delete images["./WonkyMotionLogo.jpg"]
// 	return images
// }

// const images = importAll(require.context('../images', false, /\.(jpe?g)$/));
const films = GETALLFILMS; 


const Films = () => {
  const [allfilms, setAllFilms] = useState([])

  const getFilms = useCallback (
    async () => {
      let response;
  
    try {  
       response = await fetch(`${films}`);
    }
    catch (error) {
      console.log(error);
    }
  
    if (response.status === 200) {
      const returnedFilms = await response.json();
      //console.log({returnedFilms})
      setAllFilms(returnedFilms)
    }
  }, [],
  );

  useEffect(() => {
    //Replaces to CDM and CDU
   setTimeout(() => {
      getFilms();
    }, 200);
  }, []);

  return (
    <div className="content">
      <h3>Wonkymotion Films</h3>
      <div className="films">
      {allfilms.map(item => (
          <div key={item.title}>
            {/* <img src={(images[item.image])} alt={item.title} height="100px" /> */}
            <img src={('/' + item.image)} alt={item.title} height="150px"  />
            <Link to={`/films/id/${[item.id]}`}>
              <h5>{item.title.length > 22 ? item.title.substring(0,22) + "...": item.title}</h5>
            </Link>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Films