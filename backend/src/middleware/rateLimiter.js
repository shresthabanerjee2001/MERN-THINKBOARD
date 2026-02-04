import ratelimit  from "../config/upstash.js";
export async function rateLimiter(req,res,next)
{
    try{
       
const identifier = req.headers["x-forwarded-for"] || "127.0.0.1";


const { success } = await ratelimit.limit(identifier);

if (!success) {
  return res.status(429).send("Too Many Requests");
}
next();
    }
    catch(error)
    {
      console.error(error);
       next();
    }
   
}