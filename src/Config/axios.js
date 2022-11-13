import axios from "axios"

const instace = axios.create({
    baseURL:'https://murmuring-fjord-13467.herokuapp.com/api/products/'
})

export default instace;