export default function noBackendScenario(server) {
  console.log('NO BACKEND SCENARIO');
  let ns = server.namespace;
  server.namespace = '';
  server.get('/_/proxy/modules', []);
  server.namespace = ns;
}
