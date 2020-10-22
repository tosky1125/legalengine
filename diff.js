function escape(s) {
  let n = s;
  n = n.replace(/&/g, '&amp;');
  n = n.replace(/</g, '&lt;');
  n = n.replace(/>/g, '&gt;');
  n = n.replace(/"/g, '&quot;');
  return n;
}

function postCheck(str) {
  const postPosition = ['에', '을', '를', '이', '가'];
  let result = str;
  let post = null;
  for (let i = 0; i < postPosition.length; i += 1) {
    const count = str.indexOf(postPosition[i]);
    if (count !== -1) {
      result = str.slice(0, count);
      post = str.slice(count);
    }
  }
  return {
    result,
    post,
  };
}

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
      let word = postCheck(escape(out.n[i]));
      str += `<ins>${word.result}${nSpace[i]}</ins>${word.post}`;
    } else {
      var pre = "";
      str += " " + out.n[i].text + nSpace[i] + pre;
    }
    // }
  }

  return str;
}

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
}


var test = diffString(
  '「119구조ㆍ구급에 관한 법률 시행령」(이하 "영"이라 한다) 제5조에 따른 119구조대(이하 "구조대"라 한다) 중 특별시ㆍ광역시ㆍ특별자치시ㆍ도ㆍ특별자치도(이하 "시ㆍ도"라 한다) 소방본부 및 소방서(119안전센터를 포함한다)에 설치하는 구조대에서 법 제8조제3항에 따라 갖추어야 하는 장비의 기본적인 사항은 「소방력 기준에 관한 규칙」 및 「소방장비관리규칙」에 따른다.  ',
  '「119구조ㆍ구급에 관한 법률 시행령」(이하 "영"이라 한다) 제5조에 따른 119구조대(이하 "구조대"라 한다) 중 특별시ㆍ광역시ㆍ특별자치시ㆍ도ㆍ특별자치도(이하 "시ㆍ도"라 한다) 소방본부 및 소방서(119안전센터를 포함한다)에 설치하는 구조대에서 법 제8조제3항에 따라 갖추어야 하는 장비의 기본적인 사항은 「소방력 기준에 관한 규칙」 및 「소방장비관리법 시행규칙」에 따른다.'
);
console.log(test.replace(null,'').replace('<ins>',''));

