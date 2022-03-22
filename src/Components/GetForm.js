import React, {Component} from 'react'
import axios from 'axios'
import './formpost.css'

import 'react-notifications/lib/notifications.css';

class GetForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            CampaignId:''
        }
    
    }


    changeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
    }

    SubmitHandler =e => {
        e.preventDefault()

        axios.get('http://localhost:54175/api/CampaignId' , this.newState ) 
        .then(function (response) {
         // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        

    }

    render(){
        
        const{CampaignId} = this.state

        return(


            <div>

                
            <div className = "newwrapper">
            <form className = "form" onSubmit = {this.SubmitHandler}>
                
                    <div className = "form__items">
                        
                        <label htmlFor = "CampaignId" className = "form__label_get"><b> Get Campaign</b> </label>
                        <input type = "text" placeholder = "Enter a CampaignId " name = "CampaignId" className = "form__input" id = "CampaignId" value = {CampaignId} onChange = {this.changeHandler}/>
                        
                    </div>

                    <div className = "form__item" >
                    <button type="submit" className = "form__btn">Submit</button>
                    </div>
            </form>
            </div>
            </div>
            
        )
    }



}

export default GetForm

