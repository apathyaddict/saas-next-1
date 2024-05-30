"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/users");

      const data = await response.json();
      setUsers(data);
      console.log("users", data);
    };
    fetchPosts();
  }, []);

  return <div>test: </div>;
};

export default page;
