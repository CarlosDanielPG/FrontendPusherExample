import gql from 'graphql-tag'

export const CREATE_PROJECT_MESSAGE = gql`
  mutation createProjectMessage($message: String!) {
        projectMessage(input: {
            project_id: 2,
            to_role: expert,
            body: $message
        }) {
            id
            creator {
            first_name
            last_name
            }
            to_role
            body
        }
    }
`

export const CREATE_MESSAGE = gql`
  mutation createMessage($message: String!) {
        createMessage(input: {
            with_admin: true
            body: $message
        }) {
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
`