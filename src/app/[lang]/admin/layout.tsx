import { redirect } from "next/navigation";
import { getAuthUserId } from "@convex-dev/auth/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const userId = await getAuthUserId();

  if (!userId) {
    redirect(`/${lang}/connexion`);
  }

  const user = await fetchQuery(api.users.getCurrentUser, {});
  
  if (user?.role !== "admin" && user?.role !== "editor") {
    redirect(`/${lang}`);
  }
  
  return (
    <div className="flex h-screen overflow-hidden bg-muted/20">
      {/* Sidebar Admin */}
      <aside className="w-64 border-r bg-card flex-shrink-0 flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold font-heading text-primary">Rissala Admin</h2>
        </div>
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <a href={`/${lang}/admin/dashboard`} className="block px-4 py-2 text-sm text-foreground rounded-lg bg-primary/10 text-primary font-medium">
            Dashboard
          </a>
          <a href={`/${lang}/admin/articles`} className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
            Articles
          </a>
          <a href={`/${lang}/admin/categories`} className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
            Catégories
          </a>
          <a href={`/${lang}/admin/livres`} className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
            Livres & PDF
          </a>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
