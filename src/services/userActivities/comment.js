'use server'
import { request, gql, GraphQLClient } from 'graphql-request'

const api = process.env.BackEnd_API;

export const createComment = async (obj, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });

    const mutation = gql`
        mutation ($body: String!, $parentCommentId: ID, $parentProductId: ID) {
            CommentAdd(
                input: { 
                    body: $body,
                    parentCommentId: $parentCommentId,
                    parentProductId: $parentProductId,
            }) {
                message
            }
        }
    `;

    const variables = {
        body: obj.body,
        parentCommentId: obj.parentCommentId,
        parentProductId: obj.parentProductId,
    };

    return await graphQLClient.request(mutation, variables);
};

export const getAllComments = async (filters) => {
    const query = gql`
        query($page:Int, $perPage:Int, $validated:Boolean){
            Comments(page:$page, perPage:$perPage, validated:$validated){
                id
                body
                user {
                    id
                    phone
                }
                validated
            }
        }
    `
    const result = await request(api, query, filters)
    return result
}

export const getCommentsCount = async (validated) => {
    const query = gql`
        query($validated:Boolean){
            CommentsCount(validated:$validated)
    }
    `
    const result = await request(api, query, { validated })
    return result
}

export const getAComment = async (id) => {
    const query = gql`
        query($id: ID!){
            Comment (id: $id){
                id
                body
                childrenComment {
                    body
                }
                user {
                    id
                    name
                    password
                }
                validated
                likes {
                    number
                }
                disLikes {
                number
                }
            }
        }
    `
    const result = await request(api, query, { id })
    return result.Comment
}

export const toggleLikeComment = async (id, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });

    const mutation = gql`
        mutation($id:!ID) {
            CommentToggleLike(
                input: { 
                    id: $id
            }) {
                message
            }
        }
    `;

    return await graphQLClient.request(mutation, { id });
};

export const toggleDisLikeComment = async (id, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });

    const mutation = gql`
        mutation($id:!ID) {
            CommentToggleDisLike(
                input: { 
                    id: $id
            }) {
                message
            }
        }
    `;

    return await graphQLClient.request(mutation, { id });
};