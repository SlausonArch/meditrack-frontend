import { useEffect } from 'react';
import '../styles/styles.css';

function Lens() {
  useEffect(() => {
    const scanBtn = document.querySelector('.scan-btn');
    if (scanBtn) {
      scanBtn.addEventListener('click', () => {
        alert('카메라 스캔 기능은 추후 구현 예정입니다.');
      });
    }
  }, []);

  return (
    <div className="dashboard-layout">
      <main className="main-content">
        <header className="content-header">
          <button className="sidebar-toggle">
            <i className="fas fa-bars"></i>
          </button>
          <h1>약품 스캔</h1>
          <div className="header-actions">
            <button className="btn icon-btn"><i className="fas fa-bell"></i></button>
            <button className="btn icon-btn"><i className="fas fa-cog"></i></button>
          </div>
        </header>

        <div className="content-body">
          <div className="card">
            <div className="card-header">
              <h3>카메라로 약품 스캔</h3>
            </div>
            <div className="card-body scan-body">
              <div className="scan-preview">
                <img src="https://placehold.co/300x300" alt="약품 스캔 프리뷰" />
              </div>
              <div className="scan-instruction">
                <p>약품의 포장이나 라벨을 카메라에 비춰주세요.</p>
                <button className="btn primary-btn scan-btn">스캔 시작</button>
              </div>
            </div>
          </div>

          <div className="card scanned-results">
            <div className="card-header">
              <h3>스캔된 약품 정보</h3>
            </div>
            <div className="card-body">
              <div className="scanned-item">
                <h4>타이레놀 500mg</h4>
                <p>진통, 해열 효과가 있으며 일반의약품입니다.</p>
                <div className="scanned-tags">
                  <span className="tag safe">안전</span>
                  <span className="tag">진통제</span>
                </div>
              </div>
              <div className="scanned-actions">
                <button className="btn text-btn">상세정보</button>
                <button className="btn primary-btn small-btn">복용 추가</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Lens;