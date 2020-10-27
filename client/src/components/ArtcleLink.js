import React from 'react';
import './ArtcleLink.css';
import queryString from 'query-string';

function ArtcleLink() {
  const law = JSON.parse(localStorage.Law);
  console.log(law);

  let ArticleLink = law.Chapter;
  console.log(ArticleLink);
  // console.log(JSON.stringify(ArticleLink));

  let Addenda = law.Chapter;
  // console.log(Addenda);

  let File = law.File;
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
  let tempArticle = null;
  let partNum = null;
  let chapterNum = null;
  let sectionNum = null;
  let subSectionNum = null;
  let result = [];

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
    }
  });

  console.log(result);

  result = (
    <div className='articlelink-accordion'>
      <input type='checkbox' id='contTitle' />
      <label htmlFor='contTitle'>본문</label>
      <div>
        {result.map((ele1, ele1Index) => (
          <div>
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
                                {ele4.article.length !== 0 &&
                                  ele4.article.map((artele4) => (
                                    <a
                                      href={articleUrlfragment(
                                        artele4.article_id
                                      )}
                                    >
                                      <div>
                                        <span className='artclelink-article-title'>
                                          {artele4.article_title}{' '}
                                        </span>
                                        <span className='date'>
                                          {artele4.article_date}
                                        </span>
                                      </div>
                                    </a>
                                  ))}
                              </div>
                            ))}
                          {ele3.article !== null &&
                            ele3.article.map((artele3) => (
                              <a href={articleUrlfragment(artele3.article_id)}>
                                <div>
                                  <span className='artclelink-article-title'>
                                    {artele3.article_title}{' '}
                                  </span>
                                  <span className='date'>
                                    {artele3.article_date}
                                  </span>
                                </div>
                              </a>
                            ))}
                        </div>
                      ))}
                    {ele2.article !== null &&
                      ele2.article.map((artele2) => (
                        <a href={articleUrlfragment(artele2.article_id)}>
                          <div>
                            <span className='artclelink-article-title'>
                              {artele2.article_title}{' '}
                            </span>
                            <span className='date'>{artele2.article_date}</span>
                          </div>
                        </a>
                      ))}
                  </div>
                ))}
              {ele1.article !== null &&
                ele1.article.map((artele1) => (
                  <a href={articleUrlfragment(artele1.article_id)}>
                    <div>
                      <span className='artclelink-article-title'>
                        {artele1.article_title}{' '}
                      </span>
                      <span className='date'>{artele1.article_date}</span>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  console.log(result);

  //부칙 Addenda
  const addendaUrlfragment = (strFrom) => {
    const str = String(strFrom);
    const addendaUrl = '#' + '0'.repeat(1) + str;
    return addendaUrl;
  };

  Addenda = (
    <div className='artclelink-accordion'>
      <input type='checkbox' id='addenda-contTitle' />
      <label htmlFor='addenda-contTitle'>부칙</label>
      <div>
        {Addenda.map((chapEle, chapEleIndex) => (
          <div key={chapEleIndex}>
            {chapEle.chapter_id > 6 && (
              <a
                href={addendaUrlfragment(chapEle.chapter_id)}
                className='artclelink-article-title'
              >
                {(chapEle.context, chapEle.date)}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  File = (
    <div className='file-container'>
      <a href='#file' className='articlelink-file-title'>
        서식
      </a>
    </div>
  );

  return (
    <div>
      <div className='artclelink-contanier'>
        {result}
        {Addenda}
        {File}
      </div>
    </div>
  );
}

export default ArtcleLink;
