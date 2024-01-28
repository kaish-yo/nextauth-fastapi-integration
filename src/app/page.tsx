import HealthCheck from "@/components/HealthCheckButton";
import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <Link href="/admin" className={buttonVariants()}>
          Open My Admin
        </Link>
      </div>
      <h2>Client Session</h2>
      <User />
      <HealthCheck />
    </>
  );
}
