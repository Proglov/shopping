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

export const getAllUsers = async (token, filters) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    })
    const query = gql`
        query($page:Int, $perPage:Int){
        UsersGet(page:$page, perPage:$perPage){
            id
            name
        }
    }
    `
    const result = await graphQLClient.request(query, filters)
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
