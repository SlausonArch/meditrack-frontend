import { useEffect } from 'react';
import '../styles/styles.css';

function SymptomSearch() {
  useEffect(() => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.getAttribute('data-tab');
        tabContents.forEach((content) => {
          content.classList.remove('active');
        });
        document.getElementById(target).classList.add('active');
      });
    });
  }, []);

  return (
    <div className="dashboard-layout">
      {/* 사이드바 및 기타 공통 컴포넌트는 생략 */}

      <main className="main-content">
        <header className="content-header">
          <button className="sidebar-toggle">
            <i className="fas fa-bars"></i>
          </button>
          <h1>증상 검색</h1>
          <div className="header-actions">
            <button className="btn icon-btn"><i className="fas fa-bell"></i></button>
            <button className="btn icon-btn"><i className="fas fa-cog"></i></button>
          </div>
        </header>

        <div className="content-body">
          <div className="search-tabs">
            <button className="tab-btn active" data-tab="symptom-search">증상으로 검색</button>
            <button className="tab-btn" data-tab="disease-search">질병으로 검색</button>
          </div>

          {/* 증상 검색 탭 */}
          <div className="tab-content active" id="symptom-search">
            <div className="card">
              <div className="card-header">
                <h3>증상 입력</h3>
              </div>
              <div className="card-body">
                <form className="search-form">
                  <div className="search-input-container">
                    <input type="text" id="symptom-input" placeholder="증상을 입력하세요 (예: 두통, 발열, 기침)" />
                    <button type="submit" className="btn primary-btn">검색</button>
                  </div>

                  <div className="common-symptoms">
                    <h4>자주 검색되는 증상</h4>
                    <div className="symptom-tags">
                      {["두통", "발열", "기침", "인후통", "콧물", "복통", "소화불량", "피로감", "근육통", "어지러움"].map((symptom, idx) => (
                        <button key={idx} type="button" className="symptom-tag">{symptom}</button>
                      ))}
                    </div>
                  </div>

                  <div className="body-part-selector">
                    <h4>신체 부위 선택</h4>
                    <div className="body-image-container">
                      <img src="https://placehold.co/400x600" alt="신체 이미지" className="body-image" />
                      <div className="body-parts">
                        <div className="body-part" data-part="head" style={{ top: '10%', left: '50%' }}>머리</div>
                        <div className="body-part" data-part="throat" style={{ top: '25%', left: '50%' }}>목</div>
                        <div className="body-part" data-part="chest" style={{ top: '35%', left: '50%' }}>가슴</div>
                        <div className="body-part" data-part="stomach" style={{ top: '50%', left: '50%' }}>복부</div>
                        <div className="body-part" data-part="arms" style={{ top: '40%', left: '25%' }}>팔</div>
                        <div className="body-part" data-part="legs" style={{ top: '70%', left: '50%' }}>다리</div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* 질병 검색 탭은 추후 구현 */}
        </div>
      </main>
    </div>
  );
}

export default SymptomSearch;