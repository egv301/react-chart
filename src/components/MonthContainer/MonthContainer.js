import Month from './Month.js';
export default function MonthContainer() {
	const monthNames = ["Янв.", "Фев.", "Мар.", "Апр.", "Май", "Июнь", "Июль", "Авг.", "Сен.", "Окт.", "Ноя.", "Дек."];
  	const monthsToDisplay = []; 
  	const dateFrom = new Date();
  	const now = new Date();
  	dateFrom.setDate(dateFrom.getDate() - 357);
  	const dateToNow = now.getMonth();
	for (let d = dateFrom; d <= now; d.setMonth(d.getMonth() + 1)) {
		monthsToDisplay.push(monthNames[d.getMonth()]);
	}
	return (
		<div className="month">
			<Month monthsToDisplay={monthsToDisplay}/>
		</div>
	);
}