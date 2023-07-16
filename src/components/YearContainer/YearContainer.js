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

 	const dateFrom = new Date();

	const dateFromToAdjust = new Date();

	dateFromToAdjust.setDate(dateFromToAdjust.getDate() - 357);

	const now = new Date();

	dateFrom.setDate(dateFrom.getDate() - 357);
    
    
	const daysArray = [];

	for (let d = dateFrom; d <= now; d.setDate(d.getDate() + 1)) {
		daysArray.push({ date: new Date(d).toISOString().split('T')[0], count: 0 });
	}

	const fromDate = dateFromToAdjust.getDay() - 1;


	if (fromDate!=0) {
		for (let i = 0; i < fromDate; i++) {
			dateFromToAdjust.setDate(dateFromToAdjust.getDate() + 1);
			daysArray.unshift({ date: dateFromToAdjust.toISOString().split('T')[0], count: 0 });
		} 
	} else {
		for (let i = 0; i < 6; i++) {
			dateFromToAdjust.setDate(dateFromToAdjust.getDate() + 1);
			daysArray.unshift({ date: dateFromToAdjust.toISOString().split('T')[0], count: 0 });
		}
	}


	const today = 6 - now.getDay();
	if (today!=6) {
		for (let i = 0; i <= today; i++) {
			now.setDate(now.getDate() + 1);
			daysArray.push({ date: now.toISOString().split('T')[0], count: 0 });
		} 
		for (let i = 0; i <= 6; i++) {
			daysArray.shift();
		}  
	}


	for (const [key, value] of Object.entries(dates)) {
		let obj = daysArray.find((item) => item.date === key);
		if (obj) {
			obj.count = value;
		}
	}

	const weekdays = {
		'Пн.': [],
		'Вт.': [],
		'Ср.': [],
		'Чт.': [],
		'Пт.': [],
		'Сб.': [],
		'Вс.': []
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
				weekdays['Вс.'].push(item);
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
				<MonthContainer />
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

