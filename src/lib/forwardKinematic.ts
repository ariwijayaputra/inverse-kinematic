/**
 * Calculates the forward kinematics for a 2-link planar robotic arm.
 *
 * @param theta1 - The angle of the first joint in radians.
 * @param theta2 - The angle of the second joint in radians.
 * @param l1 - The length of the first link.
 * @param l2 - The length of the second link.
 * @returns An array containing the end-effector position [x, y].
 */
export default function forwardKinematics(
	theta1: number,
	theta2: number,
	l1: number,
	l2: number
): [number, number] {
	const x = l1 * Math.cos(theta1) + l2 * Math.cos(theta1 + theta2);
	const y = l1 * Math.sin(theta1) + l2 * Math.sin(theta1 + theta2);

	return [x, y];
}
