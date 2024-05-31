var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useCallback, useEffect, useRef, useState } from "react";
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
function ScrollLoader(_a) {
    var _this = this;
    var _b = _a.height, height = _b === void 0 ? "200px" : _b, url = _a.url, _c = _a.take, take = _c === void 0 ? 10 : _c, children = _a.children, onEnd = _a.onEnd, renderLoading = _a.renderLoading;
    var _d = useState([]), data = _d[0], setData = _d[1];
    var _e = useState(1), page = _e[0], setPage = _e[1];
    var _f = useState(true), hasMore = _f[0], setHasMore = _f[1];
    var _g = useState(false), isLoading = _g[0], setIsLoading = _g[1];
    var scrollRef = useRef(null);
    var loadMoreData = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var skip, response, result_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!hasMore || isLoading)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    setIsLoading(true);
                    skip = (page - 1) * take;
                    return [4 /*yield*/, fetch("".concat(url, "?skip=").concat(skip, "&take=").concat(take))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result_1 = _a.sent();
                    if (result_1.length === 0) {
                        setHasMore(false);
                    }
                    else {
                        setData(function (prevData) {
                            var newData = __spreadArray(__spreadArray([], prevData, true), result_1, true);
                            // Ensure unique items (if items have a unique 'id' property)
                            return Array.from(new Set(newData.map(function (item) { return item.id; })))
                                .map(function (id) { return newData.find(function (item) { return item.id === id; }); });
                        });
                        setPage(function (prevPage) { return prevPage + 1; });
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error fetching data:', error_1);
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [page, url, take, hasMore, isLoading]);
    var handleScroll = useCallback(function () {
        var scrollElement = scrollRef.current;
        if (scrollElement) {
            var scrollTop = scrollElement.scrollTop, scrollHeight = scrollElement.scrollHeight, clientHeight = scrollElement.clientHeight;
            var scrollThreshold = 5; // Adjust as needed
            if (scrollTop + clientHeight >= scrollHeight - scrollThreshold && !isLoading && hasMore) {
                loadMoreData();
            }
            // Check if scroll reached end and call onEnd if provided
            if (scrollTop + clientHeight === scrollHeight && onEnd) {
                onEnd();
            }
        }
    }, [isLoading, hasMore, loadMoreData, onEnd]);
    useEffect(function () {
        var scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            return function () {
                scrollElement.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);
    useEffect(function () {
        var loadInitialData = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("".concat(url, "?skip=0&take=").concat(take))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (result.length === 0) {
                            setHasMore(false);
                        }
                        else {
                            setData(result);
                            setPage(2); // Reset page to 2 for subsequent loads
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Error fetching initial data:', error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        loadInitialData();
    }, [url, take]);
    return (React.createElement("div", { ref: scrollRef, style: { overflowY: 'auto', height: height } },
        data.map(function (item, index) { return (React.createElement("div", { key: index }, children && children(item))); }),
        isLoading && !renderLoading && React.createElement("div", null, "Loading..."),
        isLoading && renderLoading && renderLoading()));
}
export default ScrollLoader;
