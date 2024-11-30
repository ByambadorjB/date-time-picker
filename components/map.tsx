'use client'

import React from "react"
import { LatLong } from '@/types';
import { useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";
import { useRef } from "react";
import { useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";

const libs: Library[] = ["core", "maps", "places", "marker" ]


function Map(latlong: LatLong) {

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null> (null)

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string, 
        libraries: libs
    })

    const mapRef = useRef<HTMLDivElement>(null)
    const placeAutoCompleteRef = useRef<HTMLInputElement>(null)

    const [selectedPlace, setSelectedPlace] =useState<string | null>(null)

    useEffect(() => {
        if(isLoaded){
            console.log("Google Maps API loaded, initializing map...");
            const mapOptions = {
                center: {
                    // lat: latlong.coordinates[0],
                    // lng: latlong.coordinates[1]
                    lat: latlong.lat,
                    lng: latlong.lng
                }, 
                zoom: 17,
                mapId: 'Map-1234'
            }

            // Setup the map
            const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions)
            
            // limit the place bounds
            const sydneyBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng({ lat: -33.948889583475015, lng: 151.00057495422325}),
                new google.maps.LatLng({ lat: -33.747252372905486, lng: 151.27928808261808})
                
            )
            // setup autocomplete
            const gAutoComplete = new google.maps.places.Autocomplete(placeAutoCompleteRef.current as HTMLInputElement, {
                bounds: sydneyBounds,
                fields: ['formatted_address', 'geometry', 'name',],
                componentRestrictions: {
                    country: ['au']
                }
            })
            setAutoComplete(gAutoComplete)
            setMap(gMap);
        }
    }, [isLoaded, latlong])

    useEffect(() => {
        if(autoComplete){
            autoComplete.addListener('place_changed', () => {
                const place = autoComplete.getPlace()
                const field = autoComplete.getFields()
                const bounds = autoComplete.getBounds()
                console.log('Place' + {place})
                console.log(place)
                console.log('Fileds' + {field})
                console.log(field)
                console.log('Place' + {bounds})
                console.log(bounds)
                setSelectedPlace(place.formatted_address as string)
                const position = place.geometry?.location

                if(position){
                    // place a marker
                    setMarker(position, place.name!)
                }
            })
        }
    }, [autoComplete])

    function setMarker(location: google.maps.LatLng, name: string){

        if(!map) return

        console.log(name)
        map.setCenter(location)
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: location, 
            title: "Marker"
        })
        console.log(marker)
    }

    return (
        <div className="flex flex-col space-y-4">
            <Input ref={placeAutoCompleteRef}/>
            <Label>
                {selectedPlace}
            </Label>
            {isLoaded ?
                <div style={{height: '400px'}} ref = {mapRef} />
                : <p>Loading ...</p>
                
            }
        </div>
    )
}

export default Map