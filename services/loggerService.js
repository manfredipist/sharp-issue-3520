
module.exports = {
    printError : function(fileName, functionName, err){
        console.error("==ERROR==", "|", fileName, "|", functionName, "|", err)
    },
    printDebug : function(fileName, functionName, err){
        console.error("==DEBUG==", "|", fileName, "|", functionName, "|", err)
    }
}