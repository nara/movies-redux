
var resultsCache = {
  dataForQuery: {},
  nextPageNumberForQuery: {},
  totalForQuery: {},
};

class MovieCache {
    
    getDataForQuery(query: string = '') {
        var data = resultsCache.dataForQuery[query];
        if(data){
            return {
                filter: query,
                movies: data,
                total: resultsCache.totalForQuery[query],
                pageNumber: resultsCache.nextPageNumberForQuery[query]
            }
        }
        return null;
    }
    
    setDataForQuery(query: string = '', data: Object, pageNumber: integer, totalCount: ?integer){
        if(totalCount){
            resultsCache.totalForQuery[query] = totalCount;    
        }
        else{
            resultsCache.totalForQuery[query] = data.total;
        }
        resultsCache.dataForQuery[query] = data.movies;
        resultsCache.nextPageNumberForQuery[query] = pageNumber;
    }
}

export default new MovieCache();