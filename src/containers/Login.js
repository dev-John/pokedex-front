import { connect } from 'react-redux';

import Login from '../components/Login';
import { login } from '../store/actions/user';

const mapStateToProperties = (state) => {
  const { user, otpAuthUrl } = state.user;
  const { totp } = state.auth;

  return { user, totp, otpAuthUrl };
};

const mapDispatchToProperties = (dispatch) => ({
  login: ({ email, password }) => dispatch(login({ email, password })),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(Login);
