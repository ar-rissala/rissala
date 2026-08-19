import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, UserCheck, AlertCircle, Clock, Database, Cookie, Scale, Share2, Lock, RefreshCw } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";

const pageCopy = {
  fr: {
    title: "Politique de Confidentialité",
    description: "Votre vie privée est notre priorité. Découvrez comment Rissala protège et utilise vos données personnelles.",
    controllerTitle: "1. Responsable du traitement",
    controllerText1: "Le responsable du traitement des données collectées sur le site Rissala est l’éditeur du site.",
    controllerText2: "Pour toute question relative à vos données personnelles :",
    controllerEmail: "rissala.contact@gmail.com",
    collectedTitle: "2. Données collectées",
    collectedIntro: "Rissala limite la collecte au strict nécessaire.",
    collectedId: "Données d’identification (collectées lors de la création de compte, de l’inscription à la newsletter, du téléchargement d’un contenu gratuit ou de l’utilisation de certaines fonctionnalités) :",
    collectedIdItems: ["Nom et prénom", "Pseudonyme", "Adresse électronique"],
    collectedTech: "Données techniques (enregistrées automatiquement pour la sécurité et le bon fonctionnement du site) :",
    collectedTechItems: ["Adresse IP", "Date et heure de connexion", "Journaux techniques de sécurité"],
    collectedNone: "Aucune donnée bancaire ni aucun numéro de téléphone n’est collecté.",
    purposesTitle: "3. Finalités du traitement",
    purposesIntro: "Les données sont utilisées uniquement pour :",
    purposesItems: [
      "Créer et gérer votre compte utilisateur",
      "Vous donner accès aux services de la plateforme",
      "Envoyer des newsletters et contenus gratuits (sous réserve de votre consentement)",
      "Permettre le téléchargement de ressources gratuites (lead magnets)",
      "Assurer la sécurité et améliorer le fonctionnement du site",
      "Mesurer l’audience et réaliser des analyses statistiques",
      "Respecter les obligations légales"
    ],
    legalTitle: "4. Bases juridiques",
    legalIntro: "Les traitements reposent sur :",
    legalItems: [
      "Votre consentement",
      "L’exécution d’un contrat",
      "Le respect d’obligations légales",
      "L’intérêt légitime de Rissala (sécurité et amélioration des services)"
    ],
    cookiesTitle: "5. Cookies et mesure d’audience",
    cookiesIntro: "Rissala utilise des cookies pour :",
    cookiesItems: [
      "Assurer le bon fonctionnement du site",
      "Mesurer l’audience",
      "Améliorer l’expérience utilisateur"
    ],
    cookiesText1: "Le site utilise notamment Google Analytics afin d’obtenir statistiques anonymes (nombre de visiteurs, pages consultées, durée des visites, appareils et navigateurs utilisés).",
    cookiesText2: "Ces cookies analytiques ne sont déposés qu’après votre consentement explicite. Lors de votre première visite, un bandeau vous permet d’accepter, de refuser ou de personnaliser les cookies. Vous pouvez modifier votre choix à tout moment.",
    retentionTitle: "6. Durée de conservation",
    retentionIntro: "Les données sont conservées uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées :",
    retentionAccount: "Données de compte : pendant toute la durée de votre inscription",
    retentionNewsletter: "Données liées aux newsletters et lead magnets : maximum 3 ans après votre dernière interaction avec Rissala",
    sharingTitle: "7. Partage des données",
    sharingText1: "Les données personnelles ne sont ni vendues ni cédées à des tiers à des fins commerciales.",
    sharingText2: "Elles peuvent uniquement être transmises aux prestataires techniques indispensables au fonctionnement du site ou aux autorités compétentes lorsque la loi l’exige.",
    rightsTitle: "8. Vos droits",
    rightsIntro: "Conformément au RGPD, vous disposez des droits suivants :",
    rightsItems: [
      "Droit d’accès",
      "Droit de rectification",
      "Droit à l’effacement",
      "Droit d’opposition",
      "Droit à la limitation du traitement",
      "Droit à la portabilité",
      "Droit de retirer votre consentement à tout moment"
    ],
    rightsContact: "Pour exercer ces droits :",
    rightsCnil: "Vous disposez également du droit d’introduire une réclamation auprès de l’autorité compétente en matière de protection des données (CNIL en France).",
    securityTitle: "9. Sécurité des données",
    securityText: "Rissala met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, modification ou divulgation.",
    modificationTitle: "10. Modification de la politique",
    modificationText1: "Cette politique peut être modifiée à tout moment pour tenir compte des évolutions légales, réglementaires ou techniques. Nous vous invitons à la consulter régulièrement.",
    modificationText2: "Pour plus d’informations, veuillez consulter les mentions légales du site.",
    lastUpdated: "Dernière mise à jour :",
    legalNoticeLink: "Mentions Légales"
  },
  en: {
    title: "Privacy Policy",
    description: "Rissala is committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR) and applicable legislation. This policy transparently informs you about the data collected, its use, its retention period, and your rights.",
    controllerTitle: "1. Data Controller",
    controllerText1: "The controller of the data collected on the Rissala website is the site publisher.",
    controllerText2: "For any questions relating to your personal data:",
    controllerEmail: "rissala.contact@gmail.com",
    collectedTitle: "2. Data Collected",
    collectedIntro: "Rissala limits collection to what is strictly necessary.",
    collectedId: "Identification data (collected during account creation, newsletter subscription, free content download, or use of certain features):",
    collectedIdItems: ["First and last name", "Pseudonym", "Email address"],
    collectedTech: "Technical data (recorded automatically for security and proper functioning of the site):",
    collectedTechItems: ["IP address", "Date and time of connection", "Technical security logs"],
    collectedNone: "No bank data or phone numbers are collected.",
    purposesTitle: "3. Purposes of Processing",
    purposesIntro: "The data is used solely to:",
    purposesItems: [
      "Create and manage your user account",
      "Give you access to platform services",
      "Send newsletters and free content (subject to your consent)",
      "Allow the download of free resources (lead magnets)",
      "Ensure security and improve site functionality",
      "Measure audience and conduct statistical analysis",
      "Comply with legal obligations"
    ],
    legalTitle: "4. Legal Basis",
    legalIntro: "Processing is based on:",
    legalItems: [
      "Your consent",
      "The performance of a contract",
      "Compliance with legal obligations",
      "The legitimate interest of Rissala (security and improvement of services)"
    ],
    cookiesTitle: "5. Cookies and Audience Measurement",
    cookiesIntro: "Rissala uses cookies to:",
    cookiesItems: [
      "Ensure the proper functioning of the site",
      "Measure audience",
      "Improve user experience"
    ],
    cookiesText1: "The site notably uses Google Analytics to obtain anonymous statistics (number of visitors, pages viewed, duration of visits, devices and browsers used).",
    cookiesText2: "These analytical cookies are deposited only after your explicit consent. During your first visit, a banner allows you to accept, refuse, or customize cookies. You can modify your choice at any time.",
    retentionTitle: "6. Retention Period",
    retentionIntro: "Data is kept only as long as necessary for the purposes for which it was collected:",
    retentionAccount: "Account data: for the entire duration of your registration",
    retentionNewsletter: "Data related to newsletters and lead magnets: maximum 3 years after your last interaction with Rissala",
    sharingTitle: "7. Data Sharing",
    sharingText1: "Personal data is neither sold nor transferred to third parties for commercial purposes.",
    sharingText2: "It may only be transmitted to technical service providers essential for the functioning of the site or to competent authorities when required by law.",
    rightsTitle: "8. Your Rights",
    rightsIntro: "In accordance with the GDPR, you have the following rights:",
    rightsItems: [
      "Right of access",
      "Right to rectification",
      "Right to erasure",
      "Right to object",
      "Right to restriction of processing",
      "Right to data portability",
      "Right to withdraw your consent at any time"
    ],
    rightsContact: "To exercise these rights:",
    rightsCnil: "You also have the right to lodge a complaint with the competent data protection authority (CNIL in France).",
    securityTitle: "9. Data Security",
    securityText: "Rissala implements appropriate technical and organizational measures to protect your data against unauthorized access, loss, alteration, or disclosure.",
    modificationTitle: "10. Policy Modification",
    modificationText1: "This policy may be modified at any time to take into account legal, regulatory, or technical developments. We invite you to consult it regularly.",
    modificationText2: "For more information, please consult the site's legal notice.",
    lastUpdated: "Last updated:",
    legalNoticeLink: "Legal Notice"
  },
  ar: {
    title: "سياسة الخصوصية",
    description: "تلتزم رسالة بحماية بياناتك الشخصية وفقًا للائحة العامة لحماية البيانات (GDPR) والتشريعات المعمول بها. تُعلمك هذه السياسة بشفافية بالبيانات التي يتم جمعها واستخدامها وفترة الاحتفاظ بها وحقوقك.",
    controllerTitle: "1. مراقب البيانات",
    controllerText1: "مراقب البيانات التي يتم جمعها على موقع رسالة هو ناشر الموقع.",
    controllerText2: "لأي أسئلة تتعلق ببياناتك الشخصية:",
    controllerEmail: "rissala.contact@gmail.com",
    collectedTitle: "2. البيانات التي تم جمعها",
    collectedIntro: "تقصر رسالة الجمع على ما هو ضروري للغاية.",
    collectedId: "بيانات الهوية (التي يتم جمعها أثناء إنشاء الحساب، أو الاشتراك في النشرة الإخبارية، أو تنزيل المحتوى المجاني، أو استخدام ميزات معينة):",
    collectedIdItems: ["الاسم الأول والأخير", "الاسم المستعار", "عنوان البريد الإلكتروني"],
    collectedTech: "البيانات الفنية (يتم تسجيلها تلقائيًا من أجل أمان وحسن سير الموقع):",
    collectedTechItems: ["عنوان IP", "تاريخ ووقت الاتصال", "سجلات الأمان الفنية"],
    collectedNone: "لا يتم جمع أي بيانات بنكية أو أرقام هواتف.",
    purposesTitle: "3. أغراض المعالجة",
    purposesIntro: "يتم استخدام البيانات حصريًا من أجل:",
    purposesItems: [
      "إنشاء وإدارة حساب المستخدم الخاص بك",
      "منحك الوصول إلى خدمات المنصة",
      "إرسال الرسائل الإخبارية والمحتوى المجاني (رهنا بموافقتك)",
      "السماح بتنزيل الموارد المجانية",
      "ضمان الأمن وتحسين وظائف الموقع",
      "قياس الجمهور وإجراء التحليل الإحصائي",
      "الامتثال للالتزامات القانونية"
    ],
    legalTitle: "4. الأساس القانوني",
    legalIntro: "تعتمد المعالجة على:",
    legalItems: [
      "موافقتك",
      "أداء العقد",
      "الامتثال للالتزامات القانونية",
      "المصلحة المشروعة لرسالة (الأمن وتحسين الخدمات)"
    ],
    cookiesTitle: "5. ملفات تعريف الارتباط وقياس الجمهور",
    cookiesIntro: "تستخدم رسالة ملفات تعريف الارتباط من أجل:",
    cookiesItems: [
      "ضمان حسن سير الموقع",
      "قياس الجمهور",
      "تحسين تجربة المستخدم"
    ],
    cookiesText1: "يستخدم الموقع بشكل خاص Google Analytics للحصول على إحصاءات مجهولة المصدر (عدد الزوار، الصفحات التي تم عرضها، مدة الزيارات، الأجهزة والمتصفحات المستخدمة).",
    cookiesText2: "يتم إيداع ملفات تعريف الارتباط التحليلية هذه فقط بعد موافقتك الصريحة. خلال زيارتك الأولى، يسمح لك لافتة بقبول ملفات تعريف الارتباط أو رفضها أو تخصيصها. يمكنك تغيير اختيارك في أي وقت.",
    retentionTitle: "6. فترة الاحتفاظ",
    retentionIntro: "يتم الاحتفاظ بالبيانات فقط طالما كان ذلك ضروريًا للأغراض التي تم جمعها من أجلها:",
    retentionAccount: "بيانات الحساب: طوال مدة تسجيلك",
    retentionNewsletter: "البيانات المتعلقة بالرسائل الإخبارية: بحد أقصى 3 سنوات بعد آخر تفاعل لك مع رسالة",
    sharingTitle: "7. مشاركة البيانات",
    sharingText1: "لا يتم بيع البيانات الشخصية أو نقلها إلى أطراف ثالثة لأغراض تجارية.",
    sharingText2: "لا يجوز نقلها إلا إلى مقدمي الخدمات الفنية الأساسيين لتشغيل الموقع أو إلى السلطات المختصة عندما يقتضي القانون ذلك.",
    rightsTitle: "8. حقوقك",
    rightsIntro: "وفقًا للائحة العامة لحماية البيانات (GDPR)، لديك الحقوق التالية:",
    rightsItems: [
      "حق الوصول",
      "حق التصحيح",
      "حق المحو",
      "حق الاعتراض",
      "الحق في تقييد المعالجة",
      "الحق في نقل البيانات",
      "الحق في سحب موافقتك في أي وقت"
    ],
    rightsContact: "لممارسة هذه الحقوق:",
    rightsCnil: "لديك أيضًا الحق في تقديم شكوى إلى سلطة حماية البيانات المختصة.",
    securityTitle: "9. أمن البيانات",
    securityText: "تنفذ رسالة التدابير الفنية والتنظيمية المناسبة لحماية بياناتك من الوصول غير المصرح به أو الفقدان أو التغيير أو الإفصاح.",
    modificationTitle: "10. تعديل السياسة",
    modificationText1: "قد يتم تعديل هذه السياسة في أي وقت لمراعاة التطورات القانونية أو التنظيمية أو الفنية. ندعوك للتشاور بانتظام.",
    modificationText2: "لمزيد من المعلومات، يرجى الرجوع إلى الإشعار القانوني للموقع.",
    lastUpdated: "آخر تحديث:",
    legalNoticeLink: "الإشعار القانوني"
  }
};

export default async function PrivacyPolicyLocalizedPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = pageCopy[lang] || pageCopy.fr;
  const isRtl = lang === "ar";

  return (
    <div className={`container mx-auto px-4 lg:px-8 py-16 max-w-4xl ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
      <PageHero className="rounded-2xl mb-12 -mx-4 lg:-mx-8">
        <div className="text-center py-4 px-4">
          <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
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
              <UserCheck className="h-5 w-5 text-primary" />
              {t.controllerTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.controllerText1}</p>
            <p>
              {t.controllerText2} <br />
              {isRtl ? "" : "Email: "}<strong>{t.controllerEmail}</strong>
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <Database className="h-5 w-5 text-primary" />
              {t.collectedTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.collectedIntro}</p>
            <p><strong>{t.collectedId}</strong></p>
            <ul className={`list-disc space-y-2 ${isRtl ? "pr-6" : "pl-6"}`}>
              {t.collectedIdItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p><strong>{t.collectedTech}</strong></p>
            <ul className={`list-disc space-y-2 ${isRtl ? "pr-6" : "pl-6"}`}>
              {t.collectedTechItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="font-semibold text-primary">{t.collectedNone}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <AlertCircle className="h-5 w-5 text-primary" />
              {t.purposesTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.purposesIntro}</p>
            <ul className={`list-disc space-y-2 ${isRtl ? "pr-6" : "pl-6"}`}>
              {t.purposesItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <Scale className="h-5 w-5 text-primary" />
              {t.legalTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.legalIntro}</p>
            <ul className={`list-disc space-y-2 ${isRtl ? "pr-6" : "pl-6"}`}>
              {t.legalItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
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
            <p>{t.cookiesIntro}</p>
            <ul className={`list-disc space-y-2 ${isRtl ? "pr-6" : "pl-6"}`}>
              {t.cookiesItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p>{t.cookiesText1}</p>
            <p>{t.cookiesText2}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <Clock className="h-5 w-5 text-primary" />
              {t.retentionTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.retentionIntro}</p>
            <ul className={`list-disc space-y-2 ${isRtl ? "pr-6" : "pl-6"}`}>
              <li><strong>{t.retentionAccount}</strong></li>
              <li><strong>{t.retentionNewsletter}</strong></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <Share2 className="h-5 w-5 text-primary" />
              {t.sharingTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.sharingText1}</p>
            <p>{t.sharingText2}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <UserCheck className="h-5 w-5 text-primary" />
              {t.rightsTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.rightsIntro}</p>
            <ul className={`list-disc space-y-2 ${isRtl ? "pr-6" : "pl-6"}`}>
              {t.rightsItems.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p>
              {t.rightsContact} <strong>{t.controllerEmail}</strong>
            </p>
            <p>{t.rightsCnil}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <Lock className="h-5 w-5 text-primary" />
              {t.securityTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.securityText}</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur">
          <CardHeader>
            <CardTitle className={`text-xl flex items-center gap-2 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
              <RefreshCw className="h-5 w-5 text-primary" />
              {t.modificationTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t.modificationText1}</p>
            <p>
              {t.modificationText2} <Link href={`/${lang}/legal`} className="text-primary hover:underline">{t.legalNoticeLink}</Link>.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>{t.lastUpdated} {new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : 'ar-SA')}</p>
        <p className="mt-2">
          <Link href={`/${lang}/legal`} className="text-primary hover:underline">{t.legalNoticeLink}</Link>.
        </p>
      </div>
    </div>
  );
}
