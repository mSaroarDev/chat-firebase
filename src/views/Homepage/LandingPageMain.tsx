import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const LandingPageMain = () => {
  const { currUser } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/dashboard/chats", {
      replace: true,
    });
  }, [currUser]);

  return (
    <>
      {JSON.stringify(currUser)}
    </>
  );
};

export default LandingPageMain;