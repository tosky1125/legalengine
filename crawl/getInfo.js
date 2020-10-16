const {
  state,
  chapSlice,
  arSlice
} = require('./function');
const {
  Law,
  Chapter,
  Article,
  Clause,
  Subparagraph,
  Item,
} = require('../models/index');
const {
  spec
} = require('./getBrowser')

const getInfo = async () => {
  const {
    chapter,
    article
  } = await spec();


  console.log(chapter);
  
}

getInfo();