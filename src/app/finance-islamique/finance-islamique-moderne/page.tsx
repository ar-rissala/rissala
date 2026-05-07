import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "De la Jurisprudence Classique à la Finance Islamique Moderne | Rissala",
  description:
    "Comment les banques islamiques adaptent les contrats du fiqh ancien (Murabaha, Ijara, Musharaka, Mudaraba) au monde moderne. Explications des produits.",
};

export default function FinanceIslamiqueModernePage() {
  return (
    <ArticleLayout
      title="De la Jurisprudence Classique :"
      titleAccent="Vers la Finance Islamique Moderne"
      subtitle="Comment appliquer des règles juridiques vieilles de 14 siècles (interdiction du ribā, règles de vente) dans un monde financier moderne dominé par le crédit et la spéculation ? C'est le défi de la finance islamique."
      articleNumber={5}
      totalArticles={5}
      prevArticle={{ href: "/finance-islamique/zakat-mecanisme-economique", title: "La zakāt : mécanisme économique" }}
    >
      <p>
        Pendant des siècles, le commerce dans le monde musulman s&apos;est opéré selon les règles du <em>fiqh al-muʿāmalāt</em> que nous avons vues dans les articles précédents : commerce direct, associations pour le commerce maritime, paiements différés licites. 
      </p>
      <p>
        Mais avec l&apos;apparition du système bancaire moderne, basé intrinsèquement sur le prêt à intérêt (Ribā) pour la consommation et l&apos;investissement, les musulmans se sont retrouvés face à un dilemme.
      </p>
      <p>
        C&apos;est ainsi qu&apos;est née, dans la seconde moitié du XXe siècle, la <strong>finance islamique moderne</strong>. Des savants contemporains majeurs (comme Muḥammad Taqī ʿUthmānī et Yūsuf al-Qaraḍāwī) ont revisité les grands ouvrages de jurisprudence classique pour en extraire des contrats anciens et les adapter au monde des banques.
      </p>

      <h2>Le principe de base : Financer par l&apos;actif (Asset-backed)</h2>
      <p>
        La règle d&apos;or qui sépare la finance conventionnelle de la finance islamique est la suivante :
      </p>
      <p>
        <strong>La banque conventionnelle prête de l&apos;argent. La banque islamique achète et vend (ou loue) des actifs réels.</strong>
      </p>
      <p>
        Dans la finance islamique, l&apos;argent n&apos;est pas une marchandise qui se loue contre un intérêt. C&apos;est un simple moyen d&apos;échange. Pour générer un profit, il faut une transaction sur l&apos;économie réelle. Voici les 4 grands contrats ressuscités du fiqh classique.
      </p>

      <h2>1. La Murābaḥa (La vente avec marge bénéficiaire déclarée)</h2>
      <p>
        C&apos;est le contrat le plus utilisé par les banques islamiques (plus de 70% des transactions).
      </p>
      <p>
        <strong>Dans le fiqh classique :</strong> C&apos;est une vente de confiance (amāna) où le vendeur déclare son coût d&apos;achat initial et la marge de profit qu&apos;il ajoute. (<em>« Je l&apos;ai acheté 10, je te le revends 12 »</em>).
      </p>
      <p>
        <strong>L&apos;application moderne (Murābaḥa bancaire) :</strong><br/>
        Vous voulez acheter une voiture à 20 000€, mais n&apos;avez pas les fonds. 
        Au lieu de vous prêter 20 000€ avec 5% d&apos;intérêt, la banque islamique <strong>achète la voiture</strong> au concessionnaire (elle en devient propriétaire et en assume le risque). Ensuite, elle <strong>vous revend cette même voiture</strong> pour 22 000€, payables en mensualités sur 5 ans.
      </p>

      <div className="info-box">
        <div className="info-box-title">💡 Pourquoi ce n'est pas du Ribā ?</div>
        <div className="info-box-content">
          Comme vu dans l&apos;Article 3, vendre un bien plus cher avec un paiement différé est une vente licite (Bayʿ), pas un prêt (Qarḍ). La banque a acheté la voiture, l&apos;a possédée (respect de la règle <em>« ne vends pas ce que tu ne possèdes pas »</em>), a pris le risque de perte, puis vous l&apos;a vendue. Le profit de 2000€ est la marge commerciale, justifiée par l&apos;achat et la prise de risque. Le prix est fixe et n&apos;augmentera pas en cas de retard de paiement.
        </div>
      </div>

      <h2>2. L&apos;Ijāra (Le Crédit-Bail ou Leasing islamique)</h2>
      <p>
        <strong>Dans le fiqh classique :</strong> C&apos;est un simple contrat de location (d&apos;un bien ou des services d&apos;une personne).
      </p>
      <p>
        <strong>L&apos;application moderne (Ijāra wa Iqtina / Leasing avec promesse d&apos;achat) :</strong><br/>
        Très utilisé pour le financement immobilier ou d&apos;équipements d&apos;entreprise. Vous voulez une maison. La banque l&apos;achète et vous la <strong>loue</strong>. Vous payez des loyers mensuels. Une partie du paiement couvre la location, l&apos;autre partie sert à racheter progressivement des parts de la maison. À la fin du contrat, la banque vous cède la propriété par une vente symbolique ou un don.
      </p>
      <p>
        La différence avec le leasing conventionnel est que la banque islamique (en tant que propriétaire) assume les risques majeurs de propriété : si la maison brûle (hors de votre faute) ou si un vice de construction la rend inhabitable, les réparations structurelles incombent à la banque, et le loyer s&apos;arrête.
      </p>

      <h2>3. La Mushāraka (Le Partenariat / Joint-Venture)</h2>
      <p>
        <strong>Dans le fiqh classique :</strong> Un contrat où deux ou plusieurs parties mettent en commun leur capital pour un projet, partageant les pertes et les profits.
      </p>
      <p>
        <strong>L&apos;application moderne :</strong><br/>
        Considérée comme la forme la plus « pure » et idéale de finance islamique, bien qu&apos;elle soit risquée pour les banques. La banque et un entrepreneur investissent ensemble dans une usine. 
        Les profits futurs seront partagés selon un ratio convenu à l&apos;avance (ex: 60/40). 
        <strong>Mais en cas de perte</strong>, la perte financière est strictement partagée au pro rata du capital investi. La banque partage réellement le risque de l&apos;entrepreneur.
      </p>
      <p>
        Il existe aussi la <em>Mushāraka Mutanāqiṣa</em> (partenariat dégressif), très populaire pour l&apos;immobilier : vous et la banque achetez une maison ensemble. Vous rachetez progressivement les parts de la banque mois après mois, jusqu&apos;à en devenir l&apos;unique propriétaire.
      </p>

      <h2>4. La Muḍāraba (L&apos;Investissement en Capital-Risque)</h2>
      <p>
        <strong>Dans le fiqh classique :</strong> C&apos;était le contrat favori des caravanes mecquoises. Un investisseur (Rabb al-Māl) confie du capital à un gestionnaire expert (Muḍārib). L&apos;un fournit l&apos;argent, l&apos;autre le travail.
      </p>
      <p>
        <strong>L&apos;application moderne :</strong><br/>
        C&apos;est le modèle des <strong>comptes d&apos;épargne islamiques</strong>. Vous (l&apos;investisseur) déposez de l&apos;argent dans une banque islamique (le gestionnaire). La banque investit cet argent dans des projets Halal (en utilisant la Murābaḥa, l&apos;Ijāra, etc.). 
      </p>
      <ul>
        <li>Si la banque fait du profit, elle le partage avec vous selon un ratio pré-établi. (Contrairement à un compte conventionnel, le rendement n&apos;est pas garanti à l&apos;avance : il dépend des profits réels générés).</li>
        <li>S&apos;il y a une perte, l&apos;investisseur (vous) perd son capital financier, et le gestionnaire (la banque) perd son temps et son travail.</li>
      </ul>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ Les critiques de la finance moderne</div>
        <div className="warning-box-content">
          La finance islamique moderne (environ 3000 milliards de dollars aujourd&apos;hui) n&apos;est pas parfaite. Beaucoup de savants et d&apos;économistes lui reprochent de s&apos;être trop concentrée sur la Murābaḥa (qui, bien que licite, mime le résultat d&apos;un prêt classique) au détriment des contrats de partage de risque (Mushāraka/Muḍāraba) qui incarnent l&apos;idéal de justice économique de l&apos;islam.
        </div>
      </div>

      <h2>Conclusion de notre cursus sur la Finance Islamique</h2>
      <p>
        À travers ces 5 articles, nous avons tracé le cheminement complet de l&apos;économie selon l&apos;islam :
      </p>
      <ol>
        <li>Nous avons compris la <strong>philosophie</strong> : la noblesse du commerce équitable face à la stérilité exploitatrice de l&apos;usure (Article 1).</li>
        <li>Nous avons défini les <strong>règles</strong> : des contrats (bayʿ) stricts, basés sur la possession réelle et interdisant le hasard et l&apos;incertitude trompeuse (gharar) (Article 2).</li>
        <li>Nous avons analysé le <strong>virus économique</strong> (le Ribā) dans ses dimensions d&apos;échange et de délai, pour en préserver les transactions (Article 3).</li>
        <li>Nous avons vu le <strong>mécanisme de solidarité</strong> : la Zakāt, qui force la circulation de la richesse vers les plus faibles (Article 4).</li>
        <li>Enfin, nous avons découvert l&apos;<strong>application contemporaine</strong> : comment les banques tentent de faire revivre les vieux contrats (Murābaḥa, Ijāra, Mushāraka) face au capitalisme moderne (Article 5).</li>
      </ol>
      <p>
        Le <em>fiqh al-muʿāmalāt</em> n&apos;est pas qu&apos;une série de contraintes légales. C&apos;est un système complet conçu pour assurer que l&apos;argent reste le serviteur de l&apos;homme et de l&apos;économie réelle, et non un maître capricieux et destructeur.
      </p>
    </ArticleLayout>
  );
}
