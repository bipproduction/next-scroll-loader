import React, { useCallback, useEffect, useRef, useState } from "react";

interface LoadScrollProps {
    height?: string;
    url?: string;
    take?: number;
    children?: (item: any) => React.ReactNode;
    onEnd?: () => void;
    renderLoading?: () => React.ReactNode;
}

/**
 * ### Scroll Loader
 * **DESCRIPTION:**  
 * this component is used to load more data on scroll
 * 
 * ### PARAMS:
 * - height : number , height of the container
 * - url :  string , url to fetch data
 * - take : number , number of items to fetch
 * - children : (item: any) => React.ReactNode , function to render each item
 * 
 * ### EXAMPLE CLIENT SIDE
 * 
 * ```tsx
 * <ScrollLoader url="/api/test-scroll" take={30}>
 *   {(data) => <Box>
 *     {data.name}
 *   </Box>}
 * </ScrollLoader>
 * ```
 * 
 * ### EXAMPLE SERVER SIDE
 * 
 * ```ts
 * export async function GET(req: Request) {
 *     const take = +(new URL(req.url).searchParams.get('take') || 10)
 *     const skip = +(new URL(req.url).searchParams.get('skip') || 0)
 *     
 *     const data = await prisma.testScroll.findMany({
 *         take,
 *         skip
 *     })
 *     return Response.json(data)
 * }
 * ```
 * 
 */
export default function ScrollLoader({
    height = "200px",
    url,
    take = 10,
    children,
    onEnd,
    renderLoading
}: LoadScrollProps) {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const loadMoreData = useCallback(async () => {
        if (!hasMore || isLoading) return;

        try {
            setIsLoading(true);
            const skip = (page - 1) * take;
            const response = await fetch(`${url}?skip=${skip}&take=${take}`);
            const result = await response.json();

            if (result.length === 0) {
                setHasMore(false);
            } else {
                setData(prevData => {
                    const newData = [...prevData, ...result];
                    // Ensure unique items (if items have a unique 'id' property)
                    return Array.from(new Set(newData.map(item => item.id)))
                        .map(id => newData.find(item => item.id === id));
                });
                setPage(prevPage => prevPage + 1);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Optionally, inform users about the error
        } finally {
            setIsLoading(false);
        }
    }, [page, url, take, hasMore, isLoading]);

    const handleScroll = useCallback(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            const { scrollTop, scrollHeight, clientHeight } = scrollElement;
            const scrollThreshold = 5; // Adjust as needed
            if (scrollTop + clientHeight >= scrollHeight - scrollThreshold && !isLoading && hasMore) {
                loadMoreData();
            }
            // Check if scroll reached end and call onEnd if provided
            if (scrollTop + clientHeight === scrollHeight && onEnd) {
                onEnd();
            }
        }
    }, [isLoading, hasMore, loadMoreData, onEnd]);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            return () => {
                scrollElement.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const response = await fetch(`${url}?skip=0&take=${take}`);
                const result = await response.json();

                if (result.length === 0) {
                    setHasMore(false);
                } else {
                    setData(result);
                    setPage(2); // Reset page to 2 for subsequent loads
                }
            } catch (error) {
                console.error('Error fetching initial data:', error);
                // Optionally, inform users about the error
            }
        };

        loadInitialData();
    }, [url, take]);

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

