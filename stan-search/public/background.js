const STAN_REFERAL_HEADER = "stan-referal";
const REQUEST_HEADERS_TO_REPLACE = ["referer", "origin"];

function replaceHeader(details, header, newHeaderValue) {
    let gotRef = false;
    for(var n in details.requestHeaders){
        gotRef = details.requestHeaders[n].name.toLowerCase() === header;
        if(gotRef){
            details.requestHeaders[n].value = newHeaderValue;
            console.info("...requestHeaders updated...")
            break;
        }
    }
    if(!gotRef){
        details.requestHeaders.push({name:"Referer",value:newHeaderValue});
        console.info("...requestHeaders added...")
    }
}

chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
    const newHeaderValue = details.requestHeaders[STAN_REFERAL_HEADER];

    REQUEST_HEADERS_TO_REPLACE.forEach(header => {
        replaceHeader(details, header, newHeaderValue)
    })

    return {requestHeaders:details.requestHeaders};
},{
    urls:["https://cityexpert.rs/*"]
},[
    "requestHeaders",
    "blocking",
    "extraHeaders"
]);
