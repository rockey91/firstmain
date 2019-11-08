import React from 'react';
import './App.css';

function getNewsArticles() {
  var xmlHttp = new XMLHttpRequest(), dt = new Date(),
  staticURL = "https://newsapi.org/v2/everything?q=bitcoin&from="+ ( dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate() ) +"&sortBy=publishedAt&apiKey=55d26a8944ee4ee9b4c23a5ae556d1ac";
  xmlHttp.open( "GET", staticURL, false ); // false for synchronous request
  xmlHttp.send( null );
  return JSON.parse(xmlHttp.responseText).articles;
}

class App extends React.Component {
  render() {
    var items = getNewsArticles().map((item, index) => {
      if ( item.urlToImage )
      return (
        <div key={index} className="feed_container">
          <div className="feed_image">
            <img src={item.urlToImage} alt="Thumbnail" />
          </div>
          <div className="feed_text_container">
            <h3 className="feed_title">{item.title}</h3>
            <p className="feed_text">{item.description}</p>
            <p className="feed_source">{item.source.name} - {item.publishedAt}</p>
          </div>
        </div>
      );
      return undefined;
    });
    return (
      <div className="root_container">
        <h1 className="news_feed_header">Newsfeed</h1>
        <div className="main_container">{items}</div>
      </div>
    );
  }
}

export default App;
