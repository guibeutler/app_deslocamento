export const generateRandomColor = () => {
	const hue = Math.floor(Math.random() * 360)
	const saturation = 70
	const lightness = 50
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
