"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Layers, Users } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function AdminDashboardPage() {
  const locale = useLocale();

  const articles = useQuery(api.articles.list, {});
  const books = useQuery(api.books.list, {});
  const categories = useQuery(api.categories.list, {});

  // Wait for data to load
  const isLoaded = articles !== undefined && books !== undefined && categories !== undefined;

  const stats = [
    {
      title: "Articles",
      value: articles?.length || 0,
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      href: `/${locale}/admin/articles`,
      color: "bg-blue-500/10",
    },
    {
      title: "Livres & PDF",
      value: books?.length || 0,
      icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
      href: `/${locale}/admin/livres`,
      color: "bg-emerald-500/10",
    },
    {
      title: "Catégories",
      value: categories?.length || 0,
      icon: <Layers className="w-5 h-5 text-purple-500" />,
      href: `/${locale}/admin/categories`,
      color: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Bienvenue dans l'espace d'administration de Rissala.</p>
      </div>

      {!isLoaded ? (
        <div className="flex justify-center p-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Link key={index} href={stat.href}>
              <Card className="hover:shadow-md transition-all hover:border-primary/50 group cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {isLoaded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Derniers articles publiés</CardTitle>
            </CardHeader>
            <CardContent>
              {articles?.filter(a => a.status === "published").slice(0, 5).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Aucun article publié.</p>
              ) : (
                <ul className="space-y-4">
                  {articles?.filter(a => a.status === "published").slice(0, 5).map(article => (
                    <li key={article._id} className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-sm">{(article.title as any)[locale] || article.title.fr}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(article.publishedAt || article.createdAt).toLocaleDateString(locale)}
                        </p>
                      </div>
                      <Link href={`/${locale}/admin/articles/${article._id}`} className="text-xs text-primary hover:underline">
                        Éditer
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brouillons en attente</CardTitle>
            </CardHeader>
            <CardContent>
              {articles?.filter(a => a.status === "draft").slice(0, 5).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Aucun brouillon en attente.</p>
              ) : (
                <ul className="space-y-4">
                  {articles?.filter(a => a.status === "draft").slice(0, 5).map(article => (
                    <li key={article._id} className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-sm">{(article.title as any)[locale] || article.title.fr}</p>
                        <p className="text-xs text-amber-500 font-medium">Brouillon</p>
                      </div>
                      <Link href={`/${locale}/admin/articles/${article._id}`} className="text-xs text-primary hover:underline">
                        Reprendre
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
