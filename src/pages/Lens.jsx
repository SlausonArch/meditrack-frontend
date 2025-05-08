"use client"

import { useEffect, useState } from "react"
import "../styles/lens.css"
import { Search } from "lucide-react"

function Lens() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    const scanBtn = document.querySelector(".scan-btn")
    if (scanBtn) {
      scanBtn.addEventListener("click", () => {
        alert("카메라 스캔 기능은 추후 구현 예정입니다.")
      })
    }
  }, [])

  // 약품 검색 함수 (백엔드 연동 예시)
  const searchMedication = async () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)

    try {
      // 실제 구현 시 백엔드 API 호출로 대체
      // const response = await fetch(`/api/medications/search?query=${searchTerm}`);
      // const data = await response.json();

      // 임시 데이터 (백엔드 연동 전 테스트용)
      setTimeout(() => {
        const mockData = [
          {
            product_name: "타이레놀콜드-에스정",
            manufacturer: "한국존슨앤드존슨판매(유)",
            efficacy:
              "이 약은 감기의 제증상(여러증상)(콧물, 코막힘, 재채기, 인후(목구멍)통, 기침, 오한(춥고 떨리는 증상), 발열, 두통, 관절통, 근육통)의 완화에 사용합니다.\n",
            use_method: "만 15세 이상은 1회 1정씩, 1일 3회 식후 30분에 복용합니다.\n",
            warning:
              "매일 세 잔 이상 정기적 음주자가 이 약 또는 다른 해열진통제를 복용할 때는 의사 또는 약사와 상의하십시오. 간손상을 일으킬 수 있습니다...\n",
            caution: "이 약에 과민증 또는 경험자, 다른 해열진통제, 감기약 복용 시 ...\n",
            interaction:
              "MAO 억제제(항우울제, 항정신병제, 감정조절제, 항파킨슨제 등), 진해거담제(기침·가래약), 다른 감기약, 해열진통제....\n",
            side_effect: "발진·발적(충혈되어 붉어짐), 가려움...\n",
            storage_method: "습기와 빛을 피해 실온에서 보관하십시오.\n\n어린이의 손이 닿지 않는 곳에 보관하십시오.\n",
            image: "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/1OKRXo9l4Df",
            open_date: "2023-06-12 00:00:00",
          },
          {
            product_name: "타이레놀8시간이알서방정(아세트아미노펜)",
            manufacturer: "한국존슨앤드존슨판매(유)",
            efficacy:
              "이 약은 해열 및 감기에 의한 동통(통증)과 두통, 치통, 근육통, 허리통증, 생리통, 관절통의 완화에 사용합니다.\n",
            use_method: "12세 이상의 소아와 성인은 1회 2정을 매 8시간마다 복용....\n",
            warning: "매일 세잔 이상 정기적 음주자가 이 약...\n",
            caution: "이 약에 과민증, 소화성궤양, 심한 혈액 이상 환자....\n",
            interaction: "와파린, 플루클록사실린을 복용하는 환자는 의사 또는 약사와 상의하십시오.\n",
            side_effect: "쇽 증상...\n",
            storage_method: "실온에서 보관하십시오. 어린이의 손이 닿지 않는 곳에 보관하십시오.\n",
            image: "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/1OKRXo9l4DN",
            open_date: "2023-02-15 00:00:00",
          },
        ].filter((med) => med.product_name.includes(searchTerm))

        setSearchResults(mockData)
        setIsSearching(false)
      }, 500)
    } catch (error) {
      console.error("약품 검색 중 오류 발생:", error)
      setIsSearching(false)
    }
  }

  const handleShowDetail = (medication) => {
    setSelectedMedication(medication)
    setShowDetail(true)
  }

  const handleCloseDetail = () => {
    setShowDetail(false)
  }

  return (
    <div className="dashboard-layout">
      <main className="main-content">
        <header className="content-header">
          <button className="sidebar-toggle">
            <i className="fas fa-bars"></i>
          </button>
          <h1>약품 검색</h1>
          <div className="header-actions">
            <button className="btn icon-btn">
              <i className="fas fa-bell"></i>
            </button>
            <button className="btn icon-btn">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </header>

        <div className="content-body">
          {/* 검색 카드 */}
          <div className="card">
            <div className="card-header">
              <h3>약품 검색</h3>
            </div>
            <div className="card-body">
              <div className="search-container">
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="약품 이름을 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && searchMedication()}
                  />
                  <button className="search-button" onClick={searchMedication} disabled={isSearching}>
                    <Search size={18} />
                    <span>검색</span>
                  </button>
                </div>
                <div className="search-options">
                  <span className="search-option active">약품명</span>
                  <span className="search-option">제조사</span>
                  <span className="search-option">효능</span>
                </div>
              </div>
            </div>
          </div>

          {/* 카메라 스캔 카드 */}
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

          {/* 검색 결과 카드 */}
          {searchResults.length > 0 && (
            <div className="card search-results">
              <div className="card-header">
                <h3>검색 결과</h3>
                <span className="result-count">{searchResults.length}개 발견</span>
              </div>
              <div className="card-body">
                {searchResults.map((medication, index) => (
                  <div className="medication-item" key={index}>
                    <div className="medication-image">
                      <img src={medication.image || "https://placehold.co/80x80"} alt={medication.product_name} />
                    </div>
                    <div className="medication-info">
                      <h4>{medication.product_name}</h4>
                      <p className="manufacturer">{medication.manufacturer}</p>
                      <p className="efficacy">{medication.efficacy.substring(0, 100)}...</p>
                    </div>
                    <div className="medication-actions">
                      <button className="btn text-btn" onClick={() => handleShowDetail(medication)}>
                        상세정보
                      </button>
                      <button className="btn primary-btn small-btn">복용 추가</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 스캔된 약품 정보 */}
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

      {/* 약품 상세 정보 모달 */}
      {showDetail && selectedMedication && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>{selectedMedication.product_name}</h3>
              <button className="modal-close" onClick={handleCloseDetail}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="medication-detail">
                <div className="medication-detail-image">
                  <img
                    src={selectedMedication.image || "https://placehold.co/200x200"}
                    alt={selectedMedication.product_name}
                  />
                </div>
                <div className="medication-detail-info">
                  <div className="detail-section">
                    <h4>제조사</h4>
                    <p>{selectedMedication.manufacturer}</p>
                  </div>
                  <div className="detail-section">
                    <h4>효능·효과</h4>
                    <p>{selectedMedication.efficacy}</p>
                  </div>
                  <div className="detail-section">
                    <h4>용법·용량</h4>
                    <p>{selectedMedication.use_method}</p>
                  </div>
                  <div className="detail-section">
                    <h4>경고</h4>
                    <p>{selectedMedication.warning}</p>
                  </div>
                  <div className="detail-section">
                    <h4>주의사항</h4>
                    <p>{selectedMedication.caution}</p>
                  </div>
                  <div className="detail-section">
                    <h4>상호작용</h4>
                    <p>{selectedMedication.interaction}</p>
                  </div>
                  <div className="detail-section">
                    <h4>부작용</h4>
                    <p>{selectedMedication.side_effect}</p>
                  </div>
                  <div className="detail-section">
                    <h4>보관방법</h4>
                    <p>{selectedMedication.storage_method}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn primary-btn">복용 추가</button>
              <button className="btn outline-btn" onClick={handleCloseDetail}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Lens
