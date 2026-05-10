import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Zakāt et Ère Moderne : Crypto, Actions et Purification de la Richesse | Rissala",
  description:
    "Guide expert sur l'application de la Zakāt aux actifs numériques et boursiers. Hadiths, menaces du délaissement et méthodologie des écoles juridiques.",
};

export default function ZakatModernePage() {
  return (
    <ArticleLayout
      title="Comment la Zakāt"
      titleAccent="purifie votre richesse"
      subtitle="Découvrez les règles d'application de la Zakāt sur les actifs numériques, cryptos et portefeuilles boursiers internationaux avec une approche académique et rigoureuse."
      articleNumber={5}
      totalArticles={6}
      prevArticle={{ href: "/finance-islamique/zakat-mecanisme-economique", title: "La Zakāt : Mécanisme Économique" }}
      nextArticle={{ href: "/finance-islamique/finance-islamique-moderne", title: "La Finance Islamique Moderne" }}
    >
      <p>
        La Zakāt est bien plus qu&apos;un simple impôt social. C&apos;est le <strong>troisième pilier</strong> de l&apos;Islam, une obligation dont la portée spirituelle conditionne la validité même de notre pratique. Cependant, le passage d&apos;une économie agraire et aurifère à une économie de jetons numériques et de titres boursiers pose des défis complexes. Comment appliquer une règle millénaire à des actifs qui n&apos;existaient pas il y a vingt ans ?
      </p>

      <h2>La menace du délaissement : Un avertissement prophétique</h2>
      <p>
        Avant d&apos;aborder la technique, il est impératif de rappeler la gravité de ce pilier. La Zakāt n&apos;est pas optionnelle. Son délaissement est l&apos;objet de menaces sévères dans la tradition islamique.
      </p>
      
      <div className="warning-box">
        <div className="warning-box-title">⚠️ Avertissement sur la thésaurisation</div>
        <div className="warning-box-content">
          <strong>Isnād :</strong> Rapporté par l&apos;Imam al-Bukhārī (hadith n°1403) d&apos;après <strong>Abū Hurayra</strong>, le Prophète (ﷺ) a dit :<br/><br/>
          <em>« Celui à qui Allah a donné une richesse et qui ne s&apos;acquitte pas de sa Zakāt, sa richesse lui apparaîtra le Jour de la Résurrection sous la forme d&apos;un serpent chauve avec deux taches noires (venimeuses). Il l&apos;entourera et le saisira par ses mâchoires en disant : "Je suis ta richesse, je suis ton trésor". »</em>
        </div>
      </div>

      <p>
        Cette imagerie puissante vise à briser l&apos;attachement excessif à la matière. La richesse non purifiée devient une charge et un châtiment, tandis que la richesse dont on a payé le droit devient une source de bénédiction (Baraka).
      </p>

      <h2>L&apos;Argent Liquide et l&apos;Épargne (Al-Naqdayn)</h2>
      <p>
        C&apos;est la base de la Zakāt moderne. Tout montant stocké sur vos comptes bancaires, livrets d&apos;épargne ou sous forme de cash est soumis à la Zakāt.
      </p>
      <ul>
        <li><strong>Seuil (Niṣāb) :</strong> Équivalent à la valeur de 85g d&apos;or pur.</li>
        <li><strong>Période (Ḥawl) :</strong> Un an lunaire complet doit s&apos;écouler sur le seuil.</li>
        <li><strong>Taux :</strong> 2,5 %.</li>
      </ul>
      <p>
        Les quatre madhāhib (écoles) s&apos;accordent sur ce point. Si vous avez 10 000 € d&apos;épargne stable depuis un an, vous devez 250 € aux catégories bénéficiaires.
      </p>

      <h2>La Zakāt sur les Actions et Portefeuilles Boursiers</h2>
      <p>
        Les actions sont des parts de propriété dans des entreprises. La science appliquée distingue deux cas de figure pour le calcul :
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Profil d&apos;Investisseur</th>
              <th>Méthodologie de Calcul</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium text-foreground">Investisseur Long Terme (Dividend Growth)</td>
              <td>Le Conseil de la Fiqh recommande de calculer la Zakāt sur les <strong>actifs nets zakatables</strong> de l&apos;entreprise (cash, stocks, créances). Souvent estimé forfaitairement à ~10% de la valeur marchande pour simplifier, ou 2,5% sur la part du capital circulant.</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">Trader / Spéculateur (Short Term)</td>
              <td>L&apos;action est traitée comme une <strong>marchandise commerciale</strong> (ʿUrūḍ al-Tijāra). On paie 2,5 % sur la <strong>valeur marchande totale</strong> du portefeuille au jour de la Zakāt.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Cryptomonnaies et Actifs Numériques</h2>
      <p>
        La majorité des comités de Sharia contemporains (comme l&apos;AAOIFI ou le Conseil International de Fiqh) considèrent les cryptomonnaies (Bitcoin, Ethereum, etc.) comme des <strong>Māl</strong> (des biens ayant une valeur).
      </p>
      <p>
        Puisqu&apos;elles sont traitées comme de la monnaie ou des actifs spéculatifs, la règle est la même que pour l&apos;argent liquide : <strong>2,5 % de la valeur marchande</strong> au moment de votre échéance annuelle de Zakāt.
      </p>
      <div className="info-box">
        <div className="info-box-title">💡 Cas particulier : Staking et Rewards</div>
        <div className="info-box-content">
          Si vous faites du staking, la Zakāt s&apos;applique sur le capital principal ET sur les récompenses accumulées à la fin de l&apos;année, à condition que le projet soit lui-même conforme (Halal).
        </div>
      </div>

      <h2>Les Stocks Alimentaires et Marchandises (ʿUrūḍ al-Tijāra)</h2>
      <p>
        Pour un commerçant moderne (e-commerce ou boutique physique), la Zakāt ne se calcule pas sur le bénéfice net, mais sur la <strong>valeur de l&apos;inventaire</strong>.
      </p>
      <ul>
        <li>On évalue le stock au <strong>prix de vente actuel</strong> (prix du marché).</li>
        <li>On y ajoute le cash en caisse et les créances clients (argent que l&apos;on vous doit).</li>
        <li>On soustrait les dettes à court terme envers les fournisseurs.</li>
        <li>On applique 2,5 % sur le résultat.</li>
      </ul>

      <h2>Synthèse des Écoles Juridiques (Madhāhib)</h2>
      <p>
        Bien que le taux de 2,5 % soit universel, des nuances existent dans l&apos;application :
      </p>
      <ul>
        <li><strong>École Hanafite :</strong> Très stricte sur la notion de richesse productive. Elle permet souvent de payer la Zakāt en valeur (argent) plutôt qu&apos;en nature, ce qui facilite la gestion des stocks modernes.</li>
        <li><strong>École Malékite :</strong> Met l&apos;accent sur la "proximité". La Zakāt doit prioritairement être distribuée là où elle a été collectée, renforçant le tissu social local.</li>
        <li><strong>Écoles Shafi&apos;ite et Hanbalite :</strong> Exigent une rigueur absolue sur l&apos;écoulement du Ḥawl (l&apos;année) pour chaque type de bien, bien que la pratique moderne autorise souvent une date anniversaire unique pour simplifier.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        S&apos;acquitter de la Zakāt dans un monde financier complexe demande de la vigilance et de l&apos;étude. Ce n&apos;est pas un fardeau, mais un privilège : celui de voir sa richesse passer d&apos;un simple chiffre sur un écran à un moteur de justice sociale et de purification intérieure.
      </p>
      <p>
        L&apos;article suivant conclut notre cursus sur la <strong>Finance Islamique Moderne</strong>, en explorant comment ces principes sont intégrés dans les banques et les fonds d&apos;investissement contemporains.
      </p>
    </ArticleLayout>
  );
}
