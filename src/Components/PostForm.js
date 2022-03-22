import React, {Component} from 'react'
import axios from 'axios'
import './formpost.css'
import  codelogo from '../Components/pictures/logo.png'
import GetForm from '../Components/GetForm.js'

import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


function validate(CampaignName , Startdate , Enddate , LongUrl) {

    // we are going to store errors for all fields
    // in a signle array
    const errors = [];
    
  
    if (CampaignName.length === 0) {
      errors.push("CampaignName can't be empty");
    }
  
    if (CampaignName.length < 2) {
      errors.push("CampaignName should be at least 2 charcters long");
    }
  
    if (CampaignName.length > 16) {
      errors.push("Password should be at less than 16 characters long");
    }

    if(Startdate < Date.now()){
        errors.push("Enter a valid Startdate");
    }

    if(Startdate > Enddate){
        errors.push("Startdate can not be before the end date")
    }

    if(LongUrl.length === 0){
        errors.push("Enter a URL(s)")
    }
    if(Startdate == null){
        errors.push("Enter a Startdate")
    }
    
    if(Enddate == null){
        errors.push("Enter an Enddate")
    }
    return errors;
  }






class PostForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            CampaignName: '',
            Startdate: Date,
            Enddate: Date,
            LongUrl: '', 

            errors: []
        
            
        }
        
    }

    changeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
        /*const {name , value} = e.target;
        let formErrors = this.state.formErrors;

        /*switch(name){
            case 'CampaignName':
            formErrors.CampaignName = value.length < 12 && value.length > 4 ? 'Minimum 3 characters required'
            : "" ;
        break
            case 'LongUrl':
            formErrors.Startdate = value.length < 0 ? 'Enter a URL'
            : "" ;
        break
        default:
            break;

        }*/

    }

    submitHandler = e=> {
        e.preventDefault()
        
        const { CampaignName, Startdate, Enddate, LongUrl } = this.state;

        console.log(this.state)

        const errors = validate(CampaignName, Startdate, Enddate , LongUrl);
        if (errors.length > 0) {
        this.setState({ errors });
        
        return;
        }
        else{
            
            console.log(this.state)
            this.setState()
        }

        const FileDownload = require('js-file-download');

        axios.post('http://localhost:54175/api/redirect' , this.state )
        .then(({ data }) => {
            FileDownload(data, "C:\\CSV\\test5.csv");
            console.log("success!", data);
            NotificationManager.success('Urls sent' , 'Success');
          })
          
        
        /*.then(response => {
            console.log(response)
            FileDownload(response.data, `C:\\CSV\\test5.csv`);
        })*/
        .catch(error => {
            console.log(error)
            NotificationManager.error('Error while Adding Urls!', 'Error!');
        })
    }



    render(){
        const { errors } = this.state;
        
        const{ CampaignName , Startdate , Enddate , LongUrl} = this.state
        
        return(
            

        <body className = "main">

            <NotificationContainer/>
            
            
                 
            <div className = "wrapper">
                
                    
                
                <form className = "form" onSubmit = {this.submitHandler}>

                
                {errors.map(error => (
                <div className = "form__items__errors" key={error}>Error: {error}</div>
                ))}

                    <div className = "form__items_logo">
                    <a href="https://codeworldwide.com"><img src ={codelogo} style={{width: "300px", height: "100px"}} alt = ""></img></a>
                    </div>
                

                    <div className = "form__items">
                        <label htmlFor = "CampaignName" className = "form__label"> CampaignName </label>
                        <input type = "text" placeholder = "Enter a CampaignName " name = "CampaignName" className = "form__input" id = "CampaignName" value = {CampaignName} onChange = {this.changeHandler}/>
                        
                    </div>
                    <div className = "form__items">
                        <label htmlFor = "Startdate" className = "form__label">Startdate</label>
                        <input type = "date" name = "Startdate" className = "form__input" id = "Startdate" value = {Startdate} onChange = {this.changeHandler}/>
                        
                    </div>
                    <div className = "form__items">
                        <label htmlFor = "Enddate" className = "form__label">Enddate</label>
                        <input type = "date" name = "Enddate" className = "form__input" id = "Enddate" value = {Enddate} onChange = {this.changeHandler}/>
                        
                    </div>
                    <div className = "form__items">  
                        <label htmlFor = "LongUrl" className = "form__label">LongUrls</label>
                        <textarea placeholder = "Enter URL(s)" name = "LongUrl"  className = "form__input" id = "LongUrl" value = {LongUrl} onChange = {this.changeHandler}></textarea>
                    </div>
                    <div className = "form__item" >
                    <button type="submit" className = "form__btn">Submit</button>
                    </div>
                    

                </form>

                <GetForm/>
            </div>
            
        
        </body>)            
        
        
    }
}

export default PostForm

/*<div className = "form__items__textbox">
<h3>URL Shortening Instructions</h3>
<p>
Input Urls with a new line between each URL. All Entries must have are CampaignName , Startdate and Enddate
</p>
</div>*/