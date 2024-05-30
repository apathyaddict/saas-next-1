"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/users");
      console.log("response", response);
      const data = await response.json();
      setUsers(data);
      console.log("users", users);
    };
    fetchPosts();
  }, []);

  return <div>test: {users}</div>;
};

export default page;
