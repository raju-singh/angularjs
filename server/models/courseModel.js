var mongoose = require('mongoose');

 var CourseSchema = new mongoose.Schema({
                                        name: String,
                                        completed: Boolean,
                                        published: { type: Date,  default: Date.now},
                                        language: String
                                      });
var Course;
Course = mongoose.model('Course', CourseSchema);
  
function createDefaultCourses(){
    Course.find({}).exec(function(err, collection){
        if(collection.length === 0){
      Course.create({name: 'C# for Sociopaths', completed: true, published: new Date('10/5/2013'), language: ['C#']});
      Course.create({name: 'C# for Non-Sociopaths', completed: true, published: new Date('10/12/2013'), language: ['C#']});
      Course.create({name: 'Super Duper Expert C#', completed: false, published: new Date('10/1/2013'), language: ['C#']});
      Course.create({name: 'Visual Basic for Visual Basic Developers', completed: false, published: new Date('7/12/2013'), language: ['VB']});
      Course.create({name: 'Pedantic C++', completed: true, published: new Date('1/1/2013'), language: ['C++']});
      Course.create({name: 'JavaScript for People over 20', completed: true, published: new Date('10/13/2013'), language: ['JS']});
      Course.create({name: 'Maintainable Code for Cowards', completed: true, published: new Date('3/1/2013'), language: ['Coding']});
      Course.create({name: 'A Survival Guide to Code Reviews', completed: true, published: new Date('2/1/2013'), language: ['Coding']});
      Course.create({name: 'How to Job Hunt Without Alerting your Boss', completed: true, published: new Date('10/7/2013'), language: ['Misc']});
      Course.create({name: 'How to Keep your Soul and go into Management', completed: false, published: new Date('8/1/2013'), language: ['Management']});
      Course.create({name: 'Telling Recruiters to Leave You Alone', completed: false, published: new Date('11/1/2013'), language: ['Misc']});
      Course.create({name: "Writing Code that Doesn't Suck", completed: true, published: new Date('10/13/2013'), language: ['Coding']});
      Course.create({name: 'Code Reviews for Jerks', completed: false, published: new Date('10/1/2013'), language: ['Coding']});
      Course.create({name: 'How to Deal with Narcissistic Coworkers', completed: true, published: new Date('2/15/2013'), language: ['Misc']});
      Course.create({name: 'Death March Coding for Fun and Profit', completed: true, published: new Date('7/1/2013'), language: ['Coding', 'Misc']});
    }
  })
}
exports.createDefaultCourses = createDefaultCourses;
console.log(createDefaultCourses);
