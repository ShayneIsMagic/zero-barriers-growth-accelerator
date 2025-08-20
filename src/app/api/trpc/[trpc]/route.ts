import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/routers';
import { createContext } from '@/server/context';

const handler = (req: Request) => {
  const options: any = {
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  };

  if (process.env.NODE_ENV === 'development') {
    options.onError = ({ path, error }: any) => {
      console.error(
        `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
      );
    };
  }

  return fetchRequestHandler(options);
};

export { handler as GET, handler as POST };
