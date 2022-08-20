import { LightningElement, track, wire ,api} from 'lwc';
import getchats from '@salesforce/apex/chatHistory.getchats';
import {refreshApex} from '@salesforce/apex';
import useridview from '@salesforce/user/Id';

export default class DisplaychatComponent extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track getmessage;
  
    @wire (getchats,{insiderecord :'$recordId'})
    getrecord;

    handleSend(event){
        this.getmessage = event.detail;
       refreshApex(this.getrecord);
     }
    
}