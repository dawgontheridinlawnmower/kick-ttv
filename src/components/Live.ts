export function Live() {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "10");
	svg.setAttribute("height", "10");
	svg.setAttribute("viewBox", "0 0 10 10");
	svg.setAttribute("fill", "none");

	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute(
		"d",
		"M1.25 1.25H2.5V0H5H7.5V1.25H8.75V2.5H10V5V7.5H8.75V8.75H7.5V10H5H2.5V8.75H1.25V7.5H0V5V2.5H1.25V1.25Z"
	);
	path.setAttribute("fill", "#E91916");

	svg.appendChild(path);

	svg.id = "dawg-live";

	return svg;
}
