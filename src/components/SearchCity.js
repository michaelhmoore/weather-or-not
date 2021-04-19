import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { set5Day, setSearch } from '../redux/actions'


export default function SearchCity() {
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ searchResults ] = useState([])
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=6a9041442398654862aa139442804dbe`)
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    alert('Please double check your city spelling.')
                }
                data.weather.forEach((weather) => {
                    if (weather.description.includes('cloud')) {
                        data.weather[0].icon = 'cloud'
                    } else if (weather.description.includes('rain')) {
                        data.weather[0].icon = 'cloud-rain'
                    } else if (weather.description.includes('clear')) {
                        data.weather[0].icon = 'sun'
                    } else {
                        data.weather[0].icon = null
                    }
                }) 
                dispatch(setSearch(data))
            })
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=6a9041442398654862aa139442804dbe`)
        .then(res => res.json())
        .then(data => {
            data.list.forEach((weather) => {
                weather.dt_txt = weather.dt_txt.replace(' ', 'T') 
                if (weather.weather[0].description.includes('cloud')) {
                    weather.weather[0].icon = 'cloud'
                } else if (weather.weather[0].description.includes('rain')) {
                    weather.weather[0].icon = 'cloud-rain'
                } else if (weather.weather[0].description.includes('clear')) {
                    weather.weather[0].icon = 'sun'
                } else {
                    weather.weather[0].icon = null
                }
            })
            dispatch(set5Day(data))
        })
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <h1>{searchResults.name}</h1>
                        <Form onSubmit={handleSubmit}> 
                            <Form.Group controlId="formSearch">
                                <Form.Label style={{color: 'white'}}>City Weather Search</Form.Label>
                                    <Form.Control 
                                    value = {searchTerm}
                                    type="text" 
                                    placeholder="Search for city here." 
                                    onChange={handleChange}
                                    />
                            <Button style={{margin: '15px'}} as="input" type="submit" value="Search"/>{' '}
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
