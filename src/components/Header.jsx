import { useEffect } from 'react';
import '../styles/styles.css';

function Header() {
  useEffect(() => {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    toggle?.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }, []);

  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1><a href="/">MediTrack</a></h1>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="/">홈</a></li>
            <li><a href="/symptom-search">증상 검색</a></li>
            <li><a href="/otc-meds">상비약 구비</a></li>
            <li><a href="/interaction-check">상호작용 확인</a></li>
            <li><a href="/lens">약품 스캔</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <a href="/login" className="btn login-btn">로그인</a>
          <a href="/register" className="btn signup-btn">회원가입</a>
        </div>
        <div className="menu-toggle">
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;