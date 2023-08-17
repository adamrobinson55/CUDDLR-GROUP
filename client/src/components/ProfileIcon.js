import React, { Component } from 'react';
import { FaUser } from 'react-icons/fa';

class ProfileIcon extends Component {
    render() {
      return (
      <div className=''>
        <FaUser style={{color: 'green'}}/>
      </div>
      ) 
    }
  }

export default ProfileIcon;