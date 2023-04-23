import { Landing, ErrorPage, Register, ProtectedRoute } from './pages';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AllJobs, Profile, Layout, Stats, AddJob } from './pages/dashbord';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Layout />
						</ProtectedRoute>
					}>
					<Route path="all-jobs" element={<AllJobs />} />
					<Route path="profile" element={<Profile />} />
					<Route index element={<Stats />} />
					<Route path="add-job" element={<AddJob />} />
				</Route>
				<Route path="/register" element={<Register />} />
				<Route path="/landing" element={<Landing />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
