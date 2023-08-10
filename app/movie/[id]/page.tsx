export const dynamic = 'force-dynamic';
import SubmitButton from '@/app/components/SubmitButton';
import { db } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

async function getData(id: string) {
    const data = await db.comment.findMany({
        where: {
            movieId: id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return data;
}

async function postData(formData: FormData) {
    'use server';

    await db.comment.create({
        data: {
            message: formData.get('comment') as string,
            movieId: formData.get('id') as string,
        },
    });

    revalidatePath('/movie/[id]');
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);

    return (
        <div className="p-3 border rounded-lg">
            <h1 className="mb-5 text-xl font-semibold">Your Opinion</h1>

            <div>
                <form action={postData}>
                    <textarea
                        name="comment"
                        className="w-full p-2 border border-teal-500 rounded-lg"
                        placeholder="add your comment..."
                    ></textarea>
                    <input type="hidden" name="id" value={params.id} />
                    <SubmitButton />
                </form>

                <div className="flex flex-col mt-5 gap-y-3">
                    {data.map((post) => (
                        <div key={post.id}>
                            <p>{post.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
