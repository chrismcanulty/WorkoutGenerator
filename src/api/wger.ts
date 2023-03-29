import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer MxCsrM_lBrAG1dkBtc8T2SR2yL4YfrYxPlKkJ4CEoySq5R4CD-hanESEHXo-UvZhqYe1oyso4V7TvHC7mpuDBsAQgFh20Uf2-X1Kb3gRXrBoS3VLcEJ-ZRFC9UGIY3Yx',
  },
});

// Yelp API

// Client ID
// Aj5EazIznW_5ZBxuwPED2w

// API Key
// MxCsrM_lBrAG1dkBtc8T2SR2yL4YfrYxPlKkJ4CEoySq5R4CD-hanESEHXo-UvZhqYe1oyso4V7TvHC7mpuDBsAQgFh20Uf2-X1Kb3gRXrBoS3VLcEJ-ZRFC9UGIY3Yx
