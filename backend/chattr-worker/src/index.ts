export interface Env {
	DB: D1Database;
}

const corsHeaders = {
	'Access-Control-Allow-Headers': '*', // What headers are allowed. * is wildcard. Instead of using '*', you can specify a list of specific headers that are allowed, such as: Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Authorization.
	'Access-Control-Allow-Methods': 'GET', // Allowed methods. Others could be GET, PUT, DELETE etc.
	'Access-Control-Allow-Origin': '*', // This is URLs that are allowed to access the server. * is the wildcard character meaning any URL can.
};

export default {
	async fetch(request: Request, env: Env) {
		const { pathname } = new URL(request.url);

		if (pathname === '/api/af') {
			let searchable = new URLSearchParams(request.url.split('?')[1]);
			let searchValue = Array.from(searchable.values());
			const { results } = await env.DB.prepare('SELECT * FROM quotes WHERE tag = ? ORDER BY RANDOM() LIMIT 1')
				.bind(String(searchValue[0]))
				.all();
			return Response.json(results, {
				headers: {
					'Content-type': 'application/json',
					...corsHeaders, //uses the spread operator to include the CORS headers.
				},
			});
		}

		if (pathname === '/api/af/single') {
			let searchable = new URLSearchParams(request.url.split('?')[1]);
			let searchValue = Array.from(searchable.values());
			const { results } = await env.DB.prepare('SELECT * FROM quotes WHERE id = ? LIMIT 1')
				.bind(String(searchValue[0]))
				.all();
			return Response.json(results, {
				headers: {
					'Content-type': 'application/json',
					...corsHeaders, //uses the spread operator to include the CORS headers.
				},
			});
		}

		if (pathname == '/api/af/random') {
			const { results } = await env.DB.prepare('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1').bind().all();
			return Response.json(results, {
				headers: {
					'Content-type': 'application/json',
					...corsHeaders, //uses the spread operator to include the CORS headers.
				},
			});
		}

		return new Response('Call /api/af?tag={your_query} to see all affirmations related to the tag you queried');
	},
};
