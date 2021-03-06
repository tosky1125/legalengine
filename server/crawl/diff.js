
// diff 알고리즘 불필요한 내용들 전부 삭제 후 띄어쓰기 기준 split 후 before after parameter 비교

function escape(s) {
  var n = s;
  n = n.replace(/&/g, "&amp;");
  n = n.replace(/</g, "&lt;");
  n = n.replace(/>/g, "&gt;");
  n = n.replace(/"/g, "&quot;");
  return n;
};

function diffString(o, n) {
  o = o.replace(/\s+$/, '');
  n = n.replace(/\s+$/, '');

  var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/));
  var str = "";

  var oSpace = o.match(/\s+/g);
  if (oSpace == null) {
    oSpace = ["\n"];
  } else {
    oSpace.push("\n");
  }
  var nSpace = n.match(/\s+/g);
  if (nSpace == null) {
    nSpace = ["\n"];
  } else {
    nSpace.push("\n");
  }

  for (var i = 0; i < out.n.length; i++) {
    if (out.n[i].text == null) {
      str += '<ins>' + escape(out.n[i]) + nSpace[i] + "</ins>";
    } else {
      var pre = "";
      str += " " + out.n[i].text + nSpace[i] + pre;
    }
  }

  return str;
};

function diff(o, n) {
  var ns = new Object();
  var os = new Object();

  for (var i = 0; i < n.length; i++) {
    if (ns[n[i]] == null)
      ns[n[i]] = {
        rows: new Array(),
        o: null
      };
    ns[n[i]].rows.push(i);
  }

  for (var i = 0; i < o.length; i++) {
    if (os[o[i]] == null)
      os[o[i]] = {
        rows: new Array(),
        n: null
      };
    os[o[i]].rows.push(i);
  }

  for (var i in ns) {
    if (ns[i].rows.length == 1 && typeof (os[i]) != "undefined" && os[i].rows.length == 1) {
      n[ns[i].rows[0]] = {
        text: n[ns[i].rows[0]],
        row: os[i].rows[0]
      };
      o[os[i].rows[0]] = {
        text: o[os[i].rows[0]],
        row: ns[i].rows[0]
      };
    }
  }

  for (var i = 0; i < n.length - 1; i++) {
    if (n[i].text != null && n[i + 1].text == null && n[i].row + 1 < o.length && o[n[i].row + 1].text == null &&
      n[i + 1] == o[n[i].row + 1]) {
      n[i + 1] = {
        text: n[i + 1],
        row: n[i].row + 1
      };
      o[n[i].row + 1] = {
        text: o[n[i].row + 1],
        row: i + 1
      };
    }
  }

  for (var i = n.length - 1; i > 0; i--) {
    if (n[i].text != null && n[i - 1].text == null && n[i].row > 0 && o[n[i].row - 1].text == null &&
      n[i - 1] == o[n[i].row - 1]) {
      n[i - 1] = {
        text: n[i - 1],
        row: n[i].row - 1
      };
      o[n[i].row - 1] = {
        text: o[n[i].row - 1],
        row: i - 1
      };
    }
  }

  return {
    o: o,
    n: n
  };
};

module.exports = diffString;