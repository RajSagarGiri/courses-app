import React from 'react';
import {Link} from 'react-router-dom';

const AboutPage= () => (
    <div className='jumbotron'>
        <h2>About</h2>
        <p>This apps uses React, Redux, React Router & many others helpful libraries.</p>
        <Link to='/' className='btn btn-primary btn-lg'>Home</Link>
    </div>
)

export default AboutPage;