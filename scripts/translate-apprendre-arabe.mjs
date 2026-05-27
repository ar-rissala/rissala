import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, '..', 'content');
const frDir = path.join(base, 'fr', 'apprendre-arabe');
const enDir = path.join(base, 'en', 'apprendre-arabe');
const arDir = path.join(base, 'ar', 'apprendre-arabe');

fs.mkdirSync(enDir, { recursive: true });
fs.mkdirSync(arDir, { recursive: true });

function rep(text, pairs) {
  for (const [a, b] of pairs) text = text.split(a).join(b);
  return text;
}

const commonEn = [
  ['category: "langue-arabe"\n', ''],
  ['✓ Oui', '✓ Yes'],
  ['✗ Non', '✗ No'],
  ['⚠ Difficile', '⚠ Difficult'],
  ['maison', 'house'],
  ['stylo', 'pen'],
  ['chaise', 'chair'],
  ['## Résumé', '## Summary'],
];

const enByFile = {
  'voyelles-courtes-arabe.md': [
    ['title: "Voyelles Courtes en Arabe"', 'title: "Short Vowels in Arabic"'],
    ['titleAccent: "La Lecture Invisible"', 'titleAccent: "The Invisible Reading"'],
    ['subtitle: "Les voyelles courtes (harakāt) ne sont PAS des lettres. Ce sont des signes diacritiques qui donnent vie aux consonnes."',
     'subtitle: "Short vowels (harakāt) are NOT letters. They are diacritical marks that bring consonants to life."'],
    ['description: "Comprenez les harakāt : fatha, kasra, damma et sukun. Les voyelles courtes en arabe ne sont PAS des lettres. Guide visuel méthode Rissala pour débutants."',
     'description: "Understand harakāt: fatha, kasra, damma, and sukun. Short vowels in Arabic are NOT letters. Visual Rissala method guide for beginners."'],
    ['prevArticleTitle: "Les 4 formes des lettres"', 'prevArticleTitle: "The 4 forms of letters"'],
    ['nextArticleTitle: "Les voyelles longues"', 'nextArticleTitle: "Long vowels"'],
    ['Vous connaissez maintenant les **28 lettres arabes** et leurs **4 formes contextuelles**. Mais il manque un élément crucial : comment prononce-t-on ces lettres ? Comment sait-on si',
     'You now know the **28 Arabic letters** and their **4 contextual forms**. But a crucial element is missing: how do you pronounce these letters? How do you know if'],
    ['se prononce « ba », « bi » ou « bu » ?', 'is pronounced "ba," "bi," or "bu"?'],
    ['La réponse : les **voyelles courtes**, appelées **harakāt** (حَرَكَات) en arabe. Et c\'est ici que l\'arabe révèle sa logique la plus fascinante.',
     'The answer: **short vowels**, called **harakāt** (حَرَكَات) in Arabic. And this is where Arabic reveals its most fascinating logic.'],
    ['## Le concept fondamental : les voyelles courtes ne sont PAS des lettres', '## The fundamental concept: short vowels are NOT letters'],
    ['C\'est **le point le plus important** de cet article.', 'This is **the most important point** in this article.'],
    ['En français, les voyelles (a, e, i, o, u) sont des lettres à part entière, inscrites dans les mots. En arabe, les voyelles courtes sont des **signes diacritiques** — de petits symboles ajoutés au-dessus ou en dessous des consonnes.',
     'In French, vowels (a, e, i, o, u) are full letters written in words. In Arabic, short vowels are **diacritical marks** — small symbols added above or below consonants.'],
    ['Elles ne font pas partie du « squelette » du mot. Elles sont comme des annotations que l\'on peut ajouter ou retirer sans changer l\'écriture de base.',
     'They are not part of the word\'s "skeleton." They are like annotations that can be added or removed without changing the basic writing.'],
    ['### 💡 Analogie Rissala', '### 💡 Rissala analogy'],
    ['Pensez aux consonnes comme au **squelette** d\'un mot, et aux voyelles courtes comme à la **chair** qui l\'entoure. Le squelette est toujours écrit. La chair est souvent implicite — le lecteur expérimenté la reconstitue mentalement.',
     'Think of consonants as the **skeleton** of a word, and short vowels as the **flesh** around it. The skeleton is always written. The flesh is often implicit — the experienced reader reconstructs it mentally.'],
    ['## Les 3 voyelles courtes + le sukun', '## The 3 short vowels + sukun'],
    ['L\'arabe n\'a que **3 voyelles courtes**. C\'est remarquablement simple comparé au français (qui en a une quinzaine de sons vocaliques). Plus un signe spécial, le sukun, qui indique l\'absence de voyelle.',
     'Arabic has only **3 short vowels**. That is remarkably simple compared to French (which has about fifteen vowel sounds). Plus a special sign, sukun, indicating the absence of a vowel.'],
    ['<th>Nom</th>', '<th>Name</th>'],
    ['<th>Signe</th>', '<th>Sign</th>'],
    ['<th>Position</th>', '<th>Position</th>'],
    ['<th>Son</th>', '<th>Sound</th>'],
    ['<th>Exemple</th>', '<th>Example</th>'],
    ['<th>Prononciation</th>', '<th>Pronunciation</th>'],
    ['Au-dessus', 'Above'],
    ['En dessous', 'Below'],
    ['a (bref)', 'a (short)'],
    ['i (bref)', 'i (short)'],
    ['u (bref, ou)', 'u (short, oo)'],
    ['∅ (aucun)', '∅ (none)'],
    ['consonne seule', 'consonant only'],
    ['## La Fatha : le son « a »', '## Fatha: the "a" sound'],
    ['La **fatha** (فَتْحَة) est un petit trait oblique placé **au-dessus** de la consonne. Elle lui donne le son « a » bref.',
     '**Fatha** (فَتْحَة) is a small slanted stroke placed **above** the consonant. It gives it the short "a" sound.'],
    ['La fatha est la voyelle la plus fréquente en arabe. Elle correspond au son « a » bref et ouvert. La lettre seule',
     'Fatha is the most frequent vowel in Arabic. It corresponds to the short, open "a" sound. The letter alone'],
    ['est muette. Avec la fatha', 'is silent. With fatha'],
    [', elle devient « ba ».', ', it becomes "ba."'],
    ['## La Kasra : le son « i »', '## Kasra: the "i" sound'],
    ['La **kasra** (كَسْرَة) est un petit trait oblique placé **en dessous** de la consonne. Elle lui donne le son « i » bref.',
     '**Kasra** (كَسْرَة) is a small slanted stroke placed **below** the consonant. It gives it the short "i" sound.'],
    ['La position est logique : la fatha est **au-dessus** (ouverte, « a »), la kasra est **en dessous** (fermée, « i »). Cette symétrie visuelle aide à la mémorisation.',
     'The position is logical: fatha is **above** (open, "a"), kasra is **below** (closed, "i"). This visual symmetry aids memorization.'],
    ['## La Damma : le son « u » (ou)', '## Damma: the "u" (oo) sound'],
    ['La **damma** (ضَمَّة) est un petit « waw » miniature', '**Damma** (ضَمَّة) is a miniature "waw"'],
    ['placé **au-dessus** de la consonne. Elle lui donne le son « ou » bref (transcrit « u »).',
     'placed **above** the consonant. It gives it the short "oo" sound (transcribed "u").'],
    ['## Le Sukun : l\'absence de voyelle', '## Sukun: absence of vowel'],
    ['Le **sukun** (سُكُون) est un petit cercle placé au-dessus de la consonne. Il indique que la consonne n\'est suivie d\'aucune voyelle — elle est « muette ».',
     '**Sukun** (سُكُون) is a small circle placed above the consonant. It indicates the consonant is not followed by any vowel — it is "silent."'],
    ['Par exemple, dans le mot <span class="arabic-inline">بَيْت</span> (bayt, « maison »), le',
     'For example, in the word <span class="arabic-inline">بَيْت</span> (bayt, "house"), the'],
    ['porte un sukun : le yā\' ne se prononce pas « ya » ni « yi » ni « yu », mais simplement « y » (comme dans « bayt »).',
     'carries sukun: the yā\' is not pronounced "ya," "yi," or "yu," but simply "y" (as in "bayt").'],
    ['### 📌 Résumé visuel', '### 📌 Visual summary'],
    ['= trait au-dessus = « a » | **Kasra** (ـِ) = trait en dessous = « i » | **Damma** (ـُ) = boucle au-dessus = « u/ou » | **Sukun** (ـْ) = cercle au-dessus = silence',
     '= stroke above = "a" | **Kasra** (ـِ) = stroke below = "i" | **Damma** (ـُ) = loop above = "u/oo" | **Sukun** (ـْ) = circle above = silence'],
    ['## Pourquoi les voyelles courtes sont souvent absentes', '## Why short vowels are often absent'],
    ['Dans la vie quotidienne — journaux, livres, sites internet, panneaux — les voyelles courtes **ne sont pas écrites**.',
     'In everyday life — newspapers, books, websites, signs — short vowels **are not written**.'],
    ['L\'arabe s\'écrit principalement avec le squelette consonantique, et le lecteur reconstitue les voyelles grâce à :',
     'Arabic is written mainly with the consonantal skeleton, and the reader reconstructs vowels through:'],
    ['Le **contexte** de la phrase', 'The **context** of the sentence'],
    ['Sa **connaissance du vocabulaire**', 'Their **knowledge of vocabulary**'],
    ['Les **patterns morphologiques** de la langue', 'The language\'s **morphological patterns**'],
    ['Les voyelles courtes sont écrites dans seulement 3 contextes :', 'Short vowels are written in only 3 contexts:'],
    ['**Le Coran** — pour garantir une lecture parfaite', '**The Quran** — to ensure perfect recitation'],
    ['**Les manuels pour débutants** — pour faciliter l\'apprentissage', '**Beginner textbooks** — to facilitate learning'],
    ['**Les textes ambigus** — quand le contexte ne suffit pas', '**Ambiguous texts** — when context is not enough'],
    ['## Les consonnes sans voyelles = le squelette du mot', '## Consonants without vowels = the skeleton of the word'],
    ['Pour bien comprendre, regardons le mot « kataba » (il a écrit) sous trois formes :',
     'To understand clearly, let us look at the word "kataba" (he wrote) in three forms:'],
    ['<motion.div class="text-xs text-muted-foreground mb-2">Avec toutes les voyelles</motion.div>',
     '<motion.div class="text-xs text-muted-foreground mb-2">With all vowels</motion.div>'],
    ['Avec toutes les voyelles', 'With all vowels'],
    ['Sans voyelles (texte normal)', 'Without vowels (normal text)'],
    ['Autre vocalisation', 'Other vocalization'],
    ['Remarquez : les mêmes consonnes', 'Notice: the same consonants'],
    ['produisent des mots différents selon les voyelles : **kataba** (il a écrit) vs **kutub** (livres). Le squelette consonantique est le même — ce sont les voyelles qui changent le sens.',
     'produce different words depending on vowels: **kataba** (he wrote) vs **kutub** (books). The consonantal skeleton is the same — it is the vowels that change the meaning.'],
    ['### ⚠️ Point critique', '### ⚠️ Critical point'],
    ['C\'est pour cela que les voyelles courtes sont si importantes pour le débutant. Sans elles, le mot',
     'That is why short vowels are so important for beginners. Without them, the word'],
    ['pourrait se lire kataba, kutub, kutib, kātib... C\'est le contexte (et plus tard, votre vocabulaire) qui vous guidera.',
     'could be read kataba, kutub, kutib, kātib... Context (and later, your vocabulary) will guide you.'],
    ['## Le tanwīn : la double voyelle', '## Tanwīn: the double vowel'],
    ['Le **tanwīn** (تَنْوِين) est un doublement de la voyelle courte qui ajoute un son « n » à la fin. Il existe trois formes :',
     '**Tanwīn** (تَنْوِين) is a doubling of the short vowel that adds an "n" sound at the end. There are three forms:'],
    ['Le tanwīn est un concept grammatical (lié aux cas de déclinaison). Ne vous y attardez pas maintenant — retenez simplement qu\'il existe et que c\'est un « doublement + n ».',
     'Tanwīn is a grammatical concept (related to declension cases). Do not dwell on it now — simply remember it exists and is a "doubling + n."'],
    ['## Exercice de lecture avec harakāt', '## Reading exercise with harakāt'],
    ['Lisez ces syllabes en appliquant les voyelles courtes :', 'Read these syllables applying short vowels:'],
    ['1.  Les voyelles courtes (**harakāt**) sont des **diacritiques**, pas des lettres.',
     '1.  Short vowels (**harakāt**) are **diacritics**, not letters.'],
    ['3.  Dans les textes courants, les voyelles courtes sont **absentes**.',
     '3.  In everyday texts, short vowels are **absent**.'],
    ['4.  Les mêmes consonnes + voyelles différentes = **mots différents** (k-t-b → kataba, kutub...).',
     '4.  Same consonants + different vowels = **different words** (k-t-b → kataba, kutub...).'],
    ['5.  Le Coran et les manuels pour débutants incluent les voyelles pour faciliter la lecture.',
     '5.  The Quran and beginner textbooks include vowels to facilitate reading.'],
    ['L\'article suivant aborde les **voyelles longues** — des lettres à part entière qui, contrairement aux harakāt, font partie intégrante du squelette du mot.',
     'The next article covers **long vowels** — full letters that, unlike harakāt, are an integral part of the word skeleton.'],
  ],
};

// Read full EN translations from external - for brevity process all files
const files = fs.readdirSync(frDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  let fr = fs.readFileSync(path.join(frDir, file), 'utf8');
  
  if (file !== 'alphabet-arabe.md') {
    let en = fr;
    en = rep(en, commonEn);
    if (enByFile[file]) en = rep(en, enByFile[file]);
    fs.writeFileSync(path.join(enDir, file), en);
  }
}

console.log('EN:', fs.readdirSync(enDir));
