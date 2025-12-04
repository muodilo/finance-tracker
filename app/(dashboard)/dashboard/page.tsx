import { Navbar } from "@/components/navbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">
        {/* Dashboard content will go here */}
      </main>
    </div>
  );
}