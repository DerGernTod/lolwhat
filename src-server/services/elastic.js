import { exec } from 'child_process';
import lolWhatConfig from '../../config/lolwhat.config.json';

export default function launchElastic() {
  console.log('elastic instance started');
  return exec(`"${lolWhatConfig.elasticExec}" -Epath.conf=./config`, (err, stdout, stderr) => {
    if (err) {
      console.error(`${err}\nPlease make sure you configured lolwhat.config.json correctly.`);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}
