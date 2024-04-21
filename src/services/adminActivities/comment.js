'use server'
import { gql, GraphQLClient } from 'graphql-request'

const api = process.env.BackEnd_API;

export const updateComment = async (obj, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });

    const mutation = gql`
        mutation($id:!ID,$body: String!) {
            CommentAdd(
                input: { 
                    id: $id,
                    body: $body
            }) {
                message
            }
        }
    `;

    const variables = {
        id: obj.id,
        body: obj.body
    };

    return await graphQLClient.request(mutation, variables);
};

export const deleteComment = async (id, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });

    const mutation = gql`
        mutation($id:!ID) {
            CommentDelete(
                input: { 
                    id: $id
            }) {
                message
            }
        }
    `;

    return await graphQLClient.request(mutation, { id });
};

export const toggleValidateComment = async (id, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });

    const mutation = gql`
        mutation($id:!ID) {
            CommentToggleValidate(id: $id) {
                message
                status
            }
        }
    `;

    return await graphQLClient.request(mutation, { id });
};
