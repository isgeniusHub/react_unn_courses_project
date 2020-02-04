'use strict';

import Inert from "@hapi/inert";
import Hapi from '@hapi/hapi';
import routes from './routes.js';
import dotenv from "dotenv";
import * as path from 'path';
import AuthBearer from 'hapi-auth-bearer-token';
import makeAdminAuth from "./auth/admin.js";
import makeUserAuth from "./auth/user.js";

dotenv.config({
  path: path.join(path.resolve(),"./.env")
});

const init = async () => {

    const server = Hapi.server({
        port: parseInt(process.env.PORT || 7000),
        //host: (process.env.HOST || 'localhost'),
        routes: {
            cors: true,
            validate: {
                failAction: (request, h, err) => {
                    if (process.env.NODE_ENV === 'production') {
                        console.error('ValidationError:', err.message);
                        throw new Error(`Invalid request payload input`);
                    } else {
                        console.error(err);
                        throw err;
                    }
                }
            }
        }
    });

    await server.register([Inert, AuthBearer]);

    makeAdminAuth(server);
    makeUserAuth(server);

    server.route(routes);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();