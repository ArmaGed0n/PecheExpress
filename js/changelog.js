/* Notes de version : bandeau « Nouvelle version » et fenêtre « Nouveautés » */
  (function () {
    function cmp(a, b) { var x = String(a).split(".").map(Number), y = String(b).split(".").map(Number); for (var i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0); } return 0; }
    function load(opts) { return fetch("changelog.json", opts || {}).then(function (r) { if (!r.ok) throw 0; return r.json(); }); }
    window.fillUpdateNotes = function () {
      load({ cache: "no-store" }).then(function (list) {
        var news = list.filter(function (e) { return cmp(e.version, APP_VERSION) > 0; }); if (!news.length) return;
        document.getElementById("ub-title").textContent = "🎣 Version " + news[0].version + " disponible !";
        var ul = document.getElementById("ub-notes"); ul.innerHTML = "";
        news.forEach(function (e) { e.notes.forEach(function (n) { var li = document.createElement("li"); li.textContent = n; ul.appendChild(li); }); });
      }).catch(function () {});
    };
    window.addEventListener("load", function () {
      if (!/^https?:$/.test(location.protocol)) return;
      var seen = null; try { seen = localStorage.getItem("pe_seen_version"); } catch (e) {}
      try { localStorage.setItem("pe_seen_version", APP_VERSION); } catch (e) {}
      if (!seen || seen === APP_VERSION) return;
      load().then(function (list) {
        var items = list.filter(function (e) { return cmp(e.version, seen) > 0 && cmp(e.version, APP_VERSION) <= 0; }); if (!items.length) return;
        var body = document.getElementById("news-body"); body.innerHTML = "";
        items.forEach(function (e) {
          var t = document.createElement("div"); t.className = "news-ver"; t.textContent = "Version " + e.version;
          if (e.date) { var s = document.createElement("small"); s.textContent = e.date; t.appendChild(s); }
          var ul = document.createElement("ul"); ul.className = "news-list";
          e.notes.forEach(function (n) { var li = document.createElement("li"); li.textContent = n; ul.appendChild(li); });
          body.appendChild(t); body.appendChild(ul);
        });
        document.getElementById("news-modal").classList.add("active");
      }).catch(function () {});
    });
    document.getElementById("close-news").onclick = function () { document.getElementById("news-modal").classList.remove("active"); };
  })();
