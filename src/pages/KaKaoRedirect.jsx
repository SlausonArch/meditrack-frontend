import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function LoginSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const name = queryParams.get("name");
    const email = queryParams.get("email");

    if (token) {
      localStorage.setItem("token", token);
      if (name) localStorage.setItem("userName", name);
      if (email) localStorage.setItem("userEmail", email);

      //alert("소셜 로그인 성공!");
      navigate("/");
    } else {
      alert("소셜 로그인에 실패했습니다.");
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>로그인 중입니다...</div>;
}

export default LoginSuccess;
