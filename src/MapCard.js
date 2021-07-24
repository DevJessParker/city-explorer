import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './App.module.css';

class MapCard extends React.Component {

  render() {
    return (

      <Card style={{ width: '18rem' }} className={styles.mapCard}>
      <Card.Img variant="top" src={this.props.map} />
      <Card.Body>
      <Card.Title>{this.props.location.display_name}</Card.Title>
      <Card.Text>Lat: {this.props.location.lat}</Card.Text>
      <Card.Text>Lon: {this.props.location.lon}</Card.Text>
      <Button variant="primary">Bookmark Location</Button>
      </Card.Body>
    </Card>

    )
  }
}

export default MapCard
