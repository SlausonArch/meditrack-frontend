// components/SidebarLayout.jsx
import Sidebar from './Sidebar';

function SidebarLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default SidebarLayout;
