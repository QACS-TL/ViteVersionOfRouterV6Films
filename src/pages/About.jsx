import { Route, Routes, useNavigate } from "react-router-dom"
//import 'bootstrap/dist/css/bootstrap.min.css';

// nested routes
import Promotions from "./Promotions"

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="content">
      <h2>About Us</h2>
      <p>Wonkymotion are an established (since spring 2020) film studios that specialise in stop motion animation.</p>
      
      <p>The company is based in Kent and offers free studio tours to those who are brave enough to venture so far out into the sticks.
        Note: Due to public demand, tours must be pre-booked via the usual channels. The lead time is currently running at 
        six to seven years.
      </p>

      <p>Blah, blah, blah...</p>


      <button onClick={() => navigate('/films')}>See our products</button>

      <Routes>
        <Route path="/promotions" element={<Promotions />} />
      </Routes>
    </div>
  )
}

export default About
