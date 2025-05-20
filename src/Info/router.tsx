import { Route } from 'react-router-dom';
import About from './About';
import BRC from './BRC';
import Credits from './Credits';
import Record from './Record';

export default [
  <Route path="/info/about" key="/info/about" exact component={About} />,
  <Route path="/info/credits" key="/info/credits" exact component={Credits} />,
  <Route path="/info/records" key="/info/records" exact component={Record} />,
  <Route
    path="/info/brc-approved"
    key="/info/brc-approved"
    exact
    component={BRC}
  />,
];
