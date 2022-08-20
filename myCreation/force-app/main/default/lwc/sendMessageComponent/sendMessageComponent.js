import { api, LightningElement,track,wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import {createRecord} from 'lightning/uiRecordApi';
import CHATHISTORY from '@salesforce/schema/Chat_Message__c';
import RECORDID from '@salesforce/schema/Chat_Message__c.Record_Id__c';
import MESSAGE from '@salesforce/schema/Chat_Message__c.Message__c';
import OBJECTNAME from '@salesforce/schema/Chat_Message__c.Object_Name__c';
import USER from '@salesforce/schema/Chat_Message__c.User_Id__c';
import USERNAME from '@salesforce/schema/Chat_Message__c.User_Name__c';
import USERID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
const fields = [NAME_FIELD];
export default class SendMessageComponent extends LightningElement {
 
    @api recordId;
    @api objectApiName;
    @track isBoolean = true;
    @track message;
    @track getid = USERID;
  
    @wire(getRecord, { recordId: "$getid", fields })
    findusername;

    get findname() {
        return getFieldValue(this.findusername.data, NAME_FIELD);
    }
    //button enable/disable functionality
    handleChange(event){
      console.log(event.target.value);
        this.message=event.target.value;  //saves the current message typed
        console.log(this.message);
        if(this.message != '' || this.message != null){
            this.isBoolean = false;
        }
        if(this.message == ''){
            this.isBoolean = true;
        }

    }
    sendinghandle(){
        
        const selectEvent = new CustomEvent('send', {
         detail: this.message
     });
    this.dispatchEvent(selectEvent);
    //console.log(findname);
    const FIELDS = {};
         FIELDS[MESSAGE.fieldApiName] = this.message;
         FIELDS[RECORDID.fieldApiName] = this.recordId;
         FIELDS[USER.fieldApiName] = USERID;
         FIELDS[OBJECTNAME.fieldApiName] = this.objectApiName;
         FIELDS[USERNAME.fieldApiName] = this.findname; 

         const contactRecord  = {apiName:CHATHISTORY.objectApiName, fields: FIELDS};
         createRecord(contactRecord);
 
        // console.log(findname);
         this.message='';
     }

  
}