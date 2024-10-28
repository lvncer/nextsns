import React from "react";
import Topbar from "@/components/layouts/header/Header";
import FollowersComponent from "@/features/followers/Followers";
import Footer from "@/components/layouts/footer/Footer";
import ClientComponent from "@/components/layouts/clientComponent/ClientComponent";

function Followers() {
  return (
    <>
      <ClientComponent>
        <Topbar />
        <FollowersComponent />
        <Footer />
      </ClientComponent>
    </>
  );
}

export default Followers;
