import React from 'react';
import Card from 'react-bootstrap/Card';
import styles from './App.module.css';





class Weather extends React.Component {
  
  render() {
    return(

  this.props.weather.map((value, idx) =>
  <Card style={{ width: '18rem' }} key={idx} className={styles.mapCard}>
    <Card.Img variant="top" src={value.icon} />
    <Card.Body>
      <Card.Title>Date: {value.date}</Card.Title>
      <Card.Text>Forecast: {value.description}</Card.Text>
      <Card.Text>Min Temp: {value.mintemp}°F
      </Card.Text>
      <Card.Text>Max Temp: {value.maxtemp}°F
      </Card.Text>
    </Card.Body>
  </Card>
  ))
  }
}


export default Weather;