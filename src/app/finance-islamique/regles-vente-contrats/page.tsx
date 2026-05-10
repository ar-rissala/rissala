import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Les Règles de la Vente en Islam (Bayʿ) : Conditions de Validité d'un Contrat",
  description:
    "Quelles sont les conditions de validité d'un contrat de vente en droit islamique ? Ijab, Qabul, possession, absence de gharar. Fiqh al-muʿāmalāt.",
};

export default function ReglesVentePage() {
  return (
    <ArticleLayout
      title="Les Règles de la Vente (Bayʿ) :"
      titleAccent="Conditions de Validité d'un Contrat"
      subtitle="Le fiqh al-muʿāmalāt établit des règles strictes pour protéger l'acheteur et le vendeur. Un contrat n'est valide que s'il respecte des conditions précises sur les contractants, l'objet et la forme."
      articleNumber={2}
      totalArticles={6}
      prevArticle={{ href: "/finance-islamique/fondements-commerce-islam", title: "Les fondements du commerce" }}
      nextArticle={{ href: "/finance-islamique/riba-usure-explication", title: "Le ribā en détail" }}
    >
      <p>
        Dire que « le commerce est licite » (Coran 2:275) ne signifie pas que toutes les pratiques commerciales le sont. Pour garantir la justice et le consentement mutuel (tarāḍin), la jurisprudence islamique a défini des conditions rigoureuses pour la validité d&apos;une vente (<strong>bayʿ</strong>).
      </p>
      <p>
        Les grands ouvrages de fiqh, comme <em>Al-Mughnī</em> d&apos;Ibn Qudāma (école hanbalite) ou <em>Badāʾiʿ al-Ṣanāʾiʿ</em> d&apos;al-Kāsānī (école hanafite), consacrent des centaines de pages à ces règles. Voici la synthèse des <strong>piliers d&apos;un contrat valide</strong>.
      </p>

      <h2>Le Pilier de la Forme : Offre et Acceptation (Ījāb et Qabūl)</h2>
      <p>
        Un contrat islamique (ʿaqd) n&apos;existe que par la rencontre d&apos;une volonté de vendre et d&apos;une volonté d&apos;acheter. Cette rencontre se matérialise par :
      </p>
      <ul>
        <li><strong>Al-Ījāb (l'offre)</strong> : L&apos;expression par la première partie de sa volonté de conclure le contrat. (Ex: « Je te vends ceci pour 100€ »).</li>
        <li><strong>Al-Qabūl (l'acceptation)</strong> : L&apos;accord de la seconde partie, qui doit correspondre exactement à l&apos;offre. (Ex: « J&apos;accepte »).</li>
      </ul>
      <p>
        <strong>Précision du fiqh moderne :</strong> Cette formulation n&apos;a pas besoin d&apos;être verbale. Les savants contemporains acceptent le clic sur un bouton « Acheter » (vente électronique) ou le simple fait de déposer un article sur le tapis de caisse et de payer (vente par acte ou <em>muʿāṭāt</em>) comme des formes valides de ījāb et qabūl, tant que la coutume (ʿurf) le reconnaît.
      </p>

      <h2>Les Conditions liées à l&apos;Objet de la Vente (Al-Mabīʿ)</h2>
      <p>
        C&apos;est ici que se trouve le cœur de la réglementation islamique. L&apos;objet vendu doit respecter plusieurs conditions strictes.
      </p>

      <h3>1. L&apos;objet doit être licite en lui-même (Mubāḥ)</h3>
      <p>
        On ne peut pas vendre ce que l&apos;islam interdit de consommer ou d&apos;utiliser. La vente d&apos;alcool, de porc, de drogues ou de statues religieuses (idoles) est radicalement nulle. Un contrat portant sur un bien illicite est considéré inexistant en droit islamique.
      </p>

      <h3>2. L&apos;objet doit exister au moment de la vente</h3>
      <p>
        En règle générale, on ne peut pas vendre un bien qui n&apos;existe pas encore (ex: le fruit d&apos;un arbre qui n&apos;a pas encore fleuri). C&apos;est une règle pour éviter les conflits liés à l&apos;incertitude.
        <br/><em>Exception légale :</em> Le contrat <strong>salam</strong> ou <strong>istiṣnāʿ</strong>, où le Prophète (sws) a autorisé la vente d&apos;un bien futur manufacturé ou agricole sous des conditions de description extrêmement précises.
      </p>

      <h3>3. Le vendeur doit en être le propriétaire (Mulk)</h3>
      <p>
        C&apos;est l&apos;une des règles les plus importantes et les plus violées dans la finance moderne (notamment la vente à découvert ou <em>short selling</em>).
      </p>

      <div className="info-box">
        <div className="info-box-title">💡 Hadith fondamental</div>
        <div className="info-box-content">
          Le compagnon Ḥakīm ibn Ḥizām a dit au Prophète (sws) : <em>« Ô Messager d&apos;Allah, un homme vient me voir pour m&apos;acheter une marchandise que je ne possède pas. Puis-je lui vendre puis aller l&apos;acheter au marché ? »</em><br/><br/>
          Le Prophète (sws) a répondu : <strong>« Ne vends pas ce que tu ne possèdes pas. »</strong><br/>
          (Rapporté par Abū Dāwūd, al-Tirmidhī — chaîne ṣaḥīḥ).
        </div>
      </div>

      <p>
        On ne peut vendre que ce que l&apos;on possède réellement et que l&apos;on a physiquement (ou constructivement) réceptionné (qabḍ). Cela empêche la spéculation sur du vide.
      </p>

      <h3>4. L&apos;objet doit être livrable</h3>
      <p>
        Vendre un oiseau en plein vol, un poisson non pêché dans l&apos;océan, ou une voiture volée que l&apos;on n&apos;est pas sûr de récupérer, rend le contrat invalide. Si le vendeur ne peut pas garantir la livraison, il s&apos;agit d&apos;une forme de pari.
      </p>

      <h2>L&apos;interdiction du Gharar (Incertitude Excessive)</h2>
      <p>
        Le <strong>Gharar</strong> se traduit par « incertitude », « tromperie » ou « risque ambigu ». Le Prophète Muhammad (sws) a explicitement interdit « la vente impliquant le gharar » (Rapporté par Muslim, d&apos;après Abū Hurayra).
      </p>
      <p>
        Pour qu&apos;une vente soit valide, il ne doit y avoir <strong>aucune ignorance (jahāla)</strong> sur les éléments essentiels du contrat :
      </p>
      <ul>
        <li><strong>L&apos;objet doit être connu :</strong> La nature, la quantité, et la qualité doivent être spécifiées. Vendre « ce qu&apos;il y a dans cette boîte fermée » sans le décrire est du gharar.</li>
        <li><strong>Le prix doit être connu :</strong> Le montant exact de la transaction doit être fixé lors de l&apos;accord.</li>
        <li><strong>Le délai doit être connu :</strong> Si le paiement est différé, la date exacte doit être fixée.</li>
      </ul>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ L'application moderne du Gharar</div>
        <div className="warning-box-content">
          L&apos;interdiction du gharar est la raison pour laquelle les assurances commerciales classiques (où l&apos;on paie une prime certaine contre un dédommagement incertain) et les produits financiers dérivés (options, futures) sont majoritairement considérés comme illicites par les académies de fiqh contemporaines.
        </div>
      </div>

      <h2>Les Vices Cachés et le Droit de Rétractation (Khiyār)</h2>
      <p>
        Le fiqh al-muʿāmalāt protège puissamment l&apos;acheteur. Le vendeur a l&apos;obligation religieuse absolue de signaler tout défaut (ʿayb) de la marchandise.
      </p>
      <p>
        Si l&apos;acheteur découvre un défaut qui lui a été caché, l&apos;islam lui accorde le <strong>khiyār al-ʿayb</strong> (l&apos;option de défaut) : le droit légal d&apos;annuler la vente et de récupérer son argent, ou d&apos;accepter l&apos;objet avec une réduction de prix proportionnelle.
      </p>
      <p>
        Le Prophète (sws) passant près d&apos;un tas de grain au marché, y plongea la main et la trouva mouillée (le vendeur avait caché le blé mouillé en dessous). Il déclara alors la célèbre maxime : <em>« Celui qui nous trompe n&apos;est pas des nôtres. »</em> (Rapporté par Muslim).
      </p>

      <h2>Résumé</h2>
      <ol>
        <li>Un contrat nécessite une <strong>offre et une acceptation</strong> (ījāb et qabūl), claires et concordantes.</li>
        <li>L&apos;objet vendu doit être <strong>licite, possédé par le vendeur, et livrable</strong>. « Ne vends pas ce que tu ne possèdes pas. »</li>
        <li>Le prix, la quantité, la qualité et les délais doivent être <strong>connus précisément</strong> pour éviter toute incertitude excessive (Gharar).</li>
        <li>Cacher un défaut est un péché grave qui donne à l&apos;acheteur le droit légal d&apos;annuler la transaction.</li>
      </ol>
      <p>
        Ces règles protègent contre la spéculation sur le vide et l&apos;exploitation. Mais il reste une ligne rouge absolue à tracer. L&apos;article suivant plonge dans les détails techniques de l&apos;interdiction la plus complexe du droit islamique : <strong>les différents types de Ribā (l&apos;usure)</strong>.
      </p>
    </ArticleLayout>
  );
}
