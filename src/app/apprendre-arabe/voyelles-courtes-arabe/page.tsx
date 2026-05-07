import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Voyelles Courtes en Arabe : Fatha, Kasra, Damma, Sukun | Rissala",
  description:
    "Comprenez les harakāt : fatha, kasra, damma et sukun. Les voyelles courtes en arabe ne sont PAS des lettres. Guide visuel méthode Rissala pour débutants.",
};

export default function VoyellesCourtes() {
  return (
    <ArticleLayout
      title="Voyelles Courtes en Arabe :"
      titleAccent="La Lecture Invisible"
      subtitle="Les voyelles courtes (harakāt) ne sont PAS des lettres. Ce sont des signes diacritiques qui donnent vie aux consonnes. Comprendre cette distinction est essentiel pour apprendre à lire l'arabe."
      articleNumber={3}
      totalArticles={5}
      prevArticle={{ href: "/apprendre-arabe/formes-lettres-arabes", title: "Les 4 formes des lettres" }}
      nextArticle={{ href: "/apprendre-arabe/voyelles-longues-arabe", title: "Les voyelles longues" }}
    >
      <p>
        Vous connaissez maintenant les <strong>28 lettres arabes</strong> et leurs <strong>4 formes contextuelles</strong>. Mais il manque un élément crucial : comment prononce-t-on ces lettres ? Comment sait-on si <span className="arabic-inline">ب</span> se prononce « ba », « bi » ou « bu » ?
      </p>
      <p>
        La réponse : les <strong>voyelles courtes</strong>, appelées <strong>harakāt</strong> (حَرَكَات) en arabe. Et c&apos;est ici que l&apos;arabe révèle sa logique la plus fascinante.
      </p>

      <h2>Le concept fondamental : les voyelles courtes ne sont PAS des lettres</h2>
      <p>
        C&apos;est <strong>le point le plus important</strong> de cet article. En français, les voyelles (a, e, i, o, u) sont des lettres à part entière, inscrites dans les mots. En arabe, les voyelles courtes sont des <strong>signes diacritiques</strong> — de petits symboles ajoutés au-dessus ou en dessous des consonnes.
      </p>
      <p>
        Elles ne font pas partie du « squelette » du mot. Elles sont comme des annotations que l&apos;on peut ajouter ou retirer sans changer l&apos;écriture de base.
      </p>

      <div className="info-box">
        <div className="info-box-title">💡 Analogie Rissala</div>
        <div className="info-box-content">
          Pensez aux consonnes comme au <strong>squelette</strong> d&apos;un mot, et aux voyelles courtes comme à la <strong>chair</strong> qui l&apos;entoure. Le squelette est toujours écrit. La chair est souvent implicite — le lecteur expérimenté la reconstitue mentalement.
        </div>
      </div>

      <h2>Les 3 voyelles courtes + le sukun</h2>
      <p>
        L&apos;arabe n&apos;a que <strong>3 voyelles courtes</strong>. C&apos;est remarquablement simple comparé au français (qui en a une quinzaine de sons vocaliques). Plus un signe spécial, le sukun, qui indique l&apos;absence de voyelle.
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Nom</th><th>Signe</th><th>Position</th><th>Son</th><th>Exemple</th><th>Prononciation</th></tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium text-foreground">Fatha</td>
              <td><span className="arabic-inline">َ</span></td>
              <td>Au-dessus</td>
              <td>a (bref)</td>
              <td><span className="arabic-inline">بَ</span></td>
              <td>ba</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">Kasra</td>
              <td><span className="arabic-inline">ِ</span></td>
              <td>En dessous</td>
              <td>i (bref)</td>
              <td><span className="arabic-inline">بِ</span></td>
              <td>bi</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">Damma</td>
              <td><span className="arabic-inline">ُ</span></td>
              <td>Au-dessus</td>
              <td>u (bref, ou)</td>
              <td><span className="arabic-inline">بُ</span></td>
              <td>bu (bou)</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">Sukun</td>
              <td><span className="arabic-inline">ْ</span></td>
              <td>Au-dessus</td>
              <td>∅ (aucun)</td>
              <td><span className="arabic-inline">بْ</span></td>
              <td>b (consonne seule)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>La Fatha : le son « a »</h2>
      <p>
        La <strong>fatha</strong> (فَتْحَة) est un petit trait oblique placé <strong>au-dessus</strong> de la consonne. Elle lui donne le son « a » bref.
      </p>
      <div className="flex flex-wrap gap-6 justify-center my-8">
        {[
          { lettre: "بَ", son: "ba" },
          { lettre: "تَ", son: "ta" },
          { lettre: "سَ", son: "sa" },
          { lettre: "كَ", son: "ka" },
          { lettre: "مَ", son: "ma" },
        ].map((ex, i) => (
          <div key={i} className="step-card text-center min-w-[80px]">
            <div className="arabic text-3xl mb-1">{ex.lettre}</div>
            <div className="text-sm text-primary font-medium">{ex.son}</div>
          </div>
        ))}
      </div>
      <p>
        La fatha est la voyelle la plus fréquente en arabe. Elle correspond au son « a » bref et ouvert. La lettre seule (<span className="arabic-inline">ب</span>) est muette. Avec la fatha (<span className="arabic-inline">بَ</span>), elle devient « ba ».
      </p>

      <h2>La Kasra : le son « i »</h2>
      <p>
        La <strong>kasra</strong> (كَسْرَة) est un petit trait oblique placé <strong>en dessous</strong> de la consonne. Elle lui donne le son « i » bref.
      </p>
      <div className="flex flex-wrap gap-6 justify-center my-8">
        {[
          { lettre: "بِ", son: "bi" },
          { lettre: "تِ", son: "ti" },
          { lettre: "سِ", son: "si" },
          { lettre: "كِ", son: "ki" },
          { lettre: "مِ", son: "mi" },
        ].map((ex, i) => (
          <div key={i} className="step-card text-center min-w-[80px]">
            <div className="arabic text-3xl mb-1">{ex.lettre}</div>
            <div className="text-sm text-primary font-medium">{ex.son}</div>
          </div>
        ))}
      </div>
      <p>
        La position est logique : la fatha est <strong>au-dessus</strong> (ouverte, « a »), la kasra est <strong>en dessous</strong> (fermée, « i »). Cette symétrie visuelle aide à la mémorisation.
      </p>

      <h2>La Damma : le son « u » (ou)</h2>
      <p>
        La <strong>damma</strong> (ضَمَّة) est un petit « waw » miniature (<span className="arabic-inline">و</span>) placé <strong>au-dessus</strong> de la consonne. Elle lui donne le son « ou » bref (transcrit « u »).
      </p>
      <div className="flex flex-wrap gap-6 justify-center my-8">
        {[
          { lettre: "بُ", son: "bu" },
          { lettre: "تُ", son: "tu" },
          { lettre: "سُ", son: "su" },
          { lettre: "كُ", son: "ku" },
          { lettre: "مُ", son: "mu" },
        ].map((ex, i) => (
          <div key={i} className="step-card text-center min-w-[80px]">
            <div className="arabic text-3xl mb-1">{ex.lettre}</div>
            <div className="text-sm text-primary font-medium">{ex.son}</div>
          </div>
        ))}
      </div>

      <h2>Le Sukun : l&apos;absence de voyelle</h2>
      <p>
        Le <strong>sukun</strong> (سُكُون) est un petit cercle placé au-dessus de la consonne. Il indique que la consonne n&apos;est suivie d&apos;aucune voyelle — elle est « muette ».
      </p>
      <p>
        Par exemple, dans le mot <span className="arabic-inline">بَيْت</span> (bayt, « maison »), le <span className="arabic-inline">يْ</span> porte un sukun : le yā&apos; ne se prononce pas « ya » ni « yi » ni « yu », mais simplement « y » (comme dans « bayt »).
      </p>

      <div className="info-box">
        <div className="info-box-title">📌 Résumé visuel</div>
        <div className="info-box-content">
          <strong>Fatha</strong> (ـَ) = trait au-dessus = « a » | <strong>Kasra</strong> (ـِ) = trait en dessous = « i » | <strong>Damma</strong> (ـُ) = boucle au-dessus = « u/ou » | <strong>Sukun</strong> (ـْ) = cercle au-dessus = silence
        </div>
      </div>

      <h2>Pourquoi les voyelles courtes sont souvent absentes</h2>
      <p>
        Dans la vie quotidienne — journaux, livres, sites internet, panneaux — les voyelles courtes <strong>ne sont pas écrites</strong>. L&apos;arabe s&apos;écrit principalement avec le squelette consonantique, et le lecteur reconstitue les voyelles grâce à :
      </p>
      <ul>
        <li>Le <strong>contexte</strong> de la phrase</li>
        <li>Sa <strong>connaissance du vocabulaire</strong></li>
        <li>Les <strong>patterns morphologiques</strong> de la langue</li>
      </ul>
      <p>
        Les voyelles courtes sont écrites dans seulement 3 contextes :
      </p>
      <ol>
        <li><strong>Le Coran</strong> — pour garantir une lecture parfaite</li>
        <li><strong>Les manuels pour débutants</strong> — pour faciliter l&apos;apprentissage</li>
        <li><strong>Les textes ambigus</strong> — quand le contexte ne suffit pas</li>
      </ol>

      <h2>Les consonnes sans voyelles = le squelette du mot</h2>
      <p>
        Pour bien comprendre, regardons le mot « kataba » (il a écrit) sous trois formes :
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <div className="step-card text-center">
          <div className="text-xs text-muted-foreground mb-2">Avec toutes les voyelles</div>
          <div className="arabic text-3xl mb-1">كَتَبَ</div>
          <div className="text-sm text-primary font-medium">kataba</div>
        </div>
        <div className="step-card text-center">
          <div className="text-xs text-muted-foreground mb-2">Sans voyelles (texte normal)</div>
          <div className="arabic text-3xl mb-1">كتب</div>
          <div className="text-sm text-primary font-medium">ktb</div>
        </div>
        <div className="step-card text-center">
          <div className="text-xs text-muted-foreground mb-2">Autre vocalisation</div>
          <div className="arabic text-3xl mb-1">كُتُب</div>
          <div className="text-sm text-primary font-medium">kutub (livres)</div>
        </div>
      </div>
      <p>
        Remarquez : les mêmes consonnes <span className="arabic-inline">ك ت ب</span> (k-t-b) produisent des mots différents selon les voyelles : <strong>kataba</strong> (il a écrit) vs <strong>kutub</strong> (livres). Le squelette consonantique est le même — ce sont les voyelles qui changent le sens.
      </p>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ Point critique</div>
        <div className="warning-box-content">
          C&apos;est pour cela que les voyelles courtes sont si importantes pour le débutant. Sans elles, le mot <span className="arabic-inline">كتب</span> pourrait se lire kataba, kutub, kutib, kātib... C&apos;est le contexte (et plus tard, votre vocabulaire) qui vous guidera.
        </div>
      </div>

      <h2>Le tanwīn : la double voyelle</h2>
      <p>
        Le <strong>tanwīn</strong> (تَنْوِين) est un doublement de la voyelle courte qui ajoute un son « n » à la fin. Il existe trois formes :
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Tanwīn</th><th>Signe</th><th>Son</th><th>Exemple</th></tr>
          </thead>
          <tbody>
            <tr><td className="font-medium text-foreground">Fathatayn</td><td><span className="arabic-inline">ـًا</span></td><td>-an</td><td><span className="arabic-inline">كِتَابًا</span> (kitāban)</td></tr>
            <tr><td className="font-medium text-foreground">Kasratayn</td><td><span className="arabic-inline">ـٍ</span></td><td>-in</td><td><span className="arabic-inline">كِتَابٍ</span> (kitābin)</td></tr>
            <tr><td className="font-medium text-foreground">Dammatayn</td><td><span className="arabic-inline">ـٌ</span></td><td>-un</td><td><span className="arabic-inline">كِتَابٌ</span> (kitābun)</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Le tanwīn est un concept grammatical (lié aux cas de déclinaison). Ne vous y attardez pas maintenant — retenez simplement qu&apos;il existe et que c&apos;est un « doublement + n ».
      </p>

      <h2>Exercice de lecture avec harakāt</h2>
      <p>Lisez ces syllabes en appliquant les voyelles courtes :</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8">
        {[
          { ar: "بَ", fr: "ba" }, { ar: "بِ", fr: "bi" }, { ar: "بُ", fr: "bu" }, { ar: "بْ", fr: "b" },
          { ar: "تَ", fr: "ta" }, { ar: "تِ", fr: "ti" }, { ar: "تُ", fr: "tu" }, { ar: "تْ", fr: "t" },
          { ar: "سَ", fr: "sa" }, { ar: "سِ", fr: "si" }, { ar: "سُ", fr: "su" }, { ar: "سْ", fr: "s" },
          { ar: "نَ", fr: "na" }, { ar: "نِ", fr: "ni" }, { ar: "نُ", fr: "nu" }, { ar: "نْ", fr: "n" },
        ].map((ex, i) => (
          <div key={i} className="step-card text-center py-3">
            <div className="arabic text-2xl mb-1">{ex.ar}</div>
            <div className="text-xs text-primary font-medium">{ex.fr}</div>
          </div>
        ))}
      </div>

      <h2>Résumé</h2>
      <ol>
        <li>Les voyelles courtes (<strong>harakāt</strong>) sont des <strong>diacritiques</strong>, pas des lettres.</li>
        <li><strong>Fatha</strong> (ـَ) = a, <strong>Kasra</strong> (ـِ) = i, <strong>Damma</strong> (ـُ) = u, <strong>Sukun</strong> (ـْ) = silence.</li>
        <li>Dans les textes courants, les voyelles courtes sont <strong>absentes</strong>.</li>
        <li>Les mêmes consonnes + voyelles différentes = <strong>mots différents</strong> (k-t-b → kataba, kutub...).</li>
        <li>Le Coran et les manuels pour débutants incluent les voyelles pour faciliter la lecture.</li>
      </ol>
      <p>
        L&apos;article suivant aborde les <strong>voyelles longues</strong> — des lettres à part entière qui, contrairement aux harakāt, font partie intégrante du squelette du mot.
      </p>
    </ArticleLayout>
  );
}
