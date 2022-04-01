import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBAnimation, MDBBtn } from "mdbreact"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Navbar from '../components/share/Navbar'
import Footer from '../components/share/Footer'
import { getChain, validBlockChain, mineCoin, GetBalance } from '../Redux/Actions/BlockChainAction'
import BlockCard from '../components/homepage/BlockCard'

class Home extends Component {
    componentDidMount() {
        this.getDetails()
    }
    getDetails = () => {
        this.props.getChain()
        this.props.validBlockChain()
        this.props.GetBalance(localStorage.getItem("name"))
    }
    mineCoin = () => {
        this.props.mineCoin(localStorage.getItem("name"))
        this.getDetails()
    }
    goToTamperPage = (hash) => {
        this.props.history.push('/tamper/'+ hash)
    }
    render() {
        const chain = this.props.block
        return (
            <div>
                <Navbar /><br />
                <MDBContainer>
                    <MDBRow>
                        {chain && chain.map(x => <MDBCol size="4"><BlockCard key={x.hash} details={x} validChain={this.props.valid} Navigate={this.goToTamperPage} /> </MDBCol>)}
                    </MDBRow>
                    <h3>Details</h3>
                    <hr />
                    You have {this.props.balanceCoin} Coins
                    <MDBBtn onClick={this.mineCoin}>Mine</MDBBtn>
                    <MDBBtn onClick={() => this.props.history.push('/transfer')}>Transfer</MDBBtn>
                </MDBContainer>
                <br />
                <br />
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    block: state.blockchain.blocks,
    valid: state.blockchain.validChain,
    balanceCoin: state.blockchain.balance
});

export default connect(mapStateToProps, { GetBalance, getChain, validBlockChain, mineCoin })(Home)
