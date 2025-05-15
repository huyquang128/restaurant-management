import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function ReviewLoader() {
    return (
        <div className="flex justify-between items-start gap-28 h-60 py-5">
            <div className="flex justify-between gap-3 flex-1">
                <div className="w-16 ">
                    <Skeleton
                        height={64}
                        baseColor="#fff"
                        highlightColor="#ccc"
                        borderRadius={50}
                    />
                </div>
                <div className="flex-1 flex flex-col  justify-between">
                    <div className="w-32 mb-3">
                        <Skeleton
                            height={20}
                            baseColor="#fff"
                            highlightColor="#ccc"
                        />
                    </div>
                    <div className="w-16 mb-8">
                        <Skeleton
                            height={20}
                            baseColor="#fff"
                            highlightColor="#ccc"
                        />
                    </div>
                    <div className="w-96">
                        <Skeleton
                            height={20}
                            baseColor="#fff"
                            highlightColor="#ccc"
                        />
                    </div>
                </div>
            </div>
            <div className="w-36 ">
                <div className=" mb-5">
                    <Skeleton
                        height={100}
                        width={100}
                        baseColor="#fff"
                        highlightColor="#ccc"
                        borderRadius={50}
                    />
                </div>
            </div>
        </div>
    );
}

export default ReviewLoader;
