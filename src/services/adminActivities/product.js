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
        mutation($name: String!, $desc:String!, $price: Int!, $category: String!, $subcategory: String!) {
            ProductCreate(
                input: { 
                    name: $name, 
                    desc:$desc,
                    price: $price, 
                    category: $category, 
                    subcategory: $subcategory 
            }) {
                message
            }
        }
    `;

    const variables = {
        name: obj.name,
        price: obj.price,
        category: obj.category,
        subcategory: obj.subcategory,
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
        mutation($id:String! , $name: String!){
            ProductUpdate (
                input: {
                    id:$id
                    name:$name
                }
            ){
                message
            }
        }
    `
    // improve this:
    // id,
    // name,
    // desc,
    // price,
    // category,
    // subcategory,
    // offPercentage,
    // imagesUrl,
    // commentsIds

    const variables = {
        id: obj.id,
        name: obj.name,
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
        mutation($id:String!){
            ProductDelete(id:$id){
                MessageAndStatus
            }
        }
    `
    const result = (await graphQLClient.request(query, { id })).message
    return result
}
