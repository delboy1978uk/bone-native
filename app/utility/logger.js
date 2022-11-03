// import Bugsnag from '@bugsnag/expo';
// or sentry, whatever

const log = message => {
    console.log(message);
    // Bugsnag.notify(error);
};

const start = () => {
  // Bugsnag.start();
};

export default {
    log, start
}
