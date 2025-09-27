export default function InfiniteChallengeSubtitle({ text }: {
    text: string,
}){
    return (
        <div className="w-fit mx-auto bg-blue-200 border-blue-400 border-8 p-2 rounded">
            <p className="text-blue-800 text-xl [font-weight:950]" style={{WebkitTextStroke: '0.05px white'}}>
                {text}
            </p>
        </div>
    );
}