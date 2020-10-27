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

  //편:part 장:chapter 절:section 관:sub-section

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
  let result = {};

  ArticleLink = ArticleLink.map((chapEle) => {
    if (chapEle.context && chapEle.context.substring(0, 3).includes('편')) {
      tempPart = chapEle.context;
      tempChapter = null;
      tempSection = null;
      tempSubSection = null;
      partNum++;
      result[partNum] = {
        value: tempPart,
        child: {},
        article: chapEle.Article,
      };
    } else if (
      chapEle.context &&
      chapEle.context.substring(0, 3).includes('장')
    ) {
      if (!partNum) {
        partNum++;
        result[partNum] = { value: null, child: {} };
      }
      tempChapter = chapEle.context;
      tempSection = null;
      tempSubSection = null;
      chapterNum++;
      result[partNum].child[chapterNum] = {
        value: tempChapter,
        child: {},
        article: chapEle.Article,
      };
    } else if (
      chapEle.context &&
      chapEle.context.substring(0, 3).includes('절')
    ) {
      if (!partNum) {
        partNum++;
        result[partNum] = { value: null, child: {} };
      }
      if (!chapterNum) {
        chapterNum++;
        result[partNum].child[chapterNum] = { value: null, child: {} };
      }
      tempSection = chapEle.context;
      tempSubSection = null;
      sectionNum++;
      result[partNum].child[chapterNum].child[sectionNum] = {
        value: tempSection,
        child: {},
        article: chapEle.Article,
      };
    } else if (
      chapEle.context &&
      chapEle.context.substring(0, 3).includes('관')
    ) {
      if (!partNum) {
        partNum++;
        result[partNum] = { value: null, child: {} };
      }
      if (!chapterNum) {
        chapterNum++;
        result[partNum].child[chapterNum] = { value: null, child: {} };
      }
      if (!sectionNum) {
        sectionNum++;
        result[partNum].child[chapterNum].child[sectionNum] = {
          value: null,
          child: {},
        };
      }
      tempSubSection = chapEle.context;
      subSectionNum++;
      result[partNum].child[chapterNum].child[sectionNum].child[
        subSectionNum
      ] = { value: tempSubSection };
    }
  });

  // result = (
  //   <div className='articlelink-accordion'>
  //     <input type='checkbox' id='article-contTitle' />
  //     <label htmlFor='article-contTitle'>본문</label>
  //     <div>
  //       {result.map((ele, eleIndex) => (
  //         <div key={eleIndex}>
  //           <div>
  //             <input type='checkbox' id='part-contTitle' />
  //             <label htmlFor='part-contTitle'>{ele.value}</label>
  //             <div>
  //               <input type='checkbox' id='chapter-conTitle' />
  //               <label htmlFor='chapter-conTitle'>{ele.child.value}</label>
  //               <div>
  //                 <input type='checkbox' id='section-conTitle' />
  //                 <label htmlFor='section-conTitle'>
  //                   {ele.child.child.value}
  //                 </label>
  //                 <div>
  //                   <input type='checkbox' id='subsection-conTitle' />
  //                   <label htmlFor='subsection-conTitle'>
  //                     {ele.child.child.child.value}
  //                   </label>
  //                   <div>
  //                     {ele.article && (
  //                       <a
  //                         href={articleUrlfragment(ele.article.article_id)}
  //                         className='articlelink-article-title'
  //                       >
  //                         {(ele.article.article_title, ele.article.date)}
  //                       </a>
  //                     )}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  console.log(result);

  // ArtcleLink = (
  //   <div className='articlelink-accordion'>
  //     <input type='checkbox' id='contTitle' />
  //     <label htmlFor='contTitle'>본문</label>
  //     <div>
  //       <div>
  //         {ArtcleLink.map((chapEle, chapEleIndex) => (
  //           <div key={chapEleIndex}>
  //             <div>
  //               <input type='checkbox' id='part-contTitle' />
  //               {chapEle.context.substring(0, 3).includes('편') && (
  //                 <label htmlFor='part-contTitle'>
  //                   <span
  //                     type='checkbox'
  //                     id='part-contTitle'
  //                     className='artclelink-title'
  //                   >
  //                     {chapEle.context.substring(0, 3).includes('편') &&
  //                       chapEle.context}
  //                     <span className='artclelink-date'>
  //                       {chapEle.context.substring(0, 3).includes('편') &&
  //                         chapEle.date}
  //                     </span>
  //                   </span>
  //                 </label>
  //               )}
  //             </div>
  //             <div>
  //               {ArtcleLink.map((chapEle, chapEleIndex) => (
  //                 <div key={chapEleIndex}>
  //                   <input type='checkbox' id='chapter-contTitle' />
  //                   {chapEle.context.substring(0, 3).includes('장') && (
  //                     <label htmlFor='chapter-contTitle'>
  //                       <span
  //                         type='checkbox'
  //                         id='chapter-contTitle'
  //                         className='artclelink-title'
  //                       >
  //                         {chapEle.context.substring(0, 3).includes('장') &&
  //                           chapEle.context}
  //                         <span className='artclelink-date'>
  //                           {chapEle.context.substring(0, 3).includes('장') &&
  //                             chapEle.date}
  //                         </span>
  //                       </span>
  //                     </label>
  //                   )}
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

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
        <div className='artclelink-accordion'>
          <input type='checkbox' id='contTitle' />
          <label htmlFor='contTitle'>본문</label>
          {/* {result} */}

          {Addenda}
          {File}
        </div>
      </div>
    </div>
  );
}

export default ArtcleLink;
