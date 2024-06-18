import { Button, Container, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import NavigationBar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils';

const schema = z.object({
    name: z
        .string({
            required_error: 'Name is required',
        })
        .min(1, { message: 'Name is required' }),
    description: z
        .string({
            required_error: 'Description is required',
        })
        .min(1, { message: 'Description is required' }),
    image: z
        .string({
            required_error: 'Image is required',
        })
        .min(1, { message: 'Image is required' })
        .url({ message: 'Enter a valid image URL' }),
    director: z
        .string({
            required_error: 'Director is required',
        })
        .min(1, { message: 'Director is required' }),
    genre_id: z
        .string({
            required_error: 'Genre is required',
        })
        .min(1, { message: 'Genre is required' }),
    release_date: z
        .string({
            required_error: 'Release date is required',
        })
        .min(1, { message: 'Release date is required' }),
    rental_fee: z.string().min(1, { message: 'Rental fee is required' }),
});

const AddMovie = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/genres`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setGenres(data);
            })
            .catch((err) => console.log(err));
    }, []);

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

    const onSubmit = async (values) => {
        await fetch(`${BASE_URL}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...values,
                rental_fee: Number(values.rental_fee),
                genre_id: Number(values.genre_id),
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    return (
        <Container>
            <NavigationBar />

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter movie name"
                                {...field}
                            />

                            {fieldState.invalid && (
                                <Form.Text className="text-danger">
                                    {fieldState.error.message}
                                </Form.Text>
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
                            <Form.Control
                                as="textarea"
                                placeholder="Enter movie description"
                                {...field}
                            />

                            {fieldState.invalid && (
                                <Form.Text className="text-danger">
                                    {fieldState.error.message}
                                </Form.Text>
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
                            <Form.Control
                                type="url"
                                placeholder="Enter image URL"
                                {...field}
                            />

                            {fieldState.invalid && (
                                <Form.Text className="text-danger">
                                    {fieldState.error.message}
                                </Form.Text>
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
                            <Form.Control
                                type="text"
                                placeholder="Enter movie director"
                                {...field}
                            />

                            {fieldState.invalid && (
                                <Form.Text className="text-danger">
                                    {fieldState.error.message}
                                </Form.Text>
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
                            <Form.Select aria-label="Select movie genre" {...field}>
                                <option>Select genre</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </Form.Select>

                            {fieldState.invalid && (
                                <Form.Text className="text-danger">
                                    {fieldState.error.message}
                                </Form.Text>
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
                            <Form.Control
                                type="date"
                                placeholder="Select release date"
                                {...field}
                            />

                            {fieldState.invalid && (
                                <Form.Text className="text-danger">
                                    {fieldState.error.message}
                                </Form.Text>
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
                            <Form.Control
                                type="number"
                                placeholder="Enter rental fee"
                                {...field}
                            />

                            {fieldState.invalid && (
                                <Form.Text className="text-danger">
                                    {fieldState.error.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                    )}
                />

                <Button
                    variant="primary"
                    type="submit"
                    disabled={formState.isSubmitting}
                >
                    {formState.isSubmitting ? 'Saving...' : 'Submit'}
                </Button>
            </Form>
        </Container>
    );
};

export default AddMovie;
