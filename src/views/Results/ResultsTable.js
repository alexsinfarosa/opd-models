import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ResultsGraph from './ResultsGraph'

@inject('store')
@observer
export default class ResultsTable extends Component {

  state = {
    isGraphDisplayed: false
  }

  handleGraphClick = () => {
   this.setState(prevState => ({
     isGraphDisplayed: !prevState.isGraphDisplayed
   }));
 }

  render() {
    const {
      pest,
      degreeDay,
      cumulativeDegreeDay,
      displayMonth
    } = this.props.store.app;

    return (
      <div className="columns">
        <div className="column has-text-centered">
          <table className="table is-bordered is-striped is-narrow">
            <thead className="t-header">
              <tr>
                <th rowSpan="2"/>
                <th className="before">Past</th>
                <th className="before">Past</th>
                <th className="before">Current</th>
                <th className="after" colSpan="5"> Ensuing 5 Days </th>
              </tr>
              <tr className="has-text-centered">
                {displayMonth.map(month => <th key={month} className="before">{month}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="has-text-centered">
                <th>Daily Degree Days (Base {pest.baseTemp}BE)</th>
                <td>{degreeDay[degreeDay.length - 8]}</td>
                <td>{degreeDay[degreeDay.length - 7]}</td>
                <td>{degreeDay[degreeDay.length - 6]}</td>
                <td>{degreeDay[degreeDay.length - 5]}</td>
                <td>{degreeDay[degreeDay.length - 4]}</td>
                <td>{degreeDay[degreeDay.length - 3]}</td>
                <td>{degreeDay[degreeDay.length - 2]}</td>
                <td>{degreeDay[degreeDay.length - 1]}</td>
              </tr>
              <tr className="has-text-centered">
                <th>Accumulation since January 1st</th>
                <td>{cumulativeDegreeDay[cumulativeDegreeDay.length - 8]}</td>
                <td>{cumulativeDegreeDay[cumulativeDegreeDay.length - 7]}</td>
                <td>{cumulativeDegreeDay[cumulativeDegreeDay.length - 6]}</td>
                <td>{cumulativeDegreeDay[cumulativeDegreeDay.length - 5]}</td>
                <td>{cumulativeDegreeDay[cumulativeDegreeDay.length - 4]}</td>
                <td>{cumulativeDegreeDay[cumulativeDegreeDay.length - 3]}</td>
                <td>{cumulativeDegreeDay[cumulativeDegreeDay.length - 2]}</td>
                <td>{cumulativeDegreeDay[cumulativeDegreeDay.length - 1]}</td>
              </tr>
              <tr>
                <td className="has-text-centered" colSpan="9">
                  <button
                    className="button is-link"
                    onClick={this.handleGraphClick}>
                    {this.state.isGraphDisplayed ? 'Hide' : 'Show'} Accumulated Degree-Days Graph
                  </button>

                  {this.state.isGraphDisplayed && <ResultsGraph />}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
