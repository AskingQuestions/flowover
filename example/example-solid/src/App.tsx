import type { Component } from 'solid-js';

import styles from './App.module.css';
import logo from './logo.svg';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <img src={logo} style="max-width: 48px;" alt="logo" />
    </div>
  );
};

export default App;
