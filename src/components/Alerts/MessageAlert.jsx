// import React from 'react';
// import { connect } from 'react-redux';
// import Alert from 'react-bootstrap/Alert';
// import { IoMdClose } from 'react-icons/io';
// import './MessageAlert.scss';

// function MessageAlert({ variant, message, show }) {
//   console.log('messaegeeeee', message, variant, show)

//   if (!show) return null; // Hide the alert if show is false

//   return (
//     <Alert variant={variant} className="alertMessage">
//       <IoMdClose className="alert-icon" />
//       {message}
//     </Alert>
//   );
// }

// const mapStateToProps = (state) => ({
//   variant: state.alert.variant,
//   message: state.alert.message,
//   show: state.alert.show
// });

// export default connect(mapStateToProps)(MessageAlert);
