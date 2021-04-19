import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faSun, faCloudRain} from '@fortawesome/free-solid-svg-icons'
import { Card, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import './FiveDay.css'



export default function FiveDay() {
    library.add(faCloud, faSun, faCloudRain)
    const search = useSelector((state) => {
        return state.search5Day
    })

    function kToF(k) {
        let f = 9 / 5 * (k - 273) + 32;
        return Math.floor(f)
    }

    // ternary for font color whether above or below temp., if I have time
    // after adding backgrounds and dropshadow
    // style = {{ color :  weather.temp > 60  ?  "red" :  (weather.temp < 45 ? "blue" : "none")}}
    // weather.temp > 60 ? "red" : "blue"      

    return (
        <div>
            <h2 style={{color: 'white'}}>Five Day Forecast</h2>
            <Container fluid="xl">
                <Row className="justify-content-md-center">
            {search?.list.filter((item, i) => ((i) % 8 === 0)).map((searchResult) => {
                return (
                <Card border="primary" key={searchResult.dt} style={{ width: '18rem', margin: '10px', boxShadow: '0.3em 0.3em 1em rgba(0,0,0,0.3)' }}>
                    <Card.Header>{(new Date(searchResult.dt_txt)).toString().split(' ').splice(0,4).join(' ')}</Card.Header>
                    <Card.Body style={{justifyContent: 'left'}}>
                        <Card.Title>{search.city.name}</Card.Title>
                        <Card.Text style={{textTransform: 'capitalize'}}>
                            {searchResult.weather[0].description + ' '} 
                            {searchResult.weather[0].icon &&
                            <FontAwesomeIcon icon={searchResult.weather[0].icon} />
                            }
                        </Card.Text>
                        <Card.Text>
                            <b>Temperature:</b> {kToF(searchResult.main.temp) + "°"}
                        </Card.Text>
                        <Card.Text>
                           <b>Low:</b> {kToF(searchResult.main.temp_min) + "°"} <b>High:</b> {kToF(searchResult.main.temp_max) + "°"} 
                        </Card.Text>
                        <Card.Link href="#"></Card.Link>
                    </Card.Body>
                </Card>
                )
            })}
            </Row>
            </Container>
    </div>
    )
}
