import { useState, useEffect } from 'react';
import '../styles/Map.css'
import { GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api'
import currentStop from '../assets/icon/bus-stop-pointer.png'
import otherStop from '../assets/icon/bus-stop-grey-pointer.png'


const Map = ({ isCwkMarker, tkLatLng, cwkLatLng, stopId, route, direction, service, busStopName, isRouteShow, isShowAllStops }) => {

    const google = window.google;

    const [directions, setDirections] = useState(null)
    const directionsService = new google.maps.DirectionsService()

    const center = () => isCwkMarker === false ? tkLatLng : cwkLatLng
    const position = [tkLatLng, cwkLatLng]

    const [isMapRouteShow, setIsMapRouteShow] = useState(false)


    console.log('isRouteShow:', isRouteShow)
    console.log('directions:', directions)

    useEffect(() => {
        getBusRoute()
    }, [isRouteShow])


    const getBusRoute = async () => {
        let routeStopArray = []
        let routeDirection = (direction == "0") ? "outbound" : "inbound"
        let routeStopRes = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/route-stop/${route}/${routeDirection}/${service}`)
        let busRoute = await routeStopRes.json();

        for (let i = 0; i < busRoute.data.length - 1; i = i + Math.ceil(busRoute.data.length / 24)) {
            if (stopId != busRoute.data[i].stop) {
                let res = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/stop/${busRoute.data[i].stop}`)
                let eachStop = await res.json();
                routeStopArray.push({ lat: parseFloat(eachStop.data.lat), lng: parseFloat(eachStop.data.long) })
            }
        }


        let finalDestinationRes = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/stop/${busRoute.data[busRoute.data.length - 1].stop}`)
        let lastBusStop = await finalDestinationRes.json();
        routeStopArray.push({ lat: parseFloat(lastBusStop.data.lat), lng: parseFloat(lastBusStop.data.long) })


        let busRouteResult = await directionsService.route({
            origin: new google.maps.LatLng(routeStopArray[0].lat, routeStopArray[0].lng),
            destination: new google.maps.LatLng(routeStopArray[routeStopArray.length - 1].lat, routeStopArray[routeStopArray.length - 1].lng),
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: routeStopArray.slice(1, routeStopArray.length - 1).map(point => {
                return { location: new google.maps.LatLng(point.lat, point.lng) }
            })
        })
        setDirections(busRouteResult)
    }

    return (

        <GoogleMap
            zoom={18}
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
                    url: (currentStop),
                    scaledSize: new window.google.maps.Size(40, 40)
                }}
                label={{
                    text: `${busStopName}`,
                    className: "currentLocationLabel",
                    color: "#121212",
                    fontSize: "16px",
                    fontWeight: "bold"
                }}
            />

            <MarkerF
                position={position[1]}
                icon={{
                    url: (currentStop),
                    scaledSize: new window.google.maps.Size(40, 40)
                }}
                label={{
                    text: `${busStopName}`,
                    className: "currentLocationLabel",
                    color: "#121212",
                    fontSize: "16px",
                    fontWeight: "bold"
                }}
            />

            {directions && isRouteShow ?
                (
                    <DirectionsRenderer
                        directions={directions}
                        options={{
                            markerOptions: {
                                icon: {
                                    url: (otherStop),
                                    scaledSize: new google.maps.Size(40, 40)
                                }
                            },
                            preserveViewport: true,
                            polylineOptions: { strokeColor: "#ED1F28", strokeWeight: 5 }
                        }}
                    />
                )
                :
                (
                    <DirectionsRenderer
                        directions={directions}
                        options={{
                            markerOptions: {
                                icon: {
                                    url: (otherStop),
                                    scaledSize: new google.maps.Size(0, 0)
                                }
                            },
                            preserveViewport: true,
                            polylineOptions: { strokeColor: "transparent", strokeWeight: 5 }
                        }}
                    />
                )
            }

        </GoogleMap>

    )
}

export default Map