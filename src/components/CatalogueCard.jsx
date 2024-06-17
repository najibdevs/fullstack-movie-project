import { Card, Button } from 'react-bootstrap';
import BookCatalogue from './BookCatalogue';

function CatalogueCard(props) {
	const { name, id, author, image, booking_fee, is_booked } = props;

	return (
		<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src={image} height={400} />
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>Author: {author}</Card.Text>
				<Button variant="primary">View</Button>

				<BookCatalogue
					id={id}
					name={name}
					bookingFee={booking_fee}
					isBooked={is_booked}
				/>
			</Card.Body>
		</Card>
	);
}

export default CatalogueCard;
