import { connect } from 'react-redux';

import Signup from '../components/Signup';
import { signup } from '../store/actions/user';

const mapStateToProperties = (state) => {
  return {};
};

const mapDispatchToProperties = (dispatch) => ({
  signup: ({ name, email, password }) => dispatch(signup({ name, email, password })),
});

export default connect(mapStateToProperties, mapDispatchToProperties)(Signup);
