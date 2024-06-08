
interface ISchool {
	id:number;
	street:string;
	houseNo:number;
	city:string;
	classes:Class[];
	classRooms: ClassRoom[];
	students:Student[];
	director:People;
	workers:People[];
}
class School implements ISchool{}