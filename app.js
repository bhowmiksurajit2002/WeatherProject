
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const { response } = require("express");
const geolocation = require('@react-native-community/geolocation');






app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const _ = require('lodash');



//GET Request for new page (5 day page)
app.get("/:parameter",function(req,res){
    var cname= req.params.parameter;
    const url1="https://api.openweathermap.org/data/2.5/forecast?q="+cname+"&appid=ca65adc31695c9c98aa02edd7eb9755b&units=metric";
    let chunks = [];


    https.get(url1,function(response){
    response.on('data', function(data) {
     chunks.push(data);
    }).on('end', function() {
     let data   = Buffer.concat(chunks);
    let weatherData2 = JSON.parse(data);
    const cityName = _.capitalize(cname);



    var List =[];
    List =weatherData2.list;
    if(typeof List==='undefined')
    {
        console.log("List is not defined");
        
    }

    else{
       


        //Day Calculation
        d = new Date();
            localTime = d.getTime();
            localOffset = d.getTimezoneOffset() * 60000;
            utc = localTime + localOffset;
            var c = utc + (1000 *weatherData2. city.timezone);
            const date =  new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit'}).format(new Date(c));
            const time  = new Date(c)
            console.log(time.getDay());
            //([], {hour: '2-digit', minute:'2-digit'});

          /*
          var t =time.setDate(time.getDate() + 1);
          console.log(time)
          var abc = new Date(time);
         console.log(abc.getDay());
   */



        
        const d1 =time.setDate(time.getDate() + 1);
        const mydate1 = new Date(d1);
        var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][mydate1.getDay()];
         const day1 = day;
         console.log(day1);


         const d2 =time.setDate(time.getDate() + 1);
         const mydate2 = new Date(d2);
         day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][mydate2.getDay()];
         const day2 = day;
         console.log(day2);


         const d3 =time.setDate(time.getDate() + 1);
        const mydate3 = new Date(d3);
         day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][mydate3.getDay()];
         const day3 = day;
         console.log(day3);

         const d4 =time.setDate(time.getDate() + 1);
        const mydate4 = new Date(d4);
         day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][mydate4.getDay()];
         const day4 = day;
         console.log(day4);


         const d5 =time.setDate(time.getDate() + 1);
        const mydate5 = new Date(d5);
         day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][mydate5.getDay()];
         const day5 = day;
         console.log(day5);

         
         const icon1 = List[10].weather[0].icon;
         const imgUrl1 = "http://openweathermap.org/img/wn/"+icon1+"@2x.png";

         const icon2 =  List[18].weather[0].icon;
         const imgUrl2 = "http://openweathermap.org/img/wn/"+icon2+"@2x.png";

         const icon3 =  List[26].weather[0].icon;
         const imgUrl3 = "http://openweathermap.org/img/wn/"+icon3+"@2x.png";

         const icon4 =  List[34].weather[0].icon;
         const imgUrl4 = "http://openweathermap.org/img/wn/"+icon4+"@2x.png";

         const icon5 =  List[39].weather[0].icon;
         const imgUrl5 = "http://openweathermap.org/img/wn/"+icon5+"@2x.png";






        res.render('nextfive',{list:List,Day1:day1,Day2:day2,Day3:day3,Day4:day4,Day5:day5,imgurl1:imgUrl1,imgurl2:imgUrl2,imgurl3:imgUrl3,imgurl4:imgUrl4,imgurl5:imgUrl5,city:cname});
    }
  
});

});

});







app.get("/",function(req,res){

 
 const cName="kolaghat";

    const url ="https://api.openweathermap.org/data/2.5/weather?q="+cName+"&appid=ca65adc31695c9c98aa02edd7eb9755b&units=metric";
  
        https.get(url,function(response){
        response.on("data",function(data){
            
            const weatherData = JSON.parse(data);
            
            const cityName = _.capitalize(cName);

            
            /*Date Calculation */
            d = new Date();
            localTime = d.getTime();
            localOffset = d.getTimezoneOffset() * 60000;
            utc = localTime + localOffset;
            var c = utc + (1000 *weatherData.timezone );
            const date =  new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit'}).format(new Date(c));
            const time  = new Date(c).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
           
           
           
            const temperature= parseInt(weatherData.main.temp);
            const weatherDescription = weatherData.weather[0].description;
            const cloudPercentage =weatherData.clouds.all;
            const Humidity  =weatherData.main.humidity;
            const windSpeed=weatherData.wind.speed;
            const icon =weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const weatherMain= weatherData.weather[0].main;
           
             
           



        
            res.render("home",{weathermain:weatherMain,imgurl:imgUrl,windspeed:windSpeed,city:cityName,Date:date,Time:time,temp:temperature,weatherdescription:weatherDescription,cloudpercentage:cloudPercentage,humidity:Humidity});
          
        })
    })
   

});











app.post("/",function(req,res){
    const  cName = req.body.city;
     const url ="https://api.openweathermap.org/data/2.5/weather?q="+cName+"&appid=ca65adc31695c9c98aa02edd7eb9755b&units=metric";
     https.get(url,function(response){
        response.on("data",function(data){
            
            const weatherData = JSON.parse(data);
            
            const cityName = _.capitalize(cName);

            
            /*Date Calculation */
            d = new Date();
            localTime = d.getTime();
            localOffset = d.getTimezoneOffset() * 60000;
            utc = localTime + localOffset;
            var c = utc + (1000 *weatherData.timezone );
            const date =  new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit'}).format(new Date(c));
            const time  = new Date(c).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
           
           
           
            const temperature= parseInt(weatherData.main.temp);
            const weatherDescription = weatherData.weather[0].description;
            const cloudPercentage =weatherData.clouds.all;
            const Humidity  =weatherData.main.humidity;
            const windSpeed=weatherData.wind.speed;
            const icon =weatherData.weather[0].icon;
            const weatherMain= weatherData.weather[0].main;
            const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
           
            

           



        
            res.render("home",{weathermain:weatherMain,imgurl:imgUrl,windspeed:windSpeed,city:cityName,Date:date,Time:time,temp:temperature,weatherdescription:weatherDescription,cloudpercentage:cloudPercentage,humidity:Humidity});
          
        })
    })
    
});





app.listen(process.env.PORT || 4000,function(){
    console.log("Server  is running");
});