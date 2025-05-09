import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import SymptomSearch from './pages/SymptomSearch';
import OtcMeds from './pages/OtcMeds';
import InteractionCheck from './pages/InteractionCheck';
import Lens from './pages/Lens';
import MyPage from './pages/MyPage';
import HeaderFooterLayout from './components/HeaderFooterLayout';
import SidebarLayout from './components/SidebarkLayout';
import LoginSuccess from './pages/KaKaoRedirect';
import ProtectedRoute from './components/ProtectedRoute';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* 카카오 로그인 콜백 */}
        <Route path="/login/success" element={<LoginSuccess />} />

        {/* 보호된 경로들 (SidebarLayout + 로그인 검사) */}
        <Route
          path="/otc-meds"
          element={
            <ProtectedRoute>
              <SidebarLayout><OtcMeds /></SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/symptom-search"
          element={
            <ProtectedRoute>
              <SidebarLayout><SymptomSearch /></SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <SidebarLayout><MyPage /></SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interaction-check"
          element={
            <ProtectedRoute>
              <SidebarLayout><InteractionCheck /></SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lens"
          element={
            <ProtectedRoute>
              <SidebarLayout><Lens /></SidebarLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SidebarLayout><Dashboard /></SidebarLayout>
            </ProtectedRoute>
          }
        />

        {/* 공개 경로들 (Header + Footer만 있음) */}
        <Route path="/" element={<HeaderFooterLayout><HomePage /></HeaderFooterLayout>} />
        <Route path="/login" element={<HeaderFooterLayout><Login /></HeaderFooterLayout>} />
        <Route path="/register" element={<HeaderFooterLayout><Register /></HeaderFooterLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
