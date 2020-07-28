interface DraftEditorProps {
    placeholder?: string | undefined,
    readOnly?: boolean,
    value?: string,
    onChange?: any,
    style?: React.CSSProperties,
    hidden? : boolean,
    wrap?: boolean,
    wordLearner?: boolean
}

export default DraftEditorProps