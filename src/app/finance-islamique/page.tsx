import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Scale, ArrowLeft, Coins, Handshake, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Finance Islamique | Rissala — Jurisprudence des Transactions",
  description:
    "Comprendre le fiqh al-muʿāmalāt : règles du commerce, interdiction du ribā, mécanisme de la zakāt et fonctionnement de la finance islamique moderne.",
};

const articles = [
  {
    icon: Scale,
    number: 1,
    title: "Les Fondements du Commerce en Islam",
    subtitle: "Licéité et Justice Économique",
    description:
      "La philosophie économique islamique. La différence fondamentale entre le profit généré par le commerce (bayʿ) et l'usure destructive (ribā).",
    href: "/finance-islamique/fondements-commerce-islam",
    tag: "Fondements",
  },
  {
    icon: Handshake,
    number: 2,
    title: "Les Règles de la Vente (Bayʿ)",
    subtitle: "Conditions de Validité d'un Contrat",
    description:
      "Ijab et Qabul, licéité de l'objet, obligation de propriété, et interdiction catégorique de l'incertitude excessive (Gharar).",
    href: "/finance-islamique/regles-vente-contrats",
    tag: "Contrats",
  },
  {
    icon: Coins,
    number: 3,
    title: "Le Ribā en Détail",
    subtitle: "Ribā al-Faḍl et Ribā al-Nasīʾa",
    description:
      "L'explication technique de l'usure selon le hadith des 6 catégories. Différence entre une vente à crédit licite et un prêt à intérêt.",
    href: "/finance-islamique/riba-usure-explication",
    tag: "Interdictions",
  },
  {
    icon: BookOpen,
    number: 4,
    title: "La Zakāt",
    subtitle: "Pilier Spirituel et Mécanisme Économique",
    description:
      "Ce n'est pas une simple charité (sadaqa). Le rôle macro-économique de la Zakāt pour forcer la circulation de la richesse et l'investissement.",
    href: "/finance-islamique/zakat-mecanisme-economique",
    tag: "Redistribution",
  },
  {
    icon: Building2,
    number: 5,
    title: "La Finance Islamique Moderne",
    subtitle: "De la Jurisprudence Classique aux Banques",
    description:
      "Comment appliquer des règles vieilles de 14 siècles ? Explication claire de la Murābaḥa, de l'Ijāra, de la Mushāraka et de la Muḍāraba.",
    href: "/finance-islamique/finance-islamique-moderne",
    tag: "Époque Moderne",
  },
];

export default function FinanceIslamiquePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary/5 py-14 sm:py-18 lg:py-24 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 font-heading">
            Finance{" "}
            <span className="text-primary">Islamique</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            Découvrez le fiqh al-muʿāmalāt : la jurisprudence des transactions. Un système économique complet visant l&apos;équité, le partage des risques et la connexion avec l&apos;économie réelle.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            <span>Cursus Économique Complet • 5 Articles Fondamentaux</span>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="space-y-5">
            {articles.map((article) => (
              <Link
                key={article.number}
                href={article.href}
                className="group block p-5 sm:p-6 lg:p-8 rounded-xl border border-border/50 bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Number + Icon */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-bold">
                      {article.number}
                    </span>
                    <article.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h2 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      <span className="inline-flex px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {article.tag}
                      </span>
                    </div>
                    <p className="text-sm text-primary/80 font-medium mb-2">{article.subtitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{article.description}</p>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 hidden sm:flex items-center self-center">
                    <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology CTA */}
      <section className="py-10 sm:py-14 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <h2 className="text-xl sm:text-2xl font-bold font-heading mb-4">
            Du fiqh classique à <span className="text-primary">l&apos;application moderne</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            L&apos;économie islamique n&apos;est pas qu&apos;une série d&apos;interdits. C&apos;est une vision éthique du commerce où la rentabilité s&apos;allie à la justice sociale. Commencez par comprendre les fondements spirituels du commerce.
          </p>
          <Link
            href="/finance-islamique/fondements-commerce-islam"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Commencer par le Fondement
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
