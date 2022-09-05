import React from 'react';

import * as styles from '../css/style.module.css';

interface IndicatorProps {
  message: string;
  error?: any;
}

const Indicator: React.FC<IndicatorProps> = ({ message, error }) => {
  // TODO: Style indicator
  return (<div className={styles.indicatorContainer}>
    <div className={styles.indicatorEmoji}>{error ? '🚑' : '🎁'}</div>
    <h3>{message}</h3>
    <p>{error && `Error: ${JSON.stringify(error)}`}</p>
  </div>)
}

export default Indicator