import React, { Component } from 'react'

class PopUp extends Component {
    constructor(props) {
        super(props)
    }

    reset = () => {
        this.props.closeTopTerms()
    }
    render() {
       let searchedTerms = JSON.parse(localStorage.getItem('topSearched'))
        return (
            <div id="popUp-Box">
                <div className='x' onClick={this.reset}><i class="far fa-times-circle"></i></div>
                {searchedTerms.map(x=> <li> { x }</li>)}
            </div>
            
        )
    }
}
export default PopUp;