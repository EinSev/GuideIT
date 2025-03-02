type Step = {
    id: number,
    title: string,
    questions: Question[]
}

type StepSummary = {
  id: number;
  title: string;
  totalQuestions: number;
};
