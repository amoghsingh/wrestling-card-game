import { Link } from "react-router-dom";
import "./style.scss";


const Home = () => {
  
  return (
    <>
      <div className="bg" style={{
    backgroundImage: `url(${import.meta.env.BASE_URL}/images/logo.png)`,
  }}></div>
      <div className="home-text">
        <p>It's time to play the Game...</p>
      
        <div>
          <Link to="/dashboard" className="glow">Start Game</Link>
        </div>
        </div>
    </>
  );
};

export default Home;
