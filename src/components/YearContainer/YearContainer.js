import { useEffect, useState } from 'react';
import DisplayDaysByWeek from '../DisplayDaysByWeek/DisplayDaysByWeek.js';
import ExtraInfo from '../ExtraInfo/ExtraInfo.js';
import MonthContainer from '../MonthContainer/MonthContainer.js';

export default function YearContainer() {

	const [dates, setDates] = useState({});

	useEffect(() => {
    	fetch('https://dpg.gg/test/calendar.json')
        .then(response => response.json())
        .then(data => setDates(data));
  	}, []);

	// variable from where to start
 	const dateFrom = new Date();
 	// today's date
 	const now = new Date();
 	// used to form 51X7 table at the beginning
	const dateFromToAdjust = new Date();
	// used to form 51X7 table at the end
	const dateFromToEnd = new Date();
	
	dateFrom.setDate(dateFrom.getDate() - 357);
	dateFromToAdjust.setDate(dateFromToAdjust.getDate() - 357);

	//filling array from 50 weeks back
	const daysArray = [];
	for (let d = dateFrom; d <= now; d.setDate(d.getDate() + 1)) {
		daysArray.push({ date: new Date(d).toISOString().split('T')[0], count: 0 });
	}

	
	// filling with extra dates before first date, for example if first date is wednesday we fill from monday up to wednesday
	let daysFromToSubstract = dateFromToAdjust.getDay();
	if (!daysFromToSubstract) {
		daysFromToSubstract = 7;
	}
	const subtrB = daysFromToSubstract - 1;
	for (let c = 0; c < subtrB; c++) {
		const newDate = dateFromToAdjust.setDate(dateFromToAdjust.getDate()-1);
		daysArray.unshift({ date: new Date(newDate).toISOString().split('T')[0], count: 0 })
	}
	
	
	// filling with extra dates after last date, for example if first date is wednesday we fill from monday up to sunday
	let daysFromToSubstractAtTheEnd = dateFromToEnd.getDay();
	const subtrEnd = 6 - daysFromToSubstractAtTheEnd;
	if (subtrEnd && dateFromToEnd.getDay()!=0){
		for (let c = 0; c <= subtrEnd; c++ ) {
			const newDate = dateFromToEnd.setDate(dateFromToEnd.getDate()+1);
			daysArray.push({ date: new Date(newDate).toISOString().split('T')[0], count: 0 })
		}
		// removing first 7 days because exceeds 51x7 table
		for (let c = 0; c<=6; c++) {
		daysArray.shift();
		}
	}
	

	

	//iterate over empty date with counts and update its count property according to our fetched data
	for (const [key, value] of Object.entries(dates)) {
		let obj = daysArray.find((item) => item.date === key);
		if (obj) {
			obj.count = value;
		}
	}

	// it will display every weekday on new row
	const weekdays = {
		'Пн.': [],
		'Вт.': [],
		'Ср.': [],
		'Чт.': [],
		'Пт.': [],
		'Сб.': [],
		'Всс.': []
	};

	daysArray.forEach(function (item) {
		const date = new Date(item.date);
		switch (date.getDay()) {
			case 1:
				weekdays['Пн.'].push(item);
				break;
			case 2:
				weekdays['Вт.'].push(item);
				break;
			case 3:
				weekdays['Ср.'].push(item);
				break;
			case 4:
				weekdays['Чт.'].push(item);
				break;
			case 5:
				weekdays['Пт.'].push(item);
				break;
			case 6:
				weekdays['Сб.'].push(item);
				break;
			case 0:
				weekdays['Всс.'].push(item);
			break;
		}
	}
	)

	return (
		<div className="flex">
			<div style={{marginTop:'20px'}}>
				{
					Object.keys(weekdays).map(function(item,index){
		        		return <div style={{marginBottom:'5px'}} key={index}>{item}</div>;
					})
				}
			</div>
			<div>
				<MonthContainer currentDate={daysArray[daysArray.length-1].date} />
				{
			        Object.entries(weekdays).map(([key, value],index) => (
			        	<DisplayDaysByWeek currentWeekDay={key} days={value} key={index}/>
			        ))
		    	}
		    	<ExtraInfo />
			</div>
		</div>
	);
}

