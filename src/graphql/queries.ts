import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($page: Int!, $limit: Int!) {
    users(options: { paginate: { page: $page, limit: $limit } }) {
      data {
        id
        name
        username
        email
        phone
        website
        address {
          street
          suite
          city
          zipcode
        }
        company {
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query GetUserDetails($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      phone
      website
      address {
        street
        suite
        city
        zipcode
      }
      company {
        name
        catchPhrase
        bs
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($userId: ID!, $page: Int, $limit: Int) {
    user(id: $userId) {
      posts(options: { paginate: { page: $page, limit: $limit } }) {
        data {
          id
          title
          body
        }
        links {
          first {
            page
            limit
          }
          prev {
            page
            limit
          }
          next {
            page
            limit
          }
          last {
            page
            limit
          }
        }
        meta {
          totalCount
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($page: Int!, $limit: Int!) {
    posts(options: { paginate: { page: $page, limit: $limit } }) {
      data {
        id
        title
        body
      }
      links {
        first {
          page
          limit
        }
        prev {
          page
          limit
        }
        next {
          page
          limit
        }
        last {
          page
          limit
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_USER_ALBUMS = gql`
  query GetUserAlbums($userId: ID!) {
    user(id: $userId) {
      albums {
        data {
          id
          title
        }
      }
    }
  }
`;
