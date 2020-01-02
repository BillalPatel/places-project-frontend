import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = (props) => {
  const mapRef = useRef();

  const {
    center, zoom, className, style
  } = props;

  useEffect(() => {
    new window.google.maps.Marker(
      {
        position: center,
        map: new window.google.maps.Map(mapRef.current,
          {
            center,
            zoom
          })
      }
    );
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${className}`}
      style={style}
    />
  );
};

export default Map;
