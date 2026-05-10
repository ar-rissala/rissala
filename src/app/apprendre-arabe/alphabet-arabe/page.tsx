import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Apprendre l'Alphabet Arabe Facilement | Méthode Rissala",
  description:
    "Apprenez les 28 lettres de l'alphabet arabe avec la méthode Rissala : formes isolées, sons, direction d'écriture et système abjad. Guide complet pour débutants.",
};

const lettresArabes = [
  { lettre: "ا", nom: "Alif", son: "ā (voyelle longue)", groupe: "Base" },
  { lettre: "ب", nom: "Bā'", son: "b", groupe: "Base" },
  { lettre: "ت", nom: "Tā'", son: "t", groupe: "Base" },
  { lettre: "ث", nom: "Thā'", son: "th (think)", groupe: "Base" },
  { lettre: "ج", nom: "Jīm", son: "j", groupe: "Base" },
  { lettre: "ح", nom: "Ḥā'", son: "ḥ (h aspiré profond)", groupe: "Difficile" },
  { lettre: "خ", nom: "Khā'", son: "kh (jota espagnol)", groupe: "Difficile" },
  { lettre: "د", nom: "Dāl", son: "d", groupe: "Base" },
  { lettre: "ذ", nom: "Dhāl", son: "dh (the anglais)", groupe: "Base" },
  { lettre: "ر", nom: "Rā'", son: "r (roulé)", groupe: "Base" },
  { lettre: "ز", nom: "Zāy", son: "z", groupe: "Base" },
  { lettre: "س", nom: "Sīn", son: "s", groupe: "Base" },
  { lettre: "ش", nom: "Shīn", son: "sh (cheval)", groupe: "Base" },
  { lettre: "ص", nom: "Ṣād", son: "ṣ (s emphatique)", groupe: "Difficile" },
  { lettre: "ض", nom: "Ḍād", son: "ḍ (d emphatique)", groupe: "Difficile" },
  { lettre: "ط", nom: "Ṭā'", son: "ṭ (t emphatique)", groupe: "Difficile" },
  { lettre: "ظ", nom: "Ẓā'", son: "ẓ (dh emphatique)", groupe: "Difficile" },
  { lettre: "ع", nom: "'Ayn", son: "' (gutturale)", groupe: "Difficile" },
  { lettre: "غ", nom: "Ghayn", son: "gh (r grasseyé)", groupe: "Difficile" },
  { lettre: "ف", nom: "Fā'", son: "f", groupe: "Base" },
  { lettre: "ق", nom: "Qāf", son: "q (k uvulaire)", groupe: "Difficile" },
  { lettre: "ك", nom: "Kāf", son: "k", groupe: "Base" },
  { lettre: "ل", nom: "Lām", son: "l", groupe: "Base" },
  { lettre: "م", nom: "Mīm", son: "m", groupe: "Base" },
  { lettre: "ن", nom: "Nūn", son: "n", groupe: "Base" },
  { lettre: "ه", nom: "Hā'", son: "h (expiré)", groupe: "Base" },
  { lettre: "و", nom: "Wāw", son: "w / ū", groupe: "Base" },
  { lettre: "ي", nom: "Yā'", son: "y / ī", groupe: "Base" },
];

const lettresDifficiles = [
  { lettre: "ع", nom: "'Ayn", explication: "Contraction profonde du fond de la gorge. Aucun équivalent en français. Imaginez que vous comprimez votre gorge pour produire un son grave." },
  { lettre: "غ", nom: "Ghayn", explication: "Comme un « r » grasseyé très prononcé. Proche du « r » français mais produit plus en arrière dans la gorge." },
  { lettre: "ح", nom: "Ḥā'", explication: "Souffle chaud et profond depuis la gorge, comme souffler sur des lunettes pour les nettoyer, mais plus fort." },
  { lettre: "خ", nom: "Khā'", explication: "Comme la « jota » espagnole ou le « ch » allemand dans « Bach ». Frottement d'air dans l'arrière-gorge." },
  { lettre: "ق", nom: "Qāf", explication: "Un « k » très profond, produit à la base de la langue contre la luette. Beaucoup plus en arrière qu'un « k » normal." },
  { lettre: "ط", nom: "Ṭā'", explication: "Un « t » emphatique. La langue touche le palais avec plus de pression, la bouche s'arrondit. Son plus « lourd »." },
  { lettre: "ظ", nom: "Ẓā'", explication: "Version emphatique du « dh » (ذ). Langue entre les dents avec emphase, son plus grave et rond." },
  { lettre: "ص", nom: "Ṣād", explication: "Un « s » emphatique. La bouche prend une forme arrondie, le son est plus grave et plus « plein » qu'un « s » normal." },
];

