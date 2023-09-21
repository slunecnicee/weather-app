
interface DayForecast{
    date:string;
    day:{
        condition:{
            icon:string;
            text:string;
        }
        maxtemp_c:number;
        mintemp_c:number;
    }
}

interface WeekForecast{
    data:{
        forecast:{
            forecastday:DayForecast[];
        }
    }
}


const Weekly = ({data}:WeekForecast) => {
    return ( 
       <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-7 gap-8 w-full ml-2">

{data.forecast.forecastday.map((day,index)=>(
    <div key={index} className="bg-white/40 p-2 text-center rounded-lg flex flex-col items-center">

    <p>{new Date(day.date).toLocaleString('en-US', { weekday: 'short' })}</p>
    <img src={day.day.condition.icon} alt={day.day.condition.text} />

    <div>
        <p>H {day.day.maxtemp_c.toFixed()} °C</p>
        <p>L {day.day.mintemp_c.toFixed()} °C</p>
    </div>

    </div>
))}


       </div>
     );
}
 
export default Weekly;
