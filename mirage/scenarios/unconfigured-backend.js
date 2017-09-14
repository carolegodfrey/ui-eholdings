export default function noBackendScenario(server) {
  server.get('/configuration', { isValid: false });
}
