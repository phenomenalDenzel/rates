import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { INextOfKin } from 'app/shared/model/next-of-kin.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './next-of-kin.reducer';

export interface INextOfKinDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NextOfKinDeleteDialog = (props: INextOfKinDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/next-of-kin');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.nextOfKinEntity.id);
  };

  const { nextOfKinEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="ratesApp.nextOfKin.delete.question">
        <Translate contentKey="ratesApp.nextOfKin.delete.question" interpolate={{ id: nextOfKinEntity.id }}>
          Are you sure you want to delete this NextOfKin?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-nextOfKin" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ nextOfKin }: IRootState) => ({
  nextOfKinEntity: nextOfKin.entity,
  updateSuccess: nextOfKin.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NextOfKinDeleteDialog);
