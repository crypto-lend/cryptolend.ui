import React from 'react';

const InstallMetaMask = () => (
  <div className="meta-mask-img">
  <p style={{color:"white"}}> Metamask not installed!</p>
    <a href="https://metamask.io/">
      <img style={{width:"25%"}} className="meta-mask-img" src={ require('../images/metamask.png') } />
    </a>
  </div>
);

export { InstallMetaMask };
