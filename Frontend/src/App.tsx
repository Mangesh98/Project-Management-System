import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import IssueDetails from "./pages/IssueDetails/IssueDetails";
import Auth from "./pages/Auth/Auth";
import { useAppDispatch, useAppSelector } from "./Redux/Hook";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import Subscription from "./pages/Subscription/Subscription";
import UpgradeSuccess from "./pages/Subscription/UpgradeSuccess";
import AcceptInvitation from "./pages/Project/AcceptInvitation";
function App() {
	const dispatch = useAppDispatch();
	const { auth } = useAppSelector((store) => store);
	;
	useEffect(() => {
		dispatch(getUser());
	}, [auth.jwt]);

	return (
		<>
			{auth.user ? (
				<div className="">
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/project/:projectId" element={<ProjectDetails />} />
						<Route
							path="/project/:projectId/issue/:issueId"
							element={<IssueDetails />}
						/>

						<Route path="/upgrade_plan" element={<Subscription />} />
						<Route path="/upgrade_plan/success" element={<UpgradeSuccess/>} />
						<Route path="/accept_invitation" element={<AcceptInvitation/>} />
					</Routes>
				</div>
			) : (
				<Auth />
			)}
		</>
	);
}

export default App;
