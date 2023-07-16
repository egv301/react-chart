import Day from '../Day/Day.js';

export default function ExtraInfo() {
	const contInfo = [
		{
			message: "0 Contributions",
			bgColor: "EDEDED"
		},
		{
			message: "1-9 Contributions",
			bgColor: "#ACD5F2"
		},
		{
			message: "10-20 Contributions",
			bgColor: "#7FA8C9"
		},
		{
			message: "20-29 Contributions",
			bgColor: "#527BA0"
		},
		{
			message: "30+ Contributions",
			bgColor: "#254E77"
		},
	]
	return (
		<div className="extra">
			<div style={{margin:'2px'}}>Меньше</div>
				{
				contInfo.map(function(item, index){
					return <Day message={item.message} bgColor={item.bgColor} key={index} />
				})	
				}
			<div style={{margin:'2px'}}>Больше</div>
		</div>
	);
 }