'use server'
import { request, gql } from 'graphql-request'

const api = process.env.BackEnd_API;


// you can also change the response
export const getAllProducts = async () => {
    const query = gql`
        query{
        Products{
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

