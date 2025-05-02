"use client"

import { useEffect, useState, useRef } from "react"
import api from "../api" // api.js에서 axios 인스턴스 가져오기
import "../styles/dashboard.css"
import CustomAlert from "./custom-alert"

function Dashboard() {
  // 기저질환 관련 상태
  const [diseases, setDiseases] = useState([]) // 기존 기저질환 목록을 저장
  const [conditionList, setConditionList] = useState([]) // 서버에서 가져온 기저질환 목록
  const [isAddingDisease, setIsAddingDisease] = useState(false) // 기저질환 추가 모드 여부
  
  // 복용약 관련 상태
  const [medications, setMedications] = useState([]) // 사용자의 현재 복용약 목록
  const [searchKeyword, setSearchKeyword] = useState("") // 약물 검색어
  const [searchResults, setSearchResults] = useState([]) // 검색 결과
  const [isSearching, setIsSearching] = useState(false) // 검색 중 여부
  const [showSearchResults, setShowSearchResults] = useState(false) // 검색 결과 표시 여부
  
  // 공통 상태
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
    itemId: null,
    type: "" // "disease" 또는 "medication"
  })
  
  const searchInputRef = useRef(null)
  const searchResultsRef = useRef(null)

  // 컴포넌트가 마운트될 때 기존 기저질환과 복용약 가져오기
  useEffect(() => {
    fetchDiseases()
    fetchMedications()
  }, [])
  
  // 검색어 입력 시 자동완성 결과 가져오기
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchKeyword.trim().length >= 2) {
        searchMedications(searchKeyword)
      } else {
        setSearchResults([])
        setShowSearchResults(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchKeyword])
  
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
  }, [])

  // 기저질환 가져오기
  const fetchDiseases = () => {
    setIsLoading(true)
    api
      .get("/user_health/conditions")
      .then((res) => {
        console.log("기존 기저질환 목록:", res.data)
        setDiseases(res.data)
      })
      .catch((err) => {
        console.error("기저질환 불러오기 실패:", err.response ? err.response.data : err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  
  // 복용약 가져오기
  const fetchMedications = () => {
    setIsLoading(true)
    api
      .get("/user_health/drugs")
      .then((res) => {
        console.log("복용약 목록:", res.data)
        setMedications(res.data)
      })
      .catch((err) => {
        console.error("복용약 불러오기 실패:", err.response ? err.response.data : err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // 기저질환 목록 가져오기
  const handleAddConditions = () => {
    if (isAddingDisease) {
      setIsAddingDisease(false)
      return
    }

    setIsLoading(true)
    api
      .get("/user_health/conditions/list")
      .then((res) => {
        console.log("기저질환 목록:", res.data)
        setConditionList(res.data)
        setIsAddingDisease(true)
      })
      .catch((err) => {
        console.error("기저질환 목록 가져오기 실패:", err.response ? err.response.data : err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // 기저질환 등록하기
  const handleSelectCondition = (condition) => {
    if (!diseases.some((disease) => disease.condition_id === condition.id)) {
      setIsLoading(true)
      api
        .post("/user_health/conditions", { condition_id: condition.id })
        .then(() => {
          const newCondition = {
            condition_id: condition.id,
            name: condition.name,
          }
          setDiseases((prevDiseases) => [...prevDiseases, newCondition])
          setIsAddingDisease(false)
        })
        .catch((err) => {
          console.error("기저질환 추가 실패:", err.response ? err.response.data : err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }
  
  // 복용약 검색하기
  const searchMedications = (keyword) => {
    if (keyword.trim().length < 2) return
    
    setIsSearching(true)
    api
      .get(`/user_health/drugs/search?keyword=${encodeURIComponent(keyword)}`)
      .then((res) => {
        console.log("약물 검색 결과:", res.data)
        setSearchResults(res.data)
        setShowSearchResults(true)
      })
      .catch((err) => {
        console.error("약물 검색 실패:", err.response ? err.response.data : err)
        setSearchResults([])
      })
      .finally(() => {
        setIsSearching(false)
      })
  }
  
  // 복용약 추가하기
  const handleAddMedication = (medication) => {
    // 이미 추가된 약물인지 확인
    if (medications.some(med => med.item_seq === medication.item_seq)) {
      setShowSearchResults(false)
      return
    }
    
    setIsLoading(true)
    api
      .post("/user_health/drugs", { item_seq: medication.item_seq })
      .then(() => {
        setMedications(prev => [...prev, medication])
        setSearchKeyword("")
        setShowSearchResults(false)
      })
      .catch((err) => {
        console.error("약물 추가 실패:", err.response ? err.response.data : err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // 삭제 확인 다이얼로그 열기 (기저질환 또는 복용약)
  const openDeleteConfirm = (itemId, type) => {
    setAlertState({
      isOpen: true,
      title: type === "disease" ? "기저질환 삭제" : "복용약 삭제",
      message: type === "disease" 
        ? "정말 이 기저질환을 삭제하시겠습니까?" 
        : "정말 이 복용약을 삭제하시겠습니까?",
      itemId: itemId,
      type: type
    })
  }

  // 항목 삭제하기 (기저질환 또는 복용약)
  const handleDelete = () => {
    const { itemId, type } = alertState
    if (!itemId) return

    setIsLoading(true)
    
    if (type === "disease") {
      api
        .delete(`/user_health/conditions/${itemId}`)
        .then(() => {
          setDiseases(prev => prev.filter(disease => disease.condition_id !== itemId))
          setAlertState({ ...alertState, isOpen: false })
        })
        .catch((err) => {
          console.error("기저질환 삭제 실패:", err.response ? err.response.data : err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else if (type === "medication") {
      api
        .delete(`/user_health/drugs/${itemId}`)
        .then(() => {
          setMedications(prev => prev.filter(med => med.item_seq !== itemId))
          setAlertState({ ...alertState, isOpen: false })
        })
        .catch((err) => {
          console.error("복용약 삭제 실패:", err.response ? err.response.data : err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <div className="dashboard-layout">
      <main className="main-content">
        <header className="content-header">
          <button className="sidebar-toggle">
            <i className="fas fa-bars"></i>
          </button>
          <h1>대시보드</h1>
        </header>

        <div className="content-body">
          {/* 기저질환 섹션 */}
          <div className="card">
            <div className="card-header">
              <h3>기저질환</h3>
            </div>
            <div className="card-body disease-categories">
              <button
                className={`btn ${isAddingDisease ? "text-btn" : "add-condition-btn"}`}
                onClick={handleAddConditions}
                disabled={isLoading}
              >
                {isLoading && <span className="loading-spinner"></span>}
                {isAddingDisease ? "취소" : "기저질환 추가"}
              </button>

              {/* 기저질환 추가 모드에서 기저질환 목록 보여주기 */}
              {isAddingDisease && (
                <div className="condition-list">
                  <h4>기저질환 목록</h4>
                  <ul>
                    {conditionList.map((condition) => (
                      <li key={condition.id}>
                        <button
                          onClick={() => handleSelectCondition(condition)}
                          disabled={isLoading || diseases.some((disease) => disease.condition_id === condition.id)}
                        >
                          {condition.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 선택된 기저질환 목록 표시 */}
              <div className="selected-diseases">
                {diseases.length === 0 && !isLoading ? (
                  <p className="no-data">등록된 기저질환이 없습니다.</p>
                ) : (
                  diseases.map((disease) => (
                    <div className="medication-card" key={disease.condition_id || disease.id}>
                      <div className="medication-info">
                        <h4>{disease.name}</h4>
                      </div>
                      <div className="medication-actions">
                        <button
                          className="btn text-btn"
                          onClick={() => openDeleteConfirm(disease.condition_id, "disease")}
                          disabled={isLoading}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 복용약 섹션 */}
          <div className="card">
            <div className="card-header">
              <h3>복용약</h3>
            </div>
            <div className="card-body medication-section">
              <div className="medication-search">
                <div className="search-container">
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="search-input"
                    placeholder="복용 중인 약물을 검색하세요..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onFocus={() => searchKeyword.length >= 2 && setShowSearchResults(true)}
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
                              onClick={() => handleAddMedication(medication)}
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
                <p className="search-hint">2글자 이상 입력하면 자동으로 검색됩니다</p>
              </div>

              {/* 복용약 목록 */}
              <div className="medication-list">
                <h4>현재 복용 중인 약물</h4>
                {medications.length === 0 && !isLoading ? (
                  <p className="no-data">등록된 복용약이 없습니다.</p>
                ) : (
                  <div className="selected-medications">
                    {medications.map((medication) => (
                      <div className="medication-card" key={medication.item_seq}>
                        <div className="medication-info">
                          <h4>{medication.item_name}</h4>
                          <p className="medication-company">{medication.entp_name}</p>
                        </div>
                        <div className="medication-actions">
                          <button
                            className="btn text-btn"
                            onClick={() => openDeleteConfirm(medication.item_seq, "medication")}
                            disabled={isLoading}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 커스텀 알림창 */}
      <CustomAlert
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        onConfirm={handleDelete}
        onCancel={() => setAlertState({ ...alertState, isOpen: false })}
      />
    </div>
  )
}

export default Dashboard
