import React from 'react';
import Card from 'react-bootstrap/Card';
import './index.css';
import styles from './App.module.css';


class Weather extends React.Component {

  render() {
    return(
    this.props.weather.map((value, idx) =>
    <Card style={{ width: '18rem' }} className={styles.mapCard} key={idx}>
        <Card.Body>
        <Card.Text>Date: {value.date}</Card.Text>
        <Card.Text>Forecast: {value.description}</Card.Text>
      </Card.Body>
    </Card>
    ))
  }
}
    


export default Weather;