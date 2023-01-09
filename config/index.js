module.exports = {
  stage: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'production' 
    ? process.env.PORT 
    :  9010
};