import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery = '',
      location = {}
    }
  }

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`;
    const response = await axios.get(API);

    this.setState({ location: response.data[0] })

  }

  render() {
    return (
      <>
        <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="Enter City Name" type="text" />
        <button onClick={this.getLocation}>Explore!</button>

        <p>Location: {this.state.location.display_name}</p>
        <p>Lat: {this.state.location.lat}</p>
        <p>Lon: {this.state.location.lon}</p>
        <span>{this.state.location.icon}</span>
      </>
    )
  }
}

export default App;
