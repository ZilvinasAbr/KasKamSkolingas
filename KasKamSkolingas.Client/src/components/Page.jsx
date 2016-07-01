import React from 'react';
import { connect } from 'react-redux';

export class Page extends React.Component {
  render() {
    let toRender = (
      <div>Error</div>
    );

    if(this.props.currentPage === 'Landing') {
      toRender = (
        <div>Landing page</div>
      );
    }else if(this.props.currentPage === 'Login') {
      toRender = (
        <div>
          <p>
            Username: <input type="text" />
          </p>
          <p>
            Password: <input type="password" />
          </p>
          <p>
            <button>Login</button>
          </p>
        </div>
      );
    }else if(this.props.currentPage === 'Register') {
      toRender = (
              <div>
                <p>
                    Username: <input type="text" />
                </p>
                <p>
                    Password: <input type="password" />
                </p>
                <p>
                    Confirm Password: <input type="password" />
                </p>
                <p>
                    <button>Register</button>
                </p>
              </div>
        );
    }

    return toRender;
  }
}

function mapStateToProps(state) {
  return {
    currentPage: state.get('currentPage')
  };
}

export const PageContainer = connect(mapStateToProps)(Page);