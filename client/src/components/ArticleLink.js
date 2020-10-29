import React from 'react';
import { connect } from 'react-redux';
import * as Law from '../modules/Law';
import * as Related from '../modules/Related';
import './ArticleLink.css';

function ArticleLink(props) {
  const { LawData } = props;
  console.log(LawData);

  // const law2 = LawData.Chapter;
  // console.log(law2);

  // const law = JSON.parse(localStorage.Law);
  // console.log(law);

  let ArticleLink = LawData.Chapter;
  // console.log(ArticleLink);

  // console.log(JSON.stringify(ArticleLink));
  let Addenda = LawData.Chapter;
  // console.log(Addenda);

  let File = LawData.File;
  // console.log(File);

  //편:part 장{ele2Index}절:section 관:sub-section
  const articleUrlfragment = (strFrom) => {
    const str = String(strFrom);
    const artUrl = '#' + '0'.repeat(3) + str;
    return artUrl;
  };

  let tempPart = null;
  let tempChapter = null;
  let tempSection = null;
  let tempSubSection = null;
  let partNum = null;
  let chapterNum = null;
  let sectionNum = null;
  let subSectionNum = null;
  let result = [];

  // console.log(ArticleLink);

  ArticleLink = ArticleLink.map((chapEle) => {
    if (chapEle.context && chapEle.context.substring(0, 3).includes('편')) {
      tempPart = chapEle.context;
      tempChapter = null;
      tempSection = null;
      tempSubSection = null;
      partNum++;
      result[partNum] = {
        value: tempPart,
        article: chapEle.Article,
        child: [],
      };
    } else if (
      chapEle.context &&
      chapEle.context.substring(0, 3).includes('장')
    ) {
      if (!partNum) {
        partNum++;
        result[partNum] = {
          value: null,
          article: null,
          child: [],
        };
      }
      tempChapter = chapEle.context;
      tempSection = null;
      tempSubSection = null;
      chapterNum++;
      result[partNum].child[chapterNum] = {
        value: tempChapter,
        article: chapEle.Article,
        child: [],
      };
    } else if (
      chapEle.context &&
      chapEle.context.substring(0, 3).includes('절')
    ) {
      if (!partNum) {
        partNum++;
        result[partNum] = {
          value: null,
          article: null,
          child: [],
        };
      }
      if (!chapterNum) {
        chapterNum++;
        result[partNum].child[chapterNum] = {
          value: null,
          article: null,
          child: [],
        };
      }
      tempSection = chapEle.context;
      tempSubSection = null;
      sectionNum++;
      result[partNum].child[chapterNum].child[sectionNum] = {
        value: tempSection,
        article: chapEle.Article,
        child: [],
      };
    } else if (
      chapEle.context &&
      chapEle.context.substring(0, 3).includes('관')
    ) {
      if (!partNum) {
        partNum++;
        result[partNum] = {
          value: null,
          article: null,
          child: [],
        };
      }
      if (!chapterNum) {
        chapterNum++;
        result[partNum].child[chapterNum] = {
          value: null,
          article: null,
          child: [],
        };
      }
      if (!sectionNum) {
        sectionNum++;
        result[partNum].child[chapterNum].child[sectionNum] = {
          value: null,
          article: null,
          child: [],
        };
      }
      tempSubSection = chapEle.context;
      subSectionNum++;
      result[partNum].child[chapterNum].child[sectionNum].child[
        subSectionNum
      ] = {
        value: tempSubSection,
        article: chapEle.Article,
        child: [],
      };
    } else if (!chapEle.chapter_id) {
      partNum++;
      result[partNum] = {
        value: tempPart,
        article: chapEle.Article,
        child: [],
      };
    }
  });

  // console.log(ArticleLink);
  // console.log(Array.isArray(result));
  // console.log(result);

  result = (
    <div className='articlelink-accordion'>
      <input type='checkbox' id='contTitle' />
      <label htmlFor='contTitle'>본문</label>
      <div>
        {result.map((ele1, ele1Index) => (
          <div>
            {ele1.value &&
              ele1.article.map((artele1) => (
                <div>
                  <a href={articleUrlfragment(artele1.article_id)}>
                    <div>
                      <span className='articlelink-article-title'>
                        {artele1.article_title}
                      </span>
                      <span className='date'>{artele1.article_date}</span>
                    </div>
                  </a>
                </div>
              ))}
            <input type='checkbox' id={`${ele1Index}-part`} />
            {ele1.value && (
              <label htmlFor={`${ele1Index}-part`}>{ele1.value}</label>
            )}
            <div>
              {ele1.child.length !== 0 &&
                ele1.child.map((ele2, ele2Index) => (
                  <div>
                    <input type='checkbox' id={`${ele2Index}-chapter`} />
                    {ele2.value && (
                      <label htmlFor={`${ele2Index}-chapter`}>
                        {ele2.value}
                      </label>
                    )}
                    {ele2.child.length !== 0 &&
                      ele2.child.map((ele3, ele3Index) => (
                        <div>
                          <input type='checkbox' id={`${ele3Index}-section`} />
                          {ele3.value && (
                            <label htmlFor={`${ele3Index}-section`}>
                              {ele3.value}
                            </label>
                          )}
                          {ele3.child.length !== 0 &&
                            ele3.child.map((ele4, ele4Index) => (
                              <div>
                                <input
                                  type='checkbox'
                                  id={`${ele4Index}-subsection`}
                                />
                                {ele4.value && (
                                  <label htmlFor={`${ele4Index}-subsection`}>
                                    {ele4.value}
                                  </label>
                                )}
                                {ele4.article !== null &&
                                  ele4.article.map((artele4) => (
                                    <div>
                                      <a
                                        href={articleUrlfragment(
                                          artele4.article_id
                                        )}
                                      >
                                        <span>
                                          <span className='articlelink-article-title'>
                                            {artele4.article_title}{' '}
                                          </span>
                                          <span className='date'>
                                            {artele4.article_date}
                                          </span>
                                        </span>
                                      </a>
                                    </div>
                                  ))}
                              </div>
                            ))}
                          {ele3.article !== null &&
                            ele3.article.map((artele3) => (
                              <div>
                                <a
                                  href={articleUrlfragment(artele3.article_id)}
                                >
                                  <span>
                                    <span className='articlelink-article-title'>
                                      {artele3.article_title}
                                    </span>
                                    <span className='date'>
                                      {artele3.article_date}
                                    </span>
                                  </span>
                                </a>
                              </div>
                            ))}
                        </div>
                      ))}
                    {ele2.article !== null &&
                      ele2.article.map((artele2) => (
                        <div>
                          <a href={articleUrlfragment(artele2.article_id)}>
                            <div>
                              <span className='articlelink-article-title'>
                                {artele2.article_title}{' '}
                              </span>
                              <span className='date'>
                                {artele2.article_date}
                              </span>
                            </div>
                          </a>
                        </div>
                      ))}
                  </div>
                ))}
              {ele1.article !== null &&
                ele1.article.map((artele1) => (
                  <div>
                    <a href={articleUrlfragment(artele1.article_id)}>
                      <div>
                        <span className='articlelink-article-title'>
                          {artele1.article_title}
                        </span>
                        <span className='date'>{artele1.article_date}</span>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  //부칙 Addenda
  const addendaUrlfragment = (strFrom) => {
    const str = String(strFrom);
    const addendaUrl = '#' + '0'.repeat(1) + str;
    return addendaUrl;
  };

  Addenda = (
    <div>
      <input type='checkbox' id='addenda-contTitle' />
      <label htmlFor='addenda-contTitle'>부칙</label>
      <div>
        {Addenda.map((chapEle, chapEleIndex) => (
          <div key={chapEleIndex}>
            {chapEle.chapter_id > 6 && (
              <a
                href={addendaUrlfragment(chapEle.chapter_id)}
                className='articlelink-article-title'
              >
                {chapEle.date}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const fileUrlfragment = (strFrom) => {
    const str = String(strFrom);
    const addendaUrl = '#form' + str;
    return addendaUrl;
  };

  File = (
    <div>
      <input type='checkbox' id='file-contTitle' />
      <label htmlFor='file-contTitle'>서식</label>
      <div>
        {File.map((fileEle, fileEleIndex) => (
          <div key={fileEleIndex}>
            <a
              href={fileUrlfragment(fileEle.id)}
              className='articlelink-file-title'
            >
              {fileEle.context}
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  if (LawData.File.length !== 0) {
    return (
      <div>
        <div className='articlelink-contanier'>
          {result}
          {Addenda}
          {File}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className='articlelink-contanier'>
          {result}
          {Addenda}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    LawData: state.Law.Law,
    Related: state.Related.Related,
  }),
  (dispatch) => ({
    Law: (data) => dispatch(Law.Law(data)),
    Related: (data) => dispatch(Related.Related(data)),
  })
)(ArticleLink);
