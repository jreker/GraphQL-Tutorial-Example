// created by Horst

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


//Construct schema with schema language
var schema = buildSchema(`
    type Query {
        hello: String
        quoteOfTheDay: String!
        getNumbers(numberCount: Int!): [Int]
    }
`);

var root = {
    hello: () => {
        return 'Hello World!';
    },
    quoteOfTheDay: () => {
        return 'Learn programming not programming languages, everything else is syntax. (Unknown)'
    },
    getNumbers: function(args) {
        var output = [];
        for(var i = 0;i < args.numberCount;i++) {
            output.push(Math.round(Math.random() * 10000))
        }
        return output;
    }
};

var app = express();
app.use('/graphql',graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000);
console.log("Running GraphQL API Server at localhost:4000/graphql")