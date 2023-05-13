import { Amplify, API, Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import './custom.css';
import awsconfig from './aws-exports';
import { withAuthenticator, Authenticator, } from '@aws-amplify/ui-react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SplashPage from "./pages/SplashPage";
import UserPage from "./pages/UserPage";
import AddPostPage from "./pages/AddPostPage";
import PostListPage from "./pages/PostListPage";

Amplify.configure(awsconfig);

function App() {

  const services = {
    async handleSignUp(formData) {
      let { username, password, attributes } = formData;
      username = username.toLowerCase();
      attributes.email = attributes.email.toLowerCase();
      return Auth.signUp({
        username,
        password,
        attributes,
        autoSignIn: {
          enabled: true,
        },
      });
    },
  };

  return (
    <Authenticator services={services} initialState="signUp">
      {({ signOut }) => (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashPage signOut={signOut} />} />
            <Route path="/user" element={<UserPage signOut={signOut} />} />
            <Route path="/addpost" element={<AddPostPage signOut={signOut} />} />
            <Route path="/postlist" element={<PostListPage signOut={signOut} />} />
          </Routes>
        </BrowserRouter>
      )}
    </Authenticator>
  );
}

export default withAuthenticator(App);
