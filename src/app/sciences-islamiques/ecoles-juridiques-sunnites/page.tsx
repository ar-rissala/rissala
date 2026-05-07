import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Les 4 Écoles Juridiques Sunnites (Madhahib) : Comment le Fiqh s'est Structuré | Rissala",
  description:
    "Comprenez les 4 madhahib sunnites (Hanafī, Mālikī, Shāfi'ī, Hanbalī). Pourquoi existent-ils ? Quelles sont leurs différences méthodologiques ? Guide explicatif.",
};

export default function EcolesJuridiquesPage() {
  return (
    <ArticleLayout
      title="Les Écoles Juridiques Sunnites :"
      titleAccent="Comment le Fiqh s'est Structuré"
      subtitle="Le sunnisme possède un corpus textuel unique (Coran et Sunna) mais accepte une diversité d'interprétations. Comprendre les 4 madhāhib, c'est comprendre la flexibilité de la loi islamique."
      articleNumber={5}
      totalArticles={5}
      prevArticle={{ href: "/sciences-islamiques/science-hadith-bukhari", title: "La science du hadith" }}
    >
      <p>
        Nous avons vu comment le <strong>Coran</strong> a été préservé et comment la <strong>Sunna</strong> a été authentifiée. Mais posséder des textes authentiques ne suffit pas. Il faut les <strong>comprendre</strong>, les <strong>contextualiser</strong> et en <strong>extraire des lois pratiques</strong> pour la vie de tous les jours. C&apos;est le rôle de la jurisprudence islamique : le <strong>fiqh</strong>.
      </p>
      <p>
        L&apos;une des plus grandes incompréhensions chez les débutants (et même chez certains musulmans) est l&apos;existence de plusieurs écoles de droit au sein même du sunnisme. <em>« S&apos;il n&apos;y a qu&apos;un seul Coran et un seul Prophète, pourquoi y a-t-il quatre écoles juridiques ? N&apos;est-ce pas une division ? »</em>
      </p>
      <p>
        Cet article répond à cette question fondamentale.
      </p>

      <h2>L&apos;apparition du besoin d&apos;interprétation</h2>
      <p>
        Du vivant du Prophète Muhammad, si une question se posait, les compagnons lui demandaient directement. Il n&apos;y avait pas besoin d&apos;écoles juridiques. La révélation tranchait les débats.
      </p>
      <p>
        Après sa mort, l&apos;Empire islamique s&apos;est étendu très rapidement (Syrie, Irak, Égypte, Perse). Les musulmans ont été confrontés à des <strong>situations inédites</strong> (nouvelles cultures, nouveaux systèmes économiques, nouvelles coutumes) qui n&apos;étaient pas explicitement décrites dans le Coran ou la Sunna.
      </p>
      <p>
        De plus, un même texte (un verset ou un hadith) peut être <strong>compris de plusieurs manières</strong>. L&apos;arabe est une langue riche où un mot peut avoir de multiples sens. Devaient-ils le prendre au sens littéral ou au sens figuré ? Quelle règle prioriser si deux hadiths semblaient se contredire ?
      </p>
      <p>
        C&apos;est ainsi que le <strong>fiqh</strong> (la compréhension profonde, la jurisprudence) est né. Les grands savants (mujtahidūn) ont développé des <strong>méthodologies différentes</strong> pour interpréter les mêmes textes. Ces méthodologies ont donné naissance aux écoles juridiques (<strong>madhāhib</strong>, sing. madhhab).
      </p>

      <h2>Les 4 Madhāhib du sunnisme</h2>
      <p>
        Bien qu&apos;il ait existé des dizaines d&apos;écoles dans l&apos;histoire (comme celles d&apos;al-Awzāʿī ou de Sufyān al-Thawrī), <strong>quatre écoles principales</strong> ont survécu, ont été codifiées et sont reconnues comme mutuellement valides par l&apos;ijmāʿ (consensus) sunnite.
      </p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>École (Madhhab)</th>
              <th>Fondateur éponyme</th>
              <th>Méthodologie clé</th>
              <th>Régions d&apos;influence majeures</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-medium text-foreground">Ḥanafīte</td>
              <td>Abū Ḥanīfa (m. 767)</td>
              <td>Forte utilisation de la raison, de l&apos;analogie (qiyās) et prise en compte de la coutume locale (ʿurf).</td>
              <td>Turquie, Balkans, Asie Centrale, Inde, Pakistan, Bangladesh. (~40% des sunnites)</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">Mālikīte</td>
              <td>Mālik ibn Anas (m. 795)</td>
              <td>Attachement fort à la « pratique des habitants de Médine » ('amal ahl al-Madina), considérée comme une transmission vivante.</td>
              <td>Afrique du Nord (Maghreb), Afrique de l&apos;Ouest, Soudan. (~25% des sunnites)</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">Shāfiʿīte</td>
              <td>Muḥammad al-Shāfiʿī (m. 820)</td>
              <td>Équilibre : systématisation des principes (uṣūl). Refuse la pratique de Médine comme preuve absolue, priorise le hadith authentique.</td>
              <td>Égypte, Yémen, Somalie, Indonésie, Malaisie, Asie du Sud-Est. (~25% des sunnites)</td>
            </tr>
            <tr>
              <td className="font-medium text-foreground">Ḥanbalīte</td>
              <td>Aḥmad ibn Ḥanbal (m. 855)</td>
              <td>Très textuelle. Priorité absolue au Coran, au hadith et aux avis des compagnons. Rejette fortement le raisonnement spéculatif.</td>
              <td>Péninsule arabique (Arabie Saoudite, Qatar, EAU). (~10% des sunnites)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <div className="info-box-title">💡 Un madhhab n&apos;est pas une secte</div>
        <div className="info-box-content">
          Ce sont des écoles de <strong>droit</strong>, pas des écoles de <strong>dogme</strong>. Un Ḥanafite et un Mālikite croient exactement au même Dieu, au même Coran, au même Prophète. Leurs différences portent sur des détails pratiques : comment positionner ses mains dans la prière, comment valider un contrat commercial, ou ce qui annule les ablutions.
        </div>
      </div>

      <h2>Divergence (Ikhtilāf) ≠ Contradiction</h2>
      <p>
        Pour comprendre comment les écoles peuvent diverger en utilisant les mêmes sources, prenons un exemple célèbre tiré de l&apos;époque du Prophète lui-même :
      </p>
      <p>
        Après la bataille du Fossé, le Prophète a dit à ses compagnons : <em>« Que personne ne prie la prière de l&apos;après-midi (ʿaṣr) sauf chez la tribu des Banū Qurayẓa. »</em>
      </p>
      <p>
        En chemin, l&apos;heure de la prière approchait de sa fin. Les compagnons se sont divisés en deux groupes :
      </p>
      <ul>
        <li><strong>Le groupe littéraliste :</strong> <em>« Le Prophète a dit de prier LÀ-BAS. Nous ne prierons que là-bas, même si la nuit tombe. »</em> (Ils ont obéi à la lettre).</li>
        <li><strong>Le groupe rationnel :</strong> <em>« Le Prophète voulait dire qu&apos;il fallait se dépêcher, pas que nous devions rater l&apos;heure de la prière ! »</em> (Ils ont prié en chemin, obéissant à l&apos;esprit de l&apos;ordre).</li>
      </ul>
      <p>
        Quand le Prophète a été informé de cette divergence, <strong>il n&apos;a blâmé aucun des deux groupes</strong>. Il a validé les deux approches. Cet événement est la racine de l&apos;existence des madhāhib : la reconnaissance que le texte peut admettre plusieurs lectures légitimes.
      </p>

      <h2>Exemple pratique de divergence méthodologique</h2>
      <p>
        Prenons un exemple concret en droit : <strong>toucher une femme annule-t-il les ablutions (wuḍūʾ) de l&apos;homme ?</strong>
      </p>
      <p>
        Le Coran (5:6) dit concernant les causes d&apos;annulation : <em>« ...ou si vous avez touché des femmes... »</em>. Comment comprendre le mot « toucher » (lāmastum) ?
      </p>
      <ul>
        <li><strong>L&apos;école Shāfiʿīte :</strong> Le sens linguistique de base est le toucher physique de la peau. Donc, tout contact peau à peau annule les ablutions. (Approche littérale du mot).</li>
        <li><strong>L&apos;école Ḥanafīte :</strong> En arabe, « toucher une femme » est souvent une métaphore pour désigner les rapports intimes (comme c&apos;est le cas dans d&apos;autres versets). De plus, un hadith rapporte que le Prophète embrassait son épouse avant de prier. Donc, le simple contact physique n&apos;annule pas. (Approche par le sens global et le hadith).</li>
        <li><strong>L&apos;école Mālikīte :</strong> Ils choisissent une voie médiane. Si le toucher est accompagné de désir, il annule. Si c&apos;est un toucher banal (marché, famille), il n&apos;annule pas. (Approche par l&apos;intention).</li>
      </ul>
      <p>
        Qui a raison ? Pour les savants sunnites, <strong>toutes ces opinions sont respectables et valides</strong>, car elles s&apos;appuient toutes sur des arguments tirés des sources.
      </p>

      <div className="warning-box">
        <div className="warning-box-title">⚠️ Le danger du « sans madhhab »</div>
        <div className="warning-box-content">
          Aujourd&apos;hui, certains courants encouragent les débutants à ignorer les écoles et à « revenir directement au Coran et au hadith ». Les savants classiques mettent en garde contre cela : un débutant n&apos;a pas les outils (maîtrise de l&apos;arabe classique, abrogation, authentification) pour déduire la loi lui-même. Suivre un madhhab, c&apos;est s&apos;appuyer sur le travail de milliers de savants validé par 1200 ans de pratique.
        </div>
      </div>

      <h2>Conclusion du cursus</h2>
      <p>
        Avec cet article, vous bouclez la boucle de la compréhension de l&apos;islam sunnite. Voici l&apos;architecture globale que vous avez acquise :
      </p>
      <ol>
        <li><strong>La fondation :</strong> L&apos;islam naît avec la vie de Muhammad (ﷺ) dans l&apos;Arabie du VIIe siècle.</li>
        <li><strong>Les textes sources :</strong> Le message prend la forme du Coran (Parole littérale d&apos;Allah) et de la Sunna (Paroles et actes du Prophète).</li>
        <li><strong>La préservation :</strong> Ces textes sont protégés par des méthodes extrêmement rigoureuses (mémorisation, standardisation d&apos;ʿUthmān, science critique du hadith par des savants comme al-Bukhārī).</li>
        <li><strong>L&apos;application pratique :</strong> Ces textes parfaits sont interprétés par des humains faillibles mais experts, donnant naissance au Fiqh et à ses 4 grandes écoles (Ḥanafī, Mālikī, Shāfiʿī, Ḥanbalī).</li>
      </ol>
      <p>
        Cette structure — <strong>Ahl al-Sunna wa al-Jamāʿa</strong> — est ce qui a permis à l&apos;islam sunnite de traverser les siècles avec une remarquable stabilité théologique, tout en gardant assez de flexibilité juridique pour s&apos;adapter de l&apos;Indonésie au Maroc, du VIIe siècle à nos jours.
      </p>
    </ArticleLayout>
  );
}
