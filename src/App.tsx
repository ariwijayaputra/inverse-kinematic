import { FormEvent, useState } from "react";
import "./App.css";
import inverseKinematics from "./lib/inverseKinematic";
import { toast } from "react-toastify";
import ChartKinematic from "./components/chartKinematic";
function App() {
	const [joints, setJoints] = useState<
		{ x: number; y: number; z: number }[] | undefined
	>();
	const [jointsXZ, setJointsXZ] = useState<{ x: number; y: number }[] | undefined>();

	const [coxa, setCoxa] = useState<number>(0);
	const [tibia, setTibia] = useState<number>(0);
	const [femur, setFemur] = useState<number>(0);
	const [X, setX] = useState<number>(0);
	const [Y, setY] = useState<number>(0);
	const [Z, setZ] = useState<number>(0);
	const [Lfemur, setLfemur] = useState<number>(0);
	const [Ltibia, setLtibia] = useState<number>(0);
	const [Lcoxa, setLcoxa] = useState<number>(0);

	const handleCalculate = (e?: FormEvent) => {
		e?.preventDefault();
		console.log(Lfemur, Ltibia, X, Y);
		try {
			if (Lfemur && Ltibia) {
				const [a, b, c, newJoint] = inverseKinematics(
					X,
					Y,
					Z,
					Lcoxa,
					Lfemur,
					Ltibia
				);
				console.log(a, b, c, newJoint);
				// console.log(forwardKinematics(a, b, Lfemur, Ltibia));
				setCoxa(a);
				setFemur(b);
				setTibia(c);
				setJoints(newJoint);
				const joint1X = newJoint[1].x * Math.cos((a * Math.PI) / 180);
				const joint1Y = newJoint[1].x * Math.sin((a * Math.PI) / 180);
				const joint2X = newJoint[2].x * Math.cos((a * Math.PI) / 180);
				const joint2Y = newJoint[2].x * Math.sin((a * Math.PI) / 180);
				const joint3X = newJoint[3].x * Math.cos((a * Math.PI) / 180);
				const joint3Y = newJoint[3].x * Math.sin((a * Math.PI) / 180);
				setJointsXZ([
					{ x: 0, y: 0 },
					// { x: Lcoxa * -1, y: 0 },
					{ x: joint1X, y: joint1Y },
					{ x: joint2X, y: joint2Y },
					{ x: joint3X, y: joint3Y },
					// { x: X * -1 - Lcoxa, y:Z },
				]);
			}
		} catch (error: any) {
			toast(error.message as string, { theme: "dark", type: "error" });
		}
	};
	// useEffect(() => {
	// 	handleCalculate();
	// }, [X, Y, Z, Lfemur, Ltibia]);
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
								<span style={{ width: "110px", textAlign: "start" }}>
									L. coxa
								</span>
								<input
									value={Lcoxa}
									onChange={(e) => setLcoxa(parseInt(e.target.value))}
									style={{ width: "100%" }}
									type="number"
									name="Lcoxa"></input>
							</div>
							<div
								style={{
									display: "flex",
									width: "100%",
									flexDirection: "row",
									gap: "8px",
								}}>
								<span style={{ width: "110px", textAlign: "start" }}>
									L. femur
								</span>
								<input
									value={Lfemur}
									onChange={(e) => setLfemur(parseInt(e.target.value))}
									style={{ width: "100%" }}
									type="number"
									name="lfemur"></input>
							</div>
							<div
								style={{
									display: "flex",
									width: "100%",
									flexDirection: "row",
									gap: "8px",
								}}>
								<span style={{ width: "110px", textAlign: "start" }}>
									L. tibia
								</span>
								<input
									value={Ltibia}
									onChange={(e) => setLtibia(parseInt(e.target.value))}
									style={{ width: "100%" }}
									type="number"
									name="Ltibia"></input>
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
								<span style={{ width: "110px", textAlign: "start" }}>
									X
								</span>
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
								<span style={{ width: "110px", textAlign: "start" }}>
									Y
								</span>
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
								<span style={{ width: "110px", textAlign: "start" }}>
									Z
								</span>
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
							<p>coxa : {coxa.toFixed(2)}°</p>
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
							<p>femur: {femur.toFixed(2)}°</p>
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
							<p>tibia: {tibia.toFixed(2)}°</p>
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
						{"x -> and y^ (relative to each leg)"}
						{joints && (
							<ChartKinematic
								joints={joints}
								range={Lfemur + Ltibia + Lcoxa}
								pointBg={["#FDD", "#0F0", "#00F", "#F00"]}
							/>
						)}
					</div>
					<div
						className="card"
						style={{
							display: "flex",
							flexDirection: "column",
							width: "400px",
							height: "400px",
						}}>
						{"x -> and z^ (from top. relative to robot)"}
						{jointsXZ && (
							<ChartKinematic
								joints={jointsXZ}
								range={Lfemur + Ltibia + Lcoxa}
								pointBg={["#FDD", "#0F0", "#00F", "#F00"]}
							/>
						)}
					</div>
				</div>
			</div>
			<div style={{ flexDirection: "column", display: "flex" }}>
				<h2>Refference</h2>
				<div
					className="card"
					style={{
						display: "flex",
						flexDirection: "column",
						width: "fit-content",
					}}>
					<img src="/coxatibiafemur.png" alt="leg structure"></img>
					<p>leg structure</p>
				</div>
			</div>
		</>
	);
}

export default App;
