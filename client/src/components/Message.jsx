import React from 'react';
import { Alert } from 'react-bootstrap';

const messageStyle = {
  width: '100%',
};

const Message = ({ variant, children, style }) => {
  return (
    <Alert variant={variant} style={{ ...messageStyle, ...style }}>
      {children}
    </Alert>
  );
};

Message.defaultProps = { variant: 'info' };

export default Message;
