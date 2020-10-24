import React from 'react';
import './ArtcleLink.css';

function ArtcleLink() {
  const law = JSON.parse(localStorage.Law);
  console.log(law);

  let { Chapter } = law;
  console.log(Chapter);

  const artUrlfragment = (strFrom) => {
    const str = String(strFrom);
    const artUrl = '#' + '0'.repeat(3) + str;
    return artUrl;
  };

  Chapter = Chapter.map((chapEle, chapEleIndex) => (
    <div className='artlcelink-accordion' key={chapEleIndex}>
      <input type='checkbox' id={`${chapEle.id}-contTitle`} />
      <label for={`${chapEle.id}-contTitle`}>
        <span className='artclelink-title'>{chapEle.context}</span>
        <span className='artclelink-title'>{chapEle.date}</span>
      </label>
      <div>
        <p>
          {chapEle.Article &&
            chapEle.Article.map((artEle, artEleIndex) => (
              <div key={artEleIndex}>
                <a
                  href={artUrlfragment(artEle.article_id)}
                  className='artclelink-article-title'
                >
                  {artEle.article_title}
                </a>
              </div>
            ))}
        </p>
      </div>
    </div>
  ));

  return (
    <div>
      <div className='artclelink-contanier'>{Chapter}</div>
    </div>
  );
}

export default ArtcleLink;
