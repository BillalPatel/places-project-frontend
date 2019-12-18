import React, {useState} from 'react';

import Card from '../../shared/components/UIElements/card/Card';
import Button from '../../shared/components/FormElements/button/Button';
import Modal from '../../shared/components/UIElements/modal/Modal';
import './PlaceItem.css';

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const openMap = () => {
    return setShowMap(true);
  }

  const closeMap = () => {
    return setShowMap(false);
  }

  return (
    <>
      <Modal 
        show={showMap} 
        onCancel={closeMap} 
        header={props.address} 
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>Close Modal</Button>}
      >
        <div className="map-container">
          <h1>Map</h1>
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse>View Place On Map</Button>
            <Button to={`/places/${props.id}`}>Edit Place</Button>
            <Button danger>Delete Place</Button>
          </div>
        </Card>
      </li>
    </>
  )
}

export default PlaceItem;