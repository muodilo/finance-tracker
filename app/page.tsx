import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/dist/client/link";

export default function Home() {
  return (
    <div>
      <Link href="/dashboard">Go to Dashboard</Link>
    </div>
  );
}
