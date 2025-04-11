import '../styles/styles.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <h1><a href="/">MediTrack</a></h1>
        </div>
        <button className="sidebar-close">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="user-profile">
        <div className="user-avatar">
          <img src="https://placehold.co/100" alt="사용자 프로필" />
        </div>
        <h3 className="user-name">홍길동님</h3>
        <p className="user-email">hong@example.com</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><a href="/dashboard"><i className="fas fa-home"></i> 대시보드</a></li>
          <li><a href="/my-medications"><i className="fas fa-pills"></i> 내 약품</a></li>
          <li><a href="/medication-reminders"><i className="fas fa-bell"></i> 복용 알림</a></li>
          <li><a href="/mypage"><i className="fas fa-user"></i> 내 정보</a></li>
          <li><a href="/symptom-search"><i className="fas fa-search"></i> 증상 검색</a></li>
          <li><a href="/otc-meds"><i className="fas fa-first-aid"></i> 상비약 구비</a></li>
          <li><a href="/interaction-check"><i className="fas fa-exchange-alt"></i> 상호작용 확인</a></li>
          <li><a href="/lens"><i className="fas fa-camera"></i> 약품 스캔</a></li>
          <li><a href="/"><i className="fas fa-sign-out-alt"></i> 로그아웃</a></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;