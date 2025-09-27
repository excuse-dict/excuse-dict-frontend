export default function SettingGuide({ env, guide }: {
    env: string,
    guide: Array<string>,
}){
    return (
        <div className="w-fit mx-auto flex">
            <div className="font-semibold mr-4 text-gray-700">{env + ":"}</div>
            {guide.map((step, index) => (
                <div key={index}>
                    <span className="text-blue-800">{step}</span>
                    {index < guide.length - 1 && <span className="text-gray-400 ml-1 mr-1">{">"}</span>}
                </div>
            ))}
        </div>
    );
}