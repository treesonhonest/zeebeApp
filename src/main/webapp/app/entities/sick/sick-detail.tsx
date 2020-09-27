import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sick.reducer';
import { ISick } from 'app/shared/model/sick.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISickDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SickDetail = (props: ISickDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { sickEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="zeebeApp.sick.detail.title">Sick</Translate> [<b>{sickEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reason">
              <Translate contentKey="zeebeApp.sick.reason">Reason</Translate>
            </span>
          </dt>
          <dd>{sickEntity.reason}</dd>
          <dt>
            <span id="days">
              <Translate contentKey="zeebeApp.sick.days">Days</Translate>
            </span>
          </dt>
          <dd>{sickEntity.days}</dd>
          <dt>
            <span id="jobKey">
              <Translate contentKey="zeebeApp.sick.jobKey">Job Key</Translate>
            </span>
          </dt>
          <dd>{sickEntity.jobKey}</dd>
        </dl>
        <Button tag={Link} to="/sick" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sick/${sickEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ sick }: IRootState) => ({
  sickEntity: sick.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SickDetail);
