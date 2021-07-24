import React from 'react';
import Card from 'react-bootstrap/Card';
import styles from './App.module.css';

class MovieCard extends React.Component {
  
  render() {
    return(

  this.props.movies.map((value, idx) =>
  <Card style={{ width: '18rem' }} key={idx} className={styles.mapCard}>
    <Card.Img variant="top" src={value.poster} />
    <Card.Body>
      <Card.Title>{value.title}</Card.Title>
      <Card.Text><i>{value.overview}</i></Card.Text>
      <Card.Text>Release Date: {value.date}
      </Card.Text>
      <Card.Text>Popularity: {value.popularity}
      </Card.Text>
      <Card.Text>Average Rating: {value.averageVotes}
      </Card.Text>
      <Card.Text>Number of Votes: {value.totalVotes}
      </Card.Text>
    </Card.Body>
  </Card>
  ))
  }
}


export default MovieCard;