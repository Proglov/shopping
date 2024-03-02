'use server'
import { gql, GraphQLClient } from 'graphql-request'

const api = process.env.BackEnd_API;

export const createTx = async (obj) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });
    const query = gql`
        mutation($address: String!,$shouldBeSentAt:String!,$boughtProducts: [BoughtProductInput!]) {
            TransActionCreate(
                address:$address,
                shouldBeSentAt: $shouldBeSentAt,
                boughtProducts: $boughtProducts

            ) {
                id,
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
    const variables = {
        boughtProducts: obj.boughtProducts,
        address: obj.address,
        shouldBeSentAt: obj.shouldBeSentAt
    }
    const result = await graphQLClient.request(query, variables)
    return result
}

export const getATx = async (id) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });
    const query = gql`
        query($id: ID!) {
            TransAction(id: $id) {
                id,
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
    const result = await graphQLClient.request(query, { id })
    return result
}

