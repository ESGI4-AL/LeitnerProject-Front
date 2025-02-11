import './HomePage.css';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="title-container">
        <h1>Leitner Quiz</h1>
      </div>
      <div className='quiz-container'>
        <button className='quiz-button'  onClick={() => navigate("/quiz")}>Today's Quiz</button>
      </div>
    </div>
  )
}

export default HomePage;
