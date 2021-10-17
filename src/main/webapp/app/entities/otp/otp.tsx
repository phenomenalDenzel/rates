import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './otp.reducer';
import { IOtp } from 'app/shared/model/otp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Route, getOtp, editOtp, deleteOtp } from 'app/shared/model/enumerations/route.model';

export const Otp = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.otp);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getEntities());
  }, []);

  const startSearching = () => {
    if (search) {
      dispatch(getSearchEntities(search));
    }
  };

  const clear = () => {
    setSearch('');
    dispatch(getEntities());
  };

  const handleSearch = event => setSearch(event.target.value);
  const { entities, loading } = select;
  const otpList = entities;
  return (
    <div>
      <h2 id="otp-heading">
        <Translate contentKey="ratesApp.otp.home.title">Otps</Translate>
        <Link to={`${Route.OTP}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ratesApp.otp.home.createLabel">Create new Otp</Translate>
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('ratesApp.otp.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {otpList && otpList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.otp.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.otp.action">Action</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.otp.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.otp.createdTime">Created Time</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.otp.used">Used</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {otpList.map((otp, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${getOtp(otp.id)}`} color="link" size="sm">
                      {otp.id}
                    </Button>
                  </td>
                  <td>{otp.code}</td>
                  <td>
                    <Translate contentKey={`ratesApp.OtpAction.${otp.action}`} />
                  </td>
                  <td>{otp.email}</td>
                  <td>{otp.createdTime ? <TextFormat type="date" value={otp.createdTime} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{otp.used ? 'true' : 'false'}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={getOtp(otp.id)} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={editOtp(otp.id)} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={deleteOtp(otp.id)} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ratesApp.otp.home.notFound">No Otps found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Otp;
