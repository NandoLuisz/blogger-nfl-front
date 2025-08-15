import axios from 'axios'

export const api = axios.create({
    baseURL: "http://nfl-blogger-aws-dev.us-east-1.elasticbeanstalk.com",
    headers: {
        'Content-Type': 'application/json',
    },
})