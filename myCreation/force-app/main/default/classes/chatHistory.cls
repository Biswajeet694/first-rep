public with sharing class chatHistory {

    @Auraenabled(Cacheable=true)
    public static list<Chat_Message__c> getchats(string insiderecord){
        list<Chat_Message__c> chatlist = [select id,name,Message__c,Record_Id__c,alignslds__c,User_Name__c from Chat_Message__c where Record_Id__c=:insiderecord order by name asc OFFSET 1] ;
        return chatlist;
    }
}