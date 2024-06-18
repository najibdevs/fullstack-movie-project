import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { BASE_URL } from '../utils';

// Updated schema for movie booking
const schema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    phone: z
        .string()
        .min(10, { message: 'Phone number is required' })
        .max(10, { message: 'Phone number cannot be more than 10 digits' }),
    from: z.coerce.date({ required_error: 'Booking from is required' }),
    to: z.coerce.date({ required_error: 'Booking to is required' }),
    movie: z.string().min(1, { message: 'Movie title is required' }),
});

function BookMovie({ id, bookingFee, isBooked, movieTitle }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { handleSubmit, formState, control } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            phone: '',
            from: '',
            to: '',
            movie: movieTitle, // Initialize with movie title
        },
    });

    const onSubmit = async (values) => {
        try {
            const response = await fetch(`${BASE_URL}/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: values.name,
                    phone: values.phone,
                    booking_from: values.from,
                    booking_to: values.to,
                    movie_title: values.movie, // Adjust to movie title
                    movie_id: id, // Add movie ID or any identifier
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to book movie');
            }

            const data = await response.json();
            handleClose();
            console.log(data); // Log success response
        } catch (error) {
            console.error('Error booking movie:', error);
        }
    };

    return (
        <>
            <Button
                variant="success"
                style={{ marginLeft: 5 }}
                onClick={handleShow}
                disabled={isBooked}
            >
                {isBooked ? 'Booked' : 'Book'}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Book {movieTitle} for Kshs {bookingFee}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        {...field}
                                    />

                                    {fieldState.error && (
                                        <Form.Text className="text-danger">
                                            {fieldState.error.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            )}
                        />

                        <Controller
                            name="phone"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Phone number"
                                        {...field}
                                    />

                                    {fieldState.error && (
                                        <Form.Text className="text-danger">
                                            {fieldState.error.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            )}
                        />

                        <Controller
                            name="from"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="From"
                                        {...field}
                                    />

                                    {fieldState.error && (
                                        <Form.Text className="text-danger">
                                            {fieldState.error.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            )}
                        />

                        <Controller
                            name="to"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Form.Group className="mb-3">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="To"
                                        {...field}
                                    />

                                    {fieldState.error && (
                                        <Form.Text className="text-danger">
                                            {fieldState.error.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            )}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={formState.isSubmitting}
                        >
                            {formState.isSubmitting
                                ? 'Submitting...'
                                : 'Save Changes'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default BookMovie;
