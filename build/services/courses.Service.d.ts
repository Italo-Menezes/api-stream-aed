export declare const coursesService: {
    findByIdEpisode: (id: string) => Promise<import("../models/Course").CourseInstance | null>;
    getRadomFeaturedCourses: () => Promise<import("../models/Course").CourseInstance[]>;
    getTopTenNewest: () => Promise<import("../models/Course").CourseInstance[]>;
    findByName: (name: string, page: number, perPage: number) => Promise<{
        courses: import("../models/Course").CourseInstance[];
        page: number;
        perPage: number;
        total: number;
    }>;
    getTopTenBylikes: () => Promise<unknown[] | null>;
};
