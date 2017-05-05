import React from 'react';

export default class Stats extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const renderedStats = this.props.data.map((fact) =>
      <li key={fact.id}>{fact.body}</li>
    );

    return (
    <div>
      <header className="component-header">Stats</header>
      <div className="well well-sm shadow-box">
        <ul>
          {renderedStats}
        </ul>
        <div className="well well-sm stat-graphic-container">
          <img src={window.location.origin + "/" + this.props.imgsrc} className="stat-graphic" alt="Stats image"/>
        </div>
      </div>
    </div>
    );
  }
}

Stats.defaultProps = {
  data: [{id:1, body:"378 puppies rescued"}, {id:2,body:"9384 veterinary visits made"}, {id:3,body:"173 adoptions"}],
  imgsrc: 'chart.jpg'
};
