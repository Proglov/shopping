'use server'
import { gql, GraphQLClient } from 'graphql-request'

const api = process.env.BackEnd_API;

export const getAllTxs = async (token, filters) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });
    const query = gql`
        query ($page:Int, $perPage:Int){
            TransActions(page:$page, perPage:$perPage){
                id,
                user{
                    id,
                    name,
                    email,
                    username,
                    address,
                    phone,
                    role
                },
                boughtProducts{
                    id,
                    name,
                    price,
                    category,
                    subcategory,
                    offPercentage,
                    imagesUrl
                },
                address,
                shouldBeSentAt,
                boughtAt,  
            }
        }
    `;
    const result = await graphQLClient.request(query, filters)
    return result
}


export const deleteTx = async (id, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    })
    const query = gql`
        mutation($id:String!){
            TransActionDelete(id:$id){
                MessageAndStatus
            }
        }
    `
    const result = (await graphQLClient.request(query, { id })).message
    return result
}
