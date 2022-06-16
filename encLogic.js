const crypto = require('crypto');
const AesKey='E486BB61EB213ED88CC3CFB938CD58D7';
const encryptionType = 'aes-256-cbc';
const encryptionEncoding = 'base64';
const bufferEncryption = 'utf-8';
// const AesIV= new Buffer.alloc(8).toString('hex');
// console.log("AesIV ",AesIV);

const decryptdata=async (text,AesIV)=>{
    const buff = Buffer.from(text, encryptionEncoding);
    const key = Buffer.from(AesKey, bufferEncryption);
    //const iv = Buffer.from(AesIV, bufferEncryption);
    const iv=new Buffer.alloc(8).toString('hex');
    const decipher = crypto.createDecipheriv(encryptionType, key, iv);
    const deciphered = decipher.update(buff) + decipher.final();
    return deciphered;
};


const encryptdata=async (text,AesIV)=>{
    const key = Buffer.from(AesKey, bufferEncryption);
    const iv=new Buffer.alloc(8).toString('hex');
   // const iv = Buffer.from(AesIV, bufferEncryption);
    const cipher = crypto.createCipheriv(encryptionType, key, iv);
    let encrypted = cipher.update(text, bufferEncryption, encryptionEncoding);
    encrypted += cipher.final(encryptionEncoding);
    return encrypted;
};


function testData (){
    const encVal = encryptdata('109',AesKey)//8976543957
    console.log('encVal-->', encVal);

    const decVal = decryptdata('Orc83JLjICzgTMj3nNcL7A==', AesKey)//5mBfVJ7HWTU6+10yn+JLiw==
    console.log('decVal-->', decVal);
}

testData();