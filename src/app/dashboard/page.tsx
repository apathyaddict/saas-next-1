import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  //   if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  if (!user || !user.id) redirect("/");

  return <div> 1</div>;
};

export default Dashboard;
