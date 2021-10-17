import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IOpportunityDocument } from 'app/shared/model/opportunity-document.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './opportunity-document.reducer';

export interface IOpportunityDocumentDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OpportunityDocumentDeleteDialog = (props: IOpportunityDocumentDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/opportunity-document');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.opportunityDocumentEntity.id);
  };

  const { opportunityDocumentEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="ratesApp.opportunityDocument.delete.question">
        <Translate contentKey="ratesApp.opportunityDocument.delete.question" interpolate={{ id: opportunityDocumentEntity.id }}>
          Are you sure you want to delete this OpportunityDocument?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-opportunityDocument" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ opportunityDocument }: IRootState) => ({
  opportunityDocumentEntity: opportunityDocument.entity,
  updateSuccess: opportunityDocument.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDocumentDeleteDialog);
