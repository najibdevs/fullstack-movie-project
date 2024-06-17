import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { BASE_URL } from '../utils';

const schema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	phone: z
		.string()
		.min(10, { message: 'Phone number is required' })
		.max(10, { message: 'Phone number cannot be more than 10 digits' }),
	from: z.coerce.date({ required_error: 'Booking from is required' }),
	to: z.coerce.date({ required_error: 'Booking to is required' }),
});

function BookCatalogue({ name, id, bookingFee, isBooked }) {
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
		},
	});

	const onSubmit = async (values) => {
		await fetch(`${BASE_URL}/booking`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: values.name,
				phone: values.phone,
				booking_from: values.from,
				booking_to: values.to,
				catalogue_id: id,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				handleClose();

				// add logic to display success message
				console.log(data);
			})
			.catch((err) => console.log(err));
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
							Book {name} for Kshs {bookingFee}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Controller
							name="name"
							control={control}
							render={({ field, fieldState }) => (
								<Form.Group
									className="mb-3"
									controlId="formBasicEmail"
								>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Name"
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
							name="phone"
							control={control}
							render={({ field, fieldState }) => (
								<Form.Group
									className="mb-3"
									controlId="formBasicEmail"
								>
									<Form.Label>Phone</Form.Label>
									<Form.Control
										type="text"
										placeholder="Phone number"
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
							name="from"
							control={control}
							render={({ field, fieldState }) => (
								<Form.Group
									className="mb-3"
									controlId="formBasicEmail"
								>
									<Form.Label>From</Form.Label>
									<Form.Control
										type="date"
										placeholder="From"
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
							name="to"
							control={control}
							render={({ field, fieldState }) => (
								<Form.Group
									className="mb-3"
									controlId="formBasicEmail"
								>
									<Form.Label>To</Form.Label>
									<Form.Control
										type="date"
										placeholder="To"
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

export default BookCatalogue;
