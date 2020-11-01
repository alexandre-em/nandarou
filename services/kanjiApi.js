import axios from 'axios'

const kanjiApi = axios.create({
    baseURL: "https://kanjialive-api.p.rapidapi.com/api/public/",
    headers: {
        "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
        "x-rapidapi-key": "4961accbaamsh89fdb991f6675c2p1d7481jsncbe8e40aac9b",
        "useQueryString": true
    }
})

export default kanjiApi