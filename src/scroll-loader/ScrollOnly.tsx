import React, { useCallback, useEffect, useRef, useState } from "react";

interface LoadScrollProps {
    height?: string;
    children?: (item: any) => React.ReactNode;
    renderLoading?: () => React.ReactNode;
    moreData: () => Promise<any[]>
    data: any[]
    setData: React.Dispatch<React.SetStateAction<any[]>>
    verbose?: boolean
}


/**
 * example use
 * 
 * ```tsx
 * <ScrollOnly data={data} setData={setData} moreData={async () => {
 *     const newData = Array.from({ length: 50 }, (_, i) => i + data.length + 1)
 *     await new Promise(resolve => setTimeout(resolve, 2000))
 *     return newData
 * }} >
 *   {(item) => <div> {item}</div>}
 * </ScrollOnly>
 * ```
 * 
 * 
 */
export default function ScrollOnly({
    height = "200px",
    children,
    renderLoading,
    moreData,
    data,
    setData,
    verbose
}: LoadScrollProps) {
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const loadMoreData = useCallback(async () => {
        if (!hasMore || isLoading) {
            verbose && console.log('Already loading or no more data');
            return;
        }

        try {
            setIsLoading(true);
            const newData = await moreData();
            if (newData.length === 0) {
                verbose && console.log('No more data');
                setHasMore(false);
            } else {
                verbose && console.log('Loaded more data');
                setData([...data, ...newData])
            }

        } catch (error) {
            verbose && console.error('Error fetching data:', error);
        } finally {
            verbose && console.log('Finished loading more data');
            setIsLoading(false);
        }
    }, [hasMore, isLoading, moreData, setData]);

    const handleScroll = useCallback(() => {
        const scrollElement = scrollRef.current;
        verbose && console.log('Scrolling');
        if (scrollElement) {
            const { scrollTop, scrollHeight, clientHeight } = scrollElement;
            const scrollThreshold = 5; // Adjust as needed
            if (scrollTop + clientHeight >= scrollHeight - scrollThreshold && !isLoading && hasMore) {
                verbose && console.log('Loading more data');
                loadMoreData();
            }
        }
    }, [isLoading, hasMore, loadMoreData]);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            verbose && console.log('Adding scroll listener');
            scrollElement.addEventListener('scroll', handleScroll);
            return () => {
                scrollElement.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    return (
        <div ref={scrollRef} style={{ overflowY: 'auto', height }}>
            {data.map((item: any, index: number) => (
                <div key={index}>
                    {children && children(item)}
                </div>
            ))}
            {isLoading && !renderLoading && <div>Loading...</div>}
            {isLoading && renderLoading && renderLoading()}
        </div>
    );
}
