import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "La Science du Hadith : Comment al-Bukhārī a Vérifié les Paroles du Prophète | Rissala",
  description:
    "Comprenez la méthodologie de la science du hadith ('ulūm al-hadīth) : isnād, matn, critique des narrateurs, et les critères de fiabilité d'al-Bukhārī.",
};

export default function ScienceHadithPage() {
  return (
    <ArticleLayout
      title="La Science du Hadith :"
      titleAccent="Comment Vérifier les Paroles du Prophète"
      subtitle="La tradition islamique n'est pas une accumulation aveugle de récits. C'est un système de filtrage extrêmement rigoureux basé sur la critique historique."
      articleNumber={4}
      totalArticles={5}
      prevArticle={{ href: "/sciences-islamiques/transmission-message-islamique", title: "La transmission du message" }}
      nextArticle={{ href: "/sciences-islamiques/ecoles-juridiques-sunnites", title: "Les écoles juridiques sunnites" }}
    >
      <p>
        Dans l&apos;article précédent, nous avons vu que la Sunna (les paroles et actes du Prophète) a circulé oralement pendant des décennies avant d&apos;être massivement compilée à l&apos;écrit. Cette transmission orale pose une question évidente : <strong>comment être sûr que ce qui est rapporté est vrai ?</strong>
      </p>
      <p>
        Au fil du temps, des erreurs de mémoire, des exagérations pieuses, ou même des fabrications politiques (hadiths inventés) sont apparues. Pour contrer ce danger, les savants musulmans ont développé une méthodologie d&apos;authentification historique sans précédent dans l&apos;Antiquité : la <strong>science du hadith</strong> (ʿulūm al-ḥadīth).
      </p>

      <h2>Anatomie d&apos;un hadith : Isnād et Matn</h2>
      <p>
        Un hadith n&apos;est pas simplement une citation. C&apos;est un document historique composé de <strong>deux parties inséparables</strong> :
      </p>
      <ol>
        <li><strong>L&apos;Isnād (la chaîne de transmission)</strong> : La liste des personnes qui se sont transmis le récit, de génération en génération, jusqu&apos;au compilateur final.</li>
        <li><strong>Le Matn (le texte)</strong> : Le contenu même du récit, l&apos;action ou la parole rapportée.</li>
      </ol>

      <div className="info-box">
        <div className="info-box-title">💡 Exemple concret d&apos;un hadith</div>
        <div className="info-box-content">
          <strong>[Isnād] :</strong> L&apos;Imam al-Bukhārī dit : Il nous a été rapporté par ʿAbdallāh ibn Yūsuf, qui a dit : Mālik nous a informé, d&apos;après Nāfiʿ, d&apos;après ʿAbdallāh ibn ʿUmar, que...<br/><br/>
          <strong>[Matn] :</strong> ...le Prophète (ﷺ) a dit : <em>« Ne vous vendez pas les uns les autres au-dessus de l&apos;enchère de votre frère. »</em>
        </div>
      </div>

      <p>
        Sans isnād, un matn n&apos;a aucune valeur. Le savant ʿAbdullāh ibn al-Mubārak disait : <em>« L&apos;isnād fait partie de la religion. Sans l&apos;isnād, n&apos;importe qui dirait n&apos;importe quoi. »</em>
      </p>

      <h2>La naissance de la critique des narrateurs (ʿIlm al-Rijāl)</h2>
      <p>
        Puisque la fiabilité d&apos;un hadith dépend de sa chaîne, les savants ont créé une science dédiée à l&apos;étude des transmetteurs : le <strong>ʿilm al-rijāl</strong> (la science des hommes).
      </p>
      <p>
        Chaque narrateur (rāwī) dans une chaîne est passé au crible. Les savants ont constitué d&apos;immenses dictionnaires biographiques détaillant la vie de dizaines de milliers de transmetteurs. Pour être accepté, un narrateur devait répondre à deux critères fondamentaux :
      </p>

      <h3>1. L&apos;intégrité morale (al-ʿAdāla)</h3>
      <p>
        Le transmetteur est-il pieux ? Ment-il dans sa vie quotidienne ? A-t-il commis des péchés majeurs ? Est-il impliqué dans des factions politiques qui pourraient l&apos;inciter à inventer des récits ? S&apos;il est connu pour mentir, même une seule fois sur un sujet mondain, ses hadiths sont rejetés.
      </p>

      <h3>2. La précision mémorielle (al-Ḍabṭ)</h3>
      <p>
        Être pieux ne suffit pas. Le transmetteur a-t-il une excellente mémoire ? Quand il rapporte un hadith, le fait-il mot pour mot ou en résume-t-il le sens (ce qui introduit un risque d&apos;erreur) ? Ses écrits (s&apos;il note ses hadiths) sont-ils bien conservés ? S&apos;il est âgé, sa mémoire commence-t-elle à faillir ?
      </p>

      <h2>La méthode d&apos;al-Bukhārī : le summum de la rigueur</h2>
      <p>
        Au IXe siècle, l&apos;<strong>Imam al-Bukhārī</strong> (m. 870) entreprend un projet titanesque : compiler un recueil ne contenant <strong>absolument aucun hadith faible</strong>. Sur les centaines de milliers de chaînes de transmission en circulation, il en sélectionne un peu plus de 7 000 (dont beaucoup de répétitions) pour son œuvre majeure : le <strong>Ṣaḥīḥ al-Bukhārī</strong>.
      </p>
      <p>
        Les critères d&apos;al-Bukhārī étaient les plus stricts de l&apos;histoire islamique :
      </p>
      <ul>
        <li><strong>Continuité ininterrompue de la chaîne :</strong> Il ne doit manquer aucun maillon entre l&apos;époque du compilateur et le Prophète.</li>
        <li><strong>Intégrité et précision absolues :</strong> Chaque narrateur doit être du plus haut niveau de fiabilité.</li>
        <li><strong>La condition de rencontre (Liqāʾ) :</strong> C&apos;est la signature de Bukhārī. Il ne suffit pas que deux narrateurs aient vécu à la même époque pour supposer qu&apos;ils se sont rencontrés. Bukhārī exigeait la <strong>preuve historique positive</strong> que l&apos;élève et le maître s&apos;étaient physiquement rencontrés.</li>
      </ul>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ À comprendre</div>
        <div className="warning-box-content">
          Bukhārī n&apos;a pas inventé de hadiths. Il n&apos;a pas non plus été le premier à les compiler. Son génie réside dans l&apos;application d&apos;un <strong>filtre critique d&apos;une exigence absolue</strong> pour séparer le vrai de l&apos;incertain. Son élève, Muslim ibn al-Ḥajjāj, produira le <strong>Ṣaḥīḥ Muslim</strong>, le deuxième ouvrage le plus authentique selon le consensus sunnite.
        </div>
      </div>

      <h2>La classification des hadiths</h2>
      <p>
        Suite à cette méthode critique, les savants classent les hadiths en trois grandes catégories (bien qu&apos;il existe de nombreuses sous-catégories) :
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Degré</th><th>Terme Arabe</th><th>Signification et Valeur Juridique</th></tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium text-primary">Authentique</td>
              <td className="font-medium text-foreground">Ṣaḥīḥ</td>
              <td>Chaîne ininterrompue, narrateurs parfaitement intègres et précis, pas de défaut caché. <strong>Preuve absolue en droit et en dogme.</strong></td>
            </tr>
            <tr>
              <td className="font-medium text-primary">Bon / Acceptable</td>
              <td className="font-medium text-foreground">Ḥasan</td>
              <td>Similaire au Ṣaḥīḥ, mais la précision mémorielle d&apos;un ou plusieurs narrateurs est légèrement inférieure. <strong>Valide pour établir des règles juridiques.</strong></td>
            </tr>
            <tr>
              <td className="font-medium text-amber-500">Faible</td>
              <td className="font-medium text-foreground">Ḍaʿīf</td>
              <td>Maillon manquant, ou narrateur à la mémoire défaillante / intégrité douteuse. <strong>Ne peut fonder ni dogme ni loi obligatoire.</strong> (Il est parfois utilisé pour inciter aux bonnes actions s&apos;il n&apos;est pas très faible).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Il existe également la catégorie des hadiths <strong>inventés (Mawḍūʿ)</strong>, qui sont des fabrications pures et simples, rejetées en bloc.
      </p>

      <h2>Pourquoi cette science est-elle cruciale aujourd&apos;hui ?</h2>
      <p>
        Comprendre la science du hadith permet d&apos;éviter de nombreux écueils modernes :
      </p>
      <ul>
        <li><strong>Face aux citations Internet :</strong> De nombreuses phrases attribuées au Prophète sur les réseaux sociaux sont des hadiths faibles ou inventés. Un musulman formé demande la référence et le degré d&apos;authenticité (takhrīj).</li>
        <li><strong>Face aux détracteurs :</strong> L&apos;islamophobie ou la critique simpliste de l&apos;islam utilise souvent des hadiths isolés ou très faibles pour attaquer la religion. Connaître le filtre sunnite permet de rejeter ces attaques.</li>
        <li><strong>Pour la pratique :</strong> La prière, le jeûne, le mariage... tout le fiqh dépend de la Sunna. Si le hadith est faux, la règle juridique l&apos;est aussi.</li>
      </ul>

      <h2>Résumé</h2>
      <ol>
        <li>Un hadith = un texte (<strong>matn</strong>) porté par une chaîne de transmission (<strong>isnād</strong>).</li>
        <li>La science du hadith passe au crible chaque narrateur : son <strong>intégrité morale</strong> et sa <strong>précision mémorielle</strong>.</li>
        <li>Al-Bukhārī a imposé des <strong>critères stricts</strong> (dont la preuve de la rencontre) pour compiler son Ṣaḥīḥ, considéré comme le livre le plus authentique après le Coran.</li>
        <li>Les hadiths se divisent principalement en <strong>Ṣaḥīḥ (authentique), Ḥasan (bon) et Ḍaʿīf (faible)</strong>.</li>
        <li>Le sunnisme ne prend pas tout ce qui est attribué au Prophète pour argent comptant : c&apos;est une religion basée sur la <strong>preuve historique de la transmission</strong>.</li>
      </ol>
      <p>
        Maintenant que nous savons comment les sources (Coran et Sunna authentifiée) ont été préservées, nous arrivons à la dernière étape : comment ces textes sont-ils interprétés pour créer des lois ? C&apos;est l&apos;objet de l&apos;article final sur <strong>les écoles juridiques sunnites (madhahib)</strong>.
      </p>
    </ArticleLayout>
  );
}
