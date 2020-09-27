import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sick.reducer';
import { ISick } from 'app/shared/model/sick.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISickProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Sick = (props: ISickProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { sickList, match, loading } = props;
  return (
    <div>
      <h2 id="sick-heading">
        <Translate contentKey="zeebeApp.sick.home.title">Sicks</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="zeebeApp.sick.home.createLabel">Create new Sick</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {sickList && sickList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="zeebeApp.sick.reason">Reason</Translate>
                </th>
                <th>
                  <Translate contentKey="zeebeApp.sick.days">Days</Translate>
                </th>
                <th>
                  <Translate contentKey="zeebeApp.sick.jobKey">Job Key</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sickList.map((sick, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${sick.id}`} color="link" size="sm">
                      {sick.id}
                    </Button>
                  </td>
                  <td>{sick.reason}</td>
                  <td>{sick.days}</td>
                  <td>{sick.jobKey}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${sick.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sick.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${sick.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
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
              <Translate contentKey="zeebeApp.sick.home.notFound">No Sicks found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ sick }: IRootState) => ({
  sickList: sick.entities,
  loading: sick.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sick);
