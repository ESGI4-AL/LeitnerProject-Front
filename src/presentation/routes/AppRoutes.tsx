import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import AddCardPage from '../pages/AddCardPage/AddCardPage';
import ViewCardsPage from '../pages/ViewCardsPage/ViewCardsPage';
import QuizPage from '../pages/QuizPage/QuizPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/add-card" element={<AddCardPage />} />
    <Route path="/view-cards" element={<ViewCardsPage />} />
    <Route path="/quiz" element={<QuizPage />} />
  </Routes>
);
