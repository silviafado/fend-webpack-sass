/* Global Variables */

/* Personal API Key for OpenWeatherMap API */
let baseURL='http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey='&appid=1111cbdcf8fc8f48d8f36f640aab97dc&units=metric';

/* Create a new date instance dynamically with JS */
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Event listener to add function to existing HTML DOM element */
const generate=document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    const zip=document.getElementById('zip').value;
    const url=baseURL+zip+apiKey;
    getWeather(url)
        .then (function(data){
            console.log(data)
        postData('http://localhost:8000/addEntry', data={date:newDate, location: data.name, country:data.sys.country, temp:data.main.temp})
        .then (function(newEntry){
        updateUI()
        })
    })
}

/* Function to GET Web API Data */
const getWeather=async(url)=>{
    const res=await fetch(url)
    try{
        const data=await res.json();
        console.log(data);
        return (data);
    }catch(error){
        console.log('error', error);
    }
};

/* Function to POST data */
const postData=async(url='', data={})=>{
    console.log(data)
    const response=await fetch(url, {
    method:'POST',
    credentials:'same-origin',
    headers:{'Content-Type':'application/json; charset=UTF-8'},
    body: JSON.stringify(data),
    })
    try{
        const newData=await response.json();
        console.log(newData);
        return newData
    }catch(error){
        console.log('error',error);
    }
}

/*Function to update User Interface*/
const updateUI=async()=>{
    const request=await fetch('http://localhost:8000/all');
    try{
        const newEntry=await request.json();
        document.getElementById('date').innerHTML='Date: '+newEntry.date;
        document.getElementById('location').innerHTML='Location: '+newEntry.location;
        document.getElementById('country').innerHTML='Country: '+newEntry.country;
        document.getElementById('temp').innerHTML='Temperature in ºC: '+newEntry.temp;
    }catch(error){
        console.log('error',error);
    }
}