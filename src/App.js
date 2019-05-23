import React from 'react';
import logo from './logo.svg';
import AnchorDetect from './AnchorDetect';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <AnchorDetect className="anchor" items={['section1', 'section2', 'section3', 'section4', 'section5', 'section6']} activeClass="active" offsetTop={20}>
          <li>section1</li>
          <li>section2</li>
          <li>section3</li>
          <li>section4</li>
          <li>section5</li>
          <li>section6</li>
        </AnchorDetect>
        <section id="section1" style={{marginTop: '21px'}}>
          <h1>section1</h1>
          <img src="https://ruhnn-common.oss-cn-hangzhou.aliyuncs.com/d7b3c83e1c274faaa8f8db665828bc7b_9.jpg" />
        </section>
        <section id="section2">
          <h1>section2</h1>
          <p>Write all of your "HTML" (really JSX) that you want to show
            on print, in here</p>
          <p>If you need to show different data, you could grab that data
            via AJAX on componentWill/DidMount or pass it in as props</p>
          <p>The CSS will hide the original content and show what is in your
            Print Template.</p>
        </section>
        <section id="section3">
          <h1>section3</h1>
          <img src="https://ruhnn-common.oss-cn-hangzhou.aliyuncs.com/d7b3c83e1c274faaa8f8db665828bc7b_9.jpg" />
        </section>
        <section id="section4">
          <h1>section4</h1>
          <p>Write all of your "HTML" (really JSX) that you want to show
            on print, in here</p>
          <p>If you need to show different data, you could grab that data
            via AJAX on componentWill/DidMount or pass it in as props</p>
          <p>The CSS will hide the original content and show what is in your
            Print Template.</p>
        </section>
        <section id="section5">
          <h1>section5</h1>
          <img src="https://ruhnn-common.oss-cn-hangzhou.aliyuncs.com/d7b3c83e1c274faaa8f8db665828bc7b_9.jpg" />
        </section>
        <section id="section6">
          <h1>section6</h1>
          <p>Write all of your "HTML" (really JSX) that you want to show
            on print, in here</p>
          <p>If you need to show different data, you could grab that data
            via AJAX on componentWill/DidMount or pass it in as props</p>
          <p>The CSS will hide the original content and show what is in your
            Print Template.</p>
        </section>
      </div>
    </div>
  );
}

export default App;
