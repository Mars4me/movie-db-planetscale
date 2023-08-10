'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="px-4 py-2 text-white transition-colors bg-teal-500 rounded-lg hover:bg-teal-900"
        >
            {pending ? <>loading...</> : <>Add comment...</>}
        </button>
    );
}
