import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import { getToken } from "./helpers";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import TodoPage from "./pages/Todo/TodoPage";

const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/TodoPage" element={<TodoPage />}/>
         <Route path="/signin" element={<SignIn />} />
         <Route path="/signup" element={<SignUp />} />
         <Route
            path="/profile"
            element={getToken() ? <Profile /> : <Navigate to="/signin" />}
         />
      </Routes>
   );
};

export default AppRoutes;
