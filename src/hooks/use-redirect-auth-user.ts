import config from "@routes/config";
import { useUserData } from "@store/userSlice/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirectAuthUser = () => {
  const [id, token] = useUserData();
  const navigate = useNavigate();
  useEffect(() => {
    if (id !== "" && token !== "") {
      navigate(config.chat.path);
    }
  });
};

export default useRedirectAuthUser;
