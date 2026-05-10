import { getFarms, getDemandPosts } from "@/lib/data";
import FarmerClient from "./FarmerClient";

export const dynamic = "force-dynamic";

export default async function FarmerPage() {
  const [farms, demandPosts] = await Promise.all([getFarms(), getDemandPosts()]);
  const myFarm = farms.find((f) => f.id === "f-02") ?? farms[0];
  return <FarmerClient myFarm={myFarm} farms={farms} demandPosts={demandPosts} />;
}
