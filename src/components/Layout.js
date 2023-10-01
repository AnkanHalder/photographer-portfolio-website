import React from "react";
import AdminNav from "./AdminNav";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex">
      <AdminNav />
      <div className="flex-grow bg-white text-black rounded-lg p-2 mb-2 mt-2 mr-2">
        {children}
      </div>
    </div>
  );
}
