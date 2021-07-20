import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import './index.css';
import styles from './App.module.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      location: {},
      map: ''
    }
  }

  getLocation = async (e) => {
    e.preventDefault();
  
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`;
      const response = await axios.get(API)
      this.setState({ location: response.data[0] })
    } catch {
      window.alert("ERROR: Unable to GeoCode")
    }
    
    const MAP = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`;
    const mapResponse = await axios.get(MAP);
    this.setState({ map: mapResponse.config.url })
  }

  render() {
    return (
      <>
        <Form onSubmit={this.getLocation} className={styles.searchbar}>
        <InputGroup className="mb-3">
          <FormControl 
            placeholder="Enter City Name"
            aria-label="Enter City Name"
            aria-describedby="basic-addon2"
            onChange={(e) => this.setState({ searchQuery: e.target.value })}></FormControl>
          <Button type="submit" variant="primary" id="button-addon2">
            Explore!
          </Button>
        </InputGroup>
        </Form>

        <Card style={{ width: '18rem' }} className={styles.mapCard}>
          <Card.Img variant="top" src={this.state.map} />
          <Card.Body>
          <Card.Title>{this.state.location.display_name}</Card.Title>
          <Card.Text>Lat: {this.state.location.lat}</Card.Text>
          <Card.Text>Lon: {this.state.location.lon}</Card.Text>
          <Button variant="primary">Bookmark Location</Button>
        </Card.Body>
      </Card>
      </>
    )
  }
}

export default App;
