import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "La Vie du Prophète Muhammad : Contexte Historique et Chronologie | Rissala",
  description:
    "Chronologie essentielle de la vie du Prophète Muhammad : Arabie préislamique, révélation, Hégire, période mecquoise et médinoise. Guide historique structuré.",
};

const chronologie = [
  { date: "~570", evenement: "Naissance de Muhammad à La Mecque", detail: "Clan des Banū Hāshim, tribu de Quraysh. Orphelin très tôt (père décédé avant sa naissance)." },
  { date: "~576", evenement: "Décès de sa mère Āmina", detail: "Muhammad est recueilli par son grand-père ʿAbd al-Muṭṭalib, puis par son oncle Abū Ṭālib." },
  { date: "~595", evenement: "Mariage avec Khadīja", detail: "Riche commerçante mecquoise. Elle sera sa première confidente et la première à croire en sa mission." },
  { date: "~610", evenement: "Première révélation (grotte de Ḥirāʾ)", detail: "L'ange Gabriel (Jibrīl) transmet les premiers versets : sourate al-ʿAlaq (96:1-5). Début de la mission prophétique." },
  { date: "610-622", evenement: "Période mecquoise (~13 ans)", detail: "Prédication discrète puis publique. Persécution croissante par Quraysh. Révélations centrées sur le monothéisme et l'au-delà." },
  { date: "615", evenement: "Émigration vers l'Abyssinie", detail: "Un groupe de musulmans persécutés trouve refuge auprès du Négus chrétien d'Éthiopie." },
  { date: "619", evenement: "L'Année de la Tristesse", detail: "Décès de Khadīja et d'Abū Ṭālib. Muhammad perd son épouse et son protecteur politique la même année." },
  { date: "622", evenement: "L'Hégire (Hijra) vers Médine", detail: "Migration fondatrice. Muhammad est invité par les tribus de Médine. An 1 du calendrier islamique." },
  { date: "624", evenement: "Bataille de Badr", detail: "Première victoire militaire majeure des musulmans (313 vs ~1000). Tournant psychologique et politique." },
  { date: "625", evenement: "Bataille d'Uḥud", detail: "Défaite partielle. Leçons stratégiques et affirmation de la résilience communautaire." },
  { date: "627", evenement: "Bataille du Fossé (Khandaq)", detail: "Siège de Médine par une coalition. Stratégie défensive du fossé (idée de Salmān al-Fārisī)." },
  { date: "628", evenement: "Traité de Ḥudaybiyya", detail: "Accord de paix avec Quraysh. Perçu comme un recul, mais qualifié de « victoire manifeste » par le Coran (48:1)." },
  { date: "630", evenement: "Conquête de La Mecque (Fatḥ Makka)", detail: "Entrée pacifique dans La Mecque. Amnistie générale. Destruction des idoles de la Kaaba." },
  { date: "632", evenement: "Pèlerinage d'Adieu et décès", detail: "Dernier pèlerinage. Sermon d'Adieu à ʿArafāt. Décès à Médine le 12 Rabīʿ al-Awwal (8 juin 632)." },
];

