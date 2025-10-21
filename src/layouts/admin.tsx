import { NavbarTop } from "@/components/admin-navbar/topbar";
import Sidebar from "@/components/admin-navbar/sidebar";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-content2 dark:bg-background px-4 pt-[1px]">
      <NavbarTop />
      <div className="relative grid grid-cols-6 gap-6 mt-5 grid-rows-[auto_1fr_auto]">
        <div className="col-span-1 min-h-screen">
          <Sidebar />
        </div>
        <div className="col-span-5">
          <main className="container flex-grow min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
