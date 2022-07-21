import { Deserializable } from './deserializable';

export class Inscription implements Deserializable {
	inscription_uuid?: string;
	firstname?:string;
    lastname?:string;
    birthday?:Date;
    inscription_date?:Date;
    cost?:number;

    deserialize(input: any) {
		/* Assign input to our object
	     * BEFORE deserialize our address
	     * to prevent already deserialized address
	     * from being overwritten.
	    */
    	Object.assign(this, input);

    	return this;
  	}
    
}