export default function VieProhpetePage() {
  return (
    <ArticleLayout
      title="La Vie du Prophète Muhammad :"
      titleAccent="Contexte Historique et Chronologie"
      subtitle="Le message islamique naît dans un contexte social, politique et tribal précis. Comprendre ce contexte est indispensable pour comprendre le message lui-même."
      articleNumber={2}
      totalArticles={5}
      prevArticle={{ href: "/sciences-islamiques/islam-sunnite-sources", title: "L'islam sunnite : sources et structure" }}
      nextArticle={{ href: "/sciences-islamiques/transmission-message-islamique", title: "La transmission du message" }}
    >
      <p>
        Le Prophète Muhammad n&apos;est pas apparu dans le vide. Il est né dans une société tribale arabe du VIIe siècle, avec ses codes, ses alliances, ses conflits et sa religion polythéiste. Pour comprendre <strong>l&apos;islam sunnite</strong>, il faut d&apos;abord comprendre le monde dans lequel le message a été révélé.
      </p>

      <h2>L&apos;Arabie préislamique : la Jāhiliyya</h2>
      <p>
        Le terme <strong>Jāhiliyya</strong> (جاهلية) signifie littéralement « l&apos;ignorance ». Il désigne la période préislamique en Arabie, non pas au sens d&apos;absence de civilisation, mais d&apos;<strong>absence de guidance divine</strong> selon la perspective islamique.
      </p>
      <p>
        L&apos;Arabie du VIe siècle est un carrefour commercial entre l&apos;Empire byzantin au nord, l&apos;Empire sassanide (perse) à l&apos;est et l&apos;Abyssinie (Éthiopie) à l&apos;ouest. La Mecque (Makka) est un centre de commerce et de pèlerinage, grâce à la <strong>Kaaba</strong> — sanctuaire contenant à l&apos;époque plus de 360 idoles.
      </p>
      <p>
        La société arabe est organisée en <strong>tribus</strong>. L&apos;identité est tribale, pas nationale. La loyauté va au clan, pas à un État. Le droit est coutumier, basé sur les traditions ancestrales et l&apos;arbitrage des chefs. Il n&apos;y a pas de livre sacré unifié, bien que des communautés juives et chrétiennes existent en Arabie.
      </p>

      <div className="info-box">
        <div className="info-box-title">💡 Contexte important</div>
        <div className="info-box-content">
          La Mecque est dominée par la tribu de <strong>Quraysh</strong>, gardienne de la Kaaba. Muhammad appartient au clan des <strong>Banū Hāshim</strong>, une branche respectée mais pas la plus puissante de Quraysh. Ce positionnement tribal expliquera beaucoup des dynamiques politiques de la période prophétique.
        </div>
      </div>

      <h2>La naissance et la jeunesse de Muhammad (~570-610)</h2>
      <p>
        Muhammad ibn ʿAbdullāh naît à La Mecque vers 570 de l&apos;ère chrétienne. Son père, ʿAbdullāh, meurt avant sa naissance. Sa mère, Āmina, décède quand il a environ 6 ans. Il est élevé d&apos;abord par son grand-père ʿAbd al-Muṭṭalib, puis par son oncle <strong>Abū Ṭālib</strong>.
      </p>
      <p>
        Il grandit dans le commerce caravanier, voyageant entre La Mecque et la Syrie. Sa réputation d&apos;honnêteté lui vaut le surnom de <strong>al-Amīn</strong> (le digne de confiance) et de <strong>al-Ṣādiq</strong> (le véridique).
      </p>
      <p>
        Vers 595, il épouse <strong>Khadīja bint Khuwaylid</strong>, une commerçante prospère de 40 ans (Muhammad en a environ 25). Khadīja sera son principal soutien pendant les premières années de la révélation. Elle est la <strong>première personne à croire en son message</strong>.
      </p>

      <h2>La révélation (~610) : le début de la mission</h2>
      <p>
        Muhammad prend l&apos;habitude de se retirer dans la <strong>grotte de Ḥirāʾ</strong>, sur le mont al-Nūr, près de La Mecque, pour méditer. Vers 610, lors d&apos;une de ces retraites, l&apos;ange <strong>Gabriel (Jibrīl)</strong> lui apparaît et lui transmet les premiers versets du Coran :
      </p>
      <blockquote>
        « Lis ! Au nom de ton Seigneur qui a créé. Il a créé l&apos;homme d&apos;une adhérence. Lis ! Et ton Seigneur est le Plus Généreux. » — Coran, 96:1-3
      </blockquote>
      <p>
        Cet événement marque le début de la <strong>période de révélation</strong>, qui durera environ 23 ans (610-632). Les révélations arrivent progressivement, en réponse aux événements, aux questions et aux besoins de la communauté naissante.
      </p>

      <h2>Période mecquoise (610-622) : persévérance et persécution</h2>
      <p>
        Les 13 premières années de la mission se déroulent à La Mecque. Le message est d&apos;abord transmis <strong>en cercle restreint</strong> (3 ans de prédication privée), puis de manière <strong>publique</strong>.
      </p>
      <p>
        Les <strong>révélations mecquoises</strong> se caractérisent par :
      </p>
      <ul>
        <li>L&apos;affirmation du <strong>monothéisme pur</strong> (tawḥīd) face au polythéisme</li>
        <li>Les descriptions de l&apos;<strong>au-delà</strong> (Paradis, Enfer, Jour du Jugement)</li>
        <li>Les récits des <strong>prophètes antérieurs</strong> (Noé, Abraham, Moïse, Jésus)</li>
        <li>Des versets courts, poétiques, percutants</li>
        <li>Peu de législation pratique</li>
      </ul>
      <p>
        La réaction de Quraysh est progressivement hostile. Le message menace l&apos;ordre économique (le pèlerinage polythéiste enrichit La Mecque) et l&apos;ordre social (égalité des croyants vs hiérarchie tribale). Les musulmans subissent <strong>persécutions</strong>, boycott économique et violences. Certains émigrent en Abyssinie vers 615.
      </p>

      <h2>L&apos;Hégire (622) : le tournant fondateur</h2>
      <p>
        En 622, Muhammad et ses compagnons quittent La Mecque pour <strong>Yathrib</strong>, qui deviendra <strong>Médine</strong> (al-Madīna al-Munawwara, « la ville illuminée »). Cette migration est appelée <strong>Hijra</strong> (Hégire).
      </p>
      <p>
        L&apos;Hégire est si fondamentale qu&apos;elle marque le <strong>début du calendrier islamique</strong> (an 1 de l&apos;Hégire). Ce n&apos;est pas simplement un déplacement géographique — c&apos;est la naissance d&apos;un <strong>État</strong>. À Médine, Muhammad est à la fois leader spirituel et chef politique.
      </p>

      <div className="info-box">
        <div className="info-box-title">📌 Mecque vs Médine</div>
        <div className="info-box-content">
          <strong>À La Mecque</strong>, Muhammad est un prédicateur persécuté dans une société hostile. <strong>À Médine</strong>, il est le chef d&apos;une communauté organisée avec des lois, des alliances et une armée. Cette transition explique le changement de ton des révélations.
        </div>
      </div>

      <h2>Période médinoise (622-632) : construction de la communauté</h2>
      <p>
        Les <strong>révélations médinoises</strong> sont très différentes des mecquoises :
      </p>
      <ul>
        <li><strong>Législation détaillée</strong> : mariage, divorce, héritage, commerce, droit pénal</li>
        <li><strong>Relations internationales</strong> : traités, règles de guerre, diplomatie</li>
        <li><strong>Organisation sociale</strong> : droits, devoirs, contrats</li>
        <li>Versets plus <strong>longs et détaillés</strong></li>
      </ul>

      <h3>Les événements clés de la période médinoise</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Année</th><th>Événement</th><th>Signification</th></tr>
          </thead>
          <tbody>
            <tr><td className="font-medium text-foreground">624</td><td>Bataille de Badr</td><td>Première victoire. 313 musulmans vs ~1000. Tournant psychologique.</td></tr>
            <tr><td className="font-medium text-foreground">625</td><td>Bataille d&apos;Uḥud</td><td>Défaite partielle. Leçon de discipline et de résilience.</td></tr>
            <tr><td className="font-medium text-foreground">627</td><td>Bataille du Fossé</td><td>Siège de Médine. Défense stratégique. Fin de la menace directe.</td></tr>
            <tr><td className="font-medium text-foreground">628</td><td>Traité de Ḥudaybiyya</td><td>Paix avec Quraysh. « Victoire manifeste » — permet la propagation pacifique.</td></tr>
            <tr><td className="font-medium text-foreground">630</td><td>Conquête de La Mecque</td><td>Entrée pacifique. Amnistie générale. Fin du polythéisme mecquois.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Le Pèlerinage d&apos;Adieu et le décès (632)</h2>
      <p>
        En 632, Muhammad effectue son <strong>pèlerinage d&apos;Adieu</strong> (Ḥajjat al-Wadāʿ). Lors du sermon de ʿArafāt, devant plus de 100 000 pèlerins, il prononce des paroles fondatrices sur l&apos;égalité, les droits, et la finalité de son message.
      </p>
      <p>
        Peu après, le 12 Rabīʿ al-Awwal (8 juin 632), Muhammad décède à Médine, dans la maison de son épouse ʿĀʾisha. Il a environ 63 ans. Il ne laisse <strong>aucun successeur désigné de manière explicite</strong> — cette question deviendra le point de divergence majeur entre sunnites et chiites.
      </p>

      <h2>Frise chronologique complète</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Date</th><th>Événement</th><th>Détail</th></tr>
          </thead>
          <tbody>
            {chronologie.map((ev, i) => (
              <tr key={i}>
                <td className="font-medium text-primary whitespace-nowrap">{ev.date}</td>
                <td className="font-medium text-foreground">{ev.evenement}</td>
                <td className="text-sm">{ev.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Résumé</h2>
      <ol>
        <li>Muhammad naît vers 570 dans une <strong>société tribale et polythéiste</strong>.</li>
        <li>La révélation commence vers 610 — <strong>13 ans à La Mecque</strong> (monothéisme, au-delà, récits prophétiques).</li>
        <li>L&apos;<strong>Hégire (622)</strong> marque la naissance d&apos;une communauté politique organisée à Médine.</li>
        <li><strong>10 ans à Médine</strong> : législation, batailles, traités, conquête pacifique de La Mecque.</li>
        <li>Le Prophète décède en 632 en laissant un <strong>Coran révélé</strong> et une <strong>Sunna transmise oralement</strong>.</li>
        <li>Les révélations mecquoises et médinoises ont des <strong>caractéristiques distinctes</strong> qu&apos;il faut connaître pour comprendre le Coran.</li>
      </ol>
      <p>
        L&apos;article suivant explore la question cruciale : <strong>comment ce message a-t-il été transmis</strong> du Prophète aux générations suivantes ? Comment le Coran a-t-il été compilé ? Et pourquoi la Sunna est-elle restée orale si longtemps ?
      </p>
    </ArticleLayout>
  );
}
