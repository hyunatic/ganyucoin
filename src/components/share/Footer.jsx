import React, { Component } from 'react'
import { MDBFooter } from 'mdbreact';

export default class Footer extends Component {
    /**
     * Footer 
     * @returns Footer
     */
    render() {
        return (
            <div>
                <MDBFooter className="fixed-bottom" color='indigo'>
                    <p className='footer-copyright mb-0 py-3 text-center'>
                        &copy; {new Date().getFullYear()} Copyright:
              <a href='#'> Iskandar(NTU Project) </a>
                    </p>
                </MDBFooter>
            </div>
        )
    }
}
