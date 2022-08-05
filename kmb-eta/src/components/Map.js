import { useMemo, useState, useEffect, useCallback } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'

function Map() {

    const center = useMemo(() => ({ lat: 22.375396, lng: 114.108571 }), []);

    const [zoom, setZoom] = useState(18);


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>

    return (

        <GoogleMap
            zoom={zoom}
            center={center}
            mapContainerClassName="map-container"
            options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
            }}

        >
            <MarkerF
                position={{ lat: 22.375396, lng: 114.108571 }}
                icon={{
                    url: (require('../assets/icon/bus-stop-pointer.png')),
                    scaledSize: new window.google.maps.Size(40, 40)
                }}
            />

            <MarkerF
                position={{ lat: 22.374766, lng: 114.105738 }}
                icon={{
                    url: (require('../assets/icon/bus-stop-pointer.png')),
                    scaledSize: new window.google.maps.Size(40, 40)
                }}
            />

        </GoogleMap>

    )
}

export default Map