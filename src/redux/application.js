import { createRequestReducer, createRequestEpic, createRequestCreator } from './request';

export const applicationReducer = createRequestReducer({
  name: 'application',
  initialContent: []
});

export const applicationEpics = createRequestEpic({
  name: 'application',
  endpoint({ tenant }) {
    return `_/proxy/tenants/${tenant}/interfaces/eholdings`;
  },
  deserialize(payload) {
    payload.map(item => item.id);
  }
});

export const discoverEholdingsInterfaces = createRequestCreator('application');
