const { gql } = require('apollo-server');

// Définir le schéma GraphQL
const typeDefs = gql`
  type GymMembership {
    id: ID!
    customerId: ID!
    startDate: String!
    endDate: String!
    isActive: Boolean!
  }

  type GymCustomer {
    id: ID!
    name: String!
    email: String!
    memberships: [GymMembership]
  }

  type Query {
    getCustomer(id: ID!): GymCustomer
    memberships(id: ID!): GymMembership
  }

  type Mutation {
    createMembership(customerId: ID!, startDate: String!, endDate: String!): GymMembership
  }
`;

module.exports = typeDefs;
