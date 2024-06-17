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
		.url({ message: 'Enter a valid image url' }),
	author: z
		.string({
			required_error: 'Author is required',
		})
		.min(1, { message: 'Author is required' }),
	genre_id: z
		.string({
			required_error: 'Genre required',
		})
		.min(1, { message: 'Genre is required' }),
	date_published: z
		.string({
			required_error: 'Date published is required',
		})
		.min(1, { message: 'Date published is required' }),
	booking_fee: z.string().min(1, { message: 'Booking fee is required' }),
});

const AddCatalogue = () => {
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
			author: '',
			genre_id: '',
			date_published: '',
			booking_fee: '',
		},
	});

	const onSubmit = async (values) => {
		await fetch(`${BASE_URL}/catalogue`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...values,
				booking_fee: Number(values.booking_fee),
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
						<Form.Group className="mb-3" controlId="formBasicEmail">
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
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Form.Group className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								placeholder="Description"
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
						<Form.Group className="mb-3">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="url"
								placeholder="Image"
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
					name="author"
					control={control}
					render={({ field, fieldState }) => (
						<Form.Group className="mb-3">
							<Form.Label>Author</Form.Label>
							<Form.Control
								type="text"
								placeholder="Author"
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
					name="booking_fee"
					control={control}
					render={({ field, fieldState }) => (
						<Form.Group className="mb-3">
							<Form.Label>Booking Fee</Form.Label>
							<Form.Control
								type="number"
								placeholder="Booking Fee"
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
						<Form.Group className="mb-3">
							<Form.Label>Genre</Form.Label>

							<Form.Select
								aria-label="Default select example"
								{...field}
							>
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
					name="date_published"
					control={control}
					render={({ field, fieldState }) => (
						<Form.Group className="mb-3">
							<Form.Label>Date published</Form.Label>
							<Form.Control
								type="datetime-local"
								placeholder="Date published"
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

export default AddCatalogue;
