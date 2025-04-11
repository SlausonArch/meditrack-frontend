import { useEffect } from 'react';
import '../styles/styles.css';

function Register() {
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
              <h2>회원가입</h2>
              <form className="auth-form">
                <div className="form-group">
                  <label htmlFor="name">이름</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">비밀번호</label>
                  <input type="password" id="password" name="password" required />
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">비밀번호 확인</label>
                  <input type="password" id="confirm-password" name="confirm-password" required />
                </div>
                <button type="submit" className="btn primary-btn full-width">회원가입</button>
              </form>
              <div className="auth-divider">
                <span>또는</span>
              </div>
              <div className="social-login">
                <button className="btn social-btn kakao">
                  <i className="fas fa-comment"></i> 카카오로 가입하기
                </button>
                <button className="btn social-btn naver">
                  <i className="fas fa-n"></i> 네이버로 가입하기
                </button>
              </div>
              <div className="auth-footer">
                <p>이미 계정이 있으신가요? <a href="/login">로그인</a></p>
              </div>
            </div>
            <div className="auth-image">
              <img src="https://placehold.co/500x600" alt="회원가입 이미지" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;