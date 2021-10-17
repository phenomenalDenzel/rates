import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useParams, useHistory } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IOtp } from 'app/shared/model/otp.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './otp.reducer';
import { Route } from 'app/shared/model/enumerations/route.model';

export const OtpDeleteDialog = () => {
  const dispatch = useDispatch();
  const otpEntity = useSelector((state: IRootState) => state.otp.entity);
  const updateSuccess = useSelector((state: IRootState) => state.otp.updateSuccess);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const handleClose = () => {
    history.push(Route.OTP);
  };

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(otpEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="ratesApp.otp.delete.question">
        <Translate contentKey="ratesApp.otp.delete.question" interpolate={{ id: otpEntity.id }}>
          Are you sure you want to delete this Otp?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-otp" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default OtpDeleteDialog;
