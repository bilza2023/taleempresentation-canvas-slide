



export default class Item {
    constructor(uuid,name,content,showAt,hideAt,itemExtra,itemArray){
        this.uuid = uuid;
        this.name = name; 
        this.content = content; 
        this.showAt =showAt; 
        this.hideAt =hideAt;
        this.itemExtra = itemExtra;
        this.itemArray = itemArray;
    }
}