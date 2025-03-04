type Data = {
    steps: {
        all: StepSummary[];
        current: {
            id: number;
            title: string;
            totalQuestions: number;
        };
        total: number;
    };
    question: Question;
};
