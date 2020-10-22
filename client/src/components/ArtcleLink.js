import React from 'react';

function ArtcleLink() {
  const law = JSON.parse(localStorage.Law);
  console.log(law);

  let { Chapter } = law;
  console.log(Chapter);

  // Chapter = Chapter.map((chapEle.chapEleIndex) => (
  //   <div key={chapEleIndex}>
  //     <h4>{chapEle.context}</h4>
  //     {chapEle.Article &&
  //       chapEle.Article.map((artEle, artEleIndex) => (
  //         <div key={artEleIndex}>
  //           <h5>{artEle.artcle_title}</h5>
  //         </div>
  //       ))}
  //   </div>
  // ));

  return (
    <div>
      <div className='article-link'>test</div>
    </div>
  );
}

export default ArtcleLink;
