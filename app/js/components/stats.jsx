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
      <div className="well well-sm">
        <ul>
          {renderedStats}
        </ul>
      </div>
    );
  }
}

Stats.defaultProps = {
  data: ["378 puppies rescued", "9384 veterinary visits made", "173 adoptions"],
}
