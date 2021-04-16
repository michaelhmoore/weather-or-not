import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faSun, faCloudRain} from '@fortawesome/free-solid-svg-icons'
import { Card, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import './FiveDay.css'


export default function FiveDay() {
    // const [searchResults, setSearchResults] = useState([])
    // fontawesome.library.add(faCheckSquare, faCoffee);
    library.add(faCloud, faSun, faCloudRain)
    const search = useSelector((state) => {
        return state.search5Day
    })

    function kToF(k) {
        let f = 9 / 5 * (k - 273) + 32;
        return Math.floor(f)
    }



    return (
        <div>
            <h2>Five Day Forecast</h2>
            <Container fluid="xl">
                <Row className="justify-content-md-center">
            {search?.list.filter((item, i) => ((i) % 8 === 0)).map((searchResult) => {
                return (
                <Card key={searchResult.dt} style={{ width: '18rem', margin: '10px' }}>
                    <Card.Img variant="top" src="../public/cloud.jpg" />
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
