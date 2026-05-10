import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Comprendre l'Islam Sunnite : Origine, Sources et Structure | Rissala",
  description:
    "Qu'est-ce que l'islam sunnite ? Les 4 sources fondamentales (Coran, Sunna, Ijmā', Qiyās), la hiérarchie des textes et la logique de transmission. Guide structuré pour débutants.",
};

export default function IslamSunnitePage() {
  return (
    <ArticleLayout
      title="Comprendre l'Islam Sunnite :"
      titleAccent="Origine, Sources et Structure"
      subtitle="L'islam sunnite n'est pas un bloc monolithique. C'est une architecture de transmission et d'interprétation, construite sur des sources hiérarchisées et une méthodologie rigoureuse."
      articleNumber={1}
      totalArticles={5}
      nextArticle={{ href: "/sciences/vie-prophete-muhammad", title: "La vie du Prophète Muhammad" }}
    >
      <p>
        Le terme <strong>« sunnite »</strong> est omniprésent, mais rarement expliqué avec précision. La plupart des gens savent vaguement que c&apos;est « la branche majoritaire de l&apos;islam ». Mais que signifie-t-il réellement ? Sur quoi repose-t-il ? Comment est-il structuré ?
      </p>
      <p>
        Cet article est le premier d&apos;une série de 5 qui vous donnera une <strong>compréhension systémique</strong> de l&apos;islam sunnite — de ses origines à sa structuration juridique. Commençons par la carte mentale complète.
      </p>

      <h2>Ahl al-Sunna wa al-Jamāʿa : la définition exacte</h2>
      <p>
        Le nom complet est <strong>Ahl al-Sunna wa al-Jamāʿa</strong> (أهل السنة والجماعة), littéralement « les gens de la tradition [prophétique] et du consensus communautaire ». Ce nom contient deux concepts fondamentaux :
      </p>
      <ul>
        <li><strong>Al-Sunna</strong> — la tradition du Prophète Muhammad (ses paroles, actes et approbations). C&apos;est la deuxième source de l&apos;islam après le Coran.</li>
        <li><strong>Al-Jamāʿa</strong> — le consensus de la communauté. L&apos;idée que la communauté musulmane, dans son ensemble, ne peut pas s&apos;accorder unanimement sur une erreur.</li>
      </ul>
      <p>
        Le sunnisme se définit donc par deux piliers : le <strong>suivi de la Sunna prophétique</strong> et l&apos;<strong>attachement au consensus communautaire</strong>. Ce n&apos;est ni une invention tardive ni une simple étiquette — c&apos;est une <strong>méthodologie</strong>.
      </p>

      <div className="info-box">
        <div className="info-box-title">💡 Point clé</div>
        <div className="info-box-content">
          Le sunnisme n&apos;est pas défini par une autorité centrale unique (comme le Vatican pour le catholicisme). Il est défini par une <strong>méthode de raisonnement</strong> partagée et des <strong>sources textuelles communes</strong>.
        </div>
      </div>

      <h2>Les 4 sources fondamentales du droit islamique sunnite</h2>
      <p>
        Le système sunnite repose sur <strong>4 sources (uṣūl)</strong>, classées par ordre de priorité. Cette hiérarchie est essentielle : on ne consulte la source suivante que lorsque la précédente ne fournit pas de réponse claire.
      </p>

      <h3>1. Le Coran (al-Qurʾān)</h3>
      <p>
        Le Coran est la <strong>première source absolue</strong>. Pour les musulmans, c&apos;est la Parole d&apos;Allah, révélée au Prophète Muhammad par l&apos;intermédiaire de l&apos;ange Gabriel (Jibrīl), sur une période d&apos;environ 23 ans (610-632).
      </p>
      <p>
        Le Coran contient 114 sourates (chapitres) et environ 6 236 versets (āyāt). Il couvre la théologie, la morale, le droit, les récits prophétiques et les principes de vie en société. Cependant, les versets à caractère juridique (aḥkām) ne représentent qu&apos;environ <strong>500 versets sur 6 236</strong> — soit moins de 10 % du texte.
      </p>
      <p>
        C&apos;est pour cette raison que les autres sources sont nécessaires : le Coran pose les <strong>principes fondamentaux</strong>, mais il ne détaille pas toutes les situations pratiques de la vie.
      </p>

      <h3>2. La Sunna (la tradition prophétique)</h3>
      <p>
        La Sunna englobe tout ce que le Prophète Muhammad a dit (<strong>paroles</strong>), fait (<strong>actes</strong>) ou tacitement approuvé (<strong>approbations silencieuses</strong>). Elle est transmise sous forme de <strong>hadiths</strong> — des récits avec une chaîne de transmission (isnād) et un contenu (matn).
      </p>
      <p>
        La Sunna a trois fonctions par rapport au Coran :
      </p>
      <ul>
        <li><strong>Confirmer</strong> ce que le Coran dit (ex : l&apos;obligation de la prière)</li>
        <li><strong>Détailler</strong> ce que le Coran mentionne globalement (ex : comment prier exactement)</li>
        <li><strong>Légiférer</strong> sur des sujets que le Coran ne mentionne pas directement</li>
      </ul>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ Distinction critique</div>
        <div className="warning-box-content">
          Le Coran et la Sunna sont <strong>tous deux révélés</strong> selon la doctrine sunnite, mais de manière différente. Le Coran est la Parole littérale d&apos;Allah (texte et sens). La Sunna est inspirée divinement (le sens vient de Dieu, mais les mots sont ceux du Prophète). Nous approfondirons la science du hadith dans l&apos;article 4.
        </div>
      </div>

      <h3>3. Le consensus (al-Ijmāʿ)</h3>
      <p>
        L&apos;ijmāʿ est l&apos;<strong>accord unanime des savants musulmans</strong> d&apos;une époque donnée sur une question juridique ou théologique. Quand tous les juristes qualifiés s&apos;accordent sur un point, cette unanimité devient une source de droit.
      </p>
      <p>
        Le fondement de l&apos;ijmāʿ est un hadith : <em>« Ma communauté ne s&apos;accordera pas unanimement sur une erreur »</em>. En pratique, l&apos;ijmāʿ est le mécanisme qui <strong>stabilise l&apos;interprétation</strong> et empêche les dérives individuelles extrêmes.
      </p>

      <h3>4. L&apos;analogie juridique (al-Qiyās)</h3>
      <p>
        Le qiyās est le <strong>raisonnement par analogie</strong>. Quand une situation nouvelle n&apos;est pas directement traitée par le Coran, la Sunna ou l&apos;ijmāʿ, les juristes cherchent un cas similaire déjà tranché et appliquent le même raisonnement.
      </p>
      <p>
        Exemple classique : le Coran interdit le vin (khamr). Par qiyās, les juristes ont étendu cette interdiction à <strong>toute substance enivrante</strong>, car la raison de l&apos;interdiction (ʿilla) — l&apos;ivresse — est commune à toutes.
      </p>

      <h2>Schéma hiérarchique des sources</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Priorité</th><th>Source</th><th>Nature</th><th>Statut</th></tr>
          </thead>
          <tbody>
            <tr><td className="font-medium text-primary">1</td><td className="font-medium text-foreground">Coran</td><td>Texte révélé</td><td>Absolu — ne peut être contredit</td></tr>
            <tr><td className="font-medium text-primary">2</td><td className="font-medium text-foreground">Sunna</td><td>Tradition prophétique</td><td>Complète et détaille le Coran</td></tr>
            <tr><td className="font-medium text-primary">3</td><td className="font-medium text-foreground">Ijmāʿ</td><td>Consensus des savants</td><td>Stabilise l&apos;interprétation</td></tr>
            <tr><td className="font-medium text-primary">4</td><td className="font-medium text-foreground">Qiyās</td><td>Analogie juridique</td><td>Étend le droit aux cas nouveaux</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Religion révélée vs interprétation humaine</h2>
      <p>
        Une distinction fondamentale traverse tout le système sunnite : la différence entre ce qui est <strong>révélé</strong> (le Coran, la Sunna authentique) et ce qui est <strong>interprété</strong> (le fiqh, les avis juridiques).
      </p>
      <ul>
        <li><strong>Le texte révélé</strong> est sacré et immuable. Le Coran ne change pas. Un hadith authentique reste authentique.</li>
        <li><strong>L&apos;interprétation juridique</strong> (fiqh) est un effort humain, susceptible d&apos;erreur. C&apos;est pourquoi il existe <strong>plusieurs écoles juridiques</strong> (madhahib) au sein du même sunnisme.</li>
      </ul>
      <p>
        Cette distinction est cruciale : <strong>divergence d&apos;interprétation ≠ divergence de religion</strong>. Les savants peuvent différer sur la manière de prier, de jeûner ou de commercer, tout en partageant les mêmes sources fondamentales.
      </p>

      <div className="info-box">
        <div className="info-box-title">📌 À retenir</div>
        <div className="info-box-content">
          Le sunnisme est une <strong>architecture à deux niveaux</strong> : un socle de textes révélés (Coran + Sunna) sur lequel se construit un édifice d&apos;interprétation humaine (fiqh). Le socle est fixe. L&apos;édifice est flexible — c&apos;est ce qui a permis à l&apos;islam de s&apos;adapter à des contextes très différents sur 14 siècles.
        </div>
      </div>

      <h2>Le rôle central de la transmission orale</h2>
      <p>
        L&apos;islam naît dans une civilisation <strong>orale</strong>. Les Arabes du VIIe siècle sont des poètes et des orateurs — la mémoire est leur technologie de stockage. Le Coran a d&apos;abord été <strong>mémorisé</strong> avant d&apos;être écrit. La Sunna a circulé <strong>oralement pendant des décennies</strong> avant d&apos;être compilée dans des recueils.
      </p>
      <p>
        Ce contexte oral explique pourquoi la <strong>chaîne de transmission</strong> (isnād) est devenue le critère central de fiabilité en islam. Chaque information est jugée non seulement sur son contenu, mais surtout sur la fiabilité des personnes qui l&apos;ont transmise, de bouche à oreille, depuis le Prophète.
      </p>

      <h2>Ce que vous allez apprendre dans cette série</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Article</th><th>Sujet</th><th>Question centrale</th></tr>
          </thead>
          <tbody>
            <tr><td className="text-primary font-medium">1 (actuel)</td><td>Structure du sunnisme</td><td>Sur quoi repose le système ?</td></tr>
            <tr><td className="text-primary font-medium">2</td><td>Vie du Prophète</td><td>Dans quel contexte le message est-il né ?</td></tr>
            <tr><td className="text-primary font-medium">3</td><td>Transmission du message</td><td>Comment le Coran et la Sunna ont-ils été préservés ?</td></tr>
            <tr><td className="text-primary font-medium">4</td><td>Science du hadith</td><td>Comment distinguer le vrai du faux ?</td></tr>
            <tr><td className="text-primary font-medium">5</td><td>Écoles juridiques</td><td>Pourquoi plusieurs interprétations coexistent ?</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Résumé</h2>
      <ol>
        <li>Le sunnisme = <strong>Ahl al-Sunna wa al-Jamāʿa</strong> : suivi de la Sunna + consensus communautaire.</li>
        <li><strong>4 sources hiérarchisées</strong> : Coran → Sunna → Ijmāʿ → Qiyās.</li>
        <li>Distinction fondamentale entre <strong>texte révélé</strong> (sacré, fixe) et <strong>interprétation juridique</strong> (humaine, flexible).</li>
        <li>La <strong>transmission orale</strong> est le mode originel — d&apos;où l&apos;importance de la chaîne de transmission.</li>
        <li>Le sunnisme est une <strong>architecture de transmission et d&apos;interprétation</strong>, pas un bloc monolithique.</li>
      </ol>
    </ArticleLayout>
  );
}
