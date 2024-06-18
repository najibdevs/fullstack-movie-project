
// src/pages/EditMovie.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import NavigationBar from '../components/Navbar';
import { BASE_URL } from '../utils';

const schema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    image: z.string().url({ message: 'Enter a valid image URL' }),
    director: z.string().min(1, { message: 'Director is required' }),
    genre_id: z.string().min(1, { message: 'Genre is required' }),
    release_date: z.string().min(1, { message: 'Release date is required' }),
    rental_fee: z.string().min(1, { message: 'Rental fee is required' }),
});

function EditMovie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);

    const { control, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        fetchGenres();
        fetchMovie();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await fetch(`${BASE_URL}/genres`);
            if (response.ok) {
                const data = await response.json();
                setGenres(data);
            }
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const fetchMovie = async () => {
        try {
            const response = await fetch(`${BASE_URL}/movies/${id}`);
            if (response.ok) {
                const data = await response.json();
                reset(data);
            }
        } catch (error) {
            console.error('Error fetching movie:', error);
        }
    };

    const onSubmit = async (values) => {
        try {
            const response = await fetch(`${BASE_URL}/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    rental_fee: Number(values.rental_fee),
                    genre_id: Number(values.genre_id),
                }),
            });
            if (response.ok) {
                navigate('/');
            } else {
                console.error('Failed to update movie');
            }
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    return (
        <Container>
            <NavigationBar />
            <h1 className="my-4">Edit Movie</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Add form fields similar to AddMovie.jsx */}
                <Button type="submit" disabled={formState.isSubmitting}>
                    {formState.isSubmitting ? 'Updating...' : 'Update Movie'}
                </Button>
            </Form>
        </Container>
    );
}

export default EditMovie;