import { Container, Col, Row } from 'react-bootstrap';

import MovieCard from '../components/MovieCard'; 
import NavigationBar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils';

function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/movies`)
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <Container>
            <NavigationBar />

            <Row className="mt-10" style={{ marginTop: 10 }}>
                {movies.map((movie) => (
                    <Col key={movie.id} className="mb-5">
                        <MovieCard {...movie} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
