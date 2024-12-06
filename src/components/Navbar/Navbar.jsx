import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { useEffect, useRef, useState } from 'react';
import { logout } from '../../firebase';

const Navbar = () => {
  const navref = useRef();
  const [menuOpen, setMenuOpen] = useState(false); // State for burger menu toggle
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navref.current.classList.add('nav-dark');
      } else {
        navref.current.classList.remove('nav-dark');
      }
    });
  }, []);

  return (
    <div ref={navref} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul className={menuOpen ? 'active' : ''}>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>

      {/* Navbar-right section */}
      <div className={`navbar-right ${menuOpen ? 'active' : ''}`}>
        <img src={search_icon} alt="" className='icons' />
        <p>Children</p>
        <img src={bell_icon} alt="" className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p onClick={() => { logout() }}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>

      {/* Burger Button */}
      <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>
    </div>
  );
}

export default Navbar;
