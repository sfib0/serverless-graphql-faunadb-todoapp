import React from 'react';

interface IndicatorProps {
  message: string;
  error?: any;
}

const Indicator: React.FC<IndicatorProps> = ({ message, error }) => {
  // TODO: Style indicator
  return (<div>
    <div>{error ? '🚑' : '🎁'}</div>
    <h1>{message}</h1>
    <p>{error && JSON.stringify(error)}</p>
  </div>)
}

export default Indicator