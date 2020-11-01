const {
  format,
} = require('date-fns');
const totalData = require('../searchNested');
const {
  Op,
} = require('sequelize');
const diff = require('./diff');
const {
  Law,
  Article,
  Clause,
  Subparagraph,
  Item,
} = require('../models/index');
const revision = require('../testR');
const htmlMaker = require('./tagBuild');

const regex1 = /(<([^>]+)>)/gi;
const regex2 = /null/gi;
const regex3 = /\s+/g;

const contDiff = async () => {
  const law = await totalData(k);
  const oldLaw = await getData(law.Law);

  if (oldLaw) {
    const {
      promulgation_date,
      number,
      enforcement_date
    } = oldLaw;
    const dateForm = format(new Date(law.Law.promulgation_date), 'yyyy. M. d.');
    for (chapEle of law.Law.Chapter) {
      let newArtCount = 0;
      for (artEle of chapEle.Article) {
        
        if (artEle.cont_date && artEle.cont_date.includes('신설') && artEle.cont_date.include(dateForm)) {
          newArtCount -= 1;
        }
        let artNum = typeof artIdToNum(artEle.article_id) === 'number' ? `${artIdToNum(artEle.article_id) + newArtCount}:${artEle.article_id.slice(-1)}` : artEle.article_id;
        if (artEle.cont_date && artEle.cont_date.includes('개정') && artEle.cont_date.includes(dateForm)) {
          artEle.context = artEle.context.replace(regex1,'').replace(regex3, ' ')
          let contCheck = await checkRevision(number, enforcement_date, artNum);
          contCheck = contCheck.article && contCheck.article.context ? contCheck.article.context.replace(regex1, '').replace(regex2, '').replace(regex3, ' ') : null;
          artEle.context = contCheck && artEle.context ? diff(contCheck, artEle.context).replace(regex2, '') : artEle.context;
          let d = await Article.update({
            context: artEle.context
          }, {
            where: {
              id: artEle.id
            }
          });
          
        }
        let newClaCount = 0;
        for (claEle of artEle.Clause) {
          if (claEle.date && claEle.date.includes('신설') && claEle.date.includes(dateForm)) {
            newClaCount -= 1;
          }
          const claNum = Number(claEle.clause_id) + newClaCount;
          if (claEle.date && claEle.date.includes('개정') && claEle.date.includes(dateForm)) {
            claEle.context = claEle.context.replace(regex1,'').replace(regex3, ' ')
            let contCheck = await checkRevision(number, enforcement_date, artNum, claNum);
            contCheck = contCheck.clause && contCheck.clause.context ? contCheck.clause.context.replace(regex1, '').replace(regex2, '').replace(regex3, ' ') : null;
            claEle.context = contCheck && claEle.context ? diff(contCheck, claEle.context).replace(regex2, '') : claEle.context;
            let c = await Clause.update({
              context: claEle.context
            }, {
              where: {
                id: claEle.id
              }
            });          
          }
          let newSubCount = 0;
          for (subEle of claEle.subPara) {
            if (subEle.date && subEle.date.includes('신설') && subEle.date.includes(dateForm)) {
              newClaCount -= 1;
            }
            const subNum = Number(subEle.sub_id) + newSubCount;
            if (subEle.date && subEle.date.includes('개정') && subEle.date.includes(dateForm)) {
              subEle.context = subEle.context.replace(regex1,'').replace(regex3, ' ')
              let contCheck = await checkRevision(number, enforcement_date, artNum, claNum, subNum);
              contCheck = contCheck.sub && contCheck.sub.context ? contCheck.sub.context.replace(regex1, '').replace(regex2, '').replace(regex3, ' ') : null;
              subEle.context = contCheck && subEle.context ? diff(contCheck, subEle.context).replace(regex2, '') : subEle.context;
              let b = await Subparagraph.update({
                context: subEle.context
              }, {
                where: {
                  id: subEle.id
                }
              })
              
            }
            let newItemCount = 0;
            for (itEle of subEle.Item) {
              if (itEle.date && itEle.date.includes('신설') && itEle.date.includes(dateForm)) {
                newItemCount -= 1;
              }
              const itNum = Number(itEle.item_id) + newItemCount;
              if (itEle.date && itEle.date.includes('개정') && itEle.date.includes(dateForm)) {
                itEle.context = itEle.context.replace(regex1,'').replace(regex3, ' ')
                let contCheck = await checkRevision(number, enforcement_date, artNum, claNum, subNum, itNum);
                contCheck = contCheck.item && contCheck.item.context ? contCheck.item.context.replace(regex1, '').replace(regex2, '').replace(regex3, ' ') : null;
                itEle.context = contCheck && itEle.context ? diff(contCheck, itEle.context).replace(regex2, '') : context;
                let a = await Item.update({
                  context: itEle.context
                }, {
                  where: {
                    id: itEle.id
                  }
                })
                
              }
            }
            newItemCount = 0;
          }
          newSubCount = 0;
        }
        newClaCount = 0;
      }
      newArtCount = 0;
    }
  }
  
  await htmlMaker(k);
  k += 1;
  await contDiff();
}

let k = 1;


const getData = async (data) => {
  const justBefore = await Law.findOne({
    where: {
      refined_name: data.refined_name,
      enforcement_date: {
        [Op.lt]: data.enforcement_date,
      },
    },
    raw: true,
  });
  const result = justBefore ? justBefore : null;
  return result;
}

const checkRevision = async (law_number, law_eDate, article_id, clause_id = null, sub_id = null, item_id = null) => {
  const result = await revision(law_number,
    law_eDate,
    article_id,
    clause_id,
    sub_id,
    item_id);
  return result;
};


const artIdToNum = (artId) => {
  const str = artId;
  if (artId === null) return null;
  if (Number(artId)) return artId;
  let result;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ':') {
      result = str.slice(0, i);
    }
  }
  return Number(result);
}

contDiff();