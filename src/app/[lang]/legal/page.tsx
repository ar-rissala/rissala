import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Server, Globe, Scale, AlertTriangle, ShieldCheck, Cookie, Link as LinkIcon, Gavel, Scale as ScaleIcon } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";

const pageCopy = {
  fr: {
    title: "Mentions légales",
    description: "Les présentes mentions légales ont pour objectif d'informer les utilisateurs du site Rissala sur l'identité de l'éditeur, les conditions d'utilisation du site ainsi que les responsabilités associées à son utilisation.",
    publisherTitle: "1. Éditeur du site",
    publisherText1: "Le site Rissala.net est édité par :",
    publisherName: "Rissala",
    publisherForm: "Forme juridique : freelance",
    publisherAddress: "Siège social :\n4 rue des fenals\n13010 Marseille\nFrance",
    publisherSiret: "Numéro SIRET : 88909075900024",
    publisherVat: "Numéro de TVA intracommunautaire : FR45889090759",
    publisherContact: "Adresse e-mail de contact :",
    publisherEmail: "rissala@tutamail.com",
    publisherDirector: "Directeur de la publication :\nMickael Bon",
    hostingTitle: "2. Hébergement du site",
    hostingText1: "Le site Rissala est hébergé par :",
    hostingName: "Vercel Inc.",
    hostingAddress: "Adresse :\n340 S Lemon Ave #4133\nWalnut, CA 91789\nÉtats-Unis",
    hostingSite: "Site internet :\nhttps://vercel.com",
    hostingText2: "L'hébergement des services applicatifs peut également reposer sur différents prestataires techniques nécessaires au fonctionnement de la plateforme.",
    purposeTitle: "3. Objet du site",
    purposeText1: "Rissala est une plateforme dédiée au partage de connaissances, à la diffusion de contenus éducatifs et au développement de services numériques autour de ses thématiques principales.",
    purposeText2: "Le site peut proposer notamment :",
    purposeList: [
      "des contenus éducatifs ;",
      "des ressources numériques ;",
      "des services communautaires ;",
      "des fonctionnalités nécessitant la création d'un compte utilisateur ;",
      "des services commerciaux liés aux offres proposées par Rissala."
    ],
    ipTitle: "4. Propriété intellectuelle",
    ipText1: "L'ensemble des éléments présents sur le site Rissala, notamment les textes, images, illustrations, logos, éléments graphiques, vidéos, interfaces et contenus numériques, sont protégés par les dispositions relatives à la propriété intellectuelle.",
    ipText2: "Sauf autorisation préalable écrite de Rissala, toute reproduction, représentation, modification, diffusion ou exploitation totale ou partielle des contenus du site est interdite.",
    ipText3: "Toute utilisation non autorisée des contenus du site pourra constituer une violation des droits de propriété intellectuelle applicables.",
    liabilityTitle: "5. Responsabilité",
    liabilityText1: "Rissala s'efforce de fournir des informations fiables et régulièrement mises à jour.",
    liabilityText2: "Toutefois, l'éditeur ne peut garantir l'exactitude, l'exhaustivité ou l'absence d'erreur dans l'ensemble des contenus proposés.",
    liabilityText3: "L'utilisation des informations disponibles sur le site relève de la responsabilité exclusive de l'utilisateur.",
    liabilityText4: "Rissala ne pourra être tenu responsable des dommages directs ou indirects pouvant résulter de l'accès ou de l'utilisation du site.",
    dataTitle: "6. Données personnelles",
    dataText1: "Rissala accorde une importance particulière à la protection des données personnelles de ses utilisateurs.",
    dataText2: "La collecte et le traitement des données personnelles sont réalisés conformément au Règlement général sur la protection des données (RGPD) et à la réglementation Européenne applicable.",
    dataContact: "Pour toute question relative à vos données personnelles ou pour exercer vos droits, vous pouvez contacter :",
    dataMore: "Pour plus d'informations, veuillez consulter notre ",
    cookiesTitle: "7. Cookies",
    cookiesText1: "Le site Rissala peut utiliser des cookies et technologies similaires afin d'assurer son fonctionnement, mesurer son audience et améliorer l'expérience utilisateur.",
    cookiesText2: "Les cookies non essentiels nécessitant un consentement préalable ne sont activés qu'après acceptation de l'utilisateur.",
    linksTitle: "8. Liens externes",
    linksText1: "Le site Rissala peut contenir des liens vers des sites ou services tiers.",
    linksText2: "Rissala ne peut être tenu responsable du contenu, des pratiques ou de la politique de confidentialité de ces sites externes.",
    lawTitle: "9. Droit applicable",
    lawText1: "Les présentes mentions légales sont régies par le droit européen.",
    lawText2: "Tout litige relatif à l'utilisation du site Rissala sera soumis aux juridictions compétentes conformément aux règles applicables du droit français."
  },
  en: {
    title: "Legal Notice",
    description: "This legal notice is intended to inform Rissala website users about the identity of the publisher, the site's terms of use, and the responsibilities associated with its use.",
    publisherTitle: "1. Site Publisher",
    publisherText1: "The Rissala.net website is published by:",
    publisherName: "Rissala",
    publisherForm: "Legal form: freelance",
    publisherAddress: "Registered office:\n4 rue des fenals\n13010 Marseille\nFrance",
    publisherSiret: "SIRET number: 88909075900024",
    publisherVat: "Intra-community VAT number: FR45889090759",
    publisherContact: "Contact email:",
    publisherEmail: "rissala.contact@gmail.com",
    publisherDirector: "Director of Publication:\nMickael Bon",
    hostingTitle: "2. Site Hosting",
    hostingText1: "The Rissala website is hosted by:",
    hostingName: "Vercel Inc.",
    hostingAddress: "Address:\n340 S Lemon Ave #4133\nWalnut, CA 91789\nUSA",
    hostingSite: "Website:\nhttps://vercel.com",
    hostingText2: "The hosting of application services may also rely on various technical service providers necessary for the platform's operation.",
    purposeTitle: "3. Purpose of the Site",
    purposeText1: "Rissala is a platform dedicated to knowledge sharing, the distribution of educational content, and the development of digital services around its main themes.",
    purposeText2: "The site may offer, in particular:",
    purposeList: [
      "educational content;",
      "digital resources;",
      "community services;",
      "features requiring the creation of a user account;",
      "commercial services related to Rissala's offerings."
    ],
    ipTitle: "4. Intellectual Property",
    ipText1: "All elements on the Rissala website, including texts, images, illustrations, logos, graphical elements, videos, interfaces, and digital content, are protected by intellectual property provisions.",
    ipText2: "Unless expressly authorized in writing by Rissala, any full or partial reproduction, representation, modification, distribution, or exploitation of the site's contents is prohibited.",
    ipText3: "Any unauthorized use of the site's contents may constitute a violation of applicable intellectual property rights.",
    liabilityTitle: "5. Liability",
    liabilityText1: "Rissala strives to provide reliable and regularly updated information.",
    liabilityText2: "However, the publisher cannot guarantee the accuracy, completeness, or lack of errors in all the proposed content.",
    liabilityText3: "The use of information available on the site is the exclusive responsibility of the user.",
    liabilityText4: "Rissala cannot be held responsible for direct or indirect damages that may result from access to or use of the site.",
    dataTitle: "6. Personal Data",
    dataText1: "Rissala attaches particular importance to the protection of its users' personal data.",
    dataText2: "The collection and processing of personal data are carried out in accordance with the General Data Protection Regulation (GDPR) and applicable European regulations.",
    dataContact: "For any questions relating to your personal data or to exercise your rights, you can contact:",
    dataMore: "For more information, please consult our ",
    cookiesTitle: "7. Cookies",
    cookiesText1: "The Rissala website may use cookies and similar technologies to ensure its operation, measure its audience, and improve the user experience.",
    cookiesText2: "Non-essential cookies requiring prior consent are activated only after user acceptance.",
    linksTitle: "8. External Links",
    linksText1: "The Rissala website may contain links to third-party sites or services.",
    linksText2: "Rissala cannot be held responsible for the content, practices, or privacy policies of these external sites.",
    lawTitle: "9. Applicable Law",
    lawText1: "This legal notice is governed by European law.",
    lawText2: "Any dispute relating to the use of the Rissala website shall be subject to the competent jurisdictions in accordance with the applicable rules of French law."
  },
  ar: {
    title: "الإشعار القانوني",
    description: "يهدف هذا الإشعار القانوني إلى إبلاغ مستخدمي موقع رسالة بهوية الناشر وشروط استخدام الموقع بالإضافة إلى المسؤوليات المرتبطة باستخدامه.",
    publisherTitle: "1. ناشر الموقع",
    publisherText1: "تم نشر موقع Rissala.net بواسطة:",
    publisherName: "رسالة (Rissala)",
    publisherForm: "الشكل القانوني: عمل حر (freelance)",
    publisherAddress: "المقر الرئيسي:\n4 rue des fenals\n13010 Marseille\nFrance",
    publisherSiret: "رقم SIRET: 88909075900024",
    publisherVat: "رقم ضريبة القيمة المضافة: FR45889090759",
    publisherContact: "عنوان البريد الإلكتروني للتواصل:",
    publisherEmail: "rissala.contact@gmail.com",
    publisherDirector: "مدير النشر:\nMickael Bon",
    hostingTitle: "2. استضافة الموقع",
    hostingText1: "تتم استضافة موقع رسالة بواسطة:",
    hostingName: "Vercel Inc.",
    hostingAddress: "العنوان:\n340 S Lemon Ave #4133\nWalnut, CA 91789\nÉtats-Unis",
    hostingSite: "الموقع الإلكتروني:\nhttps://vercel.com",
    hostingText2: "قد تعتمد استضافة خدمات التطبيق أيضًا على مزودي خدمات فنية مختلفين ضروريين لتشغيل المنصة.",
    purposeTitle: "3. الغرض من الموقع",
    purposeText1: "رسالة هي منصة مخصصة لتبادل المعرفة ونشر المحتوى التعليمي وتطوير الخدمات الرقمية حول مواضيعها الرئيسية.",
    purposeText2: "قد يقدم الموقع على وجه الخصوص:",
    purposeList: [
      "محتوى تعليمي؛",
      "موارد رقمية؛",
      "خدمات مجتمعية؛",
      "ميزات تتطلب إنشاء حساب مستخدم؛",
      "خدمات تجارية مرتبطة بالعروض التي تقدمها رسالة."
    ],
    ipTitle: "4. الملكية الفكرية",
    ipText1: "جميع العناصر الموجودة على موقع رسالة، بما في ذلك النصوص والصور والرسوم التوضيحية والشعارات والعناصر الرسومية ومقاطع الفيديو والواجهات والمحتوى الرقمي، محمية بموجب أحكام الملكية الفكرية.",
    ipText2: "ما لم يُسمح بذلك صراحة كتابةً من رسالة، يُحظر أي استنساخ أو تمثيل أو تعديل أو توزيع أو استغلال كلي أو جزئي لمحتويات الموقع.",
    ipText3: "أي استخدام غير مصرح به لمحتويات الموقع قد يشكل انتهاكًا لحقوق الملكية الفكرية المعمول بها.",
    liabilityTitle: "5. المسؤولية",
    liabilityText1: "تسعى رسالة جاهدة لتقديم معلومات موثوقة ومحدثة بانتظام.",
    liabilityText2: "ومع ذلك، لا يمكن للناشر ضمان دقة أو اكتمال أو عدم وجود أخطاء في جميع المحتويات المقترحة.",
    liabilityText3: "يقع استخدام المعلومات المتوفرة على الموقع على عاتق المستخدم حصريًا.",
    liabilityText4: "لا يمكن تحميل رسالة المسؤولية عن الأضرار المباشرة أو غير المباشرة التي قد تنجم عن الوصول إلى الموقع أو استخدامه.",
    dataTitle: "6. البيانات الشخصية",
    dataText1: "تولي رسالة أهمية خاصة لحماية البيانات الشخصية لمستخدميها.",
    dataText2: "يتم جمع البيانات الشخصية ومعالجتها وفقًا للائحة العامة لحماية البيانات (GDPR) واللوائح الأوروبية المعمول بها.",
    dataContact: "لأي أسئلة تتعلق ببياناتك الشخصية أو لممارسة حقوقك، يمكنك الاتصال بـ:",
    dataMore: "لمزيد من المعلومات، يرجى مراجعة ",
    cookiesTitle: "7. ملفات تعريف الارتباط (Cookies)",
    cookiesText1: "قد يستخدم موقع رسالة ملفات تعريف الارتباط والتقنيات المشابهة لضمان تشغيله وقياس جمهوره وتحسين تجربة المستخدم.",
    cookiesText2: "لا يتم تنشيط ملفات تعريف الارتباط غير الأساسية التي تتطلب موافقة مسبقة إلا بعد قبول المستخدم.",
    linksTitle: "8. الروابط الخارجية",
    linksText1: "قد يحتوي موقع رسالة على روابط لمواقع أو خدمات تابعة لجهات خارجية.",
    linksText2: "لا يمكن تحميل رسالة المسؤولية عن المحتوى أو الممارسات أو سياسة الخصوصية لهذه المواقع الخارجية.",
    lawTitle: "9. القانون المعمول به",
    lawText1: "يخضع هذا الإشعار القانوني للقانون الأوروبي.",
    lawText2: "يخضع أي نزاع يتعلق باستخدام موقع رسالة للسلطات القضائية المختصة وفقًا للقواعد المعمول بها في القانون الفرنسي."
  }
};

export default async function LegalNoticeLocalizedPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = pageCopy[lang] || pageCopy.fr;
  const isRtl = lang === "ar";

  return (
    <div className={`container mx-auto px-4 lg:px-8 py-16 max-w-4xl ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
      <PageHero className="rounded-2xl mb-12 -mx-4 lg:-mx-8">
        <div className="text-center py-4 px-4">
          <Scale className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold font-heading mb-4">{t.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
      </PageHero>

      <div className="space-y-8">
        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <Building2 className="h-5 w-5 text-primary" />
              {t.publisherTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.publisherText1}</p>
            <div className={`pl-4 border-l-2 border-primary/20 space-y-2 ${isRtl ? "pr-4 pl-0 border-r-2 border-l-0" : ""}`}>
              <p><strong>{t.publisherName}</strong></p>
              <p>{t.publisherForm}</p>
              <p className="whitespace-pre-line">{t.publisherAddress}</p>
              <p>{t.publisherSiret}</p>
              <p>{t.publisherVat}</p>
            </div>
            <p>
              {t.publisherContact} <br />
              <strong>{t.publisherEmail}</strong>
            </p>
            <p className="whitespace-pre-line">{t.publisherDirector}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <Server className="h-5 w-5 text-primary" />
              {t.hostingTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.hostingText1}</p>
            <div className={`pl-4 border-l-2 border-primary/20 space-y-2 ${isRtl ? "pr-4 pl-0 border-r-2 border-l-0" : ""}`}>
              <p><strong>{t.hostingName}</strong></p>
              <p className="whitespace-pre-line">{t.hostingAddress}</p>
              <p className="whitespace-pre-line">{t.hostingSite}</p>
            </div>
            <p>{t.hostingText2}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <Globe className="h-5 w-5 text-primary" />
              {t.purposeTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.purposeText1}</p>
            <p>{t.purposeText2}</p>
            <ul className={`list-disc space-y-2 ${isRtl ? "pr-6" : "pl-6"}`}>
              {t.purposeList.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <ShieldCheck className="h-5 w-5 text-primary" />
              {t.ipTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.ipText1}</p>
            <p>{t.ipText2}</p>
            <p className="font-semibold text-primary">{t.ipText3}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <AlertTriangle className="h-5 w-5 text-primary" />
              {t.liabilityTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.liabilityText1}</p>
            <p>{t.liabilityText2}</p>
            <p>{t.liabilityText3}</p>
            <p>{t.liabilityText4}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <ShieldCheck className="h-5 w-5 text-primary" />
              {t.dataTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.dataText1}</p>
            <p>{t.dataText2}</p>
            <p>
              {t.dataContact} <br />
              <strong>{t.publisherEmail}</strong>
            </p>
            <p>
              {t.dataMore}{" "}
              <Link href={`/${lang}/privacy`} className="text-primary hover:underline">
                {lang === 'fr' ? 'Politique de confidentialité' : lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <Cookie className="h-5 w-5 text-primary" />
              {t.cookiesTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.cookiesText1}</p>
            <p>{t.cookiesText2}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <LinkIcon className="h-5 w-5 text-primary" />
              {t.linksTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.linksText1}</p>
            <p>{t.linksText2}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <Gavel className="h-5 w-5 text-primary" />
              {t.lawTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.lawText1}</p>
            <p>{t.lawText2}</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
