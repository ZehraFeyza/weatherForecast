import React from "react";
import { Routes, Route } from "react-router-dom";
import LocalRoute from "./LocalRoute";
import SearchPage from "../page/SearchPage";
import LoginPage from "../page/LoginPage";

const DznRoute = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/search"
          element={
            <LocalRoute>
              <SearchPage />
            </LocalRoute>
          }
        />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default DznRoute;
