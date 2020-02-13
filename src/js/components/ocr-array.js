export async function ocrToArray(data){
    let dataTemp = await data;
    let datas = JSON.parse(data)
    let array = datas.images[0].fields.map(element => element.inferText)
    console.info(`ocrToArray : `,array)
    return array//배열 넘김
}