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
const revision = require('../helpers/testR');

const init = async (spec, k) => {
  //db update
  const a = k;
  const {
    html,
    file,
    chapter,
  } = spec;
  for (chapt of chapter) {
    const {
      chapter_number,
      date,
      context,
      article
    } = chapt;
    const chap = await Chapter.create({
      law_id: a,
      chapter_id: chapter_number,
      date,
      context,
    });
    if (article) {
      for (art of article) {
        const {
          article_number,
          title,
          date,
          cont_date,
          context,
          flag_pan,
          flag_yeon,
          flag_hang,
          flag_gyu,
          clause,
        } = art;

        const ar = await Article.create({
          law_id: a,
          chapter_id: chap.id,
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
        if (clause) {
          for (cla of clause) {
            const {
              clause_number,
              date,
              context,
              subPara,
            } = cla;

            const cl = await Clause.create({
              law_id: a,
              chapter_id: chap.id,
              article_id: ar.id,
              clause_id: clause_number,
              date,
              context,
            });

            if (subPara) {
              for (sub of subPara) {
                const {
                  sub_number,
                  date,
                  context,
                  item,
                } = sub;

                const su = await Subparagraph.create({
                  law_id: a,
                  chapter_id: chap.id,
                  article_id: ar.id,
                  clause_id: cl.id,
                  sub_id: sub_number,
                  date,
                  context,
                });
                console.log(item);
                if (item) {
                  for (it of item) {
                    let {
                      item_number,
                      date,
                      context,
                    } = it;

                    await Item.create({
                      law_id: a,
                      chapter_id: chap.id,
                      article_id: ar.id,
                      clause_id: cl.id,
                      sub_id: su.id,
                      item_id: item_number,
                      date,
                      context,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  for (i of file) {
    const {
      context,
      hwp,
      pdf,
      date,
    } = i;
    await File.create({
      law_id: a,
      context,
      hwp,
      pdf,
      date,
    });
  }

  await HTML.create({
    law_id: a,
    tag: html,
  });
}

module.exports = init;