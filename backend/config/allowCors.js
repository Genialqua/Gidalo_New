const allowCors = (req, res) => {
    const allowedOrigins = [
      'https://gidalo-new-frontend.vercel.app',
      'http://localhost:3000'
    ];
    
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Accept-Version, X-Requested-With, X-CSRF-Token, Content-Length, Content-MD5, Date, X-Api-Version');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
        next();
    }

  };
  
  export default allowCors;
  