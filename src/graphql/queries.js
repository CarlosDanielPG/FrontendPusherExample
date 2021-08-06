import gql from 'graphql-tag'

export const PROJECT_MESSAGES = gql`
    query ProjectMessages {
        projectMessages(project_id: 3) {
            paginatorInfo {
                perPage
                total
            }
            data {
                id
                creator {
                    id
                    first_name
                    last_name
                }
                project {
                    id
                    name
                }
                to_role
                title
                body
                created_at
            }
        }
    }
`

export const MESSAGES = gql`
    query Messages {
        messages(input: {
            with_admin: true
        }) {
            paginatorInfo {
                perPage
                total
            }
            data {
                id
                to_admin
                from {
                    id
                    first_name
                    last_name
                }
                to {
                    id
                    first_name
                    last_name
                }
                title
                body
                created_at
            }
        }
    }
`