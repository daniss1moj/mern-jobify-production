import React from 'react';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { Outlet } from 'react-router-dom';
import { BigSidebar, SmallSidebar, Navbar } from '../../components';

const Layout = () => {
	return (
		<Wrapper>
			<main className="dashboard">
				<SmallSidebar />
				<BigSidebar />

				<div>
					<Navbar />
					<div className="dashboard-page">
						<Outlet />
					</div>
				</div>
			</main>
		</Wrapper>
	);
};

export default Layout;
