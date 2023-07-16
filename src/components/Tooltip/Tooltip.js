export default function Tooltip({message, info}){
	if (info) {
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		const formatToDate = new Date(info.date).toLocaleDateString('ru-RU', options);
		const capitalizedMessage = formatToDate.charAt(0).toUpperCase() + formatToDate.slice(1)

		return (
			<div className="tooltip">
			<div className="tooltip-cont">{message}</div>
			<div className="tooltip-date">{capitalizedMessage}</div>
		</div>
		);
	} else {
		return (
			<div className="tooltip-extra">
				<div className="tooltip-cont">{message}</div>
			</div>
		);
	}
	
}