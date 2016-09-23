import React from 'react';
import moment from 'moment';

export default React.createClass({
  getInitialState: function() {
    return {
      currYear: moment().format('YYYY'),
      currMonth: moment().format('MM'),
      currDay: moment().format('DD'),
    }
  },
  getBirthdate: function(e) {
    e.preventDefault();
    let currDate = new Date();

    let stringBirthday = String(this.refs.year.value) + String(this.refs.month.value) + String(this.refs.day.value);
    let momentAge = moment(stringBirthday, 'YYYYMMMMDD').fromNow();

    let sliceAt = momentAge.indexOf(' ago');
    momentAge = momentAge.slice(0, sliceAt);

    if (momentAge.indexOf(' year')) {
      let sliceYears = momentAge.indexOf(' year');
      momentAge = momentAge.slice(0, sliceYears);
    }

    let currYear = moment(currDate).format('YYYY');

    if (this.refs.year.value !== currYear) {
      momentAge = Number(momentAge) - 1;
    }

    console.log('momentAge: ', momentAge);
    let age = momentAge;
    this.props.userBirthday(age);
  },
  render: function() {
    let year;
    let day;

    let dayArr = [];
    for (let i=1; i < 32; i++) {
      dayArr.push(i);
    }
    day = dayArr.map((currDay, i) => {
      return (<option className="option-birthday day" value={currDay} key={i}>{currDay}</option>);
    });

    let yearArr = [];
    for (let i=this.state.currYear; i >= 1900; i--) {
      yearArr.push(i);
    }

    year = yearArr.map((currYear, i) => {
      return (<option className="option-birthday year" value={currYear} key={i}>{currYear}</option>);
    });

    return (
      <div className="birthday-dropdown-component">
        <select className="select-birthday select-month" ref="month" onChange={this.getBirthdate}>
          <option className="option-birthday month" value="01">January</option>
          <option className="option-birthday month" value="02">February</option>
          <option className="option-birthday month" value="03">March</option>
          <option className="option-birthday month" value="04">April</option>
          <option className="option-birthday month" value="05">May</option>
          <option className="option-birthday month" value="06">June</option>
          <option className="option-birthday month" value="07">July</option>
          <option className="option-birthday month" value="08">August</option>
          <option className="option-birthday month" value="09">September</option>
          <option className="option-birthday month" value="10">October</option>
          <option className="option-birthday month" value="11">November</option>
          <option className="option-birthday month" value="12">December</option>
        </select>
        <select className="select-birthday select-day" ref="day" onChange={this.getBirthdate}>
          {day}
        </select>
        <select className="select-birthday select-year" ref="year" onChange={this.getBirthdate}>
          {year}
        </select>
      </div>
    )
  }
});
