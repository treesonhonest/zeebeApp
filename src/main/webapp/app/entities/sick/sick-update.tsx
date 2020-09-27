import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './sick.reducer';
import { ISick } from 'app/shared/model/sick.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISickUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SickUpdate = (props: ISickUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { sickEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/sick');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...sickEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="zeebeApp.sick.home.createOrEditLabel">
            <Translate contentKey="zeebeApp.sick.home.createOrEditLabel">Create or edit a Sick</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : sickEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="sick-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="sick-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="reasonLabel" for="sick-reason">
                  <Translate contentKey="zeebeApp.sick.reason">Reason</Translate>
                </Label>
                <AvField id="sick-reason" type="text" name="reason" />
              </AvGroup>
              <AvGroup>
                <Label id="daysLabel" for="sick-days">
                  <Translate contentKey="zeebeApp.sick.days">Days</Translate>
                </Label>
                <AvField id="sick-days" type="string" className="form-control" name="days" />
              </AvGroup>
              <AvGroup>
                <Label id="jobKeyLabel" for="sick-jobKey">
                  <Translate contentKey="zeebeApp.sick.jobKey">Job Key</Translate>
                </Label>
                <AvField id="sick-jobKey" type="string" className="form-control" name="jobKey" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/sick" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  sickEntity: storeState.sick.entity,
  loading: storeState.sick.loading,
  updating: storeState.sick.updating,
  updateSuccess: storeState.sick.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SickUpdate);
