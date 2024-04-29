'use server'
import { request, gql } from 'graphql-request'

const api = process.env.BackEnd_API;


// you can also change the response
export const getAllProducts = async (filters) => {
    const query = gql`
        query($page:Int, $perPage:Int){
        Products(page:$page, perPage:$perPage){
            id
            name
            price
            category
            subcategory
            offPercentage
            imagesUrl
        }
    }
    `
    const result = await request(api, query, filters)
    return result
}

export const getProductsCount = async () => {
    const query = gql`
        query{
        ProductsCount
    }
    `
    const result = await request(api, query)
    return result
}

export const getAProduct = async (id) => {
    const query = gql`
        query($id: ID!) {
            Product(id: $id) {
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
    `;
    const result = await request(api, query, { id })
    return result
}

