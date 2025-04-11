import '../styles/styles.css';

function MyPage() {
  return (
    <div className="dashboard-layout">
      <main className="main-content">
        <div className="content-body">
          <div className="card">
            <div className="card-header">
              <h3>회원 정보</h3>
            </div>
            <div className="card-body">
              <form className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">이름</label>
                  <input type="text" id="name" name="name" defaultValue="홍길동" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <input type="email" id="email" name="email" defaultValue="hong@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">비밀번호</label>
                  <input type="password" id="password" name="password" placeholder="새 비밀번호 입력" />
                </div>
                <button type="submit" className="btn primary-btn">정보 수정</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyPage;