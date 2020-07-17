function get(index){
  let get = localStorage.getItem(index);
  if (get!==null && get!=='' && get!==undefined && get!=="undefined")  {
    return JSON.parse(get);
  }else if (get==="undefined") {
    clear(index);
    return {}
  } else {
    return {}
  }
}

function set(index,object){
  localStorage.setItem(index,JSON.stringify(object));
}

function clear(){
  localStorage.clear();
}

export default {get,set,clear}
