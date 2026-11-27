(function () {
  "use strict";
  var VAULT = "会社の知識（読む専用）";
  var msg = document.getElementById("msg");
  var btn = document.getElementById("open");
  var f = null;
  // #f=（フラグメント）を先に読む。フラグメントはサーバーに送られないため、件名などがGitHub Pagesに渡らない（2026-11-27）。
  // ?f= も今までどおり読む（前に作ったリンクのため）。
  try { f = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("f"); } catch (e) { f = null; }
  if (f === null) {
    try { f = new URLSearchParams(window.location.search).get("f"); } catch (e) { f = null; }
  }
  function ok(p) {
    if (typeof p !== "string" || p.length === 0 || p.length > 400) return false;
    if (/[\u0000-\u001f\u007f-\u009f\\]/.test(p)) return false;
    if (p.charAt(0) === "/" || p.indexOf("..") !== -1 || p.indexOf("://") !== -1) return false;
    if (/^[a-zA-Z][a-zA-Z0-9+.\-]*:/.test(p)) return false;
    return true;
  }
  if (!ok(f)) {
    msg.textContent = "リンクの形が正しくありません。";
    btn.hidden = true;
    return;
  }
  var url = "obsidian://open?vault=" + encodeURIComponent(VAULT) + "&file=" + encodeURIComponent(f);
  btn.setAttribute("href", url);
  btn.hidden = false;
  msg.textContent = "Obsidianを開いています。開かないときは下のボタンを押してください。";
  window.location.href = url;
})();
