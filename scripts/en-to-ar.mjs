import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const enDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'content', 'en', 'apprendre-arabe');
const arDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'content', 'ar', 'apprendre-arabe');

function rep(t, pairs) { for (const [a,b] of pairs) t = t.split(a).join(b); return t; }

const files = {
  'alphabet-arabe.md': [
    ['En comparaison,', 'بالمقارنة،'],
    ['pour un cerveau habitué au latin.', 'للعقل المعتاد على اللاتينية.'],
    ['Bonne nouvelle :', 'خبر سار:'],
    ['beaucoup de lettres arabes', 'كثير من الحروف العربية'],
    ['et ne se distinguent', 'وتُميَّز'],
    ['(think)', '(كـ think)'],
    ['(jota espagnol)', '(حرف jota الإسباني)'],
    ['(the anglais)', '(the الإنجليزية)'],
    ['(roulé)', '(مفخّم)'],
    ['(cheval)', '(ش)'],
    ['(s emphatique)', '(ص مفخّمة)'],
    ['(d emphatique)', '(ض مفخّمة)'],
    ['(t emphatique)', '(ط مفخّمة)'],
    ['(dh emphatique)', '(ظ مفخّمة)'],
    ['(gutturale)', '(حلقية)'],
    ['(r grasseyé)', '(غ مفخّمة)'],
    ['(k uvulaire)', '(ق)'],
    ['(h aspiré profond)', '(ح)'],
    ['(h expiré)', '(ه)'],
    ['(expiré)', '(هامس)'],
  ],
  'formes-lettres-arabes.md': [
    ['title: "The 4 Forms of Arabic Letters"', 'title: "أشكال الحروف العربية الأربعة"'],
    ['titleAccent: "Isolated, Initial, Medial, Final"', 'titleAccent: "منفرد، أولي، وسطي، نهائي"'],
    ['subtitle: "Arabic is a dynamic writing system. Each letter changes shape according to its position in the word."',
     'subtitle: "العربية نظام كتابة ديناميكي. يتغيّر شكل كل حرف حسب موقعه في الكلمة."'],
    ['description: "Understand the Arabic cursive system: each letter changes shape according to its position. Complete table of 4 forms + connection rules."',
     'description: "افهم نظام الكتابة العربية المتصلة: يتغيّر شكل كل حرف حسب موقعه. جدول كامل للأشكال الأربعة وقواعد الوصل."'],
    ['prevArticleTitle: "The Arabic alphabet"', 'prevArticleTitle: "الأبجدية العربية"'],
    ['nextArticleTitle: "Short vowels"', 'nextArticleTitle: "الحركات القصيرة"'],
    ['In the previous article', 'في المقال السابق'],
    ['you learned to recognize', 'تعلّمت التعرّف على'],
    ['the **28 Arabic letters in their isolated form**', '**الحروف العربية الـ28 في شكلها المنفرد**'],
    ['Now you need to understand a fundamental concept', 'والآن عليك فهم مفهوم أساسي'],
    ['in Arabic, letters **change shape**', 'في العربية، **تتغيّر أشكال الحروف**'],
    ['according to their position in the word.', 'حسب موقعها في الكلمة.'],
    ['## Why Arabic letters change shape', '## لماذا تتغيّر أشكال الحروف العربية'],
    ['## Summary', '## الخلاصة'],
    ['✓ Yes', '✓ نعم'],
    ['✗ No', '✗ لا'],
    ['house', 'بيت'],
    ['pen', 'قلم'],
    ['chair', 'كرسي'],
  ],
  'voyelles-courtes-arabe.md': [
    ['title: "Short Vowels in Arabic"', 'title: "الحركات القصيرة في العربية"'],
    ['titleAccent: "The Invisible Reading"', 'titleAccent: "القراءة الخفية"'],
    ['subtitle: "Short vowels (harakāt) are NOT letters. They are diacritical marks that bring consonants to life."',
     'subtitle: "الحركات القصيرة (الحركات) ليست حروفاً. إنها علامات تشكيل تُحيي الحروف الساكنة."'],
    ['description: "Understand harakāt: fatha, kasra, damma, and sukun. Short vowels in Arabic are NOT letters. Visual Rissala method guide for beginners."',
     'description: "افهم الحركات: الفتحة والكسرة والضمة والسكون. الحركات القصيرة في العربية ليست حروفاً. دليل بصري من منهج رسالة للمبتدئين."'],
    ['prevArticleTitle: "The 4 forms of letters"', 'prevArticleTitle: "الأشكال الأربعة للحروف"'],
    ['nextArticleTitle: "Long vowels"', 'nextArticleTitle: "الحركات الطويلة"'],
    ['## Summary', '## الخلاصة'],
  ],
  'voyelles-longues-arabe.md': [
    ['title: "Long Vowels in Arabic"', 'title: "الحركات الطويلة في العربية"'],
    ['titleAccent: "The True Vocalic Letters"', 'titleAccent: "حروف العلة الحقيقية"'],
    ['subtitle: "Unlike short vowels (diacritics), long vowels are real letters written in the word."',
     'subtitle: "على عكس الحركات القصيرة (علامات التشكيل)، الحركات الطويلة حروف حقيقية مكتوبة في الكلمة."'],
    ['description: "Long vowels in Arabic (ا و ي) are real letters, not diacritics. Understand the difference between short and long vowels. Rissala guide."',
     'description: "الحركات الطويلة في العربية (ا و ي) حروف حقيقية وليست علامات تشكيل. افهم الفرق بين الحركات القصيرة والطويلة. دليل رسالة."'],
    ['prevArticleTitle: "Short vowels"', 'prevArticleTitle: "الحركات القصيرة"'],
    ['nextArticleTitle: "Rissala method: 30-day plan"', 'nextArticleTitle: "منهج رسالة: خطة 30 يوماً"'],
    ['## Summary', '## الخلاصة'],
  ],
  'methode-rissala-30-jours.md': [
    ['title: "Rissala Method: Learn Arabic"', 'title: "منهج رسالة: تعلّم العربية"'],
    ['titleAccent: "3x Faster — 30-Day Plan"', 'titleAccent: "أسرع 3 مرات — خطة 30 يوماً"'],
    ['subtitle: "Complete synthesis of the Rissala method. Structured day-by-day plan, spaced repetition, mistakes to avoid."',
     'subtitle: "عرض شامل لمنهج رسالة. خطة يومية منظمة، تكرار متباعد، وأخطاء يجب تجنبها."'],
    ['description: "Structured 30-day plan to learn to read Arabic: alphabet, forms, vowels, progressive reading. Rissala method with spaced repetition and mistakes to avoid."',
     'description: "خطة منظمة لـ30 يوماً لتعلّم قراءة العربية: الأبجدية، الأشكال، الحركات، قراءة تدريجية. منهج رسالة مع تكرار متباعد وأخطاء يجب تجنبها."'],
    ['prevArticleTitle: "Long vowels"', 'prevArticleTitle: "الحركات الطويلة"'],
    ['## Summary of the Rissala method', '## خلاصة منهج رسالة'],
    ['## Summary', '## الخلاصة'],
    ['Visual alphabet', 'الأبجدية البصرية'],
    ['Contextual forms', 'الأشكال السياقية'],
    ['Short vowels', 'الحركات القصيرة'],
    ['Long vowels', 'الحركات الطويلة'],
    ['Word reading', 'قراءة الكلمات'],
    ['Reading without harakāt', 'القراءة بلا حركات'],
  ],
};

