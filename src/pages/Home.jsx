import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="content">
      <h1>WonkyMotion Films</h1>
      <p>If you want to see and read about some of the worlds best films you've come to the right place</p> 
      {/* <img src={require('../images/WonkyMotionLogo.jpg')} alt="Wonkymotion Logo" /> */}
      <p>WonkyMotion is a small independent film company based in Kent. Although small, they certainly punch above their weight and have released a number of classic films that have receieved acclaim and plaudits from some of the world's most respected critics. Some say Wonkymotion should have swept the board in the last couple of Oscar seasons...Blah, Blah, Blah...</p>

      <button className="" onClick={() => navigate('/redirect')}>Redirect Me</button>

    </div>
  )
}

export default Home
