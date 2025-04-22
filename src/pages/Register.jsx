import { useState } from 'react';
import '../styles/styles.css';

function MyPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false); // 현재 비밀번호 확인 여부
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isPasswordMatch, setIsPasswordMatch] = useState(true); // 비밀번호 확인 일치 여부

  // 현재 비밀번호 입력 처리
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  // 정보 수정 필드 입력 처리
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // 새 비밀번호와 확인 비밀번호 교차검증
    if (name === 'newPassword' || name === 'confirmPassword') {
      setIsPasswordMatch(formData.newPassword === formData.confirmPassword);
    }
  };

  // 현재 비밀번호 확인 처리
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 확인 로직
    if (currentPassword === 'abc123') {  // 실제 비밀번호로 교체해야 합니다.
      setIsPasswordValid(true); // 비밀번호 확인 성공
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  // 정보 수정 처리 (서버로 전송 등)
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // 여기에 서버로 데이터 전송하는 로직 추가
    if (!isPasswordMatch) {
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log('Updated Data:', formData);
    alert('회원 정보가 수정되었습니다.');
  };

  return (
    <div className="dashboard-layout">
      <main className="main-content">
        <div className="content-body">
          <div className="card">
            <div className="card-header">
              <h3>회원 정보 수정</h3>
            </div>
            <div className="card-body">
              {/* 현재 비밀번호 입력 폼 */}
              {!isPasswordValid ? (
                <form className="profile-form" onSubmit={handlePasswordSubmit}>
                  <div className="form-group">
                    <label htmlFor="currentPassword">현재 비밀번호</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={currentPassword}
                      onChange={handleCurrentPasswordChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn primary-btn">
                    비밀번호 확인
                  </button>
                </form>
              ) : (
                // 현재 비밀번호가 맞으면 정보 수정 폼 표시
                <form className="profile-form" onSubmit={handleUpdateSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">이름</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">나이</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleFormChange}
                      required
                      min="1"
                      max="120"
                    />
                  </div>
                  <div className="form-group">
                    <label>성별</label>
                    <div className="gender-options">
                      <label className="gender-option">
                        <input
                          type="radio"
                          name="gender"
                          value="M"
                          checked={formData.gender === "M"}
                          onChange={handleFormChange}
                          required
                        />
                        남자
                      </label>
                      <label className="gender-option">
                        <input
                          type="radio"
                          name="gender"
                          value="F"
                          checked={formData.gender === "F"}
                          onChange={handleFormChange}
                          required
                        />
                        여자
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">새 비밀번호</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleFormChange}
                      placeholder="새 비밀번호 입력"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">새 비밀번호 확인</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleFormChange}
                      placeholder="새 비밀번호 확인"
                    />
                    {!isPasswordMatch && <p className="error-text">비밀번호가 일치하지 않습니다.</p>}
                  </div>
                  <button type="submit" className="btn primary-btn">
                    정보 수정
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyPage;
