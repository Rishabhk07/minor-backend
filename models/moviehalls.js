/**
 * Created by rishabhkhanna on 13/9/16.
 */
module.exports = (name , address , lat , long )=>{
    this.name = name;
    this.address = address;
    this.lat = lat;
    this.long = long;

    return {
        getname: ()=>{
         return name;
        },
        getaddress: ()=>{
            return address;
        },
        getcod: ()=>{
            return {lat:lat , long: long};
        }
    }
};
