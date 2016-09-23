import React from 'react';
import Moment from 'moment';

export default React.createClass({
  render: function() {
    let currDate = new Date();
    let year;
    let day;
    console.log(currDate);

    let dayArr = [];
    for (let i=1; i < 32; i++) {
      dayArr.push(i);
    }
    day = dayArr.map((currDay, i) => {
      return (<option className="option-birthday day" value={currDay} key={i}>{currDay}</option>);
    });

    let yearArr = [];
    for (let i=2016; i >= 1900; i--) {
      yearArr.push(i);
    }

    year = yearArr.map((currYear, i) => {
      return (<option className="option-birthday year" value={currYear} key={i}>{currYear}</option>);
    });
    return (
      <div className="birthday-dropdown-component">
        <select className="select-birthday select-month">
          <option className="option-birthday month" value="January">January</option>
          <option className="option-birthday month" value="January">February</option>
          <option className="option-birthday month" value="January">March</option>
          <option className="option-birthday month" value="January">April</option>
          <option className="option-birthday month" value="January">May</option>
          <option className="option-birthday month" value="January">June</option>
          <option className="option-birthday month" value="January">July</option>
          <option className="option-birthday month" value="January">August</option>
          <option className="option-birthday month" value="January">September</option>
          <option className="option-birthday month" value="January">October</option>
          <option className="option-birthday month" value="January">November</option>
          <option className="option-birthday month" value="January">December</option>
        </select>
        <select className="select-birthday select-day">
          {day}
        </select>
        <select className="select-birthday select-year">
          {year}
        </select>
      </div>
    )
  }
});
