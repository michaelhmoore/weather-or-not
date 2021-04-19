import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faSun, faCloudRain} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './SingleDay.css'



export default function SingleDay() {
    library.add(faCloud, faSun, faCloudRain)
    const search = useSelector((state) => {
        return state.search
    })

    function kToF(k) {
        let f = 9 / 5 * (k - 273) + 32;
        return Math.floor(f)
    }

    return (
        <div>
            <h2 style={{color: 'white'}}>Today's Forecast</h2> 
            {search && (
            <Container className='container' style={{ display: 'flex', justifyContent: 'center'}}>
                <Card border="primary" style={{ width: '30rem', boxShadow: '0.3em 0.3em 1em rgba(0,0,0,0.3)'}}>
                    <Card.Header>{(new Date()).toString().split(' ').splice(0,4).join(' ')}</Card.Header>
                    <Card.Body >
                        <Card.Title >{search?.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <Card.Text style={{textAlign: 'center', textTransform: 'capitalize'}}>
                            <b>Description:</b> {search?.weather[0].description + ' '}
                            {search.weather[0].icon &&
                                <FontAwesomeIcon icon={search.weather[0].icon} />
                            }
                        </Card.Text>
                        <Card.Text style={{textAlign: 'center'}}>
                        <b>Temperature:</b> {kToF(search?.main.temp) + "°"}
                        </Card.Text>
                        <Card.Text style={{textAlign: 'center'}}>
                            <b>Low:</b> {kToF(search?.main.temp_min) + "°"} <b>High:</b> {kToF(search?.main.temp_max) + "°"} 
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        )}
        </div>
    )
}
