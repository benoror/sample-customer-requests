import React from 'react';
import styled from 'styled-components';
import qs from 'query-string';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';

import { setJWT } from '../utils/jwt';
import Loader from '../components/Loader';

const Styled = styled.div`
  width: 30rem;
  border-radius: 5px;
  margin: auto;
  margin-top: 5rem;
  background: rgba(0, 0, 0, 0.01);
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 2rem;
  padding-bottom: 4rem;
  text-align: center;

  p {
    text-align: center;
    margin-bottom: 2rem;
  }

  .login__google-sign-in {
    width: 10rem;
  }
`;

const LoginPage: React.FC<RouteComponentProps> = props => {
  // Use React Routers' location function to get the query parameters in the URL.
  // Then check if we have a JWT included as a query parameter.
  const { location, history } = props;
  const { jwt } = qs.parse(location.search);

  // If we have a JWT, save it to local storage so that we can include it in all
  // requests to our API from here on.
  if (jwt && typeof jwt === 'string') {
    setJWT(jwt);
    history.push('/');
  }

  const loading = false;
  const authorized = false;

  if (loading) {
    return <Loader />;
  }
  return authorized ? (
    <Redirect to="/" />
  ) : (
    <Styled>
      <h2>Sign in.</h2>
      <p>Sign into {process.env.REACT_APP_MY_APP_NAME} with Google.</p>
      <a href={process.env.REACT_APP_MY_APP_GOOGLE_SIGN_IN_LINK}>
        <img
          className="login__google-sign-in"
          src="/images/google-sign-in.png"
          alt="Google sign in link."
        />
      </a>
    </Styled>
  );
};

export default withRouter(LoginPage);
