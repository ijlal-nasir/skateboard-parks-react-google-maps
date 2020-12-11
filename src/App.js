import './App.css';
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps';
import * as parks from './data/skateboard-parks.json';
import { useState } from 'react';


function Map(){

	const [selectedPark, setSelectedPark] = useState(null);

	return (
		<GoogleMap defaultZoom={10} defaultCenter={{ lat: 45.421532, lng: -75.697189 }} >
			{parks.features.map( park => (
				<Marker 
					key={park.properties.PARK_ID}
					position={{
						lat: park.geometry.coordinates[1],
						lng: park.geometry.coordinates[0]
					}}
					onClick={ () => {
						setSelectedPark(park);
					}}

					icon={{
						url: '/skateboarding.svg',
						scaledSize: new window.google.maps.Size(25, 25)
					}}
				/> 
			))}

			{selectedPark && (
				<InfoWindow
					position={{
						lat: selectedPark.geometry.coordinates[1],
						lng: selectedPark.geometry.coordinates[0]
					}}

					onCloseClick={ () => {
						setSelectedPark(null);
					}}
				>
					<div>
						<h2>{selectedPark.properties.NAME}</h2>
						<p>{selectedPark.properties.DESCRIPTIO}</p>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	)
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {


	return (
		<div className="App">
			<h1>Google Maps & React.js</h1>
			<WrappedMap 
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`}

				loadingElement={<div style={{height: '100%'}}></div>}

				containerElement={<div style={{height: '80vh'}}></div>}

				mapElement={<div style={{height: '100%'}}></div>}
			/>
		</div>
	);
}

export default App;
