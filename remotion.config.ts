// All configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli
// ! The configuration file does only apply if you render via the CLI !

// import {Config} from 'remotion';
import {Config} from '@remotion/cli/config';

// Config.setImageFormat('jpeg');
Config.setVideoImageFormat('jpeg');

Config.setOverwriteOutput(true);
// Config.setShouldOpenBrowser(false);
