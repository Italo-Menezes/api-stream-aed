export declare const categoryService: {
    findAllPaginated: (page: number, perPage: number) => Promise<{
        categories: import("../models/Category").CategoryInstance[];
        page: number;
        perPage: number;
        total: number;
    }>;
    findByIdWithCourses: (id: string) => Promise<import("../models/Category").CategoryInstance | null>;
};
