interface Point {
	x: number;
	y: number;
	z: number;
}

export default function inverseKinematics2(
	targetPosition: Point,
	armLength1: number,
	armLength2: number
): [number, number, number, Point, Point] {
	const { x, y, z } = targetPosition;
	// const r = Math.sqrt(x ** 2 + y ** 2);

	// Calculate base rotation (yaw)
	const baseRotation = Math.atan2(y, x);

	// Translate to base frame
	const xb = Math.sqrt(x ** 2 + y ** 2);
	const zb = z;

	// Calculate first arm angle
	const a1 =
		Math.atan2(zb, xb) -
		Math.asin(
			(armLength2 *
				Math.sin(
					Math.PI -
						Math.acos(
							(xb ** 2 + zb ** 2 - armLength1 ** 2 - armLength2 ** 2) /
								(2 * armLength1 * armLength2)
						)
				)) /
				Math.sqrt(xb ** 2 + zb ** 2)
		);

	// Calculate second arm angle
	const a2 =
		Math.PI -
		Math.acos(
			(xb ** 2 + zb ** 2 - armLength1 ** 2 - armLength2 ** 2) /
				(2 * armLength1 * armLength2)
		);

	// Calculate end joint positions
	const joint1Position: Point = {
		x: armLength1 * Math.cos(a1) * Math.cos(baseRotation),
		y: armLength1 * Math.cos(a1) * Math.sin(baseRotation),
		z: armLength1 * Math.sin(a1),
	};

	const joint2Position: Point = {
		x: joint1Position.x + armLength2 * Math.cos(a1 + a2) * Math.cos(baseRotation),
		y: joint1Position.y + armLength2 * Math.cos(a1 + a2) * Math.sin(baseRotation),
		z: joint1Position.z + armLength2 * Math.sin(a1 + a2),
	};

	// Convert angles to degrees
	const baseRotationDegrees = baseRotation * (180 / Math.PI);
	const angle1Degrees = a1 * (180 / Math.PI);
	const angle2Degrees = a2 * (180 / Math.PI);

	return [
		baseRotationDegrees,
		angle1Degrees,
		angle2Degrees,
		joint1Position,
		joint2Position,
	];
}
