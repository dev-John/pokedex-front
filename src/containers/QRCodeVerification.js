import { connect } from 'react-redux';

import QRCodeVerification from '../components/QRCodeVerification';
import { verifyUser } from '../store/actions/user';

const mapStateToProperties = (state) => {
  const { otpAuthUrl, isUserAuthenticated } = state.user;

  return { otpAuthUrl, isUserAuthenticated };
};

const mapDispatchToProperties = (dispatch) => ({
  verifyUser: (answer) => dispatch(verifyUser(answer)),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(QRCodeVerification);
