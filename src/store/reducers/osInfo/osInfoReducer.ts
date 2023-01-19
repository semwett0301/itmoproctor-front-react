import {Reducer} from 'redux';

export interface IOsInfo {
  detectedOS: string,
  detectedArch: string
}

function detectOS(): string {
  let os = 'unknown';
  if (navigator.platform.toUpperCase().indexOf('WIN') !== -1) os = 'win';
  else if (navigator.platform.toUpperCase().indexOf('MAC') !== -1) os = 'osx';
  else if (navigator.platform.toUpperCase().indexOf('LINUX') !== -1) os = 'linux';
  return os;
}


function detectArch(): string {
  let arch = '32';
  const arr = ['x86_64', 'x86-64', 'Win64', 'x64;', 'amd64', 'AMD64', 'WOW64', 'x64_64'];
  for (let i = 0, l = arr.length; i < l; i++) {
    if (navigator.userAgent.indexOf(arr[i]) !== -1) {
      arch = '64';
      break;
    }
  }
  return arch;
}

const initialState: IOsInfo = {
  detectedArch: detectArch(),
  detectedOS: detectOS()
}

export const osInfoReducer: Reducer<IOsInfo> = (
  state= initialState): IOsInfo => {
  return state
}
