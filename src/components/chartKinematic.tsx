import { Scatter } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
export default function ChartKinematic({
	joints,
	range,
}: {
	joints: { x: number; y: number }[];
	range: number;
}) {
	// const chartRef = useRef<HTMLCanvasElement | null>(null);
	// useEffect(() => {
	// 	if (chartRef.current) {
	// 		const canvas = chartRef.current;
	// 		const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	// 		const coordinate1 = { x: 1, y: 2 };
	// 		const coordinate2 = { x: 2, y: 5 };
	// 		const coordinate3 = { x: 3, y: 4 };
	// 		DrawLeg({ ctx, coordinate1, coordinate2, coordinate3 });
	// 	}
	// }, [chartRef]);
	return (
		<Scatter
			data={{
				datasets: [
					{
						data: joints,
						borderColor: ["#FDD", "#0F0", "#F00"],
						pointBackgroundColor: ["#FDD", "#0F0", "#F00"],
						pointRadius: 5,
						showLine: true,
					},
				],
			}}
			options={{
				aspectRatio: 1 / 1,
				scales: {
					y: {
						max: range,
						min: range * -1,
					},
					x: {
						max: range,
						min: range * -1,
					},
				},
			}}
		/>
	);
}
