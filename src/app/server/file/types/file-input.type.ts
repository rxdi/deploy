import { GraphQLInputObjectType } from "graphql";
import { FileArguments } from "./file.arguments";

export const FileInputObjectType = new GraphQLInputObjectType({
    name: 'FileInputObjectType',
    fields: () => (FileArguments)
})