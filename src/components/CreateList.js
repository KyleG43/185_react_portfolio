import React, { useEffect, useState } from 'react';
import config from '../config.js';
const firebase = require('firebase');
const axios = require('axios').default;

function CreateList(){
    const [listName, setListName] = useState('');

    function formSubmit(event){
        event.preventDefault();

        //check if list is already in database
        var duplicate = false;
        //get firebase reference
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        firebase.database().ref('movies').on('value', snapshot => {
            const state = snapshot.val();
            for (var list in state){
                if(list == listName){
                    duplicate = true;
                    break;
                }
            }
        })
        if(duplicate){
            alert('List has already been created');
            return;
        }

        //put list in database
        firebase.database().ref('movies').child(listName).set("");
        alert("List created successfully!");
    }

    function handleChange(event){
        setListName(event.target.value);
    }

    return(
        <div className="addMovie">
            <h2>Create a new list</h2>
            <div className="form">
                <form onSubmit={formSubmit}>
                    <label for="ImdbID">List Title</label> <br/>
                    <input type="text" name="ImdbID" value={listName} onChange={handleChange} placeholder="List Title" required/> <br/> <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}
export default CreateList;