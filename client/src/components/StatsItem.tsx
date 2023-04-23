import Wrapper from "../assets/wrappers/StatItem";

interface Props {
	count: number;
	title: string;
	icon: any;
	color: string;
	bcg: string;
}

const StatsItem = ({ count, title, icon, color, bcg }: Props) => {
	return (
		<Wrapper color={color} bcg={bcg}>
			<header>
				<span className="count">{count}</span>
				<span className="icon">{icon}</span>
			</header>
			<h5 className="title">{title}</h5>
		</Wrapper>
	);
};

export default StatsItem;
