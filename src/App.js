
import './App.css';

import FormComponent from "./components/FormComponent"
import 'weather-icons/css/weather-icons.css'
import WeatherComponent from "./components/WeatherComponent"

import React, { Component } from 'react'

const API_key = "a5a7bfcf77fa22e6aa2a9079962fa3fe"

class App extends Component {
  constructor(){
    super();
    this.state = {
      city : undefined,
      country : undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      max_temp: undefined,
      min_temp: undefined,
      description: "",
      error: false
    };

    this.weathericon={
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Snow: "wi-snow",
      Rain: "wi-storm-showers",
      Atmosphere: "wi-frog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calcelsius(temp){
    let cell = Math.floor(temp-273.15)
    return cell;
  }

  get_wathericon(icons,rangeid){
    switch(true){
      case rangeid >= 200 && rangeid <= 232:
      this.setState({icon: this.weathericon.Thunderstorm})
      break;
      case rangeid >= 300 && rangeid <= 321:
      this.setState({icon: this.weathericon.Drizzle})
      break;
      case rangeid >= 500 && rangeid <= 531:
      this.setState({icon: this.weathericon.Rain})
      break;
      case rangeid >= 600 && rangeid <= 622:
      this.setState({icon: this.weathericon.Snow})
      break;
      case rangeid >= 701 && rangeid <= 781:
      this.setState({icon: this.weathericon.Atmosphere})
      break;
      case rangeid === 800:
      this.setState({icon: this.weathericon.Clear})
      break;
      case rangeid >= 801 && rangeid <= 804:
      this.setState({icon: this.weathericon.Clouds})
      break;
      default:
        this.setState({icon: this.weathericon.Clouds})
    }
  };


 
  getweather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

   
     if(city && country) {
     const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
      


    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: `${response.name}, ${response.sys.country}`,
      country: response.sys.country,
      celsius: this.calcelsius(response.main.temp),
      max_temp: this.calcelsius(response.main.temp_max),
      min_temp: this.calcelsius(response.main.temp_min),
      description: response.weather[0].description,
      error: false
    });

    this.get_wathericon(this.weathericon, response.weather[0].id)
  }
  else{
    this.setState({
      error : true
    });
  }
}

  render() {
    return (
      <div className="App">
      <FormComponent loadweather = {this.getweather} error={this.state.error}/>
      <WeatherComponent city={this.state.city} 
      country={this.state.country}
      celsius={this.state.celsius}
      max_temp={this.state.max_temp}
      min_temp={this.state.min_temp}
      description={this.state.description}
      weathericon={this.state.icon}
      />
    </div>
    )
  }
}


export default App;
