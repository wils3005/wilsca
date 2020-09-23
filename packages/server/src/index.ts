import * as hapiServer from './hapiServer';
import * as plugins from './plugins';

void hapiServer.start();

export { hapiServer, plugins };
