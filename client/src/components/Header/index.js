import { Link } from 'react-router-dom';

function Header() {
	return (
		<header className="container">
			<section className="row">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="/home">Navbar</a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to="/signup">Sign Up</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/login">Login</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/logout">Logout</Link>
							</li>
						</ul>
					</div>
				</nav>
			</section>
		</header>
	);
}

export default Header;