// Global EN->AR for body text (apply to all)
const globalEnAr = [
  ['### 💡 Key concept', '### 💡 مفهوم أساسي'],
  ['### 📌 Rissala tip', '### 📌 نصيحة من منهج رسالة'],
  ['### 📌 Rissala practical tip', '### 📌 نصيحة عملية من منهج رسالة'],
  ['### ⚠️ Memorize this rule', '### ⚠️ احفظ هذه القاعدة'],
  ['### ⚠️ Classic trap', '### ⚠️ فخ شائع'],
  ['### ⚠️ Critical point', '### ⚠️ نقطة حاسمة'],
  ['### ⚠️ Common mistake', '### ⚠️ خطأ شائع'],
  ['In the next article', 'في المقال التالي'],
  ['<th>Name</th>', '<th>الاسم</th>'],
  ['<th>Letter</th>', '<th>الحرف</th>'],
  ['<th>Sound</th>', '<th>الصوت</th>'],
  ['<th>Position</th>', '<th>الموقع</th>'],
  ['<th>Form</th>', '<th>الشكل</th>'],
  ['<th>Description</th>', '<th>الوصف</th>'],
  ['<th>Connects?</th>', '<th>يتصل؟</th>'],
  ['Isolated', 'منفرد'],
  ['Initial', 'أولي'],
  ['Medial', 'وسطي'],
  ['Final', 'نهائي'],
  ['Above', 'فوق'],
  ['Below', 'تحت'],
  ['✓ Yes', '✓ نعم'],
  ['✗ No', '✗ لا'],
  ['house', 'بيت'],
  ['pen', 'قلم'],
  ['chair', 'كرسي'],
  ['book', 'كتاب'],
];

for (const file of Object.keys(files)) {
  const arPath = path.join(arDir, file);
  let t = fs.existsSync(arPath) ? fs.readFileSync(arPath, 'utf8') : fs.readFileSync(path.join(enDir, file), 'utf8');
  t = rep(t, [...globalEnAr, ...files[file]]);
  fs.writeFileSync(arPath, t);
  console.log('AR updated:', file);
}
