import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Comment le Message Islamique a été Transmis : du Prophète aux Premiers Musulmans | Rissala",
  description:
    "Transmission orale et écrite du Coran et de la Sunna : rôle des compagnons (ṣaḥāba), compilation sous Abū Bakr et ʿUthmān, standardisation du muṣḥaf. Guide complet.",
};

export default function TransmissionMessagePage() {
  return (
    <ArticleLayout
      title="Comment le Message a été Transmis :"
      titleAccent="Du Prophète aux Premiers Musulmans"
      subtitle="Le Coran a été mémorisé, puis écrit, puis compilé, puis standardisé. La Sunna a circulé oralement pendant des décennies. Comprendre cette chronologie est essentiel."
      articleNumber={3}
      totalArticles={5}
      prevArticle={{ href: "/sciences/vie-prophete-muhammad", title: "La vie du Prophète Muhammad" }}
      nextArticle={{ href: "/sciences/science-hadith-bukhari", title: "La science du hadith" }}
    >
      <p>
        Le Prophète Muhammad est décédé en 632. Il laisse derrière lui un <strong>Coran révélé</strong> sur 23 ans et une <strong>Sunna transmise oralement</strong> à ses compagnons. Mais le Coran n&apos;est pas encore un livre relié. La Sunna n&apos;est pas encore compilée en recueils. Comment passe-t-on du message vivant à un corpus fixe et authentifié ?
      </p>
      <p>
        C&apos;est l&apos;une des questions les plus importantes de l&apos;histoire islamique, et la réponse révèle un <strong>processus méthodique</strong> qui s&apos;étale sur plusieurs décennies.
      </p>

      <h2>Distinction fondamentale : Coran vs Hadith</h2>
      <p>
        Avant toute chose, il faut comprendre que le Coran et la Sunna sont <strong>deux corpus distincts</strong>, transmis de manière différente et avec des statuts différents.
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Propriété</th><th>Coran</th><th>Hadith (Sunna)</th></tr>
          </thead>
          <tbody>
            <tr><td className="font-medium text-foreground">Nature</td><td>Parole littérale d&apos;Allah</td><td>Paroles/actes du Prophète</td></tr>
            <tr><td className="font-medium text-foreground">Texte</td><td>Mot pour mot sacré</td><td>Le sens est inspiré, les mots sont humains</td></tr>
            <tr><td className="font-medium text-foreground">Mémorisation</td><td>Obligatoire pour la prière</td><td>Encouragée mais pas liturgique</td></tr>
            <tr><td className="font-medium text-foreground">Écriture</td><td>Partiellement écrit du vivant du Prophète</td><td>Peu écrit au début (débat historique)</td></tr>
            <tr><td className="font-medium text-foreground">Compilation</td><td>Sous Abū Bakr (~633), standardisé sous ʿUthmān (~650)</td><td>Compilations majeures au IXe siècle</td></tr>
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <div className="info-box-title">💡 Point clé</div>
        <div className="info-box-content">
          Le Coran a été fixé comme <strong>texte canonique</strong> très tôt (moins de 20 ans après la mort du Prophète). La Sunna, elle, est restée en <strong>circulation orale</strong> pendant environ deux siècles avant d&apos;être systématiquement compilée. Cette différence de temporalité est fondamentale.
        </div>
      </div>

      <h2>La transmission orale : le mode originel</h2>
      <p>
        L&apos;Arabie du VIIe siècle est une <strong>civilisation orale</strong>. Les Arabes mémorisent des poèmes de milliers de vers, des généalogies sur des dizaines de générations, des discours entiers. La mémoire est leur technologie de stockage principale.
      </p>
      <p>
        Quand le Prophète reçoit une révélation coranique, il la <strong>récite à ses compagnons</strong> qui la mémorisent immédiatement. Certains la transcrivent sur des supports de fortune :
      </p>
      <ul>
        <li><strong>Os plats</strong> (omoplates de chameaux)</li>
        <li><strong>Peaux</strong> tannées</li>
        <li><strong>Pierres plates</strong></li>
        <li><strong>Feuilles de palmier</strong></li>
        <li><strong>Tessons de poterie</strong></li>
      </ul>
      <p>
        Le Prophète avait des <strong>scribes officiels</strong> (kuttāb al-waḥy), dont le plus connu est <strong>Zayd ibn Thābit</strong>. Mais il n&apos;existait pas de « livre » unifié — les fragments étaient dispersés sur différents supports et chez différentes personnes.
      </p>

      <h2>Les compagnons (ṣaḥāba) : les vecteurs de la transmission</h2>
      <p>
        Les <strong>ṣaḥāba</strong> (صحابة) sont les compagnons du Prophète — ceux qui l&apos;ont vu, ont cru en lui et sont morts musulmans. Ils sont le <strong>premier maillon</strong> de toute chaîne de transmission islamique.
      </p>
      <p>
        Leur rôle est triple :
      </p>
      <ol>
        <li><strong>Témoins directs</strong> de la révélation et de la vie du Prophète</li>
        <li><strong>Transmetteurs</strong> du Coran et de la Sunna à la génération suivante</li>
        <li><strong>Praticiens</strong> qui incarnent l&apos;islam tel qu&apos;ils l&apos;ont appris du Prophète</li>
      </ol>
      <p>
        Parmi les compagnons les plus importants pour la transmission :
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Compagnon</th><th>Rôle dans la transmission</th></tr>
          </thead>
          <tbody>
            <tr><td className="font-medium text-foreground">Abū Bakr al-Ṣiddīq</td><td>Premier calife. Ordonne la première compilation écrite du Coran.</td></tr>
            <tr><td className="font-medium text-foreground">ʿUmar ibn al-Khaṭṭāb</td><td>Deuxième calife. Suggère la compilation à Abū Bakr. Conserve le muṣḥaf compilé.</td></tr>
            <tr><td className="font-medium text-foreground">ʿUthmān ibn ʿAffān</td><td>Troisième calife. Standardise le Coran en une édition unique (muṣḥaf ʿuthmānī).</td></tr>
            <tr><td className="font-medium text-foreground">Zayd ibn Thābit</td><td>Scribe du Prophète. Dirige la commission de compilation sous Abū Bakr et ʿUthmān.</td></tr>
            <tr><td className="font-medium text-foreground">ʿAbdullāh ibn Masʿūd</td><td>Grand mémorisateur du Coran. Transmetteur majeur de hadiths.</td></tr>
            <tr><td className="font-medium text-foreground">Abū Hurayra</td><td>Le compagnon qui a transmis le plus grand nombre de hadiths (~5 374).</td></tr>
            <tr><td className="font-medium text-foreground">ʿĀʾisha bint Abī Bakr</td><td>Épouse du Prophète. Source majeure de hadiths sur la vie privée et le droit familial.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>La compilation du Coran : un processus en 3 étapes</h2>

      <h3>Étape 1 : Du vivant du Prophète (~610-632)</h3>
      <p>
        Le Coran est mémorisé par de nombreux compagnons (<strong>ḥuffāẓ</strong>, mémorisateurs) et partiellement écrit par les scribes. Mais il n&apos;existe pas sous forme de livre unifié. Le Prophète indique l&apos;ordre des versets au sein des sourates et la position de chaque révélation.
      </p>

      <h3>Étape 2 : Sous Abū Bakr (~633)</h3>
      <p>
        Après la bataille de Yamāma (633), de nombreux mémorisateurs du Coran sont tués. ʿUmar ibn al-Khaṭṭāb, inquiet de la perte potentielle du texte, convainc le calife Abū Bakr d&apos;ordonner une <strong>compilation écrite complète</strong>.
      </p>
      <p>
        <strong>Zayd ibn Thābit</strong> est chargé de la mission. Sa méthode est rigoureuse :
      </p>
      <ul>
        <li>Chaque verset doit être attesté par <strong>au moins deux témoins écrits</strong> (supports physiques) en plus de la mémorisation</li>
        <li>Comparaison avec les mémorisateurs vivants</li>
        <li>Compilation dans un <strong>muṣḥaf</strong> (codex) unique</li>
      </ul>
      <p>
        Ce muṣḥaf est conservé d&apos;abord par Abū Bakr, puis par ʿUmar, puis par sa fille <strong>Ḥafṣa</strong>.
      </p>

      <h3>Étape 3 : Standardisation sous ʿUthmān (~650)</h3>
      <p>
        Avec l&apos;expansion de l&apos;empire islamique, des divergences de <strong>récitation</strong> (lectures dialectales) apparaissent entre les provinces. Le calife ʿUthmān ordonne une <strong>standardisation</strong> :
      </p>
      <ul>
        <li>Une commission dirigée par Zayd ibn Thābit produit des <strong>copies officielles</strong> basées sur le muṣḥaf de Ḥafṣa</li>
        <li>Le texte est écrit dans le <strong>dialecte de Quraysh</strong> (le dialecte du Prophète)</li>
        <li>Des copies sont envoyées dans les grandes villes (Kufa, Basra, Damas, La Mecque)</li>
        <li>Les codex personnels divergents sont <strong>détruits</strong> pour éviter la confusion</li>
      </ul>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ Précision historique</div>
        <div className="warning-box-content">
          La standardisation de ʿUthmān ne modifie pas le <strong>contenu</strong> du Coran. Elle uniformise l&apos;<strong>orthographe et la lecture</strong>. Les variantes éliminées sont des variantes dialectales de récitation, pas des versions différentes du texte révélé. Le texte coranique lui-même reste identique à ce qui a été révélé au Prophète.
        </div>
      </div>

      <h2>La transmission de la Sunna : un parcours plus long</h2>
      <p>
        Contrairement au Coran, la Sunna n&apos;a pas fait l&apos;objet d&apos;une compilation officielle précoce. Plusieurs raisons expliquent cela :
      </p>
      <ol>
        <li><strong>Priorité au Coran</strong> : le Prophète lui-même aurait demandé de ne pas mélanger les écrits coraniques avec ses propres paroles</li>
        <li><strong>Confiance dans la mémoire</strong> : la culture orale rendait la transmission fiable dans un cercle restreint</li>
        <li><strong>Volume considérable</strong> : les paroles, actes et situations du Prophète sont bien plus nombreux que le texte coranique</li>
      </ol>

      <h3>Les tābiʿūn : la génération relais</h3>
      <p>
        Les <strong>tābiʿūn</strong> (تابعون, « successeurs ») sont la génération qui a appris directement des compagnons sans avoir vu le Prophète. Ils constituent le <strong>deuxième maillon</strong> de la chaîne de transmission.
      </p>
      <p>
        Parmi les tābiʿūn célèbres :
      </p>
      <ul>
        <li><strong>Saʿīd ibn al-Musayyab</strong> (Médine) — élève d&apos;Abū Hurayra</li>
        <li><strong>al-Ḥasan al-Baṣrī</strong> (Basra) — grande figure ascétique et savante</li>
        <li><strong>ʿIkrima</strong> (La Mecque) — élève d&apos;Ibn ʿAbbās</li>
        <li><strong>Ibrāhīm al-Nakhaʿī</strong> (Kufa) — fondateur de l&apos;école juridique irakienne</li>
      </ul>
      <p>
        Les tābiʿūn jouent un rôle crucial : ils transmettent la Sunna à la troisième génération (atbāʿ al-tābiʿīn), qui produira les premières <strong>compilations écrites systématiques</strong> de hadiths.
      </p>

      <h2>Les premières compilations écrites</h2>
      <p>
        À partir de la fin du VIIe siècle et surtout au VIIIe siècle, l&apos;écriture de la Sunna s&apos;accélère. Les premières compilations notables incluent :
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Œuvre</th><th>Auteur</th><th>Époque</th><th>Caractéristique</th></tr>
          </thead>
          <tbody>
            <tr><td className="font-medium text-foreground">al-Muwaṭṭaʾ</td><td>Mālik ibn Anas</td><td>~760</td><td>Mélange de hadiths et de pratique médinoise. Premier recueil structuré.</td></tr>
            <tr><td className="font-medium text-foreground">al-Musnad</td><td>Aḥmad ibn Ḥanbal</td><td>~830</td><td>Classé par compagnon rapporteur. ~28 000 hadiths.</td></tr>
            <tr><td className="font-medium text-foreground">Ṣaḥīḥ al-Bukhārī</td><td>al-Bukhārī</td><td>~846</td><td>Critères les plus stricts. ~7 275 hadiths (avec répétitions).</td></tr>
            <tr><td className="font-medium text-foreground">Ṣaḥīḥ Muslim</td><td>Muslim ibn al-Ḥajjāj</td><td>~855</td><td>Deuxième recueil le plus fiable. ~4 000 hadiths (sans répétitions).</td></tr>
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <div className="info-box-title">📌 Chronologie à retenir</div>
        <div className="info-box-content">
          <strong>Coran</strong> : fixé en ~20 ans (632-650). <strong>Sunna</strong> : compilée progressivement sur ~200 ans (632-850). Cette différence de rythme n&apos;est pas un défaut — c&apos;est le reflet d&apos;une société qui fait d&apos;abord confiance à la transmission orale, puis développe des outils de vérification écrits quand le risque d&apos;erreur augmente avec la distance temporelle.
        </div>
      </div>

      <h2>Pourquoi ce processus importe</h2>
      <p>
        Comprendre <strong>comment</strong> le message a été transmis est aussi important que de connaître <strong>ce</strong> qu&apos;il dit. Ce processus révèle :
      </p>
      <ul>
        <li>Une <strong>conscience précoce</strong> de l&apos;importance de la préservation textuelle</li>
        <li>Une <strong>méthodologie de vérification</strong> (témoins multiples, comparaison avec la mémoire)</li>
        <li>Un <strong>passage graduel</strong> de l&apos;oral à l&apos;écrit, adapté au contexte culturel</li>
        <li>La naissance d&apos;une <strong>science de la transmission</strong> qui deviendra la science du hadith</li>
      </ul>

      <h2>Résumé</h2>
      <ol>
        <li>Le Coran et la Sunna sont <strong>deux corpus distincts</strong> transmis différemment.</li>
        <li>Le Coran est compilé sous <strong>Abū Bakr</strong> (~633) et standardisé sous <strong>ʿUthmān</strong> (~650).</li>
        <li>Les <strong>compagnons (ṣaḥāba)</strong> sont le premier maillon de transmission.</li>
        <li>Les <strong>tābiʿūn</strong> (successeurs) transmettent à la génération suivante.</li>
        <li>La Sunna reste <strong>orale pendant ~200 ans</strong> avant les grandes compilations (Bukhārī, Muslim).</li>
        <li>Ce n&apos;est pas une accumulation aléatoire — c&apos;est un <strong>processus méthodique</strong> de préservation.</li>
      </ol>
      <p>
        L&apos;article suivant entre dans le détail de cette méthodologie : <strong>la science du hadith</strong>. Comment al-Bukhārī et d&apos;autres savants ont-ils vérifié les paroles du Prophète ? Quels critères distinguent un hadith authentique d&apos;un faux ?
      </p>
    </ArticleLayout>
  );
}
