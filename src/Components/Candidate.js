import React, { Component } from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { async } from 'regenerator-runtime';

class Candidate extends Component {

    constructor(props) {
        super(props)
        this.state={
            voteState:this.props.buttonState,
            displayVote:'none',
            voteTotal:'--'
        }
    }

    alreadyVoted=async()=>{
        let didVote=await window.contract.didVote()
        if (!didVote) {
            this.setState({voteState:false})
        } else {
            this.setState({displayVote:'block'})
        }
    }

    addVote=async()=>{
        this.props.modButton();
        window.contract.addVote({candidate:this.props.title})
        // this.setState({displayVote:'block'})
    }

    getTotal=async()=> {
        let total = await window.contract.getVotes({candidate:this.props.title})
        this.setState({
            voteTotal:total
        })
    }

    componentDidMount() {
        this.alreadyVoted()
        this.getTotal()
    }

    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            this.setState({voteState:true})
        }
    }

    render() {
        return (
            <div>
                <Card className="text-center" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.picture} />
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>
                            {this.props.description}
                        </Card.Text>
                        <Button onClick={this.addVote} disabled={this.state.voteState} variant="primary">Vote</Button>
                        <ListGroup style={{display:this.state.displayVote}}>
                            <ListGroupItem>
                                {this.state.voteTotal}
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Candidate;