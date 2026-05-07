import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "La Zakāt : Pilier Spirituel et Mécanisme Économique en Islam | Rissala",
  description:
    "Comprendre le rôle de la zakāt dans l'économie islamique. Qui paie, sur quoi, et quelles sont les 8 catégories de bénéficiaires selon le Coran (9:60).",
};

export default function ZakatMecanismePage() {
  return (
    <ArticleLayout
      title="La Zakāt :"
      titleAccent="Pilier Spirituel et Mécanisme Économique"
      subtitle="La Zakāt n'est pas une simple charité (sadaqa). C'est un prélèvement obligatoire, un droit des pauvres sur la richesse des riches, conçu pour empêcher la concentration extrême du capital."
      articleNumber={4}
      totalArticles={5}
      prevArticle={{ href: "/finance-islamique/riba-usure-explication", title: "Le ribā en détail" }}
      nextArticle={{ href: "/finance-islamique/finance-islamique-moderne", title: "La finance islamique moderne" }}
    >
      <p>
        Dans la vision économique de l&apos;islam, la richesse n&apos;est pas mauvaise en soi. Au contraire, elle est considérée comme un bienfait divin. Mais elle s&apos;accompagne d&apos;une condition stricte : <strong>elle doit circuler</strong>.
      </p>
      <p>
        Si l&apos;interdiction du Ribā (vu dans l&apos;article 3) empêche l&apos;argent de s&apos;accumuler stérilement par la dette, la <strong>Zakāt</strong> empêche l&apos;argent de stagner dans les coffres-forts (la thésaurisation). Ces deux mécanismes forment le cœur du système de redistribution islamique.
      </p>

      <h2>Zakāt vs Sadaqa : La distinction fondamentale</h2>
      <p>
        Il y a souvent une confusion entre deux termes :
      </p>
      <ul>
        <li><strong>Sadaqa (Charité) :</strong> C&apos;est un acte volontaire, recommandé, dont le montant et la fréquence sont libres.</li>
        <li><strong>Zakāt :</strong> C&apos;est le 3ème pilier de l&apos;islam. C&apos;est une obligation légale (farḍ) stricte. Elle a un seuil précis (niṣāb), un taux précis (souvent 2,5%), et des bénéficiaires limités par le Coran. Ne pas la payer est un péché majeur.</li>
      </ul>
      <p>
        Linguistiquement, le mot Zakāt (زكاة) signifie à la fois <em>« accroissement »</em> et <em>« purification »</em>. Payer la Zakāt, c&apos;est purifier sa richesse de l&apos;avidité et protéger la société de la fracture sociale.
      </p>

      <h2>Qui doit payer la Zakāt et sur quoi ?</h2>
      <p>
        Tout musulman adulte, sain d&apos;esprit, qui possède une richesse supérieure au seuil de pauvreté (le <strong>Niṣāb</strong>) pendant une année lunaire complète (<strong>Ḥawl</strong>), doit s&apos;acquitter de la Zakāt.
      </p>
      <p>
        La jurisprudence classique (expliquée dans des ouvrages comme <em>Al-Majmūʿ</em> de l&apos;Imam al-Nawawī ou <em>Bidāyat al-Mujtahid</em> d&apos;Ibn Rushd) détaille les types de biens soumis à la Zakāt :
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Type de bien</th>
              <th>Explication</th>
              <th>Taux standard</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium text-foreground">L&apos;or, l&apos;argent et la liquidité</td>
              <td>Argent liquide (épargne), comptes bancaires, or et argent (sauf bijoux d&apos;usage courant pour les femmes selon la majorité des écoles).</td>
              <td>2,5 % par an lunaire</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">Marchandises commerciales</td>
              <td>La valeur du stock de marchandises destinées à la vente (inventaire de fin d&apos;année).</td>
              <td>2,5 % de la valeur du stock</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">Récoltes agricoles</td>
              <td>Ce qui est récolté de la terre (céréales, dattes, raisins, etc.). Payé au moment de la récolte.</td>
              <td>5 % (terre irriguée) ou 10 % (irrigation naturelle pluie)</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">Bétail</td>
              <td>Troupeaux de chameaux, vaches, moutons élevés pour la reproduction ou le lait.</td>
              <td>Taux variables selon l&apos;animal</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ Ce qui n&apos;est pas soumis à la Zakāt</div>
        <div className="warning-box-content">
          La Zakāt ne frappe pas les biens d&apos;usage personnel. Votre résidence principale, votre voiture, vos meubles, vos vêtements, et les outils de votre travail ne sont pas soumis à la Zakāt, quelle que soit leur valeur. L&apos;islam taxe la richesse accumulée (l&apos;épargne et les stocks), pas la consommation de base.
        </div>
      </div>

      <h2>À qui est destinée la Zakāt ? Les 8 catégories</h2>
      <p>
        L&apos;État ou l&apos;institution qui collecte la Zakāt ne peut pas l&apos;utiliser pour construire des routes, des mosquées ou financer l&apos;armée. Le Coran a strictement limité les bénéficiaires à <strong>8 catégories</strong> pour garantir que les fonds aillent aux plus vulnérables.
      </p>
      <blockquote>
        « Les aumônes (Zakāt) ne sont destinées qu&apos;aux pauvres (fuqarāʾ), aux indigents (masākīn), à ceux qui y travaillent (les collecteurs), à ceux dont les cœurs sont à gagner à l&apos;islam, à l&apos;affranchissement des jougs (esclaves/captifs), à ceux qui sont lourdement endettés (ghārimīn), dans le sentier d&apos;Allah (fī sabīlillāh), et pour le voyageur en détresse (ibn al-sabīl). C&apos;est une obligation d&apos;Allah ! Et Allah est Omniscient et Sage. » — Coran 9:60
      </blockquote>

      <h2>La dimension macro-économique</h2>
      <p>
        La Zakāt est un outil macro-économique puissant pour relancer l&apos;économie.
      </p>

      <div className="info-box">
        <div className="info-box-title">💡 Hadith fondamental sur la redistribution</div>
        <div className="info-box-content">
          Lorsque le Prophète Muhammad (sws) a envoyé son compagnon Muʿādh ibn Jabal au Yémen comme gouverneur, il lui a donné cette instruction explicite :<br/><br/>
          <em>« Informe-les qu&apos;Allah leur a prescrit une aumône prélevée sur leurs biens (la Zakāt) qui sera <strong>prise à leurs riches pour être redistribuée à leurs pauvres</strong>. »</em><br/>
          (Rapporté par Ibn ʿAbbās — Ṣaḥīḥ al-Bukhārī).
        </div>
      </div>

      <p>
        Contrairement à l&apos;impôt moderne qui sert à financer les services globaux de l&apos;État, la Zakāt est un <strong>transfert direct</strong> de pouvoir d&apos;achat du haut de la pyramide (ceux qui ont de l&apos;épargne dormante) vers le bas (les nécessiteux).
      </p>
      <p>
        Économiquement, les pauvres ont une forte <em>propension marginale à consommer</em>. Quand ils reçoivent la Zakāt, ils l&apos;utilisent immédiatement pour acheter des biens de première nécessité (nourriture, vêtements, logement). Cet argent retourne directement dans l&apos;économie réelle, augmentant la demande globale, ce qui stimule la production des entreprises.
      </p>
      <p>
        De plus, en taxant l&apos;épargne dormante (2,5% par an), la Zakāt <strong>pousse les détenteurs de capitaux à investir</strong> leur argent dans le commerce ou l&apos;industrie. S&apos;ils laissent leur argent dormir, la Zakāt l&apos;épuisera progressivement. C&apos;est la philosophie islamique : l&apos;argent doit être investi (création d&apos;emplois) ou donné, mais jamais stocké stérilement.
      </p>

      <h2>Résumé</h2>
      <ol>
        <li>La Zakāt est une <strong>obligation juridique</strong> frappant l&apos;épargne et les stocks (généralement à 2,5%), et non la charité volontaire (Sadaqa).</li>
        <li>Elle taxe le <strong>capital stagnant</strong> pour l&apos;injecter dans l&apos;économie réelle.</li>
        <li>Le Coran a fixé <strong>8 catégories strictes de bénéficiaires</strong> pour garantir la justice sociale et interdire les détournements étatiques.</li>
        <li>La Zakāt et l&apos;interdiction du Ribā forment le couple fondamental de l&apos;économie islamique : empêcher l&apos;argent de générer de l&apos;argent tout seul, et forcer la circulation de la richesse accumulée.</li>
      </ol>
      <p>
        Avec les principes du commerce équitable, l&apos;interdiction du ribā et le rôle de la zakāt posés, nous arrivons à notre dernier défi : comment appliquer ces règles millénaires dans un monde dominé par le capitalisme financier ? C&apos;est l&apos;objet de notre article final sur la <strong>Finance Islamique Moderne</strong>.
      </p>
    </ArticleLayout>
  );
}
