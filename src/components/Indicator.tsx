import React from 'react';

import * as styles from '../css/style.module.css';

interface IndicatorProps {
  message: string;
  error?: any;
}

const Indicator: React.FC<IndicatorProps> = ({ message, error }) => {
  return (<div className={styles.container}>
    <div className={styles.indicEmote}>{error ? '🚑' : '🎁'}</div>
    <h3 className={styles.indicMess}>{message}</h3>
    <p>{error ? `Error: ${JSON.stringify(error)}` : '💡 Tip! Double click the task title to edit it.'}</p>
  </div>)
}

export default Indicator