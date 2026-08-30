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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

const LANGUAGES = [
  { code: "fr", name: "Français", dir: "ltr" },
  { code: "en", name: "English", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
];

export default function EditArticlePage() {
  const router = useRouter();
  const locale = useLocale() as "fr" | "en" | "ar";
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const categories = useQuery(api.categories.list, {});
  // Use `useQuery` without args if isNew, otherwise pass slug or ID. 
  // Wait, our getBySlug expects a slug. Let's add a getById in backend or use list and filter.
  // Actually, we should add getById in convex/articles.ts later. For now, let's assume we have it.
  const article = useQuery(api.articles.getById, isNew ? "skip" : { id: id as any });

  const create = useMutation(api.articles.create);
  const update = useMutation(api.articles.update);

  const [formData, setFormData] = useState({
    slug: "",
    categoryId: "",
    status: "draft" as "draft" | "published" | "archived",
    featured: false,
    title: { fr: "", en: "", ar: "" },
    excerpt: { fr: "", en: "", ar: "" },
    content: { fr: "", en: "", ar: "" },
    seoTitle: { fr: "", en: "", ar: "" },
    seoDescription: { fr: "", en: "", ar: "" },
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (article) {
      setFormData({
        slug: article.slug,
        categoryId: article.categoryId || "",
        status: article.status,
        featured: article.featured,
        title: { fr: article.title.fr || "", en: article.title.en || "", ar: article.title.ar || "" },
        excerpt: { fr: article.excerpt.fr || "", en: article.excerpt.en || "", ar: article.excerpt.ar || "" },
        content: { fr: article.content.fr || "", en: article.content.en || "", ar: article.content.ar || "" },
        seoTitle: { fr: article.seoTitle.fr || "", en: article.seoTitle.en || "", ar: article.seoTitle.ar || "" },
        seoDescription: { fr: article.seoDescription.fr || "", en: article.seoDescription.en || "", ar: article.seoDescription.ar || "" },
      });
    }
  }, [article]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isNew) {
        await create({
          ...formData,
          categoryId: formData.categoryId as any,
        });
        router.push(`/${locale}/admin/articles`);
      } else {
        await update({
          id: id as any,
          ...formData,
          categoryId: formData.categoryId as any,
        });
        alert("Article sauvegardé !");
      }
    } catch (err: any) {
      alert(err.message || "Erreur lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleMultilingualChange = (field: string, lang: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...(prev as any)[field],
        [lang]: value,
      },
    }));
  };

  if (!isNew && article === undefined) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}/admin/articles`}>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold font-heading">
            {isNew ? "Nouvel Article" : "Éditer l'article"}
          </h1>
        </div>
        <Button onClick={handleSave} disabled={isSaving || !formData.categoryId || !formData.slug} className="flex items-center gap-2">
          {isSaving ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Enregistrer</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="fr" className="w-full">
                <TabsList className="mb-4">
                  {LANGUAGES.map((l) => (
                    <TabsTrigger key={l.code} value={l.code}>{l.name}</TabsTrigger>
                  ))}
                </TabsList>
                
                {LANGUAGES.map((l) => (
                  <TabsContent key={l.code} value={l.code} className="space-y-4 outline-none">
                    <div className="space-y-2">
                      <Label>Titre ({l.code.toUpperCase()})</Label>
                      <Input 
                        dir={l.dir}
                        value={(formData.title as any)[l.code]}
                        onChange={(e) => handleMultilingualChange("title", l.code, e.target.value)}
                        placeholder="Titre de l'article"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Extrait court</Label>
                      <Textarea 
                        dir={l.dir}
                        value={(formData.excerpt as any)[l.code]}
                        onChange={(e) => handleMultilingualChange("excerpt", l.code, e.target.value)}
                        placeholder="Extrait qui sera affiché sur les cartes..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Contenu complet</Label>
                      <RichTextEditor 
                        dir={l.dir as "ltr" | "rtl"}
                        value={(formData.content as any)[l.code]}
                        onChange={(value) => handleMultilingualChange("content", l.code, value)}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2 mb-4">SEO</h3>
              <Tabs defaultValue="fr" className="w-full">
                <TabsList className="mb-4">
                  {LANGUAGES.map((l) => (
                    <TabsTrigger key={l.code} value={l.code}>{l.name}</TabsTrigger>
                  ))}
                </TabsList>
                {LANGUAGES.map((l) => (
                  <TabsContent key={l.code} value={l.code} className="space-y-4 outline-none">
                    <div className="space-y-2">
                      <Label>Méta-titre ({l.code.toUpperCase()})</Label>
                      <Input 
                        dir={l.dir}
                        value={(formData.seoTitle as any)[l.code]}
                        onChange={(e) => handleMultilingualChange("seoTitle", l.code, e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Méta-description</Label>
                      <Textarea 
                        dir={l.dir}
                        value={(formData.seoDescription as any)[l.code]}
                        onChange={(e) => handleMultilingualChange("seoDescription", l.code, e.target.value)}
                        rows={2}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2 mb-4">Paramètres</h3>
              
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={formData.status} onValueChange={(v: any) => setFormData(prev => ({ ...prev, status: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="archived">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Catégorie <span className="text-destructive">*</span></Label>
                <Select value={formData.categoryId} onValueChange={(v) => setFormData(prev => ({ ...prev, categoryId: v || "" }))}>
                  <SelectTrigger className={!formData.categoryId ? "border-destructive" : ""}>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name.fr} ({cat.slug})
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
                  placeholder="ex: les-conditions-de-la-priere"
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
