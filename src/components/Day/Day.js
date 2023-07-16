import {useState} from 'react';
import Tooltip from '../Tooltip/Tooltip.js';
export default function Day({ info, message, bgColor }) {
  const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
  	  setIsHovering(true);
  	};

  	const handleMouseOut = () => {
    	setIsHovering(false);
  	};

    if (info) {
  	 return (
  	   <div className="square" style={{backgroundColor: bgColor}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
			   {isHovering && <Tooltip message={message} info={info}/>}
		   </div>
		);
  		
    } else {
  	 return (
  	   <div className="square" style={{backgroundColor: bgColor}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
  		  {isHovering && <Tooltip message={message}/>}
  		 </div>
  	);
  }
}
