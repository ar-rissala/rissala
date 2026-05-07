import type { Metadata } from "next";
import { ArticleLayout } from "@/components/layout/ArticleLayout";

export const metadata: Metadata = {
  title: "Méthode Rissala : Apprendre l'Arabe 3x Plus Vite | Plan 30 Jours",
  description:
    "Plan structuré de 30 jours pour apprendre à lire l'arabe : alphabet, formes, voyelles, lecture progressive. Méthode Rissala avec répétition espacée et erreurs à éviter.",
};

const semaines = [
  {
    titre: "Semaine 1 : L'alphabet visuel (Jours 1-7)",
    jours: [
      { jour: "Jours 1-2", contenu: "Lettres ا à ذ (9 lettres) en forme isolée. Familles visuelles 1-3.", action: "Voir chaque lettre, dire son nom, écrire 5 fois à la main." },
      { jour: "Jours 3-4", contenu: "Lettres ر à ظ (9 lettres). Familles visuelles 4-6.", action: "Révision des lettres J1-J2 + nouvelles lettres. Écriture." },
      { jour: "Jours 5-6", contenu: "Lettres ع à ي (10 lettres). Familles visuelles 7+.", action: "Révision J1-J4 + nouvelles lettres. Focus sur les 8 lettres difficiles." },
      { jour: "Jour 7", contenu: "Révision complète des 28 lettres.", action: "Test : couvrir les noms, regarder la lettre, la nommer et donner son son." },
    ],
  },
  {
    titre: "Semaine 2 : Les formes contextuelles (Jours 8-14)",
    jours: [
      { jour: "Jours 8-9", contenu: "Comprendre les 4 formes (isolée, initiale, médiane, finale).", action: "Étudier le tableau des formes. Identifier les formes dans des mots simples." },
      { jour: "Jours 10-11", contenu: "Les 6 lettres non-connectantes (ا د ذ ر ز و).", action: "Exercices de décomposition de mots : identifier quelle forme est utilisée." },
      { jour: "Jours 12-13", contenu: "Lecture de mots simples avec formes connectées.", action: "Lire 20 mots simples en décomposant chaque lettre et sa forme." },
      { jour: "Jour 14", contenu: "Révision semaines 1 + 2.", action: "Relire l'intégralité des tableaux. Test de reconnaissance rapide." },
    ],
  },
  {
    titre: "Semaine 3 : Les voyelles (Jours 15-21)",
    jours: [
      { jour: "Jours 15-16", contenu: "Voyelles courtes : fatha, kasra, damma, sukun.", action: "Lire des syllabes : بَ بِ بُ بْ pour chaque consonne." },
      { jour: "Jours 17-18", contenu: "Voyelles longues : alif (ā), wāw (ū), yā' (ī).", action: "Distinguer kataba/kātaba. Lire des mots avec voyelles longues." },
      { jour: "Jours 19-20", contenu: "Combinaison voyelles courtes + longues dans des mots réels.", action: "Lire 30 mots du Coran avec harakāt. Identifier chaque voyelle." },
      { jour: "Jour 21", contenu: "Révision semaines 1-3.", action: "Lire une page du Coran avec harakāt, lentement mais correctement." },
    ],
  },
  {
    titre: "Semaine 4 : Lecture progressive (Jours 22-30)",
    jours: [
      { jour: "Jours 22-24", contenu: "Lecture de mots courants sans harakāt.", action: "Liste de 50 mots fréquents. Deviner la vocalisation par le contexte." },
      { jour: "Jours 25-27", contenu: "Lecture de phrases simples.", action: "Phrases courtes du Coran et du quotidien. Lecture fluide." },
      { jour: "Jours 28-29", contenu: "Lecture d'un paragraphe complet.", action: "Texte court avec et sans harakāt. Comparer votre lecture." },
      { jour: "Jour 30", contenu: "Évaluation finale.", action: "Lire la Fatiha sans aide. Lire un panneau en arabe. Auto-évaluation." },
    ],
  },
];

const erreurs = [
  { titre: "Apprendre l'alphabet dans l'ordre latin", description: "L'ordre alphabétique arabe n'a rien à voir avec le latin. Apprenez par familles visuelles, pas par correspondance A=Alif, B=Bā'." },
  { titre: "Mélanger alphabet et grammaire", description: "La grammaire arabe est riche et complexe. L'introduire trop tôt surcharge le débutant. Alphabet d'abord, grammaire ensuite — jamais en parallèle au début." },
  { titre: "Négliger les formes contextuelles", description: "Beaucoup de cours enseignent uniquement la forme isolée. Résultat : l'apprenant ne reconnaît pas les lettres dans un texte réel. Les 4 formes sont essentielles." },
  { titre: "Confondre voyelles courtes et longues", description: "C'est l'erreur la plus courante. Les voyelles courtes sont des diacritiques, les longues sont des lettres. Les confondre change le sens des mots." },
  { titre: "Vouloir prononcer parfaitement dès le début", description: "La prononciation du ع, ح, خ, ق s'affine avec le temps et l'écoute. Bloquer dessus au jour 1 est contre-productif. Avancez, la prononciation suivra." },
  { titre: "Ne pas écrire à la main", description: "L'écriture manuscrite active la mémoire musculaire. Taper au clavier ne remplace pas le geste d'écriture. Prenez un cahier et écrivez de droite à gauche." },
  { titre: "Sauter la phase « sans harakāt »", description: "L'objectif final est de lire sans voyelles courtes. Si vous restez dépendant des harakāt, vous ne lirez jamais un journal, un livre ou un site web arabe." },
  { titre: "Étudier de manière irrégulière", description: "20 minutes par jour pendant 30 jours > 5 heures une fois par semaine. La régularité est le facteur #1 de réussite. La répétition espacée ne fonctionne qu'avec la constance." },
];

