export default function Month({monthsToDisplay}) {
  return (
  	monthsToDisplay.map(function(item){
	 	return <div>{item}</div>;
	 }
	)	
  )
}