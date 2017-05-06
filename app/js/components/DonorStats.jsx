import React from 'react';
import Chart from 'chart.js';

export default class DonorStats extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};

    this.fetchData = this.fetchData.bind(this);
    this.fetchData();
  }

  // retrieve and update donor statistics
  fetchData() {
    $.get('/donor/' + this.props.donor + '/stats', function(data, status) {
      if (status === 'success') {
        // we succesfully retrieved some data so update state
        this.setState({
          labels: data.labels,
          data: data.data,
        });
      } else {
        // todo error handling
      }
    }.bind(this));
  }

  // re render the chart when the state changes
  componentDidUpdate() {
    new Chart(document.getElementById('donor-stats'), {
      type: 'bar',
      data: {
        labels: this.state.labels,
        datasets: [{
          label: 'Donor Statistics',
          data: this.state.data,
          backgroundColor: [
            // TODO: THIS IS A HACK
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
        }],
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Donations by Category',
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Amount (Dollars)',
            },
            ticks: {
              beginAtZero: true,
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Category',
            },
          }],
        },
      },
    });
  }

  render() {
    return (
      <div>
        <header className="component-header">Donor Statistics</header>
        <div className="well well-sm shadow-box">
          <canvas id="donor-stats"></canvas>
        </div>
      </div>
    );
  }
}
