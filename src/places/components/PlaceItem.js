import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/card/Card';
import Button from '../../shared/components/FormElements/button/Button';
import Modal from '../../shared/components/UIElements/modal/Modal';
import Map from '../../shared/components/UIElements/map/Map';
import LoadingSpinner from '../../shared/components/UIElements/loadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/modal/ErrorModal';
import { AuthenticationContext } from '../../shared/context/authentication-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PlaceItem.css';

const PlaceItem = (props) => {
  const {
    isLoading, error, sendRequest, clearError
  } = useHttpClient();
  const auth = useContext(AuthenticationContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {
    id, address, coordinates, image, title, description, creatorId
  } = props;

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);
  const displayDeleteWarningModal = () => setShowConfirmModal(true);
  const cancelDeleteWarningModal = () => setShowConfirmModal(false);

  const confirmDelete = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`http://localhost:5000/api/places${id}`, 'DELETE');
      props.onDelete(id);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
          {isLoading && (<LoadingSpinner asOverlay />)}
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
            {auth.userId === creatorId && (
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
