'use server'
import { gql, GraphQLClient } from 'graphql-request'

const api = process.env.BackEnd_API;

export const isAdmin = async (token) => {
    //we use GraphQLClient to set headers, otherwise, just use request function
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    })
    const query = gql`
        query{
            UserIsAdmin
        }
    `
    const result = (await graphQLClient.request(query)).UserIsAdmin
    return result
}

export const getAllUsers = async (token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    })
    const query = gql`
        query{
        UsersGet{
            id
            name
            comments {
                user {
                    name
                    email
                }
                body
                likes {
                    number
                }
                disLikes {
                    number
                }
                childrenComment {
                    user {
                        name
                    }
                    body
                    likes {
                        number
                    }
                    disLikes {
                        number
                    }
                }  
            }
        }
    }
    `
    const result = await graphQLClient.request(query)
    return result
}

export const deleteUser = async (id, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });

    const mutation = gql`
        mutation($id:!ID) {
            UserDelete(
                input: { 
                    id: $id
            }) {
                message
            }
        }
    `;

    return await graphQLClient.request(mutation, { id });
};
