import React from 'react';
import styles from './SocialLinks.module.css';
import facebook from '../../../images/facebook.png';
import instagram from '../../../images/instagram.png';
import { navigate } from '@reach/router';

const SocialLinks: React.FC = () => (
  <div className={styles.social}>
    <div className={styles.socialLinks}>
      <img src={facebook} className={styles.navIcon} alt="" title="Facebook" onClick={() => {navigate('#');}}/>
      <img src={instagram} alt="" title="Instagram" onClick={() => {navigate('#');}}/>
    </div>
  </div>
)

export default SocialLinks;
