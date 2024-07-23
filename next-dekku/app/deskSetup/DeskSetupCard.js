export default function DeskSetupCard({ data }) {
    return (
        <div key={data.id} className="border rounded-lg p-6 shadow-lg w-72 bg-white">
            <img src={data.imgSrc} alt="desk" className="w-72 h-48 object-cover mb-6 rounded-md"/>
            <div className="space-y-6">
                <div className="flex justify-between text-base">
                    <div className="flex items-center space-x-2">
                        <img src="/view_icon.png" alt="view" className="w-4 h-4"/>
                        <span>{data.views}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <img src="/like_icon.png" alt="like" className="w-4 h-4"/>
                        <span>{data.likes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <img src="/comment_icon.png" alt="comment" className="w-4 h-4"/>
                        <span>{data.comments}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12">
                        <img src={data.profileImg} alt="profile" className="w-full h-full object-cover rounded-full"/>
                    </div>
                    <div className="flex-1">
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2">
                                <div className="font-semibold truncate w-28">{data.username}</div>
                                <button className="text-blue-500 flex-shrink-0">Follow</button>
                            </li>
                            <li className="text-gray-400 text-xs truncate w-44">{data.description}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
