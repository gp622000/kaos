const { gql } = require("apollo-server-express");

// create_account(id: String, name: String): Account

const typeDefs = gql`
  type Query {
    accounts: [Account]
  }

  type Mutation {
    create_account(name: String, ifscs: [String]): Account
    add_meta(name: String, branch: String, city: String): Meta
  }

  type Account {
    id: String
    name: String
    banks: [Bank]
  }

  type Bank {
    ifsc: String
    meta: Meta
  }

  type Meta {
    name: String
    branch: String
    city: String
    weather: Weather
  }

  type Weather {
    current: Current
    tomorrow: Tomorrow
  }
  type Current {
    temperature: Int
    comment: String
  }
  type Tomorrow {
    min: Int
    max: Int
  }
`;

module.exports = { typeDefs };
