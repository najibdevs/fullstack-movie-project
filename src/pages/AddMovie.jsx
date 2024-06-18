import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import NavigationBar from '../components/Navbar';
import { BASE_URL } from '../utils';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().url('Enter a valid image URL'),
    director: z.string().min(1, 'Director is required'),
    genre_id: z.string().min(1, 'Genre is required'),
    release_date: z.string().min(1, 'Release date is required'),
    rental_fee: z.string().min(1, 'Rental fee is required'),
});

const AddMovie = () => {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();
    const { control, handleSubmit, formState } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            image: '',
            director: '',
            genre_id: '',
            release_date: '',
            rental_fee: '',
        },
    });

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await fetch(`${BASE_URL}/genres`);
            if (!response.ok) {
                throw new Error('Failed to fetch genres');
            }
            const data = await response.json();
            setGenres(data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/movies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    rental_fee: Number(data.rental_fee),
                    genre_id: Number(data.genre_id),
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add movie');
            }
            const result = await response.json();
            console.log('Movie added successfully:', result);
            navigate('/'); // Redirect to home page after successful addition
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <>
            <NavigationBar />
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <Form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-light rounded shadow">
                            <h2 className="mb-4 text-center">Add New Movie</h2>

                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter movie name" {...field} />
                                        {fieldState.error && (
                                            <Form.Text className="text-danger">{fieldState.error.message}</Form.Text>
                                        )}
                                    </Form.Group>
                                )}
                            />

                            <Controller
                                name="description"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Form.Group className="mb-3" controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter movie description" {...field} />
                                        {fieldState.error && (
                                            <Form.Text className="text-danger">{fieldState.error.message}</Form.Text>
                                        )}
                                    </Form.Group>
                                )}
                            />

                            <Controller
                                name="image"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Form.Group className="mb-3" controlId="image">
                                        <Form.Label>Image URL</Form.Label>
                                        <Form.Control type="url" placeholder="Enter image URL" {...field} />
                                        {fieldState.error && (
                                            <Form.Text className="text-danger">{fieldState.error.message}</Form.Text>
                                        )}
                                    </Form.Group>
                                )}
                            />

                            <Controller
                                name="director"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Form.Group className="mb-3" controlId="director">
                                        <Form.Label>Director</Form.Label>
                                        <Form.Control type="text" placeholder="Enter director name" {...field} />
                                        {fieldState.error && (
                                            <Form.Text className="text-danger">{fieldState.error.message}</Form.Text>
                                        )}
                                    </Form.Group>
                                )}
                            />

                            <Controller
                                name="genre_id"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Form.Group className="mb-3" controlId="genre_id">
                                        <Form.Label>Genre</Form.Label>
                                        <Form.Select {...field}>
                                            <option value="">Select a genre</option>
                                            {genres.map((genre) => (
                                                <option key={genre.id} value={genre.id}>
                                                    {genre.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {fieldState.error && (
                                            <Form.Text className="text-danger">{fieldState.error.message}</Form.Text>
                                        )}
                                    </Form.Group>
                                )}
                            />

                            <Controller
                                name="release_date"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Form.Group className="mb-3" controlId="release_date">
                                        <Form.Label>Release Date</Form.Label>
                                        <Form.Control type="date" {...field} />
                                        {fieldState.error && (
                                            <Form.Text className="text-danger">{fieldState.error.message}</Form.Text>
                                        )}
                                    </Form.Group>
                                )}
                            />

                            <Controller
                                name="rental_fee"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Form.Group className="mb-3" controlId="rental_fee">
                                        <Form.Label>Rental Fee</Form.Label>
                                        <Form.Control type="number" step="0.01" placeholder="Enter rental fee" {...field} />
                                        {fieldState.error && (
                                            <Form.Text className="text-danger">{fieldState.error.message}</Form.Text>
                                        )}
                                    </Form.Group>
                                )}
                            />

                            <div className="d-grid">
                                <Button variant="primary" type="submit" disabled={formState.isSubmitting}>
                                    {formState.isSubmitting ? 'Saving...' : 'Add Movie'}
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AddMovie;