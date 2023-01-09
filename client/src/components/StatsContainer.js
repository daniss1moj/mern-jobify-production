import { FaCalendarCheck, FaSuitcaseRolling, FaBug } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import StatsItem from './StatsItem';
import Wrapper from '../assets/wrappers/StatsContainer';
const StatsContainer = () => {
	const { stats } = useAppContext();
	const defaultStats = [
		{
			title: 'Pending application',
			count: stats.pending || 0,
			icon: <FaSuitcaseRolling />,
			color: '#e9b949',
			bcg: '#fcefc7',
		},
		{
			title: 'interviews scheduled',
			count: stats.interview || 0,
			icon: <FaCalendarCheck />,
			color: '#647acb',
			bcg: '#e0e8f9',
		},
		{
			title: 'jobs declined',
			count: stats.declined,
			icon: <FaBug />,
			color: '#d66a6a',
			bcg: '#ffeeee',
		},
	];
	return (
		<Wrapper>
			{defaultStats.map((stat, index) => {
				return <StatsItem key={index} {...stat} />;
			})}
		</Wrapper>
	);
};

export default StatsContainer;
