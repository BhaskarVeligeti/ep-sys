const server = require('./server');

server.listen(process.env.PORT || 4000, () => {
	console.log(`Running a GraphQL API server at http://localhost:${process.env.PORT || 4000}/graphql`)
})
