import React from 'react';
import {connect} from 'react-redux';

import SignupForm from './SignupForm';
import {userSignupRequest, addFlashMessage} from '../../actions/actions';

class SignupPage extends React.Component {
  render() {
		const {userSignupRequest, addFlashMessage} = this.props;
  	return (
			<div className="row">
				<div className="columns small-centered small-10 medium-6 large-4">
					<SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
				</div>
			</div>
  	);
  }
}

SignupPage.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest, addFlashMessage})(SignupPage);
