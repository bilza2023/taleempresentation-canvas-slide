
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

///////////////////////
const KVPairSchema = new Schema({
 key:{ 
	type:String ,
	required:true ,
	},
 value:{ 
	type:String ,
	required:true ,
	default:'' ,
	},
});
////////////////////////
const ItemSchema = new Schema({
 name:{ 
	type:String ,
	required:false ,
	},
 content:{ 
	type:String ,
	required:false ,
	},
 showAt:{ 
	type:Number ,
	required:true ,
	default:0
	},
 extra:{ //this is very important item.extra has a lot of internal usage
 	type: Schema.Types.Mixed,
    required: true,
    default: {},
    },
 arr:{ 
 	type: [Schema.Types.Mixed],
    required: true,
    default: [],
    }
});

const SlidesSchema = new Schema({
    startTime:{ 
	type:Number ,
	required:false ,
	},
    endTime:{ 
	type:Number ,
	required:false ,
	},
    type:{ 
	type:String ,
	required:false ,
	},
    soundFileType:{ 
	type:String ,
	defualt : "opus"
	},
    template:{ 
	type:String ,
	required:false ,
	default : ''
	},//  
    items:{ 
	type:[ItemSchema] ,
	required:true ,
	default : []
	},
    slideExtra:{ 
	type:[KVPairSchema] ,
	required:true ,
	default : []
	},
	// most confusing thing in this app = this field ==>this is slide.extra NOT slide.slideExtra and also NOT item.extra
	extra:{ // this is slide.extra NOT slide.slideExtra and also NOT item.extra
		type: Schema.Types.Mixed,
	   required: true,
	   default: {},
	}
    
});


module.exports = {ItemSchema,SlidesSchema};