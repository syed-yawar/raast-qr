(function () {
  "use strict";

  var BANKS = {
    ABPA: "Allied Bank", AIIN: "Al Baraka Bank", ALFH: "Bank Alfalah", APNA: "Apna Microfinance",
    ASCM: "Askari Bank", BAHL: "Bank Al Habib", BKIP: "BankIslami", BPUN: "Bank of Punjab",
    CITI: "Citibank", DEUT: "Deutsche Bank", DUIB: "Dubai Islamic Bank", FAYS: "Faysal Bank",
    FINC: "ABHI Microfinance", FMFB: "HBL Microfinance", FWOM: "First Women Bank",
    HABB: "HBL", ICBK: "ICBC Pakistan", JCMA: "JazzCash",
    JSBL: "JS Bank", KHYB: "Bank of Khyber", KMBL: "Khushhali Bank", MCBL: "MCB Bank",
    MCIB: "MCB Islamic", MEZN: "Meezan Bank", MPBL: "HabibMetro", MSHQ: "Mashreq Bank",
    MUCB: "MCB Bank", NBPA: "NBP", NBPB: "NBP",
    NIBP: "NIB Bank", NRSP: "NRSP Bank", PAKB: "Pak Oman MFB", SADA: "SadaPay",
    SAMB: "Samba Bank", SAUD: "Silkbank", SBPP: "State Bank of Pakistan", SCBL: "Standard Chartered",
    SIND: "Sindh Bank", SONE: "Soneri Bank", SUMB: "Bank Makramah", TAMW: "easypaisa",
    TMFB: "easypaisa", UMBL: "U Microfinance", UNIL: "UBL"
  };

  var THEMES = [
    { id: "emerald", en: "Emerald", ur: "زمرد", a: "#064e3b", b: "#0d9488", fg: "#ffffff", accent: "#d9b36c", pillBg: "rgba(255,255,255,.15)" },
    { id: "counter", en: "Ink-Saver", ur: "سادہ پرنٹ", a: "#ffffff", b: "#f8f7f2", fg: "#0e1d18", accent: "#065f46", banner: "#065f46", bannerFg: "#ffffff", pillBg: "#e6f4ef", light: true },
    { id: "obsidian", en: "Obsidian", ur: "سیاہ گولڈ", a: "#101316", b: "#23282e", fg: "#ffffff", accent: "#d4af37", pillBg: "rgba(212,175,55,.18)" },
    { id: "indigo", en: "Indigo", ur: "نیلا", a: "#0f172a", b: "#3730a3", fg: "#ffffff", accent: "#93c5fd", pillBg: "rgba(255,255,255,.15)" },
    { id: "terracotta", en: "Warm", ur: "گرم", a: "#9a3412", b: "#ea580c", fg: "#ffffff", accent: "#fde68a", pillBg: "rgba(255,255,255,.16)" }
  ];

  var I18N = {
    en: {
      pageTitle: "Free Payment QR for Any Pakistani Bank Account (IBAN)",
      switchLang: "اردو",
      navTag: "Open Source", navHow: "How it works", navPrivacy: "Privacy", navFaq: "FAQ", navGh: "GitHub",
      heroBadge: "100% browser-only · Works with all 40+ Pakistani banks",
      heroH1a: "Make a payment QR for any bank account. ",
      heroH1b: "All you need is your IBAN.",
      heroLead: "HBL, Meezan, UBL, MCB, JazzCash, Easypaisa, SadaPay and 40+ more. Customers scan it with any banking app and pay you directly — no sign-up, no fees, nothing leaves your phone.",
      navConv: "IBAN converter",
      helpSum: "Don't know your IBAN?",
      help1: "Bank app: open your account and look for \"Account details\" or \"IBAN\".",
      help2: "Cheque book, bank statement, or ask your branch.",
      help3: "Wallets (JazzCash, Easypaisa, SadaPay): Profile → Account details.",
      helpLink: "Only have your account number? Convert it to an IBAN →",
      footConv: "Account number ⇄ IBAN converter",
      findTitle: "Don't know your IBAN?",
      findDesc: "Every Pakistani account has one. It's 24 characters and starts with PK.",
      f1b: "Bank app:", f1: "open your account → \"Account details\" or \"IBAN\".",
      f2b: "Wallets:", f2: "JazzCash, Easypaisa, SadaPay → Profile → Account details.",
      f3b: "Paper:", f3: "cheque book, bank statement, or ask your branch.",
      findCtaT: "Only have your account number?",
      findCta: "Convert account number to IBAN →",
      q5: "How do I find my IBAN?",
      a5: "Open your bank or wallet app and look under \"Account details\", \"My account\" or \"IBAN\". It's also printed on your cheque book and bank statement, and any branch can tell you. A Pakistani IBAN is 24 characters and starts with PK.",
      q6: "I only have my account number. Can I get my IBAN?",
      a6: "Yes. Use the free converter: pick your bank, type your account number, and it calculates the IBAN and opens it here as a QR. Some banks add branch codes, so always confirm the IBAN in your bank app or scan the QR and check your name before printing.",
      a6link: "Open the IBAN converter →",
      heroSub: "اپنا IBAN لکھیں، کارڈ پرنٹ کریں، دکان پر لگائیں",
      heroSubDir: "rtl", heroSubLang: "ur",
      ctrlTitle: "Design your payment card", ctrlPill: "Free · MIT",
      lblIban: "Your IBAN", lblName: "Shop or account name", lblOpt: "optional",
      namePlaceholder: "Ali General Store",
      optUrdu: "Urdu subtitle", optIban: "Show IBAN on card", lblStyle: "Card style",
      btnDl: "Download PNG", btnPr: "Print card",
      btnCopy: "Copy raw Raast QR text", btnCopied: "Copied Raast QR text!",
      tipBold: "Before laminating:",
      tipText: "scan the QR from a different bank app, confirm your account title appears, and send yourself Rs 1.",
      stageTitle: "Live preview",
      stageNote: "1000 × 1420 px high-resolution card · crisp for A5 / counter standees",
      statusWait: "Waiting for IBAN", statusReady: "Valid Raast QR · Ready",
      hintEmpty: "Find your 24-character IBAN in your bank app under Account details.",
      hintRem: "{n} more characters needed.",
      hintValid: "✓ Valid IBAN — your Raast QR card is ready to download or print.",
      hintBad: "IBAN checksum didn't match — please double-check for a typo.",
      canvasEmpty1: "Your QR appears here",
      canvasEmpty2: "Enter a valid Pakistani IBAN",
      stripLabel: "Works with every Raast-enabled bank & digital wallet in Pakistan",
      moreBanks: "+30 more banks",
      howEyebrow: "Simple workflow", howTitle: "From IBAN to counter standee in 3 steps",
      s1Title: "1. Enter your IBAN",
      s1Desc: "Copy your 24-character Pakistani IBAN from your banking app. We validate the ISO-7064 checksum and recognise your bank immediately.",
      s2Title: "2. Customise your card",
      s2Desc: "Add your shop or personal name and pick a colour style — including an ink-saver layout made for everyday office printers.",
      s3Title: "3. Print & accept payments",
      s3Desc: "Download the high-res PNG or print directly. Laminate and place on your counter so customers scan, type the amount, and pay instantly.",
      privEyebrow: "Privacy by architecture", privTitle: "Your IBAN never leaves your device.",
      privDesc: "There is no backend, no database, no analytics script, and no third-party CDN. Even the browser's Content Security Policy on this page blocks all outbound network requests. Turn off your Wi-Fi and it still works.",
      t1: "Zero servers", t2: "Zero tracking", t3: "Strict CSP locked", t4: "Works offline",
      fl1k: "Input", fl2k: "Inside your browser", fl3k: "Output · 0 bytes sent", fl3v: "Print-ready PNG card",
      faqEyebrow: "Questions", faqTitle: "Good to know",
      q1: "Is it safe to print my IBAN as a QR code?",
      a1: "Yes. The QR only stores your IBAN in the State Bank of Pakistan's standard Raast format — the exact same IBAN you already share to receive transfers. Nobody can withdraw money or access your account with an IBAN.",
      q2: "Which banks and wallets are supported?",
      a2: "Every Pakistani bank and licensed wallet that supports Raast P2P IBANs — including SadaPay, JazzCash, easypaisa, Meezan Bank, HBL, UBL, MCB, Bank Alfalah, Allied Bank, Faysal Bank, Askari Bank, NBP, and more. Even if a bank's 4-letter code isn't in our label list, the generated Raast QR still works normally.",
      q3: "What exactly is encoded inside the QR?",
      a3: "A standard static Raast P2P string: format header (000202), static indicator (010211), scheme code (020200), your 24-character IBAN under tag 04, and a 4-character CRC-16/CCITT-FALSE checksum under tag 10 so scanning apps can verify it wasn't misread. The amount is left open for the customer to type.",
      q4: "Any security tips for shop counters?",
      a4: "Print the card at least 8–10 cm wide, laminate it or place it behind glass, and glance at it occasionally to make sure nobody has pasted a different QR sticker on top of yours.",
      footDesc: "A free, open-source utility built so every shopkeeper, rider, and freelancer in Pakistan can accept instant Raast payments without middlemen, subscriptions, or privacy trade-offs.",
      footMade: "Built with care by",
      footH1: "How it works",
      footL1: "Standard SBP Raast P2P TLV format",
      footL2: "ISO-7064 IBAN & CRC-16 validation",
      footL3: "100% client-side HTML, CSS & JS",
      footL4: "Zero cookies, logs, or network calls",
      footH2: "Open Source",
      footSrc: "Source code on GitHub",
      footLic: "MIT License",
      footIss: "Report a problem / Suggest a bank",
      footWeb: "Author's Website & Projects",
      footDisc: "Independent open-source tool — not affiliated with the State Bank of Pakistan, Raast, or any bank.",
      footCredit: "QR encoding via"
    },
    ur: {
      pageTitle: "کسی بھی پاکستانی بینک اکاؤنٹ کے لیے مفت ادائیگی QR (IBAN) — Raast QR",
      switchLang: "English",
      navTag: "اوپن سورس", navHow: "طریقہ کار", navPrivacy: "پرائیویسی", navFaq: "سوالات", navGh: "گٹ ہب",
      heroBadge: "100% براؤزر میں · تمام 40+ پاکستانی بینکوں کے لیے",
      heroH1a: "کسی بھی بینک اکاؤنٹ کے لیے ادائیگی QR بنائیں۔ ",
      heroH1b: "بس اپنا IBAN چاہیے۔",
      heroLead: "HBL، Meezan، UBL، MCB، JazzCash، Easypaisa، SadaPay اور 40 سے زائد بینک۔ گاہک کسی بھی بینک ایپ سے سکین کر کے سیدھا آپ کو ادائیگی کریں — نہ سائن اپ، نہ فیس، اور کچھ بھی آپ کے فون سے باہر نہیں جاتا۔",
      navConv: "IBAN کنورٹر",
      helpSum: "اپنا IBAN معلوم نہیں؟",
      help1: "بینک ایپ: اپنا اکاؤنٹ کھولیں اور \"Account details\" یا \"IBAN\" دیکھیں۔",
      help2: "چیک بک، بینک سٹیٹمنٹ، یا اپنی برانچ سے پوچھیں۔",
      help3: "والٹس (JazzCash، Easypaisa، SadaPay): Profile ← Account details۔",
      helpLink: "صرف اکاؤنٹ نمبر معلوم ہے؟ اسے IBAN میں بدلیں ←",
      footConv: "اکاؤنٹ نمبر ⇄ IBAN کنورٹر",
      findTitle: "اپنا IBAN معلوم نہیں؟",
      findDesc: "ہر پاکستانی اکاؤنٹ کا ایک IBAN ہوتا ہے۔ یہ 24 حروف کا ہوتا ہے اور PK سے شروع ہوتا ہے۔",
      f1b: "بینک ایپ:", f1: "اپنا اکاؤنٹ کھولیں ← \"Account details\" یا \"IBAN\"۔",
      f2b: "والٹس:", f2: "JazzCash، Easypaisa، SadaPay ← Profile ← Account details۔",
      f3b: "کاغذات:", f3: "چیک بک، بینک سٹیٹمنٹ، یا اپنی برانچ سے پوچھیں۔",
      findCtaT: "صرف اکاؤنٹ نمبر معلوم ہے؟",
      findCta: "اکاؤنٹ نمبر سے IBAN بنائیں ←",
      q5: "میں اپنا IBAN کیسے معلوم کروں؟",
      a5: "اپنی بینک یا والٹ ایپ کھولیں اور \"Account details\"، \"My account\" یا \"IBAN\" میں دیکھیں۔ یہ آپ کی چیک بک اور بینک سٹیٹمنٹ پر بھی لکھا ہوتا ہے، اور کوئی بھی برانچ بتا سکتی ہے۔ پاکستانی IBAN 24 حروف کا ہوتا ہے اور PK سے شروع ہوتا ہے۔",
      q6: "میرے پاس صرف اکاؤنٹ نمبر ہے۔ کیا IBAN مل سکتا ہے؟",
      a6: "جی ہاں۔ مفت کنورٹر استعمال کریں: اپنا بینک چنیں، اکاؤنٹ نمبر لکھیں، اور یہ IBAN بنا کر یہاں QR کی شکل میں کھول دے گا۔ کچھ بینک برانچ کوڈ شامل کرتے ہیں، اس لیے پرنٹ سے پہلے بینک ایپ میں IBAN ملا لیں یا QR سکین کر کے اپنا نام چیک کر لیں۔",
      a6link: "IBAN کنورٹر کھولیں ←",
      heroSub: "Enter your IBAN · Print your QR · Stick it on your counter",
      heroSubDir: "ltr", heroSubLang: "en",
      ctrlTitle: "اپنا ادائیگی کارڈ بنائیں", ctrlPill: "مفت · MIT",
      lblIban: "آپ کا IBAN", lblName: "دکان یا اکاؤنٹ کا نام", lblOpt: "اختیاری",
      namePlaceholder: "علی جنرل سٹور",
      optUrdu: "کارڈ پر اردو تحریر", optIban: "کارڈ پر IBAN دکھائیں", lblStyle: "کارڈ کا انداز",
      btnDl: "PNG ڈاؤن لوڈ کریں", btnPr: "کارڈ پرنٹ کریں",
      btnCopy: "خام Raast QR ٹیکسٹ کاپی کریں", btnCopied: "کاپی ہو گیا!",
      tipBold: "لیمینیشن سے پہلے:",
      tipText: "کسی دوسری بینک ایپ سے QR سکین کریں، اپنا نام چیک کریں، اور خود کو 1 روپیہ بھیج کر تصدیق کر لیں۔",
      stageTitle: "لائیو پیش نظارہ",
      stageNote: "1000 × 1420 px اعلیٰ معیار کا کارڈ · A5 یا کاؤنٹر سٹینڈ کے لیے بہترین",
      statusWait: "IBAN کا انتظار ہے", statusReady: "درست Raast QR · تیار ہے",
      hintEmpty: "اپنی بینک ایپ میں Account details سے 24 حروف کا IBAN دیکھیں۔",
      hintRem: "مزید {n} حروف باقی ہیں۔",
      hintValid: "✓ IBAN درست ہے — آپ کا راست QR کارڈ ڈاؤن لوڈ یا پرنٹ کے لیے تیار ہے۔",
      hintBad: "یہ IBAN درست نہیں لگتا — براہِ کرم املا دوبارہ چیک کریں۔",
      canvasEmpty1: "آپ کا QR یہاں ظاہر ہوگا",
      canvasEmpty2: "درست پاکستانی IBAN درج کریں",
      stripLabel: "پاکستان کے تمام راست بینکوں اور ڈیجیٹل والٹس کے ساتھ کام کرتا ہے",
      moreBanks: "+30 مزید بینک",
      howEyebrow: "آسان طریقہ", howTitle: "IBAN سے دکان کے کارڈ تک صرف 3 آسان مراحل",
      s1Title: "1. اپنا IBAN درج کریں",
      s1Desc: "اپنی بینک ایپ سے 24 حروف کا پاکستانی IBAN کاپی کریں۔ ہم فوری طور پر چیک سم کی تصدیق کر کے آپ کا بینک پہچان لیتے ہیں۔",
      s2Title: "2. اپنا کارڈ سجا لیں",
      s2Desc: "اپنی دکان یا ذاتی نام شامل کریں اور پسندیدہ رنگ چنیں — سادہ پرنٹر کے لیے کم سیاہی والا انداز بھی موجود ہے۔",
      s3Title: "3. پرنٹ کریں اور ادائیگی لیں",
      s3Desc: "اعلیٰ معیار کی PNG ڈاؤن لوڈ کریں یا سیدھا پرنٹ نکالیں۔ لیمینیٹ کر کے کاؤنٹر پر رکھیں تاکہ گاہک سکین کر کے فوراً ادائیگی کریں۔",
      privEyebrow: "مکمل پرائیویسی", privTitle: "آپ کا IBAN آپ کے آلے سے باہر نہیں جاتا۔",
      privDesc: "اس ویب سائٹ کا کوئی سرور، ڈیٹابیس یا ٹریکنگ نہیں ہے۔ صفحے کی سیکیورٹی پالیسی خود کسی بھی بیرونی رابطے کو روکتی ہے۔ چاہیں تو انٹرنیٹ بند کر کے بھی استعمال کر لیں۔",
      t1: "کوئی سرور نہیں", t2: "کوئی ٹریکنگ نہیں", t3: "سخت CSP تحفظ", t4: "آف لائن بھی چلتا ہے",
      fl1k: "ان پٹ", fl2k: "آپ کے براؤزر میں", fl3k: "نتیجہ · 0 بائٹس باہر گئے", fl3v: "پرنٹ کے لیے تیار PNG کارڈ",
      faqEyebrow: "اہم سوالات", faqTitle: "جاننا ضروری ہے",
      q1: "کیا اپنا IBAN QR کوڈ میں پرنٹ کرنا محفوظ ہے؟",
      a1: "جی ہاں۔ QR میں صرف آپ کا IBAN سٹیٹ بینک کے معیاری راست فارمیٹ میں ہوتا ہے — وہی IBAN جو آپ رقم منگوانے کے لیے پہلے بھی دیتے ہیں۔ IBAN سے کوئی پیسے نکال نہیں سکتا یا اکاؤنٹ تک رسائی حاصل نہیں کر سکتا۔",
      q2: "کون کون سے بینک اور والٹ سپورٹ ہیں؟",
      a2: "پاکستان کے تمام بینک اور لائسنس یافتہ والٹس جو راست P2P IBAN سپورٹ کرتے ہیں — جیسے SadaPay، JazzCash، easypaisa، Meezan، HBL، UBL، MCB، Alfalah، Allied، Faysal، Askari، NBP وغیرہ۔ اگر کسی بینک کا نام ہماری فہرست میں نہ بھی ہو، تب بھی QR بالکل ٹھیک کام کرے گا۔",
      q3: "QR کوڈ کے اندر اصل میں کیا ہوتا ہے؟",
      a3: "معیاری سٹیٹک راست P2P ٹیکسٹ: فارمیٹ ہیڈر (000202)، سٹیٹک نشان (010211)، سکیم کوڈ (020200)، ٹیگ 04 میں آپ کا 24 حروف کا IBAN، اور آخر میں 4 حروف کا CRC-16 چیک سم تاکہ ایپ غلط سکین کو پکڑ سکے۔ رقم خالی رکھی جاتی ہے تاکہ گاہک خود لکھے۔",
      q4: "دکان کے کاؤنٹر کے لیے کوئی حفاظتی مشورہ؟",
      a4: "کارڈ کم از کم 8 سے 10 سینٹی میٹر چوڑا پرنٹ کریں، اسے لیمینیٹ کروائیں یا شیشے کے نیچے رکھیں، اور وقتاً فوقتاً دیکھتے رہیں کہ کسی نے آپ کے QR کے اوپر کوئی اور سٹیکر تو نہیں چپکا دیا۔",
      footDesc: "ایک مفت اور اوپن سورس سہولت تاکہ پاکستان کا ہر دکاندار، رائیڈر اور فری لانسر بغیر کسی فیس یا مڈل مین کے فوری راست ادائیگی وصول کر سکے۔",
      footMade: "تیار کردہ:",
      footH1: "یہ کیسے کام کرتا ہے",
      footL1: "معیاری SBP راست P2P TLV فارمیٹ",
      footL2: "ISO-7064 IBAN اور CRC-16 تصدیق",
      footL3: "مکمل طور پر براؤزر میں چلنے والا کوڈ",
      footL4: "کوئی کوکیز، لاگز یا نیٹ ورک کالز نہیں",
      footH2: "اوپن سورس",
      footSrc: "گٹ ہب پر سورس کوڈ",
      footLic: "MIT لائسنس",
      footIss: "مسئلہ بتائیں / بینک شامل کروائیں",
      footWeb: "مصنف کی ویب سائٹ اور پراجیکٹس",
      footDisc: "یہ ایک آزاد اوپن سورس ٹول ہے — سٹیٹ بینک آف پاکستان، راست یا کسی بینک سے منسلک نہیں۔",
      footCredit: "QR انکوڈنگ بذریعہ"
    }
  };

  var $ = function (id) { return document.getElementById(id); };
  var state = {
    iban: "",
    theme: THEMES[0],
    showUrdu: true,
    showIban: true,
    lang: document.documentElement.lang === "ur" ? "ur" : "en"
  };

  var SANS = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
  var MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

  function tr(key) { return I18N[state.lang][key]; }
  function clean(s) { return s.replace(/[\s-]/g, "").toUpperCase(); }
  function group(s) { return s.replace(/(.{4})/g, "$1 ").trim(); }

  function validIban(iban) {
    if (!/^PK\d{2}[A-Z]{4}[A-Z0-9]{16}$/.test(iban)) return false;
    var s = iban.slice(4) + iban.slice(0, 4), r = 0;
    for (var i = 0; i < s.length; i++) {
      var d = parseInt(s[i], 36).toString();
      for (var j = 0; j < d.length; j++) r = (r * 10 + +d[j]) % 97;
    }
    return r === 1;
  }

  function tlv(tag, v) { return tag + (v.length < 10 ? "0" : "") + v.length + v; }

  function crc16(s) {
    var c = 0xffff;
    for (var i = 0; i < s.length; i++) {
      c ^= s.charCodeAt(i) << 8;
      for (var k = 0; k < 8; k++) c = c & 0x8000 ? ((c << 1) ^ 0x1021) & 0xffff : (c << 1) & 0xffff;
    }
    return ("000" + c.toString(16).toUpperCase()).slice(-4);
  }

  function payload(iban) {
    var p = tlv("00", "02") + tlv("01", "11") + tlv("02", "00") + tlv("04", iban) + "1004";
    return p + crc16(p);
  }

  function rrect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function fitText(ctx, text, weight, size, family, maxW) {
    do { ctx.font = weight + " " + size + "px " + family; size -= 2; } while (ctx.measureText(text).width > maxW && size > 24);
  }

  function drawStar(ctx, cx, cy, outer, inner, pts) {
    ctx.beginPath();
    for (var i = 0; i < pts * 2; i++) {
      var rad = i % 2 === 0 ? outer : inner;
      var ang = (i * Math.PI) / pts - Math.PI / 2;
      var x = cx + Math.cos(ang) * rad, y = cy + Math.sin(ang) * rad;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  function drawBrackets(ctx, x, y, s, len, r) {
    var pts = [
      [x, y + len, x, y, x + len, y],
      [x + s - len, y, x + s, y, x + s, y + len],
      [x + s, y + s - len, x + s, y + s, x + s - len, y + s],
      [x + len, y + s, x, y + s, x, y + s - len]
    ];
    pts.forEach(function (p) {
      ctx.beginPath();
      ctx.moveTo(p[0], p[1]);
      ctx.arcTo(p[2], p[3], p[4], p[5], r);
      ctx.lineTo(p[4], p[5]);
      ctx.stroke();
    });
  }

  function render() {
    var cv = $("card"), ctx = cv.getContext("2d"), W = cv.width, H = cv.height, t = state.theme;
    var ok = validIban(state.iban), name = $("name").value.trim();

    var g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, t.a); g.addColorStop(1, t.b);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    if (t.light) {
      ctx.fillStyle = t.banner;
      ctx.fillRect(0, 0, W, 256);
      ctx.fillStyle = "#d4af37";
      ctx.fillRect(0, 256, W, 8);
      ctx.strokeStyle = "#dedad0";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(2, 264);
      ctx.lineTo(2, H - 2);
      ctx.lineTo(W - 2, H - 2);
      ctx.lineTo(W - 2, 264);
      ctx.stroke();
    } else {
      ctx.save();
      ctx.strokeStyle = t.accent;
      ctx.globalAlpha = .16;
      ctx.lineWidth = 3;
      drawStar(ctx, W - 40, 60, 150, 95, 8);
      drawStar(ctx, 45, H - 55, 130, 82, 8);
      ctx.globalAlpha = .28;
      ctx.lineWidth = 2;
      rrect(ctx, 28, 28, W - 56, H - 56, 36);
      ctx.stroke();
      ctx.restore();
    }

    var headFg = t.light ? t.bannerFg : t.fg;
    ctx.textAlign = "center";

    var pillW = 430, pillH = 48, pillY = 54;
    ctx.fillStyle = t.light ? "rgba(255,255,255,.16)" : t.pillBg;
    rrect(ctx, (W - pillW) / 2, pillY, pillW, pillH, 24);
    ctx.fill();
    ctx.fillStyle = headFg;
    ctx.font = "700 23px " + SANS;
    ctx.fillText("RAAST  ·  INSTANT PAYMENT", W / 2, pillY + 32);

    ctx.fillStyle = headFg;
    ctx.font = "800 72px " + SANS;
    ctx.fillText("Scan to Pay", W / 2, state.showUrdu ? 176 : 196);
    if (state.showUrdu) {
      ctx.globalAlpha = .9;
      ctx.font = "500 40px " + SANS;
      ctx.fillText("سکین کریں اور ادائیگی کریں", W / 2, 228);
      ctx.globalAlpha = 1;
    }

    var px = 118, py = 294, ps = W - px * 2;
    ctx.save();
    ctx.shadowColor = t.light ? "rgba(14,29,24,.10)" : "rgba(0,0,0,.28)";
    ctx.shadowBlur = 42;
    ctx.shadowOffsetY = 16;
    ctx.fillStyle = "#ffffff";
    rrect(ctx, px, py, ps, ps, 42);
    ctx.fill();
    ctx.restore();

    if (t.light) {
      ctx.strokeStyle = "#e2dfd5";
      ctx.lineWidth = 3;
      rrect(ctx, px, py, ps, ps, 42);
      ctx.stroke();
    }

    ctx.save();
    ctx.strokeStyle = t.accent;
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.globalAlpha = t.light ? .7 : .85;
    drawBrackets(ctx, px + 26, py + 26, ps - 52, 46, 18);
    ctx.restore();

    if (ok) {
      var qr = qrcode(0, "M");
      qr.addData(payload(state.iban));
      qr.make();
      var n = qr.getModuleCount();
      var pad = 68;
      var cell = Math.floor((ps - pad * 2) / n);
      var size = cell * n;
      var ox = Math.floor(px + (ps - size) / 2);
      var oy = Math.floor(py + (ps - size) / 2);
      ctx.fillStyle = "#0a0a0a";
      for (var y = 0; y < n; y++) {
        for (var x = 0; x < n; x++) {
          if (qr.isDark(y, x)) ctx.fillRect(ox + x * cell, oy + y * cell, cell, cell);
        }
      }
    } else {
      ctx.strokeStyle = "#d5d8d5";
      ctx.lineWidth = 5;
      ctx.setLineDash([20, 16]);
      rrect(ctx, px + 84, py + 84, ps - 168, ps - 168, 28);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#8a9994";
      ctx.font = "700 38px " + SANS;
      ctx.fillText(tr("canvasEmpty1"), W / 2, py + ps / 2 - 4);
      ctx.font = "500 28px " + SANS;
      ctx.fillText(tr("canvasEmpty2"), W / 2, py + ps / 2 + 44);
    }

    var ty = py + ps + 92;
    ctx.fillStyle = t.fg;
    var displayName = name || "Raast Payments";
    fitText(ctx, displayName, "800", 62, SANS, W - 140);
    ctx.fillText(displayName, W / 2, ty);

    var bank = ok ? (BANKS[state.iban.slice(4, 8)] || "") : "";
    var curY = ty + 32;

    if (bank) {
      ctx.font = "700 30px " + SANS;
      var bw = Math.min(ctx.measureText(bank).width + 54, W - 160);
      ctx.fillStyle = t.pillBg;
      rrect(ctx, (W - bw) / 2, curY, bw, 50, 25);
      ctx.fill();
      ctx.fillStyle = t.light ? t.accent : t.fg;
      ctx.fillText(bank, W / 2, curY + 35);
      curY += 76;
    } else {
      curY += 16;
    }

    if (state.showIban) {
      ctx.fillStyle = t.fg;
      ctx.globalAlpha = t.light ? .82 : .9;
      ctx.font = "600 34px " + MONO;
      ctx.fillText(ok ? group(state.iban) : "PK00 •••• •••• •••• •••• ••••", W / 2, curY + 26);
      ctx.globalAlpha = 1;
    }

    ctx.strokeStyle = t.light ? "#e2dfd5" : "rgba(255,255,255,.18)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(118, H - 104);
    ctx.lineTo(W - 118, H - 104);
    ctx.stroke();

    ctx.fillStyle = t.fg;
    ctx.globalAlpha = t.light ? .65 : .78;
    ctx.font = "600 24px " + SANS;
    ctx.fillText("Any Pakistani bank app · JazzCash · easypaisa · SadaPay", W / 2, H - 56);
    ctx.globalAlpha = 1;

    $("dl").disabled = $("pr").disabled = $("copyPayload").disabled = !ok;
    var pill = $("statusPill");
    if (ok) {
      pill.textContent = tr("statusReady");
      pill.className = "status-pill ready";
    } else {
      pill.textContent = tr("statusWait");
      pill.className = "status-pill";
    }
  }

  function updateIbanMsg() {
    var el = $("iban"), iban = state.iban, msg = $("msg"), bar = $("meterBar");
    el.classList.remove("bad", "good");
    bar.classList.remove("bad", "good");
    msg.className = "hint";

    if (iban.length === 0) {
      msg.textContent = tr("hintEmpty");
    } else if (iban.length < 24) {
      msg.textContent = tr("hintRem").replace("{n}", 24 - iban.length);
    } else if (validIban(iban)) {
      el.classList.add("good");
      bar.classList.add("good");
      msg.className = "hint good";
      msg.textContent = tr("hintValid");
    } else {
      el.classList.add("bad");
      bar.classList.add("bad");
      msg.className = "hint err";
      msg.textContent = tr("hintBad");
    }
  }

  function onIban() {
    var el = $("iban"), iban = clean(el.value), chip = $("bank"), bar = $("meterBar");
    var wasValid = validIban(state.iban);
    state.iban = iban;
    chip.hidden = true;

    $("count").textContent = Math.min(iban.length, 24) + " / 24";
    bar.style.width = Math.min(iban.length / 24, 1) * 100 + "%";

    if (iban.length >= 8 && /^PK\d{2}[A-Z]{4}/.test(iban)) {
      chip.textContent = BANKS[iban.slice(4, 8)] || iban.slice(4, 8);
      chip.hidden = false;
    }

    updateIbanMsg();
    if (!wasValid && validIban(iban)) {
      var cv = $("card");
      cv.classList.remove("flash");
      void cv.offsetWidth;
      cv.classList.add("flash");
    }
    render();
  }

  function applyLang(lang) {
    state.lang = lang === "ur" ? "ur" : "en";
    var d = document.documentElement;
    d.lang = state.lang;
    d.dir = state.lang === "ur" ? "rtl" : "ltr";
    document.title = tr("pageTitle");
    $("langLabel").textContent = tr("switchLang");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (I18N[state.lang][k] !== undefined) el.textContent = I18N[state.lang][k];
    });

    var sub = $("heroSub");
    sub.textContent = tr("heroSub");
    sub.dir = tr("heroSubDir");
    sub.lang = tr("heroSubLang");
    $("name").placeholder = tr("namePlaceholder");

    THEMES.forEach(function (t, i) {
      var btn = $("themes").children[i];
      if (!btn) return;
      var label = t[state.lang];
      btn.setAttribute("aria-label", label);
      btn.querySelector(".sw-label").textContent = label;
    });
    $("themeName").textContent = state.theme[state.lang];

    updateIbanMsg();
    render();
    try { localStorage.setItem("rq-lang", state.lang); } catch (e) {}
  }

  function applyColorTheme(mode) {
    document.documentElement.dataset.theme = mode;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = mode === "dark" ? "#08110e" : "#065f46";
    try { localStorage.setItem("rq-theme", mode); } catch (e) {}
  }

  THEMES.forEach(function (t, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "sw";
    b.setAttribute("role", "radio");
    b.setAttribute("aria-label", t[state.lang]);
    b.setAttribute("aria-checked", i === 0 ? "true" : "false");

    var dot = document.createElement("span");
    dot.className = "sw-dot sw-" + t.id;
    var lbl = document.createElement("span");
    lbl.className = "sw-label";
    lbl.textContent = t[state.lang];
    b.appendChild(dot);
    b.appendChild(lbl);

    b.addEventListener("click", function () {
      state.theme = t;
      $("themeName").textContent = t[state.lang];
      document.querySelectorAll(".sw").forEach(function (s) {
        s.setAttribute("aria-checked", s === b ? "true" : "false");
      });
      render();
    });
    $("themes").appendChild(b);
  });

  $("langBtn").addEventListener("click", function () {
    applyLang(state.lang === "en" ? "ur" : "en");
  });

  $("themeBtn").addEventListener("click", function () {
    var cur = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    applyColorTheme(cur === "dark" ? "light" : "dark");
  });

  $("iban").addEventListener("input", onIban);
  $("iban").addEventListener("blur", function () {
    var c = clean(this.value);
    if (c) this.value = group(c);
  });
  $("name").addEventListener("input", render);
  $("optUrdu").addEventListener("change", function () { state.showUrdu = this.checked; render(); });
  $("optIban").addEventListener("change", function () { state.showIban = this.checked; render(); });
  $("f").addEventListener("submit", function (e) { e.preventDefault(); });

  $("dl").addEventListener("click", function () {
    var a = document.createElement("a");
    a.href = $("card").toDataURL("image/png");
    a.download = "raast-qr-" + state.iban + ".png";
    a.click();
  });

  $("pr").addEventListener("click", function () {
    $("printImg").src = $("card").toDataURL("image/png");
    setTimeout(function () { window.print(); }, 60);
  });

  $("copyPayload").addEventListener("click", function () {
    if (!validIban(state.iban) || !navigator.clipboard) return;
    navigator.clipboard.writeText(payload(state.iban)).then(function () {
      var lbl = $("copyLabel");
      lbl.textContent = tr("btnCopied");
      setTimeout(function () { lbl.textContent = tr("btnCopy"); }, 2000);
    });
  });

  applyLang(state.lang);

  var pre = /^#iban=([A-Za-z0-9]{24})$/.exec(location.hash);
  if (pre) {
    $("iban").value = group(clean(pre[1]));
    onIban();
    history.replaceState(null, "", location.pathname + location.search);
  }
})();
