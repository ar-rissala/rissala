"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Upload, FileText, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useParams, useRouter } from "next/navigation";

export default function EditBookPage() {
  const router = useRouter();
  const locale = useLocale() as "fr" | "en" | "ar";
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const categories = useQuery(api.categories.list, {});
  const book = useQuery(api.books.getById, isNew ? "skip" : { id: id as any });

  const create = useMutation(api.books.create);
  const update = useMutation(api.books.update);
  const generateUploadUrl = useMutation(api.books.generateUploadUrl);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    description: "",
    language: "fr" as "fr" | "en" | "ar",
    categoryId: "",
    published: false,
    featured: false,
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        slug: book.slug,
        author: book.author,
        description: book.description,
        language: book.language,
        categoryId: book.categoryId,
        published: book.published,
        featured: book.featured,
      });
    }
  }, [book]);

  const uploadFile = async (file: File) => {
    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    const { storageId } = await result.json();
    return storageId;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isNew && !pdfFile) {
        alert("Veuillez sélectionner un fichier PDF pour ce livre.");
        setIsSaving(false);
        return;
      }

      let pdfStorageId = undefined;
      let coverStorageId = undefined;

      if (pdfFile) {
        pdfStorageId = await uploadFile(pdfFile);
      }
      if (coverFile) {
        coverStorageId = await uploadFile(coverFile);
      }

      if (isNew) {
        await create({
          ...formData,
          categoryId: formData.categoryId as any,
          pdfStorageId: pdfStorageId as any,
          coverStorageId,
        });
        router.push(`/${locale}/admin/livres`);
      } else {
        await update({
          id: id as any,
          ...formData,
          categoryId: formData.categoryId as any,
          pdfStorageId,
          coverStorageId,
        });
        alert("Livre sauvegardé !");
      }
    } catch (err: any) {
      alert(err.message || "Erreur lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isNew && book === undefined) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}/admin/livres`}>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold font-heading">
            {isNew ? "Ajouter un livre" : "Éditer le livre"}
          </h1>
        </div>
        <Button onClick={handleSave} disabled={isSaving || !formData.categoryId || !formData.slug || (isNew && !pdfFile)} className="flex items-center gap-2">
          {isSaving ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Enregistrer</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Titre du livre <span className="text-destructive">*</span></Label>
                  <Input 
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Ryad As-Salihin"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Auteur <span className="text-destructive">*</span></Label>
                  <Input 
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Ex: Imam An-Nawawi"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Résumé du livre..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                {/* File uploads */}
                <div className="space-y-2">
                  <Label>Fichier PDF {isNew && <span className="text-destructive">*</span>}</Label>
                  <div className="border-2 border-dashed rounded-xl p-4 text-center hover:bg-muted/50 transition-colors">
                    <input 
                      type="file" 
                      accept="application/pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <FileText className="w-8 h-8 text-primary/50" />
                      <span className="text-sm font-medium">
                        {pdfFile ? pdfFile.name : (isNew ? "Sélectionner un PDF" : "Remplacer le PDF actuel")}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Couverture (Image)</Label>
                  <div className="border-2 border-dashed rounded-xl p-4 text-center hover:bg-muted/50 transition-colors">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label htmlFor="cover-upload" className="cursor-pointer flex flex-col items-center gap-2">
                      <ImageIcon className="w-8 h-8 text-primary/50" />
                      <span className="text-sm font-medium">
                        {coverFile ? coverFile.name : (book?.coverUrl ? "Remplacer l'image" : "Sélectionner une image")}
                      </span>
                    </label>
                  </div>
                  {!coverFile && book?.coverUrl && (
                    <div className="mt-2 text-center text-xs text-muted-foreground">
                      L'image actuelle est bien enregistrée.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2 mb-4">Métadonnées</h3>
              
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={formData.published ? "published" : "draft"} onValueChange={(v: any) => setFormData(prev => ({ ...prev, published: v === "published" }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Langue du document <span className="text-destructive">*</span></Label>
                <Select value={formData.language} onValueChange={(v: any) => setFormData(prev => ({ ...prev, language: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Langue..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabe (العربية)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Catégorie <span className="text-destructive">*</span></Label>
                <Select value={formData.categoryId} onValueChange={(v) => setFormData(prev => ({ ...prev, categoryId: v }))}>
                  <SelectTrigger className={!formData.categoryId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name.fr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Slug de l'URL <span className="text-destructive">*</span></Label>
                <Input 
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") }))}
                  placeholder="ex: ryad-as-salihin"
                  className={!formData.slug ? "border-destructive" : ""}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
