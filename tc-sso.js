var q = window.location.search;
var s1 = q.indexOf("sso=");
var sso = null;
if (s1 > -1) {
  var s2 = q.indexOf("&", s1);
  var raw = s2 > -1 ? q.substring(s1+4, s2) : q.substring(s1+4);
  sso = raw.replace(/\./g, " ");
}
var nickRaw = new URLSearchParams(q).get("nick");
var nick = nickRaw ? decodeURIComponent(nickRaw) : null;

// Если есть имя из URL — патчим токен
if (sso && nick) {
  var parts = sso.split(" ");
  try {
    var decoded = JSON.parse(decodeURIComponent(escape(atob(parts[0]))));
    decoded.nick = nick;
    var reencoded = btoa(unescape(encodeURIComponent(JSON.stringify(decoded))));
    parts[0] = reencoded;
    sso = parts.join(" ");
  } catch(e) {}
}

window["tolstoycomments"] = window["tolstoycomments"] || [];
window["tolstoycomments"].push({action:"init", values:{visible:true, sso:sso, show_classic_mobile:0}});
(function(w,d,s,l,x){w[l]=w[l]||[];w[l].t=w[l].t||new Date().getTime();var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=!0;j.src="//web.tolstoycomments.com/sitejs/app.js?i="+l+"&x="+x+"&t="+w[l].t;f.parentNode.insertBefore(j,f);})(window,document,"script","tolstoycomments","6950");
