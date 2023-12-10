import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticated, userLoading } = useSelector((state) => state.auth);
  return (
    <>
      {userLoading ? (
        <Spinner animation="border" />
      ) : isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
