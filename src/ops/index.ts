import { gql } from "@apollo/client";

export const QUERY_GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      title
      completed
    }
  }
`;

export const MUTATION_ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      completed
      title
    }
  }
`;

export const MUTATION_DELETE_TODO = gql`
  mutation DeleteTodo($deleteTodoId: ID!) {
    deleteTodo(id: $deleteTodoId) {
      id
      title
      completed
    }
  }
`;

export const MUTATION_UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID, $title: String, $completed: Boolean) {
    updateTodo(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;