'use server'
import { gql, GraphQLClient } from 'graphql-request'

const api = process.env.BackEnd_API;

export const createProduct = async (obj, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    });

    const mutation = gql`
        mutation($name: String!, $desc:String!, $price: Int!,$offPercentage: Int!, $category: String!, $subcategory: String!, $imagesUrl:[String!]) {
            ProductCreate(
                input: { 
                    name: $name, 
                    desc:$desc,
                    price: $price, 
                    category: $category, 
                    subcategory: $subcategory,
                    imagesUrl:$imagesUrl
                    offPercentage:$offPercentage
            }) {
                message
            }
        }
    `;

    const variables = {
        name: obj.name,
        desc: obj.desc,
        price: obj.price,
        offPercentage: obj.offPercentage,
        category: obj.category,
        subcategory: obj.subcategory,
        imagesUrl: obj?.imagesUrl || []
    };

    const { ProductCreate } = await graphQLClient.request(mutation, variables);

    return ProductCreate.message;
};

export const updateProduct = async (obj, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    })
    const query = gql`
        mutation($id:ID! , $name: String!,, $desc:String!, $price: Int!,$offPercentage: Int!, $category: String!, $subcategory: String!, $imagesUrl:[String]){
            ProductUpdate (
                input: {
                    id:$id
                    name:$name
                    desc:$desc,
                    price: $price, 
                    category: $category, 
                    subcategory: $subcategory,
                    imagesUrl:$imagesUrl
                    offPercentage:$offPercentage
                }
            ){
                message
            }
        }
    `

    const variables = {
        id: obj.id,
        name: obj.name,
        desc: obj.desc,
        price: obj.price,
        offPercentage: obj.offPercentage,
        category: obj.category,
        subcategory: obj.subcategory,
        imagesUrl: obj?.imagesUrl || []
    };
    const result = (await graphQLClient.request(query, variables)).message
    return result
}

export const deleteProduct = async (id, token) => {
    const graphQLClient = new GraphQLClient(api, {
        headers: {
            authorization: `${token}`,
        },
    })
    const query = gql`
        mutation($id:ID!){
            ProductDelete(id:$id){
                message,
                status
            }
        }
    `
    const result = (await graphQLClient.request(query, { id }))
    return { status: result.ProductDelete.status, message: result.ProductDelete.message }
}
