"use client"

import { useEffect, useState } from "react"
import "../styles/dashboard.css"

interface CustomAlertProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function CustomAlert({ isOpen, title, message, onConfirm, onCancel }: CustomAlertProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible && !isOpen) return null

  return (
    <div className={`custom-alert ${isOpen ? "show" : ""}`} onClick={onCancel}>
      <div className="alert-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="alert-title">{title}</h3>
        <p className="alert-message">{message}</p>
        <div className="alert-actions">
          <button className="alert-cancel" onClick={onCancel}>
            취소
          </button>
          <button className="alert-confirm" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
