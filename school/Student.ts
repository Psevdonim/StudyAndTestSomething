interface IPeople {
	id: number;
	name: string;
	age: number;
	role: string;
}
class People  implements IPeople {}

class Student extends People {
	classRoomTeacherId: number;
	classId:number;
	rating: number;
	teacherIds: People[]
}
