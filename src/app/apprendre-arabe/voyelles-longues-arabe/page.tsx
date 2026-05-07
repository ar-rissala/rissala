import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Voyelles Longues en Arabe : Alif, Waw, Ya | Méthode Rissala",
  description:
    "Les voyelles longues en arabe (ا و ي) sont de vraies lettres, pas des diacritiques. Comprenez la différence entre voyelles courtes et longues. Guide Rissala.",
};

export default function VoyellesLonguesPage() {
  return (
    <ArticleLayout
      title="Voyelles Longues en Arabe :"
      titleAccent="Les Vraies Lettres Vocaliques"
      subtitle="Contrairement aux voyelles courtes (diacritiques), les voyelles longues sont de vraies lettres écrites dans le mot. Elles structurent le sens et la prononciation."
      articleNumber={4}
      totalArticles={5}
      prevArticle={{ href: "/apprendre-arabe/voyelles-courtes-arabe", title: "Les voyelles courtes" }}
      nextArticle={{ href: "/apprendre-arabe/methode-rissala-30-jours", title: "Méthode Rissala : plan 30 jours" }}
    >
      <p>
        Dans l&apos;article précédent, vous avez appris que les voyelles courtes (<strong>harakāt</strong>) sont des diacritiques — de petits signes au-dessus ou en dessous des consonnes. Elles sont souvent absentes dans les textes courants.
      </p>
      <p>
        Les <strong>voyelles longues</strong>, elles, sont fondamentalement différentes. Ce sont de <strong>vraies lettres</strong>, inscrites dans le mot, qui font partie du squelette consonantique. Elles ne disparaissent jamais. Elles sont toujours écrites.
      </p>

      <h2>La distinction fondamentale : diacritique vs lettre</h2>
      <p>
        C&apos;est le concept le plus important à maîtriser à ce stade de votre apprentissage. Résumons :
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Propriété</th><th>Voyelles courtes (harakāt)</th><th>Voyelles longues</th></tr>
          </thead>
          <tbody>
            <tr><td className="font-medium text-foreground">Nature</td><td>Diacritiques (signes ajoutés)</td><td>Lettres à part entière</td></tr>
            <tr><td className="font-medium text-foreground">Écrites ?</td><td>Souvent omises dans les textes</td><td>Toujours écrites</td></tr>
            <tr><td className="font-medium text-foreground">Durée du son</td><td>Bref (~1 temps)</td><td>Long (~2 temps)</td></tr>
            <tr><td className="font-medium text-foreground">Nombre</td><td>3 (a, i, u)</td><td>3 (ā, ī, ū)</td></tr>
            <tr><td className="font-medium text-foreground">Lettres</td><td>—</td><td><span className="arabic-inline">ا و ي</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <div className="info-box-title">💡 Concept clé</div>
        <div className="info-box-content">
          Les voyelles courtes sont comme des <strong>accents</strong> qu&apos;on peut omettre. Les voyelles longues sont comme des <strong>lettres</strong> qu&apos;on ne peut jamais supprimer. Sans elles, le mot n&apos;existe plus.
        </div>
      </div>

      <h2>Les 3 voyelles longues</h2>
      <p>
        L&apos;arabe n&apos;a que <strong>3 voyelles longues</strong>. Chacune est une lettre que vous connaissez déjà :
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Son</th><th>Lettre</th><th>Nom</th><th>Durée</th><th>Exemple</th><th>Sens</th></tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium text-foreground">ā</td>
              <td><span className="arabic-inline">ا</span></td>
              <td>Alif</td>
              <td>a long (~2 temps)</td>
              <td><span className="arabic-inline">كِتَاب</span></td>
              <td>kitāb (livre)</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">ū</td>
              <td><span className="arabic-inline">و</span></td>
              <td>Wāw</td>
              <td>ou long (~2 temps)</td>
              <td><span className="arabic-inline">نُور</span></td>
              <td>nūr (lumière)</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">ī</td>
              <td><span className="arabic-inline">ي</span></td>
              <td>Yā&apos;</td>
              <td>i long (~2 temps)</td>
              <td><span className="arabic-inline">كَبِير</span></td>
              <td>kabīr (grand)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Alif (ا) — le « ā » long</h3>
      <p>
        L&apos;<strong>Alif</strong> est la première lettre de l&apos;alphabet arabe. Quand elle joue le rôle de voyelle longue, elle prolonge le son « a ». Elle est précédée d&apos;une consonne portant une fatha.
      </p>
      <p>
        Mécanisme : <strong>consonne + fatha + alif</strong> = son « ā » prolongé.
      </p>
      <div className="flex flex-wrap gap-6 justify-center my-8">
        {[
          { mot: "بَاب", trans: "bāb", sens: "porte" },
          { mot: "كِتَاب", trans: "kitāb", sens: "livre" },
          { mot: "سَلَام", trans: "salām", sens: "paix" },
        ].map((ex, i) => (
          <div key={i} className="step-card text-center min-w-[120px]">
            <div className="arabic text-3xl mb-1">{ex.mot}</div>
            <div className="text-sm text-primary font-medium">{ex.trans}</div>
            <div className="text-xs text-muted-foreground">{ex.sens}</div>
          </div>
        ))}
      </div>

      <h3>Wāw (و) — le « ū » long</h3>
      <p>
        Le <strong>Wāw</strong> comme voyelle longue prolonge le son « ou ». La consonne précédente porte une damma.
      </p>
      <p>
        Mécanisme : <strong>consonne + damma + wāw</strong> = son « ū » prolongé.
      </p>
      <div className="flex flex-wrap gap-6 justify-center my-8">
        {[
          { mot: "نُور", trans: "nūr", sens: "lumière" },
          { mot: "رُوح", trans: "rūḥ", sens: "âme/esprit" },
          { mot: "سُور", trans: "sūr", sens: "muraille" },
        ].map((ex, i) => (
          <div key={i} className="step-card text-center min-w-[120px]">
            <div className="arabic text-3xl mb-1">{ex.mot}</div>
            <div className="text-sm text-primary font-medium">{ex.trans}</div>
            <div className="text-xs text-muted-foreground">{ex.sens}</div>
          </div>
        ))}
      </div>

      <h3>Yā&apos; (ي) — le « ī » long</h3>
      <p>
        Le <strong>Yā&apos;</strong> comme voyelle longue prolonge le son « i ». La consonne précédente porte une kasra.
      </p>
      <p>
        Mécanisme : <strong>consonne + kasra + yā&apos;</strong> = son « ī » prolongé.
      </p>
      <div className="flex flex-wrap gap-6 justify-center my-8">
        {[
          { mot: "كَبِير", trans: "kabīr", sens: "grand" },
          { mot: "جَمِيل", trans: "jamīl", sens: "beau" },
          { mot: "طَرِيق", trans: "ṭarīq", sens: "chemin" },
        ].map((ex, i) => (
          <div key={i} className="step-card text-center min-w-[120px]">
            <div className="arabic text-3xl mb-1">{ex.mot}</div>
            <div className="text-sm text-primary font-medium">{ex.trans}</div>
            <div className="text-xs text-muted-foreground">{ex.sens}</div>
          </div>
        ))}
      </div>

      <h2>Voyelle courte vs voyelle longue : la différence change le sens</h2>
      <p>
        Ce n&apos;est pas qu&apos;une question de durée. En arabe, la longueur de la voyelle <strong>change le sens du mot</strong>. Confondre une voyelle courte et une voyelle longue peut créer un contresens total.
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Mot</th><th>Transcription</th><th>Sens</th><th>Voyelle</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="arabic-inline">كَتَبَ</span></td>
              <td>kataba</td>
              <td>il a écrit</td>
              <td>courtes uniquement</td>
            </tr>
            <tr>
              <td><span className="arabic-inline">كَاتَبَ</span></td>
              <td>kātaba</td>
              <td>il a correspondu avec</td>
              <td>ā long (alif après kāf)</td>
            </tr>
            <tr>
              <td><span className="arabic-inline">كُتُب</span></td>
              <td>kutub</td>
              <td>livres</td>
              <td>courtes (u, u)</td>
            </tr>
            <tr>
              <td><span className="arabic-inline">كَاتِب</span></td>
              <td>kātib</td>
              <td>écrivain</td>
              <td>ā long + i court</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Regardez : les mêmes consonnes <span className="arabic-inline">ك ت ب</span> (k-t-b, racine de « écrire ») produisent 4 mots totalement différents selon les voyelles (courtes et longues). C&apos;est la <strong>magie du système de racines arabes</strong>.
      </p>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ Erreur fréquente</div>
        <div className="warning-box-content">
          Ne confondez JAMAIS « ba » (بَ, fatha seule) avec « bā » (بَا, fatha + alif). Le premier est un son bref, le second est un son tenu. Cette distinction est <strong>sémantiquement critique</strong> en arabe.
        </div>
      </div>

      <h2>Le mécanisme : voyelle courte + lettre longue</h2>
      <p>
        Les voyelles longues ne fonctionnent pas seules. Elles forment toujours un <strong>couple</strong> avec la voyelle courte correspondante sur la consonne qui les précède :
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Voyelle courte</th><th>+ Lettre longue</th><th>= Son long</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Fatha (ـَ = a)</td>
              <td><span className="arabic-inline">ا</span> (Alif)</td>
              <td>ā (a prolongé)</td>
            </tr>
            <tr>
              <td>Damma (ـُ = u)</td>
              <td><span className="arabic-inline">و</span> (Wāw)</td>
              <td>ū (ou prolongé)</td>
            </tr>
            <tr>
              <td>Kasra (ـِ = i)</td>
              <td><span className="arabic-inline">ي</span> (Yā&apos;)</td>
              <td>ī (i prolongé)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        C&apos;est un système parfaitement logique. La voyelle courte « annonce » la voyelle longue qui suit. Fatha annonce Alif, Damma annonce Wāw, Kasra annonce Yā&apos;.
      </p>

      <h2>Wāw et Yā&apos; : double rôle (consonne ou voyelle)</h2>
      <p>
        Attention : <span className="arabic-inline">و</span> (Wāw) et <span className="arabic-inline">ي</span> (Yā&apos;) sont des lettres à <strong>double fonction</strong>. Elles peuvent être :
      </p>
      <ul>
        <li><strong>Consonnes</strong> : quand elles portent elles-mêmes une voyelle courte ou un sukun en début de syllabe</li>
        <li><strong>Voyelles longues</strong> : quand elles prolongent le son de la consonne précédente</li>
      </ul>
      <p>
        Exemple avec Wāw comme consonne : <span className="arabic-inline">وَلَد</span> (walad = enfant/garçon). Ici, le wāw porte une fatha — il se prononce « wa », c&apos;est une consonne.
      </p>
      <p>
        Exemple avec Wāw comme voyelle longue : <span className="arabic-inline">نُور</span> (nūr = lumière). Ici, le wāw prolonge le « u » de la consonne nūn — c&apos;est une voyelle longue.
      </p>

      <h2>Exercice de distinction</h2>
      <p>Identifiez si la voyelle soulignée est courte ou longue :</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        {[
          { mot: "بَيْت", trans: "bayt", type: "Diphtongue (ay)", expl: "Le yā' porte sukun = semi-voyelle" },
          { mot: "كِتَاب", trans: "kitāb", type: "Voyelle longue ā", expl: "Alif après fatha = ā prolongé" },
          { mot: "نُور", trans: "nūr", type: "Voyelle longue ū", expl: "Wāw après damma = ū prolongé" },
          { mot: "جَمِيل", trans: "jamīl", type: "Voyelle longue ī", expl: "Yā' après kasra = ī prolongé" },
        ].map((ex, i) => (
          <div key={i} className="step-card">
            <div className="arabic text-2xl mb-2 text-center">{ex.mot}</div>
            <div className="text-sm text-primary font-medium mb-1">{ex.trans} — {ex.type}</div>
            <div className="text-xs text-muted-foreground">{ex.expl}</div>
          </div>
        ))}
      </div>

      <h2>Résumé</h2>
      <ol>
        <li>Les voyelles longues sont de <strong>vraies lettres</strong> : <span className="arabic-inline">ا</span> (ā), <span className="arabic-inline">و</span> (ū), <span className="arabic-inline">ي</span> (ī).</li>
        <li>Elles sont <strong>toujours écrites</strong>, contrairement aux voyelles courtes.</li>
        <li>Chaque voyelle longue est <strong>précédée de sa voyelle courte correspondante</strong>.</li>
        <li>La longueur de la voyelle <strong>change le sens</strong> du mot (kataba ≠ kātaba).</li>
        <li>Wāw et Yā&apos; ont un <strong>double rôle</strong> : consonne ou voyelle longue selon le contexte.</li>
      </ol>
      <p>
        Vous maîtrisez maintenant l&apos;alphabet complet, les formes contextuelles, les voyelles courtes et les voyelles longues. Dans l&apos;article final, nous assemblons tout cela dans la <strong>méthode Rissala : un plan de 30 jours</strong> pour apprendre à lire l&apos;arabe.
      </p>
    </ArticleLayout>
  );
}
