import './HomePage.css';
import { useNavigate } from "react-router-dom";
import Button from '../../components/shared/Button/Button';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="title-container">
        <h1 className='title'>Leitner Quiz</h1>
      </div>
      <div className='quiz-container'>
        <Button onClick={() => navigate("/quiz")}>
          Today's Quiz
        </Button >
      </div>
    </div>
  )
}

export default HomePage;
