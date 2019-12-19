import React, {useRef, useEffect} from 'react';

import './Map.css';

const Map = (props) => {
  const mapRef = useRef();

  const {center, zoom} = props;

  useEffect(() => {
    new window.google.maps.Marker(
      {
        position: center,
        map: new window.google.maps.Map(mapRef.current, 
          {
            center: center,
            zoom: zoom
          }
        )
      }
    )
  }, [center, zoom]);

  return (
    <div 
      ref={mapRef} 
      className={`map ${props.className}`} 
      style={props.style}
    >  </div>
  );
};

export default Map;