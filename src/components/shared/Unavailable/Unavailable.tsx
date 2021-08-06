import React from 'react';
import styles from './Unavailable.module.css';

const Unavailable: React.FC<any> = (props) => {
  return (
    <div className={styles.Unavailable}>
      <div id={styles.unavImage} style={{backgroundImage: 'url("https://localhost:3000/images/unavailable.png'}}></div>
    </div>
  )
};

export default Unavailable;
