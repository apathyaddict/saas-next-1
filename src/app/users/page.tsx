"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/users", { next: { revalidate: 10 } });

      const data = await response.json();
      setUsers(data);
      console.log("users", data);
    };
    fetchPosts();
  }, []);

  return <div></div>;
};

export default page;
