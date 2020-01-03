import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/card/Card';
import Button from '../../shared/components/FormElements/button/Button';
import Modal from '../../shared/components/UIElements/modal/Modal';
import Map from '../../shared/components/UIElements/map/Map';
import './PlaceItem.css';
import { AuthenticationContext } from '../../shared/context/authentication-context';

const PlaceItem = (props) => {
  const auth = useContext(AuthenticationContext);
  const {
    id, address, coordinates, image, title, description
  } = props;
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);
  const displayDeleteWarningModal = () => setShowConfirmModal(true);
  const cancelDeleteWarningModal = () => setShowConfirmModal(false);
  const confirmDelete = () => {
    console.log('DELETED');
    setShowConfirmModal(false);
  };

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
        show={showConfirmModal}
        onCancel={cancelDeleteWarningModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={(
          <>
            <Button inverse onClick={cancelDeleteWarningModal}>CANCEL</Button>
            <Button danger onClick={confirmDelete}>DELETE</Button>
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
            {auth.isLoggedIn && (
              <>
                <Button to={`/places/${id}`}>Edit Place</Button>
                <Button danger onClick={displayDeleteWarningModal}>Delete Place</Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
