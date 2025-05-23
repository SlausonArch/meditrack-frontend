import { createContext, useContext, useState, useEffect } from "react"
import api from "../api" // api.js에서 axios 인스턴스 가져오기

// 컨텍스트 생성
const MedicationContext = createContext(null)

// 컨텍스트 훅
export function useMedication() {
  const context = useContext(MedicationContext)
  if (!context) {
    throw new Error("useMedication must be used within a MedicationProvider")
  }
  return context
}

// 프로바이더 컴포넌트
export function MedicationProvider({ children }) {
  // 복용약 관련 상태
  const [medications, setMedications] = useState([]) // 사용자의 현재 복용약 목록
  const [searchKeyword, setSearchKeyword] = useState("") // 약물 검색어
  const [searchResults, setSearchResults] = useState([]) // 검색 결과
  const [isSearching, setIsSearching] = useState(false) // 검색 중 여부
  const [showSearchResults, setShowSearchResults] = useState(false) // 검색 결과 표시 여부
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태
  const [interactionMedication, setInteractionMedication] = useState(null) // 상호작용 확인용 약품

  // 컴포넌트가 마운트될 때 토큰 설정 및 복용약 가져오기
  useEffect(() => {
    // localStorage에서 토큰 가져와서 API 인스턴스에 설정
    const token = localStorage.getItem("token")
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }

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

  // 복용약 검색하기
  const searchMedications = (keyword) => {
    if (keyword.trim().length < 2) return

    setIsSearching(true)
    api
      .get(`/user_health/drugs/search?keyword=${encodeURIComponent(keyword)}`)
      .then((res) => {
        console.log("약물 검색 결과:", res.data)
        setSearchResults(res.data)
        // 검색 결과가 있을 때만 드롭다운 표시
        if (res.data && res.data.length > 0) {
          setShowSearchResults(true)
        }
      })
      .catch((err) => {
        console.error("약물 검색 실패:", err.response ? err.response.data : err)
        setSearchResults([])
        setShowSearchResults(false)
      })
      .finally(() => {
        setIsSearching(false)
      })
  }

  // 복용약 추가하기
  const addMedication = (medication) => {
    // 이미 추가된 약물인지 확인
    if (medications.some((med) => med.item_seq === medication.item_seq)) {
      setShowSearchResults(false)
      return
    }

    setIsLoading(true)
    api
      .post("/user_health/drugs", {
        item_seq: medication.item_seq, // 백엔드로 item_seq 전송
        // 필요한 경우 UI 표시용 데이터도 함께 전송
        item_name: medication.item_name,
      })
      .then(() => {
        setMedications((prev) => [...prev, medication])
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

  // 복용약 삭제하기
  const deleteMedication = (itemId) => {
    setIsLoading(true)
    api
      .delete(`/user_health/drugs/${itemId}`)
      .then(() => {
        setMedications((prev) => prev.filter((med) => med.item_seq !== itemId))
      })
      .catch((err) => {
        console.error("복용약 삭제 실패:", err.response ? err.response.data : err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // 상호작용 확인용 약품 설정
  const setInteractionDrug = (medication) => {
    setInteractionMedication(medication)
  }

  // 상호작용 확인용 약품 초기화
  const clearInteractionDrug = () => {
    setInteractionMedication(null)
  }

  // 약품 상호작용 확인
  const checkInteractions = async () => {
    if (!interactionMedication || medications.length === 0) return null

    setIsLoading(true)
    try {
      // localStorage에서 토큰 가져오기
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.")
      }

      // 실제 API 호출 - POST 요청으로 변경
      const response = await fetch(`http://13.209.5.228:8000/medications/check-interaction`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 인증 토큰 추가
        },
        body: JSON.stringify({
          new_medication_id: interactionMedication.item_seq,
        }),
      })

      if (response.status === 401) {
        throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.")
      }

      if (!response.ok) {
        throw new Error("상호작용 확인 중 오류가 발생했습니다.")
      }

      // JSON 응답 처리
      const data = await response.json()
      console.log("API 응답 데이터:", data)

      // 응답 구조에 맞게 UI 데이터 구성
      const hasWarning = data.interactions.some((interaction) => interaction.interaction_type === "주의")

      setIsLoading(false)
      return {
        summary: {
          hasWarning,
          message: hasWarning
            ? `${interactionMedication.item_name}과(와) 현재 복용 중인 약품 사이에 잠재적인 상호작용이 있습니다.`
            : "모든 약품이 안전하게 함께 복용 가능합니다.",
        },
        interactions: data.interactions.map((interaction) => ({
          medication1: interactionMedication.item_name,
          medication2: interaction.product_a,
          manufacturer: interaction.manufacturer_a,
          level: interaction.interaction_type === "주의" ? "warning" : "safe",
          description: interaction.detail,
          recommendation:
            interaction.interaction_type === "주의" ? "의사나 약사와 상담하세요." : "일반적인 용법용량을 따르세요.",
        })),
        alternatives: data.alternative_drugs || [],
      }
    } catch (error) {
      console.error("상호작용 확인 실패:", error)
      setIsLoading(false)
      return null
    }
  }

  const value = {
    medications,
    searchKeyword,
    searchResults,
    isSearching,
    showSearchResults,
    isLoading,
    interactionMedication,
    setSearchKeyword,
    setShowSearchResults,
    fetchMedications,
    searchMedications,
    addMedication,
    deleteMedication,
    setInteractionDrug,
    clearInteractionDrug,
    checkInteractions,
  }

  return <MedicationContext.Provider value={value}>{children}</MedicationContext.Provider>
}
