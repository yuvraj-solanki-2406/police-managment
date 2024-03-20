import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';

const Root = () => {
  const [user, setUser] = useState("admin");
  // setUser("admin");
  
  // const checkUser = () => {
  // }
  // useEffect((
  //   checkUser()
  // ), [])
  return (
    <React.StrictMode>
      {/* <Provider> */}
      <BrowserRouter store={store}>
        {user === "admin" ? <App /> : <div>Jawan Component</div>}
      </BrowserRouter>
      {/* </Provider> */}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
