// Compiled using app-kwa 1.0.0 (TypeScript 4.9.5)
function doGet() {
    const SID = PropertiesService.getScriptProperties().getProperty('spread-id')
    if (!SID) throw new Error("Kesalahan spread id !");

    const SS = SpreadsheetApp.openById(SID)
    // ok
}


