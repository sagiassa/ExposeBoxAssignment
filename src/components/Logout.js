import React, {Component} from 'react'

class Logout extends Component{
    constructor(){
        super()
    }
    componentWillMount = () => {
        this.props.Logout()
    }
}

export default Logout