import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import backgroundImg from './shared/assets/img/background.jpg'
import Navbar from './presentation/components/Navbar/Navbar';
import { AppRoutes } from './presentation/routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <img className="background-img" src={backgroundImg} alt="Background image"></img>
        <div className="overlay"></div>
        <Navbar />
        <div className="content">
          <AppRoutes />
        </div>
      </div>
    </Router>
  )
}

export default App
