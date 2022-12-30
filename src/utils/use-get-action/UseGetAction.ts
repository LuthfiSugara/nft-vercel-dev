import log from "../remove-console";


const UseGetAction = (url: string, queries: object) => {
    try{
        let qr = '?';
        url = url;
        if(queries != undefined){
            for(let query in queries){
                qr += `${query}=${queries[query]}&`
            }
            url += qr;
        }

        // const response = await API.get(url);
        // console.log("response get : ", response.data);
        // if(response.data.status == 'success'){
        //     await dispatch({
        //         type: type,
        //         payload: {
        //             loading: false,
        //             data: response.data.data
        //         }
        //     });

        //     if(isPagination){
        //         await dispatch({
        //             type: SET_PAGINATION,
        //             payload: {
        //                 loading: false,
        //                 data: response.data.pagination
        //             }
        //         });
        //     }
        // }

        // return response.data;


    }catch(error){
        log("error get actions : ", error);
    }
}

export default UseGetAction;