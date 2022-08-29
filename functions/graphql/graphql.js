const { ApolloServer, gql } = require(`apollo-server-lambda`);
const faunadb = require(`faunadb`);
const q = faunadb.query;
const dotenv = require(`dotenv`);

dotenv.config();

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const typeDefs = gql`
  type Query {
    getTodos: [Todo!]
  }
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }
  type Mutation {
    addTodo(title: String!): Todo!
    deleteTodo(id: ID!): Todo!
    updateTodo(completed: Boolean, id: ID, title: String): Todo!
  }
`;

const resolvers = {
  Query: {
    getTodos: async () => {
      try {
        const { data } = await client.query(
          q.Paginate(q.Match(q.Index(`all_todos`))),
        );
        const todos = [];
        const todoData = await client.query(
          data.map((ref) => {
            return q.Get(ref);
          }),
        );
        todoData.forEach((entry) =>
          todos.push({
            id: entry.ref.id,
            ...entry.data,
          }),
        );
        console.log(todos);
        return todos;
      } catch (err) {
        return err;
      }
    },
  },

  Mutation: {
    addTodo: async (_, args) => {
      try {
        const { data, ref } = await client.query(
          q.Create(q.Collection(`todos`), {
            data: {
              title: args.title,
              completed: true,
            },
          }),
        );
        return {
          id: ref.id,
          ...data,
        };
      } catch (err) {
        return err;
      }
    },

    deleteTodo: async (_, { id }) => {
      try {
        const { data, ref } = await client.query(
          q.Delete(q.Ref(q.Collection(`todos`), id)),
        );
        return {
          ...ref.id,
          ...data,
        };
      } catch (err) {
        return err;
      }
    },

    updateTodo: async (_, { id, title, completed }) => {
      try {
        const { data, ref } = await client.query(
          q.Replace(q.Ref(q.Collection(`todos`), id), {
            data: { title, completed },
          }),
        );
        console.log(ref);
        return {
          id: ref.id,
          ...data,
        };
      } catch (err) {
        return err;
      }
    },
  },
};

const getHandler = (event, context) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
  });
  const graphqlHandler = server.createHandler();
  if (!event.requestContext) {
    event.requestContext = context;
  }
  return graphqlHandler(event, context);
};

exports.handler = getHandler;