const pieges = [
  { lettre: "ح vs خ", explication: "Même forme, mais ح est un souffle (h profond) et خ est un frottement (kh). La différence est dans l'intensité du son." },
  { lettre: "ص vs س", explication: "ص est un 's' emphatique (lourd, bouche arrondie), س est un 's' léger (comme en français). Le contexte change le sens." },
  { lettre: "ط vs ت", explication: "ط est un 't' emphatique, ت est un 't' léger. L'emphase modifie toutes les voyelles environnantes." },
  { lettre: "ع vs ء", explication: "ع est une contraction gutturale profonde, ء (hamza) est un coup de glotte léger. Deux sons radicalement différents." },
  { lettre: "ض vs د", explication: "ض est un 'd' emphatique unique à l'arabe (l'arabe est parfois appelé « la langue du Ḍād »). د est un 'd' normal." },
  { lettre: "ذ vs ز", explication: "ذ est un 'th' voisé (comme 'the' en anglais), ز est un 'z' pur. Beaucoup de dialectes fusionnent ces deux sons." },
];

export default function MethodeRissalaPage() {
  return (
    <ArticleLayout
      title="Méthode Rissala : Apprendre l'Arabe"
      titleAccent="3x Plus Vite — Plan 30 Jours"
      subtitle="Synthèse complète de la méthode Rissala. Plan structuré jour par jour, répétition espacée, erreurs à éviter et pièges de prononciation. Votre feuille de route pour lire l'arabe en 30 jours."
      articleNumber={5}
      totalArticles={5}
      prevArticle={{ href: "/apprendre-arabe/voyelles-longues-arabe", title: "Les voyelles longues" }}
    >
      <p>
        Vous avez maintenant toutes les briques : les <strong>28 lettres</strong>, les <strong>4 formes contextuelles</strong>, les <strong>voyelles courtes</strong> (harakāt) et les <strong>voyelles longues</strong>. Il est temps d&apos;assembler tout cela en un plan d&apos;action concret.
      </p>
      <p>
        La <strong>méthode Rissala</strong> repose sur 3 principes fondamentaux : la <strong>progression logique</strong> (aucun saut conceptuel), la <strong>répétition espacée</strong> (réviser au bon moment), et l&apos;<strong>apprentissage visuel</strong> (voir avant de comprendre, comprendre avant d&apos;appliquer).
      </p>

      <h2>Les 6 étapes de la méthode Rissala</h2>
      <p>
        Avant de plonger dans le plan de 30 jours, voici la progression globale que vous allez suivre :
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {[
          { num: "1", titre: "Alphabet visuel", desc: "Reconnaître les 28 lettres en forme isolée" },
          { num: "2", titre: "Formes contextuelles", desc: "Comprendre les 4 formes et les connexions" },
          { num: "3", titre: "Voyelles courtes", desc: "Maîtriser fatha, kasra, damma, sukun" },
          { num: "4", titre: "Voyelles longues", desc: "Distinguer alif (ā), wāw (ū), yā' (ī)" },
          { num: "5", titre: "Lecture de mots", desc: "Lire des mots simples avec harakāt" },
          { num: "6", titre: "Lecture sans harakāt", desc: "Lire un texte réel sans diacritiques" },
        ].map((etape, i) => (
          <div key={i} className="step-card">
            <div className="step-number">{etape.num}</div>
            <div className="font-semibold text-foreground mb-1">{etape.titre}</div>
            <div className="text-sm text-muted-foreground">{etape.desc}</div>
          </div>
        ))}
      </div>
      <p>
        Chaque étape s&apos;appuie sur la précédente. Vous ne passez à l&apos;étape suivante que lorsque la précédente est <strong>solide</strong>. C&apos;est le principe de progression sans saut conceptuel.
      </p>

      <h2>La répétition espacée : le secret de la mémorisation</h2>
      <p>
        La <strong>répétition espacée</strong> est le mécanisme de mémorisation le plus efficace validé par les neurosciences. Le principe est simple :
      </p>
      <ul>
        <li>Vous apprenez une information (ex: la lettre <span className="arabic-inline">ب</span>)</li>
        <li>Vous la révisez <strong>le lendemain</strong></li>
        <li>Puis <strong>3 jours après</strong></li>
        <li>Puis <strong>1 semaine après</strong></li>
        <li>Puis <strong>2 semaines après</strong></li>
      </ul>
      <p>
        À chaque révision, l&apos;information s&apos;ancre plus profondément dans votre mémoire à long terme. Si vous révisez trop tôt, c&apos;est du temps perdu. Trop tard, vous avez oublié. Le plan de 30 jours ci-dessous intègre ce rythme naturellement.
      </p>

      <div className="info-box">
        <div className="info-box-title">💡 Règle Rissala : 20 minutes par jour</div>
        <div className="info-box-content">
          La méthode ne demande que <strong>20 minutes par jour</strong>, mais elles doivent être <strong>quotidiennes</strong>. 20 min × 30 jours = 10 heures. C&apos;est suffisant pour passer de zéro à la lecture de base. La régularité bat l&apos;intensité.
        </div>
      </div>

      <h2>Plan de 30 jours : semaine par semaine</h2>

      {semaines.map((sem, si) => (
        <div key={si}>
          <h3>{sem.titre}</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>Période</th><th>Contenu</th><th>Action concrète</th></tr>
              </thead>
              <tbody>
                {sem.jours.map((j, ji) => (
                  <tr key={ji}>
                    <td className="font-medium text-foreground whitespace-nowrap">{j.jour}</td>
                    <td>{j.contenu}</td>
                    <td className="text-sm">{j.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <h2>Les 8 erreurs classiques des débutants en arabe</h2>
      <p>
        En 10+ ans d&apos;enseignement, ces erreurs reviennent systématiquement. Évitez-les et vous gagnerez des semaines.
      </p>
      <div className="space-y-4 my-8">
        {erreurs.map((err, i) => (
          <div key={i} className="step-card">
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/10 text-red-500 text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
              <div>
                <div className="font-semibold text-foreground mb-1">{err.titre}</div>
                <p className="text-sm text-muted-foreground m-0">{err.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Les pièges de prononciation : les paires confuses</h2>
      <p>
        Ces paires de lettres sont souvent confondues par les débutants francophones. Connaître ces pièges vous évitera des erreurs persistantes.
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr><th>Paire</th><th>Explication</th></tr>
          </thead>
          <tbody>
            {pieges.map((p, i) => (
              <tr key={i}>
                <td className="font-medium text-foreground whitespace-nowrap">{p.lettre}</td>
                <td className="text-sm">{p.explication}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Après les 30 jours : et ensuite ?</h2>
      <p>
        À la fin de ce plan, vous serez capable de :
      </p>
      <ul>
        <li><strong>Reconnaître</strong> les 28 lettres dans toutes leurs formes</li>
        <li><strong>Lire</strong> des mots arabes avec harakāt</li>
        <li><strong>Commencer</strong> à lire sans harakāt (textes simples)</li>
        <li><strong>Distinguer</strong> voyelles courtes et longues</li>
        <li><strong>Écrire</strong> des mots simples à la main</li>
      </ul>
      <p>
        La suite logique :
      </p>
      <ol>
        <li><strong>Vocabulaire thématique</strong> — apprendre 500 mots fréquents</li>
        <li><strong>Grammaire de base</strong> — la phrase nominale, les pronoms, les démonstratifs</li>
        <li><strong>Lecture coranique</strong> — lire le Coran avec tajwīd de base</li>
        <li><strong>Écoute active</strong> — podcasts, vidéos, récitations pour affiner la prononciation</li>
      </ol>

      <div className="info-box">
        <div className="info-box-title">🎯 La promesse Rissala</div>
        <div className="info-box-content">
          La méthode Rissala ne promet pas de miracles. Elle promet une <strong>structure</strong>. La plupart des gens abandonnent l&apos;arabe non pas parce que c&apos;est difficile, mais parce qu&apos;ils n&apos;ont <strong>aucune feuille de route</strong>. Vous avez maintenant la vôtre. Les 30 prochains jours ne dépendent que de votre <strong>régularité</strong>.
        </div>
      </div>

      <h2>Résumé de la méthode Rissala</h2>
      <ol>
        <li>Progression en <strong>6 étapes</strong> logiques, sans saut conceptuel.</li>
        <li>Mémorisation par <strong>répétition espacée</strong> et familles visuelles.</li>
        <li><strong>20 minutes par jour</strong> pendant 30 jours = 10 heures de pratique structurée.</li>
        <li>Les <strong>8 erreurs classiques</strong> sont identifiées et évitées dès le départ.</li>
        <li>Les <strong>pièges de prononciation</strong> sont cartographiés pour les francophones.</li>
        <li>L&apos;objectif final : <strong>lire l&apos;arabe sans harakāt</strong> — comme un locuteur natif.</li>
      </ol>
      <p>
        Vous avez terminé les 5 articles de la série « Apprendre l&apos;Arabe — Méthode Rissala ». Vous disposez maintenant d&apos;une architecture complète d&apos;apprentissage. Il ne reste qu&apos;une chose : <strong>commencer</strong>.
      </p>
    </ArticleLayout>
  );
}
