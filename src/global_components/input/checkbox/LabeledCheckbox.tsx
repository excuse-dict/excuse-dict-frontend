export default function LabeledCheckbox({
                                            labelText,
                                            labelPosition,
                                            checked,
                                            onChange
                                        }: {
    labelText: string,
    labelPosition: 'LEFT' | 'RIGHT',
    checked: boolean,
    onChange: (checked: boolean) => void
}) {

    return (
        <label className={'flex items-center gap-2 cursor-pointer'}>
            {labelPosition === 'LEFT' && <span>{labelText}</span>}
            <input
                type={'checkbox'}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            {labelPosition === "RIGHT" && <span>{labelText}</span>}
        </label>
    );
}