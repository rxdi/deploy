import { HAPI_SERVER } from '@rxdi/hapi';
import { Inject, Service, OnInit } from '@rxdi/core';
import { Server } from 'hapi';
import { __ROOT_FOLDER } from '../../../env.injection.tokens';
import { includes } from '../../services';

@Service()
export class WebUiService implements OnInit {
  constructor(
    @Inject(HAPI_SERVER) private server: Server,
    @Inject(__ROOT_FOLDER) private root_folder: __ROOT_FOLDER
  ) {}

  OnInit() {
    includes('--webui') ? this.register() : null;
  }

  async register() {
    this.server.route({
      method: 'GET',
      path: '/webui/{param*}',
      handler: {
        directory: {
          path: `${this.root_folder}/webui`,
          listing: true,
          index: ['index.html'],
        },
      },
    });
  }
}
