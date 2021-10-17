import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import DetailProfile from './explore-detail-profile/explore-detail-profile';
import FundDetails from './explore-fund-details/explore-fund-details';
import AdditionalDocument from './additional-document/additional-document';
import { Route } from 'app/shared/model/enumerations/route.model';

import './explore.details.scss';
import { useSelector, useDispatch } from 'react-redux';

import { getEntity } from 'app/entities/opportunity/opportunity.reducer';
import { IRootState } from 'app/shared/reducers';

const ExploreDetails = (props: RouteComponentProps<{ id?: string }>) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const entity = useSelector((state: IRootState) => state.opportunity.entity);
  const customerAccount = useSelector((state: IRootState) => state.authentication.customerAccount);

  useEffect(() => {
    if (customerAccount.canApplyForOpportunities) {
      dispatch(getEntity(props.match.params.id));
    } else if (customerAccount && !customerAccount['canApplyForOpportunities']) {
      history.push(Route.EXPLORE);
    }
  }, [customerAccount]);
  return (
    <Container fluid={true}>
      <DetailProfile data={entity} />
      <FundDetails data={entity} />
      <AdditionalDocument />
    </Container>
  );
};

export default ExploreDetails;
