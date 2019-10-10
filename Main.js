const getForecast = async (input = '78288') => {
      const beginUrl = 'https://api.apixu.com/v1/forecast.json?key=';
      const apiKey = 'a6134c65fde586025425d2107bdcdfb7';
      const zip = '&q=';
      const defaultDays = '&days=7';
      const url = `${beginUrl}${apiKey}${zip}${input}${defaultDays}`;
      const response = await fetch(url); 
      const jsonResponse = await response.json();
      return jsonResponse; 
};   

function convertDate (date) {
  let day = new Date(date);
  const weekdays = ["Monday", "Tuesday", "Wendesday", "Thursday", "Friday", "Saturday", "Sunday"];
  day = day.getDay();
  return weekdays[day];
}

    
function deleteId (id) { 
  const parent = document.getElementById(id).childNodes;
  console.log(parent.length - 1)

  for (let i = parent.length - 1; i > -1; i--) {
      document.getElementById(id).removeChild(parent[i])
  };    
  }

const newLocation = async (input) => {
 
  const data = await getForecast(input);
  const location = data.location.name;
  const region = data.location.region;
 
  deleteId("location");
  document.getElementById("location").innerHTML = `Here's the weather for ${location}, ${region}.`;
}



const workingData = async (input) => {
  
  const data0 = await getForecast(input);
  const data = data0.forecast.forecastday
  
  const high = data.map(i => {return i.day.maxtemp_f});
  const low = data.map(i => {return i.day.mintemp_f});
  const image = data.map(i => {return i.day.condition.icon})
  const weekDays = data.map(i => convertDate(i.date));

  divContent(weekDays, high, low, image);
 
};

const divContent = (weekDays, high, low, image) => { 
  for (i = 0; i < weekDays.length; i++) {
    // create paragraph
    let weatherDiv = document.createElement("p");
    // append paragraph element to parent
    document.getElementById("weatherboxes").appendChild(weatherDiv);    
    // day of the week
    let node1 = document.createTextNode(weekDays[i]);
    weatherDiv.appendChild(node1);
    // create break
    weatherDiv.appendChild(document.createElement("br"));
    // insert image
    let weatherImage = weatherDiv.appendChild(document.createElement("img"))
    weatherImage.src = image[i];
    // create break
    weatherDiv.appendChild(document.createElement("br"));
    // high temp
    let node2 = document.createTextNode("High: " + high[i]);
    weatherDiv.appendChild(node2);
    // create break
    weatherDiv.appendChild(document.createElement("br"));
    // low temp
    let node3 = document.createTextNode("Low: " + low[i]);
    weatherDiv.appendChild(node3);
    //add css
    weatherDiv.classList.add("weatherbox");    
  };

}

