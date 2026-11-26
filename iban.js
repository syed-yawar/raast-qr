(function () {
  "use strict";

  var BANK_LIST = [
    ["HABB", "HBL — Habib Bank"], ["MEZN", "Meezan Bank"], ["UNIL", "UBL — United Bank"], ["MUCB", "MCB Bank"],
    ["ABPA", "Allied Bank"], ["ALFH", "Bank Alfalah"], ["BAHL", "Bank Al Habib"], ["FAYS", "Faysal Bank"],
    ["ASCM", "Askari Bank"], ["NBPA", "National Bank of Pakistan"], ["SCBL", "Standard Chartered"], ["BKIP", "BankIslami"],
    ["DUIB", "Dubai Islamic Bank"], ["JSBL", "JS Bank"], ["SONE", "Soneri Bank"], ["BPUN", "The Bank of Punjab"],
    ["SIND", "Sindh Bank"], ["KHYB", "The Bank of Khyber"], ["MPBL", "Habib Metropolitan Bank"], ["SUMB", "Bank Makramah"],
    ["MCIB", "MCB Islamic Bank"], ["AIIN", "Al Baraka Bank"], ["SAUD", "Silkbank"], ["CITI", "Citibank"],
    ["DEUT", "Deutsche Bank"], ["ICBK", "ICBC Pakistan"], ["FWOM", "First Women Bank"], ["SAMB", "Samba Bank"],
    ["MSHQ", "Mashreq Bank"], ["KMBL", "Khushhali Microfinance Bank"], ["FMFB", "HBL Microfinance Bank"],
    ["UMBL", "U Microfinance Bank"], ["APNA", "Apna Microfinance Bank"], ["NRSP", "NRSP Microfinance Bank"],
    ["FINC", "ABHI Microfinance Bank"], ["PAKB", "Pak Oman Microfinance Bank"],
    ["SADA", "SadaPay"], ["JCMA", "JazzCash (Mobilink Microfinance)"], ["TMFB", "easypaisa (Telenor Microfinance)"]
  ];
  var NAMES = {};
  BANK_LIST.forEach(function (b) { NAMES[b[0]] = b[1]; });
  NAMES.MCBL = "MCB Bank"; NAMES.NBPB = "National Bank of Pakistan"; NAMES.TAMW = "easypaisa"; NAMES.SBPP = "State Bank of Pakistan";

  var I18N = {
    en: {
      pageTitle: "Account Number to IBAN Converter Pakistan — All Banks",
      switchLang: "اردو",
      navTag: "Open Source", navGen: "QR generator", navHowIban: "How IBANs work", navGh: "GitHub",
      badge: "Free tool · Runs in your browser",
      h1a: "Account number ⇄ IBAN ", h1b: "for any Pakistani bank.",
      lead: "Turn your account number into an IBAN, or look inside an IBAN to see the bank and account number. Then make a payment QR with one tap.",
      c1Title: "Account number → IBAN", lblBank: "Bank or wallet", lblAcct: "Account number",
      choose: "Choose your bank…", groupBanks: "Banks", groupWallets: "Wallets & digital banks",
      acctHint: "Type it exactly as your bank shows it, including any branch code. Spaces and dashes are ignored.",
      acctBad: "Only letters and numbers are allowed.",
      acctNeedBank: "Now choose your bank above.",
      acctNeedBankLong: "Choose your bank above. Some banks (like Allied Bank) show a branch code in front, which we can remove for you.",
      noteBranch: "Removed the branch code ({b}); the IBAN uses the 16-digit account number.",
      ablNeed16: "Allied Bank IBANs use your 16-digit account number (usually starts with 0010), or 20 digits with the branch code in front. Find it in the myABL app or on your cheque book.",
      tooLongBank: "This account number is longer than 16 digits, and this bank's IBAN format isn't documented, so we can't calculate it safely. Please copy the IBAN from your bank app or statement.",
      acctOk: "IBAN calculated. Please double-check it (see below).",
      outIban: "IBAN", copy: "Copy", copied: "Copied!", makeQr: "Make QR with this IBAN →",
      warnB: "Always double-check.",
      warnT: "Some banks build IBANs with extra branch or product codes, so a calculated IBAN can look valid and still be wrong. Compare it with the IBAN in your bank app, or scan the QR from another app and make sure your own name appears before you print it.",
      c2Title: "IBAN → bank & account", lblIban: "IBAN",
      ibanEmpty: "Paste any Pakistani IBAN to check it.",
      ibanRem: "{n} more characters needed.",
      ibanBadFmt: "A Pakistani IBAN starts with PK and has 24 characters.",
      ibanBadSum: "Checksum failed — there's a typo somewhere in this IBAN.",
      ibanOk: "✓ Valid Pakistani IBAN.",
      rBank: "Bank", rCode: "Bank code", rAcct: "Account number", rCheck: "Checksum", rValid: "Valid ✓", rUnknown: "Unknown bank code",
      rNote: "Account number is shown without leading zeros. Your bank may format it with dashes or a branch prefix.",
      howEyebrow: "How it works", howTitle: "What's inside a Pakistani IBAN",
      segCountry: "Country", segCheck: "Check digits", segBank: "Bank code", segAcct: "Account number, padded to 16",
      k1t: "24 characters, always",
      k1d: "Every Pakistani IBAN is exactly 24 characters and starts with PK. The State Bank of Pakistan made IBANs mandatory for all accounts.",
      k2t: "Check digits catch typos",
      k2d: "The 2 digits after PK are calculated from the rest using the ISO 13616 mod-97 method. One wrong character and the IBAN fails the check.",
      k3t: "Zero-padded account number",
      k3d: "The last 16 characters are your account number with leading zeros. Some banks also include a branch or product code here.",
      footMade: "Built with care by", footSrc: "Source code",
      footDisc: "Independent open-source tool — not affiliated with the State Bank of Pakistan, Raast, or any bank."
    },
    ur: {
      pageTitle: "اکاؤنٹ نمبر سے IBAN کنورٹر — تمام پاکستانی بینک اور والٹس",
      switchLang: "English",
      navTag: "اوپن سورس", navGen: "QR جنریٹر", navHowIban: "IBAN کیسے بنتا ہے", navGh: "گٹ ہب",
      badge: "مفت ٹول · آپ کے براؤزر میں چلتا ہے",
      h1a: "اکاؤنٹ نمبر ⇄ IBAN ", h1b: "کسی بھی پاکستانی بینک کے لیے۔",
      lead: "اپنا اکاؤنٹ نمبر IBAN میں بدلیں، یا کسی IBAN سے بینک اور اکاؤنٹ نمبر معلوم کریں۔ پھر ایک کلک میں ادائیگی QR بنائیں۔",
      c1Title: "اکاؤنٹ نمبر ← IBAN", lblBank: "بینک یا والٹ", lblAcct: "اکاؤنٹ نمبر",
      choose: "اپنا بینک منتخب کریں…", groupBanks: "بینک", groupWallets: "والٹس اور ڈیجیٹل بینک",
      acctHint: "اکاؤنٹ نمبر بالکل ویسا ہی لکھیں جیسا بینک دکھاتا ہے، برانچ کوڈ سمیت۔ خالی جگہ اور ڈیش کو نظرانداز کیا جاتا ہے۔",
      acctBad: "صرف حروف اور ہندسے لکھیں۔",
      acctNeedBank: "اب اوپر سے اپنا بینک منتخب کریں۔",
      acctNeedBankLong: "اوپر سے اپنا بینک منتخب کریں۔ کچھ بینک (جیسے الائیڈ بینک) شروع میں برانچ کوڈ دکھاتے ہیں، جسے ہم خود ہٹا دیں گے۔",
      noteBranch: "برانچ کوڈ ({b}) ہٹا دیا گیا؛ IBAN میں 16 ہندسوں کا اکاؤنٹ نمبر استعمال ہوتا ہے۔",
      ablNeed16: "الائیڈ بینک کے IBAN میں 16 ہندسوں کا اکاؤنٹ نمبر ہوتا ہے (عموماً 0010 سے شروع)، یا شروع میں برانچ کوڈ کے ساتھ 20 ہندسے۔ یہ myABL ایپ یا چیک بک پر دیکھیں۔",
      tooLongBank: "یہ اکاؤنٹ نمبر 16 ہندسوں سے لمبا ہے اور اس بینک کا IBAN فارمیٹ معلوم نہیں، اس لیے ہم اسے محفوظ طریقے سے نہیں بنا سکتے۔ براہِ کرم اپنی بینک ایپ یا سٹیٹمنٹ سے IBAN کاپی کریں۔",
      acctOk: "IBAN بن گیا۔ براہِ کرم نیچے دی گئی ہدایت کے مطابق تصدیق کر لیں۔",
      outIban: "IBAN", copy: "کاپی", copied: "کاپی ہو گیا!", makeQr: "اس IBAN سے QR بنائیں ←",
      warnB: "ہمیشہ تصدیق کریں۔",
      warnT: "کچھ بینک IBAN میں اضافی برانچ یا پروڈکٹ کوڈ شامل کرتے ہیں، اس لیے حساب سے بنا IBAN درست نظر آ کر بھی غلط ہو سکتا ہے۔ اسے اپنی بینک ایپ والے IBAN سے ملائیں، یا پرنٹ سے پہلے کسی دوسری ایپ سے QR سکین کر کے دیکھیں کہ آپ کا اپنا نام آتا ہے۔",
      c2Title: "IBAN ← بینک اور اکاؤنٹ", lblIban: "IBAN",
      ibanEmpty: "چیک کرنے کے لیے کوئی بھی پاکستانی IBAN لکھیں۔",
      ibanRem: "مزید {n} حروف باقی ہیں۔",
      ibanBadFmt: "پاکستانی IBAN ہمیشہ PK سے شروع ہوتا ہے اور 24 حروف کا ہوتا ہے۔",
      ibanBadSum: "چیک سم درست نہیں — اس IBAN میں کہیں غلطی ہے۔",
      ibanOk: "✓ درست پاکستانی IBAN۔",
      rBank: "بینک", rCode: "بینک کوڈ", rAcct: "اکاؤنٹ نمبر", rCheck: "چیک سم", rValid: "درست ✓", rUnknown: "نامعلوم بینک کوڈ",
      rNote: "اکاؤنٹ نمبر شروع کے صفر ہٹا کر دکھایا گیا ہے۔ آپ کا بینک اسے ڈیش یا برانچ کوڈ کے ساتھ لکھ سکتا ہے۔",
      howEyebrow: "طریقہ کار", howTitle: "پاکستانی IBAN کے اندر کیا ہوتا ہے",
      segCountry: "ملک", segCheck: "چیک ہندسے", segBank: "بینک کوڈ", segAcct: "اکاؤنٹ نمبر، 16 تک صفر لگا کر",
      k1t: "ہمیشہ 24 حروف",
      k1d: "ہر پاکستانی IBAN بالکل 24 حروف کا ہوتا ہے اور PK سے شروع ہوتا ہے۔ سٹیٹ بینک نے تمام اکاؤنٹس کے لیے IBAN لازمی قرار دیا ہے۔",
      k2t: "چیک ہندسے غلطی پکڑتے ہیں",
      k2d: "PK کے بعد والے 2 ہندسے باقی IBAN سے ISO 13616 mod-97 طریقے سے نکالے جاتے ہیں۔ ایک حرف بھی غلط ہو تو IBAN چیک میں فیل ہو جاتا ہے۔",
      k3t: "صفر لگا اکاؤنٹ نمبر",
      k3d: "آخری 16 حروف آپ کا اکاؤنٹ نمبر ہوتے ہیں، شروع میں صفر لگا کر۔ کچھ بینک یہاں برانچ یا پروڈکٹ کوڈ بھی شامل کرتے ہیں۔",
      footMade: "تیار کردہ:", footSrc: "سورس کوڈ",
      footDisc: "یہ ایک آزاد اوپن سورس ٹول ہے — سٹیٹ بینک آف پاکستان، راست یا کسی بینک سے منسلک نہیں۔"
    }
  };

  var $ = function (id) { return document.getElementById(id); };
  var lang = document.documentElement.lang === "ur" ? "ur" : "en";
  function tr(k) { return I18N[lang][k]; }
  function clean(s) { return s.replace(/[\s-]/g, "").toUpperCase(); }
  function group(s) { return s.replace(/(.{4})/g, "$1 ").trim(); }

  function mod97(s) {
    var r = 0;
    for (var i = 0; i < s.length; i++) {
      var d = parseInt(s[i], 36).toString();
      for (var j = 0; j < d.length; j++) r = (r * 10 + +d[j]) % 97;
    }
    return r;
  }

  function validIban(iban) {
    return /^PK\d{2}[A-Z]{4}[A-Z0-9]{16}$/.test(iban) && mod97(iban.slice(4) + iban.slice(0, 4)) === 1;
  }

  function buildIban(code, acct) {
    var bban = code + ("0000000000000000" + acct).slice(-16);
    var check = 98 - mod97(bban + "PK00");
    return "PK" + (check < 10 ? "0" : "") + check + bban;
  }

  function fillBanks() {
    var sel = $("bankSel"), cur = sel.value;
    sel.textContent = "";
    var o = document.createElement("option");
    o.value = ""; o.textContent = tr("choose");
    sel.appendChild(o);
    var gB = document.createElement("optgroup"), gW = document.createElement("optgroup");
    gB.label = tr("groupBanks"); gW.label = tr("groupWallets");
    BANK_LIST.forEach(function (b) {
      var op = document.createElement("option");
      op.value = b[0];
      op.textContent = b[1] + " (" + b[0] + ")";
      (["SADA", "JCMA", "TMFB"].indexOf(b[0]) >= 0 ? gW : gB).appendChild(op);
    });
    sel.appendChild(gB); sel.appendChild(gW);
    sel.value = cur;
  }

  var BRANCH_PLUS_16 = ["ABPA", "FWOM"];

  function convert() {
    var acct = clean($("acct").value), code = $("bankSel").value, msg = $("acctMsg"), out = $("out1");
    $("acctCount").textContent = acct.length + " / 16";
    out.hidden = true;
    msg.className = "hint";
    $("acct").classList.remove("bad", "good");

    function fail(key) { msg.className = "hint err"; msg.textContent = tr(key); $("acct").classList.add("bad"); }

    if (!acct) { msg.textContent = tr("acctHint"); return; }
    if (!/^[A-Z0-9]+$/.test(acct)) return fail("acctBad");
    if (!code) { msg.textContent = tr(acct.length > 16 ? "acctNeedBankLong" : "acctNeedBank"); return; }

    var note = "";
    if (BRANCH_PLUS_16.indexOf(code) >= 0 && acct.length === 20) {
      note = tr("noteBranch").replace("{b}", acct.slice(0, 4));
      acct = acct.slice(4);
    }
    if (code === "ABPA" && acct.length !== 16) return fail("ablNeed16");
    if (acct.length > 16) return fail("tooLongBank");

    var iban = buildIban(code, acct);
    $("acct").classList.add("good");
    msg.className = "hint good";
    msg.textContent = (note ? note + " " : "") + tr("acctOk");
    $("ibanOut").textContent = group(iban);
    $("makeQr").href = "/#iban=" + iban;
    out.hidden = false;
  }

  function decode() {
    var el = $("ibanIn"), iban = clean(el.value), msg = $("ibanMsg"), out = $("out2");
    $("ibanCount").textContent = Math.min(iban.length, 24) + " / 24";
    out.hidden = true;
    msg.className = "hint";
    el.classList.remove("bad", "good");

    if (!iban) { msg.textContent = tr("ibanEmpty"); return; }
    if (iban.length < 24) { msg.textContent = tr("ibanRem").replace("{n}", 24 - iban.length); return; }
    if (!/^PK\d{2}[A-Z]{4}[A-Z0-9]{16}$/.test(iban)) { msg.className = "hint err"; msg.textContent = tr("ibanBadFmt"); el.classList.add("bad"); return; }
    if (!validIban(iban)) { msg.className = "hint err"; msg.textContent = tr("ibanBadSum"); el.classList.add("bad"); return; }

    var code = iban.slice(4, 8);
    el.classList.add("good");
    msg.className = "hint good";
    msg.textContent = tr("ibanOk");
    $("rBank").textContent = NAMES[code] || tr("rUnknown");
    $("rCode").textContent = code;
    $("rAcct").textContent = iban.slice(8).replace(/^0+(?=.)/, "");
    $("rCheck").textContent = tr("rValid");
    $("makeQr2").href = "/#iban=" + iban;
    out.hidden = false;
  }

  function applyLang(l) {
    lang = l === "ur" ? "ur" : "en";
    var d = document.documentElement;
    d.lang = lang;
    d.dir = lang === "ur" ? "rtl" : "ltr";
    document.title = tr("pageTitle");
    $("langLabel").textContent = tr("switchLang");
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = I18N[lang][el.getAttribute("data-i18n")];
      if (v !== undefined) el.textContent = v;
    });
    fillBanks();
    convert();
    decode();
    try { localStorage.setItem("rq-lang", lang); } catch (e) {}
  }

  $("langBtn").addEventListener("click", function () { applyLang(lang === "en" ? "ur" : "en"); });
  $("themeBtn").addEventListener("click", function () {
    var mode = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = mode;
    try { localStorage.setItem("rq-theme", mode); } catch (e) {}
  });

  $("bankSel").addEventListener("change", convert);
  $("acct").addEventListener("input", convert);
  $("ibanIn").addEventListener("input", decode);
  $("ibanIn").addEventListener("blur", function () { var c = clean(this.value); if (c) this.value = group(c); });

  $("copyIban").addEventListener("click", function () {
    var b = this, v = clean($("ibanOut").textContent);
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(v).then(function () {
      b.textContent = tr("copied");
      setTimeout(function () { b.textContent = tr("copy"); }, 1800);
    });
  });

  applyLang(lang);
})();
