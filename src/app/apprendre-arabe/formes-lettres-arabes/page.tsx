import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Les 4 Formes des Lettres Arabes : Isolée, Initiale, Médiane, Finale | Rissala",
  description:
    "Comprenez le système cursif arabe : chaque lettre change de forme selon sa position. Tableau complet des 4 formes + règles de connexion. Méthode Rissala.",
};

const lettresFormes = [
  { nom: "Alif", isolee: "ا", initiale: "ا", mediane: "ـا", finale: "ـا", connecte: false },
  { nom: "Bā'", isolee: "ب", initiale: "بـ", mediane: "ـبـ", finale: "ـب", connecte: true },
  { nom: "Tā'", isolee: "ت", initiale: "تـ", mediane: "ـتـ", finale: "ـت", connecte: true },
  { nom: "Thā'", isolee: "ث", initiale: "ثـ", mediane: "ـثـ", finale: "ـث", connecte: true },
  { nom: "Jīm", isolee: "ج", initiale: "جـ", mediane: "ـجـ", finale: "ـج", connecte: true },
  { nom: "Ḥā'", isolee: "ح", initiale: "حـ", mediane: "ـحـ", finale: "ـح", connecte: true },
  { nom: "Khā'", isolee: "خ", initiale: "خـ", mediane: "ـخـ", finale: "ـخ", connecte: true },
  { nom: "Dāl", isolee: "د", initiale: "د", mediane: "ـد", finale: "ـد", connecte: false },
  { nom: "Dhāl", isolee: "ذ", initiale: "ذ", mediane: "ـذ", finale: "ـذ", connecte: false },
  { nom: "Rā'", isolee: "ر", initiale: "ر", mediane: "ـر", finale: "ـر", connecte: false },
  { nom: "Zāy", isolee: "ز", initiale: "ز", mediane: "ـز", finale: "ـز", connecte: false },
  { nom: "Sīn", isolee: "س", initiale: "سـ", mediane: "ـسـ", finale: "ـس", connecte: true },
  { nom: "Shīn", isolee: "ش", initiale: "شـ", mediane: "ـشـ", finale: "ـش", connecte: true },
  { nom: "Ṣād", isolee: "ص", initiale: "صـ", mediane: "ـصـ", finale: "ـص", connecte: true },
  { nom: "Ḍād", isolee: "ض", initiale: "ضـ", mediane: "ـضـ", finale: "ـض", connecte: true },
  { nom: "Ṭā'", isolee: "ط", initiale: "طـ", mediane: "ـطـ", finale: "ـط", connecte: true },
  { nom: "Ẓā'", isolee: "ظ", initiale: "ظـ", mediane: "ـظـ", finale: "ـظ", connecte: true },
  { nom: "'Ayn", isolee: "ع", initiale: "عـ", mediane: "ـعـ", finale: "ـع", connecte: true },
  { nom: "Ghayn", isolee: "غ", initiale: "غـ", mediane: "ـغـ", finale: "ـغ", connecte: true },
  { nom: "Fā'", isolee: "ف", initiale: "فـ", mediane: "ـفـ", finale: "ـف", connecte: true },
  { nom: "Qāf", isolee: "ق", initiale: "قـ", mediane: "ـقـ", finale: "ـق", connecte: true },
  { nom: "Kāf", isolee: "ك", initiale: "كـ", mediane: "ـكـ", finale: "ـك", connecte: true },
  { nom: "Lām", isolee: "ل", initiale: "لـ", mediane: "ـلـ", finale: "ـل", connecte: true },
  { nom: "Mīm", isolee: "م", initiale: "مـ", mediane: "ـمـ", finale: "ـم", connecte: true },
  { nom: "Nūn", isolee: "ن", initiale: "نـ", mediane: "ـنـ", finale: "ـن", connecte: true },
  { nom: "Hā'", isolee: "ه", initiale: "هـ", mediane: "ـهـ", finale: "ـه", connecte: true },
  { nom: "Wāw", isolee: "و", initiale: "و", mediane: "ـو", finale: "ـو", connecte: false },
  { nom: "Yā'", isolee: "ي", initiale: "يـ", mediane: "ـيـ", finale: "ـي", connecte: true },
];

const nonConnectantes = ["ا", "د", "ذ", "ر", "ز", "و"];

