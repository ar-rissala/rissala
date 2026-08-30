"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function AdminCategoriesPage() {
  const locale = useLocale() as "fr" | "en" | "ar";
  const categories = useQuery(api.categories.list, {});
  const remove = useMutation(api.categories.remove);

  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: any) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      setIsDeleting(id);
      try {
        await remove({ id });
      } catch (err: any) {
        console.error(err);
        alert(err.message || "Erreur lors de la suppression");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-heading">Catégories</h1>
          <p className="text-muted-foreground text-sm">Gérez les thématiques de la plateforme</p>
        </div>
        <Link href={`/${locale}/admin/categories/new`}>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Nouvelle Catégorie</span>
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Toutes les catégories</CardTitle>
        </CardHeader>
        <CardContent>
          {!categories ? (
            <div className="flex justify-center p-8">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              Aucune catégorie trouvée.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-muted/50 uppercase">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Ordre</th>
                    <th className="px-4 py-3">Nom</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3 rounded-tr-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat._id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4 text-muted-foreground">
                        {cat.order}
                      </td>
                      <td className="px-4 py-4 font-medium text-foreground">
                        {cat.name[locale] || cat.name.fr || "Sans nom"}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {cat.slug}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cat.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'
                        }`}>
                          {cat.active ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/${locale}/admin/categories/${cat._id}`}>
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-primary">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-8 h-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(cat._id)}
                            disabled={isDeleting === cat._id}
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
