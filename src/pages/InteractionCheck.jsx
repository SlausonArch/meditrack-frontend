"use client"

import { useEffect, useState, useRef } from "react"
import "../styles/styles.css"
import "../styles/interaction.css" // 스타일 파일 추가
import { useMedication } from "../context/medication-context"

function InteractionCheck() {
  const {
    medications,
    searchKeyword,
    searchResults,
    isSearching,
    showSearchResults,
    isLoading,
    interactionMedication,
    setSearchKeyword,
    setShowSearchResults,
    setInteractionDrug,
    clearInteractionDrug,
    checkInteractions,
  } = useMedication()

  const [interactionResults, setInteractionResults] = useState(null)
  const [isCheckingInteraction, setIsCheckingInteraction] = useState(false)

  const searchInputRef = useRef(null)
  const searchResultsRef = useRef(null)

  // 검색어 변경 시 검색 결과 표시 상태 업데이트
  useEffect(() => {
    if (searchKeyword.trim().length >= 2 && searchResults.length > 0) {
      setShowSearchResults(true)
    }
  }, [searchResults, searchKeyword, setShowSearchResults])

  // 검색 결과 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchResultsRef.current && 
        !searchResultsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSearchResults(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setShowSearchResults])

  // 약품 선택 처리
  const handleSelectMedication = (medication) => {
    setInteractionDrug(medication)
    setShowSearchResults(false)
    setSearchKeyword("")
  }

  // 약품 제거 처리
  const handleRemoveMedication = (medicationId) => {
    if (interactionMedication && interactionMedication.item_seq === medicationId) {
      clearInteractionDrug()
    }
  }

  // 상호작용 확인 처리
  const handleCheckInteraction = async () => {
    if (!interactionMedication || medications.length === 0) {
      alert("현재 복용 중인 약품과 확인하려는 약품을 모두 선택해주세요.")
      return
    }

    setIsCheckingInteraction(true)
    const results = await checkInteractions()
    setInteractionResults(results)
    setIsCheckingInteraction(false)
  }

  // 디버깅용 로그
  console.log("Search keyword:", searchKeyword)
  console.log("Search results:", searchResults)
  console.log("Show search results:", showSearchResults)

  return (
    <div className="dashboard-layout">
      <main className="main-content">
        <header className="content-header">
          <button className="sidebar-toggle">
            <i className="fas fa-bars"></i>
          </button>
          <h1>약품 상호작용 확인</h1>
        </header>

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
                    {medications.length === 0 ? (
                      <p className="no-data">등록된 복용약이 없습니다. 대시보드에서 복용약을 추가해주세요.</p>
                    ) : (
                      medications.map((medication) => (
                        <div className="medication-tag" key={medication.item_seq}>
                          <span>{medication.item_name}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="form-section">
                  <h4>확인하려는 약품</h4>
                  <div className="search-container">
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="search-input"
                      placeholder="약품명을 입력하세요"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      onFocus={() => {
                        if (searchKeyword.trim().length >= 2 && searchResults.length > 0) {
                          setShowSearchResults(true)
                        }
                      }}
                      disabled={isLoading}
                    />
                    {isSearching && <span className="search-spinner"></span>}
                    
                    {/* 검색 결과 드롭다운 */}
                    {showSearchResults && searchResults.length > 0 && (
                      <div className="search-results" ref={searchResultsRef}>
                        <ul>
                          {searchResults.map((medication) => (
                            <li key={medication.item_seq}>
                              <button 
                                onClick={() => handleSelectMedication(medication)}
                                disabled={medications.some(med => med.item_seq === medication.item_seq)}
                              >
                                <span className="medication-name">{medication.item_name}</span>
                                <span className="medication-company">{medication.entp_name}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 선택된 확인 약품 표시 */}
                  {interactionMedication && (
                    <div className="selected-check-medication">
                      <div className="medication-tag">
                        <span>{interactionMedication.item_name}</span>
                        <button type="button" className="tag-remove" onClick={() => clearInteractionDrug()}>
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn primary-btn full-width"
                    onClick={handleCheckInteraction}
                    disabled={isCheckingInteraction || !interactionMedication || medications.length === 0}
                  >
                    {isCheckingInteraction ? "확인 중..." : "상호작용 확인하기"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 상호작용 결과 */}
          {interactionResults && (
            <div className="card interaction-results">
              <div className="card-header">
                <h3>상호작용 결과</h3>
              </div>
              <div className="card-body">
                <div className="interaction-summary">
                  <div className={`interaction-icon ${interactionResults.summary.hasWarning ? "warning" : "safe"}`}>
                    <i
                      className={`fas ${interactionResults.summary.hasWarning ? "fa-exclamation-triangle" : "fa-check-circle"}`}
                    ></i>
                  </div>
                  <div className="interaction-text">
                    <h4>{interactionResults.summary.hasWarning ? "주의 필요" : "안전"}</h4>
                    <p>{interactionResults.summary.message}</p>
                  </div>
                </div>

                <div className="interaction-details">
                  <h4>상세 정보</h4>
                  {interactionResults.interactions.map((interaction, index) => (
                    <div className="interaction-item" key={index}>
                      <div className="interaction-header">
                        <h5>
                          {interaction.medication1} + {interaction.medication2}
                        </h5>
                        <span className={`interaction-level ${interaction.level}`}>
                          {interaction.level === "warning" ? "중등도" : "안전"}
                        </span>
                      </div>
                      <div className="interaction-content">
                        <p>{interaction.description}</p>
                        <p>
                          <strong>권장사항:</strong> {interaction.recommendation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {interactionResults.alternatives.length > 0 && (
                  <div className="alternative-medications">
                    <h4>대체 약품 추천</h4>
                    <p>더 안전한 대안입니다:</p>
                    <div className="alternative-list">
                      {interactionResults.alternatives.map((alternative, index) => (
                        <div className="alternative-item" key={index}>
                          <div className="alternative-info">
                            <h5>{alternative.name}</h5>
                            <p>{alternative.description}</p>
                          </div>
                          <button className="btn text-btn">상세정보</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default InteractionCheck
