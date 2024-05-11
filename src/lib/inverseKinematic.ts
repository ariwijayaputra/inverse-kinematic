/**
 * Calculates the inverse kinematics for a 2-link planar robotic arm.
 *
 * @param x - The desired x-coordinate of the end-effector position.
 * @param y - The desired y-coordinate of the end-effector position.
 * @param l1 - The length of the first link.
 * @param l2 - The length of the second link.
 * @returns An array containing the joint angles [theta1, theta2] in radians.
 */
export default function inverseKinematics(
    x: number,
    y: number,
    z: number,
    l1: number,
    l2: number
): [number, number, number, { x: number; y: number }[]] {
    // let invertMode = false;
    // if (x > 0) {
    // 	x = x * -1;
    // 	invertMode = true;
    // }
    const c2 = (x ** 2 + y ** 2 - l1 ** 2 - l2 ** 2) / (2 * l1 * l2);

    // Calculate the base rotation angle (theta0)
    const legLength = Math.sqrt(x ** 2 + z ** 2)
	
    console.log("legLength", legLength);
    const diagonal = Math.sqrt(legLength ** 2 + z ** 2);
    const radians = Math.acos(z / diagonal);
    const theta0Deg = radians * (180 / Math.PI) - 90;

    // Check if the desired position is within the reachable workspace
    if (c2 > 1 || c2 < -1) {
        throw new Error("The desired position is not reachable.");
    }

    const s2 = Math.sqrt(1 - c2 ** 2);
    const theta2Rad = Math.atan2(s2, c2);
    let theta2Deg = (theta2Rad * 180) / Math.PI;

    const k1 = l1 + l2 * Math.cos(theta2Rad);
    const k2 = l2 * Math.sin(theta2Rad);
    const theta1Rad = Math.atan2(y, x) - Math.atan2(k2, k1);
    let theta1Deg = (theta1Rad * 180) / Math.PI;

    // if x > 0 invert degree
    // if (invertMode === true) {
    // 	theta1Deg = 180 - theta1Deg;
    // 	theta2Deg = 180 - theta2Deg;
    // }

    // Calculate the positions of each joint
    const joint1Position: { x: number; y: number } = { x: 0, y: 0 };
    const joint2X = l1 * Math.cos(theta1Rad);
    const joint2Y = l1 * Math.sin(theta1Rad);
    const joint2Position: { x: number; y: number } = { x: joint2X, y: joint2Y };
    const endEffectorPosition: { x: number; y: number } = { x: x, y: y };

    return [
        theta1Deg,
        theta2Deg,
        theta0Deg,
        [joint1Position, joint2Position, endEffectorPosition],
    ];
}
