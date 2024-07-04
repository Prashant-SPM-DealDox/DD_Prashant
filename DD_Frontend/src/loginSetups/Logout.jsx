import React, { useEffect } from "react";
import { useUserLogout } from "../../src/hooks/useUser";
import { useAuthContext } from "../../src/hooks/useAuthContext";

const Logout = () => {

  const { logout } = useUserLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      logout();
      window.location.href = "/";
    }
  }, [user, logout]);

  return (
    <>
      {/* Your component's content */}
    </>
  );
}

export default Logout;
