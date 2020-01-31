import React from 'react'
import './weather.style.css'


 function WeatherComponent(props) {
    return (
        <div className="container">
            <div className="cards p-4 text-center mt-5">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.weathericon} display-1`}></i>
                </h5>
               {props.celsius ? (<h1 className="py-2">{props.celsius}&deg;</h1>):null}

                {minmaxTemp(props.min_temp, props.max_temp)}
                <h4 className="py-4">{props.description}</h4>
            </div>
           
        </div>
    )
}

function minmaxTemp(min,max) {
    if(min && max){
        return(
            <h3>
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h3>
        );
    }
  
}

export default WeatherComponent;