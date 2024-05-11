interface DrawLegType {
	ctx: CanvasRenderingContext2D;
	coordinate1: { x: number; y: number };
	coordinate2: { x: number; y: number };
	coordinate3: { x: number; y: number };
}
export default function DrawLeg({
	ctx,
	coordinate1,
	coordinate2,
	coordinate3,
}: DrawLegType) {
	//draw 1st line
	ctx.moveTo(coordinate1.x * 10, coordinate1.y * 10);
	ctx.lineTo(coordinate2.x * 10, coordinate2.y * 10);
	//draw 2nd line
	ctx.moveTo(coordinate2.x * 10, coordinate2.y * 10);
	ctx.lineTo(coordinate3.x * 10, coordinate3.y * 10);

	ctx.stroke();
}
