import { useEffect } from 'react';
import '../styles/styles.css';

function InteractionCheck() {
  useEffect(() => {
    document.querySelectorAll('.tag-remove').forEach(button => {
      button.addEventListener('click', function () {
        this.closest('.medication-tag').remove();
      });
    });
  }, []);

  return (
    <div className="dashboard-layout">
      <main className="main-content">
        <div className="content-body">
          <div className="card">
            <div className="card-header">
              <h3>약품 상호작용 확인</h3>
            </div>
            <div className="card-body">
              <p className="info-text">현재 복용 중인 약품과 새로 복용하려는 약품 간의 상호작용을 확인하세요.</p>

              <div className="interaction-form">
                <div className="form-section">
                  <h4>현재 복용 중인 약품</h4>
                  <div className="current-medications">
                    <div className="medication-tag">
                      <span>고혈압약 (아모잘탄)</span>
                      <button type="button" className="tag-remove"><i className="fas fa-times"></i></button>
                    </div>
                    <div className="medication-tag">
                      <span>당뇨약 (메트포르민)</span>
                      <button type="button" className="tag-remove"><i className="fas fa-times"></i></button>
                    </div>
                  </div>
                  <button className="btn secondary-btn add-medication-btn">
                    <i className="fas fa-plus"></i> 약품 추가
                  </button>
                </div>

                <div className="form-section">
                  <h4>확인하려는 약품</h4>
                  <div className="search-input-container">
                    <input type="text" placeholder="약품명을 입력하세요" />
                    <button type="button" className="btn primary-btn">검색</button>
                  </div>
                  <div className="search-results-container">
                    {[
                      { name: '아스피린', desc: '진통, 해열, 소염 작용' },
                      { name: '아스피린 프로텍트', desc: '장용정, 심혈관 질환 예방' },
                      { name: '아스피린 정 100mg', desc: '항혈소판제' }
                    ].map((item, i) => (
                      <div key={i} className="search-result-item">
                        <div className="result-info">
                          <h5>{item.name}</h5>
                          <p>{item.desc}</p>
                        </div>
                        <button className="btn small-btn">선택</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn primary-btn full-width">상호작용 확인하기</button>
                </div>
              </div>
            </div>
          </div>

          <div className="card interaction-results">
            <div className="card-header">
              <h3>상호작용 결과</h3>
            </div>
            <div className="card-body">
              <div className="interaction-summary">
                <div className="interaction-icon warning">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="interaction-text">
                  <h4>주의 필요</h4>
                  <p>아스피린과 고혈압약(아모잘탄) 사이에 잠재적인 상호작용이 있습니다.</p>
                </div>
              </div>

              <div className="interaction-details">
                <h4>상세 정보</h4>
                <div className="interaction-item">
                  <div className="interaction-header">
                    <h5>아스피린 + 아모잘탄 (고혈압약)</h5>
                    <span className="interaction-level warning">중등도</span>
                  </div>
                  <div className="interaction-content">
                    <p>아스피린은 고혈압약의 효과를 감소시킬 수 있습니다.</p>
                    <p><strong>권장사항:</strong> 의사나 약사와 상담하세요.</p>
                  </div>
                </div>

                <div className="interaction-item">
                  <div className="interaction-header">
                    <h5>아스피린 + 메트포르민 (당뇨약)</h5>
                    <span className="interaction-level safe">안전</span>
                  </div>
                  <div className="interaction-content">
                    <p>중요한 상호작용은 없습니다.</p>
                    <p><strong>권장사항:</strong> 일반적인 용법용량을 따르세요.</p>
                  </div>
                </div>
              </div>

              <div className="alternative-medications">
                <h4>대체 약품 추천</h4>
                <p>고혈압 환자에게 더 안전한 진통제 대안입니다:</p>
                <div className="alternative-list">
                  <div className="alternative-item">
                    <div className="alternative-info">
                      <h5>타이레놀 (아세트아미노펜)</h5>
                      <p>고혈압약과 상호작용이 적은 진통제</p>
                    </div>
                    <button className="btn text-btn">상세정보</button>
                  </div>
                  <div className="alternative-item">
                    <div className="alternative-info">
                      <h5>이지엔6 (이부프로펜 리시네이트)</h5>
                      <p>일반 이부프로펜보다 위장관 부작용이 적음</p>
                    </div>
                    <button className="btn text-btn">상세정보</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default InteractionCheck;