import { MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBBtn } from 'mdbreact'
import React, { Component } from 'react'
import Navbar from '../components/share/Navbar'
import { TamperBlock } from '../Redux/Actions/BlockChainAction'
import { connect } from 'react-redux'

class Tamper extends Component {
    state = {
        amount: '',
    }
    tamperingBlock = () => {
        const form = {
            hash: this.props.match.params.id,
            amount: this.state.amount
        }
        this.props.TamperBlock(form)
        this.props.history.push('/home')
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
    render() {
        return (
            <div>
                <Navbar /><br />
                <MDBContainer>
                    <MDBCard id="classic-card">
                        <MDBCardBody className="black-text">
                            <h3 className="text-center">
                                <MDBIcon icon="user" /> Block Chain Tampering:
                            </h3>
                            <hr className="hr-light" />
                            <MDBInput
                                className="black-text"
                                iconClass="black-text"
                                label="Enter Amount"
                                icon="lock"
                                type="number"
                                id="amount"
                                value={this.state.amount}
                                onChange={this.handleChange}
                            />
                            <div className="text-center mt-4 black-text">
                                <MDBBtn color="white" onClick={this.tamperingBlock} > Tamper
                                </MDBBtn>
                                <hr className="hr-light" />
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
        )
    }
}
const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { TamperBlock })(Tamper)
