import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Les Fondements du Commerce en Islam : Licéité et Interdiction du Ribā",
  description:
    "Pourquoi le commerce est-il encouragé en islam et le ribā interdit ? Découvrez la philosophie économique islamique, le consentement mutuel et la justice sociale.",
};

export default function FondementsCommercePage() {
  return (
    <ArticleLayout
      title="Les Fondements du Commerce en Islam :"
      titleAccent="Licéité et Justice Économique"
      subtitle="L'islam ne sépare pas la spiritualité de l'économie. Comprendre pourquoi le commerce est valorisé et l'usure (ribā) strictement prohibée est la clé pour aborder la finance islamique."
      articleNumber={1}
      totalArticles={5}
      nextArticle={{ href: "/finance-islamique/regles-vente-contrats", title: "Les règles de la vente (bayʿ)" }}
    >
      <p>
        Dans la tradition islamique, la mosquée et le marché ne sont pas deux mondes opposés. Le fiqh al-muʿāmalāt (la jurisprudence des transactions) est une branche majeure du droit islamique, tout aussi développée que le fiqh des actes d&apos;adoration (ʿibādāt).
      </p>
      <p>
        Le point de départ de toute l&apos;économie islamique est formulé dans un verset coranique fondamental :
      </p>
      <blockquote>
        « Allah a rendu licite le commerce (bayʿ) et illicite l&apos;usure (ribā). » — Coran 2:275
      </blockquote>
      <p>
        Ce verset pose un cadre binaire absolu. D&apos;un côté, une activité profondément encouragée et noble (le commerce). De l&apos;autre, un système destructeur et formellement interdit (le ribā). Cet article explore la philosophie derrière cette distinction.
      </p>

      <h2>Le commerce (Bayʿ) : Une activité noble</h2>
      <p>
        Contrairement à certaines traditions spirituelles qui voient le détachement matériel comme l&apos;idéal absolu, l&apos;islam valorise la recherche de subsistance licite (ḥalāl). Le Prophète Muhammad (sws) lui-même, avant sa mission, était un commerçant reconnu pour son honnêteté, gérant les caravanes de son épouse Khadīja.
      </p>
      <p>
        Le commerce n&apos;est pas seulement toléré, il est spirituellement récompensé <strong>s&apos;il est pratiqué avec éthique</strong>.
      </p>
      
      <div className="info-box">
        <div className="info-box-title">💡 Hadith fondamental</div>
        <div className="info-box-content">
          Le Prophète Muhammad (sws) a dit : <em>« Le commerçant honnête et digne de confiance sera avec les prophètes, les véridiques et les martyrs [au Jour du Jugement]. »</em><br/><br/>
          (Rapporté par al-Tirmidhī, d&apos;après le compagnon Abū Saʿīd al-Khudrī. Qualifié de ḥasan).
        </div>
      </div>

      <p>
        Pourquoi une telle récompense ? Parce que la tentation de tricher, de mentir sur la qualité d&apos;un produit ou d&apos;exploiter l&apos;ignorance de l&apos;acheteur est omniprésente dans le commerce. Maintenir son intégrité dans le marché demande une piété profonde. À l&apos;inverse, le Prophète (sws) a averti : <em>« Les commerçants seront ressuscités pervers (fujjār), sauf ceux qui craignent Allah, se montrent pieux et disent la vérité. »</em> (Tirmidhī).
      </p>

      <h2>Le principe central : Le consentement mutuel (Tarāḍin)</h2>
      <p>
        La validité de toute transaction commerciale en islam repose sur un principe coranique absolu : le libre consentement.
      </p>
      <blockquote>
        « Ô les croyants ! Ne mangez pas vos biens entre vous illégalement, mais qu&apos;il y ait du négoce, basé sur le consentement mutuel (tarāḍin). » — Coran 4:29
      </blockquote>
      <p>
        Ce consentement doit être <strong>réel et éclairé</strong>. Cela signifie que :
      </p>
      <ul>
        <li>Une vente forcée est nulle.</li>
        <li>Une vente où un défaut majeur (ʿayb) est caché à l&apos;acheteur invalide le plein consentement.</li>
        <li>Les contrats ambigus ou contenant une incertitude excessive (gharar) sont illicites car ils mènent au conflit et biaisent le consentement.</li>
      </ul>

      <h2>L&apos;interdiction du Ribā : Définition et Philosophie</h2>
      <p>
        Le mot <strong>Ribā</strong> (رِبَا) signifie linguistiquement « augmentation », « accroissement » ou « surplus ». Dans la terminologie juridique, il désigne tout surplus exigé ou garanti sans contrepartie réelle légitime, notamment dans les prêts (intérêt) ou dans certains échanges de matières premières.
      </p>
      <p>
        L&apos;interdiction du ribā est l&apos;une des plus sévères du droit islamique, décrite dans le Coran comme une <em>« guerre de la part d&apos;Allah et de Son messager »</em> (2:279).
      </p>

      <h3>La différence fondamentale entre Profit et Ribā</h3>
      <p>
        Les Mecquois de l&apos;époque préislamique argumentaient que l&apos;intérêt n&apos;était qu&apos;une forme de commerce (<em>« Le commerce est tout à fait comme le ribā »</em> - Coran 2:275). La réponse divine fut cinglante en séparant radicalement les deux.
      </p>
      <p>
        Quelle est la différence philosophique et économique ?
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Le Profit Commercial (Bayʿ)</th>
              <th>L&apos;Intérêt (Ribā)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Généré par une <strong>activité économique réelle</strong> (création de valeur, transformation, transport, service).</td>
              <td>Généré par <strong>l'écoulement du temps</strong> sur une dette monétaire (l'argent produit de l'argent).</td>
            </tr>
            <tr>
              <td>Implique un <strong>partage du risque</strong> (le commerçant peut perdre son capital si la marchandise est détruite ou invendue).</td>
              <td>Le risque est <strong>transféré uniquement sur l'emprunteur</strong>. Le créancier est garanti de récupérer son capital + intérêt.</td>
            </tr>
            <tr>
              <td>Le rendement est <strong>variable et incertain</strong>.</td>
              <td>Le rendement est <strong>fixé à l'avance</strong>.</td>
            </tr>
            <tr>
              <td>Connecte directement le capital à l'économie réelle.</td>
              <td>Déconnecte la sphère financière de l'économie réelle.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>L&apos;approche des écoles juridiques (Madhāhib)</h2>
      <p>
        Les quatre grands imams fondateurs des écoles juridiques sunnites (Abū Ḥanīfa, Mālik ibn Anas, al-Shāfiʿī et Aḥmad ibn Ḥanbal) sont unanimes sur le caractère catégoriquement illicite (ḥarām) du ribā et licite (ḥalāl) du commerce équitable.
      </p>
      <p>
        Leur travail, que nous détaillerons dans les articles suivants, a consisté à définir <strong>les frontières exactes</strong> : à partir de quand une transaction commerciale contient-elle du ribā ? À partir de quand l&apos;incertitude (gharar) devient-elle illicite ?
      </p>
      <p>
        L&apos;Imam al-Shāfiʿī, dans son ouvrage <em>Al-Umm</em>, et l&apos;Imam Mālik dans <em>Al-Muwaṭṭaʾ</em>, ont posé des règles strictes sur la clarté des contrats pour protéger les deux parties. Abū Ḥanīfa a particulièrement détaillé l&apos;importance de la coutume locale (ʿurf) dans la validation des pratiques commerciales tant qu&apos;elles ne contredisent pas un texte explicite.
      </p>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ Ne pas confondre</div>
        <div className="warning-box-content">
          L&apos;islam n&apos;interdit pas de faire du profit. Vendre un objet plus cher qu&apos;on ne l&apos;a acheté est la définition même du commerce licite. Ce qui est interdit, c&apos;est de prêter de l&apos;argent et d&apos;exiger en retour une somme supérieure, ou de faire du profit sur le dos d&apos;une incertitude trompeuse.
        </div>
      </div>

      <h2>Résumé</h2>
      <ol>
        <li>Le commerce (bayʿ) est <strong>noble et encouragé</strong> en islam. Le commerçant honnête est spirituellement récompensé.</li>
        <li>La validité d&apos;une transaction repose sur le <strong>consentement mutuel réel et éclairé</strong> (tarāḍin).</li>
        <li>Le profit licite implique un <strong>risque</strong> et une création de <strong>valeur réelle</strong>.</li>
        <li>Le ribā (intérêt/usure) est strictement interdit car il garantit un profit sans risque, basé uniquement sur l&apos;écoulement du temps, menant à l&apos;exploitation.</li>
      </ol>
      <p>
        Maintenant que les fondements philosophiques sont posés, l&apos;article suivant entre dans la technique juridique : <strong>quelles sont les règles exactes pour qu&apos;un contrat de vente soit valide en islam ?</strong>
      </p>
    </ArticleLayout>
  );
}
