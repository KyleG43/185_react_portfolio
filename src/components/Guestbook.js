import React, {useEffect, useState} from 'react';
import config from '../config.js'
const firebase = require('firebase')

function Guestbook() {
  const [messages, setMessages] = useState([])
  const [shouldRender, setShouldRender] = useState(true)
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [message,setMessage] = useState('')
  const [viewable,setViewable] = useState('yes')
  const [email,setEmail] = useState('')

  useEffect(() => {
    //It is necessary to check if firebase has already been initialized otherwise it will throw an exception if it tries to initialize again
    //You can put this code in your componentDidMount function, or in an Effect to make sure it is ran when the app loads.
    //Use the second argument to useEffect() to control how often it is ran
    if (!firebase.apps.length) {
       firebase.initializeApp(config)
    }
    //get a reference to the database
    let ref = firebase.database().ref('messages')

    //retrieve its data
    ref.on('value', snapshot => {
         //this is your call back function
    		 //state will be a JSON object after this
         //set your apps state to contain this data however you like
         const state = snapshot.val()
         //since i use react 16, i set my state like this
         //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
         setMessages(state)
    })
  }, [shouldRender])

  function formSubmit(event){
    //send jsom object for message to database
    const msgObject = {
      name: name,
      description: description,
      message: message,
      viewable: viewable,
      email: email
    }

    firebase.database().ref('messages').push().set(msgObject)
    setShouldRender(!shouldRender) //trigger re-render when new message is added

    event.preventDefault()
  }

  function handleChange(event){
    switch(event.target.name){
      case 'name':
        setName(event.target.value)
        break;
      case 'description':
        setDescription(event.target.value)
        break;
      case 'message':
        setMessage(event.target.value)
        break;
      case 'viewable':
        setViewable(event.target.value)
        break;
      case 'email':
        setEmail(event.target.value)
        break;
    }
  }

  return(
    <div className="guestbook">
      <div>
        <h4>Talk to me, and optionally let everyone know you visited!</h4>
        <div className="form">
          <form onSubmit={formSubmit}>
            <label for="name">What is your name?</label><br/>
            <input type="text" name="name" value={name} onChange={handleChange} required/><br/>
            <label for="description">Offer a short description of yourself.</label><br/>
            <textarea rows="5" cols="40" type="text" name="description" value={description} onChange={handleChange}/><br/>
            <label for="message">What do you have to say?</label><br/>
            <textarea rows="5" cols="40" type="text" name="message" value={message} onChange={handleChange} required/><br/>
            <label for="viewable">Would you like your name and message to be viewable by other guests of this site?</label><br/>
            <select name="viewable" value={viewable} onChange={handleChange} required>
              <option selected value="yes">Yes</option>
              <option value="no">No</option>
            </select> <br/>
            <label for="email">If you would like me to be able to contact you, what is your emal? (email will not be posted)</label><br/>
            <input type="text" name="email" value={email} onChange={handleChange}/><br/><br/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    </div>
  );
  /*{sample.map((s, index) =>(
    <h2>{s}</h2>
  ))}*/
}
export default Guestbook;
