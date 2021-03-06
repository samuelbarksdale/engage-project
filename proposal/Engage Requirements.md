# Requirement and Problem Statement Draft





#### Problem Definition

​		Educators struggle to track non-grade metrics like attendance and attention within large lectures and classes.



#### Rationale

​		Educators of large classes want to improve the learning outcomes of their students. Miscommunication during lectures can drive dstudents to lower their attenance or overall courese engagement. These "at-risk" students are mostly invisible to educators who can't possible remember all three hundred faces and their respective attendances. By digitally loggin and tracking attendance, we can enable educators to discover problematic trends in their students and act upon them. 

#### Technical and Project Definitions

1. *Users* refer to any student who is participating in the engagement system
2. *Admins* refer to any educator who has authority over lectures and classes
3. *Disruptive* refers to
4. *Engagement* refers to the general set of metrics which describe how well a student is participating and paying attention in class. These metrics include: attendance, attention, sentiment, comprehension. 
5. *Attention* refers to the amount of time a student spends listening to the educator. A student will low attention might be on their phone, or might consistently leave lecture early.
6. *Sentiment* refers to the general feeling a student has about a lecture. This is likely a spectrum or multiple spectrums of feelings.
7. *Comprehension* refers to the amount and depth of information a student retains from lecture. It's synonymous with understanding.

####Notes on Requirements

​		We make distinctions within our solution between multiple independent systems with differing requirements. The primary system we define is the attendance system. The attendance system will be responsible for collecting, managing, and displaying attendance and roster data. It is segmented into two parts: an Attendance backend service with database capabilities, and an attendance front-facing web application. The requirements for the Attendance system follow:

**Hard Requirements** (Key Feature Lists)

1. Program shall be able to collect attendance by cross referencing device location and building location.
2. Program shall provide an administrator portal for create, read, update, delete (CRUD) operations on attendance and roster data.
3. Program shall identify and authenticate students within CAS.
4. Program shall provide a method for students to mark days they will be/were absent and submit documentation to support their claims.
5. Program shall provide students with an option to upload supporting documentation.
6. Program shall provide means for admin approval of provided student documentation and take action in terms of notifying the student on missed assignments and coursework.
7. Program shall allow the admin to create class, section, and student rosters.
<<<<<<< .mine
8. Program shall allow the admin to view attendance data by class, by section, and by student.
9. Program shall provide the admin with actionable insights which could include displaying a mark next to students with low attendance.
10. Program shall utilize proper API practices to allow for extensibility and for other developers to interact with it.
11. Program shall conform to FERPA regulations.
||||||| .r59923
7. Program shall allow the admin to view attendance data by class, by section, and by student.
8. Program shall provide the admin with actionable insights which could include displaying a mark next to students with low attendance.
9. Program shall utilize proper API practices to allow for extensibility and for other developers to interact with it.
10. Program shall conform to FERPA regulations.
=======
7. Program shall allow the admin to view attendance data by class, by section, and by student.
8. Program shall allow the admin to archive class data, to remove from day-to-day view, but still have it saved for future analytics. 
9. Program shall provide the admin with actionable insights which could include displaying a mark next to students with low attendance.
10. Program shall utilize proper API practices to allow for extensibility and for other developers to interact with it.
11. Program shall conform to FERPA regulations.
>>>>>>> .r59979



**Desirable Goals**

1. Attendance collection should be non-disruptive.
2. Attendance program should be resilient to network downtime, location inaccuracies, and other environmental factors, by being easily recoverable.
3. Program should store geolocation and time data, temporarily, in case automatic check-in feature cannot connect to the api.
4. Program should allow for graphical and analytical display of data for students and admins.
5. Program should allow admins to export data in a common data format like csv.
6. Program should handle a large number of requests at any particular moment, if multiple three hundred people lectures across the deptarment or school check-in during the same time.



#### Expressed Desires from customers

This includes desires expressed by Larry Herman in meetings as well as desires expressed by Jim Purtilo in the Engage Project Tasking.

> The procedure must not be disruptive, and in particular should not pose as a distraction to the instructor who after all is trying to juggle many things during a busy class.

- Disruptive is an ambiguous term, which will require further clarification with the customer, along with possibly empirical study.
- Despite specifics, this implies that the attendance tracking system should be fluid, intuitive, and fast. It should take mere moments and minimal efforts on behalf of the students and educator. There is an tricky design choice here, however. 
- The distracting nature of some attendance tracking solutions might be offset by a comprehensive engagement solution. That is, we can track attendance in a disruptive manner without being a burden, if students and educators are coaxed into a  highly interactive and beneficial system.
- There is a trade-off here. How direct should we be? A comprehensive system will possibly provide more value to students and professors, while increasing the complexity of the problem space.

