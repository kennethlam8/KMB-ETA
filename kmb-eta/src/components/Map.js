import { useMemo, useState, useEffect, useCallback } from 'react';
import '../styles/Map.css'
import loadingIcon from '../assets/icon/loading.png'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'

const Map = ({ isCwkMarker, tkLatLng, cwkLatLng }) => {

    // const center = useMemo(() => ({ lat: 22.375396, lng: 114.108571 }), []);


    const center = () => isCwkMarker == false ? tkLatLng : cwkLatLng

    const [zoom, setZoom] = useState(18);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) {
        return (

            <div className='loading-image-container'>
                <img src={loadingIcon} className='loading-image' />
            </div>
        )
    }


    const position = [{ lat: 22.375396, lng: 114.108571 }, { lat: 22.374766, lng: 114.105738 }]

    return (

        <GoogleMap
            zoom={zoom}
            center={center()}
            mapContainerClassName="map-container"
            options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                keyboardShortcuts: false,
                termsMaps: false,
            }}

        >
            <MarkerF
                position={position[0]}
                icon={{
                    url: (require('../assets/icon/bus-stop-pointer.png')),
                    scaledSize: new window.google.maps.Size(40, 40)
                }}
            />

            <MarkerF
                position={position[1]}
                icon={{
                    url: (require('../assets/icon/bus-stop-pointer.png')),
                    scaledSize: new window.google.maps.Size(40, 40)
                }}
            />


        </GoogleMap>

    )
}

export default Map