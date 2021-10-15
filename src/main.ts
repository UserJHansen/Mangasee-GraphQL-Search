import { getDiff } from 'recursive-diff';
import axios from 'axios';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDef';
import { PubSub } from 'graphql-subscriptions';

(async () => {
  const pubsub = new PubSub();
  const app = express();
  const httpServer = createServer(app);

  const resolvers = {
    Query: {
      Manga: () => oldValue,
    },
    MangaChangeString: {
      __isTypeOf: (data) => {
        return typeof data.val === 'string';
      },
    },
    MangaChangeInt: {
      __isTypeOf: (data) => {
        return typeof data.val === 'number';
      },
    },
    MangaChangeBoolean: {
      __isTypeOf: (data) => {
        return typeof data.val === 'boolean';
      },
    },
    Subscription: {
      searchUpdate: {
        subscribe: () => pubsub.asyncIterator(['SEARCH_UPDATE']),
      },
    },
  };

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath },
  );

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`),
  );

  const changes = [];
  let oldValue;
  while (typeof oldValue === 'undefined')
    try {
      ({ data: oldValue } = await axios(
        'https://manga4life.com/search/search.php',
      ));
    } catch (e) {
      console.error('An Error Ocurred downloading new Data');
    }

  setInterval(async () => {
    console.clear();
    // console.log('Most Updated Data: ', oldValue);
    console.log('Checking for Data...');
    console.log('Changes: ', changes);

    try {
      const { data: mostCurrent } = await axios(
        'https://manga4life.com/search/search.php',
      );
      const delta = getDiff(oldValue, mostCurrent, true);
      if (delta.length !== 0) {
        changes.push([oldValue, delta]);
        pubsub.publish('SEARCH_UPDATE', {
          searchUpdate: {
            delta,
            mostCurrent,
          },
        });
      } else console.log('No New Data Found');

      oldValue = mostCurrent;
    } catch (e) {
      console.error('An Error Ocurred downloading new Data');
    }
  }, 60 * 1000);
})();
