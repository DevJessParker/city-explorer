import React from 'react';
import Table from 'react-bootstrap/Table';
import Weather from './Weather.js';
import styles from './Weather.module.css';


class WeatherGroup extends React.Component {
  constructor(props) {
    super(props);
    }
  


  render() {
    return(
      
  <Table striped bordered hover variant="dark" id={styles.weatherTable}>
    <thead>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Forecast</th>
        <th colSpan="1">High Temp</th>
        <th colSpan="1">Low Temp</th>
      </tr>
    </thead>
    <tbody>
    <Weather weather={this.props.weather} addItem={this.addItem}/>
    </tbody>
  </Table>
    )
  }
}

export default WeatherGroup;