export default function FormesLettresPage() {
  return (
    <ArticleLayout
      title="Les 4 Formes des Lettres Arabes :"
      titleAccent="Isolée, Initiale, Médiane, Finale"
      subtitle="L'arabe est un système graphique dynamique. Chaque lettre change de forme selon sa position dans le mot. Comprenez ce mécanisme essentiel pour apprendre à lire l'arabe."
      articleNumber={2}
      totalArticles={5}
      prevArticle={{ href: "/apprendre-arabe/alphabet-arabe", title: "L'alphabet arabe" }}
      nextArticle={{ href: "/apprendre-arabe/voyelles-courtes-arabe", title: "Les voyelles courtes" }}
    >
      <p>
        Dans l&apos;article précédent, vous avez appris à reconnaître les <strong>28 lettres arabes dans leur forme isolée</strong>. Maintenant, il faut comprendre un concept fondamental : en arabe, les lettres <strong>changent de forme</strong> selon leur position dans le mot.
      </p>
      <p>
        Ce n&apos;est pas un caprice graphique. C&apos;est une conséquence directe du fait que l&apos;arabe est une <strong>écriture cursive</strong> : les lettres se connectent entre elles, exactement comme en écriture manuscrite latine, mais <strong>en permanence</strong> — y compris en version imprimée.
      </p>

      <h2>Pourquoi les lettres arabes changent de forme</h2>
      <p>
        En français imprimé, chaque lettre reste identique quelle que soit sa position : le « a » de « chat » est le même que le « a » de « table ». En <strong>arabe</strong>, ce n&apos;est pas le cas.
      </p>
      <p>
        L&apos;arabe est toujours connecté. Quand une lettre se trouve au début d&apos;un mot, elle doit pouvoir se connecter à la lettre suivante. Quand elle est au milieu, elle est connectée des deux côtés. Quand elle est à la fin, elle se connecte uniquement à la lettre précédente.
      </p>
      <p>
        Chaque lettre a donc <strong>jusqu&apos;à 4 formes</strong> :
      </p>
      <ul>
        <li><strong>Isolée</strong> — la lettre seule, non connectée</li>
        <li><strong>Initiale</strong> — en début de mot, connectée à droite uniquement (→ vers la lettre suivante)</li>
        <li><strong>Médiane</strong> — au milieu du mot, connectée des deux côtés</li>
        <li><strong>Finale</strong> — en fin de mot, connectée à gauche uniquement (← vers la lettre précédente)</li>
      </ul>

      <div className="info-box">
        <div className="info-box-title">💡 Concept clé</div>
        <div className="info-box-content">
          L&apos;arabe se lit de droite à gauche. Donc la lettre <strong>initiale</strong> est celle qui est la plus à <strong>droite</strong> du mot, et la lettre <strong>finale</strong> est celle la plus à <strong>gauche</strong>.
        </div>
      </div>

      <h2>Le principe graphique : comprendre la transformation</h2>
      <p>
        La bonne nouvelle : les formes ne sont pas totalement différentes. La <strong>structure de base</strong> de chaque lettre reste reconnaissable. Ce qui change, c&apos;est la manière dont la lettre se connecte à ses voisines — une « queue » s&apos;ajoute, un « trait » se prolonge.
      </p>
      <p>
        Prenons l&apos;exemple de <span className="arabic-inline">ب</span> (bā&apos;) :
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Position</th><th>Forme</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>Isolée</td><td><span className="arabic-inline">ب</span></td><td>Forme complète avec la queue et le point</td></tr>
            <tr><td>Initiale</td><td><span className="arabic-inline">بـ</span></td><td>Queue coupée, trait de connexion vers la gauche</td></tr>
            <tr><td>Médiane</td><td><span className="arabic-inline">ـبـ</span></td><td>Connectée des deux côtés, forme minimale</td></tr>
            <tr><td>Finale</td><td><span className="arabic-inline">ـب</span></td><td>Queue conservée, connectée depuis la droite</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Le point reste toujours en dessous. La forme de base (la « dent ») est toujours reconnaissable. Seules les connexions changent.
      </p>

      <h2>Les 6 lettres qui NE se connectent PAS à gauche</h2>
      <p>
        C&apos;est la règle la plus importante de cet article. Sur les 28 lettres, <strong>6 ne se connectent jamais à la lettre suivante</strong> (c&apos;est-à-dire vers la gauche). Ces lettres sont :
      </p>
      <div className="flex flex-wrap gap-4 justify-center my-8">
        {nonConnectantes.map((l, i) => (
          <div key={i} className="letter-showcase">{l}</div>
        ))}
      </div>
      <p>
        Ces 6 lettres n&apos;ont que <strong>2 formes</strong> (isolée et finale) au lieu de 4. Elles ne peuvent pas se connecter à la lettre qui les suit. Après ces lettres, la lettre suivante reprend sa forme initiale ou isolée.
      </p>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ Mémoriser cette règle</div>
        <div className="warning-box-content">
          Retenez : <strong>ا د ذ ر ز و</strong> — ces 6 lettres « cassent » la connexion. La lettre qui vient après elles reprend sa forme isolée ou initiale. C&apos;est une règle mécanique, sans exception.
        </div>
      </div>

      <h2>Tableau complet des 4 formes des 28 lettres arabes</h2>
      <p>
        Voici le tableau de référence. Étudiez-le en gardant en tête que les lettres non-connectantes (marquées ✗) n&apos;ont que 2 formes distinctes.
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Isolée</th>
              <th>Initiale</th>
              <th>Médiane</th>
              <th>Finale</th>
              <th>Connecte ?</th>
            </tr>
          </thead>
          <tbody>
            {lettresFormes.map((l, i) => (
              <tr key={i}>
                <td className="font-medium text-foreground text-sm">{l.nom}</td>
                <td><span className="arabic-inline">{l.isolee}</span></td>
                <td><span className="arabic-inline">{l.initiale}</span></td>
                <td><span className="arabic-inline">{l.mediane}</span></td>
                <td><span className="arabic-inline">{l.finale}</span></td>
                <td>
                  <span className={`text-xs font-medium ${l.connecte ? "text-primary" : "text-amber-500"}`}>
                    {l.connecte ? "✓ Oui" : "✗ Non"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Comment lire un mot arabe : décomposition visuelle</h2>
      <p>
        Prenons le mot <span className="arabic-inline">كَتَبَ</span> (kataba — il a écrit) et décomposons-le :
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Position</th><th>Lettre</th><th>Forme utilisée</th><th>Pourquoi ?</th></tr>
          </thead>
          <tbody>
            <tr><td>1ère (droite)</td><td><span className="arabic-inline">كـ</span></td><td>Initiale</td><td>Début du mot, se connecte à la suivante</td></tr>
            <tr><td>2ème</td><td><span className="arabic-inline">ـتـ</span></td><td>Médiane</td><td>Au milieu, connectée des deux côtés</td></tr>
            <tr><td>3ème (gauche)</td><td><span className="arabic-inline">ـب</span></td><td>Finale</td><td>Fin du mot, connectée uniquement à la précédente</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Exemple avec une lettre non-connectante</h3>
      <p>
        Prenons <span className="arabic-inline">دَرَسَ</span> (darasa — il a étudié) :
      </p>
      <ul>
        <li><span className="arabic-inline">د</span> — forme isolée (ne se connecte pas à gauche)</li>
        <li><span className="arabic-inline">ر</span> — forme isolée (ne se connecte pas à gauche non plus)</li>
        <li><span className="arabic-inline">س</span> — forme isolée (dernière lettre, aucune connexion)</li>
      </ul>
      <p>
        Ici, aucune lettre ne se connecte car <span className="arabic-inline">د</span> et <span className="arabic-inline">ر</span> sont des lettres non-connectantes. Chaque lettre reprend sa forme isolée.
      </p>

      <h2>L&apos;arabe est un système graphique dynamique</h2>
      <p>
        C&apos;est le concept central de cet article. L&apos;arabe n&apos;est pas un alphabet statique comme le latin imprimé. C&apos;est un <strong>système graphique dynamique</strong> où la forme d&apos;une lettre dépend de son contexte — c&apos;est-à-dire des lettres qui l&apos;entourent.
      </p>
      <p>
        Cette propriété rend l&apos;arabe visuellement très <strong>fluide et élégant</strong>, mais elle demande un effort d&apos;adaptation pour le débutant. La bonne approche :
      </p>
      <ol>
        <li><strong>Maîtrisez d&apos;abord les formes isolées</strong> (article 1)</li>
        <li><strong>Comprenez la logique de connexion</strong> (cet article)</li>
        <li><strong>Pratiquez la reconnaissance</strong> en lisant des mots simples</li>
      </ol>

      <div className="info-box">
        <div className="info-box-title">📌 Conseil pratique Rissala</div>
        <div className="info-box-content">
          Ne mémorisez PAS les 28 × 4 = 112 formes individuellement. Mémorisez les <strong>formes isolées</strong> + les <strong>6 lettres non-connectantes</strong> + le <strong>principe de connexion</strong>. Votre cerveau fera le reste. C&apos;est un pattern, pas une liste.
        </div>
      </div>

      <h2>Exercice de reconnaissance</h2>
      <p>Regardez ces mots et essayez d&apos;identifier chaque lettre et sa forme :</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        {[
          { mot: "بَيْت", trans: "bayt", sens: "maison" },
          { mot: "قَلَم", trans: "qalam", sens: "stylo" },
          { mot: "كُرْسِي", trans: "kursī", sens: "chaise" },
        ].map((ex, i) => (
          <div key={i} className="step-card text-center">
            <div className="arabic text-3xl mb-2">{ex.mot}</div>
            <div className="text-sm text-primary font-medium">{ex.trans}</div>
            <div className="text-xs text-muted-foreground">{ex.sens}</div>
          </div>
        ))}
      </div>

      <h2>Résumé</h2>
      <ol>
        <li>Chaque lettre arabe a jusqu&apos;à <strong>4 formes</strong> : isolée, initiale, médiane, finale.</li>
        <li>Les formes changent selon la <strong>position dans le mot</strong> et les connexions.</li>
        <li><strong>6 lettres</strong> (ا د ذ ر ز و) ne se connectent jamais à la lettre suivante.</li>
        <li>La forme de base reste toujours <strong>reconnaissable</strong> — ce sont les connexions qui changent.</li>
        <li>L&apos;arabe est un <strong>système graphique dynamique</strong>, pas un alphabet statique.</li>
      </ol>
      <p>
        Dans l&apos;article suivant, nous abordons les <strong>voyelles courtes (harakāt)</strong> — ces signes invisibles qui donnent vie aux consonnes.
      </p>
    </ArticleLayout>
  );
}
