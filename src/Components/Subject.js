import React, { Component } from 'react';
import {Card} from 'react-bootstrap';

const Subject=(props)=> {
    return (
        <Card className="text-center">
            <Card.Body className="d-flex align-items-center">
                {props.subject}
            </Card.Body>
        </Card>
    );
}

export default Subject;