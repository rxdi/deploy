import { GraphQLString, GraphQLObjectType } from "@gapi/core";

export const ProcessStdOutType = new GraphQLObjectType({
    name: 'ProcessStdOutType',
    fields: {
        stdout: {
            type: GraphQLString
        }
    }
});
