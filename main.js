const { createApp } = Vue;

import {  contacts } from './contacts.js';

const { DateTime } = luxon;


createApp({
    data(){
        return{
            contacts,
            activeContact:{},
            activeMsg:{},
            newMessageString:'',
            contactToSearch:''
        }
    },
    methods:{
        addNewMessage(){
            /*
                1. creo oggetto messagio nuovo e resetto
                2. lo pusho nell'array dei messaggi del contatto attivo
                3. genero un oggetto messaggio di risposta
                4. dopo 1 secondo lo pusho nell'array dei messaggi 
             */
            
            const newMessage = this.generateMessage(this.newMessageString, true);
            setTimeout(() => this.activeContact.messages.push(newMessage), 100)
            this.newMessageString = '';

            const answerMsg  = this.generateMessage('Ok!', false);
            setTimeout(() => this.activeContact.messages.push(answerMsg), 1000)
            
        },

        generateMessage(messageText, isSent){
            const status = isSent ? 'sent' : 'received';
            return {
                date: DateTime.now().setLocale('it')
                               .toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
                message: messageText,
                status
            }
        },

        // doSearch(){
            
        //         //1. ciclo tutti i contatti
        //         //2. ad ogni ciclo se la stringa di ricerca è contenuta nel nome del contatto //-> visisible diventa true altrimentti false
            
        //    this.contacts.forEach(contact => {
        //         contact.visible = contact.name.toUpperCase()
        //                                 .includes(this.contactToSearch.toUpperCase())
        //    });
        // },

        removeMessage(){
            /*
                filtro tutti i messaggi del contatto attivo salvandoli tutti meno quello attivo
            */
           this.activeContact.messages = this.activeContact.messages.filter(
                message => message !== this.activeMsg
           )
        },

        // getLastMessage(contact){
        //     // prendo l'ultimo messaggio solo se esistono messaggi, altrimenti restituisco la stringa vuota
        //     if(contact.messages.length > 0){
        //         return contact.messages.at(-1).message
        //     }
        //     return '';
        // },

        // getLastDate(contact){
        //     if(contact.messages.length > 0){
        //         return contact.messages.at(-1).date
        //     }
        //     return '';
        // },

        getLastInfo(contact, infoStr){
            if(contact.messages.length > 0){
                return contact.messages.at(-1)[infoStr]
            }
            return '';
        },



    },
    
    watch : {
        // tutte le volte che cambia il v-model contactToSearch filtro i contatti visibili
        contactToSearch(){
            this.contacts.forEach(contact => {
                            contact.visible = contact.name.toUpperCase()
                                   .includes(this.contactToSearch.toUpperCase())
                            });
            },
    },

    computed:{
        visibleContacts(){
            return this.contacts.filter(contact => contact.visible)
        }
    },

    created(){
        this.activeContact = this.contacts[0];
        console.log(this.activeContact);

    }
}).mount('#app');