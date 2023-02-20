import { v4 as uuidv4 } from 'uuid';

const publicPath = './public';
let path = publicPath;

export class HelperFileLoader {
  static set path(_path) {
    path = publicPath + _path;
  }

  public static customFileName(req, file, cb) {
    const originalName = file.originalname.split('.');
    const fileExtension = originalName[originalName.length - 1];
    const arr = ['png', 'jpeg', 'jpg', 'gif'];
    if (arr.indexOf(fileExtension) != -1) {
      cb(null, `${uuidv4()}.${fileExtension}`);
    }
    return 'Error, check file format';
  }

  public static destinationPath(req, file, cb) {
    cb(null, path);
  }
}
