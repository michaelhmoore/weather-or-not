import React, { useEffect, useState } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloud, faSun, faCloudRain} from '@fortawesome/free-solid-svg-icons'
import './Home.css'
import bg from '../images/bg.svg'
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
    library.add(faCloud, faSun, faCloudRain)
    const [city, setCity] = useState(null);
    console.log(city)
   
    // add gifs conditionally
    // set up home page
        // get local weather and display, if possible
        // if not, randomly select from list of cities?

    useEffect(() => {
        $.ajax({
            type: "GET",
            url: 'https://geolocation-db.com/jsonp',
            data: null,
            async: false,
            jsonpCallback: 'callback',
            dataType : 'jsonp',   //you may use jsonp for cross origin request
            crossDomain:true,
            success: function(data, status, xhr) {
                console.log(data)
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=6a9041442398654862aa139442804dbe`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    data.weather.forEach((weather) => {
                        if (weather.description.includes('cloud')) {
                            weather.icon = 'cloud'
                        } else if (weather.description.includes('rain')) {
                            weather.icon = 'cloud-rain'
                        } else if (weather.description.includes('clear')) {
                            weather.icon = 'sun'
                        } else {
                            weather.icon = null
                        }
                    })
                    setCity(data)
                    console.log(city)
                })
            }
        })   
    }, [])

    function kToF(k) {
        let f = 9 / 5 * (k - 273) + 32;
        return Math.floor(f)
    }

    console.log(city)
 
    return (
        <div style={{ backgroundImage: `url(${bg})`, height: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <h1 style={{color: 'white', paddingTop: '60px', fontWeight: 'bold'}}>Weather or Not</h1>
            {city && (
            <Container className='container' style={{ display: 'flex', justifyContent: 'center'}}>
                <Row className="justify-content-md-center">
                    <Card border="primary" style={{ width: '30rem', marginTop: '10vh', boxShadow: '0.3em 0.3em 1em rgba(0,0,0,0.3)'}}>
                        <Card.Header>{(new Date()).toString().split(' ').splice(0,4).join(' ')}</Card.Header>
                        <Card.Body>
                            <Card.Title >{city?.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                            <Card.Text style={{textAlign: 'center', textTransform: 'capitalize'}}>
                                <b>Description:</b> {city?.weather[0].description + ' '} 
                                {city?.weather[0].icon &&
                                    <FontAwesomeIcon icon={city?.weather[0].icon} /> }
                            </Card.Text>
                            <Card.Text style={{textAlign: 'center'}}>
                            <b>Temperature:</b> {kToF(city?.main.temp) + "°"}
                            </Card.Text>
                            <Card.Text style={{textAlign: 'center'}}>
                            <b>Low:</b> {kToF(city?.main.temp_min) + "°"} <b>High:</b> {kToF(city?.main.temp_max) + "°"} 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
            )}
        </div>
    )
}