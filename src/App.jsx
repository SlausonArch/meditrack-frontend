import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import SymptomSearch from './pages/SymptomSearch';
import OtcMeds from './pages/OtcMeds';
import InteractionCheck from './pages/InteractionCheck';
import Lens from './pages/Lens';
import MyPage from './pages/MyPage';
import Layout from './components/Layout'; 
import HeaderFooterLayout from './components/HeaderFooterLayout';
import SidebarLayout from './components/SidebarkLayout';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <Router>
      <Routes>
        {/* Layout이 적용될 페이지들 헤더, 푸터, 사이드바 */}


        {/*사이드바만 있는 레이아웃 */}
        <Route path="/otc-meds" element={<SidebarLayout><OtcMeds /></SidebarLayout>} />
        <Route path="/symptom-search" element={<SidebarLayout><SymptomSearch /></SidebarLayout>} />
        <Route path="/mypage" element={<SidebarLayout><MyPage /></SidebarLayout>} />
        <Route path="/interaction-check" element={<SidebarLayout><InteractionCheck /></SidebarLayout>} />
        <Route path="/lens" element={<SidebarLayout><Lens /></SidebarLayout>} />
     
        {/*사이드바 없이 헤더푸터만 */}
        <Route path="/" element={<HeaderFooterLayout><HomePage /></HeaderFooterLayout>} />
        <Route path="/login" element={<HeaderFooterLayout><Login /></HeaderFooterLayout>} />
        <Route path="/register" element={<HeaderFooterLayout><Register /></HeaderFooterLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
