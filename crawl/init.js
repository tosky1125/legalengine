let {
  Chapter,
  Article,
  Clause,
  Subparagraph,
  Item,
} = require('../models');
const {
  spec
} = require('./test');

const init = async (lawNum) => {
  console.log(lawNum);
  let {
    chapter,
    article,
    clause,
    subPara,
    item,
  } = await spec(lawNum);

  chapter.forEach(async ele => {
    let {
      chapter_number,
      date,
      context
    } = ele;

    await Chapter.create({
      law_id: k,
      chapter_number,
      date,
      context,
    });
  });

  for (let i in article) {
    let {
      chapter_id,
      title,
      date,
      context,
      flag_pan,
      flag_yeon,
      flag_hang,
      flag_gyu
    } = article[i];

    let chapId = chapter_id;
    if (chapter_id) {
      chapId = await Chapter.findOne({
        where: {
          law_id: k,
          chapter_number: chapter_id,
        },
        raw: true,
      }).id;
    };

    await Article.create({
      law_id: k,
      chapter_id: chapId,
      article_title: title,
      article_number: i,
      date,
      context,
      flag_pan,
      flag_yeon,
      flag_hang,
      flag_gyu
    });
  };

  clause.forEach(async ele => {
    let {
      chapter_id,
      article_id,
      clause_number,
      date,
      context
    } = ele;

    let chapId = chapter_id;
    if (chapter_id) {
      chapId = await Chapter.findOne({
        where: {
          law_id: k,
          chapter_number: chapter_id,
        },
        raw: true,
      }).id;
    };

    let artId = article_id;
    if (article_id) {
      artId = await Article.findOne({
        where: {
          law_id: k,
          chapter_id: chapId,
          article_number: article_id,
        },
        raw: true,
      }).id;
    };

    await Clause.create({
      law_id: k,
      chapter_id: chapId,
      article_id: artId,
      clause_number,
      date,
      context,
    })
  })

  subPara.forEach(async ele => {
    let {
      chapter_id,
      article_id,
      clause_id,
      sub_number,
      date,
      context
    } = ele
    let chapId = chapter_id;
    if (chapter_id) {
      chapId = await Chapter.findOne({
        where: {
          law_id: k,
          chapter_number: chapter_id,
        },
        raw: true,
      }).id;
    };

    let artId = article_id;
    if (article_id) {
      artId = await Article.findOne({
        where: {
          law_id: k,
          chapter_id: chapId,
          article_number: article_id,
        },
        raw: true,
      }).id;
    };

    let clId = clause_id
    if (clause_id) {
      clId = await Clause.findOne({
        where: {
          law_id: k,
          chapter_id: chapId,
          article_number: artId,
          clause_number: clause_id
        },
        raw: true,
      }).id;
    };

    await Subparagraph.create({
      law_id: k,
      chapter_id: chapId,
      article_id: artId,
      clause_id: clId,
      sub_number,
      date,
      context,
    })
  })

  item.forEach(async ele => {
    let {
      chapter_id,
      article_id,
      clause_id,
      sub_id,
      item_number,
      date,
      context
    } = ele;


    let chapId = chapter_id;
    if (chapter_id) {
      chapId = await Chapter.findOne({
        where: {
          law_id: k,
          chapter_number: chapter_id,
        },
        raw: true,
      }).id;
    };

    let artId = article_id;
    if (article_id) {
      artId = await Article.findOne({
        where: {
          law_id: k,
          chapter_id: chapId,
          article_number: article_id,
        },
        raw: true,
      }).id;
    };

    let clId = clause_id;
    if (clause_id) {
      clId = await Clause.findOne({
        where: {
          law_id: k,
          chapter_id: chapId,
          article_id: artId,
          clause_number: clause_id,
        },
        raw: true,
      }).id;
    };

    let subId = sub_id;
    if (sub_id) {
      subID = await Subparagraph.findOne({
        where: {
          law_id: k,
          chapter_id: chapId,
          article_id: artId,
          clause_id: clause_id,
          sub_number: sub_id,
        },
        raw: true,
      }).id;
    };

    await Item.create({
      law_id: k,
      chapter_id: chapId,
      article_id: artId,
      clause_id: clId,
      sub_id: subId,
      item_number,
      date,
      context
    })
  })
  await lawNum++
}


let lawNum = 1;
setInterval(init, 10000, lawNum);