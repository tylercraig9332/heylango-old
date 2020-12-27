interface WordLearnerProps {
    value?: string,
    onChange?: any,
    readOnly?: boolean,
    style?: React.CSSProperties,
    wordsPerPage?: number,
    fontSize?: string,
    lineHeight?: string,
    simplified?: boolean /** Displays less content for more general purpose */
    autopause?: boolean,
    language?: string // Language Code
}

export default WordLearnerProps