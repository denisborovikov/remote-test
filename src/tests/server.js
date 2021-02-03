import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL } from 'api/utils';

const server = setupServer();
export { server, rest, BASE_URL };
