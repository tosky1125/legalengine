// import React from 'react';
// import './ArtcleLink.css';

// function ArtcleLink() {
//   const law = JSON.parse(localStorage.Law);
//   // console.log(law);

//   let { Chapter } = law;
//   // console.log(Chapter);

//   let ArticleLink = law.Chapter;
//   console.log(ArticleLink);

//   let Addenda = law.Chapter;
//   // console.log(Addenda);

//   const articleUrlfragment = (strFrom) => {
//     const str = String(strFrom);
//     const artUrl = '#' + '0'.repeat(3) + str;
//     return artUrl;
//   };

//   //편:part 장:chapter 절:section 관:sub-section

//   // const chapSlicer = (str) => {
//   //   const temp = str.slice(2);
//   //   let chapSlice;
//   //   for (let i = 0; i < temp.length; i++) {
//   //     if (temp[i] === ':') {
//   //       chapSlice = `${temp.slice(0, i)}:0`;
//   //     }
//   //   }
//   //   return chapSlice;
//   // };

//   // const subChapSlicer = (str, sub) => {
//   //   const temp = str.slice(2);
//   //   let subChapSlice;
//   //   for (let i = 0; i < temp.length; i++) {
//   //     if (temp[i] === ':') {
//   //       subChapSlice = `${temp.slice(0, i)}:${sub}`;
//   //     }
//   //   }
//   //   return subChapSlice;
//   // };

//   let tempPart;
//   let tempChapter;
//   let tempSection;
//   let tempSubSection;
//   let tempArticle;
//   let result = {};

//   ArticleLink = (
//     <div className='artclelink-accordion'>
//       <input type='checkbox' id='contTitle' />
//       <label htmlFor='contTitle'>본문</label>
//       <div>
//         <input type='checkbox' id='part-contTitle' />
//         {ArticleLink.forEach((ele) => {
//           if (ele.context.substring(0, 3).includes('편')) {
//             tempPart = ele;
//             tempChapter = null;
//             tempSection = null;
//             tempSubSection = null;
//             tempArticle = null;
//             result[ele] = new Object();
//           } else if (ele.context.substring(0, 3).includes('장')) {
//             if (!tempPart) {
//               result[tempPart] = {};
//             }
//             tempChapter = ele;
//             tempSection = null;
//             tempSubSection = null;
//             tempArticle = null;
//             result[tempPart][tempChapter] = new Object();
//           } else if (ele.context.substring(0, 3).includes('절')) {
//             if (!tempPart) {
//               result[tempPart] = {};
//             }
//             if (!tempChapter) {
//               result[tempPart][tempChapter] = {};
//             }
//             tempSection = ele;
//             tempPart = null;
//             tempChapter = null;
//             tempSubSection = null;
//             tempArticle = null;
//             result[tempPart][tempChapter][ele] = new Object();
//           }
//         })}
//       </div>
//     </div>
//   );

//   // ArtcleLink = (
//   //   <div className='artclelink-accordion'>
//   //     <input type='checkbox' id='contTitle' />
//   //     <label htmlFor='contTitle'>본문</label>
//   //     <div>
//   //       <div>
//   //         {ArtcleLink.map((chapEle, chapEleIndex) => (
//   //           <div key={chapEleIndex}>
//   //             <div>
//   //               <input type='checkbox' id='part-contTitle' />
//   //               {chapEle.context.substring(0, 3).includes('편') && (
//   //                 <label htmlFor='part-contTitle'>
//   //                   <span
//   //                     type='checkbox'
//   //                     id='part-contTitle'
//   //                     className='artclelink-title'
//   //                   >
//   //                     {chapEle.context.substring(0, 3).includes('편') &&
//   //                       chapEle.context}
//   //                     <span className='artclelink-date'>
//   //                       {chapEle.context.substring(0, 3).includes('편') &&
//   //                         chapEle.date}
//   //                     </span>
//   //                   </span>
//   //                 </label>
//   //               )}
//   //             </div>
//   //             <div>
//   //               {ArtcleLink.map((chapEle, chapEleIndex) => (
//   //                 <div key={chapEleIndex}>
//   //                   <input type='checkbox' id='chapter-contTitle' />
//   //                   {chapEle.context.substring(0, 3).includes('장') && (
//   //                     <label htmlFor='chapter-contTitle'>
//   //                       <span
//   //                         type='checkbox'
//   //                         id='chapter-contTitle'
//   //                         className='artclelink-title'
//   //                       >
//   //                         {chapEle.context.substring(0, 3).includes('장') &&
//   //                           chapEle.context}
//   //                         <span className='artclelink-date'>
//   //                           {chapEle.context.substring(0, 3).includes('장') &&
//   //                             chapEle.date}
//   //                         </span>
//   //                       </span>
//   //                     </label>
//   //                   )}
//   //                 </div>
//   //               ))}
//   //             </div>
//   //           </div>
//   //         ))}
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   Chapter = Chapter.map((chapEle, chapEleIndex) => (
//     <div className='artlcelink-accordion' key={chapEleIndex}>
//       <input type='checkbox' id={`${chapEle.id}-contTitle`} />
//       <label htmlFor={`${chapEle.id}-contTitle`}>
//         <span className='artclelink-title'>{chapEle.context}</span>
//         <span className='artclelink-date'>{chapEle.date}</span>
//       </label>
//       <div>
//         <p>
//           {chapEle.Article &&
//             chapEle.Article.map((artEle, artEleIndex) => (
//               <div key={artEleIndex}>
//                 {artEle.article_title && (
//                   <a
//                     href={articleUrlfragment(artEle.article_id)}
//                     className='artclelink-article-title'
//                   >
//                     {artEle.article_title}
//                   </a>
//                 )}
//               </div>
//             ))}
//         </p>
//       </div>
//     </div>
//   ));

//   //부칙 Addenda
//   const addendaUrlfragment = (strFrom) => {
//     const str = String(strFrom);
//     const addendaUrl = '#' + '0'.repeat(1) + str;
//     return addendaUrl;
//   };

//   Addenda = (
//     <div className='artclelink-accordion'>
//       <input type='checkbox' id='addenda-contTitle' />
//       <label htmlFor='addenda-contTitle'>부칙</label>
//       <div>
//         {Addenda.map((chapEle, chapEleIndex) => (
//           <div key={chapEleIndex}>
//             {chapEle.chapter_id > 6 && (
//               <a
//                 href={addendaUrlfragment(chapEle.chapter_id)}
//                 className='artclelink-article-title'
//               >
//                 {(chapEle.context, chapEle.date)}
//               </a>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <div className='artclelink-contanier'>
//         {ArticleLink}
//         {Addenda}
//         {/* {Chapter} */}

//         {/* {File && (
//           <div className='artclelink-formatting'>
//             <a href='#file'>서식</a>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// }

// export default ArtcleLink;
