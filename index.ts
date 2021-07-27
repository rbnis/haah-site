import { run, initMqtt, initWebui } from 'haah';
import { secret } from './secrets';

async function main() {
  await initMqtt(secret.mqtt.server, {username: secret.mqtt.user, password: secret.mqtt.password});
  initWebui('127.0.0.1', 1235);

  // this function collects all typescript files from the `site/` folder and runs them.
  // this might feel a bit 'magic' at first but is rather handy when adding / removing code.
  run();
}

// we need to create a main function and imidiately call it, because node.js does not support
// top level await.
main();
