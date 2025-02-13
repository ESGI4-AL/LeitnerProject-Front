import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className='navbar-items'>
          <Link to="/">Home</Link>
          <Link to="/add-card">Add Card</Link>
          <Link to="/view-cards">View Cards</Link>
          <Link to="/quiz">Today's Quiz</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;
