interface IClass {
	id: number;
	students: Student[];
	teacher: People;
	classRoom: ClassRoom;
	rating: number;
}

class Class implements IClass{
	constructor(students:Student[],teacher:People,id:number,classRoom:ClassRoom,rating:number){
		this.students = students;
		this.teacher = teacher;
		this.id = id;
		this.classRoom = classRoom;
		this.rating = rating;
	}
	
}