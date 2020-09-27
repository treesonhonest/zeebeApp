import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './student.reducer';
import { IStudent } from 'app/shared/model/student.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StudentDetail = (props: IStudentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { studentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="zeebeApp.student.detail.title">Student</Translate> [<b>{studentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="zeebeApp.student.name">Name</Translate>
            </span>
          </dt>
          <dd>{studentEntity.name}</dd>
          <dt>
            <span id="age">
              <Translate contentKey="zeebeApp.student.age">Age</Translate>
            </span>
          </dt>
          <dd>{studentEntity.age}</dd>
          <dt>
            <Translate contentKey="zeebeApp.student.teacher">Teacher</Translate>
          </dt>
          <dd>{studentEntity.teacher ? studentEntity.teacher.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/student" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/student/${studentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ student }: IRootState) => ({
  studentEntity: student.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);
