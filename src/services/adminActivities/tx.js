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
        query ($page:Int, $perPage:Int,$isFutureOrder:Boolean){
            TransActions(page:$page, perPage:$perPage, isFutureOrder:$isFutureOrder){
                id,
                user{
                    id,
                    phone,
                    name
                },
                address,
                shouldBeSentAt,
                boughtAt,
                totalPrice
            }
        }
    `;
    const obj = {
        page: filters.page,
        perPage: filters.perPage,
        isFutureOrder: filters?.isFutureOrder
    }
    const result = await graphQLClient.request(query, obj)
    return result
}

export const getTXCount = async (token, isFutureOrder) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });
    const query = gql`
        query($isFutureOrder:Boolean){
            TransActionsCount(isFutureOrder:$isFutureOrder)
        }
    `
    const result = await graphQLClient.request(query, { isFutureOrder })
    return result
}
