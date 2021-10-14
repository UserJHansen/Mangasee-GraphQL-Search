import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    Manga: [MangaEntry]!
  }

  type MangaEntry {
    i: String!
    s: String!
    o: String!
    ss: String!
    ps: String!
    t: String!
    v: String!
    vm: String!
    y: String!
    a: [String!]!
    al: [String!]!
    l: String!
    lt: Int!
    ls: String!
    g: [String!]!
    h: Boolean!
  }

  type MangaChangeString {
    op: String!
    path: [String]
    val: String
    oldVal: String
  }
  type MangaChangeInt {
    op: String!
    path: [String]
    val: Int
    oldVal: Int
  }
  type MangaChangeBoolean {
    op: String!
    path: [String]
    val: Boolean
    oldVal: Boolean
  }

  union MangaChange = MangaChangeString | MangaChangeInt | MangaChangeBoolean

  type Update {
    mostCurrent: [MangaEntry!]!
    delta: [MangaChange]!
  }

  type Subscription {
    searchUpdate: Update
  }

  subscription {
    searchUpdate: Update
  }
`;

export default typeDefs;
