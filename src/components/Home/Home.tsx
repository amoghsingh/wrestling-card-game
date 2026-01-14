import { Link } from "react-router-dom";
import "./style.scss";


const Home = () => {
  
  return (
    <>
      <div className="bg"></div>
      <div className="home-text">
        <p>It's time to play the Game..</p>
      
        <div>
          <Link to="/dashboard">Start Game</Link>
        </div>
        </div>
    </>
  );
};

export default Home;
