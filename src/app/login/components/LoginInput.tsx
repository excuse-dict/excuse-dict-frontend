export default function LoginInput({ placeholder, type, input, setInput, onKeyPress }: {
    placeholder: string,
    type?: string,
    input: string,
    setInput: (value: string) => void,
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}){

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    return (
        <input
            className="w-full px-4 py-3 bg-white/70 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            placeholder={placeholder}
            type={type}
            value={input}
            onChange={handleChange}
            onKeyPress={onKeyPress}
        />
    );
}