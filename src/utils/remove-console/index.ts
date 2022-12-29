const noop = () => undefined;

const debug =
  process.env.APK_TYPE === "production" || process.env.APK_TYPE === "staging"
    ? Object.fromEntries(Object.keys(console).map((key) => [key, noop]))
    : console;

const { log } = debug;

export default log;
