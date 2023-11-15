import {useState, useEffect, useCallback} from 'react';
import { GETPROMOTIONS } from '../config/urls';
//import.meta.glob('*',{ eager: true });
//import dynamicImport from 'vite-plugin-import-context'

const promotionDetails = GETPROMOTIONS

const Promotions = () => {
  const [films, setFilms] = useState([])

  //OLD CLUMSY STRATEGY TO RETRIEVE IMAGES FROM images folder
  //BY CREATING DICTIONARY WITH KEYS (name of image file) and 
  //VALUES (name of dynamically loaded image file)
  //The importAll function and line that declares the images const
  //Can safely be commented out
  // function importAll(r) {
  //   let images = {};
    
  //   r.keys().forEach((item, index) => { images[item.replace('../images/promotions', '')] = r(item); });
  //   //console.log(images)
  //   return images
  // }
  
  //context is a special feature supported by webpack's compiler that allows 
  //you to get all matching modules starting from some base directory. 
  //It allows you to pass in a directory to search, 
  //a flag indicating whether subdirectories should be searched too, 
  //and a regular expression to match files against.
  //The intention is to tell webpack at compile time to transform that expression 
  //into a dynamic list of all the possible matching module requests that it can resolve, 
  //in turn adding them as build dependencies and allowing you to require them at runtime.

  //The following worked with a create-react-app build but failed under vite
  //const images = importAll(require.context('../images/promotions', false, /\.(jpe?g)$/));
  //Vite solution (also means the importAll function defined in the file is redundant and doesn't work)
  const images = import.meta.glob('../images/promotions/*.jpg');
 
 
 
 
  const getFilms = useCallback (
    async () => {
      let response;

    try {  
       response = await fetch(`${promotionDetails}`);
    }
    catch (error) {
      console.log(error);
    }

    if (response.status === 200) {
      const returnedFilms = await response.json();
      //console.log({returnedFilms})
      setFilms(returnedFilms)
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
    <div>
      <h1>Latest Promotions</h1>
      <div className="promotions">
        {films.map(item => (
          <div key={item.title}>
            {/* 
            OLD CLUMSY approach to retrieving appropriate image file from images/promotions folder
            <img src={(images[item.image])} alt={item.title} width="200" /> 
            */}
            {/* Simpler approach pulling the images from the public/promotions folder */}
            <img src={('/promotions/' + item.image)} alt={item.title} width="200"  />
            <p />
            <h4><a href={item.url}>{item.title}</a></h4>
            <p>{item.synopsis}</p>
            <p>{item.review}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Promotions
