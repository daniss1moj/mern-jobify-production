import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						job <span>tracking</span> app
					</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, eius voluptates
						aspernatur provident nihil error quas sed at sint sunt facere accusamus! Repudiandae
						quas id illum ut. Inventore, asperiores quae.
					</p>
					<Link className="btn btn-hero" to="/register">
						Login/Register
					</Link>
				</div>

				<img src={main} alt="job-hunt" className="img main-img" />
			</div>
		</Wrapper>
	);
};

export default Landing;
