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
    ["MSHQ", "Mashreq Bank"], ["KHBL", "Khushhali Microfinance Bank"], ["FMFB", "HBL Microfinance Bank"],
    ["UMBL", "U Microfinance Bank"], ["APNA", "Apna Microfinance Bank"], ["NRSP", "NRSP Microfinance Bank"],
    ["FINC", "ABHI Microfinance Bank"], ["PAKB", "Pak Oman Microfinance Bank"],
    ["SADA", "SadaPay"], ["JCMA", "JazzCash (Mobilink Microfinance)"], ["TMFB", "easypaisa (Telenor Microfinance)"]
  ];
  var NAMES = {};
  BANK_LIST.forEach(function (b) { NAMES[b[0]] = b[1]; });
  NAMES.MCBL = "MCB Bank"; NAMES.NBPB = "National Bank of Pakistan"; NAMES.TAMW = "easypaisa"; NAMES.SBPP = "State Bank of Pakistan"; NAMES.KMBL = "Khushhali Microfinance Bank";

  var I18N = {
    en: {
      pageTitle: "Account Number to IBAN Converter Pakistan — All Banks",
      switchLang: "اردو",
      navTag: "Open Source", navGen: "QR generator", navHowIban: "How IBANs work", navGh: "GitHub",
      badge: "Free tool · Runs in your browser",
      h1a: "Account number ⇄ IBAN ", h1b: "for any Pakistani bank.",
      lead: "Turn your account number into an IBAN, or look inside an IBAN to see the bank and account number. Then make a payment QR with one tap.",
      c1Title: "Account number → IBAN", lblBank: "Bank or wallet", lblAcct: "Account number",
      choose: "Search bank or wallet, e.g. Meezan…",
      pickFromList: "Pick your bank from the list under the search box.",
      noBank: "No bank found. Try another spelling.",
      jazzcashNoGen: "JazzCash IBANs contain 6 digits that are different for every account, so they can't be made from your mobile number. Open the JazzCash app → My Account → View Profile and copy your IBAN.",
      easypaisaMobile: "easypaisa IBANs use your easypaisa account number, not your mobile number. Open the easypaisa app → My Account and copy your IBAN (or enter the account number shown there).", groupBanks: "Banks", groupWallets: "Wallets & digital banks",
      acctHint: "Type it exactly as your bank shows it, including any branch code. Spaces and dashes are ignored.",
      acctBad: "Only letters and numbers are allowed.",
      acctNeedBank: "Now choose your bank above.",
      acctNeedBankLong: "Choose your bank above. Some banks (like Allied Bank) show a branch code in front, which we can remove for you.",
      note_branch: "Removed the branch code ({b}); the IBAN uses the account number after it.",
      note_bahl: "Bank Al Habib IBANs leave out the last check digit of the account number.",
      note_jsbl: "Used {b} as the branch code; JS Bank IBANs put it in front of the account number.",
      ablNeed16: "Allied Bank IBANs use your 16-digit account number (usually starts with 0010), or 20 digits with the branch code in front. Find it in the myABL app or on your cheque book.",
      bahlNeed17: "Bank Al Habib account numbers have 17 digits, like 1234-0081-012345-01-2. Please enter the full number.",
      alfhFmt: "Enter your Bank Alfalah account number as the 4-digit branch code plus 10 digits (14 digits), or the 16-digit number from your app.",
      ublFmt: "Enter your 12-digit or 16-digit UBL account number from the UBL app. Older 13-digit numbers can't be converted reliably.",
      jsblFmt: "Enter your 4-digit JS Bank branch code followed by your account number.",
      meznNeedBranch: "Meezan account numbers have 14 digits: the 4-digit branch code, then 10 digits. Please add your branch code in front.",
      soneNeedBranch: "Soneri account numbers have 15 digits: the 4-digit branch code, then 11 digits. Please add your branch code in front.",
      unsupported: "This bank builds IBANs in a way we can't calculate from the account number. Please copy the IBAN from your bank app or statement.",
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
      choose: "بینک یا والٹ تلاش کریں، مثلاً Meezan…",
      pickFromList: "تلاش کے خانے کے نیچے دی گئی فہرست سے اپنا بینک منتخب کریں۔",
      noBank: "کوئی بینک نہیں ملا۔ دوسرے ہجے آزمائیں۔",
      jazzcashNoGen: "جاز کیش کے IBAN میں 6 ہندسے ہر اکاؤنٹ کے لیے مختلف ہوتے ہیں، اس لیے یہ موبائل نمبر سے نہیں بن سکتا۔ جاز کیش ایپ کھولیں ← My Account ← View Profile اور اپنا IBAN کاپی کریں۔",
      easypaisaMobile: "ایزی پیسہ کا IBAN آپ کے ایزی پیسہ اکاؤنٹ نمبر سے بنتا ہے، موبائل نمبر سے نہیں۔ ایزی پیسہ ایپ کھولیں ← My Account اور اپنا IBAN کاپی کریں (یا وہاں دیا گیا اکاؤنٹ نمبر لکھیں)۔", groupBanks: "بینک", groupWallets: "والٹس اور ڈیجیٹل بینک",
      acctHint: "اکاؤنٹ نمبر بالکل ویسا ہی لکھیں جیسا بینک دکھاتا ہے، برانچ کوڈ سمیت۔ خالی جگہ اور ڈیش کو نظرانداز کیا جاتا ہے۔",
      acctBad: "صرف حروف اور ہندسے لکھیں۔",
      acctNeedBank: "اب اوپر سے اپنا بینک منتخب کریں۔",
      acctNeedBankLong: "اوپر سے اپنا بینک منتخب کریں۔ کچھ بینک (جیسے الائیڈ بینک) شروع میں برانچ کوڈ دکھاتے ہیں، جسے ہم خود ہٹا دیں گے۔",
      note_branch: "برانچ کوڈ ({b}) ہٹا دیا گیا؛ IBAN میں اس کے بعد والا اکاؤنٹ نمبر استعمال ہوتا ہے۔",
      note_bahl: "بینک الحبیب کے IBAN میں اکاؤنٹ نمبر کا آخری چیک ہندسہ شامل نہیں ہوتا۔",
      note_jsbl: "{b} کو برانچ کوڈ مانا گیا؛ جے ایس بینک کے IBAN میں یہ اکاؤنٹ نمبر سے پہلے آتا ہے۔",
      ablNeed16: "الائیڈ بینک کے IBAN میں 16 ہندسوں کا اکاؤنٹ نمبر ہوتا ہے (عموماً 0010 سے شروع)، یا شروع میں برانچ کوڈ کے ساتھ 20 ہندسے۔ یہ myABL ایپ یا چیک بک پر دیکھیں۔",
      bahlNeed17: "بینک الحبیب کا اکاؤنٹ نمبر 17 ہندسوں کا ہوتا ہے، جیسے 1234-0081-012345-01-2۔ براہِ کرم پورا نمبر لکھیں۔",
      alfhFmt: "بینک الفلاح کا اکاؤنٹ نمبر 4 ہندسوں کے برانچ کوڈ اور 10 ہندسوں کے ساتھ (کل 14) لکھیں، یا ایپ والا 16 ہندسوں کا نمبر۔",
      ublFmt: "یو بی ایل ایپ والا 12 یا 16 ہندسوں کا اکاؤنٹ نمبر لکھیں۔ پرانے 13 ہندسوں والے نمبر سے IBAN درست نہیں بن سکتا۔",
      jsblFmt: "جے ایس بینک کا 4 ہندسوں کا برانچ کوڈ اور پھر اکاؤنٹ نمبر لکھیں۔",
      meznNeedBranch: "میزان بینک کا اکاؤنٹ نمبر 14 ہندسوں کا ہوتا ہے: 4 ہندسوں کا برانچ کوڈ اور پھر 10 ہندسے۔ براہِ کرم شروع میں برانچ کوڈ لگائیں۔",
      soneNeedBranch: "سونیری بینک کا اکاؤنٹ نمبر 15 ہندسوں کا ہوتا ہے: 4 ہندسوں کا برانچ کوڈ اور پھر 11 ہندسے۔ براہِ کرم شروع میں برانچ کوڈ لگائیں۔",
      unsupported: "یہ بینک IBAN ایسے بناتا ہے کہ اکاؤنٹ نمبر سے حساب نہیں لگایا جا سکتا۔ براہِ کرم اپنی بینک ایپ یا سٹیٹمنٹ سے IBAN کاپی کریں۔",
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

  var WALLETS = ["SADA", "JCMA", "TMFB"];
  var picked = "", active = -1;

  function norm(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ""); }

  function renderList(query) {
    var list = $("bankList"), q = norm(query || ""), groups = [[tr("groupBanks"), []], [tr("groupWallets"), []]];
    list.textContent = "";
    BANK_LIST.forEach(function (b) {
      if (!q || norm(b[1]).indexOf(q) >= 0 || norm(b[0]).indexOf(q) === 0) groups[WALLETS.indexOf(b[0]) >= 0 ? 1 : 0][1].push(b);
    });
    var n = 0;
    groups.forEach(function (g) {
      if (!g[1].length) return;
      var h = document.createElement("li");
      h.className = "combo-group";
      h.setAttribute("role", "presentation");
      h.textContent = g[0];
      list.appendChild(h);
      g[1].forEach(function (b) {
        var li = document.createElement("li");
        li.className = "combo-opt";
        li.id = "opt-" + b[0];
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", b[0] === picked ? "true" : "false");
        li.dataset.code = b[0];
        var name = document.createElement("span");
        name.className = "combo-name";
        name.textContent = b[1];
        var code = document.createElement("span");
        code.className = "combo-code";
        code.textContent = b[0];
        li.appendChild(name);
        li.appendChild(code);
        li.addEventListener("mousedown", function (e) { e.preventDefault(); choose(b[0]); });
        list.appendChild(li);
        n++;
      });
    });
    if (!n) {
      var e = document.createElement("li");
      e.className = "combo-empty";
      e.textContent = tr("noBank");
      list.appendChild(e);
    }
    active = -1;
  }

  function opts() { return $("bankList").querySelectorAll(".combo-opt"); }

  function setActive(i) {
    var o = opts();
    if (!o.length) return;
    active = (i + o.length) % o.length;
    o.forEach(function (el, k) { el.classList.toggle("active", k === active); });
    o[active].scrollIntoView({ block: "nearest" });
    $("bankSel").setAttribute("aria-activedescendant", o[active].id);
  }

  function openList(query) {
    renderList(query);
    $("bankList").hidden = false;
    $("bankSel").setAttribute("aria-expanded", "true");
  }

  function closeList() {
    $("bankList").hidden = true;
    $("bankSel").setAttribute("aria-expanded", "false");
    $("bankSel").removeAttribute("aria-activedescendant");
  }

  function choose(code) {
    picked = code;
    $("bankSel").value = NAMES[code];
    closeList();
    convert();
    $("acct").focus();
  }

  function fillBanks() { $("bankSel").placeholder = tr("choose"); }

  function bankCode() { return picked && $("bankSel").value === NAMES[picked] ? picked : ""; }

  function convert() {
    var acct = clean($("acct").value), code = bankCode(), msg = $("acctMsg"), out = $("out1");
    $("bankSel").classList.toggle("good", !!code);
    $("acctCount").textContent = acct.length + " / 16";
    out.hidden = true;
    msg.className = "hint";
    $("acct").classList.remove("bad", "good");

    if (!acct) { msg.textContent = tr("acctHint"); return; }
    if (!code) { msg.textContent = tr($("bankSel").value.trim() ? "pickFromList" : acct.length > 16 ? "acctNeedBankLong" : "acctNeedBank"); return; }

    var r = IbanRules.toIban(code, acct);
    if (r.err) {
      msg.className = "hint err";
      msg.textContent = tr(r.err);
      $("acct").classList.add("bad");
      return;
    }

    var note = r.note ? tr("note_" + r.note).replace("{b}", r.branch || "") + " " : "";
    $("acct").classList.add("good");
    msg.className = "hint good";
    msg.textContent = note + tr("acctOk");
    var iban = r.iban;
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
    if (!IbanRules.validIban(iban)) { msg.className = "hint err"; msg.textContent = tr("ibanBadSum"); el.classList.add("bad"); return; }

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

  $("bankSel").addEventListener("input", function () {
    var v = this.value.trim(), up = v.toUpperCase();
    picked = "";
    if (NAMES[up] && up.length === 4) picked = up;
    openList(v);
    convert();
  });
  $("bankSel").addEventListener("focus", function () { this.select(); openList(bankCode() ? "" : this.value); });
  $("bankSel").addEventListener("click", function () { if ($("bankList").hidden) openList(bankCode() ? "" : this.value); });
  $("bankSel").addEventListener("blur", function () {
    closeList();
    if (picked) this.value = NAMES[picked];
    convert();
  });
  $("bankSel").addEventListener("keydown", function (e) {
    var open = !$("bankList").hidden;
    if (e.key === "ArrowDown") { e.preventDefault(); if (!open) openList(this.value); setActive(active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (!open) openList(this.value); setActive(active - 1); }
    else if (e.key === "Enter" && open) {
      e.preventDefault();
      var o = opts();
      if (o.length) choose((o[active] || o[0]).dataset.code);
    } else if (e.key === "Escape") closeList();
  });
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
