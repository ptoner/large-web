import {Buffer} from 'buffer'

class UploadService {

  constructor(
    private ipfs
  ) {}

  async uploadFile(fileElement) {

    const self = this;

    let ipfsCid = '';

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async function () {
        // @ts-ignore
        const buf = new Buffer(reader.result)

        if (buf) {

          try {
            ipfsCid = await self.ipfs.add( buf)
          } catch (ex) {
            reject(ex)
          }

        }

        //@ts-ignore
        let hash = ipfsCid[0].hash 
        resolve(hash);
      };

      if (fileElement.files.length > 0) {
        reader.readAsArrayBuffer(fileElement.files[0]);
      } else {
        resolve(ipfsCid);
      }

    });
  }

}




export { UploadService }

