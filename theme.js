(function () {
  var d = document.documentElement;
  try {
    d.dataset.theme = localStorage.getItem("rq-theme") === "dark" ? "dark" : "light";
    if (localStorage.getItem("rq-lang") === "ur") {
      d.lang = "ur";
      d.dir = "rtl";
    }
  } catch (e) {
    d.dataset.theme = "light";
  }
})();
