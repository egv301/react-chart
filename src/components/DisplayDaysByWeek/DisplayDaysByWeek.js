import Day from '../Day/Day.js';
export default function DisplayDaysByWeek({ currentWeekDay,days }) { 
  let message;
  let bgColor;
  return (
    <div className="flex">
        {
          days.map(function(item,index){
            if (!item.count) {  
              message = "0 Contributions";
              bgColor = "#EDEDED";
            } else if (item.count>=1 && item.count<=9) {
              message = "1-9 Contributions";
              bgColor = "#ACD5F2";
            } else if (item.count>=10 && item.count<=19) {
              message = "10 -20 Contributions";
              bgColor = "#7FA8C9";
            } else if (item.count>=20 && item.count<=29) {
              message = "20-29 Contributions";
              bgColor = "#527BA0";
            } else if (item.count>=30) {
              message = "30+ Contributions";
              bgColor = "#254E77";
            }
              return (
                <Day info={item} message={message} bgColor={bgColor} key={index} />
              )
            }
          )
        }
      </div>
    )
}
