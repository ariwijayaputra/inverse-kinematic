import { FormEvent, useState } from "react";
import "./App.css";
import inverseKinematics from "./lib/inverseKinematic";
import { toast } from "react-toastify";
import forwardKinematics from "./lib/forwardKinematic";
import ChartKinematic from "./components/chartKinematic";

function App() {
	const [joints, setJoints] = useState<{ x: number; y: number }[] | undefined>();
	const [alpha, setAlpha] = useState<number>(0);
	const [beta, setBeta] = useState<number>(0);
	const [X, setX] = useState<number>(0);
	const [Y, setY] = useState<number>(0);
	const [L1, setL1] = useState<number>(0);
	const [L2, setL2] = useState<number>(0);

	const handleCalculate = (e: FormEvent) => {
		e.preventDefault();
		console.log(L1, L2, X, Y);
		try {
			const [a, b, newJoint] = inverseKinematics(X, Y, L1, L2);
			console.log(a, b, newJoint);
			console.log(forwardKinematics(a, b, L1, L2));
			setAlpha(a);
			setBeta(b);
			setJoints(newJoint);
		} catch (error: any) {
			toast(error.message as string, { theme: "dark", type: "error" });
		}
	};

	return (
		<>
			<h1>Inverse Kinematic Simulator</h1>
			<form
				onSubmit={(e) => handleCalculate(e)}
				style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
				<div
					style={{
						display: "flex",
						width: "100%",
						flexDirection: "row",
						gap: "8px",
					}}>
					<div
						style={{
							display: "flex",
							width: "100%",
							flexDirection: "row",
							gap: "8px",
						}}>
						<span style={{ width: "28px" }}>L1</span>
						<input
							value={L1}
							onChange={(e) => setL1(parseInt(e.target.value))}
							style={{ width: "100%" }}
							type="number"
							name="l1"></input>
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							flexDirection: "row",
							gap: "8px",
						}}>
						<span style={{ width: "28px" }}>L2</span>
						<input
							value={L2}
							onChange={(e) => setL2(parseInt(e.target.value))}
							style={{ width: "100%" }}
							type="number"
							name="l2"></input>
					</div>
				</div>
				<div
					style={{
						display: "flex",
						width: "100%",
						flexDirection: "row",
						gap: "8px",
					}}>
					<div
						style={{
							display: "flex",
							width: "100%",
							flexDirection: "row",
							gap: "8px",
						}}>
						<span style={{ width: "28px" }}>X</span>
						<input
							value={X}
							onChange={(e) => setX(parseInt(e.target.value))}
							style={{ width: "100%" }}
							type="number"
							name="x"></input>
					</div>
					<div
						style={{
							display: "flex",
							width: "100%",
							flexDirection: "row",
							gap: "8px",
						}}>
						<span style={{ width: "28px" }}>Y</span>
						<input
							value={Y}
							onChange={(e) => setY(parseInt(e.target.value))}
							style={{ width: "100%" }}
							type="number"
							name="y"></input>
					</div>
				</div>
				<button type="submit">Calculate</button>
			</form>
			<div
				className="card"
				style={{
					display: "flex",
					flexDirection: "column",
					width: "800px",
					height: "800px",
				}}>
				<p>alpha: {alpha}</p>
				<p>beta:{beta}</p>
				{joints && <ChartKinematic joints={joints} range={L1 + L2} />}
			</div>
		</>
	);
}

export default App;
