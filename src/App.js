import React from 'react';
import axios from 'axios';
import styles from './index.css';
import MapCard from './MapCard.js';
import FormSearch from './FormSearch.js';
import MovieCard from './MovieCard.js';
import WeatherGroup from './WeatherGroup.js';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      location: {},
      map: '',
      weather: [],
      movies: [],
      errors: ""
    }
  }

  onChange = async (e) => {
    this.setState({ searchQuery: e.target.value })
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
      this.setState({ weather: weatherResponse.data })

      const movieAPI = `http://localhost:3001/movies?searchQuery=${this.state.searchQuery}`;
      const movieResponse = await axios.get(movieAPI);
      this.setState({ movies: movieResponse.data })
      console.log(movieResponse);
      } catch (error) {
        this.setState({errors: error.response.data.error, showError: true})
      }
    }


  render() {
    return (
      <>
        <Container fluid="lg" className="heroDiv">
          <Row>
            <Col>
              <FormSearch getLocation={this.getLocation.bind(this)} onChange={this.onChange.bind(this)} />
            
              <MapCard map={this.state.map} location={this.state.location} lat={this.state.lat} lon={this.state.lon} />
            
            </Col>
            <Col>
              <WeatherGroup weather={this.state.weather} />
            </Col>
          </Row>
        </Container>
        <Container fluid="lg" className="movieCont">
          <MovieCard movies={this.state.movies} className={styles.movieCard} />
        </Container>
      </>
    )
  }
}

export default App;
