import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

import CatalogueCard from '../components/CatalogueCard';
import NavigationBar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils';

function Home() {
	const [catalogues, setCatalogues] = useState([]);

	useEffect(() => {
		fetch(`${BASE_URL}/catalogue`)
			.then((res) => res.json())
			.then((data) => setCatalogues(data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<Container>
			<NavigationBar />

			<Row className="mt-10" style={{ marginTop: 10 }}>
				{catalogues.map((catalogue) => (
					<Col key={catalogue.id} className="mb-5">
						<CatalogueCard {...catalogue} />
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default Home;
