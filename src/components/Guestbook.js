import React, {useEffect, useState} from 'react';
import config from '../config.js'
const firebase = require('firebase')

function Guestbook() {
  const [data, setData] = useState([])
  const [shouldRender, setShouldRender] = useState(true)
  const sample = ['1', '2', '3']

  useEffect(() => {
    //It is necessary to check if firebase has already been initialized otherwise it will throw an exception if it tries to initialize again
    //You can put this code in your componentDidMount function, or in an Effect to make sure it is ran when the app loads.
    //Use the second argument to useEffect() to control how often it is ran
    if (!firebase.apps.length) {
       firebase.initializeApp(config)
    }
    //get a reference to the database
    let ref = firebase.database().ref('data')

    //retrieve its data
    ref.on('value', snapshot => {
         //this is your call back function
    		 //state will be a JSON object after this
         //set your apps state to contain this data however you like
         const state = snapshot.val()
         //since i use react 16, i set my state like this
         //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
         setData(state)
    })
  }, [shouldRender])

  return(
    <div className="guestbook">
      <div>
        <h4>Talk to me, and optionally let everyone know you visited!</h4>
        <div className="form">
          <form>
            <label for="name">What is your name?</label><br/>
            <input type="text" className="name" name="name" required/><br/>
            <label for="name">Offer a short description of yourself.</label><br/>
            <input type="text" className="desctiptioin" name="description"/><br/>
            <label for="name">What do you have to say?</label><br/>
            <input type="text" className="message" name="message" required/><br/>
            <label for="name">Would you like your name and message to be viewable by other guests of this site?</label><br/>
            <input type="radio" className="viewable" name="viewable" value="yes" required/>
            <label for="yes">Yes</label><br/>
            <input type="radio" className="viewable" name="viewable" value="no" required/>
            <label for="no">No</label><br/>
            <label for="email">If you would like me to be able to contact you, what is your emal? (email will not be posted)</label><br/>
            <input type="text" className="email" name="email"/><br/><br/>
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
