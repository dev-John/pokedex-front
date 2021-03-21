import { connect } from 'react-redux';

import QRCodeVerification from '../components/QRCodeVerification';
import { verifyUser } from '../store/actions/user';

const mapStateToProperties = (state) => {
  const { otpAuthUrl } = state.user;

  return { otpAuthUrl };
};

const mapDispatchToProperties = (dispatch) => ({
  verifyUser: (answer) => dispatch(verifyUser(answer)),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(QRCodeVerification);