export default function AlphabetArabePage() {
  return (
    <ArticleLayout
      title="Apprendre l'Alphabet Arabe :"
      titleAccent="Méthode Rissala"
      subtitle="Maîtrisez les 28 lettres arabes dans leur forme isolée. Zéro grammaire, 100% visuel. Le point de départ pour apprendre l'arabe depuis zéro."
      articleNumber={1}
      totalArticles={5}
      nextArticle={{ href: "/apprendre-arabe/formes-lettres-arabes", title: "Les 4 formes des lettres arabes" }}
    >
      <p>
        Vous voulez <strong>apprendre l&apos;arabe</strong> mais l&apos;alphabet vous semble impossible ? C&apos;est normal. La plupart des méthodes font une erreur fondamentale : elles mélangent alphabet, grammaire et conjugaison dès le premier jour. Résultat : surcharge cognitive et abandon.
      </p>
      <p>
        La <strong>méthode Rissala</strong> prend le problème à l&apos;envers. On commence par une seule chose : <strong>voir et reconnaître les 28 lettres arabes dans leur forme isolée</strong>. Pas de grammaire. Pas de conjugaison. Juste les lettres — leur forme, leur son, leur nom.
      </p>

      <h2>Pourquoi l&apos;alphabet arabe n&apos;est PAS difficile</h2>
      <p>
        L&apos;alphabet arabe contient <strong>28 lettres</strong>. En comparaison, l&apos;alphabet latin en a 26. Ce n&apos;est pas le nombre qui pose problème — ce sont les formes inconnues pour un cerveau habitué au latin.
      </p>
      <p>
        Bonne nouvelle : beaucoup de lettres arabes <strong>se ressemblent</strong>. Elles partagent la même forme de base et ne se distinguent que par des <strong>points diacritiques</strong> :
      </p>
      <ul>
        <li><span className="arabic-inline">ب</span> (bā&apos;) → un point en dessous</li>
        <li><span className="arabic-inline">ت</span> (tā&apos;) → deux points au-dessus</li>
        <li><span className="arabic-inline">ث</span> (thā&apos;) → trois points au-dessus</li>
      </ul>
      <p>
        Même forme, juste des points différents. Si vous apprenez une lettre, vous en apprenez trois. Ce principe de <strong>regroupement par familles visuelles</strong> est au cœur de la méthode Rissala.
      </p>

      <h2>Comprendre le système Abjad : l&apos;écriture consonantique</h2>
      <p>
        L&apos;arabe est un <strong>abjad</strong>, pas un alphabet au sens européen. Dans un abjad, <strong>on n&apos;écrit que les consonnes et les voyelles longues</strong>. Les voyelles courtes (a, i, u) ne sont pas écrites dans le texte courant — elles sont « devinées » par le lecteur grâce au contexte.
      </p>

      <div className="info-box">
        <div className="info-box-title">💡 Concept clé : l&apos;Abjad</div>
        <div className="info-box-content">
          Imaginez le français sans voyelles courtes : <strong>« ls lvrs snt sr l tbl »</strong> → « les livres sont sur la table ». Votre cerveau reconstitue les voyelles manquantes. L&apos;arabe fonctionne exactement de la même manière. Les 28 lettres sont les <strong>briques de base</strong> de ce système.
        </div>
      </div>

      <p>
        Les voyelles courtes existent — on les appelle <strong>harakāt</strong>. Ce sont de petits signes au-dessus ou en dessous des lettres. Mais elles ne sont écrites que dans les textes d&apos;apprentissage, le Coran et les livres pour enfants.
      </p>

      <h2>L&apos;écriture de droite à gauche</h2>
      <p>
        L&apos;arabe s&apos;écrit et se lit <strong>de droite à gauche</strong>. Plus vous commencez tôt, plus le réflexe devient naturel.
      </p>
      <div className="text-center my-8">
        <div className="arabic-large">كِتَاب</div>
        <p className="text-sm text-muted-foreground mt-2">« kitāb » (livre) — se lit : ك → ت → ا → ب</p>
      </div>

      <h2>Les 28 lettres : tableau complet en forme isolée</h2>
      <p>
        Chaque lettre est présentée dans sa <strong>forme isolée</strong> — la forme de base, non connectée. C&apos;est la première chose à mémoriser.
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>#</th><th>Lettre</th><th>Nom</th><th>Son</th><th>Niveau</th></tr>
          </thead>
          <tbody>
            {lettresArabes.map((l, i) => (
              <tr key={i}>
                <td className="text-muted-foreground/60 text-xs">{i + 1}</td>
                <td><span className="arabic-inline">{l.lettre}</span></td>
                <td className="font-medium text-foreground">{l.nom}</td>
                <td>{l.son}</td>
                <td>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${l.groupe === "Difficile" ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"}`}>
                    {l.groupe === "Difficile" ? "⚠ Difficile" : "✓ Accessible"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <div className="info-box-title">📌 Conseil Rissala</div>
        <div className="info-box-content">
          Ne mémorisez pas les 28 lettres en une seule session. La méthode recommande <strong>5 à 7 lettres par jour</strong>, avec révision de la veille. En 5 jours, vous connaissez tout l&apos;alphabet. La clé : <strong>répétition espacée</strong>.
        </div>
      </div>

      <h2>Les familles visuelles : regrouper pour mémoriser</h2>
      <p>
        La méthode Rissala organise les lettres en <strong>familles de formes similaires</strong>. Votre cerveau mémorise des patterns, pas des formes isolées sans lien.
      </p>
      <h3>Famille 1 : ب ت ث ن ي — les « dents »</h3>
      <p>Base en forme de barque avec des points qui les différencient.</p>
      <h3>Famille 2 : ج ح خ — les « crochets »</h3>
      <p>Même forme en crochet arrondi. <span className="arabic-inline">ج</span> point au centre, <span className="arabic-inline">ح</span> aucun point, <span className="arabic-inline">خ</span> point au-dessus.</p>
      <h3>Famille 3 : د ذ — les « bâtons »</h3>
      <p>Formes simples presque droites. <span className="arabic-inline">ذ</span> se distingue par un point.</p>
      <h3>Famille 4 : ر ز — les « têtes »</h3>
      <p>Petites formes courbes. <span className="arabic-inline">ز</span> a un point au-dessus.</p>
      <h3>Famille 5 : س ش — les « dentures »</h3>
      <p>Formes allongées. <span className="arabic-inline">ش</span> a trois points au-dessus.</p>
      <h3>Famille 6 : ص ض ط ظ — les « emphatiques »</h3>
      <p>Lettres avec sons emphatiques prononcés avec plus de pression.</p>
      <h3>Famille 7 : ع غ — les « gutturales »</h3>
      <p>Formes en nœud. <span className="arabic-inline">ع</span> sans point, <span className="arabic-inline">غ</span> avec point.</p>

      <h2>Les 8 lettres difficiles</h2>
      <p>
        Certaines lettres produisent des sons <strong>sans équivalent en français</strong>. L&apos;important est de les reconnaître visuellement d&apos;abord. La prononciation s&apos;améliorera avec la pratique.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        {lettresDifficiles.map((l, i) => (
          <div key={i} className="step-card">
            <div className="flex items-center gap-4 mb-3">
              <div className="letter-showcase">{l.lettre}</div>
              <div className="font-semibold text-foreground">{l.nom}</div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed m-0">{l.explication}</p>
          </div>
        ))}
      </div>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ Piège classique</div>
        <div className="warning-box-content">
          Ne passez PAS des heures sur la prononciation de <span className="arabic-inline">ع</span> ou <span className="arabic-inline">ق</span> avant de connaître toutes les lettres. La méthode Rissala : <strong>reconnaissance visuelle d&apos;abord</strong>, prononciation ensuite. Avancez.
        </div>
      </div>

      <h2>Comment mémoriser : la stratégie Rissala</h2>
      <h3>Étape 1 : Voir (reconnaissance visuelle)</h3>
      <p>Regardez chaque lettre isolée. Quand vous voyez <span className="arabic-inline">ب</span>, votre cerveau dit « bā&apos; — son B ».</p>
      <h3>Étape 2 : Comprendre (familles)</h3>
      <p>Regroupez par familles visuelles. La compréhension renforce la mémoire.</p>
      <h3>Étape 3 : Appliquer (écriture + répétition)</h3>
      <p>Écrivez à la main, de droite à gauche. La mémoire musculaire est puissante. Révisez la veille avant d&apos;avancer.</p>

      <h2>Ce qu&apos;on ne fait PAS encore</h2>
      <ul>
        <li><strong>La grammaire</strong> — elle viendra plus tard</li>
        <li><strong>La conjugaison</strong> — inutile tant que vous ne lisez pas</li>
        <li><strong>Les formes connectées</strong> — article suivant</li>
        <li><strong>Les voyelles courtes</strong> — article 3</li>
        <li><strong>La prononciation parfaite</strong> — elle se développe avec le temps</li>
      </ul>

      <h2>Résumé</h2>
      <ol>
        <li>L&apos;arabe a <strong>28 lettres</strong>, beaucoup se ressemblent (familles visuelles).</li>
        <li>L&apos;arabe est un <strong>abjad</strong> : on écrit les consonnes, les voyelles courtes sont omises.</li>
        <li>L&apos;écriture va de <strong>droite à gauche</strong>.</li>
        <li>Les lettres ont des <strong>formes isolées</strong> à mémoriser en premier.</li>
        <li>8 lettres ont des sons <strong>sans équivalent en français</strong>.</li>
        <li>Mémorisation : <strong>voir → comprendre → appliquer</strong>.</li>
      </ol>
    </ArticleLayout>
  );
}
