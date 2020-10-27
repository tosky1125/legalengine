import React from 'react';
import './ArtcleLink.css';

function ArtcleLink() {
  const law = JSON.parse(localStorage.Law);
  // console.log(law);

  let ArticleLink = law.Chapter;
  console.log(ArticleLink);
  // console.log(JSON.stringify(ArticleLink));

  let Addenda = law.Chapter;
  console.log(Addenda);

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
      };
    } else if (
      chapEle.context &&
      chapEle.context.substring(0, 3).includes('장')
    ) {
      if (!partNum) {
        partNum++;
        result[partNum] = {
          value: null,
          child: {},
        };
      }
      tempChapter = chapEle.context;
      tempSection = null;
      tempSubSection = null;
      chapterNum++;
      result[partNum].child[chapterNum] = {
        value: tempChapter,
        child: {},
      };
    } else if (
      chapEle.context &&
      chapEle.context.substring(0, 3).includes('절')
    ) {
      if (!partNum) {
        partNum++;
        result[partNum] = {
          value: null,
          child: {},
        };
      }
      if (!chapterNum) {
        chapterNum++;
        result[partNum].child[chapterNum] = {
          value: null,
          child: {},
        };
      }
      tempSection = chapEle.context;
      tempSubSection = null;
      sectionNum++;
      result[partNum].child[chapterNum].child[sectionNum] = {
        value: tempSection,
        child: {},
      };
    } else if (
      chapEle.context &&
      chapEle.context.substring(0, 3).includes('관')
    ) {
      if (!partNum) {
        partNum++;
        result[partNum] = {
          value: null,
          child: {},
        };
      }
      if (!chapterNum) {
        chapterNum++;
        result[partNum].child[chapterNum] = {
          value: null,
          child: {},
        };
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
      ] = {
        value: tempSubSection,
      };
    }
    // chapEle.Article && chapEle.Article.map((artEle) => {
    //   artEle.article_title &&
    // });
  });

  // result = (
  //   <div className='articlelink-accordion'>
  //     <input type='checkbox' id='article-contTitle' />
  //     <label htmlFor='article-contTitle'>본문</label>
  //     <div>
  //       {result[1].map((ele, eleIndex) => (
  //         <div key={eleIndex}>
  //           {ele.value ? `${ele.value}` : ele.child.value}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  console.log(result[1]);

  // ArticleLink = (
  //   <div className='artclelink-accordion'>
  //     <input type='checkbox' id='contTitle' />
  //     <label htmlFor='contTitle'>본문</label>
  //     {ArticleLink.forEach((chapEle) => {
  //       if (chapEle.context && chapEle.context.substring(0, 3).includes('편')) {
  //         tempPart = chapEle.context;
  //         tempChapter = null;
  //         tempSection = null;
  //         tempSubSection = null;
  //         result[partNum] = tempPart;
  //         partNum++;
  //       } else if (
  //         chapEle.context &&
  //         chapEle.context.substring(0, 3).includes('장')
  //       ) {
  //         if (!tempPart) {
  //           result[partNum] = null;
  //         }
  //         tempChapter = chapEle.context;
  //         tempSection = null;
  //         tempSubSection = null;
  //         result[partNum][chapterNum] = tempChapter;
  //       } else if (
  //         chapEle.context &&
  //         chapEle.context.substring(0, 3).includes('절')
  //       ) {
  //         if (!tempPart) {
  //           result[partNum] = null;
  //         }
  //         if (!tempChapter) {
  //           result[partNum][chapterNum] = null;
  //         }
  //         tempSection = chapEle.context;
  //         tempSubSection = null;
  //         result[partNum][chapterNum][sectionNum] = tempSection;
  //       } else if (
  //         chapEle.context &&
  //         chapEle.context.substring(0, 3).includes('관')
  //       ) {
  //         if (!tempPart) {
  //           result[partNum] = null;
  //         }
  //         if (!tempChapter) {
  //           result[partNum][chapterNum] = null;
  //         }
  //         if (!sectionNum) {
  //           result[partNum][chapterNum][sectionNum] = null;
  //         }
  //         tempSubSection = chapEle.context;
  //         result[partNum][chapterNum][sectionNum][
  //           subsectionNum
  //         ] = tempSubSection;
  //       }
  //       console.log(result);
  //       return result;
  //     })}
  //   </div>
  // );

  // console.log(result);

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

  return (
    <div>
      <div className='artclelink-contanier'>
        <div className='artclelink-accordion'>
          <input type='checkbox' id='contTitle' />
          <label htmlFor='contTitle'>본문</label>
<<<<<<< HEAD
          
=======
          {/* {result} */}

>>>>>>> 35d013753ee19ec5e68c7ac538c7d2158c6aac79
          <div></div>
          {Addenda}
          {/* {File && (
            <div className='artclelink-formatting'>
              <a href='#file'>서식</a>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ArtcleLink;
