"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function AdminBooksPage() {
  const locale = useLocale() as "fr" | "en" | "ar";
  const books = useQuery(api.books.list, {});
  const remove = useMutation(api.books.remove);

  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: any) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce livre ? (Cette action supprimera également le fichier PDF et l'image de couverture)")) {
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
          <h1 className="text-2xl font-bold font-heading">Livres & PDF</h1>
          <p className="text-muted-foreground text-sm">Gérez la bibliothèque PDF de Rissala</p>
        </div>
        <Link href={`/${locale}/admin/livres/new`}>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Nouveau Livre</span>
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tous les livres</CardTitle>
        </CardHeader>
        <CardContent>
          {!books ? (
            <div className="flex justify-center p-8">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : books.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              Aucun livre trouvé dans la bibliothèque.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground bg-muted/50 uppercase">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg w-12">Couverture</th>
                    <th className="px-4 py-3">Titre & Auteur</th>
                    <th className="px-4 py-3">Langue</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3 rounded-tr-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4">
                        {book.coverUrl ? (
                          <img src={book.coverUrl} alt="Cover" className="w-10 h-14 object-cover rounded shadow-sm" />
                        ) : (
                          <div className="w-10 h-14 bg-muted flex items-center justify-center rounded shadow-sm">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-foreground">{book.title}</p>
                        <p className="text-xs text-muted-foreground">{book.author}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="uppercase text-xs font-bold tracking-wider text-muted-foreground">
                          {book.language}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          book.published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'
                        }`}>
                          {book.published ? 'Publié' : 'Brouillon'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/api/pdf?id=${book.pdfStorageId}`} target="_blank">
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-primary hover:text-primary/80 hover:bg-primary/10">
                              <FileText className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/${locale}/admin/livres/${book._id}`}>
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-primary">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-8 h-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(book._id)}
                            disabled={isDeleting === book._id}
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
