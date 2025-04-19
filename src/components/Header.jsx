import { useEffect, useState } from 'react';
import '../styles/styles.css';

function Header() {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    toggle?.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // 로그인 상태 확인
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserName(storedName || '사용자');
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

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

        {/* 로그인 여부에 따라 다른 UI */}
        {userEmail ? (
          <div className="auth-buttons">
            <span className="welcome-message">👋 {userName}님<br /><small>{userEmail}</small></span>
            <button onClick={handleLogout} className="btn logout-btn">로그아웃</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <a href="/login" className="btn login-btn">로그인</a>
            <a href="/register" className="btn signup-btn">회원가입</a>
          </div>
        )}

        <div className="menu-toggle">
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
