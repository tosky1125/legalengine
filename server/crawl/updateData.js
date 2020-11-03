const diff = require('./diff');
const {
  Law,
  Chapter,
  Article,
  Clause,
  Subparagraph,
  Item,
  HTML,
  File,
} = require('../models/index');

const init = async () => {
  let {
    chapter,
    article,
    clause,
    subPara,
    item,
    html,
    data,
    file,
  } = await spec();

  const a = k;
  let {
    oldLaw
  } = data;
  const regex1 = /(<([^>]+)>)/gi;
  const regex2 = /null/gi;
  await HTML.create({
    law_id: a,
    tag: html,
  });
  for (chapt of chapter) {
    let {
      chapter_number,
      date,
      context,
    } = chapt;
    await Chapter.create({
      law_id: a,
      chapter_id: chapter_number,
      date,
      context,
    });
  }

  for (art of article) {
    let {
      chapter_id,
      article_number,
      title,
      date,
      cont_date,
      context,
      flag_pan,
      flag_yeon,
      flag_hang,
      flag_gyu
    } = art;

    if (oldLaw && date && date.includes('개정') && !date.includes('전문') && !date.includes('제목') && date.includes(format(new Date(data.promulgation_date), 'yyyy. M. d.'))) {
      console.log(a);
      console.log(context);
      let contCheck = await checkRevision(oldLaw.number, oldLaw.enforcement_date, article_number);
      contCheck = contCheck.article ? contCheck.article.context.replace(regex1, '').replace(regex2, '') : null;
      context = contCheck && context ? diff(contCheck, context).replace(regex2, '') : context;
    }

    let tmp = await Chapter.findOne({
      where: {
        law_id: a,
        chapter_id,
      },
      raw: true,
    });
    chapter_id = tmp.id;
    await Article.create({
      law_id: a,
      chapter_id,
      article_title: title,
      article_id: article_number,
      date,
      cont_date,
      context,
      flag_pan,
      flag_yeon,
      flag_hang,
      flag_gyu,
    });
  };
  let curArt;
  let newJoCount = 0;
  for (cla of clause) {
    let {
      chapter_id,
      article_id,
      clause_number,
      date,
      context
    } = cla;
    if (curArt !== article_id) {
      curArt = article_id;
      newJoCount = 0;
    }
    if (date && date.includes('신설')) {
      newJoCount -= 1;
    }
    if (oldLaw && date && date.includes('개정') && date.includes(format(new Date(data.promulgation_date), 'yyyy. M. d.'))) {
      console.log(context);
      let contCheck = await checkRevision(oldLaw.number, oldLaw.enforcement_date, article_id, clause_number + newJoCount)
      contCheck = contCheck.clause ? contCheck.clause.context.replace(regex1, '').replace(regex2, '') : null;
      context = contCheck && context ? diff(contCheck, context).replace(regex2, '') : context;
    }
    let tmp1 = await Chapter.findOne({
      where: {
        law_id: a,
        chapter_id,
      },
      raw: true,
    })
    chapter_id = tmp1.id;
    let tmp2 = await Article.findOne({
      where: {
        law_id: a,
        chapter_id,
        article_id,
      },
      raw: true
    })
    article_id = tmp2.id;
    await Clause.create({
      law_id: a,
      chapter_id,
      article_id,
      clause_id: clause_number,
      date,
      context,
    })
  }
  curArt = null;
  newJoCount = 0;
  let curClause;
  for (sub of subPara) {
    let {
      chapter_id,
      article_id,
      clause_id,
      sub_number,
      date,
      context
    } = sub;

    if (curArt !== article_id) {
      curArt = article_id;
      newJoCount = 0;
    }
    if (curClause !== clause_id) {
      curClause = clause_id;
      newJoCount = 0;
    }
    if (date && date.includes('신설')) {
      newJoCount -= 1;
    }
    if (oldLaw && date && date.includes('개정') && date.includes(format(new Date(data.promulgation_date), 'yyyy. M. d.'))) {
      let contCheck = await checkRevision(oldLaw.number, oldLaw.enforcement_date, article_id, clause_id, sub_number + newJoCount);
      contCheck = contCheck.sub ? contCheck.sub.context.replace(regex1, '').replace(regex2, '') : null;
      context = contCheck && context ? diff(contCheck, context).replace(regex2, '') : context;
    }

    let tmp1 = await Chapter.findOne({
      where: {
        law_id: a,
        chapter_id,
      },
      raw: true,
    })
    chapter_id = tmp1.id;
    let tmp2 = await Article.findOne({
      where: {
        law_id: a,
        chapter_id,
        article_id,
      },
      raw: true,
    })
    article_id = tmp2.id;
    let tmp3 = await Clause.findOne({
      where: {
        law_id: a,
        chapter_id,
        article_id,
        clause_id,
      },
      raw: true
    })
    clause_id = tmp3.id;

    await Subparagraph.create({
      law_id: a,
      chapter_id,
      article_id,
      clause_id,
      sub_id: sub_number,
      date,
      context,
    })
  }

  curArt = null;
  curClause = null;
  newJoCount = 0;
  let curSub;
  for (it of item) {
    let {
      chapter_id,
      article_id,
      clause_id,
      sub_id,
      item_number,
      date,
      context
    } = it;

    if (curArt !== article_id) {
      curArt = article_id;
      newJoCount = 0;
    }
    if (curClause !== clause_id) {
      curClause = clause_id;
      newJoCount = 0;
    }
    if (curSub !== sub_id) {
      curClause = sub_id;
      newJoCount = 0;
    }
    if (date && date.includes('신설')) {
      newJoCount -= 1;
    }
    if (oldLaw && date && date.includes('개정') && date.includes(format(new Date(data.promulgation_date), 'yyyy. M. d.'))) {
      let contCheck = await checkRevision(oldLaw.number, oldLaw.enforcement_date, article_id, clause_id, sub_id, item_number + newJoCount);
      contCheck = contCheck.item ? contCheck.item.context.replace(regex1, '').replace(regex2, '') : null;
      context = contCheck && context ? diff(contCheck, context).replace(regex2, '') : context;
    }

    let tmp1 = await Chapter.findOne({
      where: {
        law_id: a,
        chapter_id,
      },
      raw: true,
    })
    chapter_id = tmp1.id;
    let tmp2 = await Article.findOne({
      where: {
        law_id: a,
        chapter_id,
        article_id,
      },
      raw: true
    })
    article_id = tmp2.id;
    let tmp3 = await Clause.findOne({
      where: {
        law_id: a,
        chapter_id,
        article_id,
        clause_id,
      },
      raw: true
    })
    clause_id = tmp3.id;
    // console.log(chapter_id, article_id, clause_id, sub_);
    let tmp4 = await Subparagraph.findOne({
      where: {
        law_id: a,
        chapter_id,
        article_id,
        clause_id,
        sub_id,
      },
      raw: true
    })
    sub_id = tmp4.id;
    await Item.create({
      law_id: a,
      chapter_id,
      article_id,
      clause_id,
      sub_id,
      item_id: item_number,
      date,
      context
    })
  };
  for (i of file) {
    const {
      context,
      hwp,
      pdf,
      date
    } = i;
    await File.create({
      law_id: a,
      context,
      hwp,
      pdf,
      date,
    });
  };
  k -= 1;
  await init();
};
// let k = 49;
let k = 110;
init();