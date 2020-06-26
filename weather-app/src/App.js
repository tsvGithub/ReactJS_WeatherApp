import React, { Component } from "react";
import "./App.css";

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" },
];
class WeatherDisplay extends Component {
  render() {
    return (
      <h1>
        Displaying Weather for city {this.props.name} zip: {this.props.zip}
      </h1>
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
