import { Link } from 'react-router-dom';
import notfound from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const ErrorPage = () => {
	return (
		<Wrapper className="full-page">
			<div>
				<img src={notfound} alt="notfound" />
				<h3>Ohh! page not found</h3>
				<p>We can`t seem to find page you are looking for</p>
				<Link to="/">Back home</Link>
			</div>
		</Wrapper>
	);
};

export default ErrorPage;
