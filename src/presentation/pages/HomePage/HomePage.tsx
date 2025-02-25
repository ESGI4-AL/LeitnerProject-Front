import './HomePage.css';
import { useNavigate } from "react-router-dom";
import Button from '../../components/shared/Button/Button';
import { signInWithGoogle } from './auth.service';

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log('Utilisateur connecté:', user);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="title-container">
        <h1 className='title'>Leitner Quiz</h1>
      </div>
      <div className='quiz-container'>
        <Button onClick={() => navigate("/quiz")}>
          Today's Quiz
        </Button>
        <Button onClick={handleGoogleLogin} className="google-login-btn">
          Se connecter avec Google
        </Button>
      </div>
    </div>
  )
}

export default HomePage;