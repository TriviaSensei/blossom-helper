import React from 'react';
import Ratio from 'react-bootstrap/Ratio';
export default function Flower(props) {
	const colors = ['#fafefd', '#592c33', '#fecc56'];
	// const paths = [
	// 	'm 175 161.3397 l 80.7124 -46.5979 q 11.6566 -6.7223 11.65 -20.1784 q -0.0006 -46.599 -14.8024 -67.5615 q -25.555 -2.3375 -65.9112 20.9615 q -11.6566 6.7223 -11.65 20.1784 l 0.0012 93.1979',
	// 	'm 180 170 l 80.7112 46.6 q 11.65 6.7337 23.3 -0 q 40.3556 -23.3 51.1088 -46.6 q -10.7532 -23.3 -51.1088 -46.6 q -11.65 -6.7337 -23.3 -0 l -80.7112 46.6',
	// 	'm 175 178.6603 l -0.0012 93.1979 q -0.0066 13.456 11.65 20.1784 q 40.3562 23.299 65.9112 20.9615 q 14.8018 -20.9625 14.8024 -67.5615 q 0.0066 -13.456 -11.65 -20.1784 l -80.7124 -46.5979',
	// 	'm 165 178.6603 l -80.7124 46.5979 q -11.6566 6.7223 -11.65 20.1784 q 0.0006 46.599 14.8024 67.5615 q 25.555 2.3375 65.9112 -20.9615 q 11.6566 -6.7223 11.65 -20.1784 l -0.0012 -93.1979',
	// 	'm 160 170 l -80.7112 -46.6 q -11.65 -6.7337 -23.3 0 q -40.3556 23.3 -51.1088 46.6 q 10.7532 23.3 51.1088 46.6 q 11.65 6.7337 23.3 -0 l 80.7112 -46.6',
	// 	'm 165 161.3397 l 0.0012 -93.1979 q 0.0066 -13.456 -11.65 -20.1784 q -40.3562 -23.299 -65.9112 -20.9615 q -14.8018 20.9625 -14.8024 67.5615 q -0.0066 13.456 11.65 20.1784 l 80.7124 46.5979',
	// ];
	const paths = [
		'm 175 161.3397 l 80.7124 -46.5979 q 11.6566 -6.7223 11.65 -20.1784 q -0.0006 -46.599 -14.8024 -67.5615 q -25.555 -2.3375 -65.9112 20.9615 q -11.6566 6.7223 -11.65 20.1784 z',
		'm 180 170 l 80.7112 46.6 q 11.65 6.7337 23.3 -0 q 40.3556 -23.3 51.1088 -46.6 q -10.7532 -23.3 -51.1088 -46.6 q -11.65 -6.7337 -23.3 -0 z',
		'm 175 178.6603 l -0.0012 93.1979 q -0.0066 13.456 11.65 20.1784 q 40.3562 23.299 65.9112 20.9615 q 14.8018 -20.9625 14.8024 -67.5615 q 0.0066 -13.456 -11.65 -20.1784 z',
		'm 165 178.6603 l -80.7124 46.5979 q -11.6566 6.7223 -11.65 20.1784 q 0.0006 46.599 14.8024 67.5615 q 25.555 2.3375 65.9112 -20.9615 q 11.6566 -6.7223 11.65 -20.1784 z',
		'm 160 170 l -80.7112 -46.6 q -11.65 -6.7337 -23.3 0 q -40.3556 23.3 -51.1088 46.6 q 10.7532 23.3 51.1088 46.6 q 11.65 6.7337 23.3 -0 z',
		'm 165 161.3397 l 0.0012 -93.1979 q 0.0066 -13.456 -11.65 -20.1784 q -40.3562 -23.299 -65.9112 -20.9615 q -14.8018 20.9625 -14.8024 67.5615 q -0.0066 13.456 11.65 20.1784 z',
	];

	const r = 100;

	return (
		<Ratio className="Flower" aspectRatio="1x1">
			<div className="Flower-Contents">
				<svg viewBox="0 0 340 340">
					{paths.map((p, i) => {
						return (
							<path
								key={i}
								data-object="petal"
								data-index={i + 1}
								d={p}
								stroke={
									props.state.selectedObject === i + 1 ? colors[2] : colors[0]
								}
								fill="var(--petal-bg)"
								strokeWidth="7"
								onClick={props.handleClick}
							></path>
						);
					})}
					<circle
						cx="170"
						cy="170"
						r="45"
						stroke={props.state.selectedObject === 0 ? colors[2] : colors[0]}
						strokeWidth="7"
						fill={colors[1]}
						data-object="center"
						data-index={0}
						onClick={props.handleClick}
					></circle>
					<text
						x={170}
						y={170}
						fill={colors[2]}
						dominantBaseline="central"
						onClick={props.handleClick}
						data-index={0}
					>
						{props.state.central && props.state.central.toUpperCase()}
					</text>
					{[0, 1, 2, 3, 4, 5].map((i) => {
						const a = (Math.PI * (-i + 2.5)) / 3;
						const x = r * Math.sin(a) + 170;
						const y = r * Math.cos(a) + 170;
						return (
							<text
								key={i + 6}
								x={x}
								y={y}
								fill="black"
								dominantBaseline="central"
								onClick={props.handleClick}
								data-index={i + 1}
							>
								{props.state.letters[i] && props.state.letters[i].toUpperCase()}
							</text>
						);
					})}
				</svg>
			</div>
		</Ratio>
	);
}
