import { Plugin, Server } from '@hapi/hapi';
import { Model as User } from './User';

const models = { User };
const plugin: Plugin<unknown> = {
  name: 'User',
  register,
};

function register(server: Server): void {
  server.expose('models', models);
}

export { plugin, register };
