import React from 'react';

export default class Stats extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const renderedStats = this.props.data.map((fact) =>
      <li>{fact}</li>
    );

    return (
    <div>
      <header className="component-header">Stats</header>
      <div className="well well-sm">
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
  data: ["378 puppies rescued", "9384 veterinary visits made", "173 adoptions"],
  imgsrc: 'chart.jpg'
};
