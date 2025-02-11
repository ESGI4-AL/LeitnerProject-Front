import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage'
import AddCardPage from './pages/AddCardPage/AddCardPage';
import ViewCardsPage from './pages/ViewCardsPage/ViewCardsPage';
import backgroundImg from './assets/img/background.jpg'
import QuizPage from './pages/QuizPage/QuizPage';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <img className="background-img" src={backgroundImg} alt="Background image"></img>
        <div className="overlay"></div>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-card" element={<AddCardPage />} />
            <Route path="/view-cards" element={<ViewCardsPage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
