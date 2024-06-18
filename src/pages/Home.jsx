// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import NavigationBar from '../components/Navbar';
import { BASE_URL } from '../utils';

function Home() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${BASE_URL}/movies`);
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleBookingSuccess = (movieId) => {
        setMovies(prevMovies =>
            prevMovies.map(movie =>
                movie.id === movieId ? { ...movie, is_rented: true } : movie
            )
        );
    };

    const handleDeleteMovie = (movieId) => {
        setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
    };

    const filteredMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <NavigationBar />
            <Container className="mt-4">
                <h1 className="text-center mb-4">Movie Rental</h1>
                <Form className="mb-4">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Form>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {filteredMovies.map(movie => (
                        <Col key={movie.id}>
                            <MovieCard 
                                movie={movie} 
                                onBookingSuccess={handleBookingSuccess}
                                onDelete={handleDeleteMovie}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Home;