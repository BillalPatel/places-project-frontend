import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/card/Card';
import Button from '../../shared/components/FormElements/button/Button';
import Modal from '../../shared/components/UIElements/modal/Modal';
import Map from '../../shared/components/UIElements/map/Map';
import './PlaceItem.css';

const PlaceItem = (props) => {
  const {
    id, address, coordinates, image, title, description
  } = props;
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setConfirmShowModal] = useState(false);

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>Close Modal</Button>}
      >
        <div className="map-container">
          <Map
            center={coordinates}
            zoom={16}
          />
        </div>
      </Modal>
      <Modal
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={(
          <>
            <Button inverse>CANCEL</Button>
            <Button danger>DELETE</Button>
          </>
        )}
      >
        <p>Are you sure you want to delete this place?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>View Place On Map</Button>
            <Button to={`/places/${id}`}>Edit Place</Button>
            <Button danger>Delete Place</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
