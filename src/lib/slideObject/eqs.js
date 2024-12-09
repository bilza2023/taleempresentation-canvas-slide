

import eqsHealth  from "../eqs/eqsHealth";

export default class Eqs{



// newItem(){
// return getNewItem();
// }

checkHealth(slide, fix = false){
    return eqsHealth(slide,fix);
}


}