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
            <h1>Today's Forecast</h1> 
            {search && (
            <Container className='container' style={{ display: 'flex', justifyContent: 'center'}}>
                <Card border="primary" style={{ width: '30rem'}}>
                    <Card.Header>{(new Date()).toString().split(' ').splice(0,4).join(' ')}</Card.Header>
                    <Card.Body >
                        <Card.Title >{search?.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <Card.Text style={{textAlign: 'left'}}>
                            <b>Description:</b> {search?.weather[0].description + ' '}
                            {search.weather[0].icon &&
                                <FontAwesomeIcon icon={search.weather[0].icon} />
                            }
                        </Card.Text>
                        <Card.Text style={{textAlign: 'left'}}>
                        <b>Temperature:</b> {kToF(search?.main.temp) + "°"}
                        </Card.Text>
                        <Card.Text style={{textAlign: 'left'}}>
                            <b>Low:</b> {kToF(search?.main.temp_min) + "°"} <b>High:</b> {kToF(search?.main.temp_max) + "°"} 
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </Container>
        )}
        </div>
    )
}
