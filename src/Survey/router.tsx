/* eslint-disable @getify/proper-arrows/name */
import { Route } from 'react-router-dom';
import { AttrPage, withSample } from '@flumens';
import Activities from './Activities';
import Home from './Home';
import Location from './Location';
import OccurrenceHome from './OccurrenceHome';
import Species from './Species';
import StartNewSurvey from './StartNewSurvey';
import survey from './config';

const baseURL = `/survey`;

const { AttrPageFromRoute } = AttrPage;

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey)],
  [`${baseURL}/:smpId/`, Home],

  [`${baseURL}/:smpId/:attr`, withSample(AttrPageFromRoute)],
  [`${baseURL}/:smpId/activities`, withSample(Activities)],
  [`${baseURL}/:smpId/location`, Location],
  [`${baseURL}/:smpId/species`, withSample(Species)],

  [`${baseURL}/:smpId/species/:occId`, withSample(OccurrenceHome)],
  [`${baseURL}/:smpId/species/:occId/:attr`, withSample(AttrPageFromRoute)],
  [`${baseURL}/:smpId/species/:occId/species`, withSample(Species)],
].map(([route, component]: any) => (
  <Route key={route} path={route} component={component} exact />
));

export default routes;
