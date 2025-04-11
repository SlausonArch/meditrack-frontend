import { useEffect } from 'react';
import '../styles/styles.css';

function Login() {
  useEffect(() => {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    toggle?.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }, []);

  return (
    <div>
      <section className="auth-section">
        <div className="container">
          <div className="auth-container">
            <div className="auth-form-container">
              <h2>로그인</h2>
              <form className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">비밀번호</label>
                  <input type="password" id="password" name="password" required />
                </div>
                <div className="form-options">
                  <div className="remember-me">
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember">로그인 상태 유지</label>
                  </div>
                  <a href="/forgot-password" className="forgot-password">비밀번호를 잊으셨나요?</a>
                </div>
                <button type="submit" className="btn primary-btn full-width">로그인</button>
              </form>
              <div className="auth-divider">
                <span>또는</span>
              </div>
              <div className="social-login">
                <button className="btn social-btn kakao">
                  <i className="fas fa-comment"></i> 카카오로 로그인
                </button>
                <button className="btn social-btn naver">
                  <i className="fas fa-n"></i> 네이버로 로그인
                </button>
              </div>
              <div className="auth-footer">
                <p>계정이 없으신가요? <a href="/register">회원가입</a></p>
              </div>
            </div>
            <div className="auth-image">
              <img src="https://placehold.co/500x600" alt="로그인 이미지" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;