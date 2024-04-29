import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
    myPublicImages: es.imageBucket().beforeDelete(({ ctx, fileInfo }) => {
        return true; // allow delete
    }),
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});

export { handler as GET, handler as POST }; 