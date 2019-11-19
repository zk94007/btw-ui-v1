import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import routes from '../../constants/Routes';
import exclamation from '../../resources/images/exclamation.png';
import BaseComponent from '../shared/BaseComponent';
import { btwLogout } from '../../actions/AuthActions';
import Button from '../shared/Button';
import './_general.scss';

class GeneralErrorPage extends BaseComponent {

    componentWillMount() {
        setTimeout(() => {
            this.props.actions.btwLogout();
        }, 3000)
    }

    render() {
        return (
            <div className='btw-error'>
                <img src={exclamation} alt='exclamation.png' width={150} height={150}></img>
                <div>
                    <h3>Sorry ....Something went wrong .... Please try again later</h3>
                    <br/><br/><br/>
                    <Button onClick={() => this.onLink(routes.signIn)}>
                        Back to login page
                    </Button>
                </div>
			</div>
        );
    }
}



const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ btwLogout }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GeneralErrorPage));
