const { url } = require('inspector');
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=6c0f2b036f3b1bfc2ae09a127afe521e&query=' + latitude +',' + longitude;
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location!', undefined)
        }else{
            callback(undefined,
                body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature + ' degrees out there. But it feels like ' + body.current.feelslike +' degrees. The humidity is ' + body.current.humidity + '%. Precipitation is ' +body.current.precip
            )
        }
        
    })
}

module.exports = forecast;




