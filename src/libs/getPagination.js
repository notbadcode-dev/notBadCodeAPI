export const getPagination = (page, take) => {
    const limit = take ? +take : 3;
    const offset = page ? page : 0;

    return { limit, offset };
};

export const getPaginationResult = (data) => {
    if (data) {
        return {
            totalItems: data.totalDocs,
            items: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
            lastPage: data.prevPage,
            nextPage: data.nextPage,
        }
    }
}