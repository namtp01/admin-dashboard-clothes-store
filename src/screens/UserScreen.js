import React from "react";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";
import UserComponent from "../components/users/UserComponent";

const UserScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserComponent />
      </main>
    </>
  );
};

export default UserScreen;
