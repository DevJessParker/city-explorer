import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import './index.css';
import styles from './App.module.css';
import axios from 'axios';
import Weather from './Weather.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      location: {},
      map: '',
      weather: []
    }
  }

  getLocation = async (e) => {
    e.preventDefault();
  
      try {
      const locationAPI = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`;
      const response = await axios.get(locationAPI)
      this.setState({ location: response.data[0] })
      
      const mapAPI = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`;
      const mapResponse = await axios.get(mapAPI);
      this.setState({ map: mapResponse.config.url })
      
      const weatherAPI = `http://localhost:3001/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&searchQuery=${this.state.searchQuery}`;

      const weatherResponse = await axios.get(weatherAPI);
      console.log("weather response", weatherResponse.data)
      this.setState({ weather: weatherResponse.data });
      } catch {
        window.alert("ERROR: Cannot GeoCode Location")
      }
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
          
          <Weather weather={this.state.weather}/>
            
      </>
    )
  }
}

export default App;
