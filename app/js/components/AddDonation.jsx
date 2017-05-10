import React from 'react';

import SearchCharityList from './SearchCharityList.jsx';

export default class AddDonation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        keyWord:''
    }
    this.Submit = this.Submit.bind(this);
  }

  Submit(event){
      event.preventDefault();
      this.props.handleSubmit();
  }

  getData(keyWord) {
      const search = this;
      // console.log(keyWord);
      $.get('/searchCharityShorted', {keyWord: keyWord}, function(data, status) {
          if (status === 'success') {
              search.setState({items: data});
          } else {
              console.log('!!'+status);
          }
      });
  }

  changeText(text) {
    this.refs.text.value = text;
    this.setState({items: []});
  }

  filterList(event) {
      if(event.target.value !== "") {
          var updatedList = [];
          this.getData(event.target.value.toLowerCase());
          updatedList = this.state.items;
          this.setState({items: updatedList});
      } else {
          this.setState({items: []});
      }
  }
  
  render(){
    return (
      <div className="well well-sm shadow-box">
        <form onSubmit={this.Submit}>
          <div className="form-group">
            <label htmlFor="name">Charity Name:</label>
            <input type="text" className="form-control"
                   id="name"
                   ref="text"
                   onChange={this.filterList.bind(this)}
            />
            <SearchCharityList items={this.state.items} text={this.changeText.bind(this)}/>
          </div>
          <div className="form-group">
            <label htmlFor="public">Privacy:</label>
            <select id="public" className="form-control">
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <div className="input-group">
              <div className="input-group-addon">$</div>
                <input type="number" className="form-control" id="amount"/>
              <div className="input-group-addon">.00</div>
            </div>
          </div>
          <div className="form-group form-end">
            <button 
              type="submit" 
              className="btn btn-primary full-width"
            >
              Record Donation
            </button>
          </div>
        </form>
      </div>
    );
  }
}
