type Answer = {
    id: number,
    answer: string,
    value: string,
}

type StoredAnswers = {
    [key: string]: Answer[],
}
