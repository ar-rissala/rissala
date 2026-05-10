import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Le Ribā en Détail : Ribā al-Fadl et Ribā al-Nasi'a | Finance Islamique",
  description:
    "Comprendre techniquement l'usure en islam. Explication du hadith des 6 catégories (or, argent, blé, orge, dattes, sel), le ribā de délai et d'échange.",
};

export default function RibaExplicationPage() {
  return (
    <ArticleLayout
      title="Le Ribā en Détail :"
      titleAccent="Ribā al-Faḍl et Ribā al-Nasīʾa"
      subtitle="Le Ribā ne se limite pas aux intérêts bancaires. La jurisprudence islamique définit techniquement deux types d'usure pour empêcher toute forme d'exploitation dans l'échange de devises et de matières premières."
      articleNumber={3}
      totalArticles={6}
      prevArticle={{ href: "/finance-islamique/regles-vente-contrats", title: "Les règles de la vente" }}
      nextArticle={{ href: "/finance-islamique/zakat-mecanisme-economique", title: "La zakāt : mécanisme économique" }}
    >
      <p>
        Dans l&apos;article 1, nous avons vu que le <strong>Ribā</strong> (usure/intérêt) est spirituellement interdit car il déconnecte la création de richesse de l&apos;économie réelle et transfère tout le risque sur l&apos;emprunteur. 
      </p>
      <p>
        Mais techniquement, comment les savants (fuqahāʾ) identifient-ils le ribā dans une transaction ? Pour cela, il faut se plonger dans un hadith fondamental de la jurisprudence islamique qui divise le ribā en deux grandes catégories.
      </p>

      <h2>Le Hadith des 6 catégories (Les biens « ribawī »)</h2>
      <p>
        Le fondement technique de l&apos;interdiction du ribā dans les échanges commerciaux repose sur ce hadith célèbre :
      </p>

      <div className="info-box">
        <div className="info-box-title">💡 Le texte de référence</div>
        <div className="info-box-content">
          Le Prophète Muhammad (sws) a dit :<br/>
          <em>« L&apos;or pour l&apos;or, l&apos;argent pour l&apos;argent, le blé pour le blé, l&apos;orge pour l&apos;orge, la datte pour la datte, le sel pour le sel : quantité égale pour quantité égale, main à main. Celui qui donne un surplus ou prend un surplus tombe dans le ribā. [...] Mais si les genres diffèrent, alors vendez comme vous le voulez, à condition que ce soit main à main. »</em><br/><br/>
          (Rapporté par ʿUbāda ibn al-Ṣāmit — Ṣaḥīḥ Muslim).
        </div>
      </div>

      <p>
        Ce hadith liste 6 biens spécifiques. Les savants classiques (comme Ibn Taymiyya et Ibn al-Qayyim) ont extrait la <em>cause juridique</em> (ʿilla) derrière cette liste pour l&apos;appliquer à d&apos;autres biens :
      </p>
      <ul>
        <li><strong>L&apos;or et l&apos;argent</strong> représentent la <strong>monnaie</strong> et les moyens d&apos;échange. Aujourd&apos;hui, toutes les monnaies fiduciaires (Euro, Dollar, Dinar) entrent dans cette catégorie par analogie (qiyās).</li>
        <li><strong>Le blé, l&apos;orge, les dattes et le sel</strong> représentent les <strong>denrées alimentaires de base</strong> (qui peuvent être stockées).</li>
      </ul>

      <p>À partir de ce texte, les savants distinguent deux types de ribā.</p>

      <h2>1. Ribā al-Faḍl : Le Ribā de Surplus (ou d&apos;échange)</h2>
      <p>
        Le <strong>Ribā al-Faḍl</strong> survient lorsqu&apos;on échange <strong>le même type de bien ribawī</strong> (ex: or contre or, ou blé contre blé) avec une <strong>différence de quantité</strong>.
      </p>
      <p>
        Le hadith est formel : l&apos;échange d&apos;or contre de l&apos;or doit être <em>« quantité égale pour quantité égale »</em>. Si vous échangez 10 grammes d&apos;or 18 carats contre 8 grammes d&apos;or 24 carats, vous tombez dans le Ribā al-Faḍl, même si la valeur marchande est identique. La qualité n&apos;est pas prise en compte lors d&apos;un échange direct du même genre.
      </p>
      <p>
        <strong>Pourquoi cette règle ?</strong> Les savants expliquent que le Ribā al-Faḍl ferme la porte (sadd al-dharāʾiʿ) au véritable ribā usuraire. Empêcher l&apos;échange d&apos;une monnaie contre elle-même avec une différence empêche la création de profit sans cause économique réelle. Si vous voulez obtenir le blé de meilleure qualité, la règle islamique est de vendre d&apos;abord votre blé contre de la monnaie, puis d&apos;acheter l&apos;autre blé avec cette monnaie.
      </p>

      <h2>2. Ribā al-Nasīʾa : Le Ribā de Délai</h2>
      <p>
        Le <strong>Ribā al-Nasīʾa</strong> (du verbe nasāʾa signifiant retarder) est la forme la plus courante et la plus grave d&apos;usure. C&apos;est l&apos;intérêt perçu en échange d&apos;un délai accordé.
      </p>
      <p>
        Il se manifeste dans deux cas :
      </p>

      <h3>A. L&apos;échange monnaie contre monnaie avec délai</h3>
      <p>
        Le hadith stipule : <em>« Si les genres diffèrent, vendez comme vous le voulez, <strong>à condition que ce soit main à main (yadan bi yadin)</strong>. »</em>
      </p>
      <p>
        Si vous échangez de l&apos;Or contre de l&apos;Argent (ou aujourd&apos;hui des Euros contre des Dollars), les quantités peuvent différer (selon le taux de change). Mais l&apos;échange doit être <strong>immédiat</strong>. Acheter des devises et reporter le paiement à plus tard tombe dans le Ribā al-Nasīʾa.
      </p>

      <h3>B. Le prêt à intérêt (Le Ribā préislamique)</h3>
      <p>
        C&apos;était la pratique de la Jāhiliyya (l&apos;Arabie préislamique). Un homme prêtait 100 dirhams pour un an. À l&apos;échéance, si le débiteur ne pouvait pas payer, le créancier disait : <em>« Tu paies maintenant, ou j&apos;augmente la dette en échange d&apos;un nouveau délai ? »</em>.
      </p>
      <p>
        Ce principe englobe <strong>tout prêt conditionné par un surplus</strong>. La règle d&apos;or en fiqh al-muʿāmalāt est :<br/>
        <strong>« Tout prêt qui attire un profit (financier ou en nature) est du ribā. »</strong> (Kullu qarḍ jarra manfaʿa fahuwa ribā).
      </p>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ Application Moderne</div>
        <div className="warning-box-content">
          Toute dette qui augmente avec le temps en raison d&apos;un retard de paiement (comme les agios bancaires, les intérêts de carte de crédit, ou les pénalités financières de retard dans un contrat commercial) est formellement qualifiée de Ribā al-Nasīʾa par les académies de jurisprudence islamique modernes.
        </div>
      </div>

      <h2>Vente à tempérament vs Prêt à intérêt</h2>
      <p>
        C&apos;est la confusion la plus fréquente. 
      </p>
      <p>
        <em>« Si j&apos;achète un téléphone cash, il coûte 1000€. Si je l&apos;achète en plusieurs fois au commerçant, il me le vend 1100€. N&apos;est-ce pas du ribā ? »</em>
      </p>
      <p>
        <strong>Non.</strong> Les savants sunnites (les quatre écoles) sont majoritairement d&apos;accord sur le fait qu&apos;un vendeur a le droit de fixer un prix plus élevé pour un paiement différé (<em>Bayʿ bi al-Taqsiṭ</em>), à condition que :
      </p>
      <ol>
        <li>La transaction soit une <strong>vraie vente d&apos;un bien réel</strong> (et non un simple échange d&apos;argent).</li>
        <li>Le prix soit <strong>définitivement fixé</strong> lors de l&apos;accord (s&apos;il est de 1100€, il ne pourra jamais augmenter à 1200€ même en cas de retard de paiement).</li>
      </ol>
      <p>
        Dans un prêt bancaire classique, la banque ne vous vend pas une maison ou une voiture. Elle vous <strong>prête de l&apos;argent</strong> pour l&apos;acheter, et vous exigez plus d&apos;argent en retour. C&apos;est l&apos;argent qui fait de l&apos;argent, sans lien de propriété sur le bien (Ribā).
      </p>

      <h2>Résumé</h2>
      <ol>
        <li>Le hadith des 6 catégories structure l&apos;interdiction du ribā autour des <strong>moyens d'échange (monnaie)</strong> et des <strong>denrées de base</strong>.</li>
        <li><strong>Ribā al-Faḍl :</strong> L&apos;interdiction d&apos;échanger la même monnaie (ou denrée) avec une différence de quantité, même immédiatement.</li>
        <li><strong>Ribā al-Nasīʾa :</strong> L&apos;interdiction d&apos;échanger des devises avec un délai, et l&apos;interdiction absolue de tout prêt avec intérêt.</li>
        <li>Vendre un objet plus cher avec un paiement étalé est <strong>licite</strong>, car c&apos;est du commerce. Prêter de l&apos;argent avec intérêt est <strong>illicite</strong>, car c&apos;est du ribā.</li>
      </ol>
      <p>
        Si l&apos;islam interdit de faire fructifier l&apos;argent de manière stérile par l&apos;usure, comment l&apos;économie aide-t-elle les plus démunis ? C&apos;est là qu&apos;intervient le troisième pilier de l&apos;islam : <strong>la Zakāt</strong>, sujet de notre prochain article.
      </p>
    </ArticleLayout>
  );
}
