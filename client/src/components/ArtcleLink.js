import React from 'react';
import './ArtcleLink.css';

function ArtcleLink() {
  const law = JSON.parse(localStorage.Law);
  console.log(law);

  let { Chapter } = law;
  console.log(Chapter);

  const artUrlfragment = (strFrom) => {
    const str = String(strFrom);
    if (str.includes(':')) {
      const artUrl = '#' + '0'.repeat(2) + str;
      return artUrl;
    }
  };

  Chapter = Chapter.map((chapEle, chapEleIndex) => (
    <div key={chapEleIndex}>
      <span className='artclelink-title'>{chapEle.context}</span>
      <span className='artclelink-title'>{chapEle.date}</span>
      {chapEle.Article &&
        chapEle.Article.map((artEle, artEleIndex) => (
          <div key={artEleIndex}>
            <a
              href={artUrlfragment(artEle.article_id)}
              className='artclelink-article-title'
            >
              {artEle.article_title}&nbsp;&nbsp;
            </a>
          </div>
        ))}
    </div>
  ));

  return (
    <div>
      <div className='artclelink-contanier'>{Chapter}</div>
    </div>
  );
}

export default ArtcleLink;
