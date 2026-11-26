(function (root) {
  "use strict";

  function clean(s) { return String(s).replace(/[\s-]/g, "").toUpperCase(); }
  function pad(s, n) { return ("0000000000000000" + s).slice(-n); }

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

  function assemble(code, bban16) {
    var check = 98 - mod97(code + bban16 + "PK00");
    return "PK" + (check < 10 ? "0" : "") + check + code + bban16;
  }

  // Each rule maps the digits a customer sees to the 16-character IBAN account part.
  // Returning null falls back to zero-padding; returning { err } means it can't be derived safely.
  var RULES = {
    ABPA: function (a) {
      if (a.length === 20) return { bban: a.slice(4), note: "branch", branch: a.slice(0, 4) };
      if (a.length === 16) return { bban: a };
      return { err: "ablNeed16" };
    },
    FWOM: function (a) {
      if (a.length === 20) return { bban: a.slice(4), note: "branch", branch: a.slice(0, 4) };
      return null;
    },
    BAHL: function (a) {
      if (a.length === 17) return { bban: a.slice(0, 16), note: "bahl" };
      if (a.length === 16) return { bban: a };
      return { err: "bahlNeed17" };
    },
    ALFH: function (a) {
      if (a.length === 16) return { bban: a };
      if (a.length >= 11 && a.length <= 14) return { bban: pad(a.slice(0, -10), 4) + "00" + a.slice(-10) };
      return { err: "alfhFmt" };
    },
    UNIL: function (a) {
      if (a.length === 16) return { bban: a };
      if (a.length === 12) return { bban: "0112" + a };
      return { err: "ublFmt" };
    },
    JSBL: function (a) {
      if (a.length === 16) return { bban: a };
      if (a.length >= 5 && a.length <= 15) return { bban: a.slice(0, 4) + pad(a.slice(4), 12), note: "jsbl", branch: a.slice(0, 4) };
      return { err: "jsblFmt" };
    },
    MEZN: function (a) {
      if (a.length === 10) return { err: "meznNeedBranch" };
      return null;
    },
    SONE: function (a) {
      if (a.length === 11) return { err: "soneNeedBranch" };
      return null;
    },
    DUIB: function (a) {
      if (a.length === 13) return { bban: pad(a.slice(3), 16), note: "branch", branch: a.slice(0, 3) };
      return null;
    },
    SAUD: function (a) {
      if (a.length === 14) return { bban: pad(a.slice(4), 16), note: "branch", branch: a.slice(0, 4) };
      return null;
    },
    JCMA: function (a) { return a.length === 16 ? { bban: a } : { err: "jazzcashNoGen" }; },
    TMFB: function (a) { return /^0?3\d{9}$/.test(a) ? { err: "easypaisaMobile" } : null; },
    MPBL: function (a) { return a.length === 16 ? { bban: a } : { err: "unsupported" }; },
    KHBL: function (a) { return a.length === 16 ? { bban: a } : { err: "unsupported" }; }
  };

  function toIban(code, raw) {
    var a = clean(raw);
    if (!/^[A-Z0-9]+$/.test(a)) return { err: "acctBad" };
    var r = RULES[code] ? RULES[code](a) : null;
    if (!r) r = a.length <= 16 ? { bban: pad(a, 16) } : { err: "tooLongBank" };
    if (r.err) return r;
    r.iban = assemble(code, r.bban);
    return r;
  }

  var api = { clean: clean, mod97: mod97, validIban: validIban, toIban: toIban, RULES: RULES };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.IbanRules = api;
})(this);
