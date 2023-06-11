import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "./use-user";

const useRedirectAuthUser = () => {
  const { id, token } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (id !== "" && token !== "") {
      navigate("/chat");
    }
  });
};

export default useRedirectAuthUser;
