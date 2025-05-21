import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api"
import "../styles/dashboard.css"
import CustomAlert from "./custom-alert"
import { useMedication } from "../context/medication-context"

// 아이콘 임포트 (lucide-react 또는 react-icons 등)
import { Pill, Clock, AlertTriangle } from "lucide-react" // 또는 react-icons/fa에서 가져와도 됨

function Dashboard() {
  const [diseases, setDiseases] = useState([])
  const [conditionList, setConditionList] = useState([])
  const [isAddingDisease, setIsAddingDisease] = useState(false)
  const { medications } = useMedication()
  const [upcomingReminders, setUpcomingReminders] = useState([
    { id: 1, medication: "타이레놀", time: "오전 9:00", status: "pending" },
    { id: 2, medication: "아스피린", time: "오후 1:00", status: "pending" },
    { id: 3, medication: "비타민", time: "오후 7:00", status: "pending" },
  ])
  const [interactionWarnings, setInteractionWarnings] = useState([
    {
      id: 1,
      medications: ["타이레놀", "아스피린"],
      severity: "moderate",
      description: "두 약품을 함께 복용 시 위장 장애 가능성이 있습니다.",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
    itemId: null,
    type: "",
  })

  useEffect(() => {
    fetchDiseases()
  }, [])

  const fetchDiseases = () => {
    setIsLoading(true)
    api
      .get("/user_health/conditions")
      .then((res) => {
        setDiseases(res.data)
      })
      .catch((err) => {
        console.error("기저질환 불러오기 실패:", err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleAddConditions = () => {
    if (isAddingDisease) {
      setIsAddingDisease(false)
      return
    }

    setIsLoading(true)
    api
      .get("/user_health/conditions/list")
      .then((res) => {
        setConditionList(res.data)
        setIsAddingDisease(true)
      })
      .catch((err) => {
        console.error("기저질환 목록 가져오기 실패:", err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

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
          setDiseases((prev) => [...prev, newCondition])
          setIsAddingDisease(false)
        })
        .catch((err) => {
          console.error("기저질환 추가 실패:", err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const openDeleteConfirm = (itemId, type) => {
    setAlertState({
      isOpen: true,
      title: "기저질환 삭제",
      message: "정말 이 기저질환을 삭제하시겠습니까?",
      itemId,
      type,
    })
  }

  const handleDelete = () => {
    const { itemId, type } = alertState
    if (!itemId) return
    if (type === "disease") {
      setIsLoading(true)
      api
        .delete(`/user_health/conditions/${itemId}`)
        .then(() => {
          setDiseases((prev) => prev.filter((d) => d.condition_id !== itemId))
          setAlertState((prev) => ({ ...prev, isOpen: false }))
        })
        .catch((err) => {
          console.error("기저질환 삭제 실패:", err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const handleReminderComplete = (id) => {
    setUpcomingReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "completed" } : r))
    )
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
          {/* 상단 요약 카드 */}
          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-icon">
                <Pill size={24} />
              </div>
              <div className="summary-content">
                <h4>복용약</h4>
                <p className="summary-value">{medications.length}개</p>
              </div>
              <Link to="/my-medications" className="summary-link">자세히 보기</Link>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <Clock size={24} />
              </div>
              <div className="summary-content">
                <h4>오늘의 복용 알림</h4>
                <p className="summary-value">{upcomingReminders.length}개</p>
              </div>
              <Link to="/medication-reminders" className="summary-link">자세히 보기</Link>
            </div>

            <div className="summary-card">
              <div className="summary-icon">
                <AlertTriangle size={24} />
              </div>
              <div className="summary-content">
                <h4>약품 상호작용</h4>
                <p className="summary-value">{interactionWarnings.length}개 주의</p>
              </div>
              <Link to="/interaction-check" className="summary-link">자세히 보기</Link>
            </div>
          </div>

          {/* 기저질환 */}
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

              {isAddingDisease && (
                <div className="condition-list">
                  <h4>기저질환 목록</h4>
                  <ul>
                    {conditionList.map((condition) => (
                      <li key={condition.id}>
                        <button
                          onClick={() => handleSelectCondition(condition)}
                          disabled={
                            isLoading ||
                            diseases.some((d) => d.condition_id === condition.id)
                          }
                        >
                          {condition.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="selected-diseases">
                {diseases.length === 0 && !isLoading ? (
                  <p className="no-data">등록된 기저질환이 없습니다.</p>
                ) : (
                  diseases.map((disease) => (
                    <div className="medication-card" key={disease.condition_id}>
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

          {/* 복용 알림 */}
          <div className="card">
            <div className="card-header">
              <h3>오늘의 복용 알림</h3>
              <Link to="/medication-reminders" className="card-link">모두 보기</Link>
            </div>
            <div className="card-body">
              {upcomingReminders.length === 0 ? (
                <p className="no-data">오늘 예정된 복용 알림이 없습니다.</p>
              ) : (
                <div className="reminders-list">
                  {upcomingReminders.map((reminder) => (
                    <div
                      className={`reminder-item ${reminder.status}`}
                      key={reminder.id}
                    >
                      <div className="reminder-info">
                        <h4>{reminder.medication}</h4>
                        <p>{reminder.time}</p>
                      </div>
                      <div className="reminder-actions">
                        {reminder.status === "pending" ? (
                          <button
                            className="btn primary-btn small-btn"
                            onClick={() => handleReminderComplete(reminder.id)}
                          >
                            복용 완료
                          </button>
                        ) : (
                          <span className="completed-badge">복용 완료</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 상호작용 경고 */}
          {interactionWarnings.length > 0 && (
            <div className="card warning-card">
              <div className="card-header">
                <h3>약품 상호작용 주의</h3>
                <Link to="/interaction-check" className="card-link">자세히 보기</Link>
              </div>
              <div className="card-body">
                {interactionWarnings.map((warning) => (
                  <div className="warning-item" key={warning.id}>
                    <div className="warning-icon">
                      <AlertTriangle size={20} />
                    </div>
                    <div className="warning-content">
                      <h4>{warning.medications.join(" + ")}</h4>
                      <p>{warning.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <CustomAlert
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        onConfirm={handleDelete}
        onCancel={() => setAlertState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  )
}

export default Dashboard