> We need a *streamlined* and *reliable* means of sampling presence and attention at various points in time.

* Streamlined implies any clunky measuring solution like direct surveys are probably non-optimal. Indirectly gauging metrics through curriculum-based quizzes, active phone usage ratios, and automatic geolocation polling are largely more "streamlined" metric collectors. 
* An automatic attendance system which fails often, is slow, or is in any other way, irritating to use, then the educator will be forced to return to suboptimal systems or abandon attendance tracking entirely. Not only should the system be fluid, but it should be able to withstand potentially thousands of requests a second and store location and time data in case of network downtime. 



#### Foreseen Risks and Preliminary Solutions

##### 1. Geolocation

​	There are many technical risks surrounding the geolocation capabilities of our solution. Firstly, acutely accurate geolocation relies on a combination of GPS, cell tower triangulation, and Wi-Fi network connectivity. Tracking attendance based upon geolocation has many degrees of failure. If GPS is unable, then any form of geolocation is essentially impossible. Further, even with a GPS connection, location accuracy may be too imprecise. Relying on cell tower and Wi-Fi triangulation can help us pinpoint locations, but if anyone of those are inaccessible, then the problem remains.

​	Ostensibly, we probably need to know the exact classroom location of a student. However, there may be unique correlations in reality that we can leverage. Firstly, we can assume that interesting geolocation points are areas which contain a large amount (80+) of users during a particular time. Suppose we have many students registered in the same class. `Students 1...N` have an accurate GPS signal but `Student N+1` does not. Given these circumstances, it might be possible to claim, with a certain probability, that `Student N+1` is present in the class if they are within a certain distance threshold to `Students 1...N` .  

​	Alternatively, we might be able to leverage a slightly simpler heuristic. It may not matter what classroom the user is in after all. Given a student in a class which has a class start time and a building location, it might be accurate enough to claim: if a student is in the same building as their class during the class' interval, then it is reasonable to assume the student is in attendance. 

​	The likely solution is not clear. We will have to experiment with modern geolocation capabilities and the environmental factors on campus. 

##### 2. User Adoption

​	We have struggled to imagine why a user might want to participate in our system. Why should they download an app or log into a website? Particularly, if that application will "hold them accountable" by collecting attendance and engagement data. 

​	If we had a subtle manner of tracking attendance which doesn't depend on any user interaction, then the question would be trivial. We can imagine systems which use local cell towers to find the location of cell phones, or wireless access points which track cell phones as they automatically ping near-by Wi-Fi networks. Yet, many of those solutions seem technically advanced, costly, possibly illegal, and probably immoral.

​	Such lightweight and "hidden" solutions also lack extensibility. Since the problem can be applied to the question of engagement, generally, we desire a system capable of tracking other engagement metrics. Calculating the ratio between a student's screen time and listening time would mostly likely be intractable using clever methods like packet listening on a "lecture Wi-Fi network".

​	Looking for inspiration at educator's traditional methods, we find that lecture quizzes or polls using clicker technology are useful to gauge certain engagement metrics and as a byproduct, collect attendance. There are a few issues with this method, however. Educators must create such quizzes and must ensure they are "useful". Additionally, because digital quizzes rely on computers, educators and students run into technical issues. There is also the human factor involved. Class quizzes at the beginning of the lecture have the high potential of missing a large segment of latecomers.  Also, simply tracking attendance becomes a process. An educator must stop class for everyone to submit input. Clickers and other polling solutions also lack flexibility. Answers are multiple choice, and either you force students to use pricy calculator-like devices to ensure attendance, or risk the software outcome of students answering anywhere. Clickers are also time based.

​	Although using direct interaction with students can collect attendance, it's suboptimal. Nevertheless, digital polls are useful. They give students a reason to use our application. An educator who uses digital polling will compel students to download our application so they can complete these polls. Once the application is downloaded, we can track attendance without any input form the user. Even if the educator rarely uses polls, the possibility of them (along with additional benefits) should be an effective incentive.

​	We further imagine additional benefits which would incentivize students. Although attendance and general engagement can't really be graded, there might be room for an educator to give out "good faith" points. Students whose profile leans towards higher engagement, might be at a better bargaining position for a slight grade bump-up at the end of the semester, an assignment extension, or letter of recommendation. Further, the analytics the educator collects can directly improve the lecture, leaving the students more satisfied. Future features might even "gamify" the engagement system. Features such as a leaderboard, badges, and integration with software such as Portfolium could provide a game-like drive within the college atmosphere as well as post-college benefits. It seems likely that college engagement and participation metrics would be of great use to employers struggle to gauge a new graduate's personality, work ethic, and teamwork skills. 

​	

#### Product Design



#### User Characteristics and Usability Constraints

