import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "./redux/auth/authSlice";
import PrivateRoutes from "./utils/PrivateRoutes";
import Books from "./components/Books";
import Register from "./components/Register";
import AddBooks from "./components/AddBooks";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    setAuthToken(localStorage.token);
    dispatch(authUser());
  }, [dispatch, isAuthenticated]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/books" element={<Books />} />
          <Route path="/addbook" element={<AddBooks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
