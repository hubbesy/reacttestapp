import React, { Component } from 'react';
import { ThreeHourChunk } from './ThreeHourChunk';

export class WeatherData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chunks: [],
    };
  }

  componentDidUpdate() {
    console.log(this.props.city);
    fetch('http://api.openweathermap.org/data/2.5/forecast?id='+this.props.city+'&units=imperial&APPID=59bede1d2257c136e1c01baa464f61ba')
    .then(response => response.json())
    .then(data => {
      let chunks = data.list.map((chunk, i) => {
        return(
          <div key={i}>
            <ThreeHourChunk
               minTemp = {chunk.main.temp_min}
               maxTemp = {chunk.main.temp_max}
               desc = {chunk.weather[0].description}
               icon = {chunk.weather[0].icon}
               name = {chunk.dt_txt}
               id = {i}
            />
          </div>
        )
      })
      this.setState({chunks: chunks});
      console.log("state", this.state.chunks);
    })
  }

  render() {
    return(
      <div> {this.state.chunks} </div>
    );
  }


}
