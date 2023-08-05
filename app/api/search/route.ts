import { searchPhotos } from "../../../lib/unsplash";

export async function POST(request: Request) {
    const { query }: { query: unknown } = await request.json();
    if (!query || typeof query !== "string") {
        return new Response("Bad request", { status: 400 })
    }

    const searchPhotoResponse = await searchPhotos(query);
    return new Response(JSON.stringify(searchPhotoResponse), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

/*
POSTリクエストのリクエストボディに次のようなJSON型式でqeuryパラメーターが入っている:
{
    "query": "sample"
}
*/