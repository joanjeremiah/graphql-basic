const express = require('express')
const { graphqlHTTP } = require('express-graphql') 
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql')
const app = express()

const songs = [
    {id: 1,name: 'lovely',year: 2017,artistId: 1},
    {id: 2,name: 'changes',year: 2016,artistId: 2},
]

const SongType = new GraphQLObjectType({
    name: 'Song',
    description: 'Represents a song',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        year: {type: GraphQLInt},
        artistId: {type: GraphQLInt}
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Root',
    description: 'Root',
    fields: () => ({
        songs: {
            type: GraphQLList(SongType),
            resolve: () => songs
        },
        song: {
            type: SongType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: (parent,args) => songs.find(song => song.id == args.id)
        }
    })

})
const schema = new GraphQLSchema({
    query: RootQueryType
})
app.use('/graphql',graphqlHTTP ({
    schema: schema, 
    graphiql:true
}))

PORT = process.env.PORT || 3000
app.listen(PORT,() => console.log(`Server running on port ${PORT}`))