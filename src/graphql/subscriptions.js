import gql from 'graphql-tag'

export const PROJECT_MESSAGE_SENT_SUBSCRIPTION = gql`
    subscription projectMessageCreated {
        projectMessageCreated (project_id: 3) {
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
`

export const MESSAGE_SENT_SUBSCRIPTION = gql`
    subscription messageCreated {
        messageCreated (with_admin: true) {
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