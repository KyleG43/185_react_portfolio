import React, { useEffect, useState } from 'react';
import config from '../config.js';
const firebase = require('firebase');
const axios = require('axios').default;

function AddMovie(){
    return(
        <div className="addMovie">
            <h1>AddMovie</h1>
        </div>
    )
}
export default AddMovie;