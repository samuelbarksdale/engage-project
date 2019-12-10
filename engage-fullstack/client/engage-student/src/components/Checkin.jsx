import React from 'react';
import {Button, Container, Spinner, Col, Row} from 'react-bootstrap'

export default class Checkin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loading: false}

        this.GetGeolocation = this.GetGeolocation.bind(this);
    }

    GetGeolocation() {
        const geo = navigator.geolocation;

        if (!geo) {
           this.props.showAlert("warning", "Geolocation is not supported on your device!")
        }

        geo.getCurrentPosition((Position) => {
            this.setState({loading: false})
            document.getElementById("geolocate").removeAttribute("disabled")
            this.props.checkInSubmit(Position.coords)
        }, (error) => {
            this.setState({loading: false})
            this.props.showAlert("danger", error)
        });
    }

    render() {
        return (
            <Container>
                <Button 
                    id="geolocate"
                    size="lg" 
                    onClick={() => {
                        document.getElementById("geolocate").setAttribute("disabled", "true")
                        this.setState({loading: true})
                        this.GetGeolocation()
                    }}
                >
                    {
                        this.state.loading 
                        ? [<Spinner key={1} as="span" role="status" size="sm" animiation="border" />, <span key={2}>Loading...</span>]
                        : <span>Check In</span>
                    }
                </Button>
                <p>Please use a smartphone or GPS-equipped laptop.</p>
            </Container>  
        ); 
    }
   
};