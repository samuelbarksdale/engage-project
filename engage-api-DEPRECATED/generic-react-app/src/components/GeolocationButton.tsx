import React, {useState} from 'react';

interface IProps {
    onPositionChange: (positionCoords: Coordinates) => void;
}

export const GeolocationButton = ({onPositionChange}: IProps) => {
    const [position, setPosition] = useState(null);


    const GetGeolocation = () => {
        const geo = navigator.geolocation;

        if (!geo) {
            console.log('Geolocation is not supported');
            return;
        }

        geo.getCurrentPosition((Position) => {
            setPosition(Position.coords)
            onPositionChange(Position.coords);
        }, (error) => {
            console.error(error);
        });
    };


    return (
        <div>
            <button onClick={() => GetGeolocation()}>Click Here for Geolocation</button>
            <br></br>
            <code>
                latitude: {position && position.latitude}<br/>
                longitude: {position && position.longitude}<br/>
            </code>
        </div>
    );
};