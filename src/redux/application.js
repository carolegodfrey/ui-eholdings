import {
  createRequestReducer,
  createRequestEpic,
  createRequestCreator
} from './request';

export const getBackendConfig = createRequestCreator('backend-configuration');

export const applicationReducer = createRequestReducer({
  name: 'backend-configuration',
  initialContent: {}
});

export const applicationEpics = createRequestEpic({
  name: 'backend-configuration',
  endpoint: 'eholdings/configuration'
});
