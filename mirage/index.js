/* global require */

let start = () => {};

// Currently we run mirage in production because the server side is
// incomplete.
//
// However, when we switch over to the actual API, then we'll want to
// protect this require with an if statement so that webpack won't attempt to
// bundle mirage at all.
//
// if (process.env.NODE_ENV !== 'production') {
//   start = require('./start').default;
// }

export default start;
