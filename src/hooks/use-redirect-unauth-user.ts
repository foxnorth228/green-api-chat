import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "./use-user";

const useRedirectUnauthUser = () => {
  const { id, token } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (id === "" || token === "") {
      navigate("/login");
    }
  });
};

export default useRedirectUnauthUser;
