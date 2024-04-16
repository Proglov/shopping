'use server'
import { request, gql, GraphQLClient } from 'graphql-request'

const api = process.env.BackEnd_API;

// i donno what exactly i want from this function right now, but i get all properties except for the password and txs
export const getMe = async (token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    })
    const query = gql`
        query{
            UserGetMe{
                id,
                name,
                email,
                username,
                address,
                phone,
                role,
            }
        }
    `
    const result = (await graphQLClient.request(query)).UserGetMe
    return result
}

export const signUp = async (phone) => {
    const query = gql`
        mutation($phone:String!){
            UserSignUp(phone:$phone){
                message,
                token
            }
        }
    `
    const result = await request(api, query, { phone })
    return result
}

export const signInWithPhone = async (phone) => {
    const query = gql`
        mutation($phone:String!){
            UserSignInWithPhone(phone:$phone){
                message,
                token
            }
        }
    `
    const result = await request(api, query, { phone })
    return result
}

export const signInWithEmailOrUsername = async (emailOrUsername, password) => {
    const query = gql`
        mutation{
            UserSignInWithEmailOrUsername(emailOrUsername:${emailOrUsername}, password:${password}){
                message,
                token
            }
        }
    `
    const result = await request(api, query)
    return result
}

export const updateUser = async (obj, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });

    const mutation = gql`
        mutation(
            $id: ID!,
            $name: String,
            $email: String,
            $username: String,
            $password: String,
            $address: [String],
            $phone: String
        ) {
            UserUpdate(
                input: { 
                    id:$id,
                    name: $name,
                    email: $email,
                    username: $username,
                    password: $password,
                    address: $address,
                    phone: $phone
            }) {
                message,
                token
            }
        }
    `;

    const variables = {
        id: obj.id,
        name: obj.name,
        email: obj.email,
        username: obj.username,
        password: obj.password,
        address: obj.address,
        phone: obj.phone
    };

    return await graphQLClient.request(mutation, variables);
};
