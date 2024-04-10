import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

  const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  })
  
  const adapter = new PrismaLibSQL(libsql)
  const prisma = new PrismaClient({ adapter })

export async function POST(req: Request) {
    const body = await req.json();
    if (!body) return;
    try {
      const post = await prisma.quote.create({
        data: {
          content:body.content,
          d1Id: body.d1Id, 
          userId:body.userId
        },
      });
      return Response.json({ status: 200, body: post });
    } catch (error) {
      console.error('Request error', error);
      return new Response(JSON.stringify({ error: error, success: false }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }