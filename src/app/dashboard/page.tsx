import Dashboard from "@/components/Dashboard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const PageDash = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  //   if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  if (!user || !user.id) redirect("/");

  return <Dashboard user={user} />;
};

export default PageDash;
