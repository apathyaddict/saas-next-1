import React from "react";
import UploadButton from "./UploadButton";

const Dashboard = () => {
  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div
        className="mt-8 flex flex-col justify-between 
      gap-4 items-start border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0 ">
        <h1 className="mb-3 font-bold text-gray-900  text-5xl">My Files</h1>

        <UploadButton />
      </div>
    </main>
  );
};

export default Dashboard;
