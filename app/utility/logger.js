// import Bugsnag from '@bugsnag/expo';
// or sentry, whatever

const log = error => {
    console.log(error);
    // Bugsnag.notify(error);
};

const start = () => {
  // Bugsnag.start();
};

export default {
    log, start
}
