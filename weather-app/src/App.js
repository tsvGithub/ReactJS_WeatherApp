import React, { Component } from "react";
import "./App.css";

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" },
];
class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
    };
  }
  //Методы жизненного цикла позволяют нам написать
  //дополнительный код, который вызывается в
  //определенное время жизни компонента.
  //мы хотим вызвать API, когда компонент загрузится
  //на экране, для этого добавим componentDidMount.
  componentDidMount() {
    const zip = this.props.zip;
    const URL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then((res) =>
      res.json().then((json) => {
        this.setState({ weatherData: json });
      })
    );
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    // return <div>{JSON.stringify(weatherData)}</div>;
    return (
      // <h1>
      //   Displaying Weather for city {this.props.name} zip: {this.props.zip}
      // </h1>
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

class App extends Component {
  //Мы хотим, чтобы в приложении была возможность
  //переключаться между местами, поэтому мы можем
  //использовать состояние (state) для хранения данных в
  //компоненте App.
  //----------------------
  //Сначала добавим функцию-конструктор, в которой будет
  //использоваться super(), а затем установим начальное
  //состояние this.state:
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    //Функция render() может брать данные из this.state
    //при составлении пользовательского интерфейса. Для
    //этого мы можем использовать метод setState
    //компонента React, который меняет состояние и
    //перезапускает функцию render().
    //--------------------
    //Применим this.state и this.setState
    const activePlace = this.state.activePlace;

    return (
      <div className="App">
        {/* Из массива данных мы создадим набор элементов 
        button и назначим свойство key для каждого, чтобы 
        React знал последовательность элементов в массиве.*/}
        {PLACES.map((place, index) => (
          <button
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
            {place.name}
          </button>
        ))}
        <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} name={PLACES[activePlace].name} />
      </div>
    );
  }
}

export default App;
