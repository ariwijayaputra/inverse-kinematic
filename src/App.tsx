import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import inverseKinematics from "./lib/inverseKinematic";
import { toast } from "react-toastify";
import ChartKinematic from "./components/chartKinematic";

function App() {
	const [joints, setJoints] = useState<
		{ x: number; y: number; z: number }[] | undefined
	>();
	const [alpha, setAlpha] = useState<number>(0);
	const [beta, setBeta] = useState<number>(0);
	const [gamma, setGamma] = useState<number>(0);
	const [X, setX] = useState<number>(0);
	const [Y, setY] = useState<number>(0);
	const [Z, setZ] = useState<number>(0);
	const [L1, setL1] = useState<number>(0);
	const [L2, setL2] = useState<number>(0);

	const handleCalculate = (e?: FormEvent) => {
		e?.preventDefault();
		console.log(L1, L2, X, Y);
		try {
			if (L1 && L2) {
				const [a, b, c, newJoint] = inverseKinematics(X, Y, Z, L1, L2);
				console.log(a, b, c, newJoint);
				// console.log(forwardKinematics(a, b, L1, L2));
				setAlpha(a);
				setBeta(b);
				setGamma(c);
				setJoints(newJoint);
			}
		} catch (error: any) {
			toast(error.message as string, { theme: "dark", type: "error" });
		}
	};
	// useEffect(() => {
	// 	handleCalculate();
	// }, [X, Y, Z, L1, L2]);
	return (
		<>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "30%",
					}}>
					<h1 style={{ textAlign: "start" }}>Inverse Kinematic Simulator</h1>
					<form
						onSubmit={(e) => handleCalculate(e)}
						style={{
							display: "flex",
							gap: "20px",
							flexDirection: "column",
						}}>
						<div
							style={{
								display: "flex",
								width: "100%",
								flexDirection: "column",
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
								flexDirection: "column",
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
							<div
								style={{
									display: "flex",
									width: "100%",
									flexDirection: "row",
									gap: "8px",
								}}>
								<span style={{ width: "28px" }}>Z</span>
								<input
									value={Z}
									onChange={(e) => setZ(parseInt(e.target.value))}
									style={{ width: "100%" }}
									type="number"
									name="z"></input>
							</div>
						</div>
						<button type="submit">Calculate</button>
					</form>

					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "8px",
						}}>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "8px",
							}}>
							<div
								style={{
									background: "#fdd",
									padding: "4px",
								}}></div>
							<p>degree 1: {alpha}</p>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "8px",
							}}>
							<div
								style={{
									background: "green",
									padding: "4px",
								}}></div>
							<p>degree 2: {beta}</p>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "8px",
							}}>
							<div
								style={{
									background: "blue",
									padding: "4px",
								}}></div>
							<p>degree 3: {gamma}</p>
						</div>
					</div>
				</div>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<div
						className="card"
						style={{
							display: "flex",
							flexDirection: "column",
							width: "400px",
							height: "400px",
						}}>
						{"x -> and y^"}
						{joints && <ChartKinematic joints={joints} range={L1 + L2} />}
					</div>
					<div
						className="card"
						style={{
							display: "flex",
							flexDirection: "column",
							width: "400px",
							height: "400px",
						}}>
						{"x -> and z^ (from top)"}
						{joints && (
							<ChartKinematic
								joints={[
									{ x: 0, y: 0 },
									{ x: joints[1].x, y: joints[1].z },
									{ y: Z, x: joints[2].x },
								]}
								range={L1 + L2}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
