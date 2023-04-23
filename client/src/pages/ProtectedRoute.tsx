import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

interface Props {
	children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
	const { user } = useAppContext();
	if (!user) {
		return <Navigate to="/landing" />;
	}
	return children;
};

export default ProtectedRoute;
