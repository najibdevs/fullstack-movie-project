import React from 'react';
import { Card, Button } from 'react-bootstrap';
import BookMovie from './BookMovie'; // Correct import without the .jsx extension for consistency

function MovieCard(props) {
    const { title, id, director, image, rental_fee, is_rented } = props;

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} height={400} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>Director: {director}</Card.Text>
                <Button variant="primary">View</Button>

                <BookMovie
                    id={id}
                    movieTitle={title} // Correct prop name
                    bookingFee={rental_fee}
                    isBooked={is_rented}
                />
            </Card.Body>
        </Card>
    );
}

export default MovieCard;
