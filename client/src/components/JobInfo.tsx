import Wrapper from "../assets/wrappers/JobInfo";
interface Props {
	icon: any;
	text: string;
}

const JobInfo = ({ icon, text }: Props) => {
	return (
		<Wrapper>
			<span className="icon">{icon}</span>
			<span className="text">{text}</span>
		</Wrapper>
	);
};

export default JobInfo;
