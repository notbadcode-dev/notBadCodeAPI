export const getPagination = (page, take) => {
    let limit = take ? take : 12;
    let offset = page ? (page - 1) * limit : 0;
    
    return { limit, offset };
};

export const getPaginationResult = (page, data) => {
    console.log(data)
    if (data) {
        return {
            totalItems: data.totalDocs,
            items: data.docs,
            totalPages: data.totalPages,
            currentPage: parseInt(page, 10),
            lastPage: page > 1 ? page - 1 : 1,
            nextPage: data.totalPages === parseInt(page, 10) ? parseInt(page, 10) : parseInt(page, 10) + 1,
        }
    }
}