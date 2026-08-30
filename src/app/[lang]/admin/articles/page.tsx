"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function AdminArticlesPage() {
  const locale = useLocale() as "fr" | "en" | "ar";
  const articles = useQuery(api.articles.list, {});
  const remove = useMutation(api.articles.remove);

  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: any) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      setIsDeleting(id);
      try {
        await remove({ id });
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-heading">Articles</h1>
          <p className="text-muted-foreground text-sm">Gérez le contenu éditorial de Rissala</p>
        </div>
        <Link href={`/${locale}/admin/articles/new`}>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Nouvel Article</span>
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tous les articles</CardTitle>
        </CardHeader>
        <CardContent>
          {!articles ? (
            <div className="flex justify-center p-8">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              Aucun article trouvé. Créez-en un nouveau !
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-muted/50 uppercase">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Titre</th>
                    <th className="px-4 py-3">Catégorie</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 rounded-tr-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article._id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4 font-medium text-foreground">
                        {article.title[locale] || article.title.fr || "Sans titre"}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {article.category?.name[locale] || article.category?.name.fr || "-"}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          article.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' :
                          article.status === 'draft' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-slate-500/10 text-slate-500'
                        }`}>
                          {article.status === 'published' ? 'Publié' : article.status === 'draft' ? 'Brouillon' : 'Archivé'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {new Date(article.createdAt).toLocaleDateString(locale)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/${locale}/admin/articles/${article._id}`}>
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-primary">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-8 h-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(article._id)}
                            disabled={isDeleting === article._id}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
