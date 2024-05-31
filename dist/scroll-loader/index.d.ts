import React from "react";
interface LoadScrollProps {
    height?: number;
    url: string;
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
declare function ScrollLoader({ height, url, take, children, onEnd, renderLoading }: LoadScrollProps): React.JSX.Element;
export default ScrollLoader;
